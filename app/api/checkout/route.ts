import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    // Vérification de la clé API
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('La clé STRIPE_SECRET_KEY est manquante.');
    }

    // Initialisation de Stripe à l'intérieur de la fonction
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Lecture du body (optionnel, sécurisé pour éviter les crashs)
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      // Pas de JSON envoyé ou body vide
    }

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // --- CONFIGURATION DU PRODUIT ---
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Accès Espanol Sprint',
              description: 'Formation complète',
            },
            unit_amount: 4700, // 47.00€
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // On utilise req.headers.get('origin') pour récupérer l'URL du site dynamiquement
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    // Le ': any' ici corrige l'erreur "object is of type unknown"
    console.error('Erreur Stripe:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la session' },
      { status: 500 }
    );
  }
}