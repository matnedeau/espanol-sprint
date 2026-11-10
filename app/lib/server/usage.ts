import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from './firebase-admin';

export const FREE_AI_QUESTIONS_PER_DAY = 3;

const today = () => new Date().toISOString().slice(0, 10);

/**
 * Consomme une question IA gratuite. Renvoie le nombre restant, ou -1 si la limite est atteinte.
 * Le compteur est stocké côté serveur (champ aiUsage) : il ne peut pas être remis à zéro par le client.
 */
export async function consumeFreeAiQuestion(uid: string): Promise<number> {
  const ref = adminDb().collection('users').doc(uid);
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const usage = snap.get('aiUsage') || {};
    const count = usage.date === today() ? usage.count || 0 : 0;
    if (count >= FREE_AI_QUESTIONS_PER_DAY) return -1;
    tx.set(ref, { aiUsage: { date: today(), count: count + 1, total: FieldValue.increment(1) } }, { merge: true });
    return FREE_AI_QUESTIONS_PER_DAY - count - 1;
  });
}
