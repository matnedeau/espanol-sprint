// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ : On prend les leçons terminées, ou la leçon 1 par défaut
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. FILTRAGE : On récupère le contenu
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);
  const allVocab = allCards.filter(item => item.type === 'swipe');
  
  if (allVocab.length === 0) return [];

  // 3. SÉLECTION : On prend 10 mots au hasard
  const selectedItems = shuffleArray(allVocab).slice(0, 10);

  selectedItems.forEach(item => {
    // Mauvaises réponses (Distracteurs)
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en);

    while (distractors.length < 3) {
        distractors.push("Autre mot");
    }

    // QUESTION QCM : On montre la phrase de contexte en espagnol si elle existe
    const qcmContext = item.sentence 
        ? `\n(Phrase : "${item.sentence}")` 
        : `\n(Indice : ${item.context})`;

    quizQuestions.push({
      id: `qcm-${item.id}`,
      type: 'qcm',
      question: `Que signifie "${item.es}" ?${qcmContext}`,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // QUESTION SAISIE : On utilise la phrase comme "Indice" principal
    // Si on n'a pas de phrase, on utilise le contexte habituel
    const inputHint = item.sentence ? `Phrase : ${item.sentence}` : item.context;

    quizQuestions.push({
      id: `input-${item.id}`,
      type: 'input', 
      question: `Comment dit-on "${item.en}" ?`,
      correctAnswer: item.es,
      hint: inputHint // C'est ici que ça change ! L'indice sera la phrase.
    });
  });

  return shuffleArray(quizQuestions);
};