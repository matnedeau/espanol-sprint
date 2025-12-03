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

  // --- PARTIE 1 : TEXTE À TROUS (8 Questions) ---
  const selectedVocab = shuffleArray(vocabCards).slice(0, 8);

  selectedVocab.forEach(item => {
    const hasSentence = !!item.sentence;
    let questionText = "";
    let hintText = "";

    if (hasSentence) {
        // On remplace le mot cible par _______
        try {
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            const maskedSentence = item.sentence.replace(regex, '_______');
            
            questionText = `Complète la phrase en espagnol :\n"${maskedSentence}"`;
            hintText = `Le mot manquant est la traduction de : "${item.en}"`;
        } catch (e) {
            questionText = `Comment écrit-on "${item.en}" en espagnol ?`;
            hintText = item.context;
        }
    } else {
        questionText = `Comment écrit-on "${item.en}" en espagnol ?`;
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

  // --- PARTIE 2 : CONJUGAISON (6 Questions) ---
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          const verbName = item.title.split('(').pop().replace(')', '').trim();

          quizQuestions.push({
              id: `gram-${item.id}-${line.pronoun}`,
              type: 'input',
              question: `Conjugue le verbe "${verbName}" :\n${line.pronoun} ...`,
              correctAnswer: line.verb,
              hint: `Cela signifie : ${line.fr}`
          });
      }
  });

  // --- PARTIE 3 : TRADUCTION DE PHRASE (6 Questions) ---
  // SÉCURITÉ : On ne garde que les cartes qui ont VRAIMENT une traduction (sentence_trans)
  // Cela évite les questions "undefined"
  const sentenceCards = vocabCards.filter(item => item.sentence && item.sentence_trans);
  
  if (sentenceCards.length > 0) {
      const selectedSentences = shuffleArray(sentenceCards).slice(0, 6);

      selectedSentences.forEach(item => {
          quizQuestions.push({
              id: `sentence-${item.id}`,
              type: 'input',
              question: `Écris cette phrase en espagnol :\n"${item.sentence_trans}"`,
              correctAnswer: item.sentence,
              hint: `Commence par : ${item.es.substring(0, 1)}...`
          });
      });
  }

  // Si on n'a pas assez de phrases traduites (anciennes leçons), on complète avec du vocabulaire standard
  while (quizQuestions.length < 20 && vocabCards.length > 8) {
      const extraItem = vocabCards[Math.floor(Math.random() * vocabCards.length)];
      // On évite les doublons d'ID si possible, mais pour le MVP on ajoute
      quizQuestions.push({
          id: `extra-${extraItem.id}-${Math.random()}`,
          type: 'input',
          question: `Rappel : Comment dit-on "${extraItem.en}" ?`,
          correctAnswer: extraItem.es,
          hint: extraItem.context
      });
  }

  return shuffleArray(quizQuestions).slice(0, 20); // On s'assure d'avoir max 20 questions
};