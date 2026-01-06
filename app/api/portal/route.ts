import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    // On reçoit l'ID client directement depuis la page
    const { customerId } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: "Clé manquante" }, { status: 500 });
    }
    
    if (!customerId) {
        return NextResponse.json({ error: "Aucun identifiant client fourni" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Création du lien vers le portail client
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur Portail:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}