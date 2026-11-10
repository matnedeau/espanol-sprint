import { NextResponse } from 'next/server';
import { adminDb } from '@/app/lib/server/firebase-admin';

export const dynamic = 'force-dynamic';

/**
 * Diagnostic de configuration du serveur, réservé au propriétaire : il faut envoyer un code de VIP_CODES
 * dans l'en-tête x-diagnostic-code. Ne renvoie jamais de secret : seulement présence, longueur et état des clés.
 */
function validCodes() {
  return (process.env.VIP_CODES || '')
    .replace(/^\s*VIP_CODES\s*=/i, '')
    .split(/[,;\s]+/)
    .map((c) => c.replace(/["'`]/g, '').trim().toUpperCase())
    .filter(Boolean);
}

const VARS = [
  'OPENAI_API_KEY',
  'ELEVENLABS_API_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_PRICE_ID',
  'STRIPE_WEBHOOK_SECRET',
  'FIREBASE_SERVICE_ACCOUNT_KEY',
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_SITE_URL',
  'TTS_PROVIDER',
];

async function check(fn: () => Promise<string>) {
  try {
    return await fn();
  } catch (e: any) {
    return 'ERREUR ' + String(e?.code || e?.message || e).slice(0, 120);
  }
}

export async function GET(req: Request) {
  const code = (req.headers.get('x-diagnostic-code') || '').trim().toUpperCase();
  if (!code || !validCodes().includes(code)) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

  const variables: Record<string, string> = {};
  for (const name of VARS) {
    const v = process.env[name];
    variables[name] = v ? `présente (${v.length} caractères)` : 'ABSENTE';
  }

  const openai = await check(async () => {
    const r = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-4o-mini-tts', voice: 'coral', input: 'Hola', response_format: 'mp3' }),
    });
    return r.ok ? 'OK' : `REFUS ${r.status}`;
  });

  const stripe = await check(async () => {
    const r = await fetch(`https://api.stripe.com/v1/prices/${process.env.STRIPE_PRICE_ID}`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
    });
    if (!r.ok) return `REFUS ${r.status}`;
    const price = await r.json();
    return `OK (${price.livemode ? 'mode production' : 'MODE TEST'}, prix ${price.active ? 'actif' : 'INACTIF'})`;
  });

  const firebase = await check(async () => {
    await adminDb().collection('users').limit(1).get();
    return 'OK';
  });

  return NextResponse.json({ variables, tests: { openai, stripe, firebase }, codesConfigures: validCodes().length });
}
