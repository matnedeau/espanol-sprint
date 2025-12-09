/* eslint-disable */
// @ts-nocheck
'use client';

// --- IMPORTS ---
import { 
  INITIAL_LESSONS_LIST, 
  INITIAL_LESSONS_CONTENT, 
  SENTENCE_STRUCTURES, 
  STORIES_DATA, 
  generateExamContent,
  getDailyReading 
} from './data/content';

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, Book, Zap, Edit3, BookOpen, LogOut, Save, GraduationCap, PlayCircle, Lock, LayoutDashboard, Library, AlertCircle, Mail, Bell, Settings, Loader2, CloudUpload, Volume2, Download, Printer, PenTool, Hammer, ArrowRight, RotateCcw, Table, Map, CheckCircle, Star, BrainCircuit, Target, MessageCircle, Ear, Bot
} from 'lucide-react';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, increment, collection, getDocs } from "firebase/firestore";

// --- CONFIGURATION FIREBASE ---
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

// --- SYSTÈME AUDIO PREMIUM (ElevenLabs + Fallback) ---
// Ajoutez cette variable JUSTE AVANT la fonction speak (à l'extérieur)
// Elle sert à garder une trace du lecteur audio pour pouvoir le couper
let currentAudio: HTMLAudioElement | null = null;

const speak = async (text) => {
  if (!text) return;

  // --- ÉTAPE 1 : SILENCE OBLIGATOIRE ---
  // On coupe le sifflet au robot du navigateur
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  
  // On coupe aussi l'ancienne belle voix si elle parlait encore
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // --- ÉTAPE 2 : VOIX PREMIUM (ElevenLabs) ---
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // On enregistre cet audio comme étant "celui en cours"
      currentAudio = audio;
      
      audio.play();
      return; // SUCCÈS : On s'arrête là, le robot ne parlera pas.
    }
  } catch (error) {
    // Si l'API échoue, on continue vers le fallback silencieusement
  }

  // --- ÉTAPE 3 : FALLBACK (Le Robot) ---
  // Seulement si l'API a échoué
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Microsoft')) && 
      (v.lang.includes('es-ES') || v.lang.includes('es'))
    ) || voices.find(v => v.lang.includes('es'));
    
    if (esVoice) utterance.voice = esVoice;
    utterance.lang = 'es-ES'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- SIMULATION TUTEUR IA ---
const askAITutor = async (question) => {
    // Simulation délai réseau
    await new Promise(r => setTimeout(r, 1500));
    return "💡 Coach IA : En espagnol, le sujet est souvent omis car la terminaison du verbe indique déjà la personne. C'est plus naturel !";
};

// --- COMPOSANT PRINCIPAL ---
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [authError, setAuthError] = useState(""); 
  const [testMode, setTestMode] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  
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

  const startStory = (storyId) => {
     const story = STORIES_DATA.find(s => s.id === storyId);
     if (story) {
        setActiveStory(story);
        setView('story');
     }
  };

  const handleLessonComplete = async (xp, lessonContent, lessonId) => {
      // Logique simplifiée pour l'intégration
      const newItems = lessonContent.filter(item => ['swipe', 'grammar', 'structure'].includes(item.type));
      const enrichedItems = newItems.map(item => ({ ...item, grade: 0, interval: 1, lastReview: new Date().toISOString() }));
      const today = new Date().toDateString();
      
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const uniqueNewItems = enrichedItems.filter(item => !userData.vocab.some(v => v.id === item.id));
        const isNew = !userData.completedLessons.includes(lessonId);
        const newCount = isNew ? (userData.dailyLimit?.date === today ? userData.dailyLimit.count + 1 : 1) : (userData.dailyLimit?.count || 0);
        
        await updateDoc(userRef, {
          xp: increment(xp),
          streak: increment(1),
          vocab: arrayUnion(...uniqueNewItems),
          completedLessons: arrayUnion(lessonId),
          dailyLimit: { date: today, count: newCount }
        });
        
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
    try { html2pdf = (await import('html2pdf.js')).default; } catch (e) { alert("Erreur PDF"); return; }
    
    // Génération PDF simplifiée pour tenir dans le fichier
    const element = document.createElement('div');
    element.innerHTML = `
        <div style="font-family:sans-serif; padding:20px;">
            <h1 style="color:#4f46e5;">Leçon #${lessonId}</h1>
            <p>Vocabulaire et Grammaire de EspañolSprint</p>
            ${content.map(c => c.es ? `<p><b>${c.es}</b> = ${c.en}</p>` : '').join('')}
        </div>
    `;
    html2pdf().from(element).save(`Lecon-${lessonId}.pdf`);
  };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-yellow-400"><Loader2 size={48} className="animate-spin text-white" /></div>;

  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      {(!currentUser || view === 'landing' || view === 'auth') ? (
        <div className="w-full h-full flex items-center justify-center bg-white">
           {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
           {view === 'auth' && <AuthScreen onAuth={handleAuth} onGoogle={handleGoogleLogin} onBack={() => setView('landing')} error={authError} />}
        </div>
      ) : (
        <>
          <SidebarDesktop userData={userData} currentView={view} onChangeView={setView} onLogout={handleLogout} />
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            <MobileHeader userData={userData} />
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              {view === 'dashboard' && <DashboardContent userData={userData} allLessons={dynamicLessonsList} onStartLesson={startLesson} onDownloadPDF={handlePrintPDF}/>}
              {view === 'notebook' && <NotebookContent userVocab={userData.vocab} />}
              {view === 'quiz' && <QuizZone onExit={() => setView('dashboard')} userData={userData} lessonsContent={dynamicLessonsContent} />}
              {view === 'reading' && (
                <div className="p-6 pb-24 space-y-8 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Lectures & Histoires</h2>
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-500 uppercase text-sm">Histoires Interactives</h3>
                        {STORIES_DATA.map(story => (
                            <div key={story.id} onClick={() => startStory(story.id)} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💬</div>
                                <div><h4 className="font-bold text-lg text-slate-900">{story.title}</h4><p className="text-sm text-slate-400">Niveau {story.level}</p></div>
                                <ChevronRight className="ml-auto text-slate-300" />
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-500 uppercase text-sm">Lecture du jour</h3>
                        <DailyReadingContent userLevel={userData?.level} />
                    </div>
                </div>
              )}
              {view === 'story' && activeStory && <StoryEngine story={activeStory} onComplete={() => setView('reading')} />}
              {view === 'leaderboard' && <LeaderboardView userData={userData} />}
              {view === 'profile' && <ProfileContent userData={userData} email={currentUser.email} onLogout={handleLogout} />}
              {view === 'lesson' && dynamicLessonsContent[activeLessonId] && (
                <LessonEngine 
                    content={dynamicLessonsContent[activeLessonId]} 
                    onComplete={(xp, score) => handleLessonComplete(xp, dynamicLessonsContent[activeLessonId], activeLessonId, score)} 
                    onExit={() => setView('dashboard')} 
                />
              )}
              {view === 'complete' && <LessonComplete xp={150} onHome={() => setView('dashboard')} onDownload={() => handlePrintPDF(activeLessonId)} />}
            </div>
            {view !== 'lesson' && view !== 'complete' && view !== 'story' && <MobileBottomNav currentView={view} onChangeView={setView} />}
          </main>
        </>
      )}
    </div>
  );
}

/* --- SOUS-COMPOSANTS --- */
const StoryEngine = ({ story, onComplete }) => {
    const [index, setIndex] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState([story.dialogue[0]]);
    const messagesEndRef = useRef(null);
    const currentItem = story.dialogue[index];
    const isFinished = index >= story.dialogue.length - 1;

    const handleNext = () => {
        if (isFinished) { onComplete(); return; }
        const nextIndex = index + 1;
        setIndex(nextIndex);
        setVisibleMessages(prev => [...prev, story.dialogue[nextIndex]]);
        if (story.dialogue[nextIndex].type === 'bubble') speak(story.dialogue[nextIndex].text_es);
    };

    const handleAnswer = (option) => {
        if (option === currentItem.answer) { speak("¡Correcto!"); handleNext(); } 
        else { speak("Incorrecto"); alert("Mauvaise réponse !"); }
    };

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); if(index===0) speak(story.dialogue[0].text_es); }, [visibleMessages]);

    return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
                 <button onClick={onComplete}><X className="text-slate-400"/></button>
                 <h3 className="font-bold text-slate-800">{story.title}</h3>
                 <div className="w-6"></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {visibleMessages.map((msg, i) => {
                    if (msg.type === 'bubble') {
                        const char = story.characters[msg.speaker];
                        const isMe = msg.speaker === 'pablo'; 
                        return (
                            <div key={i} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm ${char.color}`}>{char.avatar}</div>
                                <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                                    <p className="font-medium text-lg">{msg.text_es}</p>
                                    <p className={`text-xs mt-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>{msg.text_fr}</p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
                {currentItem.type === 'question' ? (
                    <div className="space-y-3 animate-in slide-in-from-bottom">
                        <p className="text-center font-bold text-slate-900 mb-2">{currentItem.question}</p>
                        <div className="grid gap-2">
                            {currentItem.options.map((opt, idx) => (
                                <button key={idx} onClick={() => handleAnswer(opt)} className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 font-bold text-slate-700 transition-all">{opt}</button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button onClick={handleNext} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isFinished ? "Terminer" : "Continuer"}</button>
                )}
            </div>
        </div>
    );
};

const QuizZone = ({ onExit, userData, lessonsContent }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); 
  const [isReviewing, setIsReviewing] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(null);

  useEffect(() => {
    import('./data/quizengine').then(module => {
       const sourceContent = (lessonsContent && Object.keys(lessonsContent).length > 0) ? lessonsContent : INITIAL_LESSONS_CONTENT;
       const generated = module.generateSuperQuiz(sourceContent, userData);
       setQuestions(generated);
    });
  }, [userData, lessonsContent]);

  if (questions.length === 0) return <div className="p-10 text-center flex items-center justify-center h-full"><Loader2 className="animate-spin mr-2"/> Chargement...</div>;
  const currentQ = questions[currentIdx];

  const handleNext = () => {
    setAiExplanation(null);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(p => p + 1);
    } else {
      if (wrongAnswers.length > 0 && !isReviewing) {
           setIsReviewing(true);
           setQuestions(wrongAnswers);
           setWrongAnswers([]);
           setCurrentIdx(0);
           alert("🎯 Mode Correction : Révise tes erreurs !");
      } else if (wrongAnswers.length > 0 && isReviewing) {
           setQuestions(wrongAnswers);
           setWrongAnswers([]);
           setCurrentIdx(0);
      } else {
           onExit();
      }
    }
  };

  const handleScore = (isCorrect) => { if (!isCorrect) setWrongAnswers(prev => [...prev, currentQ]); };
  const askAI = async () => { setAiExplanation("..."); const exp = await askAITutor(currentQ.question); setAiExplanation(exp); };

  return (
    <div className="h-full flex flex-col bg-slate-50">
       <div className="px-6 py-4 bg-white border-b flex items-center justify-between">
           <button onClick={onExit}><X className="text-slate-400"/></button>
           <div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 transition-all" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} /></div>
           {isReviewing && <div className="text-red-500 font-bold flex items-center gap-1"><RotateCcw size={16}/> Révision</div>}
       </div>
       <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full space-y-6">
           {currentQ.type === 'listening' ? <ListeningCard data={currentQ} onNext={handleNext} onScore={handleScore} /> : <InputCard data={currentQ} onNext={handleNext} onScore={handleScore} isExam={false} />}
           <button onClick={askAI} className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100"><Bot size={18}/> {aiExplanation ? "Explication reçue" : "Explique-moi (IA)"}</button>
           {aiExplanation && <div className="bg-white border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-sm text-sm text-slate-600 animate-in slide-in-from-bottom">{aiExplanation}</div>}
       </div>
    </div>
  );
};

const ListeningCard = ({ data, onNext, onScore }) => {
    const [val, setVal] = useState('');
    const [status, setStatus] = useState('idle'); 
    const [revealed, setRevealed] = useState(false);
    useEffect(() => { speak(data.audioText); }, [data]);
    const check = (e) => { e.preventDefault(); const cleanVal = val.trim().toLowerCase().replace(/[¿¡!.,]/g, ''); const cleanAns = data.correctAnswer.toLowerCase().replace(/[¿¡!.,]/g, ''); const correct = cleanVal === cleanAns; setStatus(correct ? 'success' : 'error'); setRevealed(true); if(onScore) onScore(correct); if (correct) { speak("¡Correcto!"); setTimeout(onNext, 1500); } else { speak("Incorrecto"); } };
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-6 w-full animate-in zoom-in">
             <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Écoute</span>
             <button onClick={() => speak(data.audioText)} className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all animate-pulse"><Ear size={40} /></button>
             {revealed && <p className="text-2xl font-black text-purple-600 text-center">{data.audioText}</p>}
             <form onSubmit={check} className="w-full space-y-4"><input value={val} onChange={e => setVal(e.target.value)} placeholder="Écris ce que tu entends..." className={`w-full p-4 border-2 rounded-xl text-center font-bold outline-none ${status === 'error' ? 'border-red-400 bg-red-50' : status === 'success' ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-purple-400'}`} disabled={revealed && status === 'success'} /><button type="submit" disabled={!val} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">{status === 'error' ? 'Continuer' : 'Vérifier'}</button>{status === 'error' && <button type="button" onClick={onNext} className="w-full py-2 text-slate-400 font-bold">Passer</button>}</form>
        </div>
    );
};

// --- COMPOSANTS EXISTANTS (Style conservé) ---
const LeaderboardView = ({ userData }) => {
    const rivals = [{ name: "Maria L.", xp: 1450, avatar: "👩" }, { name: "Thomas B.", xp: 1200, avatar: "👨" }, { name: userData?.name + " (Toi)", xp: userData?.xp || 0, avatar: "😎", isMe: true }, { name: "Juan P.", xp: 850, avatar: "🧔" }].sort((a, b) => b.xp - a.xp);
    return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-6"><div className="text-center space-y-2 mb-8"><div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 mb-2"><Trophy size={40} /></div><h2 className="text-3xl font-black text-slate-900">Ligue Diamant</h2><p className="text-slate-500 font-medium">Fin dans 2j 4h</p></div><div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">{rivals.map((user, idx) => (<div key={idx} className={`flex items-center gap-4 p-4 border-b border-slate-50 ${user.isMe ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}`}><div className="font-black text-slate-300 w-6">{idx + 1}</div><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</div><div className="flex-1 font-bold text-slate-800">{user.name}</div><div className="font-black text-slate-900">{user.xp} XP</div></div>))}</div></div>);
};
const LessonEngine = ({ content, onComplete, onExit }) => { 
  const [idx, setIdx] = useState(0); const [prog, setProg] = useState(0); const card = content[idx]; 
  const next = () => { if (idx + 1 >= content.length) { setProg(100); setTimeout(() => onComplete(150), 500); } else { setProg(((idx + 1) / content.length) * 100); setIdx(i => i + 1); } };
  useEffect(() => { if (idx === 0 && card?.es) speak(card.es); }, [idx]);
  return (<div className="h-full w-full flex flex-col bg-slate-50"><div className="px-6 py-4 flex items-center gap-6 bg-white border-b z-10"><button onClick={onExit}><X className="text-slate-400" /></button><div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${prog}%` }}></div></div></div><div className="flex-1 flex items-center justify-center p-4 overflow-hidden"><div className="w-full max-w-md aspect-[3/4] md:aspect-auto md:h-[600px] perspective-1000">{card.type === 'swipe' && <SwipeCard data={card} onNext={next} />}{card.type === 'input' && <InputCard data={card} onNext={next} isExam={false} />}{card.type === 'grammar' && <GrammarCard data={card} onNext={next} />}{card.type === 'structure' && <StructureCard data={card} onNext={next} />}</div></div></div>); 
};
// --- AJOUTER CE BLOC À LA FIN DE app/page.tsx ---

const NotebookContent = ({ userVocab }) => {
  const [activeTab, setActiveTab] = useState('vocab');
  // Sécurité : on s'assure que userVocab est bien un tableau
  const safeVocab = Array.isArray(userVocab) ? userVocab : [];

  const vocabItems = safeVocab.filter(item => item.type === 'swipe');
  const grammarItems = safeVocab.filter(item => item.type === 'grammar');
  const structureItems = safeVocab.filter(item => item.type === 'structure');

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24 space-y-6">
      <h2 className="text-3xl font-black text-slate-900">Mon Lexique 📚</h2>
      
      {/* Onglets */}
      <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl">
        {['vocab', 'grammar', 'structure'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
              activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab === 'vocab' && 'Vocabulaire'}
            {tab === 'grammar' && 'Grammaire'}
            {tab === 'structure' && 'Structures'}
          </button>
        ))}
      </div>

      {/* Contenu Vocabulaire */}
      {activeTab === 'vocab' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vocabItems.length > 0 ? vocabItems.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">{item.es}</p>
                <p className="text-xs text-slate-400 italic">{item.context}</p>
              </div>
              <p className="text-indigo-600 font-medium">{item.en}</p>
            </div>
          )) : <p className="text-slate-400 text-center col-span-2 py-10">Rien ici pour l'instant.</p>}
        </div>
      )}

      {/* Contenu Grammaire */}
      {activeTab === 'grammar' && (
        <div className="space-y-4">
          {grammarItems.length > 0 ? grammarItems.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-lg text-indigo-600 mb-2">{item.title}</h4>
              <p className="text-slate-600 mb-4 text-sm">{item.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {item.conjugation && item.conjugation.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-between bg-slate-50 p-2 rounded">
                    <span className="text-slate-400">{row.pronoun}</span>
                    <span className="font-bold text-slate-800">{row.verb}</span>
                  </div>
                ))}
              </div>
            </div>
          )) : <p className="text-slate-400 text-center py-10">Aucune règle de grammaire sauvée.</p>}
        </div>
      )}

      {/* Contenu Structures */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
           {structureItems.length > 0 ? structureItems.map((item, idx) => (
             <div key={idx} className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
               <h4 className="font-bold text-amber-800 mb-2">{item.title}</h4>
               <p className="font-mono text-amber-600 bg-white/50 p-2 rounded mb-2 text-center">{item.formula}</p>
               <p className="text-sm text-amber-700 italic">Ex: {item.example}</p>
             </div>
           )) : <p className="text-slate-400 text-center py-10">Aucune structure apprise.</p>}
        </div>
      )}
    </div>
  );
};
const InputCard = ({ data, onNext, isExam, onScore }) => { 
  const [val, setVal] = useState(''); const [status, setStatus] = useState('idle'); const [sub, setSub] = useState(false); const inputRef = useRef(null);
  const addChar = (c) => { if (sub) return; setVal(p => p + c); inputRef.current?.focus(); };
  const check = (e) => { e?.preventDefault(); if (sub) return; const clean = val.trim().toLowerCase(); const ans = Array.isArray(data.answer) ? data.answer : [data.answer]; const ok = ans.some(a => a.trim().toLowerCase() === clean); setStatus(ok ? 'success' : 'error'); if(onScore) onScore(ok); if (ok) { speak("¡Muy bien!"); setTimeout(onNext, 1500); } else { speak("Inténtalo de nuevo"); } };
  return (<div className="w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col p-8 md:p-12 justify-center space-y-6 animate-in zoom-in"><div className="text-center space-y-2">{isExam && <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase">Examen</span>}<h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3></div><div className="flex gap-2 justify-center flex-wrap">{['á','é','í','ó','ú','ñ','¿','¡'].map(c => (<button key={c} type="button" onClick={() => addChar(c)} disabled={sub} className="w-10 h-10 bg-white border-2 border-slate-200 shadow-sm font-bold rounded-xl active:scale-95">{c}</button>))}</div><form onSubmit={check} className="w-full space-y-6"><input ref={inputRef} type="text" value={val} onChange={(e) => { if(!sub) { setVal(e.target.value); setStatus('idle'); } }} disabled={sub} className={`w-full text-center text-2xl font-bold p-6 rounded-2xl border-4 outline-none ${status === 'error' ? 'border-red-400 bg-red-50 text-red-500' : status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-100 focus:border-yellow-400'}`} placeholder="..." autoComplete="off"/><button type="submit" disabled={sub || !val.trim()} className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl active:scale-95 ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-slate-900'}`}>{status === 'success' ? 'Validé !' : status === 'error' ? 'Réessayer' : 'Vérifier'}</button></form>{status === 'error' && !isExam && <p className="text-center text-red-400 font-bold animate-shake">Indice : {data.hint}</p>}</div>); 
};
const SwipeCard = ({ data, onNext }) => { const [swiped, setSwiped] = useState(null); const swipe = (dir) => { setSwiped(dir); setTimeout(onNext, 250); }; useEffect(() => { const handler = (e) => { if(e.key==="ArrowRight") swipe('right'); if(e.key===" " || e.key==="Enter") { e.preventDefault(); speak(data.es); } }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [data]); return (<div className={`w-full h-full bg-white rounded-3xl shadow-xl border-b-8 border-slate-100 flex flex-col relative transition-all duration-300 ${swiped ? 'opacity-0 translate-x-full' : ''}`}><div className="absolute top-4 right-4"><button onClick={(e) => { e.stopPropagation(); speak(data.es); }} className="p-3 bg-slate-100 rounded-full text-indigo-600"><Volume2 size={24}/></button></div><div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6"><h2 className="text-5xl font-black text-slate-800">{data.es}</h2><div className="bg-indigo-50 px-6 py-3 rounded-2xl"><p className="text-xl font-bold text-indigo-600">{data.en}</p></div><p className="text-sm text-slate-400 italic">"{data.context}"</p></div><div className="p-6 flex justify-center"><button onClick={() => swipe('right')} className="w-full py-4 bg-teal-500 text-white rounded-xl font-bold text-xl shadow-lg">Compris !</button></div></div>); };
const GrammarCard = ({ data, onNext }) => { const [rev, setRev] = useState(false); return (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"><div className="bg-indigo-600 p-8 text-white text-center relative"><button onClick={() => speak(data.title)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><Volume2 size={20}/></button><h3 className="text-3xl font-black">{data.title}</h3><p className="text-indigo-200 mt-2">{data.description}</p></div><div className="flex-1 p-6 flex flex-col justify-between bg-slate-50">{rev ? (<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">{data.conjugation.map((row, i) => (<div key={i} className="flex justify-between p-4 border-b last:border-0"><span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span><span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span><span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span></div>))}</div>) : (<div className="flex-1 flex items-center justify-center"><p className="text-slate-400 italic">Clique pour révéler</p></div>)}<button onClick={rev ? onNext : () => setRev(true)} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg">{rev ? 'Continuer' : 'Voir Conjugaison'}</button></div></div>); };
const StructureCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-b-[12px] border-slate-100"><div className="bg-amber-400 p-8 text-slate-900 text-center relative"><button onClick={() => speak(data.example)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><Volume2 size={20}/></button><h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3></div><div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50"><div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center"><p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p><p className="text-slate-500 text-sm">{data.note}</p></div><div className="text-center"><p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p><p className="text-sm text-slate-400 italic">Exemple</p></div><button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg">C'est noté !</button></div></div>);
const LessonComplete = ({ xp, onHome, onDownload }) => (<div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in"><div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div><div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">Increíble!</h2><p className="text-xl text-yellow-900 font-bold opacity-80">Leçon terminée !</p></div><div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div><div className="flex flex-col gap-4 w-full max-w-sm"><button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"><Download size={20} /> Télécharger PDF</button><button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl">Continuer</button></div></div>);
const DailyReadingContent = ({ userLevel }) => { const reading = getDailyReading(userLevel); const [trans, setTrans] = useState(false); return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8"><div className="text-center"><span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase">Lecture du jour</span><h2 className="text-3xl font-black text-slate-900 mt-2">{reading.title_es}</h2></div><div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-slate-100 relative overflow-hidden group"><div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Español</div><button onClick={() => speak(reading.text_es)} className="absolute top-6 right-6 p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"><Volume2 size={20} /></button><p className="text-xl text-slate-800 leading-relaxed font-medium mt-4">{reading.text_es}</p></div><div className="flex justify-center"><button onClick={() => setTrans(!trans)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">{trans ? <><X size={16}/> Masquer</> : <><Check size={16}/> Traduction</>}</button></div>{trans && <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200"><h4 className="text-lg font-bold text-slate-700 mb-2">{reading.title_fr}</h4><p className="text-slate-600 leading-relaxed">{reading.text_fr}</p></div>}</div>); };
const LandingPage = ({ onStart }) => (<div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center"><div className="z-10 space-y-8 max-w-md"><div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div><div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div><button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button></div></div>);
const AuthScreen = ({ onAuth, onGoogle, onBack, error }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}<div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (<div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6"><nav className="flex-1 space-y-2"><div className="flex items-center gap-2 mb-8 px-2"><Image src="/logo.svg" width={32} height={32} alt="Logo"/><span className="text-xl font-black tracking-tighter">Español<span className="text-red-600">Sprint</span></span></div><SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><SidebarLink icon={MessageCircle} label="Histoires" active={currentView === 'reading' || currentView === 'story'} onClick={() => onChangeView('reading')} /><SidebarLink icon={Trophy} label="Classement" active={currentView === 'leaderboard'} onClick={() => onChangeView('leaderboard')} /><SidebarLink icon={BrainCircuit} label="Entraînement" active={currentView === 'tests' || currentView === 'quiz'} onClick={() => onChangeView('tests')} /><SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></nav></div>);
const MobileHeader = ({ userData }) => (<div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div></div><div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div></div>);
const MobileBottomNav = ({ currentView, onChangeView }) => (<div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30"><NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><NavBtn icon={MessageCircle} label="Histoires" active={currentView === 'reading' || currentView === 'story'} onClick={() => onChangeView('reading')} /><NavBtn icon={Trophy} label="Ligue" active={currentView === 'leaderboard'} onClick={() => onChangeView('leaderboard')} /><NavBtn icon={BrainCircuit} label="Quiz" active={currentView === 'tests' || currentView === 'quiz'} onClick={() => onChangeView('tests')} /><NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></div>);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const ProfileContent = ({ userData, email, onLogout, onUpload }) => (<div className="max-w-2xl mx-auto w-full p-6 md:p-12 space-y-8"><h2 className="text-3xl font-black text-slate-900">Mon Compte</h2><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">{userData?.name?.charAt(0).toUpperCase()}</div><div><p className="font-bold text-slate-900 text-lg">{userData?.name}</p><p className="text-slate-400 text-sm">{email}</p></div></div><div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-slate-100"><div><p className="text-2xl font-black text-slate-900">{userData?.xp}</p><p className="text-xs text-slate-400 uppercase font-bold">XP Total</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.streak}</p><p className="text-xs text-slate-400 uppercase font-bold">Série</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.level}</p><p className="text-xs text-slate-400 uppercase font-bold">Niveau</p></div></div><button onClick={onUpload} className="w-full bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100"><CloudUpload size={20} /> Réinitialiser le Contenu</button><button onClick={onLogout} className="w-full text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"><LogOut size={20} /> Se déconnecter</button></div></div>);
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
                         <button onClick={() => onStartLesson(lesson.id)} className="flex-1 p-4 rounded-2xl bg-green-100 text-green-800 flex items-center gap-3 hover:bg-green-200 transition-colors">
                            <CheckCircle size={18} className="shrink-0" />
                            <span className="text-sm font-bold truncate flex-1 text-left">{lesson.title}</span>
                            <span className="text-[10px] uppercase font-bold opacity-60 group-hover:opacity-100 hidden sm:inline">Réviser</span>
                         </button>
                         <button onClick={() => onDownloadPDF(lesson.id)} className="p-4 rounded-2xl bg-white border-2 border-green-100 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all" title="Télécharger PDF">
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
const TestDashboard = ({ userData, onStartTest }) => { const levels = ["A1", "A2", "B1", "B2", "C1"]; const currentIdx = levels.indexOf(userData.level || "A1"); const nextLevel = levels[currentIdx + 1]; const lessonsDone = userData.completedLessons.length; const canTakeExam = lessonsDone >= (currentIdx + 1) * 20; return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8"><div className="text-center"><h2 className="text-3xl font-black text-slate-900 mb-2">Zone Test 🧠</h2><p className="text-slate-500">Valide tes acquis.</p></div><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group" onClick={() => onStartTest('training')}><div className="flex items-center gap-6"><div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><BrainCircuit size={32} /></div><div className="flex-1"><h3 className="text-xl font-bold text-slate-900">Entraînement Rapide</h3><p className="text-sm text-slate-500 mt-1">Révision intelligente.</p></div><ChevronRight className="text-slate-300" /></div></div><div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all relative overflow-hidden ${!canTakeExam ? 'opacity-60 grayscale' : 'cursor-pointer hover:shadow-md group'}`} onClick={() => canTakeExam && onStartTest('levelup')}><div className="flex items-center gap-6"><div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:rotate-6 transition-transform"><Target size={32} /></div><div className="flex-1"><h3 className="text-xl font-bold text-slate-900">Examen {nextLevel}</h3><p className="text-sm text-slate-500 mt-1">Passage de niveau.</p></div>{canTakeExam ? <ChevronRight className="text-slate-300" /> : <Lock className="text-slate-300" />}</div>{!canTakeExam && <div className="absolute bottom-2 right-4 text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded">Finis le niveau d'abord</div>}</div></div>); };