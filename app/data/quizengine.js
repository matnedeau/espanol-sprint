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
  const selectedVocab = shuffleArray(vocabCards).slice(0, 8);

  selectedVocab.forEach(item => {
    const hasSentence = !!item.sentence;
    let questionText = "";
    let hintText = "";

    if (hasSentence) {
        try {
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            const maskedSentence = item.sentence.replace(regex, '_______');
            
            questionText = `Complète la phrase :\n"${maskedSentence}"`;
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

  // --- PARTIE 2 : GRAMMAIRE INTELLIGENTE (6 Questions) ---
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          
          // --- NETTOYAGE DU TITRE ---
          let verbName = item.title;
          const ignoreList = ["Rappel", "Météo", "Auxiliaire", "Singulier", "Pluriel", "Intro", "Nuances"];
          
          if (ignoreList.some(word => verbName.includes(word))) {
              // Cas "Ir (Rappel)" -> Garde "Ir"
              verbName = verbName.replace(/\s*\(.*?\)/, '');
          } else if (verbName.includes("(")) {
              // Cas "Être (Ser)" -> Garde "Ser"
              verbName = verbName.split('(').pop().replace(')', '');
          }
          verbName = verbName.replace(/Verbe\s*:?/i, "").trim();

          // --- ADAPTATION DE LA QUESTION ---
          let questionText = `Conjugue "${verbName}" :\n${line.pronoun} ...`;

          // Cas Spécial : L'heure (pour éviter "Conjugue L'heure")
          if (item.title.includes("L'heure") || item.title.includes("Heure")) {
               questionText = `Quelle heure est-il ?\n${line.pronoun} ...`;
          }
          // Cas Spécial : Pronoms (COD, COI...)
          else if (item.title.includes("Pronom") || item.title.includes("COD")) {
               questionText = `Traduis avec le bon pronom :\n${line.pronoun} ...`;
          }

          quizQuestions.push({
              id: `gram-${item.id}-${line.pronoun}`,
              type: 'input',
              question: questionText,
              correctAnswer: line.verb,
              hint: `Sens : ${line.fr}`
          });
      }
  });

  // --- PARTIE 3 : TRADUCTION DE PHRASE (6 Questions) ---
  const sentenceCards = vocabCards.filter(item => item.sentence && item.sentence_trans);
  const selectedSentences = shuffleArray(sentenceCards).slice(0, 6);

  selectedSentences.forEach(item => {
      quizQuestions.push({
          id: `sentence-${item.id}`,
          type: 'input',
          question: `Traduis cette phrase en espagnol :\n"${item.sentence_trans}"`,
          correctAnswer: item.sentence,
          hint: `Indice : ${item.es}...`
      });
  });

  return shuffleArray(quizQuestions);
};