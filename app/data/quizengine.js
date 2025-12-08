// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// [SRS-LOGIC-START]
export const generateSuperQuiz = (allLessonsContent, userData) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ & RÉCUPÉRATION DONNÉES
  const completedIds = userData?.completedLessons || [1];
  const userVocab = userData?.vocab || [];

  // 2. SRS : RÉCUPÉRER LES CARTES À REVOIR
  const now = Date.now();
  const srsReviewCards = userVocab.filter(item => {
      // On vérifie que c'est une carte valide avec SRS
      if(!item.lastReview || !item.interval || item.type !== 'swipe') return false;
      
      const lastReviewTime = new Date(item.lastReview).getTime();
      const intervalMs = item.interval * 24 * 60 * 60 * 1000;
      
      // Est-ce que l'intervalle est dépassé ?
      return (now - lastReviewTime) > intervalMs;
  });

  // 3. TRANSFORMER LES CARTES SRS EN QUESTIONS
  const srsQuestions = srsReviewCards.map(item => ({
      id: `srs-${item.id}-${now}`,
      type: 'input',
      question: `Rappel SRS : Comment dit-on "${item.en}" ?`,
      correctAnswer: item.es,
      hint: item.context || "Révision espacée"
  }));

  // On ajoute d'abord les questions SRS prioritaires (jusqu'à 10 max pour laisser de la place aux autres)
  quizQuestions = [...shuffleArray(srsQuestions).slice(0, 10)];

  // 4. COMPLÉTER AVEC LE CONTENU STANDARD (LOGIQUE EXISTANTE)
  // ---------------------------------------------------------
  
  // RÉCUPÉRATION DU CONTENU DES LEÇONS COMPLÉTÉES
  const allCards = completedIds.flatMap(id => allLessonsContent[id] || []);
  
  const vocabCards = allCards.filter(item => item.type === 'swipe');
  const grammarCards = allCards.filter(item => item.type === 'grammar');
  
  if (vocabCards.length === 0 && grammarCards.length === 0 && quizQuestions.length === 0) return [];

  // --- PARTIE VOCABULAIRE (Complément) ---
  const remainingSlots = 20 - quizQuestions.length;
  if (remainingSlots > 0) {
      const selectedVocab = shuffleArray(vocabCards).slice(0, Math.floor(remainingSlots / 2));

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
  }

  // --- PARTIE GRAMMAIRE INTELLIGENTE ---
  // On remplit le reste avec de la grammaire ou des phrases
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          
          let verbName = item.title;
          const ignoreList = ["Rappel", "Météo", "Auxiliaire", "Singulier", "Pluriel", "Intro", "Nuances", "Terminaison"];
          
          if (ignoreList.some(word => verbName.includes(word))) {
              verbName = verbName.replace(/\s*\(.*?\)/, '');
          } else if (verbName.includes("(")) {
              verbName = verbName.split('(').pop().replace(')', '');
          }
          verbName = verbName.replace(/Verbe\s*:?/i, "").trim();

          let questionText = `Conjugue "${verbName}" :\n${line.pronoun} ...`;

          if (line.verb.startsWith('-')) {
              questionText = `Quelle est la terminaison pour "${verbName}" avec "${line.pronoun}" ?`;
          }
          else if (item.title.includes("Heure")) {
               questionText = `Quelle heure est-il ?\n${line.pronoun} ...`;
          }
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

  // --- REMPLISSAGE FINAL (FILLER) ---
  const fillerVocab = shuffleArray(vocabCards);
  let fillerIndex = 0;

  while (quizQuestions.length < 20 && fillerIndex < fillerVocab.length) {
      const item = fillerVocab[fillerIndex];
      
      // On évite de poser deux fois la même question
      const isDuplicate = quizQuestions.some(q => 
          q.id === `vocab-${item.id}` || 
          q.id.startsWith(`srs-${item.id}`)
      );

      if (!isDuplicate) {
           quizQuestions.push({
              id: `filler-${item.id}`,
              type: 'input',
              question: `Rappel : Comment dit-on "${item.en}" ?`,
              correctAnswer: item.es,
              hint: item.context || "..."
           });
      }
      fillerIndex++;
  }

  return shuffleArray(quizQuestions).slice(0, 20);
};
// [SRS-LOGIC-END]