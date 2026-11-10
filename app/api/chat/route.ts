import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { errorResponse, getUserData, isPremiumData, requireUser } from '@/app/lib/server/firebase-admin';
import { consumeFreeAiQuestion } from '@/app/lib/server/usage';

type ChatTurn = { role: 'user' | 'ai'; text: string };

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: "⚠️ Le coach IA n'est pas configuré (clé API manquante)." }, { status: 500 });
    }

    const { uid } = await requireUser(req);
    const { message, history } = await req.json();
    const text = String(message || '').trim().slice(0, 600);
    if (!text) return NextResponse.json({ error: 'EMPTY_MESSAGE' }, { status: 400 });

    // Statut et niveau lus en base : le client ne peut pas se déclarer Premium.
    const userData = await getUserData(uid);
    const isPremium = isPremiumData(userData);
    let remaining: number | null = null;
    if (!isPremium) {
      remaining = await consumeFreeAiQuestion(uid);
      if (remaining < 0) {
        return NextResponse.json(
          { error: 'LIMIT_REACHED', reply: '🔒 Tu as utilisé tes 3 questions gratuites du jour. Passe Premium pour continuer sans limite.' },
          { status: 403 },
        );
      }
    }

    const previous: ChatTurn[] = Array.isArray(history) ? history.slice(-6) : [];
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Tu es un professeur d'espagnol bienveillant qui s'adresse à un élève francophone de niveau ${userData?.level || 'A1'}.
Règles :
1. Réponds brièvement (3 phrases maximum).
2. Si l'élève écrit en espagnol, réponds dans un espagnol adapté à son niveau, puis corrige gentiment ses fautes éventuelles.
3. Si l'élève demande une traduction ou une explication, réponds en français avec un exemple en espagnol.
4. Reste toujours sur le thème de l'apprentissage de l'espagnol.`,
        },
        ...previous
          .filter((t) => t && typeof t.text === 'string')
          .map((t) => ({ role: t.role === 'user' ? ('user' as const) : ('assistant' as const), content: t.text.slice(0, 600) })),
        { role: 'user', content: text },
      ],
      max_tokens: isPremium ? 300 : 180,
    });

    return NextResponse.json({ reply: completion.choices[0].message.content, remaining, isPremium });
  } catch (error) {
    return errorResponse(error);
  }
}
