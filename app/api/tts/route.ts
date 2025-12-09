import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // On récupère text ET voiceId
    const { text, voiceId } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ Pas de clé API ElevenLabs. Fallback activé.");
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    // Si un voiceId est fourni, on l'utilise, sinon on prend "Rachel" par défaut
    const targetVoiceId = voiceId || '21m00Tcm4TlvDq8ikWAM';

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
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'TTS Failed' }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: { 'Content-Type': 'audio/mpeg' },
    });

  } catch (error) {
    console.error("Erreur serveur TTS:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}