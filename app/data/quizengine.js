// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

// Fonction utilitaire pour mélanger
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent) => {
  let quizQuestions = [];
  
  // 1. On récupère toutes les cartes de toutes les leçons
  const allCards = Object.values(allLessonsContent).flat();

  // 2. On filtre pour ne garder que le vocabulaire
  const allVocab = allCards.filter(item => item.type === 'swipe');
  
  // 3. On sélectionne 10 mots au hasard pour la session
  const selectedItems = shuffleArray(allVocab).slice(0, 10);

  selectedItems.forEach(item => {
    
    // --- MODE 1 : QCM (On garde !) ---
    // "Que veut dire ce mot ?" (Facile)
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en);

    quizQuestions.push({
      id: `qcm-${item.id}`,
      type: 'qcm',
      question: `Que signifie "${item.es}" ?`,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // --- MODE 2 : SAISIE (Nouveau !) ---
    // "Écris ce mot en espagnol" (Difficile)
    quizQuestions.push({
      id: `input-${item.id}`,
      type: 'input', 
      question: `Comment dit-on "${item.en}" ?`,
      correctAnswer: item.es,
      hint: item.context // Petit indice (ex: "Cuisine")
    });
  });

  // On mélange les questions QCM et Saisie
  return shuffleArray(quizQuestions);
};