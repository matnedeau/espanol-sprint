import { NextResponse } from 'next/server';
import OpenAI, { toFile } from 'openai';
import { errorResponse, getUserData, isPremiumData, requireUser } from '@/app/lib/server/firebase-admin';

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. INITIALISATION (À l'intérieur pour éviter les erreurs de build Vercel)
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Clé API manquante" }, { status: 500 });
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 2. RÉCUPÉRATION DES DONNÉES
    // Le statut Premium est vérifié en base, jamais sur la parole du client.
    const { uid } = await requireUser(req);
    const userData = await getUserData(uid);
    if (!isPremiumData(userData)) {
      return NextResponse.json({ error: "PREMIUM_REQUIRED" }, { status: 403 });
    }

    const formData = await req.formData();
    const audioFile = formData.get('file') as File;
    let history: { role: string; text: string }[] = [];
    try { history = JSON.parse(String(formData.get('history') || '[]')).slice(-8); } catch { history = []; }

    if (audioFile && audioFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "AUDIO_TOO_LONG" }, { status: 413 });
    }
    
    if (!audioFile || audioFile.size === 0) {
      console.warn("Fichier audio reçu vide ou null");
      return NextResponse.json({ 
        userText: "(Silence détecté)", 
        aiText: "" 
      }); // On renvoie une réponse "douce" pour ne pas faire planter le front
    }

    console.log(`🎤 Réception audio: ${audioFile.name} (${audioFile.size} bytes)`);

    // 4. TRANSCRIPTION (Whisper)
    // Note : On passe l'objet File directement, OpenAI gère le format grâce au nom (ex: input.mp4)
    // Certains navigateurs (Safari surtout) envoient un conteneur que l'extension décrit mal :
    // en cas de refus « Invalid file format », on réessaie sous les autres extensions plausibles.
    const bytes = Buffer.from(await audioFile.arrayBuffer());
    const original = (audioFile.name.split('.').pop() || 'webm').toLowerCase();
    const extensions = [original, ...['m4a', 'mp4', 'webm', 'ogg'].filter((e) => e !== original)];
    let transcription: { text: string } | null = null;
    for (const ext of extensions) {
      try {
        transcription = await openai.audio.transcriptions.create({
          file: await toFile(bytes, `input.${ext}`),
          model: "whisper-1",
          language: "es",
          prompt: "Una conversación informal en español.",
        });
        break;
      } catch (err: any) {
        if (err?.status !== 400) throw err;
        console.warn(`Transcription refusée en .${ext} (${audioFile.type}, ${audioFile.size} octets)`);
      }
    }
    if (!transcription) return NextResponse.json({ error: "AUDIO_UNREADABLE" }, { status: 422 });

    let userText = transcription.text.trim();
    console.log("📝 Transcription brute :", userText);

    // 5. FILTRE ANTI-HALLUCINATION
    // Whisper invente parfois ces textes quand il y a du silence ou du bruit de fond
    const hallucinations = [
      "Amara.org", "subtítulos", "sous-titres", "Watching", "Sosty", 
      "co-", "Copyright", "Kevin MacLeod", "Silence", "audio", "MBC"
    ];
    
    const isHallucination = hallucinations.some(h => userText.includes(h));
    
    // Si le texte est trop court ou est une hallucination connue
    if (userText.length < 2 || isHallucination) {
       console.log("🚫 Hallucination ou silence filtré.");
       return NextResponse.json({ 
         userText: "🔇 (Silence détecté)", 
         aiText: "Je n'ai pas bien entendu. Peux-tu répéter ?",
         audio: null 
       });
    }

    // 6. INTELLIGENCE (GPT-4o)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `Tu es un ami espagnol natif et bienveillant. L'utilisateur apprend la langue (niveau ${userData?.level || 'A1'}). Réponds à son message oral en espagnol, en une ou deux phrases courtes (20 mots maximum), puis relance la conversation par une question. Sois naturel, dynamique et encourageant.`
        },
        ...history
          .filter((t) => t && typeof t.text === 'string')
          .map((t) => ({ role: t.role === 'user' ? ('user' as const) : ('assistant' as const), content: t.text.slice(0, 400) })),
        { role: "user", content: userText }
      ],
      max_tokens: 90,
    });

    const aiResponseText = completion.choices[0].message.content || "¡Hola! ¿Cómo estás?";

    // 7. VOCALISATION (TTS)
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy", 
      input: aiResponseText,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const audioBase64 = buffer.toString('base64');

    return NextResponse.json({ 
      userText, 
      aiText: aiResponseText,
      audio: `data:audio/mp3;base64,${audioBase64}` 
    });

  } catch (error) {
    return errorResponse(error);
  }
}