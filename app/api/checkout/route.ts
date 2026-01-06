import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    // 1. Vérification de la clé Secrète
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('La clé STRIPE_SECRET_KEY est manquante dans .env.local');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // 2. Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // C'est ici qu'on utilise l'ID de ton produit à 4.99€ (défini dans .env.local)
          // au lieu d'écrire le prix en dur.
          price: process.env.STRIPE_PRICE_ID, 
          quantity: 1,
        },
      ],
      // 3. IMPORTANT : 'subscription' pour un abonnement mensuel
      mode: 'subscription', 
      
      // 4. Active la case "Code Promo" sur la page de paiement
      allow_promotion_codes: true,

      success_url: `${req.headers.get('origin')}/?payment=success`,
      cancel_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur création session' },
      { status: 500 }
    );
  }
}