// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock, LayoutDashboard, Library, AlertCircle, Mail, Bell, Settings, Loader2
} from 'lucide-react';

// --- IMPORTATION FIREBASE ---
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

// ---------------------------------------------------------
// 🟢 ZONE DE CONFIGURATION (TES CLÉS SONT ICI)
// ---------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDPWOdxYtnvVrDB6wk68EF0Gz62fqVCwBE",
  authDomain: "espanolsprint.firebaseapp.com",
  projectId: "espanolsprint",
  storageBucket: "espanolsprint.firebasestorage.app",
  messagingSenderId: "54612821418",
  appId: "1:54612821418:web:7af8de5ad1545ec1ba57d3"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* --- DATASET (CONTENU) --- */
const ALL_LESSONS_INFO = [
  { id: 1, title: "Hola!", level: "A1", desc: "Salutations & Verbe Être" },
  { id: 2, title: "La Famille", level: "A1", desc: "Possession & Verbe Avoir" },
  { id: 3, title: "Actions", level: "A1", desc: "Verbes en -AR & Quotidien" },
  { id: 4, title: "J'aime...", level: "A1", desc: "Goûts (Gustar) & Nourriture" },
  { id: 5, title: "Nombres", level: "A1", desc: "Compter & L'Heure" },
  { id: 6, title: "En Ville", level: "A1", desc: "Lieux & Verbe Aller (Ir)" },
  { id: 7, title: "Bilan Semaine 1", level: "A1", desc: "Révision complète & Quiz" },
];

const LESSON_CONTENTS = {
  1: [
    { id: 101, type: "swipe", es: "Hola", en: "Bonjour", context: "Hola, ¿qué tal?" },
    { id: 102, type: "swipe", es: "Buenos días", en: "Bonjour (Matin)", context: "Buenos días, mamá" },
    { id: 103, type: "grammar", title: "Le Verbe Être (Ser)", description: "Pour l'identité et l'origine.", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }, { pronoun: "Él/Ella", verb: "es", fr: "Il est" }] },
    { id: 104, type: "input", question: "Traduis : 'Je suis'", answer: ["yo soy", "soy"], hint: "Verbe Ser" },
    { id: 105, type: "swipe", es: "Gracias", en: "Merci", context: "Muchas gracias" },
    { id: 106, type: "swipe", es: "Por favor", en: "S'il vous plaît", context: "Agua, por favor" }
  ],
  2: [
    { id: 201, type: "swipe", es: "La familia", en: "La famille", context: "Amo a mi familia" },
    { id: 203, type: "grammar", title: "Le Verbe Avoir (Tener)", description: "Possession et âge.", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }, { pronoun: "Él/Ella", verb: "tiene", fr: "Il a" }] },
    { id: 204, type: "input", question: "Traduis : 'J'ai'", answer: ["tengo", "yo tengo"], hint: "Verbe Tener" },
    { id: 205, type: "swipe", es: "La madre", en: "La mère", context: "Mi madre es guapa" }
  ],
  3: [
    { id: 301, type: "swipe", es: "Hablar", en: "Parler", context: "Hablo español" },
    { id: 303, type: "grammar", title: "Verbes en -AR", description: "Au présent, les terminaisons.", conjugation: [{ pronoun: "Yo", verb: "-o", fr: "habl(o)" }, { pronoun: "Tú", verb: "-as", fr: "habl(as)" }, { pronoun: "Él", verb: "-a", fr: "habl(a)" }] },
    { id: 304, type: "input", question: "Je parle (Hablar)", answer: ["hablo", "yo hablo"], hint: "Terminaison -o" }
  ]
};

/* --- APPLICATION PRINCIPALE --- */
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [authError, setAuthError] = useState(""); // Pour gérer les erreurs sans alert()

  // 1. Écouteur d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Récupération des données Cloud
        const docRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setView('dashboard');
          } else {
            // Création profil par défaut si inexistant
            const newProfile = { 
              name: user.email.split('@')[0], xp: 0, streak: 1, level: 1, vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 }
            };
            await setDoc(docRef, newProfile);
            setUserData(newProfile);
            setView('dashboard');
          }
        } catch (e) {
          console.error("Erreur lecture profil:", e);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
        setView('landing');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Gestion Auth (Connexion/Inscription)
  const handleAuth = async (email, password, isSignUp) => {
    setLoading(true);
    setAuthError("");
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Création doc utilisateur
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: email.split('@')[0], email: email, xp: 0, streak: 1, level: 1, vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 }
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
      let msg = "Erreur de connexion.";
      if (error.code === 'auth/invalid-credential') msg = "Email ou mot de passe incorrect.";
      if (error.code === 'auth/email-already-in-use') msg = "Cet email est déjà utilisé.";
      if (error.code === 'auth/weak-password') msg = "Le mot de passe doit faire au moins 6 caractères.";
      setAuthError(msg);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setView('landing');
  };

  // 3. Logique Jeu
  const startLesson = (lessonId) => {
    const today = new Date().toDateString();
    if (userData?.dailyLimit?.date === today && userData?.dailyLimit?.count >= 3) {
      setShowLimitModal(true);
      return;
    }
    setActiveLessonId(lessonId);
    setView('lesson');
  };

  const handleLessonComplete = async (xp, lessonContent, lessonId) => {
    const newVocab = lessonContent.filter(item => item.type === 'swipe');
    const today = new Date().toDateString();
    
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const existingIds = new Set(userData.vocab.map(item => item.id));
      const uniqueNewVocab = newVocab.filter(item => !existingIds.has(item.id));

      const updateData = {
        xp: increment(xp),
        streak: increment(1),
        vocab: arrayUnion(...uniqueNewVocab),
        completedLessons: arrayUnion(lessonId),
        dailyLimit: { date: today, count: (userData.dailyLimit?.date === today ? userData.dailyLimit.count : 0) + 1 }
      };

      await updateDoc(userRef, updateData);
      // Rechargement des données pour synchro
      const newSnap = await getDoc(userRef);
      setUserData(newSnap.data());
    }
    setView('complete');
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-yellow-400"><Loader2 size={48} className="animate-spin text-white" /></div>;

  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 animate-in zoom-in duration-200">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500"><AlertCircle size={40} /></div>
            <div><h3 className="text-2xl font-black text-slate-900">Pause ! 🧠</h3><p className="text-slate-500 mt-2">3 leçons par jour max.</p></div>
            <button onClick={() => setShowLimitModal(false)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">À demain</button>
          </div>
        </div>
      )}

      {(!currentUser || view === 'landing' || view === 'auth') ? (
        <div className="w-full h-full flex items-center justify-center bg-white">
           {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
           {view === 'auth' && <AuthScreen onAuth={handleAuth} onBack={() => setView('landing')} error={authError} />}
        </div>
      ) : (
        <>
          <SidebarDesktop userData={userData} currentView={view} onChangeView={setView} onLogout={handleLogout} />
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            <MobileHeader userData={userData} />
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              {view === 'dashboard' && userData && <DashboardContent userData={userData} allLessons={ALL_LESSONS_INFO} onStartLesson={startLesson} />}
              {view === 'notebook' && userData && <NotebookContent allContent={Object.values(LESSON_CONTENTS).flat()} userVocab={userData.vocab} />}
              {view === 'profile' && userData && <ProfileContent userData={userData} email={currentUser.email} onLogout={handleLogout} />}
              {view === 'lesson' && LESSON_CONTENTS[activeLessonId] && <LessonEngine content={LESSON_CONTENTS[activeLessonId]} onComplete={(xp) => handleLessonComplete(xp, LESSON_CONTENTS[activeLessonId], activeLessonId)} onExit={() => setView('dashboard')} />}
              {view === 'complete' && <LessonComplete xp={100} onHome={() => setView('dashboard')} />}
            </div>
            {view !== 'lesson' && view !== 'complete' && <MobileBottomNav currentView={view} onChangeView={setView} />}
          </main>
        </>
      )}
    </div>
  );
}

/* --- COMPOSANTS UI --- */
const LandingPage = ({ onStart }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center">
    <div className="z-10 space-y-8 max-w-md">
      <div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div>
      <div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div>
      <button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button>
    </div>
  </div>
);

const AuthScreen = ({ onAuth, onBack, error }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button>
      <div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>
      
      {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-bold">{error}</div>}

      <div className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button>
      <div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div>
    </div>
  );
};

const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout }) => (
  <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6">
    <div className="flex items-center gap-2 mb-12 px-2"><div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md rotate-3"><span className="text-2xl">🇪🇸</span></div><h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Español<span className="text-red-600">Sprint</span></h1></div>
    <nav className="flex-1 space-y-2">
      <SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
      <SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
      <SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} />
    </nav>
    <div className="mt-auto pt-6 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{userData?.name?.charAt(0).toUpperCase()}</div>
        <div className="flex-1"><p className="text-sm font-bold text-slate-900 truncate w-24">{userData?.name}</p><p className="text-xs text-slate-400">Niveau {userData?.level}</p></div>
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full"><Flame size={14} className="text-orange-500 fill-orange-500" /><span className="text-xs font-bold text-orange-600">{userData?.streak}</span></div>
      </div>
    </div>
  </div>
);

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>
);

const MobileHeader = ({ userData }) => (
  <div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0">
    <div className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div></div>
    <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div>
  </div>
);

const MobileBottomNav = ({ currentView, onChangeView }) => (
  <div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30">
    <NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
    <NavBtn icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
    <NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} />
  </div>
);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>
);

const DashboardContent = ({ userData, allLessons, onStartLesson }) => {
  const nextLessonId = allLessons.find(l => !userData.completedLessons.includes(l.id))?.id || 1;
  const dailyCount = userData?.dailyLimit?.date === new Date().toDateString() ? userData.dailyLimit.count : 0;
  return (
    <div className="max-w-2xl mx-auto w-full pb-24 pt-8 px-6">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl font-black text-slate-900">Semaine 1</h2>
        <p className="text-slate-500">Objectif A1 • {userData.completedLessons.length} / 7 leçons</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Énergie du jour</span><div className="flex gap-1">{[1, 2, 3].map(i => (<div key={i} className={`w-3 h-8 rounded-full ${i <= (3 - dailyCount) ? 'bg-green-400' : 'bg-slate-200'}`}></div>))}</div></div>
      </div>
      <div className="space-y-8 relative z-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 z-0"></div>
        {allLessons.map((lesson) => {
          const isDone = userData.completedLessons.includes(lesson.id);
          const isNext = lesson.id === nextLessonId && !isDone;
          const isLocked = !isDone && !isNext;
          return (
            <div key={lesson.id} className="relative z-10 flex flex-col items-center group">
              <div onClick={() => !isLocked && onStartLesson(lesson.id)} className={`w-24 h-24 rounded-[2rem] flex items-center justify-center border-4 shadow-md transition-all duration-300 cursor-pointer ${isDone ? 'bg-green-500 border-green-600 text-white' : ''} ${isNext ? 'bg-yellow-400 border-white shadow-[0_0_30px_rgba(250,204,21,0.4)] scale-110 animate-pulse-slow' : ''} ${isLocked ? 'bg-slate-200 border-white grayscale opacity-60 cursor-not-allowed' : ''}`}>
                {isDone ? <Check size={40} strokeWidth={3} /> : isLocked ? <Lock size={32} className="text-slate-400" /> : <span className="text-3xl font-black text-white">{lesson.id}</span>}
                {isNext && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap animate-bounce">START</div>}
              </div>
              <div className="mt-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-center group-hover:scale-105 transition-transform"><p className="font-bold text-slate-800 text-sm">{lesson.title}</p></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NotebookContent = ({ allContent, userVocab }) => {
  const grammarItems = allContent.filter(c => c.type === 'grammar');
  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24">
      <div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-black text-slate-900">Lexique</h2><div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">{userVocab?.length || 0} Mots appris</div></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4"><h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><Edit3 size={18} /> Vocabulaire</h3>{userVocab && userVocab.length > 0 ? (<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[400px] overflow-y-auto">{userVocab.map((item, idx) => (<div key={`${item.id}-${idx}`} className="p-4 flex justify-between items-center border-b border-slate-100 last:border-0 hover:bg-slate-50"><div><p className="font-bold text-slate-800">{item.es}</p><p className="text-xs text-slate-400 italic mt-0.5">{item.context}</p></div><span className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">{item.en}</span></div>))}</div>) : <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400"><BookOpen size={48} className="mb-4 opacity-20" /><p className="font-medium text-lg">Ton lexique est vide.</p></div>}</div>
        <div className="space-y-4"><h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><BookOpen size={18} /> Grammaire</h3><div className="space-y-4">{grammarItems.map(item => (<div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"><div className="flex items-center gap-3 mb-4"><div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Book size={20} /></div><div><h4 className="font-bold text-slate-900">{item.title}</h4><p className="text-xs text-slate-500">{item.description}</p></div></div><div className="bg-slate-50 rounded-xl overflow-hidden text-sm border border-slate-100">{item.conjugation.map((row, idx) => (<div key={idx} className={`flex justify-between p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}><span className="text-slate-400 w-1/3">{row.pronoun}</span><span className="font-bold text-slate-800 w-1/3 text-center">{row.verb}</span><span className="text-slate-400 text-xs w-1/3 text-right italic">{row.fr}</span></div>))}</div></div>))}</div></div>
      </div>
    </div>
  );
};

const ProfileContent = ({ userData, email, onLogout }) => (
  <div className="max-w-2xl mx-auto w-full p-6 md:p-12 space-y-8">
    <h2 className="text-3xl font-black text-slate-900">Mon Compte</h2>
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">{userData?.name?.charAt(0).toUpperCase()}</div>
        <div><p className="font-bold text-slate-900 text-lg">{userData?.name}</p><p className="text-slate-400 text-sm">{email}</p></div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-slate-100">
        <div><p className="text-2xl font-black text-slate-900">{userData?.xp}</p><p className="text-xs text-slate-400 uppercase font-bold">XP Total</p></div>
        <div><p className="text-2xl font-black text-slate-900">{userData?.streak}</p><p className="text-xs text-slate-400 uppercase font-bold">Série</p></div>
        <div><p className="text-2xl font-black text-slate-900">{userData?.level}</p><p className="text-xs text-slate-400 uppercase font-bold">Niveau</p></div>
      </div>
      <button onClick={onLogout} className="w-full text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"><LogOut size={20} /> Se déconnecter</button>
    </div>
  </div>
);

const LessonEngine = ({ content, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentCard = content[currentIndex];
  const handleNext = () => { if (currentIndex + 1 >= content.length) { setProgress(100); setTimeout(() => onComplete(150), 500); } else { setProgress(((currentIndex + 1) / content.length) * 100); setCurrentIndex(prev => prev + 1); } };
  return (
    <div className="h-full w-full flex flex-col bg-slate-50">
      <div className="px-6 py-4 md:py-6 flex items-center gap-6 bg-white border-b border-slate-100 z-10">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
        <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div></div>
      </div>
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
  const handleSwipe = (dir) => { setSwiped(dir); setTimeout(onNext, 250); };
  return (
    <div className={`w-full h-full bg-white rounded-3xl shadow-xl border-b-8 border-slate-100 flex flex-col relative transition-all duration-300 ${swiped === 'left' ? '-translate-x-[150%] rotate-[-20deg] opacity-0' : ''} ${swiped === 'right' ? 'translate-x-[150%] rotate-[20deg] opacity-0' : ''}`}>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h2 className="text-5xl md:text-6xl font-black text-slate-800">{data.es}</h2>
        <div className="w-16 h-1 bg-slate-100 rounded-full"></div>
        <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100"><p className="text-xl md:text-2xl font-bold text-indigo-600">{data.en}</p></div>
        <p className="text-sm text-slate-400 italic">"{data.context}"</p>
      </div>
      <div className="p-6 pb-8 flex justify-center gap-8">
        <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-95 transition-all"><X size={32} strokeWidth={3} /></button>
        <button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full bg-teal-500 border-b-4 border-teal-700 text-white flex items-center justify-center hover:bg-teal-400 hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-1 transition-all"><Check size={32} strokeWidth={3} /></button>
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
      <div className="text-center space-y-2"><span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Challenge</span><h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3></div>
      <input type="text" value={val} onChange={(e) => { setVal(e.target.value); setStatus('idle'); }} className={`w-full text-center text-2xl md:text-3xl font-bold p-6 rounded-2xl border-4 outline-none transition-all ${status === 'error' ? 'border-red-400 bg-red-50 text-red-500' : status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-100 focus:border-yellow-400 focus:bg-yellow-50'}`} placeholder="Ta réponse..." />
      <button onClick={checkAnswer} className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${status === 'success' ? 'bg-green-500' : 'bg-slate-900'}`}>{status === 'success' ? 'Parfait ! 🎉' : 'Vérifier'}</button>
      {status === 'error' && <p className="text-center text-red-400 font-bold animate-shake">Essaie encore ! Indice : {data.hint}</p>}
    </div>
  );
};

const GrammarCard = ({ data, onNext }) => (
  <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
    <div className="bg-indigo-600 p-8 md:p-10 text-white text-center"><h3 className="text-3xl md:text-4xl font-black">{data.title}</h3><p className="text-indigo-200 mt-2">{data.description}</p></div>
    <div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-slate-50">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {data.conjugation.map((row, idx) => (
           <div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0"><span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span><span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span><span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span></div>
        ))}
      </div>
      <button onClick={onNext} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-yellow-300 active:scale-95 transition-all">J'ai compris</button>
    </div>
  </div>
);

const LessonComplete = ({ xp, onHome }) => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500">
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div>
    <div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">Increíble!</h2><p className="text-xl text-yellow-900 font-bold opacity-80">Leçon terminée et sauvegardée.</p></div>
    <div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div>
    <button onClick={onHome} className="w-full max-w-sm bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Continuer</button>
  </div>
);