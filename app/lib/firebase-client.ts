import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration publique Firebase (ces valeurs sont faites pour être visibles côté navigateur).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDPWOdxYtnvVrDB6wk68EF0Gz62fqVCwBE',
  authDomain: 'espanolsprint.firebaseapp.com',
  projectId: 'espanolsprint',
  storageBucket: 'espanolsprint.firebasestorage.app',
  messagingSenderId: '54612821418',
  appId: '1:54612821418:web:7af8de5ad1545ec1ba57d3',
};

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

/** fetch() qui ajoute automatiquement le jeton de l'utilisateur connecté. */
export async function authFetch(url: string, init: RequestInit = {}) {
  const token = await auth.currentUser?.getIdToken();
  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...init, headers });
}
