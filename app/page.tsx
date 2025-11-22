// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock, Menu, LayoutDashboard
} from 'lucide-react';

/* --- DATASET (CONTENU) --- */
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
  const [completedLessons, setCompletedLessons] = useState([]);

  // Persistence
  useEffect(() => {
    if (typeof window !== 'undefined' && user && user.name) {
      const saveData = { user, userVocab, completedLessons };
      localStorage.setItem(`espanol_app_${user.name.toLowerCase()}`, JSON.stringify(saveData));
    }
  }, [user, userVocab, completedLessons]);

  // Login
  const handleLogin = (name) => {
    if (typeof window !== 'undefined') {
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
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleLessonComplete = (xp, lessonContent, lessonId) => {
    setUser(prev => ({ ...prev, xp: prev.xp + xp, streak: prev.streak + 1 }));
    const newVocab = lessonContent.filter(item => item.type === 'swipe');
    setUserVocab(prev => {
      const existingIds = new Set(prev.map(item => item.id));
      const uniqueNewVocab = newVocab.filter(item => !existingIds.has(item.id));
      return [...prev, ...uniqueNewVocab];
    });
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
    setView('complete');
  };

  // LAYOUT PRINCIPAL
  // On utilise h-screen w-full pour prendre toute la place
  // md:flex-row permet d'avoir la sidebar à côté du contenu sur PC
  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      
      {/* Écran Landing & Auth (Plein écran centré) */}
      {(!user || view === 'landing' || view === 'auth') ? (
        <div className="w-full h-full flex items-center justify-center bg-white">
           {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
           {view === 'auth' && <AuthScreen onLogin={handleLogin} onBack={() => setView('landing')} />}
        </div>
      ) : (
        <>
          {/* SIDEBAR (Uniquement sur PC - md:flex) */}
          <SidebarDesktop 
            user={user} 
            currentView={view} 
            onChangeView={setView} 
            onLogout={handleLogout} 
          />

          {/* CONTENU PRINCIPAL (Flexible) */}
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            
            {/* Header Mobile (Uniquement sur Mobile - md:hidden) */}
            <MobileHeader user={user} />

            {/* Zone de contenu dynamique */}
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              
              {view === 'dashboard' && (
                <DashboardContent 
                  user={user} 
                  onStartLesson={() => setView('lesson')} 
                />
              )}

              {view === 'notebook' && (
                <NotebookContent 
                  grammarContent={DAY_1_CONTENT} 
                  userVocab={userVocab} 
                />
              )}

              {view === 'history' && (
                <HistoryContent 
                  completedLessons={completedLessons}
                  allLessons={ALL_LESSONS_INFO}
                  onReplay={() => setView('lesson')}
                />
              )}

              {view === 'lesson' && (
                <LessonEngine 
                  content={DAY_1_CONTENT} 
                  onComplete={(xp) => handleLessonComplete(xp, DAY_1_CONTENT, 1)} 
                  onExit={() => setView('dashboard')} 
                />
              )}

              {view === 'complete' && (
                <LessonComplete xp={150} onHome={() => setView('dashboard')} />
              )}
            </div>

            {/* Navigation Mobile (Uniquement sur Mobile - md:hidden) */}
            {view !== 'lesson' && view !== 'complete' && (
              <MobileBottomNav 
                currentView={view} 
                onChangeView={setView} 
                onLogout={handleLogout} 
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}

/* --- COMPOSANTS DE STRUCTURE (Desktop vs Mobile) --- */

const SidebarDesktop = ({ user, currentView, onChangeView, onLogout }) => (
  <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6">
    <div className="flex items-center gap-2 mb-12 px-2">
      <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md rotate-3">
        <span className="text-2xl">🇪🇸</span>
      </div>
      <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
        Español<span className="text-red-600">Sprint</span>
      </h1>
    </div>

    <nav className="flex-1 space-y-2">
      <SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
      <SidebarLink icon={GraduationCap} label="Mes Leçons" active={currentView === 'history'} onClick={() => onChangeView('history')} />
      <SidebarLink icon={Book} label="Grimoire" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
    </nav>

    <div className="mt-auto pt-6 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
           {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900">{user.name}</p>
          <p className="text-xs text-slate-400">Niveau {user.level}</p>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
          <Flame size={14} className="text-orange-500 fill-orange-500" />
          <span className="text-xs font-bold text-orange-600">{user.streak}</span>
        </div>
      </div>
      <button onClick={onLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors w-full px-2 py-2 rounded-xl hover:bg-red-50">
        <LogOut size={20} />
        <span className="font-bold text-sm">Déconnexion</span>
      </button>
    </div>
  </div>
);

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
  >
    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
    <span className="font-bold text-base">{label}</span>
  </button>
);

const MobileHeader = ({ user }) => (
  <div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">
        {user.name.charAt(0).toUpperCase()}
      </div>
    </div>
    <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
      <Flame size={16} className="text-orange-500 fill-orange-500" />
      <span className="text-orange-700 font-bold">{user.streak}</span>
    </div>
  </div>
);

const MobileBottomNav = ({ currentView, onChangeView, onLogout }) => (
  <div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30">
    <NavBtn icon={LayoutDashboard} label="Sprint" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
    <NavBtn icon={GraduationCap} label="Leçons" active={currentView === 'history'} onClick={() => onChangeView('history')} />
    <NavBtn icon={Book} label="Grimoire" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
    <button onClick={onLogout} className="flex flex-col items-center hover:text-red-500 transition-colors p-2"><LogOut size={24} /><span className="text-[10px] font-bold mt-1">Sortir</span></button>
  </div>
);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-bold mt-1">{label}</span>
  </button>
);

/* --- CONTENU DES PAGES --- */

const DashboardContent = ({ user, onStartLesson }) => (
  <div className="max-w-2xl mx-auto w-full pb-20 pt-8 px-6">
    <div className="text-center mb-12 hidden md:block">
      <h2 className="text-3xl font-black text-slate-900">Parcours</h2>
      <p className="text-slate-500">Niveau actuel : A1 (Débutant)</p>
    </div>

    <div className="space-y-12 relative z-10">
       {/* Ligne verticale de progression */}
       <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 z-0"></div>

      {/* Jour 1 - Actif */}
      <div className="flex flex-col items-center group cursor-pointer relative z-10" onClick={onStartLesson}>
        <div className="relative transform transition-transform hover:scale-110">
           <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_6px_0_rgb(202,138,4)] border-4 border-white active:translate-y-1 active:shadow-none">
             <Zap size={40} className="text-white fill-white" />
           </div>
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce whitespace-nowrap">
             C'est parti !
           </div>
        </div>
        <p className="mt-4 font-bold text-slate-700 bg-white px-4 py-1 rounded-full shadow-sm border border-slate-100">Jour 1</p>
      </div>

      {[2, 3, 4, 5].map(day => (
        <div key={day} className="flex flex-col items-center opacity-40 grayscale relative z-10">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <span className="font-bold text-2xl text-slate-400">{day}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const NotebookContent = ({ grammarContent, userVocab }) => {
  const grammarItems = grammarContent.filter(c => c.type === 'grammar');
  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900">Grimoire</h2>
        <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">
          {userVocab.length} Mots appris
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vocabulaire */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><Edit3 size={18} /> Vocabulaire</h3>
          {userVocab.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {userVocab.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="p-4 flex justify-between items-center border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-bold text-slate-800">{item.es}</p>
                    <p className="text-xs text-slate-400 italic mt-0.5">{item.context}</p>
                  </div>
                  <span className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">{item.en}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Ton vocabulaire est vide." />
          )}
        </div>

        {/* Grammaire */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><BookOpen size={18} /> Grammaire</h3>
          <div className="space-y-4">
            {grammarItems.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Book size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl overflow-hidden text-sm border border-slate-100">
                  {item.conjugation.map((row, idx) => (
                    <div key={idx} className={`flex justify-between p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <span className="text-slate-400 w-1/3">{row.pronoun}</span>
                      <span className="font-bold text-slate-800 w-1/3 text-center">{row.verb}</span>
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

const HistoryContent = ({ completedLessons, allLessons, onReplay }) => (
  <div className="max-w-3xl mx-auto w-full p-4 md:p-8 pb-24">
    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">Historique des Leçons</h2>
    <div className="space-y-4">
      {allLessons.map((lesson) => {
        const isDone = completedLessons.includes(lesson.id);
        const isLocked = !isDone && lesson.id !== 1;
        return (
          <div key={lesson.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between transition-all ${isLocked ? 'opacity-60' : 'hover:shadow-md hover:border-indigo-100'}`}>
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDone ? 'bg-green-100 text-green-600' : isLocked ? 'bg-slate-100 text-slate-400' : 'bg-yellow-100 text-yellow-600'}`}>
                {isDone ? <Check size={24} /> : isLocked ? <Lock size={20} /> : lesson.id}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-lg text-slate-800">{lesson.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${lesson.level === 'A1' ? 'bg-blue-100 text-blue-600' : lesson.level === 'A2' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                    {lesson.level}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{lesson.desc}</p>
              </div>
            </div>
            {!isLocked && (
              <button onClick={() => onReplay(lesson.id)} className={`p-3 rounded-full transition-transform active:scale-95 ${isDone ? 'bg-slate-50 text-indigo-600 hover:bg-indigo-50' : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300 shadow-md'}`}>
                <PlayCircle size={28} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

/* --- ÉCRANS SPECIFIQUES (Landing, Auth, Jeu) --- */

const LandingPage = ({ onStart }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    <div className="z-10 space-y-8 max-w-md">
      <div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500">
        <span className="text-6xl">🇪🇸</span>
      </div>
      <div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
          Español<span className="text-red-600">Sprint</span>
        </h1>
        <p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">
          La méthode la plus rapide pour apprendre l'espagnol.
        </p>
      </div>
      <button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
        Commencer maintenant
      </button>
    </div>
  </div>
);

const AuthScreen = ({ onLogin, onBack }) => {
  const [name, setName] = useState('');
  return (
    <div className="w-full max-w-md p-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold">
        <X size={20} /> Annuler
      </button>
      <div>
        <h2 className="text-4xl font-black text-slate-900 mb-3">Hola! 👋</h2>
        <p className="text-lg text-slate-500">Comment t'appelles-tu ?</p>
      </div>
      <input 
        type="text" 
        placeholder="Ton Prénom"
        className="w-full text-3xl border-b-4 border-slate-100 py-4 focus:outline-none focus:border-yellow-400 bg-transparent placeholder-slate-200 font-bold text-slate-800 transition-colors"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <button 
        onClick={() => name.trim() && onLogin(name.trim())} 
        disabled={!name.trim()} 
        className="w-full bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-300 active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <Save size={24} />
        C'est parti
      </button>
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
    <div className="h-full w-full flex flex-col bg-slate-50">
      {/* Barre de progression */}
      <div className="px-6 py-4 md:py-6 flex items-center gap-6 bg-white border-b border-slate-100 z-10">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
        <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Zone de jeu centrée */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-md aspect-[3/4] md:aspect-auto md:h-[600px] perspective-1000">
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
    <div className={`w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col relative transition-all duration-500 ${swiped === 'left' ? '-translate-x-[150%] rotate-[-20deg] opacity-0' : ''} ${swiped === 'right' ? 'translate-x-[150%] rotate-[20deg] opacity-0' : ''}`}>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-black text-slate-800">{data.es}</h2>
        <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-help group">
           <p className="text-2xl md:text-3xl font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">{data.en}</p>
           <p className="text-sm text-slate-300 mt-2">{data.context}</p>
        </div>
        <p className="text-xs font-bold text-slate-200 uppercase tracking-widest absolute bottom-32 animate-pulse">Survole ou touche</p>
      </div>
      
      <div className="p-8 flex justify-center gap-12 bg-slate-50 rounded-b-[20px]">
        <button onClick={() => handleSwipe('left')} className="w-20 h-20 rounded-full bg-white border-2 border-red-100 text-red-500 shadow-lg flex items-center justify-center hover:bg-red-50 hover:scale-110 active:scale-90 transition-all">
          <X size={40} strokeWidth={3} />
        </button>
        <button onClick={() => handleSwipe('right')} className="w-20 h-20 rounded-full bg-teal-500 border-b-4 border-teal-700 text-white shadow-lg flex items-center justify-center hover:bg-teal-400 hover:scale-110 active:scale-90 active:border-b-0 active:translate-y-1 transition-all">
          <Check size={40} strokeWidth={3} />
        </button>
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
    if (isCorrect) setTimeout(onNext, 1500);
  };
  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col p-8 md:p-12 justify-center space-y-8 animate-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Challenge</span>
        <h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3>
      </div>
      <input 
        type="text" 
        value={val} 
        onChange={(e) => { setVal(e.target.value); setStatus('idle'); }} 
        className={`w-full text-center text-2xl md:text-3xl font-bold p-6 rounded-2xl border-4 outline-none transition-all ${status === 'error' ? 'border-red-400 bg-red-50 text-red-500' : status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-100 focus:border-yellow-400 focus:bg-yellow-50'}`} 
        placeholder="Ta réponse..." 
      />
      <button 
        onClick={checkAnswer} 
        className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${status === 'success' ? 'bg-green-500' : 'bg-slate-900'}`}
      >
        {status === 'success' ? 'Parfait ! 🎉' : 'Vérifier'}
      </button>
      {status === 'error' && <p className="text-center text-red-400 font-bold animate-shake">Essaie encore ! Indice : {data.hint}</p>}
    </div>
  );
};

const GrammarCard = ({ data, onNext }) => (
  <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
    <div className="bg-indigo-600 p-8 md:p-10 text-white text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      <h3 className="text-3xl md:text-4xl font-black relative z-10">{data.title}</h3>
      <p className="text-indigo-200 mt-2 relative z-10">{data.description}</p>
    </div>
    <div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-slate-50">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {data.conjugation.map((row, idx) => (
           <div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-indigo-50 transition-colors">
             <span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span>
             <span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span>
             <span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span>
           </div>
        ))}
      </div>
      <button onClick={onNext} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-yellow-300 hover:scale-[1.02] active:scale-95 transition-all">
        J'ai compris
      </button>
    </div>
  </div>
);

const LessonComplete = ({ xp, onHome }) => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500">
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform">
      <Trophy size={100} className="text-yellow-500 fill-yellow-500" />
    </div>
    <div>
      <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">Increíble!</h2>
      <p className="text-xl text-yellow-900 font-bold opacity-80">Leçon terminée avec succès.</p>
    </div>
    <div className="flex gap-4">
      <div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">
        +{xp} XP
      </div>
    </div>
    <button onClick={onHome} className="w-full max-w-sm bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
      Continuer
    </button>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
    <BookOpen size={48} className="mb-4 opacity-20" />
    <p className="font-medium text-lg">{message}</p>
  </div>
);