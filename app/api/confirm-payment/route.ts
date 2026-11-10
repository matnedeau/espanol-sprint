import { NextResponse } from 'next/server';
import { errorResponse, HttpError, requireUser } from '@/app/lib/server/firebase-admin';
import { getStripe, syncSubscription } from '@/app/lib/server/stripe';

/** Appelé au retour de Stripe : vérifie la session côté serveur avant d'activer le Premium. */
export async function POST(req: Request) {
  try {
    const { uid } = await requireUser(req);
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== 'string') throw new HttpError(400, 'SESSION_REQUIRED');

    const session = await getStripe().checkout.sessions.retrieve(sessionId, { expand: ['subscription'] });
    if (session.client_reference_id !== uid) throw new HttpError(403, 'SESSION_MISMATCH');
    if (session.status !== 'complete' || !session.subscription || typeof session.subscription === 'string') {
      throw new HttpError(402, 'PAYMENT_INCOMPLETE');
    }

    await syncSubscription(uid, session.subscription);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
