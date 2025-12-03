// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ : Si rien n'est fait, on prend la leçon 1
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. RÉCUPÉRATION DU CONTENU (Vocabulaire + Grammaire)
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);
  
  const vocabCards = allCards.filter(item => item.type === 'swipe');
  const grammarCards = allCards.filter(item => item.type === 'grammar');
  
  if (vocabCards.length === 0 && grammarCards.length === 0) return [];

  // --- PARTIE 1 : VOCABULAIRE (8 Questions) ---
  // On privilégie les phrases à trous, sinon traduction directe
  const selectedVocab = shuffleArray(vocabCards).slice(0, 8);

  selectedVocab.forEach(item => {
    const hasSentence = !!item.sentence;
    let questionText = "";
    let hintText = "";

    if (hasSentence) {
        // MODE DIFFICILE : Phrase à trous
        // On cache le mot dans la phrase (insensible à la casse)
        try {
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            const maskedSentence = item.sentence.replace(regex, '_______');
            
            questionText = `Complète la phrase :\n"${maskedSentence}"`;
            hintText = `Traduction du mot : ${item.en}`;
        } catch (e) {
            // Fallback si erreur
            questionText = `Comment dit-on "${item.en}" ?`;
            hintText = item.context;
        }
    } else {
        // MODE STANDARD : Traduction
        questionText = `Comment dit-on "${item.en}" ?`;
        hintText = item.context;
    }

    quizQuestions.push({
      id: `vocab-${item.id}`,
      type: 'input', // Toujours Input, plus de QCM
      question: questionText,
      correctAnswer: item.es,
      hint: hintText
    });
  });

  // --- PARTIE 2 : GRAMMAIRE (4 Questions) ---
  // C'est nouveau ! On teste les conjugaisons apprises.
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 4);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          // On choisit une ligne de conjugaison au hasard (ex: "Nosotros")
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          
          // On nettoie le titre (ex: "Être (Ser)" -> "Ser")
          const verbName = item.title.split('(').pop().replace(')', '').trim();

          quizQuestions.push({
              id: `gram-${item.id}-${line.pronoun}`,
              type: 'input',
              question: `Conjugue "${verbName}" :\n${line.pronoun} ...`,
              correctAnswer: line.verb,
              hint: `Sens : ${line.fr}`
          });
      }
  });

  // Si on n'a pas assez de questions (début de progression), on complète
  if (quizQuestions.length < 5) {
     // On peut doubler certaines questions de vocabulaire si besoin
     // Mais généralement le filtre initial suffit.
  }

  return shuffleArray(quizQuestions);
};