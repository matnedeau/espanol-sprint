import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Récupération de la clé depuis le fichier caché .env.local
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ Pas de clé API ElevenLabs trouvée. Le fallback (voix robot) sera utilisé.");
      // On renvoie une erreur 500 pour dire au client d'utiliser la voix par défaut du navigateur
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    // ID de la voix "Rachel" (Une voix standard très claire pour le multilingue)
    // Tu pourras changer cet ID plus tard si tu veux une voix d'homme (ex: "ErXwobaYiN019PkySvjV")
    const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; 

    // Appel à l'usine ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2', // Modèle spécial pour bien prononcer l'espagnol !
          voice_settings: {
            stability: 0.5,       // Équilibre entre émotion et stabilité
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur ElevenLabs:", errorData);
      return NextResponse.json({ error: 'TTS Failed' }, { status: response.status });
    }

    // On récupère le fichier audio (MP3)
    const audioBuffer = await response.arrayBuffer();
    
    // On le renvoie à ton application pour qu'elle le joue
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (error) {
    console.error("Erreur serveur TTS:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}