/* eslint-disable */
// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock, LayoutDashboard, Library, AlertCircle, Mail, Bell, Settings, Loader2, CloudUpload, Volume2, Download, Printer, PenTool, Hammer, ArrowRight, RotateCcw, Table, Map, CheckCircle, Star
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

/* --- STRUCTURE PÉDAGOGIQUE A1 -> C1 --- */
const LEVELS_CONFIG = [
  { name: "A1", count: 10, title: "Débutant", desc: "Les bases de survie" },
  { name: "A2", count: 10, title: "Élémentaire", desc: "Le passé et le futur" },
  { name: "B1", count: 10, title: "Intermédiaire", desc: "Le subjonctif et l'opinion" },
  { name: "B2", count: 10, title: "Avancé", desc: "Débats et fluidité" },
  { name: "C1", count: 10, title: "Expert", desc: "Nuances et maîtrise native" }
];

const LESSON_TITLES = {
  // A1 (1-10)
  1: "Hola! (Salutations)", 2: "Être & Avoir", 3: "La Famille", 4: "Nourriture & Goûts", 5: "La Ville & Directions",
  6: "Nombres & Heure", 7: "Vêtements & Couleurs", 8: "La Maison", 9: "Le Corps Humain", 10: "Bilan A1",
  // A2 (11-20)
  11: "Le Passé Composé", 12: "L'Imparfait", 13: "Futur Proche", 14: "Comparaisons", 15: "Obligation (Tener que)",
  16: "Santé & Médecin", 17: "Voyage & Hôtel", 18: "Météo", 19: "Gérondif (En train de)", 20: "Bilan A2",
  // B1 (21-30)
  21: "Futur Simple", 22: "Subjonctif Présent", 23: "Impératif (Ordres)", 24: "Conditionnel", 25: "Pronoms COD/COI",
  26: "Sentiments & Doute", 27: "Environnement", 28: "Technologie", 29: "Discours Rapporté", 30: "Bilan B1",
  // B2 (31-40)
  31: "Subjonctif Imparfait", 32: "Plus-que-parfait", 33: "Voix Passive", 34: "Connecteurs Logiques", 35: "Débat & Argumentation",
  36: "Politique & Société", 37: "Idiomes Courants", 38: "Le Monde du Travail", 39: "Presse & Médias", 40: "Bilan B2",
  // C1 (41-50)
  41: "Nuances de Style", 42: "Expressions Complexes", 43: "Structures emphatiques", 44: "Linguistique & Histoire", 45: "Ironie & Humour",
  46: "Espagnol des Affaires", 47: "Littérature", 48: "Dialectes & Accents", 49: "Rédaction Académique", 50: "Maîtrise Totale"
};

const generateLessonList = () => {
  const list = [];
  let idCounter = 1;
  LEVELS_CONFIG.forEach(lvl => {
    for (let i = 0; i < lvl.count; i++) {
      list.push({ 
        id: idCounter, 
        title: LESSON_TITLES[idCounter] || `Leçon ${idCounter}`, 
        level: lvl.name, 
        desc: `${lvl.desc} - Partie ${i + 1}` 
      });
      idCounter++;
    }
  });
  return list;
};

const INITIAL_LESSONS_LIST = generateLessonList();

/* --- CONTENU PÉDAGOGIQUE DÉTAILLÉ (EXEMPLES CLÉS) --- */
const MANUAL_CONTENT = {
  // --- NIVEAU A1 ---
  1: [
    { id: 101, type: "swipe", es: "Hola", en: "Bonjour", context: "Hola, ¿qué tal?" },
    { id: 102, type: "swipe", es: "Buenos días", en: "Bonjour (Matin)", context: "Buenos días, señor" },
    { id: 103, type: "grammar", title: "Être (Ser)", description: "Identité permanente", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }] },
    { id: 104, type: "input", question: "Traduis : 'Je suis'", answer: ["yo soy", "soy"], hint: "Verbe Ser" },
    { id: 105, type: "structure", title: "Phrase Simple", formula: "Sujet + Verbe", example: "Soy Pablo (Je suis Pablo)", note: "Le sujet est souvent omis." },
    { id: 106, type: "swipe", es: "Adiós", en: "Au revoir", context: "Adiós amigo" },
    { id: 107, type: "swipe", es: "Por favor", en: "S'il vous plaît", context: "Una mesa, por favor" },
    { id: 108, type: "swipe", es: "Gracias", en: "Merci", context: "Muchas gracias" }
  ],
  // --- NIVEAU A2 (Le Passé) ---
  11: [
    { id: 1101, type: "structure", title: "Le Passé Composé", formula: "Haber + Participe Passé", example: "He comido (J'ai mangé)", note: "Auxiliaire Haber au présent." },
    { id: 1102, type: "grammar", title: "Auxiliaire Haber", description: "Indispensable pour le passé", conjugation: [{ pronoun: "Yo", verb: "he", fr: "J'ai" }, { pronoun: "Tú", verb: "has", fr: "Tu as" }, { pronoun: "Él", verb: "ha", fr: "Il a" }] },
    { id: 1103, type: "swipe", es: "Ayer", en: "Hier", context: "Ayer he trabajado" },
    { id: 1104, type: "swipe", es: "He hablado", en: "J'ai parlé", context: "He hablado con Juan" },
    { id: 1105, type: "input", question: "Traduis : 'J'ai mangé'", answer: ["he comido"], hint: "Comer -> Comido" },
    { id: 1106, type: "swipe", es: "Esta mañana", en: "Ce matin", context: "Esta mañana he corrido" },
    { id: 1107, type: "swipe", es: "He vivido", en: "J'ai vécu", context: "He vivido en Madrid" }
  ],
  // --- NIVEAU B1 (Le Subjonctif) ---
  22: [
    { id: 2201, type: "structure", title: "Le Subjonctif", formula: "Verbe Désir + QUE + Subjonctif", example: "Quiero que vengas", note: "Exprime le doute, le souhait, l'émotion." },
    { id: 2202, type: "grammar", title: "Subjonctif Présent (-AR)", description: "Le A devient E", conjugation: [{ pronoun: "Yo", verb: "hable", fr: "Que je parle" }, { pronoun: "Tú", verb: "hables", fr: "Que tu parles" }] },
    { id: 2203, type: "swipe", es: "Espero que", en: "J'espère que", context: "Espero que estés bien" },
    { id: 2204, type: "swipe", es: "Ojalá", en: "Pourvu que", context: "¡Ojalá llueva!" },
    { id: 2205, type: "input", question: "Que tu manges (Comer)", answer: ["comas"], hint: "E devient A" },
    { id: 2206, type: "swipe", es: "Es posible que", en: "Il est possible que", context: "Es posible que vaya" }
  ],
  // --- NIVEAU C1 (Expert) ---
  41: [
    { id: 4101, type: "swipe", es: "Efímero", en: "Éphémère", context: "La belleza es efímera" },
    { id: 4102, type: "swipe", es: "Paradójico", en: "Paradoxal", context: "Es un resultado paradójico" },
    { id: 4103, type: "structure", title: "Nuance : Por vs Para", formula: "Por (Cause) / Para (But)", example: "Lo hago por ti (cause) / para ti (but)", note: "Subtilité essentielle." },
    { id: 4104, type: "input", question: "Synonyme de 'Tristeza' (Soutenu)", answer: ["melancolía", "pesadumbre"], hint: "M... ou P..." },
    { id: 4105, type: "swipe", es: "Ineludible", en: "Inéluctable", context: "Un destino ineludible" },
    { id: 4106, type: "grammar", title: "Subjonctif Imparfait", description: "Hypothèse irréelle", conjugation: [{ pronoun: "Si yo", verb: "tuviera", fr: "Si j'avais" }, { pronoun: "Si tú", verb: "fueras", fr: "Si tu étais" }] }
  ]
};

// Générateur pour combler les trous (Leçons 2-9, 11-21, etc.)
const generateAllContent = () => {
  const content = { ...MANUAL_CONTENT };
  for (let i = 1; i <= 50; i++) { // Génère jusqu'à 50 leçons pour l'exemple (extensible à 100)
    if (!content[i]) {
      const level = i <= 10 ? 'A1' : i <= 20 ? 'A2' : i <= 30 ? 'B1' : i <= 40 ? 'B2' : 'C1';
      content[i] = [
        { id: i * 100 + 1, type: "structure", title: `Structure ${level} - Leçon ${i}`, formula: "Sujet + Verbe + Complément", example: `Práctica del nivel ${level}`, note: "Focus sur la fluidité" },
        { id: i * 100 + 2, type: "swipe", es: `Palabra ${i}A`, en: `Mot ${level} A`, context: `Contexto lección ${i}` },
        { id: i * 100 + 3, type: "swipe", es: `Palabra ${i}B`, en: `Mot ${level} B`, context: `Contexto lección ${i}` },
        { id: i * 100 + 4, type: "grammar", title: `Verbe Clé ${i}`, description: "Conjugaison essentielle", conjugation: [{ pronoun: "Yo", verb: `verbo${i}o`, fr: "je..." }, { pronoun: "Tú", verb: `verbo${i}as`, fr: "tu..." }] },
        { id: i * 100 + 5, type: "input", question: `Traduis le mot A`, answer: [`mot a`], hint: "..." }
      ];
    }
  }
  return content;
};
const INITIAL_LESSONS_CONTENT = generateAllContent();

const SENTENCE_STRUCTURES = [
  { id: 1, title: "La Phrase Simple", formula: "Sujet + Verbe + Complément", example_es: "Yo como una manzana.", example_en: "Je mange une pomme.", explanation: "Comme en français." },
  { id: 2, title: "La Négation", formula: "No + Verbe", example_es: "No hablo inglés.", example_en: "Je ne parle pas anglais.", explanation: "Juste 'No' avant." },
  { id: 3, title: "Le Futur Proche", formula: "Ir + a + Infinitif", example_es: "Voy a comer.", example_en: "Je vais manger.", explanation: "Très courant à l'oral." },
];

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
            const newProfile = { name: name, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } };
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
    if (!confirm("ADMIN : Initialiser tout le contenu (A1->C1) dans Firebase ?")) return;
    try {
      await setDoc(doc(db, "meta", "roadmap"), { lessons: INITIAL_LESSONS_LIST });
      let count = 0;
      for (const [id, content] of Object.entries(INITIAL_LESSONS_CONTENT)) {
        await setDoc(doc(db, "lessons", id), { content: content });
        count++;
      }
      alert(`✅ ${count} Leçons envoyées !`);
      window.location.reload(); 
    } catch (e) { alert("Erreur: " + e.message); }
  };

  const handleAuth = async (email, password, isSignUp) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), { name: email.split('@')[0], email, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } });
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
    const newItems = lessonContent.filter(item => ['swipe', 'grammar', 'structure'].includes(item.type));
    const today = new Date().toDateString();
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const uniqueNewItems = newItems.filter(item => !userData.vocab.some(v => v.id === item.id));
      const isNew = !userData.completedLessons.includes(lessonId);
      const newCount = isNew ? (userData.dailyLimit?.date === today ? userData.dailyLimit.count + 1 : 1) : (userData.dailyLimit?.count || 0);
      
      const totalDone = userData.completedLessons.length + (isNew ? 1 : 0);
      let newLevel = userData.level;
      if (userData.level === "A1" && totalDone >= 10) newLevel = "A2";
      if (userData.level === "A2" && totalDone >= 20) newLevel = "B1";
      if (userData.level === "B1" && totalDone >= 30) newLevel = "B2";
      if (userData.level === "B2" && totalDone >= 40) newLevel = "C1";

      const updateData = {
        xp: increment(xp),
        streak: increment(1),
        level: newLevel,
        vocab: arrayUnion(...uniqueNewItems), 
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
    const vocabHTML = content.filter(c => c.type === 'swipe').map(c => `<li><b>${c.es}</b> = ${c.en}</li>`).join('');
    printWindow.document.write(`<html><body><h1>Leçon ${lessonId}</h1><ul>${vocabHTML}</ul><script>window.print()</script></body></html>`);
    printWindow.document.close();
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-yellow-400"><Loader2 size={48} className="animate-spin text-white" /></div>;

  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500"><AlertCircle size={40} /></div>
            <div><h3 className="text-2xl font-black text-slate-900">Repos ! 🧠</h3><p className="text-slate-500 mt-2">4 nouvelles leçons max. Révise les anciennes !</p></div>
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
              {view === 'structures' && <StructuresContent structures={SENTENCE_STRUCTURES} />}
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

const DashboardContent = ({ userData, allLessons, onStartLesson }) => {
  const levels = ["A1", "A2", "B1", "B2", "C1"];
  
  // FIX: Force A1 si le niveau est inconnu
  const safeLevel = (userData.level && levels.includes(userData.level)) ? userData.level : "A1";
  const currentLevelIndex = levels.indexOf(safeLevel);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Ton Parcours</h2>
        <p className="text-slate-500">Niveau actuel : <span className="text-indigo-600 font-bold">{safeLevel}</span></p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 pb-10 snap-x snap-mandatory flex gap-8">
        {levels.map((level, index) => {
          const isLocked = index > currentLevelIndex;
          const isCurrent = index === currentLevelIndex;
          const isCompleted = index < currentLevelIndex;
          const levelLessons = allLessons.filter(l => l.level === level);

          return (
            <div key={level} className={`snap-center shrink-0 w-[300px] md:w-[350px] h-full flex flex-col rounded-3xl border-4 ${isCurrent ? 'border-yellow-400 bg-white' : isCompleted ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 opacity-60'} p-6 relative overflow-hidden`}>
               <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-2xl font-black text-slate-800">Niveau {level}</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{isCompleted ? 'Terminé' : isCurrent ? 'En cours' : 'Verrouillé'}</p>
                 </div>
                 {isLocked && <Lock size={24} className="text-slate-400" />}
                 {isCompleted && <div className="bg-green-500 text-white p-1 rounded-full"><Check size={16} /></div>}
               </div>

               <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2 custom-scrollbar">
                 {levelLessons.map((lesson) => {
                   const isLessonDone = userData.completedLessons.includes(lesson.id);
                   const isAccessible = isCurrent && (isLessonDone || userData.completedLessons.includes(lesson.id - 1) || lesson.id === levelLessons[0].id);
                   
                   if (isCompleted) {
                     return (
                       <div key={lesson.id} className="w-full p-4 rounded-2xl bg-green-100 text-green-800 flex items-center gap-4 opacity-70 cursor-not-allowed">
                          <CheckCircle size={16} />
                          <span className="text-sm font-bold truncate flex-1">{lesson.title}</span>
                          <span className="text-xs uppercase font-bold">Acquis</span>
                       </div>
                     );
                   }

                   return (
                     <button 
                        key={lesson.id} 
                        disabled={!isAccessible}
                        onClick={() => onStartLesson(lesson.id)}
                        className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all
                          ${isLessonDone ? 'bg-green-500 text-white shadow-md' : 
                            isAccessible ? 'bg-yellow-400 text-slate-900 shadow-lg scale-105 font-bold ring-4 ring-yellow-100' : 
                            'bg-slate-200 text-slate-400'}`}
                     >
                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                         {isLessonDone ? <Check size={16} /> : lesson.id}
                       </div>
                       <div className="flex-1 truncate"><p className="text-sm truncate">{lesson.title}</p></div>
                       {isAccessible && !isLessonDone && <PlayCircle size={20} />}
                     </button>
                   );
                 })}
               </div>

               {isLocked && (
                 <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-slate-100">
                      <Lock size={32} className="mx-auto text-slate-300 mb-2" />
                      <h4 className="font-bold text-slate-800">Niveau Bloqué</h4>
                    </div>
                 </div>
               )}
            </div>
          );
        })}
        <div className="w-6 shrink-0"></div>
      </div>
    </div>
  );
};

/* --- UI COMPONENTS (Suite Identique V15) --- */
const StructuresContent = ({ structures }) => (<div className="max-w-3xl mx-auto w-full p-6 pb-24"><h2 className="text-3xl font-black text-slate-900 mb-8">Structures de Phrases 🏗️</h2><div className="space-y-6">{structures.map((struct) => (<div key={struct.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"><div className="flex items-center gap-3 mb-4"><div className="p-2 bg-yellow-100 rounded-lg text-yellow-700"><Hammer size={20} /></div><h3 className="text-xl font-bold text-slate-900">{struct.title}</h3></div><div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-indigo-600 font-bold mb-4 text-center border border-slate-100">{struct.formula}</div><div className="space-y-2 mb-4"><p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example_es}</p><p className="text-sm text-slate-400">🇫🇷 {struct.example_en}</p></div><p className="text-sm text-slate-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100">💡 {struct.explanation}</p></div>))}</div></div>);
const NotebookContent = ({ userVocab }) => { const vocabItems = userVocab.filter(c => c.type === 'swipe'); const grammarItems = userVocab.filter(c => c.type === 'grammar'); const [showReference, setShowReference] = useState(false); const REFERENCE_VERBS = [{ title: "Verbes en -AR", endings: ["-o", "-as", "-a", "-amos", "-an"], ex: "Hablar" }, { title: "Verbes en -ER", endings: ["-o", "-es", "-e", "-emos", "-en"], ex: "Comer" }, { title: "Verbes en -IR", endings: ["-o", "-es", "-e", "-imos", "-en"], ex: "Vivir" }]; return (<div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24"><div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-black text-slate-900">Lexique</h2><div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">{userVocab?.length || 0} Éléments</div></div><div className="mb-8"><button onClick={() => setShowReference(!showReference)} className="w-full p-4 bg-yellow-100 text-yellow-800 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-200 transition-colors"><Table size={20} /> {showReference ? "Masquer" : "Voir les terminaisons"}</button>{showReference && (<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">{REFERENCE_VERBS.map((v, i) => (<div key={i} className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm"><h4 className="font-bold text-center mb-2 text-indigo-600">{v.title}</h4><p className="text-xs text-center text-gray-400 italic mb-2">{v.ex}</p><div className="space-y-1 text-sm text-center">{v.endings.map(e => <div key={e} className="bg-slate-50 py-1 rounded">{e}</div>)}</div></div>))}</div>)}</div><div className="grid md:grid-cols-2 gap-8"><div className="space-y-4"><h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><Edit3 size={18} /> Vocabulaire Acquis</h3>{vocabItems.length > 0 ? (<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[500px] overflow-y-auto">{vocabItems.map((item, idx) => (<div key={`vocab-${idx}`} className="p-4 flex justify-between items-center border-b border-slate-100 last:border-0 hover:bg-slate-50"><div><p className="font-bold text-slate-800">{item.es}</p><p className="text-xs text-slate-400 italic mt-0.5">{item.context}</p></div><span className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">{item.en}</span></div>))}</div>) : <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-xl">Vide</div>}</div><div className="space-y-4"><h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><BookOpen size={18} /> Grammaire Apprise</h3><div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">{grammarItems.map((item, index) => (<div key={`gram-${index}`} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"><h4 className="font-bold text-indigo-600 mb-2">{item.title}</h4><div className="bg-slate-50 rounded-xl overflow-hidden text-sm border border-slate-100">{item.conjugation && item.conjugation.map((row, idx) => (<div key={idx} className={`flex justify-between items-center p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}><span className="text-slate-400 w-16 sm:w-20 shrink-0">{row.pronoun}</span><span className="font-bold text-slate-800 flex-1 text-center">{row.verb}</span><span className="text-slate-400 text-xs w-20 sm:w-auto text-right italic shrink-0">{row.fr}</span></div>))}</div></div>))}</div></div></div></div>); };
const LandingPage = ({ onStart }) => (<div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center"><div className="z-10 space-y-8 max-w-md"><div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div><div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div><button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button></div></div>);
const AuthScreen = ({ onAuth, onGoogle, onBack }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div><div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (<div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6"><div className="flex items-center gap-2 mb-12 px-2"><div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md rotate-3"><span className="text-2xl">🇪🇸</span></div><h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Español<span className="text-red-600">Sprint</span></h1></div><nav className="flex-1 space-y-2"><SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><SidebarLink icon={Hammer} label="Structures" active={currentView === 'structures'} onClick={() => onChangeView('structures')} /><SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></nav><button onClick={onUpload} className="mb-4 flex items-center gap-2 text-xs text-slate-300 hover:text-indigo-500 px-4 transition-colors"><CloudUpload size={14} /> Initialiser Leçons</button><div className="mt-auto pt-6 border-t border-slate-100"><div className="flex items-center gap-3 mb-6 px-2"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{userData?.name?.charAt(0).toUpperCase()}</div><div className="flex-1"><p className="text-sm font-bold text-slate-900 truncate w-24">{userData?.name}</p><p className="text-xs text-slate-400">Niveau {userData?.level}</p></div><div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full"><Flame size={14} className="text-orange-500 fill-orange-500" /><span className="text-xs font-bold text-orange-600">{userData?.streak}</span></div></div></div></div>);
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const MobileHeader = ({ userData }) => (<div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div></div><div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div></div>);
const MobileBottomNav = ({ currentView, onChangeView }) => (<div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30"><NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><NavBtn icon={Hammer} label="Structures" active={currentView === 'structures'} onClick={() => onChangeView('structures')} /><NavBtn icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></div>);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const ProfileContent = ({ userData, email, onLogout }) => (<div className="max-w-2xl mx-auto w-full p-6 md:p-12 space-y-8"><h2 className="text-3xl font-black text-slate-900">Mon Compte</h2><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">{userData?.name?.charAt(0).toUpperCase()}</div><div><p className="font-bold text-slate-900 text-lg">{userData?.name}</p><p className="text-slate-400 text-sm">{email}</p></div></div><div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-slate-100"><div><p className="text-2xl font-black text-slate-900">{userData?.xp}</p><p className="text-xs text-slate-400 uppercase font-bold">XP Total</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.streak}</p><p className="text-xs text-slate-400 uppercase font-bold">Série</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.level}</p><p className="text-xs text-slate-400 uppercase font-bold">Niveau</p></div></div><button onClick={onLogout} className="w-full text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"><LogOut size={20} /> Se déconnecter</button></div></div>);
const LessonEngine = ({ content, onComplete, onExit }) => { const [currentIndex, setCurrentIndex] = useState(0); const [progress, setProgress] = useState(0); const currentCard = content[currentIndex]; const handleNext = () => { if (currentIndex + 1 >= content.length) { setProgress(100); setTimeout(() => onComplete(150), 500); } else { setProgress(((currentIndex + 1) / content.length) * 100); setCurrentIndex(prev => prev + 1); } }; const handlePrev = () => { if (currentIndex > 0) { setCurrentIndex(prev => prev - 1); setProgress(((currentIndex - 1) / content.length) * 100); } }; useEffect(() => { if (currentIndex === 0 && currentCard?.es) speak(currentCard.es); }, []); return (<div className="h-full w-full flex flex-col bg-slate-50"><div className="px-6 py-4 md:py-6 flex items-center gap-6 bg-white border-b border-slate-100 z-10"><button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button><div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div></div></div><div className="flex-1 flex items-center justify-center p-4 overflow-hidden"><div className="w-full max-w-md aspect-[3/4] md:aspect-auto md:h-[600px] perspective-1000">{currentCard.type === 'swipe' && <SwipeCard key={currentCard.id} data={currentCard} onNext={handleNext} onPrev={handlePrev} />}{currentCard.type === 'input' && <InputCard key={currentCard.id} data={currentCard} onNext={handleNext} />}{currentCard.type === 'grammar' && <GrammarCard key={currentCard.id} data={currentCard} onNext={handleNext} />}{currentCard.type === 'structure' && <StructureCard key={currentCard.id} data={currentCard} onNext={handleNext} />}</div></div></div>); };
const SwipeCard = ({ data, onNext, onPrev }) => { const [swiped, setSwiped] = useState(null); const handleSwipe = (dir) => { setSwiped(dir); setTimeout(() => { if (dir === 'left') onPrev(); else onNext(); }, 250); }; return (<div className={`w-full h-full bg-white rounded-3xl shadow-xl border-b-8 border-slate-100 flex flex-col relative transition-all duration-300 ${swiped === 'left' ? '-translate-x-[150%] rotate-[-20deg] opacity-0' : ''} ${swiped === 'right' ? 'translate-x-[150%] rotate-[20deg] opacity-0' : ''}`}><div className="absolute top-4 right-4 z-10"><button onClick={(e) => { e.stopPropagation(); speak(data.es); }} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 text-indigo-600 shadow-sm active:scale-95 transition-all"><Volume2 size={24} /></button></div><div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6"><h2 className="text-5xl md:text-6xl font-black text-slate-800">{data.es}</h2><div className="w-16 h-1 bg-slate-100 rounded-full"></div><div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100"><p className="text-xl md:text-2xl font-bold text-indigo-600">{data.en}</p></div><p className="text-sm text-slate-400 italic">"{data.context}"</p></div><div className="p-6 pb-8 flex justify-center gap-8"><button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-95 transition-all"><RotateCcw size={32} strokeWidth={3} /></button><button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full bg-teal-500 border-b-4 border-teal-700 text-white flex items-center justify-center hover:bg-teal-400 hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-1 transition-all"><Check size={32} strokeWidth={3} /></button></div></div>); };
const InputCard = ({ data, onNext }) => { const [val, setVal] = useState(''); const [status, setStatus] = useState('idle'); const checkAnswer = () => { const isCorrect = data.answer.includes(val.trim().toLowerCase()); setStatus(isCorrect ? 'success' : 'error'); if (isCorrect) { speak("¡Muy bien!"); setTimeout(onNext, 1500); } else { speak("Inténtalo de nuevo"); } }; return (<div className="w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col p-8 md:p-12 justify-center space-y-8 animate-in zoom-in duration-300"><div className="text-center space-y-2"><span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Challenge</span><h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3></div><input type="text" value={val} onChange={(e) => { setVal(e.target.value); setStatus('idle'); }} className={`w-full text-center text-2xl md:text-3xl font-bold p-6 rounded-2xl border-4 outline-none transition-all ${status === 'error' ? 'border-red-400 bg-red-50 text-red-500' : status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-100 focus:border-yellow-400 focus:bg-yellow-50'}`} placeholder="Ta réponse..." /><button onClick={checkAnswer} className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${status === 'success' ? 'bg-green-500' : 'bg-slate-900'}`}>{status === 'success' ? 'Parfait ! 🎉' : 'Vérifier'}</button>{status === 'error' && <p className="text-center text-red-400 font-bold animate-shake">Essaie encore ! Indice : {data.hint}</p>}</div>); };
const GrammarCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500"><div className="bg-indigo-600 p-8 md:p-10 text-white text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.title); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white"><Volume2 size={20} /></button><h3 className="text-3xl md:text-4xl font-black">{data.title}</h3><p className="text-indigo-200 mt-2">{data.description}</p></div><div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-slate-50"><div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">{data.conjugation.map((row, idx) => (<div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0"><span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span><span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span><span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span></div>))}</div><button onClick={onNext} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-yellow-300 active:scale-95 transition-all">J'ai compris</button></div></div>);
const StructureCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 border-b-[12px] border-slate-100"><div className="bg-amber-400 p-8 text-slate-900 text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.example); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-slate-900"><Volume2 size={20} /></button><h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3></div><div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50"><div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center"><p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p><p className="text-slate-500 text-sm">{data.note}</p></div><div className="text-center"><p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p><p className="text-sm text-slate-400 italic">Exemple</p></div><button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-all">C'est noté !</button></div></div>);
const LessonComplete = ({ xp, onHome, onDownload }) => (<div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500"><div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div><div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">Increíble!</h2><p className="text-xl text-yellow-900 font-bold opacity-80">Leçon terminée et sauvegardée.</p></div><div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div><div className="flex flex-col gap-4 w-full max-w-sm"><button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"><Download size={20} /> Télécharger le PDF</button><button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Continuer</button></div></div>);