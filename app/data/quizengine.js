// Générateur de Quiz Intelligent pour EspañolSprint
// Transforme les données brutes en questions claires (FR -> ES ou Dictée) avec contexte

export function generateSuperQuiz(lessonsContent, userData) {
  // 1. Récupération de tout le vocabulaire disponible
  const allItems = [];
  
  if (lessonsContent) {
    Object.values(lessonsContent).forEach(lesson => {
      if (Array.isArray(lesson)) {
        lesson.forEach(item => {
          if (item.type === 'swipe' && item.es && item.en) {
            allItems.push(item);
          }
        });
      }
    });
  }

  // Sécurité : Si pas de contenu
  if (allItems.length === 0) {
    return [{
      id: 'error',
      type: 'input',
      question: "Aucune leçon terminée.",
      answer: ["ok"],
      hint: "Fais d'abord une leçon !"
    }];
  }

  // 2. Sélection Aléatoire (10 questions)
  const selection = allItems.sort(() => 0.5 - Math.random()).slice(0, 10);

  // 3. Transformation en Questions Explicites
  return selection.map((item, index) => {
    const mode = Math.random(); // Choix aléatoire du type de question

    // --- TYPE 1 : DICTÉE (40% de chance) ---
    if (mode < 0.4) {
      return {
        id: `q_${index}_listen`,
        type: 'listening',
        question: "Écoute et écris",
        audioText: item.es,
        correctAnswer: item.es,
        hint: item.en // Indice : la traduction française
      };
    }

    // --- TYPE 2 : TRADUCTION DE PHRASE (30% de chance) ---
    if (mode < 0.7 && item.sentence && item.sentence_trans) {
      return {
        id: `q_${index}_sentence`,
        type: 'input',
        question: `Traduis : "${item.sentence_trans}"`,
        answer: [item.sentence],
        hint: "Phrase complète en espagnol"
      };
    }

    // --- TYPE 3 : VOCABULAIRE PUR (30% ou Fallback) ---
    // AMÉLIORATION ICI : Ajout du contexte pour éviter l'ambiguïté
    const contextString = item.context ? ` (${item.context})` : '';
    
    return {
      id: `q_${index}_vocab`,
      type: 'input',
      question: `Comment dit-on "${item.en}"${contextString} ?`,
      answer: [item.es],
      hint: item.context || "Mot de vocabulaire"
    };
  });
}