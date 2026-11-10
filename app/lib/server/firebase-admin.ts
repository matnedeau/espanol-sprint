import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | null = null;

/**
 * Lit la clé de compte de service en tolérant les erreurs de copier-coller dans Vercel :
 * préfixe « FIREBASE_SERVICE_ACCOUNT_KEY= », guillemets autour du JSON, retours à la ligne réels dans la clé privée.
 */
function parseServiceAccount(raw: string | undefined) {
  if (!raw || !raw.trim()) throw new HttpError(500, 'SERVER_MISCONFIGURED');
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end <= start) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY : aucun objet JSON trouvé (longueur ' + raw.length + ')');
    throw new HttpError(500, 'SERVER_MISCONFIGURED');
  }
  const json = raw.slice(start, end + 1);
  let account: Record<string, any>;
  try {
    account = JSON.parse(json);
  } catch {
    try {
      // Retours à la ligne réels à l'intérieur des chaînes (clé privée collée sur plusieurs lignes)
      account = JSON.parse(json.replace(/"(?:[^"\\]|\\[\s\S])*"/g, (str) => str.replace(/\r?\n/g, '\\n')));
    } catch (err) {
      console.error('FIREBASE_SERVICE_ACCOUNT_KEY : JSON illisible (longueur ' + raw.length + ')', err);
      throw new HttpError(500, 'SERVER_MISCONFIGURED');
    }
  }
  if (typeof account.private_key !== 'string' || !account.client_email || !account.project_id) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY : champs manquants (private_key, client_email ou project_id)');
    throw new HttpError(500, 'SERVER_MISCONFIGURED');
  }
  account.private_key = account.private_key.replace(/\\n/g, '\n');
  return account;
}

function getAdminApp(): App {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }
  const serviceAccount = parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
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
  // Une clé serveur absente ou illisible n'est pas un problème de session : on le signale à part (erreur 500).
  const authService = adminAuth();
  try {
    const decoded = await authService.verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email };
  } catch (err: any) {
    console.error('Jeton refusé :', err?.code || err?.message);
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
