import Stripe from 'stripe';
import { adminDb } from './firebase-admin';

let stripe: Stripe | null = null;
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY manquante');
  if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripe;
}

const ACTIVE_STATUSES = ['active', 'trialing'];

/** Synchronise l'abonnement Stripe avec le profil Firestore de l'utilisateur. */
export async function syncSubscription(uid: string, sub: Stripe.Subscription) {
  const isActive = ACTIVE_STATUSES.includes(sub.status);
  const interval = sub.items?.data?.[0]?.price?.recurring?.interval || 'month';
  await adminDb().collection('users').doc(uid).set(
    {
      subscription: {
        status: isActive ? 'active' : 'free',
        plan: isActive ? 'premium' : 'free',
        interval,
        stripeStatus: sub.status,
        customerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
        subscriptionId: sub.id,
        cancelAtPeriodEnd: !!sub.cancel_at_period_end,
        updatedAt: new Date().toISOString(),
      },
    },
    { merge: true },
  );
}

/** Retrouve l'utilisateur lié à un abonnement (métadonnées, sinon ID client). */
export async function findUidForSubscription(sub: Stripe.Subscription): Promise<string | null> {
  if (sub.metadata?.uid) return sub.metadata.uid;
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const q = await adminDb().collection('users').where('subscription.customerId', '==', customerId).limit(1).get();
  return q.empty ? null : q.docs[0].id;
}
