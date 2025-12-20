import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// CORRECTION : On retire la ligne apiVersion
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true, // On active le mode TypeScript à la place
});

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // ✅ Il va chercher l'ID que tu as mis dans .env.local
          price: process.env.STRIPE_PRICE_ID, 
          quantity: 1,
        },
      ],
      mode: 'subscription',
      
      // ✅ C'est ici qu'on active les 7 jours gratuits
      subscription_data: {
        trial_period_days: 7, 
      },
      
      allow_promotion_codes: true, // Pour pouvoir créer des codes promo plus tard
      success_url: `${process.env.NEXT_PUBLIC_URL}/?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/?payment=cancelled`,
      customer_email: email,
      metadata: {
        userId: userId, // Crucial pour le Webhook
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}