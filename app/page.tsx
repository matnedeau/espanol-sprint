/* eslint-disable */
// @ts-nocheck
'use client';
import { 
  INITIAL_LESSONS_LIST, 
  INITIAL_LESSONS_CONTENT, 
  SENTENCE_STRUCTURES, 
  generateSmartTest,
  DATA_BANK,
  generateExamContent,
  getDailyReading 
} from './data/content';

// Dans les imports lucide-react, assure-toi d'avoir 'BookOpen' ou ajoute 'BookOpenText'

import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock, LayoutDashboard, Library, AlertCircle, Mail, Bell, Settings, Loader2, CloudUpload, Volume2, Download, Printer, PenTool, Hammer, ArrowRight, RotateCcw, Table, Map, CheckCircle, Star, BrainCircuit, Target
} from 'lucide-react';

// --- IMPORTATION FIREBASE ---
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
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

// Fonction Audio Améliorée (Voix plus naturelles + Fix Chrome)
const speak = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
    window.speechSynthesis.cancel(); // Coupe la parole précédente pour éviter le chevauchement

    const playAudio = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      // On cherche de préférence une voix Google ou Microsoft (souvent de meilleure qualité)
      const esVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Microsoft')) && 
        (v.lang.includes('es-ES') || v.lang.includes('es'))
      ) || voices.find(v => v.lang.includes('es')); // Sinon n'importe quelle voix espagnole

      if (esVoice) utterance.voice = esVoice;
      
      utterance.lang = 'es-ES'; 
      utterance.rate = 0.9; // Vitesse un peu plus naturelle (ni trop lent, ni trop robotique)
      utterance.pitch = 1;  // Tonalité normale
      
      window.speechSynthesis.speak(utterance);
    };

    // Fix pour Chrome : Si les voix ne sont pas encore chargées, on attend qu'elles le soient
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = playAudio;
    } else {
      playAudio();
    }
  }
};
/* --- APPLICATION --- */
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [authError, setAuthError] = useState(""); 
  const [testMode, setTestMode] = useState(null);
  
  const [dynamicLessonsList, setDynamicLessonsList] = useState(INITIAL_LESSONS_LIST);
  const [dynamicLessonsContent, setDynamicLessonsContent] = useState({});

  useEffect(() => {
    const initApp = async (user) => {
      try { await getRedirectResult(auth); } catch (e) { console.error(e); }
      if (user) {
        setCurrentUser(user);
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            const name = user.displayName || user.email.split('@')[0];
            const newProfile = { name, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } };
            await setDoc(userRef, newProfile);
            setUserData(newProfile);
          }
          const roadmapSnap = await getDoc(doc(db, "meta", "roadmap"));
          if (roadmapSnap.exists()) setDynamicLessonsList(roadmapSnap.data().lessons);
          
          const lessonsSnapshot = await getDocs(collection(db, "lessons"));
          const lessonsData = {};
          lessonsSnapshot.forEach((doc) => { lessonsData[doc.id] = doc.data().content; });
          setDynamicLessonsContent({ ...INITIAL_LESSONS_CONTENT, ...lessonsData });
          
          if (Object.keys(lessonsData).length > 0) setDynamicLessonsContent(lessonsData);
          else setDynamicLessonsContent(INITIAL_LESSONS_CONTENT);
          setView('dashboard');
        } catch (error) { console.error(error); }
      } else {
        setCurrentUser(null); setUserData(null); setView('landing');
      }
      setLoading(false);
    };
    const unsubscribe = onAuthStateChanged(auth, initApp);
    return () => unsubscribe();
  }, []);

  const uploadFullContentToCloud = async () => {
    if (!confirm("ADMIN : Initialiser les 100 leçons structurées ?")) return;
    try {
      await setDoc(doc(db, "meta", "roadmap"), { lessons: INITIAL_LESSONS_LIST });
      let count = 0;
      for (const [id, content] of Object.entries(INITIAL_LESSONS_CONTENT)) {
        await setDoc(doc(db, "lessons", id), { content: content });
        count++;
      }
      alert(`✅ ${count} Leçons intelligentes mises à jour !`);
      window.location.reload(); 
    } catch (e) { alert("Erreur: " + e.message); }
  };

  const handleAuth = async (email, password, isSignUp) => {
    setLoading(true); setAuthError("");
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) { setAuthError("Champs vides"); setLoading(false); return; }
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        await setDoc(doc(db, "users", cred.user.uid), { name: cleanEmail.split('@')[0], email: cleanEmail, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } });
      } else { await signInWithEmailAndPassword(auth, cleanEmail, password); }
    } catch (error) { setAuthError(error.message); setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); setAuthError("");
    try { await signInWithPopup(auth, googleProvider); } catch (error) { setAuthError(error.message); setLoading(false); }
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
    setTestMode(null);
    setView('lesson');
  };
 const startTest = (mode) => {
    if (mode === 'levelup') {
      // 1. Identifier le niveau actuel
      const levels = ["A1", "A2", "B1", "B2", "C1"];
      const currentLevelIdx = levels.indexOf(userData.level || "A1");
      const levelName = levels[currentLevelIdx];
      
      // 2. Définir la plage de leçons à réviser (Ex: A1 = leçons 1 à 20)
      const startId = (currentLevelIdx * 20) + 1;
      const endId = (currentLevelIdx + 1) * 20;

      // 3. GÉNÉRER L'EXAMEN À LA VOLÉE
      const examContent = generateExamContent(dynamicLessonsContent, startId, endId, levelName, 9999);

      // 4. Injecter cet examen temporairement
      setDynamicLessonsContent(prev => ({
        ...prev,
        'exam': examContent
      }));

      // 5. Lancer le mode examen
      setTestMode('levelup');
      setActiveLessonId('exam'); 
      setView('lesson');
      
    } else {
      setView('quiz'); // Mode entraînement rapide classique
    }
  };
const handleLessonComplete = async (xp, lessonContent, lessonId, finalScore = 0) => {
    // --- CAS 1 : C'est un EXAMEN DE PASSAGE (Level Up) ---
    if (testMode === 'levelup') {
        const passed = finalScore >= 16;
        setLastExamResult({ score: finalScore, passed });

        if (passed) {
            const levels = ["A1", "A2", "B1", "B2", "C1"];
            const currentIdx = levels.indexOf(userData.level);
            const nextLevel = levels[currentIdx + 1] || "C1";
            
            const startId = (currentIdx * 20) + 1;
            const endId = (currentIdx + 1) * 20;

            let levelItems = [];
            let levelLessonIds = [];

            for (let i = startId; i <= endId; i++) {
                levelLessonIds.push(i);
                const lessonData = dynamicLessonsContent[i];
                if (lessonData) {
                    const items = lessonData.filter(item => 
                        ['swipe', 'grammar', 'structure'].includes(item.type)
                    );
                    levelItems = [...levelItems, ...items];
                }
            }

            const uniqueNewItems = levelItems.filter(item => {
                const isIdPresent = userData.vocab.some(v => v.id === item.id);
                const isContentPresent = userData.vocab.some(v => {
                    if (item.type === 'swipe' && v.type === 'swipe') return v.es === item.es;
                    if (item.type === 'grammar' && v.type === 'grammar') return v.title === item.title;
                    if (item.type === 'structure' && v.type === 'structure') return v.title === item.title;
                    return false;
                });
                return !isIdPresent && !isContentPresent;
            });

            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, { 
                    xp: increment(500),
                    level: nextLevel,
                    vocab: arrayUnion(...uniqueNewItems),
                    completedLessons: arrayUnion(...levelLessonIds)
                });
                
                setUserData(prev => ({ 
                    ...prev, 
                    level: nextLevel, 
                    xp: prev.xp + 500,
                    vocab: [...prev.vocab, ...uniqueNewItems],
                    completedLessons: [...new Set([...prev.completedLessons, ...levelLessonIds])]
                }));
            }
        } 
        setTestMode(null);
        setView('complete');
        return;
    }

    // --- CAS 2 : Leçon normale (CORRIGÉ ET ENRICHI) ---
    // On récupère le contenu intéressant de la leçon actuelle
    const newItems = lessonContent.filter(item => ['swipe', 'grammar', 'structure'].includes(item.type));
    const today = new Date().toDateString();
    
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      
      // FILTRAGE INTELLIGENT (Le même que pour l'examen)
      const uniqueNewItems = newItems.filter(item => {
        // 1. Vérif par ID
        const isIdPresent = userData.vocab.some(v => v.id === item.id);
        
        // 2. Vérif par CONTENU (pour éviter les doublons si l'ID change)
        const isContentPresent = userData.vocab.some(v => {
           // Pour le vocabulaire
           if (item.type === 'swipe' && v.type === 'swipe') return v.es === item.es;
           // Pour la grammaire
           if (item.type === 'grammar' && v.type === 'grammar') return v.title === item.title;
           // Pour les structures (C'était ce qu'il manquait !)
           if (item.type === 'structure' && v.type === 'structure') return v.title === item.title;
           
           return false;
        });
        
        return !isIdPresent && !isContentPresent;
      });

      const isNew = !userData.completedLessons.includes(lessonId);
      const newCount = isNew ? (userData.dailyLimit?.date === today ? userData.dailyLimit.count + 1 : 1) : (userData.dailyLimit?.count || 0);
      
      // Mise à jour de la base de données
      const updateData = {
        xp: increment(xp),
        streak: increment(1),
        vocab: arrayUnion(...uniqueNewItems), // On ajoute les nouveaux éléments filtrés
        completedLessons: arrayUnion(lessonId),
        dailyLimit: { date: today, count: newCount }
      };
      
      await updateDoc(userRef, updateData);
      
      // Mise à jour locale (pour voir les changements tout de suite sans recharger)
      setUserData(prev => ({
        ...prev,
        xp: prev.xp + xp,
        streak: prev.streak + 1,
        vocab: [...prev.vocab, ...uniqueNewItems],
        completedLessons: isNew ? [...prev.completedLessons, lessonId] : prev.completedLessons,
        dailyLimit: { date: today, count: newCount }
      }));
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
           {view === 'auth' && <AuthScreen onAuth={handleAuth} onGoogle={handleGoogleLogin} onBack={() => setView('landing')} error={authError} />}
        </div>
      ) : (
        <>
          <SidebarDesktop userData={userData} currentView={view} onChangeView={setView} onLogout={handleLogout} onUpload={uploadFullContentToCloud} />
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            <MobileHeader userData={userData} />
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              {view === 'dashboard' && userData && <DashboardContent userData={userData} allLessons={dynamicLessonsList} onStartLesson={startLesson} />}
              {view === 'notebook' && userData && <NotebookContent userVocab={userData.vocab} />}
              {view === 'quiz' && <QuizZone onExit={() => setView('dashboard')} userData={userData} />}
              {view === 'structures' && <StructuresContent structures={SENTENCE_STRUCTURES} userVocab={userData?.vocab} />}
              {view === 'tests' && <TestDashboard userData={userData} onStartTest={startTest} />}
              {view === 'reading' && <DailyReadingContent userLevel={userData?.level} />}
              {view === 'profile' && userData && <ProfileContent userData={userData} email={currentUser.email} onLogout={handleLogout} />}
              {view === 'lesson' && dynamicLessonsContent[activeLessonId] && (
  <LessonEngine 
     content={dynamicLessonsContent[activeLessonId]} 
     onComplete={(xp, score) => handleLessonComplete(xp, dynamicLessonsContent[activeLessonId], activeLessonId, score)} 
     onExit={() => setView('dashboard')} 
     isExam={testMode === 'levelup'} // IMPORTANT
  />
)}
              {view === 'complete' && <LessonComplete xp={150} onHome={() => setView('dashboard')} onDownload={() => handlePrintPDF(activeLessonId)} isTest={!!testMode} />}
            </div>
            {view !== 'lesson' && view !== 'complete' && <MobileBottomNav currentView={view} onChangeView={setView} />}
          </main>
        </>
      )}
    </div>
  );
}

/* --- UI COMPONENTS --- */
const TestDashboard = ({ userData, onStartTest }) => { const levels = ["A1", "A2", "B1", "B2", "C1"]; const currentIdx = levels.indexOf(userData.level || "A1"); const nextLevel = levels[currentIdx + 1]; const lessonsDone = userData.completedLessons.length; const canTakeExam = lessonsDone >= (currentIdx + 1) * 20; return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8"><div className="text-center"><h2 className="text-3xl font-black text-slate-900 mb-2">Zone Test 🧠</h2><p className="text-slate-500">Valide tes acquis.</p></div><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group" onClick={() => onStartTest('training')}><div className="flex items-center gap-6"><div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><BrainCircuit size={32} /></div><div className="flex-1"><h3 className="text-xl font-bold text-slate-900">Entraînement Rapide</h3><p className="text-sm text-slate-500 mt-1">Révision intelligente.</p></div><ChevronRight className="text-slate-300" /></div></div><div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all relative overflow-hidden ${!canTakeExam ? 'opacity-60 grayscale' : 'cursor-pointer hover:shadow-md group'}`} onClick={() => canTakeExam && onStartTest('levelup')}><div className="flex items-center gap-6"><div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:rotate-6 transition-transform"><Target size={32} /></div><div className="flex-1"><h3 className="text-xl font-bold text-slate-900">Examen {nextLevel}</h3><p className="text-sm text-slate-500 mt-1">Passage de niveau.</p></div>{canTakeExam ? <ChevronRight className="text-slate-300" /> : <Lock className="text-slate-300" />}</div>{!canTakeExam && <div className="absolute bottom-2 right-4 text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded">Finis le niveau d'abord</div>}</div></div>); };
const DashboardContent = ({ userData, allLessons, onStartLesson }) => { 
  const levels = ["A1", "A2", "B1", "B2", "C1"]; 
  const safeLevel = (userData.level && levels.includes(userData.level)) ? userData.level : "A1"; 
  const currentLevelIndex = levels.indexOf(safeLevel); 
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Ton Parcours</h2>
        <p className="text-slate-500">Niveau actuel : <span className="text-indigo-600 font-bold">{safeLevel}</span></p>
      </div>
      
      {/* Container horizontal des niveaux */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 pb-10 snap-x snap-mandatory flex gap-6 md:gap-8">
        {levels.map((level, index) => { 
          const isLocked = index > currentLevelIndex; 
          const isCurrent = index === currentLevelIndex; 
          const isCompleted = index < currentLevelIndex; 
          const levelLessons = allLessons.filter(l => l.level === level); 
          
          return (
            <div key={level} className={`snap-center shrink-0 w-[320px] md:w-[380px] h-full flex flex-col rounded-3xl border-4 ${isCurrent ? 'border-yellow-400 bg-white' : isCompleted ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 opacity-60'} p-5 md:p-6 relative overflow-hidden transition-all`}>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Niveau {level}</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{isCompleted ? 'Terminé' : isCurrent ? 'En cours' : 'Verrouillé'}</p>
                </div>
                {isLocked && <Lock size={24} className="text-slate-400" />}
                {isCompleted && <div className="bg-green-500 text-white p-1 rounded-full"><Check size={16} /></div>}
              </div>

              {/* Liste des leçons avec scrollbar améliorée */}
              <div className="flex-1 overflow-y-auto space-y-3 pb-16 pr-2 custom-scrollbar">
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
                    <button key={lesson.id} disabled={!isAccessible} onClick={() => onStartLesson(lesson.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all ${isLessonDone ? 'bg-green-500 text-white shadow-md' : isAccessible ? 'bg-yellow-400 text-slate-900 shadow-lg scale-[1.02] font-bold ring-4 ring-yellow-100' : 'bg-slate-200 text-slate-400'}`}>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0">
                        {isLessonDone ? <Check size={16} /> : lesson.id}
                      </div>
                      <div className="flex-1 min-w-0"> {/* min-w-0 permet au truncate de marcher dans un flex */}
                        <p className="text-sm truncate">{lesson.title}</p>
                      </div>
                      {isAccessible && !isLessonDone && <PlayCircle size={20} className="shrink-0" />}
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
        <div className="w-2 shrink-0"></div>
      </div>
    </div>
  ); 
};
const StructuresContent = ({ structures, userVocab }) => {
  // 1. Récupérer les structures apprises du profil utilisateur
  // On sécurise l'accès à userVocab comme on l'a fait pour le lexique
  const safeList = Array.isArray(userVocab) ? userVocab : [];
  const learnedStructures = safeList.filter(item => item && item.type === 'structure');

  // 2. Fusionner avec les structures de base
  const allStructures = [...structures, ...learnedStructures];

  // 3. Dédoublonnage (pour éviter d'avoir 2 fois la même si elle est dans la base et apprise)
  const uniqueStructures = allStructures.filter((item, index, self) =>
    index === self.findIndex((t) => t.title === item.title)
  );

  return (
    <div className="max-w-3xl mx-auto w-full p-6 pb-24">
      <h2 className="text-3xl font-black text-slate-900 mb-8">Structures de Phrases 🏗️</h2>
      
      <div className="space-y-6">
        {uniqueStructures.map((struct, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
                <Hammer size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{struct.title}</h3>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-indigo-600 font-bold mb-4 text-center border border-slate-100">
              {struct.formula}
            </div>
            
            <div className="space-y-2 mb-4">
              {/* Gestion des deux formats de données (Base vs Leçons) */}
              {struct.example_es ? (
                /* Format Base de données */
                <>
                  <p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example_es}</p>
                  <p className="text-sm text-slate-400">🇫🇷 {struct.example_en}</p>
                </>
              ) : (
                /* Format Leçons (souvent juste 'example' et 'note') */
                <>
                  <p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example}</p>
                  {/* On n'a pas toujours la trad exacte ici, parfois dans la note */}
                </>
              )}
            </div>
            
            <p className="text-sm text-slate-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
              💡 {struct.explanation || struct.note}
            </p>
          </div>
        ))}

        {uniqueStructures.length === 0 && (
            <div className="text-center text-slate-400 py-10">
                <p>Aucune structure découverte pour le moment.</p>
                <p className="text-sm">Avance dans les leçons pour en débloquer !</p>
            </div>
        )}
      </div>
    </div>
  );
};
const NotebookContent = ({ userVocab, userData}) => {
  // 1. On sécurise la source
  const sourceList = Array.isArray(userVocab) ? userVocab : [];
 // 2. LISTE NOIRE COMPLÈTE & DÉFINITIVE
  const verbBlocklist = new Set([
    // Import automatique depuis la banque de données
    ...(DATA_BANK.verbs ? DATA_BANK.verbs.map(v => v.es) : []), 
    
    // --- Irréguliers & Classiques ---
    "Ir", "Ser", "Estar", "Tener", "Haber", "Hacer", "Poder", "Querer", 
    "Decir", "Ver", "Dar", "Saber", "Salir", "Poner", "Venir", "Llegar",
    
    // --- Verbes fréquents ---
    "Hablar", "Comer", "Vivir", "Beber", "Bailar", "Escuchar", 
    "Estudiar", "Trabajar", "Jugar", "Dormir", "Caminar", "Correr",
    "Leer", "Escribir", "Mirar", "Amar", "Viajar", "Comprar", "Reír",
    "Aprender", "Abrir", "Cerrar",

    // --- Verbes trouvés dans les leçons manuelles (anciens + nouveaux) ---
    "Pagar", "Enviar", "Celebrar", "Dudar", "Reciclar", "Descargar", 
    "Votar", "Pintar", "Rezar", "Contratar", "Despedir", "Persuadir","Quedar", "Deber", "Necesitar" 
  ]);

  const vocabItems = sourceList.filter(item => {
      if (!item || !item.es) return false;

      // FILTRE 1 : Si le contexte contient "verbe" (ex: "Verbe régulier")
      const contextSafe = item.context ? item.context.toLowerCase() : "";
      if (contextSafe.includes('verbe')) return false;

      // FILTRE 2 : Si le mot espagnol est dans notre liste noire
      if (verbBlocklist.has(item.es)) return false;

      return true;
    })
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.es === item.es)
    );

  // Pour la grammaire, on garde tout ce qui est étiqueté "grammar"
  const grammarItems = sourceList
    .filter(c => c && c.type === 'grammar')
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.title === item.title)
    );

  const [showReference, setShowReference] = useState(false);
  
  const REFERENCE_VERBS = [
    { title: "Verbes en -AR", endings: ["-o", "-as", "-a", "-amos", "-an"], ex: "Hablar" },
    { title: "Verbes en -ER", endings: ["-o", "-es", "-e", "-emos", "-en"], ex: "Comer" },
    { title: "Verbes en -IR", endings: ["-o", "-es", "-e", "-imos", "-en"], ex: "Vivir" }
  ];

  const count = vocabItems.length + grammarItems.length;

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900">Lexique</h2>
        <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">
          {count} Éléments
        </div>
      </div>
      
      <div className="mb-8">
        <button onClick={() => setShowReference(!showReference)} className="w-full p-4 bg-yellow-100 text-yellow-800 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-200 transition-colors">
          <Table size={20} /> {showReference ? "Masquer" : "Voir les terminaisons"}
        </button>
        {showReference && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
            {REFERENCE_VERBS.map((v, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm">
                <h4 className="font-bold text-center mb-2 text-indigo-600">{v.title}</h4>
                <p className="text-xs text-center text-gray-400 italic mb-2">{v.ex}</p>
                <div className="space-y-1 text-sm text-center">{v.endings.map(e => <div key={e} className="bg-slate-50 py-1 rounded">{e}</div>)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <Edit3 size={18} /> Vocabulaire Acquis
          </h3>
          {vocabItems.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[500px] overflow-y-auto">
              {vocabItems.map((item, idx) => (
                <div key={`vocab-${idx}`} className="p-4 flex justify-between items-center border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <div>
                    <p className="font-bold text-slate-800">{item.es}</p>
                    <p className="text-xs text-slate-400 italic mt-0.5">{item.context}</p>
                  </div>
                  <span className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">{item.en}</span>
                </div>
              ))}
            </div>
          ) : <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-xl">Vide</div>}
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <BookOpen size={18} /> Grammaire Apprise
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {grammarItems.map((item, index) => (
              <div key={`gram-${index}`} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-indigo-600 mb-2">{item.title}</h4>
                <div className="bg-slate-50 rounded-xl overflow-hidden text-sm border border-slate-100">
                  {item.conjugation && item.conjugation.map((row, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <span className="text-slate-400 w-16 sm:w-20 shrink-0">{row.pronoun}</span>
                      <span className="font-bold text-slate-800 flex-1 text-center">{row.verb}</span>
                      <span className="text-slate-400 text-xs w-20 sm:w-auto text-right italic shrink-0">{row.fr}</span>
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
const LandingPage = ({ onStart }) => (<div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center"><div className="z-10 space-y-8 max-w-md"><div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div><div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div><button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button></div></div>);
const AuthScreen = ({ onAuth, onGoogle, onBack, error }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}<div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (<div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6"><div className="flex items-center gap-2 mb-12 px-2"><div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md rotate-3"><span className="text-2xl">🇪🇸</span></div><h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Español<span className="text-red-600">Sprint</span></h1></div><nav className="flex-1 space-y-2"><SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><SidebarLink icon={BrainCircuit} label="Zone Test" active={currentView === 'tests'} onClick={() => onChangeView('tests')} /><SidebarLink icon={Hammer} label="Structures" active={currentView === 'structures'} onClick={() => onChangeView('structures')} /><SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></nav><button onClick={onUpload} className="mb-4 flex items-center gap-2 text-xs text-slate-300 hover:text-indigo-500 px-4 transition-colors"><CloudUpload size={14} /> Initialiser Leçons</button><div className="mt-auto pt-6 border-t border-slate-100"><div className="flex items-center gap-3 mb-6 px-2"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{userData?.name?.charAt(0).toUpperCase()}</div><div className="flex-1"><p className="text-sm font-bold text-slate-900 truncate w-24">{userData?.name}</p><p className="text-xs text-slate-400">Niveau {userData?.level}</p></div><div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full"><Flame size={14} className="text-orange-500 fill-orange-500" /><span className="text-xs font-bold text-orange-600">{userData?.streak}</span></div></div></div></div>);
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const MobileHeader = ({ userData }) => (<div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div></div><div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div></div>);
const MobileBottomNav = ({ currentView, onChangeView }) => (<div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30"><NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><NavBtn icon={BrainCircuit} label="Tests" active={currentView === 'tests'} onClick={() => onChangeView('tests')} /><NavBtn icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></div>);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const ProfileContent = ({ userData, email, onLogout }) => (<div className="max-w-2xl mx-auto w-full p-6 md:p-12 space-y-8"><h2 className="text-3xl font-black text-slate-900">Mon Compte</h2><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">{userData?.name?.charAt(0).toUpperCase()}</div><div><p className="font-bold text-slate-900 text-lg">{userData?.name}</p><p className="text-slate-400 text-sm">{email}</p></div></div><div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-slate-100"><div><p className="text-2xl font-black text-slate-900">{userData?.xp}</p><p className="text-xs text-slate-400 uppercase font-bold">XP Total</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.streak}</p><p className="text-xs text-slate-400 uppercase font-bold">Série</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.level}</p><p className="text-xs text-slate-400 uppercase font-bold">Niveau</p></div></div><button onClick={onLogout} className="w-full text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"><LogOut size={20} /> Se déconnecter</button></div></div>);
const LessonEngine = ({ content, onComplete, onExit, isExam }) => { 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [progress, setProgress] = useState(0); 
  const [score, setScore] = useState(0); // Compteur de points

  const currentCard = content[currentIndex]; 

  const handleNext = () => { 
    if (currentIndex + 1 >= content.length) { 
      setProgress(100); 
      // On envoie le score final à la fonction de complétion !
      setTimeout(() => onComplete(150, score), 500); 
    } else { 
      setProgress(((currentIndex + 1) / content.length) * 100); 
      setCurrentIndex(prev => prev + 1); 
    } 
  }; 

  const handleScore = (correct) => {
    if (correct) setScore(s => s + 1);
  };

  const handlePrev = () => { 
    if (currentIndex > 0) { 
      setCurrentIndex(prev => prev - 1); 
      setProgress(((currentIndex - 1) / content.length) * 100); 
    } 
  }; 

  useEffect(() => { if (currentIndex === 0 && currentCard?.es) speak(currentCard.es); }, [currentIndex]); 

  return (
    <div className="h-full w-full flex flex-col bg-slate-50">
      <div className="px-6 py-4 md:py-6 flex items-center gap-6 bg-white border-b border-slate-100 z-10">
        <button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
        <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        {/* Affichage du score en mode examen */}
        {isExam && <div className="font-black text-indigo-600">{score} / 20</div>}
      </div>
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-md aspect-[3/4] md:aspect-auto md:h-[600px] perspective-1000">
          {currentCard.type === 'swipe' && <SwipeCard key={currentCard.id} data={currentCard} onNext={handleNext} onPrev={handlePrev} />}
          {currentCard.type === 'input' && <InputCard key={currentCard.id} data={currentCard} onNext={handleNext} isExam={isExam} onScore={handleScore} />}
          {currentCard.type === 'grammar' && <GrammarCard key={currentCard.id} data={currentCard} onNext={handleNext} />}
          {currentCard.type === 'structure' && <StructureCard key={currentCard.id} data={currentCard} onNext={handleNext} />}
        </div>
      </div>
    </div>
  ); 
};
const SwipeCard = ({ data, onNext, onPrev }) => {
  const [swiped, setSwiped] = useState(null);

  const handleSwipe = (dir) => {
    setSwiped(dir);
    setTimeout(() => {
      if (dir === 'left') onPrev();
      else onNext();
    }, 250);
  };

  // --- AJOUT : Support Clavier ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Flèche Gauche = Revoir (Rouge)
      if (e.key === "ArrowLeft") handleSwipe('left');
      // Flèche Droite = Connu (Vert)
      if (e.key === "ArrowRight") handleSwipe('right');
      // Espace ou Entrée = Réécouter le son
      if (e.key === " " || e.key === "Enter") {
         e.preventDefault(); // Empêche le scroll de la page avec Espace
         speak(data.es);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Nettoyage de l'écouteur quand on change de carte
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data]); // Se déclenche à chaque nouvelle carte (data)
  // -------------------------------

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
        <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
          <p className="text-xl md:text-2xl font-bold text-indigo-600">{data.en}</p>
        </div>
        <p className="text-sm text-slate-400 italic">"{data.context}"</p>
      </div>
      <div className="p-6 pb-8 flex justify-center gap-8">
        <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-95 transition-all">
          <RotateCcw size={32} strokeWidth={3} />
        </button>
        <button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full bg-teal-500 border-b-4 border-teal-700 text-white flex items-center justify-center hover:bg-teal-400 hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-1 transition-all">
          <Check size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
const InputCard = ({ data, onNext, isExam, onScore }) => { 
  const [val, setVal] = useState(''); 
  const [status, setStatus] = useState('idle'); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null); // Référence pour garder le focus

  // Fonction pour ajouter un accent
  const addChar = (char) => {
    if (isSubmitted) return;
    setVal(prev => prev + char);
    inputRef.current?.focus();
  };

  const checkAnswer = (e) => { 
    if (e) e.preventDefault(); // Empêche le rechargement si c'est un formulaire
    if (isSubmitted) return;

    const userClean = val.trim().toLowerCase().replace(/[¿¡!.,]/g, '');
    const answers = Array.isArray(data.answer) ? data.answer : [data.answer];
    // Vérification souple
    const isCorrect = answers.some(a => a.toLowerCase().includes(userClean) || userClean === a.toLowerCase());
    
    setStatus(isCorrect ? 'success' : 'error'); 
    
    if (isExam) {
      // --- MODE EXAMEN ---
      setIsSubmitted(true);
      if (onScore) onScore(isCorrect); // On compte les points
      
      speak(isCorrect ? "¡Muy bien!" : "Incorrecto");
      
      // On affiche la correction (vert/rouge) pendant 2.5s puis ON PASSE À LA SUITE
      // même si c'est faux !
      setTimeout(() => {
        onNext();
      }, 2500); 

    } else {
      // --- MODE LEÇON (Entraînement) ---
      // Ici on bloque tant que ce n'est pas juste pour l'apprentissage
      if (isCorrect) { 
        speak("¡Muy bien!"); 
        setTimeout(onNext, 1500); 
      } else { 
        speak("Inténtalo de nuevo"); 
      } 
    }
  }; 

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col p-8 md:p-12 justify-center space-y-6 animate-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isExam ? "Question d'Examen" : "Challenge"}
        </span>
        <h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3>
      </div>
      
      {/* BARRE D'ACCENTS (Nouveauté) */}
      <div className="flex gap-2 justify-center flex-wrap">
        {['á','é','í','ó','ú','ñ','¿','¡'].map(char => (
          <button 
            key={char} 
            type="button" 
            onClick={() => addChar(char)} 
            disabled={isSubmitted}
            className="w-10 h-10 bg-white border-2 border-slate-200 shadow-sm hover:border-indigo-400 hover:text-indigo-600 text-slate-700 font-bold rounded-xl transition-all text-lg active:scale-95 disabled:opacity-50"
          >
            {char}
          </button>
        ))}
      </div>

      <form onSubmit={checkAnswer} className="w-full space-y-6">
        <input 
          ref={inputRef}
          type="text" 
          value={val} 
          onChange={(e) => { if(!isSubmitted) { setVal(e.target.value); setStatus('idle'); } }} 
          disabled={isSubmitted}
          className={`w-full text-center text-2xl md:text-3xl font-bold p-6 rounded-2xl border-4 outline-none transition-all ${status === 'error' ? 'border-red-400 bg-red-50 text-red-500' : status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-100 focus:border-yellow-400 focus:bg-yellow-50'}`} 
          placeholder="Ta réponse..." 
          autoComplete="off"
        />
        
        <button 
          type="submit"
          disabled={isSubmitted || !val.trim()}
          className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-slate-900 disabled:bg-slate-300'}`}
        >
          {status === 'success' ? 'Validé !' : status === 'error' ? 'Suivant...' : 'Vérifier'}
        </button>
      </form>
      
      {/* Afficher la correction en mode examen si erreur */}
      {status === 'error' && isExam && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-2">
          <p className="text-red-400 font-bold">Dommage !</p>
          <p className="text-slate-600 text-sm">La réponse était : <span className="font-bold">{Array.isArray(data.answer) ? data.answer[0] : data.answer}</span></p>
        </div>
      )}
      
      {/* En leçon, on donne juste un indice */}
      {status === 'error' && !isExam && (
        <p className="text-center text-red-400 font-bold animate-shake">Indice : {data.hint}</p>
      )}
    </div>
  ); 
};
const GrammarCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500"><div className="bg-indigo-600 p-8 md:p-10 text-white text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.title); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white"><Volume2 size={20} /></button><h3 className="text-3xl md:text-4xl font-black">{data.title}</h3><p className="text-indigo-200 mt-2">{data.description}</p></div><div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-slate-50"><div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">{data.conjugation.map((row, idx) => (<div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0"><span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span><span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span><span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span></div>))}</div><button onClick={onNext} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-yellow-300 active:scale-95 transition-all">J'ai compris</button></div></div>);
const StructureCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 border-b-[12px] border-slate-100"><div className="bg-amber-400 p-8 text-slate-900 text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.example); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-slate-900"><Volume2 size={20} /></button><h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3></div><div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50"><div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center"><p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p><p className="text-slate-500 text-sm">{data.note}</p></div><div className="text-center"><p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p><p className="text-sm text-slate-400 italic">Exemple</p></div><button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-all">C'est noté !</button></div></div>);
const LessonComplete = ({ xp, onHome, onDownload, isTest }) => (<div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500"><div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div><div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">{isTest ? "Examen Réussi !" : "Increíble!"}</h2><p className="text-xl text-yellow-900 font-bold opacity-80">{isTest ? "Niveau Validé" : "Leçon terminée et sauvegardée."}</p></div><div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div><div className="flex flex-col gap-4 w-full max-w-sm"><button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"><Download size={20} /> Télécharger le PDF</button><button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Continuer</button></div></div>);
const DailyReadingContent = ({ userLevel }) => { // Ajout de la prop userLevel
  // On passe le niveau à la fonction de récupération
  const reading = getDailyReading(userLevel); 
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8">
      <div className="text-center">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Lecture du jour
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-2">{reading.title_es}</h2>
        
        {/* Affichage dynamique de la difficulté */}
        <div className="flex justify-center gap-2 mt-2">
            <span className="text-slate-400 italic text-sm">{reading.difficulty}</span>
            {/* Petit badge pour confirmer que c'est adapté */}
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">Adapté à ton niveau</span>
        </div>
      </div>

      {/* Carte Espagnol */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">
          Español
        </div>
        <button 
          onClick={() => speak(reading.text_es)}
          className="absolute top-6 right-6 p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
          title="Écouter le texte"
        >
          <Volume2 size={20} />
        </button>
        <p className="text-xl text-slate-800 leading-relaxed font-medium mt-4">
          {reading.text_es}
        </p>
      </div>

      {/* Bouton Toggle */}
      <div className="flex justify-center">
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
        >
          {showTranslation ? <div className="flex items-center gap-2"><X size={16}/> Masquer la traduction</div> : <div className="flex items-center gap-2"><Check size={16}/> Voir la traduction</div>}
        </button>
      </div>

      {/* Carte Français (Révélée) */}
      {showTranslation && (
        <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
           <h3 className="text-slate-400 font-bold text-sm uppercase mb-2 tracking-wider">Français</h3>
           <h4 className="text-lg font-bold text-slate-700 mb-2">{reading.title_fr}</h4>
           <p className="text-slate-600 leading-relaxed">
            {reading.text_fr}
          </p>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
            <BrainCircuit size={20} />
        </div>
        <div>
            <p className="font-bold text-blue-800 text-sm">Conseil du coach</p>
            <p className="text-blue-600 text-xs mt-1">Lis le texte à haute voix 3 fois. La première fois pour déchiffrer, la deuxième pour comprendre, la troisième pour l'intonation.</p>
        </div>
      </div>
    </div>
  );
};

const QuizZone = ({ onExit, userData }) => {
  const [questions, setQuestions] = useState([]);
  // ... (Garde tes états currentIdx, score, etc. inchangés) ...
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [finished, setFinished] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    import('./data/quizengine').then(module => {
       // MODIFICATION ICI : On passe "userData.completedLessons" au moteur
       // On utilise aussi userData.vocab si tu veux mélanger, mais ici on se base sur les leçons finies
       const completedIds = userData?.completedLessons || [];
       
       const generated = module.generateSuperQuiz(INITIAL_LESSONS_CONTENT, completedIds);
       setQuestions(generated);
    });
  }, [userData]); // On ajoute userData en dépendance

  // Focus auto sur l'input
  useEffect(() => {
    if (questions[currentIdx]?.type === 'input' && !feedback) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIdx, questions, feedback]);

  if (questions.length === 0) return <div className="p-10 text-center flex items-center justify-center h-full"><Loader2 className="animate-spin mr-2"/> Chargement...</div>;

  const currentQ = questions[currentIdx];

  // --- LOGIQUE ---

  const handleNext = () => {
    setFeedback(null);
    setInputValue("");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(p => p + 1);
    } else {
      setFinished(true);
    }
  };

  const validateAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }
    setTimeout(handleNext, 1500);
  };

  const handleOptionClick = (opt) => {
    validateAnswer(opt === currentQ.correctAnswer);
  };

  const handleInputSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    const userClean = inputValue.trim().toLowerCase();
    const correctClean = currentQ.correctAnswer.trim().toLowerCase();
    validateAnswer(userClean === correctClean);
  };

  const addChar = (char) => {
    setInputValue(prev => prev + char);
    inputRef.current?.focus();
  };

  // --- ÉCRAN DE FIN ---
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
        <button onClick={onExit} className="w-full max-w-xs bg-slate-900 text-white py-4 rounded-xl font-bold hover:scale-105 transition-all">
          Retour au menu
        </button>
      </div>
    );
  }

  // --- ÉCRAN DE JEU ---
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Barre du haut */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
        <div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} />
        </div>
        <div className="font-black text-indigo-600">{score} pts</div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 text-center mb-2">
          {currentQ.question}
        </h2>
        
        {currentQ.type === 'input' && (
          <p className="text-slate-400 text-sm mb-8 italic">Indice : {currentQ.hint}</p>
        )}

        {/* Feedback */}
        {feedback === 'correct' && <div className="mb-6 px-6 py-2 bg-green-100 text-green-700 rounded-full font-bold animate-bounce">✨ Correct !</div>}
        {feedback === 'wrong' && <div className="mb-6 px-6 py-2 bg-red-100 text-red-700 rounded-full font-bold animate-shake text-center">❌ Raté !<br/><span className="text-sm font-normal text-slate-600">Réponse : {currentQ.correctAnswer}</span></div>}

        {/* MODE QCM */}
        {currentQ.type === 'qcm' && !feedback && (
          <div className="grid grid-cols-1 w-full gap-3 mt-4">
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => handleOptionClick(opt)} className="w-full p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 font-bold text-slate-700 transition-all text-lg shadow-sm active:scale-95">
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* MODE SAISIE */}
        {currentQ.type === 'input' && !feedback && (
          <form onSubmit={handleInputSubmit} className="w-full mt-4">
            <div className="flex gap-2 justify-center mb-4">
              {['á','é','í','ó','ú','ñ','¿','¡'].map(char => (
                <button key={char} type="button" onClick={() => addChar(char)} className="w-10 h-10 bg-white border border-slate-200 shadow-sm hover:bg-indigo-50 text-slate-700 font-bold rounded-lg transition-colors text-lg">{char}</button>
              ))}
            </div>
            <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Écris ta réponse..." className="w-full p-5 rounded-2xl border-2 border-slate-300 text-center text-xl font-bold text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
            <button type="submit" className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all active:scale-95 ${inputValue ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-300 cursor-not-allowed'}`} disabled={!inputValue}>Valider</button>
          </form>
        )}
      </div>
    </div>
  );
};