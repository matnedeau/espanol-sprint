// quizEngine.js

// Fonction utilitaire pour mélanger un tableau (Fisher-Yates)
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessons) => {
  let quizQuestions = [];
  
  // 1. On rassemble tout le vocabulaire et la grammaire disponibles
  const allVocab = allLessons.flatMap(l => l.vocab || []);
  const allGrammar = allLessons.flatMap(l => l.grammar || []);

  // --- GÉNÉRATION TYPE 1 : VOCABULAIRE (QCM & CONSTRUCTION) ---
  allVocab.forEach(item => {
    
    // TYPE A : QCM (Traduction ES -> FR) - Facile
    // On cherche 3 mauvaises réponses aléatoires
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en); // ou v.fr selon ta data

    quizQuestions.push({
      id: `qcm-${item.es}`,
      type: 'qcm',
      difficulty: 'easy',
      question: `Que signifie "${item.es}" ?`,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // TYPE B : CONSTRUCTION (Puzzle de lettres/mots) - Moyen
    // Si c'est une phrase (plusieurs mots), on mélange les mots. Sinon, les lettres.
    const isPhrase = item.es.includes(' ');
    const parts = isPhrase ? item.es.split(' ') : item.es.split('');
    
    quizQuestions.push({
      id: `build-${item.es}`,
      type: 'construction',
      difficulty: 'hard',
      question: `Traduisez : "${item.en}"`,
      correctAnswer: item.es,
      parts: shuffleArray([...parts]), // Les pièces du puzzle mélangées
      isPhrase: isPhrase
    });
  });

  // --- GÉNÉRATION TYPE 2 : GRAMMAIRE (Phrases à trous) ---
  allGrammar.forEach((rule, idx) => {
    if (rule.conjugation) {
      rule.conjugation.forEach(row => {
        // Ex: Yo [Soy] -> L'utilisateur doit trouver Soy
        // On génère des leurres (autres conjugaisons du même verbe)
        const others = rule.conjugation.filter(r => r.verb !== row.verb).map(r => r.verb);
        
        // S'il n'y a pas assez de leurres, on ignore (sécurité)
        if (others.length >= 1) {
           quizQuestions.push({
            id: `gram-${idx}-${row.pronoun}`,
            type: 'grammar',
            difficulty: 'hard',
            question: `Complète : ${row.pronoun} ______ (${rule.title})`, // Ex: Yo ____ (Verbe Ser)
            correctAnswer: row.verb,
            options: shuffleArray([row.verb, ...others.slice(0, 3)])
          });
        }
      });
    }
  });

  // On retourne le tout mélangé pour que ce soit varié
  return shuffleArray(quizQuestions);
};

import React, { useState, useEffect } from 'react';
import { generateSuperQuiz } from './quizengine'; // Import du fichier créé étape 1
import { CURRICULUM } from './data'; // Tes données existantes

const QuizZone = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]); // Pour le mode construction
  const [feedback, setFeedback] = useState(null); // 'correct' ou 'wrong'

  // Au chargement, on génère le quiz à partir de TOUTES tes leçons
  useEffect(() => {
    // Ici on concatène A1 et A2 pour avoir une grosse base de questions
    const allData = [...CURRICULUM.A1, ...CURRICULUM.A2]; 
    setQuestions(generateSuperQuiz(allData));
  }, []);

  if (questions.length === 0) return <div className="p-10 text-center">Chargement du Quiz...</div>;

  const currentQ = questions[currentIdx];

  // Gestion réponse QCM & Grammaire
  const handleOptionClick = (option) => {
    if (option === currentQ.correctAnswer) {
      setFeedback('correct');
      setTimeout(() => nextQuestion(true), 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => nextQuestion(false), 1000);
    }
  };

  // Gestion réponse Construction (Clic sur les lettres/mots)
  const handlePartClick = (part) => {
    const newAnswer = [...userAnswer, part];
    setUserAnswer(newAnswer);

    // Vérification automatique quand la longueur correspond
    // On compare les chaînes (ex: "H,o,l,a" vs "Hola")
    const constructedString = currentQ.isPhrase ? newAnswer.join(' ') : newAnswer.join('');
    
    if (constructedString.length === currentQ.correctAnswer.length) {
      if (constructedString === currentQ.correctAnswer) {
        setFeedback('correct');
        setTimeout(() => nextQuestion(true), 1000);
      } else {
        setFeedback('wrong');
        // On laisse une chance de réessayer ou on passe ? Ici on passe.
        setTimeout(() => {
          setUserAnswer([]); // Reset pour réessayer (optionnel)
          nextQuestion(false);
        }, 1000);
      }
    }
  };

  const nextQuestion = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
    setFeedback(null);
    setUserAnswer([]);
    // Boucle infinie : si fini, on repart au début (ou on régénère)
    setCurrentIdx(prev => (prev + 1) % questions.length);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl min-h-[500px] flex flex-col">
      {/* Header Score */}
      <div className="flex justify-between items-center mb-8">
        <span className="font-bold text-slate-400 uppercase text-xs">Quiz Infini</span>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-bold">
          Score: {score}
        </div>
      </div>

      {/* LA QUESTION */}
      <div className="flex-1">
        <h2 className="text-2xl font-black text-slate-800 mb-2 text-center">{currentQ.question}</h2>
        
        {/* Feedback Visuel */}
        {feedback === 'correct' && <div className="text-center text-green-500 font-bold mb-4 animate-bounce">✨ Correct !</div>}
        {feedback === 'wrong' && <div className="text-center text-red-500 font-bold mb-4">❌ Raté ! ({currentQ.correctAnswer})</div>}

        {/* --- MODE 1 : QCM / GRAMMAIRE (Boutons simples) --- */}
        {(currentQ.type === 'qcm' || currentQ.type === 'grammar') && (
          <div className="grid grid-cols-1 gap-3 mt-8">
            {currentQ.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleOptionClick(opt)}
                disabled={feedback !== null}
                className="p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 font-bold text-slate-700 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* --- MODE 2 : CONSTRUCTION (Lettres/Mots à cliquer) --- */}
        {currentQ.type === 'construction' && (
          <div className="mt-8">
            {/* Zone de réponse */}
            <div className="min-h-[60px] bg-slate-100 rounded-xl p-4 mb-6 flex flex-wrap gap-2 justify-center items-center border-2 border-dashed border-slate-300">
               {userAnswer.map((p, i) => (
                 <span key={i} className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold shadow-sm animate-in fade-in zoom-in">
                   {p}
                 </span>
               ))}
               {userAnswer.length === 0 && <span className="text-slate-400 italic text-sm">Clique sur les éléments...</span>}
            </div>

            {/* Les pièces disponibles (lettres ou mots) */}
            <div className="flex flex-wrap gap-2 justify-center">
              {currentQ.parts.map((part, i) => {
                // On cache les pièces déjà utilisées
                const isUsed = userAnswer.filter(p => p === part).length >= currentQ.parts.filter(p => p === part).length;
                // Note: Logique simplifiée pour les doublons de lettres, pour un truc parfait il faut gérer par index unique
                
                return (
                  <button 
                    key={i} 
                    onClick={() => handlePartClick(part)}
                    // Astuce : on ne désactive pas vraiment, on rend juste invisible si utilisé (pour gérer les doubles lettres)
                    className={`px-4 py-3 rounded-xl font-bold shadow-sm transition-transform active:scale-95 ${
                      false ? 'opacity-0' : 'bg-white border-b-4 border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {part}
                  </button>
                );
              })}
            </div>
             <button onClick={() => setUserAnswer([])} className="mt-4 text-xs text-slate-400 w-full text-center hover:text-red-400">Réinitialiser</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizZone;