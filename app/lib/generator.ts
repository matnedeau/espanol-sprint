import { DAILY_READINGS } from './data-bank';
import { getAuthoredLesson } from './lessons';

// Les leçons sont rédigées à la main dans app/lib/lessons/ (une progression pédagogique par niveau).
// Ce fichier ne fait plus que les servir, et fabriquer les examens et la lecture du jour.

/** Cartes d'une leçon (tableau vide si le numéro n'existe pas). */
export const generateStructuredLesson = (id: number) => getAuthoredLesson(id) || [];

// --- FONCTIONS UTILITAIRES POUR EXAMENS ET LECTURE ---

export const generateExamContent = (allContent: any, startId: number, endId: number, levelName: string, examId: number) => {
  // L'examen pioche dans les exercices des leçons du niveau (pas dans les phrases d'exemple à retraduire mot pour mot).
  // Une même question pouvant revenir en « rappel » d'une leçon à l'autre, on ne la garde qu'une fois.
  const seen = new Set<string>();
  const pool: any[] = [];
  for (let i = startId; i <= endId; i++) {
    for (const card of allContent[i] || []) {
      if (card.type !== 'input' && card.type !== 'choice') continue;
      const question = String(card.question || '').replace(/^Rappel · /, '');
      if (seen.has(question)) continue;
      seen.add(question);
      pool.push({ ...card, question, label: undefined });
    }
  }
  if (pool.length < 10) return [{ id: examId, type: "structure", title: "Examen indisponible", formula: "Contenu en cours de chargement", example: "Réessaie dans un instant", note: "Si le problème persiste, contacte le support." }];
  const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 20);

  return [
    { id: examId, type: "structure", title: `Examen ${levelName}`, formula: "Test final", example: "20 questions", note: "Objectif : 16 bonnes réponses sur 20" },
    ...selected.map((item: any, idx: number) => ({ ...item, id: examId + idx + 1 })),
  ];
};

export const getDailyReading = (userLevel: string) => {
  const targetLevel = userLevel || "A1";
  const levelReadings = DAILY_READINGS.filter(r => r.level === targetLevel);
  const pool = levelReadings.length > 0 ? levelReadings : DAILY_READINGS;
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return pool[dayIndex % pool.length];
};

export const generateAllContent = () => {
  const content: any = {};
  for (let i = 1; i <= 100; i++) content[i] = generateStructuredLesson(i);
  return content;
};
