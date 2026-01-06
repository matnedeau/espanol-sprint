import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({ customerId: session.customer });
  } catch (e) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}