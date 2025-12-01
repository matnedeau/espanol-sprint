// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ : Leçons terminées ou Leçon 1 par défaut
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. FILTRAGE : Récupération du contenu
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);
  const allVocab = allCards.filter(item => item.type === 'swipe');
  
  if (allVocab.length === 0) return [];

  // 3. Sélection de 10 mots au hasard
  const selectedItems = shuffleArray(allVocab).slice(0, 10);

  selectedItems.forEach(item => {
    // Préparation des distracteurs (mauvaises réponses)
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en);

    while (distractors.length < 3) {
        distractors.push("Autre mot");
    }

    // Construction de la phrase de contexte (si disponible)
    const contextPhrase = item.sentence 
      ? `\n(Contexte : "${item.sentence}")` 
      : `\n(Indice : ${item.context})`;

    // TYPE A : QCM
    quizQuestions.push({
      id: `qcm-${item.id}`,
      type: 'qcm',
      question: `Que signifie "${item.es}" ?${contextPhrase}`,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // TYPE B : SAISIE
    quizQuestions.push({
      id: `input-${item.id}`,
      type: 'input', 
      question: `Comment dit-on "${item.en}" ?${item.sentence ? `\n(Dans la phrase : "${item.sentence}")` : ''}`,
      correctAnswer: item.es,
      hint: item.sentence || item.context // On utilise la phrase comme indice principal si possible
    });
  });

  return shuffleArray(quizQuestions);
};