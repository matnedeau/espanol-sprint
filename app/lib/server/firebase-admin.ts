import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | null = null;

function getAdminApp(): App {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY manquante');
  const serviceAccount = JSON.parse(raw.trim().replace(/^'|'$/g, ''));
  if (typeof serviceAccount.private_key === 'string') {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }
  app = initializeApp({ credential: cert(serviceAccount) });
  return app;
}

export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Vérifie le jeton Firebase envoyé dans l'en-tête Authorization: Bearer <token>. */
export async function requireUser(req: Request): Promise<{ uid: string; email?: string }> {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new HttpError(401, 'AUTH_REQUIRED');
  try {
    const decoded = await adminAuth().verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    throw new HttpError(401, 'AUTH_INVALID');
  }
}

export async function getUserData(uid: string) {
  const snap = await adminDb().collection('users').doc(uid).get();
  return snap.exists ? (snap.data() as Record<string, any>) : null;
}

export function isPremiumData(data: Record<string, any> | null | undefined) {
  return data?.subscription?.status === 'active';
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return Response.json({ error: 'SERVER_ERROR' }, { status: 500 });
}
