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
      const levels = ["A1", "A2", "B1", "B2", "C1"];
      const currentLevelIdx = levels.indexOf(userData.level || "A1");
      const levelName = levels[currentLevelIdx];
      
      const startId = (currentLevelIdx * 20) + 1;
      const endId = (currentLevelIdx + 1) * 20;

      const examContent = generateExamContent(dynamicLessonsContent, startId, endId, levelName, 9999);

      setDynamicLessonsContent(prev => ({
        ...prev,
        'exam': examContent
      }));

      setTestMode('levelup');
      setActiveLessonId('exam'); 
      setView('lesson');
      
    } else {
      setView('quiz'); 
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

    // --- CAS 2 : Leçon normale (AVEC SRS) ---
    // On récupère le contenu intéressant de la leçon actuelle
    const newItems = lessonContent.filter(item => ['swipe', 'grammar', 'structure'].includes(item.type));
    
    // [SRS-START] Ajout des métadonnées SRS par défaut
    const enrichedItems = newItems.map(item => ({
        ...item,
        grade: 0,        // Score de rétention initial
        interval: 1,     // Intervalle de révision initial en jours
        lastReview: new Date().toISOString()
    }));
    // [SRS-END]

    const today = new Date().toDateString();
    
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      
      // FILTRAGE INTELLIGENT
      const uniqueNewItems = enrichedItems.filter(item => {
        // 1. Vérif par ID
        const isIdPresent = userData.vocab.some(v => v.id === item.id);
        
        // 2. Vérif par CONTENU
        const isContentPresent = userData.vocab.some(v => {
           if (item.type === 'swipe' && v.type === 'swipe') return v.es === item.es;
           if (item.type === 'grammar' && v.type === 'grammar') return v.title === item.title;
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
        vocab: arrayUnion(...uniqueNewItems), // On utilise les éléments enrichis SRS
        completedLessons: arrayUnion(lessonId),
        dailyLimit: { date: today, count: newCount }
      };
      
      await updateDoc(userRef, updateData);
      
      // Mise à jour locale
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
  const handlePrintPDF = async (lessonId) => {
    const content = dynamicLessonsContent[lessonId];
    if(!content) return;

    let html2pdf;
    try {
        html2pdf = (await import('html2pdf.js')).default;
    } catch (e) {
        alert("Erreur : La librairie 'html2pdf.js' n'est pas installée.");
        return;
    }

    const vocab = content.filter(c => c.type === 'swipe');
    const grammar = content.filter(c => c.type === 'grammar');
    const structures = content.filter(c => c.type === 'structure');

    const element = document.createElement('div');
    
    element.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        
        .pdf-container {
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            background-color: white;
            padding: 20px;
            width: 100%;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 4px solid #facc15;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .logo { font-size: 24px; font-weight: 900; color: #0f172a; }
        .logo span { color: #dc2626; }
        
        .title-box { text-align: right; }
        h1 { font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 1px; color: #64748b; }
        .lesson-id { font-size: 32px; font-weight: 900; color: #4f46e5; line-height: 1; }

        h2 {
            font-size: 16px; color: #4f46e5; text-transform: uppercase;
            border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;
            margin-top: 25px; margin-bottom: 15px;
            page-break-after: avoid;
        }

        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        
        .card {
            background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #facc15;
            border-radius: 8px; padding: 12px; 
            page-break-inside: avoid;
        }
        
        .es { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .fr { font-size: 14px; color: #64748b; font-weight: 600; }
        .context { font-size: 11px; color: #94a3b8; font-style: italic; margin-top: 6px; }

        .grammar-box {
            background: #eef2ff; border: 2px solid #c7d2fe; border-radius: 12px;
            padding: 15px; margin-bottom: 15px; 
            page-break-inside: avoid;
        }
        .grammar-title { color: #3730a3; font-weight: 800; margin-bottom: 8px; font-size: 16px; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 5px; }
        td { padding: 6px; border-bottom: 1px solid #cbd5e1; font-size: 13px; }
        td:first-child { color: #64748b; width: 30%; }
        td:nth-child(2) { font-weight: 800; color: #1e293b; }
        
        .structure-box {
            background: #fff; border: 2px dashed #94a3b8; border-radius: 12px;
            padding: 15px; margin-bottom: 15px; text-align: center; 
            page-break-inside: avoid;
        }
        .formula { font-family: monospace; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; color: #dc2626; font-weight: bold; font-size: 13px; }

        .footer {
            margin-top: 40px; text-align: center; font-size: 10px; color: #cbd5e1;
            text-transform: uppercase; letter-spacing: 2px;
        }
      </style>

      <div class="pdf-container">
        <div class="header">
          <div class="logo">Español<span>Sprint</span></div>
          <div class="title-box">
            <h1>Fiche de révision</h1>
            <div class="lesson-id">#${lessonId}</div>
          </div>
        </div>

        ${vocab.length > 0 ? `
          <h2>📚 Vocabulaire</h2>
          <div class="grid">
            ${vocab.map(v => `
              <div class="card">
                <div class="es">${v.es}</div>
                <div class="fr">${v.en}</div>
                ${v.sentence ? `<div class="context">"${v.sentence}"</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${grammar.length > 0 ? `
          <h2>🧠 Grammaire</h2>
          ${grammar.map(g => `
            <div class="grammar-box">
              <div class="grammar-title">${g.title}</div>
              <p style="margin:0; color:#4338ca; font-size:13px;">${g.description}</p>
              <table>
                ${g.conjugation.map(row => `
                  <tr>
                    <td>${row.pronoun}</td>
                    <td>${row.verb}</td>
                    <td style="text-align:right; font-style:italic; color:#94a3b8;">${row.fr}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          `).join('')}
        ` : ''}

        ${structures.length > 0 ? `
          <h2>🏗️ Structures Clés</h2>
          ${structures.map(s => `
            <div class="structure-box">
              <div style="font-weight:800; margin-bottom:5px;">${s.title}</div>
              <span class="formula">${s.formula}</span>
              <p style="margin-top:8px; font-size:13px;">Ex: <strong>${s.example}</strong></p>
              <div style="font-size:11px; color:#64748b; margin-top:4px;">💡 ${s.note}</div>
            </div>
          `).join('')}
        ` : ''}

        <div class="footer">
          Généré par EspañolSprint • Apprends vite, parle mieux.
        </div>
      </div>
    `;

    const opt = {
      margin:       10,
      filename:     `Lecon-${lessonId}-EspanolSprint.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, 
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
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
              {view === 'dashboard' && userData && <DashboardContent userData={userData} allLessons={dynamicLessonsList} onStartLesson={startLesson} onDownloadPDF={handlePrintPDF}/>}
              {view === 'notebook' && userData && <NotebookContent userVocab={userData.vocab} />}
              {view === 'quiz' && (
                <QuizZone 
                  onExit={() => setView('dashboard')} 
                  userData={userData} // on passe tout le userData ici (IMPORTANT pour SRS)
                  lessonsContent={dynamicLessonsContent}
                />
              )}
              {view === 'structures' && <StructuresContent structures={SENTENCE_STRUCTURES} userVocab={userData?.vocab} />}
              {view === 'tests' && <TestDashboard userData={userData} onStartTest={startTest} />}
              {view === 'reading' && <DailyReadingContent userLevel={userData?.level} />}
              {view === 'profile' && userData && (
  <ProfileContent 
    userData={userData} 
    email={currentUser.email} 
    onLogout={handleLogout} 
    onUpload={uploadFullContentToCloud} 
  />
)}
              {view === 'lesson' && dynamicLessonsContent[activeLessonId] && (
  <LessonEngine 
     content={dynamicLessonsContent[activeLessonId]} 
     onComplete={(xp, score) => handleLessonComplete(xp, dynamicLessonsContent[activeLessonId], activeLessonId, score)} 
     onExit={() => setView('dashboard')} 
     isExam={testMode === 'levelup'} 
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
const DashboardContent = ({ userData, allLessons, onStartLesson, onDownloadPDF }) => { 
  const levels = ["A1", "A2", "B1", "B2", "C1"]; 
  const safeLevel = (userData.level && levels.includes(userData.level)) ? userData.level : "A1"; 
  const currentLevelIndex = levels.indexOf(safeLevel); 
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 md:p-8 shrink-0">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Ton Parcours</h2>
        <p className="text-slate-500">Niveau actuel : <span className="text-indigo-600 font-bold">{safeLevel}</span></p>
      </div>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 pb-6 snap-x snap-mandatory flex gap-6 md:gap-10 items-start">
        {levels.map((level, index) => { 
          const isLocked = index > currentLevelIndex; 
          const isCurrent = index === currentLevelIndex; 
          const isCompleted = index < currentLevelIndex; 
          const levelLessons = allLessons.filter(l => l.level === level); 
          
          return (
            <div 
              key={level} 
              className={`
                snap-center shrink-0 
                w-[85vw] md:w-[380px]
                h-[calc(100dvh-240px)] md:h-[calc(100vh-200px)]
                flex flex-col 
                rounded-3xl border-4 
                ${isCurrent ? 'border-yellow-400 bg-white' : isCompleted ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 opacity-60'} 
                p-5 md:p-6 relative overflow-hidden transition-all shadow-sm
              `}
            >
              
              <div className="flex justify-between items-center mb-5 shrink-0">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Niveau {level}</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{isCompleted ? 'Terminé' : isCurrent ? 'En cours' : 'Verrouillé'}</p>
                </div>
                {isLocked && <Lock size={24} className="text-slate-400" />}
                {isCompleted && <div className="bg-green-500 text-white p-1.5 rounded-full"><Check size={18} /></div>}
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pb-4 pr-2 custom-scrollbar">
                {levelLessons.map((lesson) => { 
                  const isLessonDone = userData.completedLessons.includes(lesson.id); 
                  const isAccessible = isCurrent && (isLessonDone || userData.completedLessons.includes(lesson.id - 1) || lesson.id === levelLessons[0].id); 
                  
                  if (isCompleted) { 
                    return (
                      <div key={lesson.id} className="w-full flex gap-2 group">
                         <button 
                            onClick={() => onStartLesson(lesson.id)} 
                            className="flex-1 p-4 rounded-2xl bg-green-100 text-green-800 flex items-center gap-3 hover:bg-green-200 transition-colors"
                         >
                            <CheckCircle size={18} className="shrink-0" />
                            <span className="text-sm font-bold truncate flex-1 text-left">{lesson.title}</span>
                            <span className="text-[10px] uppercase font-bold opacity-60 group-hover:opacity-100 hidden sm:inline">Réviser</span>
                         </button>
                         
                         <button 
                            onClick={() => onDownloadPDF(lesson.id)} 
                            className="p-4 rounded-2xl bg-white border-2 border-green-100 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all" 
                            title="Télécharger PDF"
                         >
                            <Download size={20} />
                         </button>
                      </div>
                    ); 
                  } 
                  
                  return (
                    <button key={lesson.id} disabled={!isAccessible} onClick={() => onStartLesson(lesson.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all ${isLessonDone ? 'bg-green-500 text-white shadow-md' : isAccessible ? 'bg-yellow-400 text-slate-900 shadow-lg scale-[1.02] font-bold ring-4 ring-yellow-100' : 'bg-slate-200 text-slate-400'}`}>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0">
                        {isLessonDone ? <Check size={16} /> : lesson.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{lesson.title}</p>
                      </div>
                      {isAccessible && !isLessonDone && <PlayCircle size={22} className="shrink-0" />}
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
        <div className="w-4 shrink-0"></div>
      </div>
    </div>
  ); 
};
const StructuresContent = ({ structures, userVocab }) => {
  const safeList = Array.isArray(userVocab) ? userVocab : [];
  const learnedStructures = safeList.filter(item => item && item.type === 'structure');
  const allStructures = [...structures, ...learnedStructures];
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
              {struct.example_es ? (
                <>
                  <p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example_es}</p>
                  <p className="text-sm text-slate-400">🇫🇷 {struct.example_en}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example}</p>
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
const NotebookContent = ({ userVocab, userData }) => {
  const [activeTense, setActiveTense] = useState("Présent");
  const [showReference, setShowReference] = useState(false);

  const sourceList = Array.isArray(userVocab) ? userVocab : [];

  const IRREGULAR_VERBS = new Set([
    "Ser", "Estar", "Ir", "Tener", "Haber", "Hacer", "Poder", "Querer", 
    "Decir", "Ver", "Dar", "Saber", "Salir", "Poner", "Venir", "Oír", 
    "Traer", "Conocer", "Caber", "Andar"
  ]);

  const vocabItems = sourceList.filter(item => {
      if (!item || !item.es || item.type !== 'swipe') return false;
      const contextSafe = item.context ? item.context.toLowerCase() : "";
      if (contextSafe.includes('verbe') || DATA_BANK.verbs.some(v => v.es === item.es)) return false;
      return true;
  }).filter((item, index, self) => index === self.findIndex((t) => t.es === item.es));

  const actionVerbItems = sourceList.filter(item => {
      if (!item || !item.es || item.type !== 'swipe') return false;
      const isVerb = DATA_BANK.verbs.some(v => v.es === item.es);
      return isVerb; 
  });

  const grammarItems = sourceList
    .filter(c => c && c.type === 'grammar')
    .filter(item => {
        let vName = item.verb;
        if (!vName) vName = item.title.split('(').pop().replace(')', '').trim();
        return IRREGULAR_VERBS.has(vName);
    })
    .filter((item, index, self) => index === self.findIndex((t) => t.title === item.title));

  const TENSES_DATA = {
    "Présent": [
      { title: "-AR (Hablar)", endings: ["-o", "-as", "-a", "-amos", "-an"] },
      { title: "-ER (Comer)", endings: ["-o", "-es", "-e", "-emos", "-en"] },
      { title: "-IR (Vivir)", endings: ["-o", "-es", "-e", "-imos", "-en"] }
    ],
    "Imparfait": [
      { title: "-AR (Hablaba)", endings: ["-aba", "-abas", "-aba", "-ábamos", "-aban"] },
      { title: "-ER / -IR (Comía)", endings: ["-ía", "-ías", "-ía", "-íamos", "-ían"] }
    ],
    "Futur": [
      { title: "Tous les verbes", endings: ["Infinitif +", "-é", "-ás", "-á", "-emos", "-án"] }
    ],
    "Passé Simple": [
      { title: "-AR (Hablé)", endings: ["-é", "-aste", "-ó", "-amos", "-aron"] },
      { title: "-ER / -IR (Comí)", endings: ["-í", "-iste", "-ió", "-imos", "-ieron"] }
    ]
  };

  const count = vocabItems.length + grammarItems.length;

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900">Lexique</h2>
        <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">
          {count} Éléments
        </div>
      </div>
      
      <div className="mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Table size={20} className="text-indigo-600"/> 
                Tableaux de Conjugaison
            </h3>
            <button 
                onClick={() => setShowReference(!showReference)} 
                className="text-sm text-indigo-600 font-bold hover:underline"
            >
                {showReference ? "Masquer" : "Afficher"}
            </button>
        </div>

        {showReference && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                    {Object.keys(TENSES_DATA).map(tense => (
                        <button
                            key={tense}
                            onClick={() => setActiveTense(tense)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                                activeTense === tense 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                        >
                            {tense}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {TENSES_DATA[activeTense].map((group, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-indigo-600 mb-3 text-center text-sm">{group.title}</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                {group.endings.map((end, i) => (
                                    <span key={i} className="bg-white px-2 py-1 rounded text-slate-700 text-xs font-mono border border-slate-100 shadow-sm">
                                        {end}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <Edit3 size={18} /> Vocabulaire
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
            <BookOpen size={18} /> Verbes Irréguliers
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {grammarItems.length > 0 ? grammarItems.map((item, index) => (
              <div key={`gram-${index}`} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-indigo-600">{item.title}</h4>
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold uppercase">Irrégulier</span>
                </div>
                
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
            )) : (
                <div className="p-6 text-center text-slate-400 border-2 border-dashed rounded-xl text-sm">
                    Aucun verbe irrégulier appris pour le moment.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const LandingPage = ({ onStart }) => (<div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center"><div className="z-10 space-y-8 max-w-md"><div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div><div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div><button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button></div></div>);
const AuthScreen = ({ onAuth, onGoogle, onBack, error }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}<div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (
  <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6">
    <nav className="flex-1 space-y-2">
      <SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
      <SidebarLink icon={BrainCircuit} label="Zone Test" active={currentView === 'tests'} onClick={() => onChangeView('tests')} />
      <SidebarLink icon={BookOpen} label="Lecture" active={currentView === 'reading'} onClick={() => onChangeView('reading')} />
      <SidebarLink icon={Hammer} label="Structures" active={currentView === 'structures'} onClick={() => onChangeView('structures')} />
      <SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
      <SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} />
    </nav>
  </div>
);
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const MobileHeader = ({ userData }) => (<div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div></div><div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div></div>);
const MobileBottomNav = ({ currentView, onChangeView }) => (
  <div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30">
    <NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} />
    <NavBtn icon={BrainCircuit} label="Tests" active={currentView === 'tests'} onClick={() => onChangeView('tests')} />
    <NavBtn icon={BookOpen} label="Lire" active={currentView === 'reading'} onClick={() => onChangeView('reading')} />
    <NavBtn icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} />
    <NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} />
  </div>
);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const ProfileContent = ({ userData, email, onLogout, onUpload }) => (
  <div className="max-w-2xl mx-auto w-full p-6 md:p-12 space-y-8">
    <h2 className="text-3xl font-black text-slate-900">Mon Compte</h2>
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">
          {userData?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg">{userData?.name}</p>
          <p className="text-slate-400 text-sm">{email}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-slate-100">
        <div>
          <p className="text-2xl font-black text-slate-900">{userData?.xp}</p>
          <p className="text-xs text-slate-400 uppercase font-bold">XP Total</p>
        </div>
        <div>
          <p className="text-2xl font-black text-slate-900">{userData?.streak}</p>
          <p className="text-xs text-slate-400 uppercase font-bold">Série</p>
        </div>
        <div>
          <p className="text-2xl font-black text-slate-900">{userData?.level}</p>
          <p className="text-xs text-slate-400 uppercase font-bold">Niveau</p>
        </div>
      </div>

      <button 
        onClick={onUpload} 
        className="w-full bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100"
      >
        <CloudUpload size={20} />
        Réinitialiser le Contenu
      </button>

      <button onClick={onLogout} className="w-full text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
        <LogOut size={20} /> Se déconnecter
      </button>
    </div>
  </div>
);
const LessonEngine = ({ content, onComplete, onExit, isExam }) => { 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [progress, setProgress] = useState(0); 
  const [score, setScore] = useState(0); 

  const currentCard = content[currentIndex]; 

  const handleNext = () => { 
    if (currentIndex + 1 >= content.length) { 
      setProgress(100); 
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handleSwipe('left');
      if (e.key === "ArrowRight") handleSwipe('right');
      if (e.key === " " || e.key === "Enter") {
         e.preventDefault(); 
         speak(data.es);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data]);

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
  const inputRef = useRef(null); 

  const addChar = (char) => {
    if (isSubmitted) return;
    setVal(prev => prev + char);
    inputRef.current?.focus();
  };

  const checkAnswer = (e) => { 
    if (e) e.preventDefault(); 
    if (isSubmitted) return;

    // [SYNTAXE-RIGOR-START]
    const userClean = val.trim().toLowerCase();
    const answers = Array.isArray(data.answer) ? data.answer : [data.answer];
    // Validation stricte
    const isCorrect = answers.some(a => a.trim().toLowerCase() === userClean);
    // [SYNTAXE-RIGOR-END]
    
    setStatus(isCorrect ? 'success' : 'error'); 
    
    if (isExam) {
      setIsSubmitted(true);
      if (onScore) onScore(isCorrect); 
      
      speak(isCorrect ? "¡Muy bien!" : "Incorrecto");
      
      setTimeout(() => {
        onNext();
      }, 2500); 

    } else {
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
      
      {status === 'error' && isExam && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-2">
          <p className="text-red-400 font-bold">Dommage !</p>
          <p className="text-slate-600 text-sm">La réponse était : <span className="font-bold">{Array.isArray(data.answer) ? data.answer[0] : data.answer}</span></p>
        </div>
      )}
      
      {status === 'error' && !isExam && (
        <p className="text-center text-red-400 font-bold animate-shake">Indice : {data.hint}</p>
      )}
    </div>
  ); 
};
const GrammarCard = ({ data, onNext }) => {
  // [INTERACTIF-GRAMMAIRE-START]
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500">
      <div className="bg-indigo-600 p-8 md:p-10 text-white text-center relative">
        <button onClick={(e) => { e.stopPropagation(); speak(data.title); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white">
          <Volume2 size={20} />
        </button>
        <h3 className="text-3xl md:text-4xl font-black">{data.title}</h3>
        <p className="text-indigo-200 mt-2">{data.description}</p>
      </div>
      
      <div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-slate-50">
        {revealed ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {data.conjugation.map((row, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0">
                <span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span>
                <span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span>
                <span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-400 italic">Clique ci-dessous pour révéler la conjugaison</p>
          </div>
        )}

        <button 
          onClick={revealed ? onNext : () => setRevealed(true)}
          className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-yellow-300 active:scale-95 transition-all"
        >
          {revealed ? 'J\'ai compris' : 'Voir la Conjugaison'}
        </button>
      </div>
    </div>
  );
  // [INTERACTIF-GRAMMAIRE-END]
};
const StructureCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 border-b-[12px] border-slate-100"><div className="bg-amber-400 p-8 text-slate-900 text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.example); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-slate-900"><Volume2 size={20} /></button><h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3></div><div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50"><div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center"><p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p><p className="text-slate-500 text-sm">{data.note}</p></div><div className="text-center"><p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p><p className="text-sm text-slate-400 italic">Exemple</p></div><button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-all">C'est noté !</button></div></div>);
const LessonComplete = ({ xp, onHome, onDownload, isTest }) => (<div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500"><div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div><div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">{isTest ? "Examen Réussi !" : "Increíble!"}</h2><p className="text-xl text-yellow-900 font-bold opacity-80">{isTest ? "Niveau Validé" : "Leçon terminée et sauvegardée."}</p></div><div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div><div className="flex flex-col gap-4 w-full max-w-sm"><button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"><Download size={20} /> Télécharger le PDF</button><button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Continuer</button></div></div>);
const DailyReadingContent = ({ userLevel }) => { 
  const reading = getDailyReading(userLevel); 
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8">
      <div className="text-center">
        <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Lecture du jour
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-2">{reading.title_es}</h2>
        
        <div className="flex justify-center gap-2 mt-2">
            <span className="text-slate-400 italic text-sm">{reading.difficulty}</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">Adapté à ton niveau</span>
        </div>
      </div>

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

      <div className="flex justify-center">
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
        >
          {showTranslation ? <div className="flex items-center gap-2"><X size={16}/> Masquer la traduction</div> : <div className="flex items-center gap-2"><Check size={16}/> Voir la traduction</div>}
        </button>
      </div>

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

const QuizZone = ({ onExit, userData, lessonsContent }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [finished, setFinished] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Import dynamique du moteur
    import('./data/quizengine').then(module => {
       const sourceContent = (lessonsContent && Object.keys(lessonsContent).length > 0) 
          ? lessonsContent 
          : INITIAL_LESSONS_CONTENT;

       // On passe userData complet pour le SRS
       const generated = module.generateSuperQuiz(sourceContent, userData);
       setQuestions(generated);
    });
  }, [userData, lessonsContent]);

  useEffect(() => {
    if (questions[currentIdx]?.type === 'input' && !feedback) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIdx, questions, feedback]);

  if (questions.length === 0) return <div className="p-10 text-center flex items-center justify-center h-full"><Loader2 className="animate-spin mr-2"/> Chargement du quiz...</div>;

  const currentQ = questions[currentIdx];

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
      speak("¡Correcto!");
    } else {
      setFeedback('wrong');
      speak("Incorrecto");
    }
    setTimeout(handleNext, 2000);
  };

  const handleInputSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    // Validation stricte ici aussi
    const userClean = inputValue.trim().toLowerCase();
    const correctClean = currentQ.correctAnswer.trim().toLowerCase();
    
    validateAnswer(userClean === correctClean);
  };

  const addChar = (char) => {
    setInputValue(prev => prev + char);
    inputRef.current?.focus();
  };

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

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
        <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
        <div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} />
        </div>
        <div className="font-black text-indigo-600">{score} pts</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        
        <div className="text-center mb-8 space-y-2">
            <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Question {currentIdx + 1}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 whitespace-pre-line leading-snug">
            {currentQ.question}
            </h2>
            <p className="text-slate-500 font-medium text-sm">{currentQ.hint}</p>
        </div>

        {feedback === 'correct' && (
            <div className="mb-6 px-6 py-3 bg-green-100 text-green-700 rounded-2xl font-bold animate-bounce flex items-center gap-2">
                <CheckCircle size={20}/> Bonne réponse !
            </div>
        )}
        {feedback === 'wrong' && (
            <div className="mb-6 px-6 py-4 bg-red-50 text-red-600 rounded-2xl text-center border-2 border-red-100 animate-shake">
                <div className="font-bold mb-1 flex items-center justify-center gap-2"><AlertCircle size={18}/> Raté...</div>
                <div className="text-sm text-slate-600">La réponse était : <span className="font-bold text-slate-900">{currentQ.correctAnswer}</span></div>
            </div>
        )}

        {!feedback && (
          <form onSubmit={handleInputSubmit} className="w-full">
            <div className="flex gap-2 justify-center mb-6 flex-wrap">
              {['á','é','í','ó','ú','ñ','¿','¡'].map(char => (
                <button key={char} type="button" onClick={() => addChar(char)} className="w-10 h-10 bg-white border-2 border-slate-200 shadow-sm hover:border-indigo-400 hover:text-indigo-600 text-slate-700 font-bold rounded-xl transition-all text-lg active:scale-95">
                    {char}
                </button>
              ))}
            </div>
            
            <input 
                ref={inputRef} 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Ta réponse..." 
                className="w-full p-5 rounded-2xl border-2 border-slate-300 text-center text-xl font-bold text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm mb-4" 
                autoComplete="off" 
                autoCorrect="off" 
                autoCapitalize="off" 
            />
            
            <button 
                type="submit" 
                className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all active:scale-95 ${inputValue ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-300 cursor-not-allowed'}`} 
                disabled={!inputValue}
            >
                Valider
            </button>
          </form>
        )}
      </div>
    </div>
  );
};