// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ : Si l'utilisateur n'a rien fini, on utilise la Leçon 1 par défaut
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. RÉCUPÉRATION DU CONTENU GLOBAL
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);
  
  const vocabCards = allCards.filter(item => item.type === 'swipe');
  const grammarCards = allCards.filter(item => item.type === 'grammar');
  
  if (vocabCards.length === 0 && grammarCards.length === 0) return [];

  // --- PARTIE 1 : VOCABULAIRE & CONTEXTE (8 Questions) ---
  // On privilégie les phrases à trous (Fill-in-the-blank)
  const selectedVocab = shuffleArray(vocabCards).slice(0, 8);

  selectedVocab.forEach(item => {
    const hasSentence = !!item.sentence;
    let questionText = "";
    let hintText = "";

    if (hasSentence) {
        // MODE PHRASE À TROUS
        // On essaie de masquer le mot espagnol dans la phrase
        try {
            // Échappement des caractères spéciaux pour la Regex
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            const maskedSentence = item.sentence.replace(regex, '_______');
            
            questionText = `Complète la phrase :\n"${maskedSentence}"`;
            hintText = `(Traduction du mot : ${item.en})`;
        } catch (e) {
            // Fallback si erreur technique
            questionText = `Comment dit-on "${item.en}" ?`;
            hintText = item.context;
        }
    } else {
        // MODE STANDARD (Si pas de phrase dispo)
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

  // --- PARTIE 2 : GRAMMAIRE (6 Questions) ---
  // On teste des conjugaisons précises
  const selectedGrammar = shuffleArray(grammarCards).slice(0, 6);

  selectedGrammar.forEach(item => {
      if (item.conjugation && item.conjugation.length > 0) {
          // On choisit une ligne de conjugaison au hasard (ex: "Nosotros")
          const line = item.conjugation[Math.floor(Math.random() * item.conjugation.length)];
          
          // Nettoyage du titre (ex: "Être (Ser)" -> "Ser")
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

  // --- PARTIE 3 : TRADUCTION DE PHRASE COMPLÈTE (6 Questions) ---
  // On demande de traduire une phrase entière vue en cours
  // On filtre ceux qui ont une traduction disponible (sentence_trans)
  const sentenceCards = vocabCards.filter(item => item.sentence && item.sentence_trans);
  const selectedSentences = shuffleArray(sentenceCards).slice(0, 6);

  selectedSentences.forEach(item => {
      quizQuestions.push({
          id: `sentence-${item.id}`,
          type: 'input',
          question: `Que veut dire la phrase suivante :\n"${item.sentence}" ?`,
          correctAnswer: item.sentence_trans, // La réponse attendue est en français
          hint: `Traduction littérale : ${item.en}...`
      });
  });

  // On mélange le tout pour que les types de questions soient alternés
  return shuffleArray(quizQuestions);
};