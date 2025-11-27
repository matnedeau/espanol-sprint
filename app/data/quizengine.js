// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { X, Trophy, RefreshCw } from 'lucide-react';
// On importe tes vraies données de leçons
import { INITIAL_LESSONS_CONTENT } from './content';

// --- LE MOTEUR DE GÉNÉRATION (Logique) ---

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateSuperQuiz = (allLessonsContent) => {
  let quizQuestions = [];
  
  // On transforme l'objet des leçons en une simple liste de toutes les cartes
  // On récupère toutes les valeurs (tableaux de cartes) de l'objet INITIAL_LESSONS_CONTENT
  const allCards = Object.values(allLessonsContent).flat();

  // On filtre pour ne garder que le vocabulaire (swipe) et la grammaire
  const allVocab = allCards.filter(item => item.type === 'swipe');
  const allGrammar = allCards.filter(item => item.type === 'grammar');

  // --- GÉNÉRATION TYPE 1 : VOCABULAIRE (QCM & CONSTRUCTION) ---
  // On prend 10 mots au hasard pour éviter un quiz trop long
  const selectedVocab = shuffleArray(allVocab).slice(0, 10);

  selectedVocab.forEach(item => {
    // TYPE A : QCM (Traduction ES -> FR)
    const distractors = shuffleArray(allVocab.filter(v => v.es !== item.es))
      .slice(0, 3)
      .map(v => v.en);

    quizQuestions.push({
      id: `qcm-${item.id}`,
      type: 'qcm',
      question: `Que signifie "${item.es}" ?`,
      correctAnswer: item.en,
      options: shuffleArray([item.en, ...distractors])
    });

    // TYPE B : CONSTRUCTION (Puzzle)
    const isPhrase = item.es.includes(' ');
    const parts = isPhrase ? item.es.split(' ') : item.es.split('');
    
    quizQuestions.push({
      id: `build-${item.id}`,
      type: 'construction',
      question: `Traduisez : "${item.en}"`,
      correctAnswer: item.es,
      parts: shuffleArray([...parts]),
      isPhrase: isPhrase
    });
  });

  // On retourne le tout mélangé
  return shuffleArray(quizQuestions);
};

// --- LE COMPOSANT VISUEL (Affichage) ---

const QuizZone = ({ onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // On génère le quiz au chargement
    const generated = generateSuperQuiz(INITIAL_LESSONS_CONTENT);
    setQuestions(generated);
  }, []);

  if (questions.length === 0) return <div className="p-10 text-center flex items-center justify-center h-full">Chargement du Super Quiz...</div>;

  // Écran de fin
  if (finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in">
        <div className="bg-white p-8 rounded-full shadow-xl">
          <Trophy size={64} className="text-yellow-500" />
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Quiz Terminé !</h2>
          <p className="text-xl text-yellow-900 font-bold">Score : {score} / {questions.length}</p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button onClick={() => window.location.reload()} className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all">
            <RefreshCw size={20} /> Recommencer
          </button>
          <button onClick={onExit} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:scale-105 transition-all">
            Quitter
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  // Gestion réponse
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer([]);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(p => p + 1);
      } else {
        setFinished(true);
      }
    }, 1000); // Pause de 1s pour voir le résultat
  };

  const handleOptionClick = (opt) => handleAnswer(opt === currentQ.correctAnswer);

  const handlePartClick = (part) => {
    const newAnswer = [...userAnswer, part];
    setUserAnswer(newAnswer);
    
    // Vérification automatique quand la longueur est atteinte
    const constructedString = currentQ.isPhrase ? newAnswer.join(' ') : newAnswer.join('');
    if (constructedString.length >= currentQ.correctAnswer.length) {
      handleAnswer(constructedString === currentQ.correctAnswer);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
          <X size={24} />
        </button>
        <div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          />
        </div>
        <div className="font-black text-indigo-600">{score} pts</div>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 text-center mb-8">
          {currentQ.question}
        </h2>

        {/* Feedback Visuel */}
        {feedback === 'correct' && <div className="mb-6 px-6 py-2 bg-green-100 text-green-700 rounded-full font-bold animate-bounce">✨ Correct !</div>}
        {feedback === 'wrong' && <div className="mb-6 px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold animate-shake">❌ La réponse était : {currentQ.correctAnswer}</div>}

        {/* MODE QCM */}
        {currentQ.type === 'qcm' && (
          <div className="grid grid-cols-1 w-full gap-3">
            {currentQ.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => !feedback && handleOptionClick(opt)}
                className="w-full p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 font-bold text-slate-700 transition-all text-lg shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* MODE CONSTRUCTION */}
        {currentQ.type === 'construction' && (
          <div className="w-full">
            <div className="min-h-[80px] bg-white rounded-2xl border-2 border-dashed border-slate-300 p-4 mb-6 flex flex-wrap gap-2 justify-center items-center">
               {userAnswer.map((p, i) => (
                 <span key={i} className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold shadow-md animate-in zoom-in">{p}</span>
               ))}
               {userAnswer.length === 0 && <span className="text-slate-400 text-sm">Cliquez sur les lettres...</span>}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {currentQ.parts.map((part, i) => {
                // Astuce pour masquer les lettres déjà utilisées (gestion simple des doublons par index serait mieux mais ceci suffit pour démo)
                // Ici on simplifie : on cache si utilisé.
                return (
                  <button 
                    key={i} 
                    onClick={() => !feedback && handlePartClick(part)}
                    className="px-4 py-3 bg-white border-b-4 border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
                  >
                    {part}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setUserAnswer([])} className="mt-6 text-sm text-slate-400 w-full text-center hover:text-indigo-500 font-bold">
              Effacer tout ↺
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizZone;