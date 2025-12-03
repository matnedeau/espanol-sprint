// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);
  
  const vocabCards = allCards.filter(item => item.type === 'swipe');
  const grammarCards = allCards.filter(item => item.type === 'grammar');
  
  if (vocabCards.length === 0 && grammarCards.length === 0) return [];

  // --- 1. VOCABULAIRE (8 Questions) ---
  const selectedVocab = shuffleArray(vocabCards).slice(0, 8);

  selectedVocab.forEach(item => {
    const hasSentence = !!item.sentence;
    let questionText = "";
    let hintText = "";

    if (hasSentence) {
        // Phrase à trous
        try {
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            const maskedSentence = item.sentence.replace(regex, '_______');
            
            questionText = `Complète la phrase :\n"${maskedSentence}"`;
            hintText = `Traduction du mot : ${item.en}`;
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

  // --- 2. GRAMMAIRE (6 Questions) ---
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
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

  // --- 3. TRADUCTION DE PHRASE COMPLÈTE (6 Questions) ---
  // On cherche les cartes qui ont une traduction de phrase disponible
  const sentenceCards = vocabCards.filter(item => item.sentence && item.sentence_trans);
  const selectedSentences = shuffleArray(sentenceCards).slice(0, 6);

  selectedSentences.forEach(item => {
      quizQuestions.push({
          id: `sentence-${item.id}`,
          type: 'input',
          question: `Que veut dire la phrase suivante :\n"${item.sentence}" ?`,
          correctAnswer: item.sentence_trans, // La réponse attendue est la phrase en français
          hint: `Traduction littérale : ${item.en}...`
      });
  });

  // Total visé : ~20 questions
  return shuffleArray(quizQuestions);
};