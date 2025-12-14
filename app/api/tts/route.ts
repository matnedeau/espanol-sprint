import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Récupération du corps de la requête (Texte + ID de voix optionnel)
    const { text, voiceId } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // 2. Vérification de la clé API
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ Pas de clé API ElevenLabs. Fallback serveur.");
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    // 3. Choix de la voix (Dynamique ou Défaut "Rachel")
    // "21m00Tcm4TlvDq8ikWAM" est l'ID de Rachel (voix féminine standard)
    // Le frontend enverra l'ID spécifique si nécessaire (ex: voix homme pour Pablo)
    const targetVoiceId = voiceId || '21m00Tcm4TlvDq8ikWAM';

    // 4. Appel à l'API ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${targetVoiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2', // Modèle multilingue pour un bon accent espagnol
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erreur ElevenLabs:", errorData);
      return NextResponse.json({ error: 'TTS Failed', details: errorData }, { status: response.status });
    }

    // 5. Renvoi du fichier Audio
    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        // Petit cache d'une heure pour éviter de repayer pour la même phrase
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', 
      },
    });

  } catch (error) {
    console.error("Erreur serveur TTS:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}