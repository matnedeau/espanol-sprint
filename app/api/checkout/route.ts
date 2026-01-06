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
          // Ton ID de prix (4.99€)
          price: process.env.STRIPE_PRICE_ID, 
          quantity: 1,
        },
      ],
      mode: 'subscription',
      
      // ✅ AJOUT ICI : Les 7 jours d'essai gratuits
      subscription_data: {
        trial_period_days: 7,
      },

      allow_promotion_codes: true, // Toujours utile pour tes codes promos

      success_url: `${req.headers.get('origin')}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
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