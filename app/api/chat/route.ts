import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Sécurité : On initialise OpenAI seulement si la clé existe
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || '' 
});

export async function POST(req: Request) {
  try {
    const { message, userContext } = await req.json();
    
    // --- 1. SÉCURITÉ & QUOTAS ---
    const isPremium = userContext?.isPremium; 
    const freeCount = userContext?.dailyCount || 0;

    // Si l'utilisateur est Gratuit et dépasse la limite (ex: 3 questions)
    if (!isPremium && freeCount >= 3) {
      return NextResponse.json(
        { error: "LIMIT_REACHED", reply: "🔒 Limite atteinte. Passez Premium pour continuer." }, 
        { status: 403 }
      );
    }

    // --- 2. APPEL OPENAI ---
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: "⚠️ Erreur config : Clé API manquante." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Modèle le plus rentable pour du tuteur
      messages: [
        { 
            role: "system", 
            content: `Tu es un professeur d'espagnol bienveillant. L'élève est niveau ${userContext?.level || 'A1'}.
            Règles :
            1. Réponds brièvement (max 2 phrases).
            2. Si l'élève écrit en espagnol, réponds en espagnol simple.
            3. Si l'élève demande une traduction ou explication, réponds en français.
            4. Corrige les fautes gentiment avec un emoji.` 
        },
        { role: "user", content: message }
      ],
      max_tokens: 150, // Limite la longueur de la réponse pour contrôler les coûts
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ reply: "Désolé, j'ai un petit souci de connexion 🧠." }, { status: 500 });
  }
}