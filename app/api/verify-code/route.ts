import { NextResponse } from 'next/server';
import { adminDb, errorResponse, requireUser } from '@/app/lib/server/firebase-admin';

// Codes d'accès : définis-les dans la variable d'environnement VIP_CODES (séparés par des virgules).
// La liste ci-dessous ne sert que de secours tant que VIP_CODES n'est pas configurée.
const FALLBACK_CODES = ['VIP2025', 'ESPANOL_BETA', 'AMIGO', 'ADMIN_MASTER'];

function validCodes() {
  const fromEnv = process.env.VIP_CODES?.split(',').map((c) => c.trim().toUpperCase()).filter(Boolean);
  return fromEnv && fromEnv.length ? fromEnv : FALLBACK_CODES;
}

export async function POST(req: Request) {
  try {
    const { uid } = await requireUser(req);
    const { code } = await req.json();
    const cleanCode = String(code || '').trim().toUpperCase();

    if (!validCodes().includes(cleanCode)) {
      return NextResponse.json({ valid: false }, { status: 400 });
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
