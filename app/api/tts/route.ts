import { NextRequest, NextResponse } from 'next/server';
import { getUserData, isPremiumData, requireUser } from '@/app/lib/server/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    // 1. Récupération du corps de la requête (Texte + ID de voix optionnel)
    // Les voix IA (payantes à l'usage) sont réservées aux abonnés Premium.
    // Les autres utilisateurs utilisent la synthèse vocale du navigateur (gratuite et instantanée).
    let uid: string;
    try { uid = (await requireUser(req)).uid; } catch { return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 }); }
    if (!isPremiumData(await getUserData(uid))) {
      return NextResponse.json({ error: 'PREMIUM_REQUIRED' }, { status: 403 });
    }

    const { text, voiceId } = await req.json();

    if (!text || typeof text !== 'string' || text.length > 600) {
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
        'Cache-Control': 'private, max-age=86400',
      },
    });

  } catch (error) {
    console.error("Erreur serveur TTS:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}