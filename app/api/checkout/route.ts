import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, getUserData, requireUser } from '@/app/lib/server/firebase-admin';
import { getStripe } from '@/app/lib/server/stripe';

export async function POST(req: NextRequest) {
  try {
    const { uid, email } = await requireUser(req);
    const { plan } = await req.json().catch(() => ({ plan: 'monthly' }));

    const price =
      plan === 'yearly' && process.env.STRIPE_PRICE_ID_YEARLY
        ? process.env.STRIPE_PRICE_ID_YEARLY
        : process.env.STRIPE_PRICE_ID;
    if (!price) throw new Error('STRIPE_PRICE_ID manquant');

    const userData = await getUserData(uid);
    const existingCustomer = userData?.subscription?.customerId;
    // L'essai gratuit n'est offert qu'une seule fois par compte.
    const alreadyTried = !!userData?.subscription?.subscriptionId;
    const origin = req.headers.get('origin') || new URL(req.url).origin;

    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      client_reference_id: uid,
      metadata: { uid },
      ...(existingCustomer ? { customer: existingCustomer } : { customer_email: email }),
      subscription_data: {
        metadata: { uid },
        ...(alreadyTried ? {} : { trial_period_days: 7 }),
      },
      allow_promotion_codes: true,
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return errorResponse(error);
  }
}
