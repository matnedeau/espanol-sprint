// Générateur de Quiz Intelligent pour EspañolSprint
// Transforme les données brutes en questions claires (FR -> ES ou Dictée)

export function generateSuperQuiz(lessonsContent, userData) {
  // 1. Récupération de tout le vocabulaire disponible
  // On ne prend que les cartes "swipe" qui contiennent des mots/phrases valides
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

  // Sécurité : Si pas de contenu, on renvoie une question vide pour éviter le crash
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
  // (Amélioration possible : prioriser les mots que l'utilisateur connaît déjà via userData.vocab)
  const selection = allItems.sort(() => 0.5 - Math.random()).slice(0, 10);

  // 3. Transformation en Questions Explicites
  return selection.map((item, index) => {
    const mode = Math.random(); // Choix aléatoire du type de question

    // --- TYPE 1 : DICTÉE (40% de chance) ---
    // L'utilisateur entend l'audio et doit l'écrire en Espagnol
    if (mode < 0.4) {
      return {
        id: `q_${index}_listen`,
        type: 'listening', // Active la ListeningCard
        question: "Écoute et écris", // Texte affiché (optionnel)
        audioText: item.es, // Ce qui est lu par l'IA
        correctAnswer: item.es, // Ce que l'utilisateur doit écrire
        hint: item.en // Indice : la traduction française
      };
    }

    // --- TYPE 2 : TRADUCTION DE PHRASE (30% de chance) ---
    // Si une phrase d'exemple existe, on demande de la traduire
    if (mode < 0.7 && item.sentence && item.sentence_trans) {
      return {
        id: `q_${index}_sentence`,
        type: 'input', // Active la InputCard
        question: `Traduis : "${item.sentence_trans}"`, // EXPLICITE : On donne la phrase FR
        answer: [item.sentence], // Réponse attendue : Phrase ES
        hint: "Phrase complète en espagnol"
      };
    }

    // --- TYPE 3 : VOCABULAIRE PUR (30% ou Fallback) ---
    // On donne le mot français, l'utilisateur doit écrire le mot espagnol
    return {
      id: `q_${index}_vocab`,
      type: 'input',
      question: `Comment dit-on "${item.en}" ?`, // EXPLICITE : On demande le mot ES
      answer: [item.es],
      hint: item.context || "Mot de vocabulaire"
    };
  });
}