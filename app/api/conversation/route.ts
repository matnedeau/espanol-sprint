import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('file') as File;
    const isPremium = formData.get('isPremium') === 'true';

    if (!isPremium) return NextResponse.json({ error: "PREMIUM_REQUIRED" }, { status: 403 });
    if (!audioFile) return NextResponse.json({ error: "No audio" }, { status: 400 });

    // 1. TRANSCRIPTION
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "es", 
      prompt: "Une conversation en espagnol.", // Aide l'IA à se caler
    });

    let userText = transcription.text.trim();

    // 🛡️ FILTRE ANTI-HALLUCINATION (Amara.org, etc.)
    const hallucinations = [
      "Amara.org", "subtítulos", "sous-titres", "Watching", "Sosty", 
      "co-", "Copyright", "Kevin MacLeod"
    ];
    
    // Si le texte contient une hallucination connue ou est vide
    const isHallucination = hallucinations.some(h => userText.includes(h));
    
    if (userText.length < 2 || isHallucination) {
       return NextResponse.json({ 
         userText: "🔇 (Silence détecté)", 
         aiText: "Je n'ai pas bien entendu. Peux-tu répéter ?",
         audio: null // Pas d'audio généré pour économiser
       });
    }

    // 2. INTELLIGENCE (Seulement si on a du vrai texte)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Tu es un ami espagnol natif. Tu as une conversation orale. Réponds en 1 seule phrase courte (max 15 mots). Sois naturel et encourageant." 
        },
        { role: "user", content: userText }
      ],
      max_tokens: 60,
    });

    const aiResponseText = completion.choices[0].message.content || "¡Hola!";

    // 3. VOCALISATION
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy", // "alloy" est très polyvalent pour l'espagnol
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
    console.error("Conversation Error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}