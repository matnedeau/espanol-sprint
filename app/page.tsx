/* eslint-disable */
// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock, LayoutDashboard, Library, AlertCircle, Mail, Bell, Settings, Loader2, CloudUpload, Volume2, Download, Printer, Hammer, ArrowRight
} from 'lucide-react';

// --- IMPORTATION FIREBASE ---
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, increment, collection, getDocs } from "firebase/firestore";

// ---------------------------------------------------------
// 🟢 CONFIGURATION FIREBASE
// ---------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDPWOdxYtnvVrDB6wk68EF0Gz62fqVCwBE", 
  authDomain: "espanolsprint.firebaseapp.com",
  projectId: "espanolsprint",
  storageBucket: "espanolsprint.firebasestorage.app",
  messagingSenderId: "54612821418",
  appId: "1:54612821418:web:7af8de5ad1545ec1ba57d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Fonction Audio
const speak = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.includes('es-ES') || v.lang.includes('es'));
    if (esVoice) utterance.voice = esVoice;
    utterance.lang = 'es-ES'; 
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
};

/* --- DATASET ENRICHI --- */
const INITIAL_LESSONS_LIST = [
  { id: 1, title: "Les Bases", level: "A1", desc: "Se présenter & Être" },
  { id: 2, title: "Ma Famille", level: "A1", desc: "Possession & Avoir" },
  { id: 3, title: "Au Quotidien", level: "A1", desc: "Verbes en -AR & Routine" },
  { id: 4, title: "La Nourriture", level: "A1", desc: "Gustar & Manger" },
  { id: 5, title: "Voyage", level: "A1", desc: "Transports & Lieux" },
  { id: 6, title: "En Ville", level: "A1", desc: "Directions & Verbe Aller" },
  { id: 7, title: "Bilan Semaine 1", level: "A1", desc: "Grand Quiz Final" },
];

const INITIAL_LESSONS_CONTENT = {
  1: [
    { id: 101, type: "swipe", es: "Hola", en: "Bonjour", context: "Hola, ¿qué tal?" },
    { id: 102, type: "swipe", es: "Buenos días", en: "Bonjour (Matin)", context: "Buenos días, mamá" },
    { id: 103, type: "grammar", title: "Grammaire : Être (Ser)", description: "Pour l'identité et l'origine.", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }, { pronoun: "Él/Ella", verb: "es", fr: "Il est" }] },
    { id: 104, type: "input", question: "Traduis : 'Je suis'", answer: ["yo soy", "soy"], hint: "Verbe Ser" },
    { id: 105, type: "swipe", es: "Yo soy francés", en: "Je suis français", context: "Yo soy francés de París" },
    { id: 106, type: "structure", title: "Structure : Phrase Simple", formula: "Sujet (Optionnel) + Verbe + Adjectif", example: "Soy alto (Je suis grand)", note: "On omet souvent le 'Yo'." },
    { id: 107, type: "swipe", es: "Gracias", en: "Merci", context: "Muchas gracias" },
    { id: 108, type: "swipe", es: "Por favor", en: "S'il vous plaît", context: "Agua, por favor" },
    { id: 109, type: "swipe", es: "Me llamo", en: "Je m'appelle", context: "Me llamo Sofia" },
    { id: 110, type: "input", question: "Traduis : 'Merci'", answer: ["gracias"], hint: "Gra..." },
    { id: 111, type: "swipe", es: "¿Cómo estás?", en: "Comment ça va ?", context: "Hola, ¿cómo estás?" },
    { id: 112, type: "swipe", es: "Muy bien", en: "Très bien", context: "Estoy muy bien, gracias" }
  ],
  2: [
    { id: 201, type: "swipe", es: "La familia", en: "La famille", context: "Amo a mi familia" },
    { id: 202, type: "grammar", title: "Grammaire : Avoir (Tener)", description: "Possession & Âge", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }, { pronoun: "Él/Ella", verb: "tiene", fr: "Il a" }, { pronoun: "Nosotros", verb: "tenemos", fr: "Nous avons" }, { pronoun: "Ellos", verb: "tienen", fr: "Ils ont" }] },
    { id: 203, type: "input", question: "Traduis : 'J'ai'", answer: ["tengo", "yo tengo"], hint: "Verbe Tener" },
    { id: 204, type: "swipe", es: "El padre", en: "Le père", context: "Mi padre es alto" },
    { id: 205, type: "swipe", es: "La madre", en: "La mère", context: "Mi madre es guapa" },
    { id: 206, type: "structure", title: "Structure : La Possession", formula: "Mi / Tu / Su + Nom", example: "Mi casa (Ma maison)", note: "Pas d'article devant le possessif." },
    { id: 207, type: "swipe", es: "Mi hermano", en: "Mon frère", context: "Mi hermano se llama Juan" },
    { id: 208, type: "swipe", es: "Tu hermana", en: "Ta soeur", context: "¿Cómo se llama tu hermana?" },
    { id: 209, type: "swipe", es: "Tengo 20 años", en: "J'ai 20 ans", context: "Tengo 20 años" },
    { id: 210, type: "input", question: "Traduis : 'J'ai un frère'", answer: ["tengo un hermano", "yo tengo un hermano"], hint: "Tengo un h..." },
    { id: 211, type: "swipe", es: "El gato", en: "Le chat", context: "El gato negro" },
    { id: 212, type: "swipe", es: "El perro", en: "Le chien", context: "Mi perro es fiel" },
    { id: 213, type: "swipe", es: "La casa", en: "La maison", context: "Vivo en una casa" }
  ],
  3: [
    { id: 301, type: "swipe", es: "Hablar", en: "Parler", context: "Hablo español" },
    { id: 302, type: "grammar", title: "Verbes en -AR", description: "Terminaisons du présent", conjugation: [{ pronoun: "Yo", verb: "-o", fr: "habl(o)" }, { pronoun: "Tú", verb: "-as", fr: "habl(as)" }, { pronoun: "Él", verb: "-a", fr: "habl(a)" }, { pronoun: "Nosotros", verb: "-amos", fr: "habl(amos)" }, { pronoun: "Ellos", verb: "-an", fr: "habl(an)" }] },
    { id: 303, type: "input", question: "Je parle (Hablar)", answer: ["hablo", "yo hablo"], hint: "Terminaison -o" },
    { id: 304, type: "swipe", es: "Trabajar", en: "Travailler", context: "Trabajo en Madrid" },
    { id: 305, type: "structure", title: "Structure : La Négation", formula: "No + Verbe", example: "No hablo inglés", note: "Juste 'No' avant le verbe." },
    { id: 306, type: "swipe", es: "No trabajo", en: "Je ne travaille pas", context: "Hoy no trabajo" },
    { id: 307, type: "swipe", es: "Escuchar", en: "Écouter", context: "Escucho música" },
    { id: 308, type: "swipe", es: "Estudiar", en: "Étudier", context: "Estudio mucho" },
    { id: 309, type: "input", question: "Tu étudies (Estudiar)", answer: ["estudias", "tú estudias"], hint: "Terminaison -as" },
    { id: 310, type: "swipe", es: "Bailar", en: "Danser", context: "Me gusta bailar" },
    { id: 311, type: "swipe", es: "Caminar", en: "Marcher", context: "Camino en el parque" },
    { id: 312, type: "swipe", es: "Comprar", en: "Acheter", context: "Compro comida" },
    { id: 313, type: "swipe", es: "¿Hablas español?", en: "Parles-tu espagnol ?", context: "Perdón, ¿hablas español?" },
    { id: 314, type: "input", question: "Traduis : 'Je ne danse pas'", answer: ["no bailo", "yo no bailo"], hint: "No + verbe" }
  ]
};

/* --- APPLICATION --- */
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  
  const [dynamicLessonsList, setDynamicLessonsList] = useState(INITIAL_LESSONS_LIST);
  const [dynamicLessonsContent, setDynamicLessonsContent] = useState({});

  useEffect(() => {
    const initApp = async (user) => {
      try { await getRedirectResult(auth); } catch (e) { console.error("Redirect:", e); }
      
      if (user) {
        setCurrentUser(user);
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            const name = user.displayName ? user.displayName.split(' ')[0] : user.email.split('@')[0];
            const newProfile = { name: name, xp: 0, streak: 1, level: 1, vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } };
            await setDoc(userRef, newProfile);
            setUserData(newProfile);
          }
          const roadmapSnap = await getDoc(doc(db, "meta", "roadmap"));
          if (roadmapSnap.exists()) setDynamicLessonsList(roadmapSnap.data().lessons);
          const lessonsSnapshot = await getDocs(collection(db, "lessons"));
          const lessonsData = {};
          lessonsSnapshot.forEach((doc) => { lessonsData[doc.id] = doc.data().content; });
          if (Object.keys(lessonsData).length > 0) setDynamicLessonsContent(lessonsData);
          else setDynamicLessonsContent(INITIAL_LESSONS_CONTENT);
          
          setView('dashboard');
        } catch (error) { console.error("Erreur chargement:", error); }
      } else {
        setCurrentUser(null); setUserData(null); setView('landing');
      }
      setLoading(false);
    };
    const unsubscribe = onAuthStateChanged(auth, initApp);
    return () => unsubscribe();
  }, []);

  const uploadFullContentToCloud = async () => {
    if (!confirm("ADMIN : Mettre à jour tout le contenu dans Firebase ?")) return;
    try {
      await setDoc(doc(db, "meta", "roadmap"), { lessons: INITIAL_LESSONS_LIST });
      for (const [id, content] of Object.entries(INITIAL_LESSONS_CONTENT)) {
        await setDoc(doc(db, "lessons", id), { content: content });
      }
      alert("✅ Contenu mis à jour !");
      window.location.reload(); 
    } catch (e) { alert("Erreur: " + e.message); }
  };

  const handleAuth = async (email, password, isSignUp) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), { name: email.split('@')[0], email, xp: 0, streak: 1, level: 1, vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } });
      } else { await signInWithEmailAndPassword(auth, email, password); }
    } catch (error) { alert("Erreur: " + error.message); setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      if (window.innerWidth < 768) await signInWithRedirect(auth, googleProvider);
      else await signInWithPopup(auth, googleProvider);
    } catch (error) { alert("Erreur Google: " + error.message); setLoading(false); }
  };
  
  const handleLogout = async () => { await signOut(auth); setView('landing'); };

  const startLesson = (lessonId) => {
    const today = new Date().toDateString();
    const isNewLesson = !userData.completedLessons.includes(lessonId);
    if (isNewLesson && userData?.dailyLimit?.date === today && userData?.dailyLimit?.count >= 4) { 
      setShowLimitModal(true); return; 
    }
    if (!dynamicLessonsContent[lessonId]) { alert("Leçon non disponible."); return; }
    setActiveLessonId(lessonId);
    setView('lesson');
  };

  const handleLessonComplete = async (xp, lessonContent, lessonId) => {
    // Capture TOUS les types importants : Swipe, Grammaire, Structure
    const newItems = lessonContent.filter(item => ['swipe', 'grammar', 'structure'].includes(item.type));
    const today = new Date().toDateString();
    
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      
      // Filtre pour ne pas ajouter ce qu'on a déjà
      const uniqueNewItems = newItems.filter(item => !userData.vocab.some(v => v.id === item.id));

      const isNew = !userData.completedLessons.includes(lessonId);
      const newCount = isNew ? (userData.dailyLimit?.date === today ? userData.dailyLimit.count + 1 : 1) : (userData.dailyLimit?.count || 0);

      const updateData = {
        xp: increment(xp),
        streak: increment(1),
        vocab: arrayUnion(...uniqueNewItems), // Ajoute vocab, grammaire ET structures
        completedLessons: arrayUnion(lessonId),
        dailyLimit: { date: today, count: newCount }
      };
      await updateDoc(userRef, updateData);
      const newSnap = await getDoc(userRef);
      setUserData(newSnap.data());
    }
    setView('complete');
  };

  const handlePrintPDF = (lessonId) => {
    const content = dynamicLessonsContent[lessonId];
    if(!content) return;
    const printWindow = window.open('', '_blank');
    const vocabHTML = content.filter(c => c.type === 'swipe').map(c => `<div style="margin-bottom:10px; border-bottom:1px solid #eee;"><b>${c.es}</b> = ${c.en} <i style="color:gray">(${c.context})</i></div>`).join('');
    const grammarHTML = content.filter(c => c.type === 'grammar').map(c => `
      <div style="margin-top:20px; background:#f9fafb; padding:15px; border-radius:8px;">
        <h3>${c.title}</h3>
        <table style="width:100%; border-collapse:collapse;">
          ${c.conjugation.map(r => `<tr style="border-bottom:1px solid #eee;"><td style="padding:5px; color:#888;">${r.pronoun}</td><td style="padding:5px; font-weight:bold;">${r.verb}</td><td style="padding:5px;">${r.fr}</td></tr>`).join('')}
        </table>
      </div>`).join('');
    const structHTML = content.filter(c => c.type === 'structure').map(c => `<div style="margin-top:20px; border:1px solid #fbbf24; padding:10px; border-radius:8px;"><h3>${c.title}</h3><p><code>${c.formula}</code></p><p>${c.example}</p></div>`).join('');
    
    printWindow.document.write(`<html><head><title>Leçon ${lessonId}</title></head><body style="font-family:sans-serif; padding:30px;"><h1>🇪🇸 Leçon ${lessonId}</h1><h2>Vocabulaire</h2>${vocabHTML}<h2>Grammaire</h2>${grammarHTML}<h2>Structures</h2>${structHTML}<script>window.print()</script></body></html>`);
    printWindow.document.close();
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-yellow-400"><Loader2 size={48} className="animate-spin text-white" /></div>;

  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500"><AlertCircle size={40} /></div>
            <div><h3 className="text-2xl font-black text-slate-900">Cerveau Plein ! 🧠</h3><p className="text-slate-500 mt-2">4 leçons par jour. Repose-toi ou révise !</p></div>
            <button onClick={() => setShowLimitModal(false)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">Compris</button>
          </div>
        </div>
      )}

      {(!currentUser || view === 'landing' || view === 'auth') ? (
        <div className="w-full h-full flex items-center justify-center bg-white">
           {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
           {view === 'auth' && <AuthScreen onAuth={handleAuth} onGoogle={handleGoogleLogin} onBack={() => setView('landing')} />}
        </div>
      ) : (
        <>
          <SidebarDesktop userData={userData} currentView={view} onChangeView={setView} onLogout={handleLogout} onUpload={uploadFullContentToCloud} />
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            <MobileHeader userData={userData} />
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              {view === 'dashboard' && userData && <DashboardContent userData={userData} allLessons={dynamicLessonsList} onStartLesson={startLesson} />}
              {view === 'notebook' && userData && <NotebookContent userVocab={userData.vocab} />}
              {view === 'profile' && userData && <ProfileContent userData={userData} email={currentUser.email} onLogout={handleLogout} />}
              {view === 'lesson' && dynamicLessonsContent[activeLessonId] && <LessonEngine content={dynamicLessonsContent[activeLessonId]} onComplete={(xp) => handleLessonComplete(xp, dynamicLessonsContent[activeLessonId], activeLessonId)} onExit={() => setView('dashboard')} />}
              {view === 'complete' && <LessonComplete xp={150} onHome={() => setView('dashboard')} onDownload={() => handlePrintPDF(activeLessonId)} />}
            </div>
            {view !== 'lesson' && view !== 'complete' && <MobileBottomNav currentView={view} onChangeView={setView} />}
          </main>
        </>
      )}
    </div>
  );
}

/* --- UI COMPONENTS --- */

const NotebookContent = ({ userVocab }) => {
  // Filtrage dynamique du contenu appris
  const vocabItems = userVocab.filter(c => c.type === 'swipe');
  const grammarItems = userVocab.filter(c => c.type === 'grammar');
  const structureItems = userVocab.filter(c => c.type === 'structure');
  
  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24">
      <div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-black text-slate-900">Lexique & Savoir</h2><div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">{userVocab?.length || 0} Éléments</div></div>
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* VOCABULAIRE */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><Edit3 size={18} /> Vocabulaire</h3>
          {vocabItems.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[500px] overflow-y-auto">
              {vocabItems.map((item, idx) => (
                <div key={`vocab-${idx}`} className="p-4 flex justify-between items-center border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <div><p className="font-bold text-slate-800">{item.es}</p><p className="text-xs text-slate-400 italic mt-0.5">{item.context}</p></div>
                  <span className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">{item.en}</span>
                </div>
              ))}
            </div>
          ) : <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-xl">Vide</div>}
        </div>

        {/* GRAMMAIRE & STRUCTURES */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><BookOpen size={18} /> Grammaire</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {grammarItems.map((item, index) => (
                <div key={`gram-${index}`} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <h4 className="font-bold text-indigo-600 mb-2">{item.title}</h4>
                  <div className="bg-slate-50 rounded-xl overflow-hidden text-sm border border-slate-100">
                    {item.conjugation && item.conjugation.map((row, idx) => (
                      <div key={idx} className={`flex justify-between p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <span className="text-slate-400 w-1/3">{row.pronoun}</span>
                        <span className="font-bold text-slate-800 w-1/3 text-center">{row.verb}</span>
                        <span className="text-slate-400 text-xs w-1/3 text-right italic">{row.fr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {grammarItems.length === 0 && <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-xl">Vide</div>}
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><Hammer size={18} /> Structures</h3>
             <div className="space-y-4">
               {structureItems.map((item, index) => (
                 <div key={`struct-${index}`} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-yellow-400">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="font-mono text-xs text-indigo-600 bg-indigo-50 p-2 rounded mt-2 mb-2">{item.formula}</p>
                    <p className="text-sm text-slate-600 italic">Ex: {item.example}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const LandingPage = ({ onStart }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center">
    <div className="z-10 space-y-8 max-w-md">
      <div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div>
      <div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div>
      <button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button>
    </div>
  </div>
);

const AuthScreen = ({ onAuth, onGoogle, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button>
      <div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>
      <div className="space-y-4">
        <button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button>
        <div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div>
        <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button>
      <div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div>
    </div>
  );
};

const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (
  <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6">
    <div className="flex items-center gap-2 mb-12 px-2"><div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md rotate-3"><span className="text-2xl">🇪🇸</span></div><h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Español<span className="text-red-600">Sprint</span></h1></div>
    <nav className="flex-1 space-y-2">
      <SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
      <SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
      <SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} />
    </nav>
    <button onClick={onUpload} className="mb-4 flex items-center gap-2 text-xs text-slate-300 hover:text-indigo-500 px-4 transition-colors"><CloudUpload size={14} /> Initialiser Leçons</button>
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
        <p className="text-slate-500">Objectif A1 • {userData.completedLessons.length} / {allLessons.length} leçons</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Énergie du jour</span><div className="flex gap-1">{[1, 2, 3, 4].map(i => (<div key={i} className={`w-3 h-8 rounded-full ${i <= (4 - dailyCount) ? 'bg-green-400' : 'bg-slate-200'}`}></div>))}</div></div>
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

  const handleNext = () => {
    if (currentIndex + 1 >= content.length) {
      setProgress(100);
      setTimeout(() => onComplete(150), 500);
    } else {
      setProgress(((currentIndex + 1) / content.length) * 100);
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (currentIndex === 0 && currentCard?.es) speak(currentCard.es);
  }, []);

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
          {currentCard.type === 'structure' && <StructureCard key={currentCard.id} data={currentCard} onNext={handleNext} />}
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
      <div className="absolute top-4 right-4 z-10">
         <button onClick={(e) => { e.stopPropagation(); speak(data.es); }} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 text-indigo-600 shadow-sm active:scale-95 transition-all">
            <Volume2 size={24} />
         </button>
      </div>
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
    if (isCorrect) {
        speak("¡Muy bien!");
        setTimeout(onNext, 1500);
    } else {
        speak("Inténtalo de nuevo");
    }
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
    <div className="bg-indigo-600 p-8 md:p-10 text-white text-center relative">
       <button onClick={(e) => { e.stopPropagation(); speak(data.title); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white"><Volume2 size={20} /></button>
       <h3 className="text-3xl md:text-4xl font-black">{data.title}</h3><p className="text-indigo-200 mt-2">{data.description}</p>
    </div>
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

const StructureCard = ({ data, onNext }) => (
  <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 border-b-[12px] border-slate-100">
    <div className="bg-amber-400 p-8 text-slate-900 text-center relative">
       <button onClick={(e) => { e.stopPropagation(); speak(data.example); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-slate-900"><Volume2 size={20} /></button>
       <h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3>
    </div>
    <div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50">
       <div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center">
          <p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p>
          <p className="text-slate-500 text-sm">{data.note}</p>
       </div>
       <div className="text-center">
          <p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p>
          <p className="text-sm text-slate-400 italic">Exemple</p>
       </div>
       <button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-all">C'est noté !</button>
    </div>
  </div>
);

const LessonComplete = ({ xp, onHome, onDownload }) => (
  <div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500">
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div>
    <div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">Increíble!</h2><p className="text-xl text-yellow-900 font-bold opacity-80">Leçon terminée et sauvegardée.</p></div>
    <div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div>
    <div className="flex flex-col gap-4 w-full max-w-sm">
        <button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"><Download size={20} /> Télécharger le PDF</button>
        <button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Continuer</button>
    </div>
  </div>
);