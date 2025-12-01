// @ts-nocheck
import { INITIAL_LESSONS_CONTENT } from './content';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent, completedIds) => {
  let quizQuestions = [];
  
  // 1. SÉCURITÉ : Si l'utilisateur n'a rien fini, on utilise la Leçon 1 par défaut
  const targetIds = (completedIds && completedIds.length > 0) ? completedIds : [1];

  // 2. FILTRAGE : On ne récupère QUE le contenu des leçons ciblées
  const allCards = targetIds.flatMap(id => allLessonsContent[id] || []);

  // 3. On filtre pour ne garder que le vocabulaire (swipe)
  const allVocab = allCards.filter(item => item.type === 'swipe');
  
  // S'il n'y a pas assez de mots, on évite le crash
  if (allVocab.length === 0) return [];

  // 4. On sélectionne 10 mots au hasard parmi CEUX APPRIS
  const selectedItems = shuffleArray(allVocab).slice(0, 10);

  selectedItems.forEach(item => {
    // -- PRÉPARATION DES DISTRACTEURS (QCM) --
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en);

    while (distractors.length < 3) {
        distractors.push("Autre mot");
    }

    // -- LOGIQUE DE CONTEXTE AVANCÉE --
    
    // Est-ce qu'on a une phrase d'exemple ? (Générée dans les nouvelles leçons)
    const hasSentence = !!item.sentence;
    
    // Création de la phrase à trous (On remplace le mot espagnol par _______)
    // On utilise une Regex insensible à la casse pour trouver "El libro" dans "Tengo el libro."
    let maskedSentence = "";
    if (hasSentence) {
        try {
            // On échappe les caractères spéciaux au cas où
            const escapedWord = item.es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gi');
            maskedSentence = item.sentence.replace(regex, '_______');
        } catch (e) {
            maskedSentence = item.sentence; // Fallback si erreur regex
        }
    }

    // --- TYPE A : QCM (Compréhension) ---
    // Si phrase dispo : "Dans cette phrase, que veut dire... ?"
    // Sinon : "Que signifie... ?"
    const qcmQuestion = hasSentence 
        ? `Dans la phrase : "${item.sentence}"\nQue signifie "${item.es}" ?`
        : `Que signifie "${item.es}" ?\n(Indice : ${item.context})`;

    quizQuestions.push({
      id: `qcm-${item.id}`,
      type: 'qcm',
      question: qcmQuestion,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // --- TYPE B : SAISIE (Production / Texte à trous) ---
    // Si phrase dispo : "Complète la phrase : Tengo _______."
    // Sinon : "Comment dit-on... ?"
    
    if (hasSentence) {
        quizQuestions.push({
            id: `input-${item.id}`,
            type: 'input', 
            question: `Complète la phrase :\n"${maskedSentence}"`,
            correctAnswer: item.es,
            hint: `Traduction : ${item.en}` // L'indice devient la traduction française
        });
    } else {
        // Fallback pour les anciennes leçons sans phrase
        quizQuestions.push({
            id: `input-${item.id}`,
            type: 'input', 
            question: `Comment dit-on "${item.en}" ?`,
            correctAnswer: item.es,
            hint: item.context 
        });
    }
  });

  return shuffleArray(quizQuestions);
};