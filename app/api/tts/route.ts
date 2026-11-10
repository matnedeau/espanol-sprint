import { NextRequest, NextResponse } from 'next/server';
import { getUserData, isPremiumData, requireUser } from '@/app/lib/server/firebase-admin';

// Identifiants de voix utilisés par les histoires (hérités d'ElevenLabs) : voix masculine et voix féminine.
const MALE_VOICE_ID = 'ErXwobaYiN019PkySvjV';
const FEMALE_VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

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

    const audioHeaders = { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'private, max-age=86400' };

    // 2. ElevenLabs, uniquement si demandé explicitement (TTS_PROVIDER=elevenlabs) : son offre gratuite
    //    refuse les voix de la bibliothèque via l'API (erreur 402), il faut un abonnement payant.
    const elevenKey = process.env.ELEVENLABS_API_KEY;
    if (process.env.TTS_PROVIDER === 'elevenlabs' && elevenKey) {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId || FEMALE_VOICE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': elevenKey },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });
      if (response.ok) return new NextResponse(await response.arrayBuffer(), { headers: audioHeaders });
      console.error('Erreur ElevenLabs, repli sur OpenAI :', response.status, await response.text().catch(() => ''));
    }

    // 3. Voix OpenAI (par défaut) : naturelles, rapides et bien moins chères à l'usage.
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      console.error('OPENAI_API_KEY manquante : impossible de générer la voix.');
      return NextResponse.json({ error: 'TTS_NOT_CONFIGURED' }, { status: 500 });
    }
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openaiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        voice: voiceId === MALE_VOICE_ID ? 'ash' : 'coral',
        input: text,
        instructions:
          "Habla en español de España, con acento castellano nativo, voz natural y cálida, y un ritmo claro y pausado para estudiantes.",
        response_format: 'mp3',
      }),
    });
    if (!response.ok) {
      console.error('Erreur OpenAI TTS :', response.status, await response.text().catch(() => ''));
      return NextResponse.json({ error: 'TTS_FAILED' }, { status: 502 });
    }
    return new NextResponse(await response.arrayBuffer(), { headers: audioHeaders });

  } catch (error) {
    console.error("Erreur serveur TTS:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}