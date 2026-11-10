import { NextResponse } from 'next/server';
import { adminDb, errorResponse, requireUser } from '@/app/lib/server/firebase-admin';

// Codes d'accès Premium offerts : définis dans la variable d'environnement VIP_CODES (séparés par des virgules),
// dans .env.local en local et dans Vercel → Settings → Environment Variables en production.
// Ils ne sont volontairement PAS écrits dans le code : le dépôt GitHub est public.
function validCodes() {
  // Tolère les erreurs de copier-coller dans Vercel : préfixe « VIP_CODES= », guillemets, espaces, retours à la ligne.
  return (process.env.VIP_CODES || '')
    .replace(/^\s*VIP_CODES\s*=/i, '')
    .split(/[,;\s]+/)
    .map((c) => c.replace(/["'`]/g, '').trim().toUpperCase())
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const { uid } = await requireUser(req);
    const { code } = await req.json();
    const cleanCode = String(code || '').replace(/["'`\s]/g, '').toUpperCase();
    const codes = validCodes();

    if (!codes.length) {
      // La variable VIP_CODES est absente ou vide sur ce déploiement.
      return NextResponse.json({ valid: false, error: 'NO_CODES_CONFIGURED' }, { status: 503 });
    }
    if (!codes.includes(cleanCode)) {
      return NextResponse.json({ valid: false, error: 'UNKNOWN_CODE' }, { status: 400 });
    }

    // L'activation se fait côté serveur : impossible de s'auto-attribuer le Premium depuis le navigateur.
    await adminDb().collection('users').doc(uid).set(
      {
        subscription: {
          status: 'active',
          plan: 'premium_gift',
          code: cleanCode,
          startDate: new Date().toISOString(),
        },
      },
      { merge: true },
    );
    return NextResponse.json({ valid: true });
  } catch (error) {
    return errorResponse(error);
  }
}
