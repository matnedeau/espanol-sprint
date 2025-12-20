import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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
    const formData = await req.formData();
    const audioFile = formData.get('file') as File;
    const isPremium = formData.get('isPremium') === 'true';

    // 3. VÉRIFICATIONS DE SÉCURITÉ
    if (!isPremium) {
      return NextResponse.json({ error: "PREMIUM_REQUIRED" }, { status: 403 });
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
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "es", 
      prompt: "Une conversation informelle en espagnol.", 
    });

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
          content: "Tu es un ami espagnol natif bienveillant. L'utilisateur apprend la langue. Réponds à son message oral en 1 seule phrase courte (max 15 mots). Sois naturel, dynamique et encourageant." 
        },
        { role: "user", content: userText }
      ],
      max_tokens: 60,
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

  } catch (error: any) {
    console.error("Conversation Error:", error);
    // On renvoie l'erreur précise pour t'aider à débugger dans les logs Vercel
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}