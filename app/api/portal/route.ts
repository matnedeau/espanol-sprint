import { NextResponse } from 'next/server';
import { errorResponse, getUserData, HttpError, requireUser } from '@/app/lib/server/firebase-admin';
import { getStripe } from '@/app/lib/server/stripe';

export async function POST(req: Request) {
  try {
    const { uid } = await requireUser(req);
    const customerId = (await getUserData(uid))?.subscription?.customerId;
    if (!customerId) throw new HttpError(404, 'NO_CUSTOMER');

    const origin = req.headers.get('origin') || new URL(req.url).origin;
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return errorResponse(error);
  }
}
