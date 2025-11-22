// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock
} from 'lucide-react';

/* --- DATASET (CONTENU) --- */

// Métadonnées pour structurer le parcours jusqu'au niveau B2
const ALL_LESSONS_INFO = [
  { id: 1, title: "Les Bases & Être", level: "A1", desc: "Salutations et identité", unlocked: true },
  { id: 2, title: "Avoir & La Famille", level: "A1", desc: "Possession et description", unlocked: false },
  { id: 15, title: "Le Passé Composé", level: "A2", desc: "Raconter hier", unlocked: false },
  { id: 45, title: "Le Subjonctif", level: "B1", desc: "Exprimer le doute", unlocked: false },
  { id: 90, title: "Débat & Politique", level: "B2", desc: "Argumentation complexe", unlocked: false },
];

const DAY_1_CONTENT = [
  { id: 1, type: "swipe", es: "Hola", en: "Bonjour", context: "Hola, ¿qué tal?" },
  { id: 2, type: "swipe", es: "Buenos días", en: "Bonjour (Matin)", context: "Buenos días, mamá" },
  { 
    id: 3, 
    type: "grammar", 
    title: "Le Verbe Être (Ser)",
    description: "Utilisé pour l'identité et l'origine.",
    conjugation: [
      { pronoun: "Yo", verb: "soy", fr: "Je suis" },
      { pronoun: "Tú", verb: "eres", fr: "Tu es" },
      { pronoun: "Él/Ella", verb: "es", fr: "Il/Elle est" },
      { pronoun: "Nosotros", verb: "somos", fr: "Nous sommes" },
      { pronoun: "Ellos", verb: "son", fr: "Ils sont" }
    ]
  },
  { id: 4, type: "input", question: "Comment dit-on 'Je suis' ?", answer: ["yo soy", "soy"], hint: "Utilise le verbe Ser" },
  { id: 5, type: "swipe", es: "Gracias", en: "Merci", context: "Muchas gracias" },
  { id: 6, type: "swipe", es: "Por favor", en: "S'il vous plaît", context: "Una mesa, por favor" },
  { id: 7, type: "swipe", es: "El agua", en: "L'eau", context: "Bebo agua" },
  { 
    id: 8, 
    type: "grammar", 
    title: "Le Verbe Avoir (Tener)",
    description: "Pour la possession et... l'âge !",
    conjugation: [
      { pronoun: "Yo", verb: "tengo", fr: "J'ai" },
      { pronoun: "Tú", verb: "tienes", fr: "Tu as" },
      { pronoun: "Él/Ella", verb: "tiene", fr: "Il/Elle a" },
    ]
  },
  { id: 9, type: "input", question: "Traduis : 'Merci'", answer: ["gracias"], hint: "G......" },
  { id: 10, type: "swipe", es: "La cuenta", en: "L'addition", context: "La cuenta, por favor" },
  { id: 11, type: "swipe", es: "Amigo", en: "Ami", context: "Es mi meilleur ami" },
  { id: 12, type: "input", question: "Traduis : 'L'eau'", answer: ["el agua", "agua"], hint: "El a..." },
];

/* --- APPLICATION PRINCIPALE --- */
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [user, setUser] = useState(null); 
  const [userVocab, setUserVocab] = useState([]);
  // Nouvel état : liste des ID de leçons terminées
  const [completedLessons, setCompletedLessons] = useState([]);

  // Persistence (Sauvegarde)
  useEffect(() => {
    if (user && user.name) {
      const saveData = { user, userVocab, completedLessons };
      localStorage.setItem(`espanol_app_${user.name.toLowerCase()}`, JSON.stringify(saveData));
    }
  }, [user, userVocab, completedLessons]);

  // Connexion
  const handleLogin = (name) => {
    const savedData = localStorage.getItem(`espanol_app_${name.toLowerCase()}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUser(parsed.user);
      setUserVocab(parsed.userVocab || []);
      setCompletedLessons(parsed.completedLessons || []);
      setView('dashboard');
    } else {
      setUser({ name, streak: 1, xp: 0, level: 1 });
      setUserVocab([]);
      setCompletedLessons([]);
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  // Fin de leçon
  const handleLessonComplete = (xp, lessonContent, lessonId) => {
    setUser(prev => ({ ...prev, xp: prev.xp + xp, streak: prev.streak + 1 }));
    
    // Ajout Vocabulaire
    const newVocab = lessonContent.filter(item => item.type === 'swipe');
    setUserVocab(prev => {
      const existingIds = new Set(prev.map(item => item.id));
      const uniqueNewVocab = newVocab.filter(item => !existingIds.has(item.id));
      return [...prev, ...uniqueNewVocab];
    });

    // Ajout Historique (si pas déjà fait)
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }

    setView('complete');
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center font-sans text-slate-800 p-0 sm:p-8">
      {/* Cadre style iPhone */}
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-w-[400px] bg-white sm:rounded-[40px] shadow-none sm:shadow-2xl overflow-hidden relative flex flex-col border-0 sm:border-8 border-slate-900 transition-all duration-300">
        
        {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
        
        {view === 'auth' && <AuthScreen onLogin={handleLogin} onBack={() => setView('landing')} />}
        
        {view === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            onStartLesson={() => setView('lesson')} 
            onOpenNotebook={() => setView('notebook')} 
            onOpenHistory={() => setView('history')}
            onLogout={handleLogout}
          />
        )}
        
        {view === 'notebook' && (
          <Notebook 
            grammarContent={DAY_1_CONTENT} 
            userVocab={userVocab} 
            onClose={() => setView('dashboard')} 
          />
        )}

        {view === 'history' && (
          <LessonHistory 
            completedLessons={completedLessons}
            allLessons={ALL_LESSONS_INFO}
            onReplay={() => setView('lesson')} // Lance toujours leçon 1 pour ce MVP
            onClose={() => setView('dashboard')}
          />
        )}

        {view === 'lesson' && (
          <LessonEngine 
            content={DAY_1_CONTENT} 
            lessonId={1}
            onComplete={(xp) => handleLessonComplete(xp, DAY_1_CONTENT, 1)} 
            onExit={() => setView('dashboard')} 
          />
        )}
        
        {view === 'complete' && (
          <LessonComplete xp={150} onHome={() => setView('dashboard')} />
        )}

      </div>
    </div>
  );
}

/* --- COMPOSANTS UI --- */

const LandingPage = ({ onStart }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden">
    <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-yellow-300 rounded-full blur-3xl opacity-50"></div>
    <div className="z-10 text-center space-y-6 w-full">
      <div className="w-24 h-24 bg-white rounded-3xl shadow-xl mx-auto flex items-center justify-center rotate-3 transform transition-transform hover:rotate-6">
        <span className="text-5xl">🇪🇸</span>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          Español<span className="text-red-600">Sprint</span>
        </h1>
        <p className="text-slate-800 font-medium text-lg opacity-90">Objectif B2 en 90 jours.</p>
      </div>
      <button onClick={onStart} className="w-full bg-slate-900 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-12 active:scale-95 transition-transform">
        Commencer
      </button>
    </div>
  </div>
);

const AuthScreen = ({ onLogin, onBack }) => {
  const [name, setName] = useState('');
  return (
    <div className="flex-1 flex flex-col p-8 bg-white">
      <button onClick={onBack} className="self-start text-slate-400 mb-8"><X size={24} /></button>
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Bienvenue !</h2>
          <p className="text-slate-500">Entre ton prénom pour charger ton historique.</p>
        </div>
        <input 
          type="text" 
          placeholder="Ton Prénom"
          className="w-full text-2xl border-b-2 border-slate-200 py-3 focus:outline-none focus:border-yellow-400 bg-transparent placeholder-slate-300 font-bold"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <button 
          onClick={() => name.trim() && onLogin(name.trim())} 
          disabled={!name.trim()} 
          className="w-full bg-yellow-400 text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-md disabled:opacity-50 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Connexion
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onStartLesson, onOpenNotebook, onOpenHistory, onLogout }) => (
  <div className="flex-1 flex flex-col bg-slate-50 relative">
    {/* Header */}
    <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{user.name}</p>
          <p className="text-xs text-slate-400 font-bold uppercase">Niveau {user.level}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
        <Flame size={16} className="text-orange-500 fill-orange-500" />
        <span className="text-orange-700 font-bold">{user.streak}</span>
      </div>
    </div>

    {/* Roadmap */}
    <div className="flex-1 overflow-y-auto p-6 relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 z-0"></div>
      <div className="space-y-12 relative z-10 pt-8 pb-20">
        
        {/* Jour 1 - Actif */}
        <div className="flex flex-col items-center group cursor-pointer" onClick={onStartLesson}>
          <div className="relative">
             <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_6px_0_rgb(202,138,4)] border-4 border-white transition-transform active:translate-y-1 active:shadow-none hover:scale-105">
               <Zap size={32} className="text-white fill-white" />
             </div>
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">GO</div>
          </div>
          <p className="mt-3 font-bold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm text-sm">Jour 1</p>
        </div>

        {/* Jours suivants */}
        {[2, 3, 4, 5].map(day => (
          <div key={day} className="flex flex-col items-center opacity-40 grayscale">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <span className="font-bold text-slate-400">{day}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Menu Bas - 4 Icônes maintenant */}
    <div className="bg-white border-t border-slate-100 p-2 pb-6 sm:pb-2 flex justify-around items-center text-slate-400 safe-area-bottom">
      <button className="flex flex-col items-center text-yellow-600 p-2"><Zap size={24} fill="currentColor" /><span className="text-[10px] font-bold mt-1">Sprint</span></button>
      
      <button onClick={onOpenHistory} className="flex flex-col items-center hover:text-indigo-600 transition-colors p-2">
        <GraduationCap size={24} />
        <span className="text-[10px] font-bold mt-1">Leçons</span>
      </button>

      <button onClick={onOpenNotebook} className="flex flex-col items-center hover:text-indigo-600 transition-colors p-2">
        <Book size={24} />
        <span className="text-[10px] font-bold mt-1">Grimoire</span>
      </button>
      
      <button onClick={onLogout} className="flex flex-col items-center hover:text-red-500 transition-colors p-2">
        <LogOut size={24} />
        <span className="text-[10px] font-bold mt-1">Sortir</span>
      </button>
    </div>
  </div>
);

// NOUVEL ÉCRAN : Historique des leçons
const LessonHistory = ({ completedLessons, allLessons, onReplay, onClose }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm z-10 sticky top-0">
        <button onClick={onClose}><X size={24} className="text-slate-400" /></button>
        <h2 className="text-lg font-bold text-slate-800">Mes Leçons</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {allLessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          // Pour la démo, on débloque le suivant si le précédent est fait, ou si c'est le jour 1
          const isLocked = !isDone && lesson.id !== 1; 

          return (
            <div key={lesson.id} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between ${isLocked ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isDone ? 'bg-green-100 text-green-600' : isLocked ? 'bg-slate-100 text-slate-400' : 'bg-yellow-100 text-yellow-600'}`}>
                  {isDone ? <Check size={20} /> : isLocked ? <Lock size={18} /> : lesson.id}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800">{lesson.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${lesson.level === 'A1' ? 'bg-blue-100 text-blue-600' : lesson.level === 'A2' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                      {lesson.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{lesson.desc}</p>
                </div>
              </div>

              {/* Action : Revoir ou Bloqué */}
              {isLocked ? (
                <Lock size={20} className="text-slate-300" />
              ) : (
                <button 
                  onClick={() => onReplay(lesson.id)} 
                  className={`p-2 rounded-full ${isDone ? 'bg-slate-50 text-indigo-600' : 'bg-yellow-400 text-slate-900'} active:scale-95`}
                >
                  <PlayCircle size={24} />
                </button>
              )}
            </div>
          );
        })}
        
        <div className="text-center p-6 opacity-50">
          <p className="text-xs text-slate-400">Termine les leçons pour débloquer le niveau B2 !</p>
        </div>
      </div>
    </div>
  );
};

const Notebook = ({ grammarContent, userVocab, onClose }) => {
  const grammarItems = grammarContent.filter(c => c.type === 'grammar');
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm z-10 sticky top-0">
        <button onClick={onClose}><X size={24} className="text-slate-400" /></button>
        <h2 className="text-lg font-bold text-slate-800">Grimoire</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 mt-2 flex items-center gap-2">
            <Edit3 size={16} /> Vocabulaire Acquis ({userVocab.length})
          </h3>
          {userVocab.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
              {userVocab.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-700">{item.es}</p>
                    <p className="text-xs text-slate-400 italic">{item.context}</p>
                  </div>
                  <span className="text-slate-500 text-sm font-medium">{item.en}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-slate-200 text-center text-slate-400">
              <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
              <p className="font-medium">Ton grimoire est vide.</p>
              <p className="text-sm">Termine une leçon pour y ajouter des mots !</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen size={16} /> Grammaire
          </h3>
          <div className="grid gap-4">
            {grammarItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-indigo-600 mb-1">{item.title}</h4>
                <div className="bg-slate-50 rounded-lg overflow-hidden text-sm mt-3">
                  {item.conjugation.map((row, idx) => (
                    <div key={idx} className={`flex justify-between p-2 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <span className="text-slate-400 w-1/3">{row.pronoun}</span>
                      <span className="font-bold text-slate-800 w-1/3">{row.verb}</span>
                      <span className="text-slate-400 text-xs w-1/3 text-right italic">{row.fr}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonEngine = ({ content, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentCard = content[currentIndex];

  const handleNext = () => {
    if (currentIndex + 1 >= content.length) {
      setProgress(100);
      setTimeout(() => onComplete(150), 500);
    } else {
      setProgress(((currentIndex + 1) / content.length) * 100);
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
      <div className="px-6 py-6 flex items-center gap-4 z-20 sticky top-0 bg-slate-50">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4 pb-20 overflow-y-auto">
        <div className="w-full max-w-[340px] my-auto">
          {currentCard.type === 'swipe' && <SwipeCard key={currentCard.id} data={currentCard} onNext={handleNext} />}
          {currentCard.type === 'input' && <InputCard key={currentCard.id} data={currentCard} onNext={handleNext} />}
          {currentCard.type === 'grammar' && <GrammarCard key={currentCard.id} data={currentCard} onNext={handleNext} />}
        </div>
      </div>
    </div>
  );
};

const SwipeCard = ({ data, onNext }) => {
  const [swiped, setSwiped] = useState(null);
  const handleSwipe = (dir) => {
    setSwiped(dir);
    setTimeout(onNext, 300);
  };
  return (
    <div className={`w-full aspect-[3/4] bg-white rounded-[30px] shadow-2xl border-b-8 border-slate-100 flex flex-col relative transition-all duration-300 ${swiped === 'left' ? '-translate-x-[150%] rotate-[-15deg] opacity-0' : ''} ${swiped === 'right' ? 'translate-x-[150%] rotate-[15deg] opacity-0' : ''}`}>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <h2 className="text-4xl sm:text-5xl font-black text-slate-800">{data.es}</h2>
        <div className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer group">
           <p className="text-xl sm:text-2xl font-medium text-slate-500 group-hover:text-slate-800 transition-colors">{data.en}</p>
        </div>
        <p className="text-xs text-slate-300 absolute bottom-8 animate-pulse">Toucher pour révéler</p>
      </div>
      <div className="absolute -bottom-24 left-0 right-0 flex justify-center gap-8">
        <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full bg-white border-2 border-red-100 text-red-500 shadow-lg flex items-center justify-center active:scale-90 transition-transform"><X size={32} /></button>
        <button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full bg-teal-500 text-white shadow-lg flex items-center justify-center active:scale-90 transition-transform"><Check size={32} /></button>
      </div>
    </div>
  );
};

const InputCard = ({ data, onNext }) => {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('idle');
  const checkAnswer = () => {
    const isCorrect = data.answer.includes(val.trim().toLowerCase());
    setStatus(isCorrect ? 'success' : 'error');
    if (isCorrect) setTimeout(onNext, 1200);
  };
  return (
    <div className="w-full bg-white rounded-[30px] shadow-xl p-8 flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-8">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 text-center">{data.question}</h3>
      <input type="text" value={val} onChange={(e) => { setVal(e.target.value); setStatus('idle'); }} className={`w-full text-center text-xl p-4 rounded-xl border-2 outline-none ${status === 'error' ? 'border-red-400 bg-red-50' : status === 'success' ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-indigo-400'}`} placeholder="Tape ta réponse..." />
      <button onClick={checkAnswer} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg ${status === 'success' ? 'bg-green-500' : 'bg-slate-900 active:scale-95 transition-transform'}`}>{status === 'success' ? 'Bravo !' : 'Vérifier'}</button>
    </div>
  );
};

const GrammarCard = ({ data, onNext }) => (
  <div className="w-full bg-white rounded-[30px] shadow-xl overflow-hidden flex flex-col animate-in zoom-in duration-300">
    <div className="bg-indigo-600 p-6 text-white text-center"><h3 className="text-xl sm:text-2xl font-black">{data.title}</h3></div>
    <div className="p-6 space-y-4">
      <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
        {data.conjugation.map((row, idx) => (
           <div key={idx} className="flex justify-between items-center p-3 border-b border-slate-200 last:border-0"><span className="text-slate-400 text-sm font-medium w-1/3">{row.pronoun}</span><span className="text-indigo-600 font-bold text-lg w-1/3 text-center">{row.verb}</span></div>
        ))}
      </div>
      <button onClick={onNext} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold shadow-md hover:bg-yellow-300 active:scale-95 transition-all">Continuer</button>
    </div>
  </div>
);

const LessonComplete = ({ xp, onHome }) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500">
    <Trophy size={100} className="text-yellow-700 drop-shadow-md" />
    <h2 className="text-4xl font-black text-slate-900">Increíble!</h2>
    <p className="text-yellow-800 font-medium">Progression sauvegardée !</p>
    <button onClick={onHome} className="w-full max-w-xs bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all">Retour</button>
  </div>
);