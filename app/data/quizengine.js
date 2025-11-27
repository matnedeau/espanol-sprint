// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// MODIFICATION ICI : On ajoute "completedIds" en argument
export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ : Si l'utilisateur n'a rien fini, on utilise la Leçon 1 par défaut
  // Sinon, on utilise sa liste de leçons terminées.
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. FILTRAGE : On ne récupère QUE le contenu des leçons ciblées
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);

  // 3. On filtre pour ne garder que le vocabulaire (swipe)
  const allVocab = allCards.filter(item => item.type === 'swipe');
  
  // S'il n'y a pas assez de mots, on évite le crash
  if (allVocab.length === 0) return [];

  // 4. On sélectionne 10 mots au hasard parmi CEUX APPRIS
  const selectedItems = shuffleArray(allVocab).slice(0, 10);

  selectedItems.forEach(item => {
    // TYPE A : QCM (On cherche les distracteurs parmi les mots connus aussi !)
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en);

    // Si on a pas assez de distracteurs connus (début du jeu), on complète avec du faux texte
    while (distractors.length < 3) {
        distractors.push("Autre mot");
    }

    quizQuestions.push({
      id: `qcm-${item.id}`,
      type: 'qcm',
      question: `Que signifie "${item.es}" ?`,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // TYPE B : SAISIE
    quizQuestions.push({
      id: `input-${item.id}`,
      type: 'input', 
      question: `Comment dit-on "${item.en}" ?`,
      correctAnswer: item.es,
      hint: item.context 
    });
  });

  return shuffleArray(quizQuestions);
};