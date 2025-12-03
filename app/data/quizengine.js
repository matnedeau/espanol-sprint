// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. RÉCUPÉRATION DU CONTENU
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);
  
  const vocabCards = allCards.filter(item => item.type === 'swipe');
  const grammarCards = allCards.filter(item => item.type === 'grammar');
  
  if (vocabCards.length === 0 && grammarCards.length === 0) return [];

  // --- PARTIE 1 : VOCABULAIRE EN CONTEXTE (8 Questions) ---
  // Objectif : Trouver le mot manquant dans la phrase espagnole
  const selectedVocab = shuffleArray(vocabCards).slice(0, 8);

  selectedVocab.forEach(item => {
    const hasSentence = !!item.sentence;
    let questionText = "";
    let hintText = "";

    if (hasSentence) {
        // Phrase à trous (Le cerveau doit deviner le mot grâce au contexte espagnol)
        try {
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            const maskedSentence = item.sentence.replace(regex, '_______');
            
            questionText = `Complète la phrase :\n"${maskedSentence}"`;
            // Indice : la traduction du mot seul, pour guider sans donner la réponse
            hintText = `Mot recherché : ${item.en}`;
        } catch (e) {
            questionText = `Comment dit-on "${item.en}" ?`;
            hintText = item.context;
        }
    } else {
        questionText = `Comment dit-on "${item.en}" ?`;
        hintText = item.context;
    }

    quizQuestions.push({
      id: `vocab-${item.id}`,
      type: 'input',
      question: questionText,
      correctAnswer: item.es,
      hint: hintText
    });
  });

  // --- PARTIE 2 : GRAMMAIRE PURE (6 Questions) ---
  // Objectif : Conjuguer correctement
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          const verbName = item.title.split('(').pop().replace(')', '').trim();

          quizQuestions.push({
              id: `gram-${item.id}-${line.pronoun}`,
              type: 'input',
              question: `Conjugue "${verbName}" au présent :\n${line.pronoun} ...`,
              correctAnswer: line.verb,
              hint: `Sens : ${line.fr}`
          });
      }
  });

  // --- PARTIE 3 : TRADUCTION DE PHRASE (6 Questions) ---
  // Objectif : Construire une phrase complète en espagnol
  // On ne demande plus de traduire vers le français, mais vers l'espagnol !
  const sentenceCards = vocabCards.filter(item => item.sentence && item.sentence_trans);
  const selectedSentences = shuffleArray(sentenceCards).slice(0, 6);

  selectedSentences.forEach(item => {
      quizQuestions.push({
          id: `sentence-${item.id}`,
          type: 'input',
          question: `Traduis cette phrase en espagnol :\n"${item.sentence_trans}"`,
          correctAnswer: item.sentence, // La réponse attendue est maintenant en ESPAGNOL
          hint: `Indice : ${item.es}...` // On donne le mot clé comme indice
      });
  });

  return shuffleArray(quizQuestions);
};