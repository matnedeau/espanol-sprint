// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, userData) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ & RÉCUPÉRATION DONNÉES
  const completedIds = userData?.completedLessons || [1];
  const userVocab = userData?.vocab || [];

  // 2. SRS : RÉCUPÉRER LES CARTES À REVOIR
  // On regarde si l'intervalle de révision est dépassé pour chaque mot appris
  const now = Date.now();
  const srsReviewCards = userVocab.filter(item => {
      if(!item.lastReview || !item.interval || item.type !== 'swipe') return false;
      
      const lastReviewTime = new Date(item.lastReview).getTime();
      const intervalMs = item.interval * 24 * 60 * 60 * 1000;
      
      // Est-ce que le temps écoulé depuis la dernière révision est supérieur à l'intervalle requis ?
      return (now - lastReviewTime) > intervalMs;
  });

  // On transforme ces cartes "à revoir" en questions prioritaires
  const srsQuestions = srsReviewCards.map(item => ({
      id: `srs-${item.id}-${now}`,
      type: 'input', // On force l'écriture pour bien vérifier la mémorisation
      question: `Rappel SRS : Comment dit-on "${item.en}" ?`,
      correctAnswer: item.es,
      hint: item.context || "Révision espacée"
  }));

  // On ajoute d'abord les questions SRS (jusqu'à 10 max pour ne pas saturer le quiz)
  quizQuestions = [...shuffleArray(srsQuestions).slice(0, 10)];

  // 3. COMPLÉTER AVEC LE CONTENU STANDARD (MÉLANGE)
  // On récupère tout le contenu des leçons terminées pour combler les trous
  const allCards = completedIds.flatMap(id => allLessonsContent[id] || []);
  
  const vocabCards = allCards.filter(item => item.type === 'swipe');
  const grammarCards = allCards.filter(item => item.type === 'grammar');
  
  // Sécurité si pas assez de contenu
  if (vocabCards.length === 0 && grammarCards.length === 0 && quizQuestions.length === 0) return [];

  // --- [BLIND-LISTENING] INSERTION D'EXERCICES D'ÉCOUTE ---
  const remainingSlots = 20 - quizQuestions.length;
  
  if (remainingSlots > 0) {
      // On sélectionne des cartes de vocabulaire au hasard pour remplir
      const selectedVocab = shuffleArray(vocabCards).slice(0, Math.floor(remainingSlots / 2));

      selectedVocab.forEach(item => {
        const rand = Math.random();
        
        // 20% de chance de transformer une carte vocabulaire en "Listening" (Écoute aveugle)
        // Condition : il faut que le texte espagnol existe
        if (rand < 0.2 && item.es) {
             quizQuestions.push({
                id: `listen-${item.id}`,
                type: 'listening', // Ce type sera géré par le composant ListeningCard dans page.tsx
                audioText: item.es,
                question: "Écris ce que tu entends :",
                correctAnswer: item.es,
                hint: "Écoute bien l'audio."
             });
        } else {
            // Sinon, logique standard (Traduction ou Phrase à trous)
            const hasSentence = !!item.sentence;
            let questionText = "";
            let hintText = "";

            if (hasSentence) {
                try {
                    // On masque le mot cible dans la phrase d'exemple
                    const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(escapedWord, 'gi');
                    const maskedSentence = item.sentence.replace(regex, '_______');
                    
                    questionText = `Complète la phrase :\n"${maskedSentence}"`;
                    hintText = `Mot recherché : ${item.en}`;
                } catch (e) {
                    // Fallback si l'expression régulière échoue
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
        }
      });
  }

  // --- PARTIE GRAMMAIRE INTELLIGENTE ---
  // On ajoute environ 6 questions de grammaire
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          // On choisit une ligne de conjugaison au hasard (Je, Tu, Nous...)
          // Grâce à la mise à jour de content.ts, on a maintenant les 6 formes !
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          
          // Nettoyage du titre pour l'affichage (ex: "Ser (Identité)" -> "Ser")
          let verbName = item.title;
          if (verbName.includes("(")) {
              verbName = verbName.split('(')[0].trim();
          }
          verbName = verbName.replace(/Verbe\s*:?/i, "").trim();

          quizQuestions.push({
              id: `gram-${item.id}-${line.pronoun}`,
              type: 'input',
              question: `Conjugue "${verbName}" :\n${line.pronoun} ...`,
              correctAnswer: line.verb,
              hint: `Sens : ${line.fr}`
          });
      }
  });

  // --- REMPLISSAGE FINAL (FILLER) ---
  // Si on n'a toujours pas 20 questions, on remplit avec du vocabulaire simple
  const fillerVocab = shuffleArray(vocabCards);
  let fillerIndex = 0;

  while (quizQuestions.length < 20 && fillerIndex < fillerVocab.length) {
      const item = fillerVocab[fillerIndex];
      
      // On vérifie qu'on n'a pas déjà posé cette question (via SRS ou autre)
      const isDuplicate = quizQuestions.some(q => 
          q.id === `vocab-${item.id}` || 
          q.id.startsWith(`srs-${item.id}`) ||
          q.id.startsWith(`listen-${item.id}`)
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

  // On mélange le tout pour que les questions SRS ne soient pas toutes au début
  return shuffleArray(quizQuestions).slice(0, 20);
};