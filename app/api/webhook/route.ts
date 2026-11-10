import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { findUidForSubscription, getStripe, syncSubscription } from '@/app/lib/server/stripe';

export const dynamic = 'force-dynamic';

/**
 * Webhook Stripe : garde le statut Premium à jour (renouvellement, résiliation, impayé).
 * À configurer dans Stripe → Développeurs → Webhooks avec l'URL /api/webhook et les événements :
 * checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get('stripe-signature');
  if (!secret || !signature) return NextResponse.json({ error: 'WEBHOOK_NOT_CONFIGURED' }, { status: 400 });

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch (err) {
    console.error('Signature webhook invalide', err);
    return NextResponse.json({ error: 'INVALID_SIGNATURE' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const uid = session.client_reference_id;
      if (uid && session.subscription) {
        const subId = typeof session.subscription === 'string' ? session.subscription : session.subscription.id;
        await syncSubscription(uid, await stripe.subscriptions.retrieve(subId));
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as Stripe.Subscription;
      const uid = await findUidForSubscription(sub);
      if (uid) await syncSubscription(uid, sub);
    }
  } catch (err) {
    console.error('Erreur traitement webhook', err);
    return NextResponse.json({ error: 'HANDLER_FAILED' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
