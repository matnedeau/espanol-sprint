/* eslint-disable */
// @ts-nocheck
'use client';

// --- IMPORTS ---
import { INITIAL_LESSONS_LIST } from '@/app/lib/curriculum';
import { STORIES_DATA } from '@/app/lib/stories';
import { SENTENCE_STRUCTURES } from '@/app/lib/data-bank';
import { 
  generateExamContent, 
  getDailyReading, 
  generateAllContent 
} from '@/app/lib/generator';
import { speak } from '@/app/lib/audio';

// Composants modulaires
import LessonEngine from '@/app/components/LessonEngine';
import { InputCard } from '@/app/components/LessonCards';

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, ChevronRight, X, Check, Trophy, User, LogOut, PlayCircle, Lock, 
  LayoutDashboard, Library, AlertCircle, Loader2, CloudUpload, Volume2, 
  Download, Hammer, ArrowRight, RotateCcw, CheckCircle, BrainCircuit, Target, 
  MessageCircle, Ear, Bot, Calendar, Crown, Heart, Infinity, Award, Mic
} from 'lucide-react';

// --- FIREBASE IMPORTS (C'est ici que l'erreur se trouvait) ---
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
// J'ai bien remis getFirestore et ajouté deleteDoc ici :
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, arrayUnion, increment, collection, getDocs } from "firebase/firestore";

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
const db = getFirestore(app); // C'est cette ligne qui plantait sans l'import !
const googleProvider = new GoogleAuthProvider();

// --- COMPOSANT PRINCIPAL ---
export default function EspanolSprintPro() {
  // --- ÉTATS TUTEUR IA (WIDGET) ---
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
      { role: 'ai', text: "Hola! Je suis ton coach personnel. Une question sur tes progrès ?" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // CORRECTION : Fonction adaptée pour le Widget
  const handleAskTutorWidget = async (e, directMessage = null) => {
      if (e && e.preventDefault) e.preventDefault();
      
      const userMsg = directMessage || chatInput;
      if (!userMsg || !userMsg.trim()) return;

      if (!directMessage) setChatInput("");
      
      setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
      setIsChatLoading(true);

      const isPremium = userData?.subscription?.status === 'active';

      try {
          const res = await fetch('/api/chat', { 
              method: 'POST', 
              body: JSON.stringify({ 
                  message: userMsg, 
                  userContext: { 
                      isPremium, 
                      level: userData?.level || "A1",
                      context: "dashboard"
                  } 
              }) 
          });
          const data = await res.json();
          
          if (data.error === "LIMIT_REACHED") {
             setChatHistory(prev => [...prev, { role: 'ai', text: "🔒 Limite atteinte. Passez Premium !" }]);
          } else {
             setChatHistory(prev => [...prev, { role: 'ai', text: data.reply || "Désolé, je n'ai pas compris." }]);
          }
      } catch (err) {
          setChatHistory(prev => [...prev, { role: 'ai', text: "Erreur de connexion 😓" }]);
      } finally {
          setIsChatLoading(false);
      }
  };

  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [authError, setAuthError] = useState(""); 
  const [testMode, setTestMode] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  const [dailyStoryContent, setDailyStoryContent] = useState(null);
   
  // États pour les limites & promo
  const [dailyAiCount, setDailyAiCount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const [dynamicLessonsList, setDynamicLessonsList] = useState(INITIAL_LESSONS_LIST);
  const [dynamicLessonsContent, setDynamicLessonsContent] = useState({});

  // INITIALISATION
  useEffect(() => {
    const initApp = async (user) => {
      try { await getRedirectResult(auth); } catch (e) { console.error(e); }
      if (user) {
        setCurrentUser(user);
        const userRef = doc(db, "users", user.uid);
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('payment') === 'success') {
                try {
                    await updateDoc(userRef, { 'subscription.status': 'active', 'subscription.plan': 'premium', 'subscription.startDate': new Date().toISOString() });
                    setUserData(prev => ({...prev, subscription: { status: 'active', plan: 'premium', startDate: new Date().toISOString() }}));
                    window.history.replaceState(null, '', '/'); 
                    alert("🎉 Félicitations ! Votre compte est maintenant Premium !");
                } catch(e) { console.error("Erreur activation premium", e); }
            }
        }
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) { setUserData(userSnap.data()); } else {
            const name = user.displayName || user.email.split('@')[0];
            const newProfile = { name, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 }, dailyStory: { date: "", storyId: "" }, readStories: [], subscription: { status: 'free' } };
            await setDoc(userRef, newProfile); setUserData(newProfile);
          }
          const roadmapSnap = await getDoc(doc(db, "meta", "roadmap")); if (roadmapSnap.exists()) setDynamicLessonsList(roadmapSnap.data().lessons);
          const lessonsSnapshot = await getDocs(collection(db, "lessons")); const lessonsData = {}; lessonsSnapshot.forEach((doc) => { lessonsData[doc.id] = doc.data().content; });
          const baseContent = generateAllContent(); setDynamicLessonsContent({ ...baseContent, ...lessonsData });
          setView('dashboard');
        } catch (error) { console.error(error); }
      } else { setCurrentUser(null); setUserData(null); setView('landing'); }
      setLoading(false);
    };
    const unsubscribe = onAuthStateChanged(auth, initApp);
    return () => unsubscribe();
  }, []);

  // STORY
  useEffect(() => {
    const assignDailyStory = async () => {
        if (!userData || !currentUser) return;
        const today = new Date().toDateString();
        const currentDaily = userData.dailyStory; 
        if (currentDaily?.date === today) { const existingStory = STORIES_DATA.find(s => s.id === currentDaily.storyId); if (existingStory) { setDailyStoryContent(existingStory); return; } }
        const levels = ["A1", "A2", "B1", "B2", "C1"]; const userLevelIdx = levels.indexOf(userData.level || "A1"); const allowedLevels = levels.slice(0, userLevelIdx + 1); const validStories = STORIES_DATA.filter(s => allowedLevels.includes(s.level)); let candidates = validStories.filter(s => !(userData.readStories || []).includes(s.id)); if (candidates.length === 0) candidates = validStories; if (candidates.length === 0) return; const randomStory = candidates[Math.floor(Math.random() * candidates.length)];
        try { const userRef = doc(db, "users", currentUser.uid); await updateDoc(userRef, { dailyStory: { date: today, storyId: randomStory.id }, readStories: arrayUnion(randomStory.id) }); setUserData(prev => ({ ...prev, dailyStory: { date: today, storyId: randomStory.id }, readStories: [...(prev.readStories || []), randomStory.id] })); setDailyStoryContent(randomStory); } catch (e) { console.error("Erreur story:", e); }
    };
    if (!loading && userData && STORIES_DATA.length > 0) assignDailyStory();
  }, [userData?.dailyStory?.date, currentUser, loading]);

  const handleCheckout = async () => {
    if (!currentUser) return alert("Connectez-vous d'abord !");
    const btn = document.getElementById('premium-btn');
    if(btn) btn.textContent = "Chargement...";
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.uid, email: currentUser.email }), });
      const data = await res.json();
      if (data.url) window.location.href = data.url; else { alert("Erreur initialisation paiement."); if(btn) btn.textContent = "Réessayer"; }
    } catch (error) { console.error(error); alert("Erreur de connexion."); if(btn) btn.textContent = "Réessayer"; }
  };

  const askAITutor = async (question) => {
      const isPremium = userData?.subscription?.status === 'active';
      if (!isPremium && dailyAiCount >= 3) { setShowPremiumModal(true); return "🔒 Limite quotidienne atteinte. Passez Premium !"; }
      try {
          const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: question, userContext: { isPremium, dailyCount: dailyAiCount, level: userData?.level || "A1" } }) });
          const data = await res.json();
          if (data.error === "LIMIT_REACHED") { setShowPremiumModal(true); return "🔒 Limite atteinte."; }
          if (data.reply) { if (!isPremium) setDailyAiCount(prev => prev + 1); return data.reply; }
          return "Désolé, je n'ai pas pu joindre le professeur.";
      } catch (e) { return "Erreur de connexion au coach."; }
  };

  const handleAuth = async (email, password, isSignUp) => {
    setLoading(true); setAuthError("");
    if (!email.trim() || !password) { setAuthError("Champs vides"); setLoading(false); return; }
    try {
      if (isSignUp) { const cred = await createUserWithEmailAndPassword(auth, email, password); await setDoc(doc(db, "users", cred.user.uid), { name: email.split('@')[0], email, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 }, readStories: [], dailyStory: { date: "", storyId: "" }, subscription: { status: 'free' } }); } else { await signInWithEmailAndPassword(auth, email, password); }
    } catch (error) { setAuthError(error.message); setLoading(false); }
  };

  const handleGoogleLogin = async () => { setLoading(true); setAuthError(""); try { await signInWithPopup(auth, googleProvider); } catch (error) { setAuthError(error.message); setLoading(false); } };
  const handleLogout = async () => { await signOut(auth); setView('landing'); };

  const startLesson = (lessonId) => {
    const today = new Date().toDateString();
    const isPremium = userData?.subscription?.status === 'active';
    const isNewLesson = !userData.completedLessons.includes(lessonId);
    if (isNewLesson && !isPremium) { const currentCount = (userData?.dailyLimit?.date === today) ? userData.dailyLimit.count : 0; if (currentCount >= 4) { setShowLimitModal(true); return; } }
    setActiveLessonId(lessonId); setTestMode(null); setView('lesson');
  };

  const startStory = (storyId) => { const story = dailyStoryContent?.id === storyId ? dailyStoryContent : STORIES_DATA.find(s => s.id === storyId); if (story) { setActiveStory(story); setView('story'); } };

  const startTest = (mode) => {
    if (mode === 'conversation') {
        setView('conversation');
        return;
    }
    if (mode === 'levelup') {
      const levels = ["A1", "A2", "B1", "B2", "C1"]; const currentLevelIdx = levels.indexOf(userData.level || "A1"); const levelName = levels[currentLevelIdx]; const startId = (currentLevelIdx * 20) + 1; const endId = (currentLevelIdx + 1) * 20; const examContent = generateExamContent(dynamicLessonsContent, startId, endId, levelName, 9999); setDynamicLessonsContent(prev => ({ ...prev, 'exam': examContent })); setTestMode('levelup'); setActiveLessonId('exam'); setView('lesson');
    } else { setView('quiz'); }
  };

  const handleLessonComplete = async (xp, lessonContent, lessonId, finalScore = 0) => {
      const proceedToCompleteScreen = () => { setTestMode(null); setView('complete'); };
      try {
          if (testMode === 'levelup') {
              const passed = (typeof finalScore === 'number' ? finalScore : 0) >= 16;
              if (passed && currentUser) { const levels = ["A1", "A2", "B1", "B2", "C1"]; const currentLevel = userData?.level || "A1"; const currentIdx = levels.indexOf(currentLevel); const nextLevel = (currentIdx >= 0 && currentIdx < levels.length - 1) ? levels[currentIdx + 1] : currentLevel; const userRef = doc(db, "users", currentUser.uid); await updateDoc(userRef, { xp: increment(500), level: nextLevel }); setUserData(prev => ({ ...prev, level: nextLevel, xp: (prev?.xp || 0) + 500 })); } proceedToCompleteScreen(); return;
          }
          const safeContent = Array.isArray(lessonContent) ? lessonContent : []; const newItems = safeContent.filter(item => item && ['swipe', 'grammar', 'structure'].includes(item.type)); const newItemsWithSRS = newItems.map(item => ({ ...item, grade: 0, interval: 1, lastReview: new Date().toISOString() }));
          if (currentUser) { const userRef = doc(db, "users", currentUser.uid); const today = new Date().toDateString(); const currentVocab = Array.isArray(userData?.vocab) ? userData.vocab : []; const currentDaily = userData?.dailyLimit || { date: today, count: 0 }; const uniqueNewItems = newItemsWithSRS.filter(newItem => { const idExists = currentVocab.some(existing => existing.id === newItem.id); const wordExists = currentVocab.some(existing => existing.es && newItem.es && existing.es.trim().toLowerCase() === newItem.es.trim().toLowerCase()); return !idExists && !wordExists; }); const isNew = !userData.completedLessons.includes(lessonId); const newCount = (isNew && currentDaily.date === today) ? currentDaily.count + 1 : (currentDaily.date !== today ? 1 : currentDaily.count); setUserData(prev => ({ ...prev, xp: (prev?.xp || 0) + xp, streak: (prev?.streak || 0) + 1, vocab: [...currentVocab, ...uniqueNewItems], completedLessons: isNew ? [...prev.completedLessons, lessonId] : prev.completedLessons, dailyLimit: { date: today, count: newCount } })); await updateDoc(userRef, { xp: increment(xp), streak: increment(1), vocab: arrayUnion(...uniqueNewItems), completedLessons: arrayUnion(lessonId), dailyLimit: { date: today, count: newCount } }); }
      } catch (error) { console.error("ERREUR SAUVEGARDE :", error); } finally { proceedToCompleteScreen(); }
  };

const handleDownloadPDF = async (lessonId) => {
    const specificContent = dynamicLessonsContent[lessonId];
    
    if (!specificContent || !Array.isArray(specificContent)) {
        alert("Contenu non disponible pour le PDF.");
        return;
    }
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const vocab = specificContent.filter((i) => i.type === 'swipe');
      const grammar = specificContent.filter((i) => i.type === 'grammar');
      const structures = specificContent.filter((i) => i.type === 'structure');

      if (!vocab.length && !grammar.length && !structures.length) {
          alert("Cette leçon est uniquement pratique.");
          return;
      }

      // --- 1. VOCABULAIRE ---
      const vocabHtml = vocab.length ? `
        <div class="section">
            <h2 class="section-title">📚 Vocabulaire</h2>
            <div class="vocab-grid">
                ${vocab.map((item) => `
                    <div class="vocab-item">
                        <span class="es">${item.es}</span>
                        <span class="en">${item.en}</span>
                    </div>
                `).join('')}
            </div>
        </div>
      ` : '';

      // --- 2. GRAMMAIRE ---
      const grammarHtml = grammar.length ? `
        <div class="section">
            <h2 class="section-title">📐 Grammaire</h2>
            ${grammar.map((item) => `
                <div class="compact-card">
                    <div class="card-header">
                        <h3 class="card-title">${item.title}</h3>
                        <span class="card-desc">${item.description}</span>
                    </div>
                    ${item.conjugation ? `
                        <table class="mini-table">
                            ${item.conjugation.map((c) => `
                                <tr>
                                    <td class="td-pn">${c.pronoun}</td>
                                    <td class="td-vb">${c.verb}</td>
                                </tr>
                            `).join('')}
                        </table>
                    ` : ''}
                </div>
            `).join('')}
        </div>
      ` : '';

      // --- 3. STRUCTURES (Style harmonisé avec Grammaire) ---
      const structureHtml = structures.length ? `
        <div class="section">
            <h2 class="section-title">🏗️ Structures</h2>
            ${structures.map((item) => {
                const traduction = item.example_fr || item.example_en || "";
                return `
                <div class="compact-card">
                    <div class="card-header">
                        <h3 class="card-title">${item.title}</h3>
                    </div>
                    
                    <div class="struct-content">
                        <div class="struct-row border-b">
                            <span class="s-label">Formule</span>
                            <span class="s-value formula-font">${item.formula}</span>
                        </div>
                        
                        <div class="struct-row">
                            <span class="s-label">Exemple</span>
                            <div class="s-value">
                                <div class="ex-es">🇪🇸 ${item.example || item.example_es}</div>
                                ${traduction ? `<div class="ex-fr">🇫🇷 ${traduction}</div>` : ''}
                            </div>
                        </div>

                        ${item.note ? `
                        <div class="struct-note">
                            💡 ${item.note}
                        </div>` : ''}
                    </div>
                </div>
            `}).join('')}
        </div>
      ` : '';

      // --- CSS & HTML AVEC BUFFER ---
      const element = document.createElement('div');
      element.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
            
            body { 
                font-family: 'Inter', sans-serif; 
                color: #1e293b; 
                line-height: 1.5;
                padding: 40px; 
                background: #fff;
                font-size: 14px;
            }

            /* Header */
            .header { 
                display: flex; 
                justify-content: space-between; 
                align-items: flex-end; 
                border-bottom: 2px solid #e2e8f0; 
                padding-bottom: 15px; 
                margin-bottom: 30px; 
            }
            .brand { font-size: 24px; font-weight: 800; color: #0f172a; line-height: 1; }
            .brand span { color: #dc2626; }
            .lesson-text { color: #4f46e5; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }

            /* Sections */
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            .section-title { 
                font-size: 16px; 
                font-weight: 800; 
                color: #334155; 
                margin-bottom: 12px; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
                border-left: 4px solid #4f46e5; 
                padding-left: 10px; 
            }

            /* Vocabulaire */
            .vocab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .vocab-item { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px; }
            .es { font-weight: 700; color: #0f172a; font-size: 14px; }
            .en { font-size: 12px; color: #64748b; }

            /* Style Cartes (Grammaire & Structures) */
            .compact-card { 
                border: 1px solid #e2e8f0; 
                border-radius: 8px; 
                padding: 15px; 
                margin-bottom: 15px; 
                background: #fff; 
                page-break-inside: avoid; /* Évite de couper une carte en deux */
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            }
            .card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
            .card-title { margin: 0; font-size: 15px; font-weight: 800; color: #1e293b; }
            .card-desc { font-size: 12px; color: #64748b; font-style: italic; }

            .mini-table { width: 100%; border-collapse: collapse; }
            .mini-table td { padding: 4px 0; border-bottom: 1px dashed #f1f5f9; font-size: 13px; }
            .td-pn { color: #94a3b8; width: 35%; }
            .td-vb { font-weight: 600; color: #4f46e5; }

            /* Structures details */
            .struct-content { display: flex; flex-direction: column; gap: 8px; }
            .struct-row { display: flex; gap: 15px; padding: 4px 0; }
            .border-b { border-bottom: 1px dashed #f1f5f9; padding-bottom: 8px; }
            .s-label { width: 80px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; flex-shrink: 0; padding-top: 2px; }
            .s-value { flex: 1; font-size: 14px; color: #334155; }
            .formula-font { font-family: monospace; font-weight: 700; color: #4f46e5; font-size: 15px; letter-spacing: 0.5px; }
            .ex-es { font-weight: 700; color: #1e293b; }
            .ex-fr { font-style: italic; color: #64748b; font-size: 13px; margin-top: 2px; }
            .struct-note { margin-top: 5px; background: #fffbeb; color: #b45309; font-size: 12px; padding: 8px; border-radius: 6px; font-weight: 500; }

            /* Footer */
            .footer { 
                margin-top: 40px; 
                text-align: center; 
                font-size: 10px; 
                color: #cbd5e1; 
                border-top: 1px solid #f1f5f9; 
                padding-top: 15px;
                /* On force le bloc footer à ne pas être coupé */
                page-break-inside: avoid;
            }
        </style>

        <div class="header">
            <div class="brand">Español<span>Sprint</span></div>
            <div class="lesson-text">Leçon ${lessonId}</div>
        </div>

        ${vocabHtml}
        ${grammarHtml}
        ${structureHtml}

        <div class="footer">
            Fiche personnelle • Générée sur EspanolSprint.com
        </div>

        <div style="height: 50px; width: 100%;"></div>
      `;
      
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // Marges standard
        filename: `Lecon-${lessonId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();

    } catch (e) {
      console.error(e);
      alert("Erreur PDF.");
    }
  };
  // --- DÉBUT DU BLOC À COLLER ---
  
  // 1. Gérer le portail Stripe (Abonnement)
  const handlePortal = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch('/api/portal', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.uid }) 
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Accès au portail impossible.");
    } catch (e) { console.error(e); alert("Erreur de connexion."); }
  };

  // 2. Supprimer le compte
  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    if (window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Tout sera perdu.")) {
      try {
        await deleteDoc(doc(db, "users", currentUser.uid));
        await currentUser.delete();
        window.location.reload();
      } catch (e) { alert("Veuillez vous reconnecter pour supprimer votre compte."); }
    }
  };
  // --- FIN DU BLOC À COLLER ---
  const uploadFullContentToCloud = async () => { if (!confirm("ADMIN : Initialiser ?")) return; try { await setDoc(doc(db, "meta", "roadmap"), { lessons: INITIAL_LESSONS_LIST }); const contentToUpload = generateAllContent(); for (const [id, content] of Object.entries(contentToUpload)) { await setDoc(doc(db, "lessons", id), { content: content }); } alert(`✅ OK !`); window.location.reload(); } catch (e) { alert("Erreur: " + e.message); } };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-yellow-400"><Loader2 size={48} className="animate-spin text-white" /></div>;

  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      
      {/* MODAL VIES */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 relative overflow-hidden shadow-2xl border-2 border-red-100">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2 animate-pulse"><Heart size={48} className="fill-red-500" /></div>
            <div><h3 className="text-2xl font-black text-slate-900">Plus de vies ! 💔</h3><p className="text-slate-500 mt-2 font-medium">Vous avez utilisé vos 4 leçons gratuites du jour.</p></div>
            <div className="space-y-3 pt-4 border-t border-slate-100">
               <button onClick={() => { setShowLimitModal(false); handleCheckout(); }} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"><Infinity size={20} /> Vies Infinies (9.99€)</button>
               <button onClick={() => setShowLimitModal(false)} className="text-slate-400 font-bold text-sm hover:text-slate-600">Attendre demain</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREMIUM */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden shadow-2xl border-2 border-yellow-100 animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-red-500"></div>
            <button onClick={() => {setShowPremiumModal(false); setShowPromoInput(false);}} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={24}/></button>
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600 mb-4 animate-bounce"><Crown size={40} strokeWidth={2.5} /></div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">EspañolSprint <span className="text-indigo-600">Premium</span></h3>
            <p className="text-slate-500 mb-6 text-sm">Passez de "débutant" à "bilingue".</p>
            {!showPromoInput ? (
                <>
                    <ul className="text-left text-sm text-slate-700 space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Infinity size={16}/></div><span><b>Vies Infinies :</b> Apprenez sans limites.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Bot size={16}/></div><span><b>Tuteur IA :</b> Un prof privé 24/7.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Award size={16}/></div><span><b>Certificats :</b> Validez votre niveau.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Mic size={16}/></div><span><b>Mode Oral :</b> Conversation Vocale.</span></li>
                    </ul>
                    <div className="space-y-3">
                        <button id="premium-btn" onClick={handleCheckout} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] flex flex-col items-center leading-tight"><span>Essayer 7 jours gratuitement</span><span className="text-xs font-normal opacity-70">puis 9,99€/mois</span></button>
                        <div className="flex justify-between items-center px-1"><button onClick={() => setShowPremiumModal(false)} className="text-slate-400 font-bold text-xs hover:text-slate-600">Non merci</button><button onClick={() => setShowPromoInput(true)} className="text-indigo-500 font-bold text-xs hover:text-indigo-700 underline">J'ai un code promo</button></div>
                    </div>
                </>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-sm font-bold text-slate-700 mb-2">Entrez votre code d'accès :</p>
                    <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Ex: VIP2025" className="w-full p-3 border-2 border-slate-200 rounded-xl mb-4 text-center font-bold uppercase tracking-widest outline-none focus:border-indigo-500" />
                    <button onClick={async () => { if(!promoCode) return; try { const res = await fetch('/api/verify-code', { method: 'POST', body: JSON.stringify({ code: promoCode }) }); const data = await res.json(); if(data.valid) { const userRef = doc(db, "users", currentUser.uid); await updateDoc(userRef, { 'subscription.status': 'active', 'subscription.plan': 'premium_gift', 'subscription.startDate': new Date().toISOString() }); setUserData(prev => ({...prev, subscription: { status: 'active', plan: 'premium_gift' }})); setShowPremiumModal(false); setShowPromoInput(false); alert("Code validé ! Bienvenue en Premium 🌟"); } else { alert("Code invalide ❌"); } } catch(e) { alert("Erreur vérification"); } }} className="w-full bg-green-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-green-600 transition-all">Valider le code</button>
                    <button onClick={() => setShowPromoInput(false)} className="mt-4 text-slate-400 text-xs font-bold hover:text-slate-600">Annuler</button>
                </div>
            )}
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
          <SidebarDesktop userData={userData} currentView={view} onChangeView={setView} onLogout={handleLogout} onUpload={uploadFullContentToCloud}/>
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            <MobileHeader userData={userData} />
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              {/* CORRECTION : onDownloadPDF appelle handleDownloadPDF */}
              {view === 'dashboard' && <DashboardContent userData={userData} allLessons={dynamicLessonsList} onStartLesson={startLesson} onDownloadPDF={handleDownloadPDF}/>}
              {view === 'notebook' && <NotebookContent userVocab={userData.vocab} />}
              {view === 'conversation' && <ConversationMode onExit={() => setView('tests')} />}
              {view === 'quiz' && (
                <QuizZone 
                  onExit={() => setView('dashboard')} 
                  userData={userData} 
                  lessonsContent={dynamicLessonsContent} 
                  askAITutor={askAITutor} 
                />
              )}
              {view === 'structures' && <StructuresContent structures={SENTENCE_STRUCTURES} userVocab={userData?.vocab} />}
              {view === 'tests' && <TestDashboard userData={userData} onStartTest={startTest} />}
              {view === 'reading' && (
                <div className="p-6 pb-24 space-y-8 max-w-2xl mx-auto min-h-screen flex flex-col">
                    <div className="text-center space-y-2"><span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Story Mode</span><h2 className="text-3xl font-black text-slate-900">L'Histoire du Jour 📖</h2></div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        {dailyStoryContent ? (
                            <div onClick={() => startStory(dailyStoryContent.id)} className="w-full bg-white p-8 rounded-[2rem] shadow-xl border-4 border-slate-100 cursor-pointer group hover:border-pink-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-bl-2xl z-10">Niveau {dailyStoryContent.level}</div>
                                <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                                    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 shadow-inner border-4 border-white">💬</div>
                                    <div><h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">{dailyStoryContent.title}</h3><p className="text-slate-400 font-medium flex items-center justify-center gap-2"><Calendar size={16}/> Jour {dailyStoryContent.day || 1}</p></div>
                                    <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg group-hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">Lire maintenant <ChevronRight size={20}/></button>
                                </div>
                            </div>
                        ) : (<div className="flex flex-col items-center justify-center space-y-4 py-12"><Loader2 className="animate-spin text-pink-400" size={48} /><p className="text-slate-400 font-bold">Recherche de la meilleure histoire...</p></div>)}
                    </div>
                    <div className="space-y-4 pt-4 border-t border-slate-200"><h3 className="font-bold text-slate-500 uppercase text-sm">Lecture du jour (Texte)</h3><DailyReadingContent userLevel={userData?.level} /></div>
                </div>
              )}

              {view === 'story' && activeStory && <StoryEngine story={activeStory} onComplete={() => setView('reading')} />}
              {view === 'leaderboard' && <LeaderboardView userData={userData} />}
              {view === 'profile' && (
                <ProfileContent 
                  userData={userData} 
                  email={currentUser.email} 
                  onLogout={handleLogout} 
                  onUpload={uploadFullContentToCloud}
                  // 👇 AJOUTS
                  onPremium={handleCheckout} 
                  onManageSubscription={handlePortal}
                  onDeleteAccount={handleDeleteAccount}
                />
              )}
              
              {view === 'lesson' && <LessonEngine lessonId={activeLessonId} initialContent={dynamicLessonsContent[activeLessonId]} onComplete={handleLessonComplete} onExit={() => setView('dashboard')} isExam={testMode === 'levelup'} />}
              
              {/* CORRECTION : handleDownloadPDF ici aussi */}
              {view === 'complete' && <LessonComplete xp={150} onHome={() => setView('dashboard')} onDownload={() => handleDownloadPDF(activeLessonId)} isTest={!!testMode} />}
            </div>
            {view !== 'lesson' && view !== 'complete' && view !== 'story' && <MobileBottomNav currentView={view} onChangeView={setView} />}
            
            {/* --- AJOUT DU WIDGET FLOTTANT ICI --- */}
            <AITutorWidget 
                isOpen={isTutorOpen} 
                onToggle={() => setIsTutorOpen(!isTutorOpen)}
                history={chatHistory}
                onSend={(msg) => handleAskTutorWidget(null, msg)} 
                isLoading={isChatLoading}
                isPremium={userData?.subscription?.status === 'active'}
            />

          </main>
        </>
      )}
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

// NOUVEAU WIDGET TUTEUR
const AITutorWidget = ({ isOpen, onToggle, history, onSend, isLoading, isPremium }) => {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && scrollRef.current) { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }
  }, [history, isOpen]);

  const handleSubmit = (e) => { e.preventDefault(); if (!input.trim()) return; onSend(input); setInput(""); };

  if (!isPremium) return null; 

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200" style={{height: '500px', maxHeight: '80vh'}}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><Bot size={24} /></div><div><h3 className="font-bold text-sm leading-tight">Coach IA</h3><p className="text-[10px] text-indigo-100 font-medium opacity-90">Toujours disponible</p></div></div><button onClick={onToggle} className="text-white/80 hover:text-white transition-colors"><X size={20} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {history.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>{msg.text}</div></div>))}
            {isLoading && (<div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"><Loader2 size={16} className="animate-spin text-indigo-600" /></div></div>)}
          </div>
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pose ta question..." className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 font-medium" /><button type="submit" disabled={isLoading || !input.trim()} className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"><ArrowRight size={20} /></button></form>
        </div>
      )}
      <button onClick={onToggle} className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-700 rotate-90' : 'bg-gradient-to-tr from-indigo-600 to-purple-500 animate-bounce-slow'}`}>{isOpen ? <X color="white" size={24} /> : <Bot color="white" size={28} />}</button>
    </div>
  );
};

const ConversationMode = ({ onExit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, recording, processing, speaking, waiting_play
  const [history, setHistory] = useState([]);
  const [pendingAudio, setPendingAudio] = useState(null); // Stocke l'audio si l'autoplay échoue
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Fonction pour trouver le meilleur format supporté par le navigateur
  const getSupportedMimeType = () => {
    const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus", "audio/aac"];
    for (const type of types) { if (MediaRecorder.isTypeSupported(type)) return type; }
    return "";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();

      if (!mimeType) { alert("Navigateur non compatible."); return; }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size < 1000) { setStatus("idle"); return; }
        await processAudio(audioBlob, mimeType);
      };

      mediaRecorder.start(200); 
      setIsRecording(true);
      setStatus("recording");
    } catch (err) { console.error("Erreur micro:", err); alert("Vérifiez l'accès micro."); setStatus("idle"); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      setTimeout(() => {
          if (mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
          }
          setIsRecording(false);
          setStatus("processing");
      }, 500);
    }
  };

  const processAudio = async (audioBlob, mimeType) => {
    const formData = new FormData();
    let extension = "webm";
    if (mimeType.includes("mp4") || mimeType.includes("aac")) extension = "mp4";
    
    formData.append('file', audioBlob, `input.${extension}`);
    formData.append('isPremium', 'true');

    try {
      const res = await fetch('/api/conversation', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.error === "PREMIUM_REQUIRED") { alert("Premium requis !"); setStatus("idle"); return; }
      if (!data.userText || data.userText.includes("Silence détecté")) { setStatus("idle"); return; }

      setHistory(prev => [...prev, { role: 'user', text: data.userText }, { role: 'ai', text: data.aiText }]);
      
      if (data.audio) {
        const audio = new Audio(data.audio);
        audio.onended = () => { setStatus("idle"); setPendingAudio(null); };
        
        // --- CORRECTION DU BUG "NotAllowedError" ---
        try {
            setStatus("speaking");
            await audio.play(); // On tente la lecture auto
        } catch (err) {
            console.warn("Autoplay bloqué par le navigateur :", err);
            // Si bloqué, on sauvegarde l'audio et on demande à l'utilisateur de cliquer
            setPendingAudio(audio);
            setStatus("waiting_play"); 
        }
      } else {
        setStatus("idle");
      }

    } catch (e) { console.error(e); setStatus("idle"); }
  };

  // Fonction pour lancer l'audio manuellement si bloqué
  const playPendingAudio = () => {
      if (pendingAudio) {
          setStatus("speaking");
          pendingAudio.play().catch(e => console.error("Lecture impossible:", e));
      }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10"><button onClick={onExit}><X className="text-slate-400"/></button></div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-16">
         {history.length === 0 && (
           <div className="text-center mt-20 opacity-50 space-y-4">
             <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto"><Mic size={40}/></div>
             <p>Maintenez le micro pour parler.</p>
           </div>
         )}
         {history.map((msg, i) => (
           <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[80%] p-4 rounded-3xl text-lg ${msg.role === 'user' ? 'bg-indigo-600 rounded-tr-none' : 'bg-slate-800 rounded-tl-none'}`}>
               {msg.text}
             </div>
           </div>
         ))}
         {status === "processing" && <div className="flex justify-start"><div className="bg-slate-800 p-4 rounded-3xl rounded-tl-none"><Loader2 className="animate-spin"/></div></div>}
      </div>

      <div className="p-8 pb-12 flex justify-center bg-gradient-to-t from-slate-900 to-transparent">
        
        {/* CAS 1 : Lecture Bloquée -> Bouton "Écouter" */}
        {status === "waiting_play" ? (
             <button 
                onClick={playPendingAudio}
                className="w-auto px-8 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce gap-2 font-bold text-lg"
             >
                <Volume2 size={24} /> Écouter la réponse
             </button>
        ) : (
        /* CAS 2 : Bouton Micro Normal */
             <button 
                onMouseDown={startRecording} 
                onMouseUp={stopRecording} 
                onMouseLeave={stopRecording}
                onTouchStart={(e) => { e.preventDefault(); startRecording(); }} 
                onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }} 
                disabled={status === "processing" || status === "speaking"}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all select-none touch-none 
                    ${status === 'recording' ? 'bg-red-500 scale-110 ring-4 ring-red-500/30' : 
                      status === 'speaking' ? 'bg-green-500' : 'bg-indigo-600 hover:scale-105'}
                    ${(status === "processing" || status === "speaking") ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                {status === 'speaking' ? <Volume2 size={40} className="animate-pulse"/> : <Mic size={40} className="fill-white"/>}
            </button>
        )}
      </div>
      
      {status === 'recording' && <div className="absolute bottom-32 w-full text-center font-bold animate-pulse text-red-400">Je vous écoute...</div>}
      {status === 'speaking' && <div className="absolute bottom-32 w-full text-center font-bold text-green-400">L'IA parle...</div>}
      {status === 'waiting_play' && <div className="absolute bottom-32 w-full text-center font-bold text-green-400">Réponse prête !</div>}
    </div>
  );
};

const LivesCounter = ({ userData }) => {
  const isPremium = userData?.subscription?.status === 'active';
  const today = new Date().toDateString();
  const count = (userData?.dailyLimit?.date === today) ? userData?.dailyLimit?.count : 0;
  const maxLives = 4;
  const livesLeft = Math.max(0, maxLives - count);
  if (isPremium) { return (<div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1.5 rounded-full font-black shadow-sm transform hover:scale-105 transition-all"><Infinity size={20} strokeWidth={3} /><span className="text-sm">ILLIMITÉ</span></div>); }
  return (<div className="flex items-center gap-1 bg-white border border-red-100 px-3 py-1.5 rounded-full shadow-sm"><Heart size={20} className={`fill-red-500 ${livesLeft === 0 ? 'text-slate-300 fill-slate-300' : 'text-red-500'} transition-colors`} /><span className={`font-black text-sm ${livesLeft === 0 ? 'text-slate-400' : 'text-red-500'}`}>{livesLeft}</span></div>);
};

const StoryEngine = ({ story, onComplete }) => {
    const [index, setIndex] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState([story.dialogue[0]]);
    const messagesEndRef = useRef(null);
    const hasPlayedStart = useRef(false);
    const currentItem = story.dialogue[index];
    const isFinished = index >= story.dialogue.length - 1;
    const playDialogue = (msg) => { if (msg.type === 'bubble') { const character = story.characters[msg.speaker]; speak(msg.text_es, character?.voiceId); } };
    const handleNext = () => { if (isFinished) { onComplete(); return; } const nextIndex = index + 1; setIndex(nextIndex); const nextMsg = story.dialogue[nextIndex]; setVisibleMessages(prev => [...prev, nextMsg]); playDialogue(nextMsg); };
    const handleAnswer = (option) => { if (option === currentItem.answer) { handleNext(); } else { const btn = document.getElementById(`opt-${option}`); if(btn) btn.classList.add('animate-shake', 'bg-red-100', 'border-red-400'); setTimeout(() => { if(btn) btn.classList.remove('animate-shake', 'bg-red-100', 'border-red-400'); }, 500); } };
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); if(index===0 && story.dialogue[0].type === 'bubble' && !hasPlayedStart.current) { hasPlayedStart.current = true; playDialogue(story.dialogue[0]); } }, [visibleMessages]);
    return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-10"><button onClick={onComplete}><X className="text-slate-400"/></button><h3 className="font-bold text-slate-800">{story.title}</h3><div className="w-6"></div></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {visibleMessages.map((msg, i) => { if (msg.type === 'bubble') { const char = story.characters[msg.speaker]; const isMe = msg.speaker === 'pablo' || msg.speaker.includes('2'); return (<div key={i} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2`}><div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm ${char.color}`}>{char.avatar}</div><div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}><p className="font-medium text-lg">{msg.text_es}</p><p className={`text-xs mt-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>{msg.text_fr}</p></div></div>); } return null; })}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
                {currentItem.type === 'question' ? (<div className="space-y-3 animate-in slide-in-from-bottom"><p className="text-center font-bold text-slate-900 mb-2">{currentItem.question}</p><div className="grid gap-2">{currentItem.options.map((opt, idx) => (<button id={`opt-${opt}`} key={idx} onClick={() => handleAnswer(opt)} className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 font-bold text-slate-700 transition-all">{opt}</button>))}</div></div>) : (<button onClick={handleNext} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isFinished ? "Terminer" : "Continuer"}</button>)}
            </div>
        </div>
    );
};

const QuizZone = ({ onExit, userData, lessonsContent, askAITutor }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); 
  const [isReviewing, setIsReviewing] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(null);

  useEffect(() => {
    import('@/app/lib/quiz-engine').then(module => {
       const sourceContent = (lessonsContent && Object.keys(lessonsContent).length > 0) ? lessonsContent : generateAllContent();
       const generated = module.generateSuperQuiz(sourceContent, userData);
       setQuestions(generated);
    });
  }, [userData, lessonsContent]);

  if (questions.length === 0) return <div className="p-10 text-center flex items-center justify-center h-full"><Loader2 className="animate-spin mr-2"/> Chargement...</div>;
  const currentQ = questions[currentIdx];
  const handleNext = () => { setAiExplanation(null); if (currentIdx + 1 < questions.length) { setCurrentIdx(p => p + 1); } else { if (wrongAnswers.length > 0 && !isReviewing) { setIsReviewing(true); setQuestions(wrongAnswers); setWrongAnswers([]); setCurrentIdx(0); alert("🎯 Mode Correction : Révise tes erreurs !"); } else if (wrongAnswers.length > 0 && isReviewing) { setQuestions(wrongAnswers); setWrongAnswers([]); setCurrentIdx(0); } else { onExit(); } } };
  const handleScore = (isCorrect) => { if (!isCorrect) setWrongAnswers(prev => [...prev, currentQ]); };
  
  const askAI = async () => { setAiExplanation("..."); const exp = await askAITutor(currentQ.question); setAiExplanation(exp); };

  return (
    <div className="h-full flex flex-col bg-slate-50">
       <div className="px-6 py-4 bg-white border-b flex items-center justify-between"><button onClick={onExit}><X className="text-slate-400"/></button><div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 transition-all" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} /></div>{isReviewing && <div className="text-red-500 font-bold flex items-center gap-1"><RotateCcw size={16}/> Révision</div>}</div>
       <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full space-y-6">
           {currentQ.type === 'listening' ? <ListeningCard data={currentQ} onNext={handleNext} onScore={handleScore} /> : <InputCard data={currentQ} onNext={handleNext} onScore={handleScore} isExam={false} />}
           <button onClick={askAI} className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100"><Bot size={18}/> {aiExplanation ? "Explication reçue" : "Explique-moi (IA)"}</button>
           {aiExplanation && <div className="bg-white border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-sm text-sm text-slate-600 animate-in slide-in-from-bottom">{aiExplanation}</div>}
       </div>
    </div>
  );
};

const ListeningCard = ({ data, onNext, onScore }) => { 
    const [val, setVal] = useState(''); const [status, setStatus] = useState('idle'); const [revealed, setRevealed] = useState(false); 
    useEffect(() => { speak(data.audioText); }, [data]); 
    const check = (e) => { e.preventDefault(); const cleanVal = val.trim().toLowerCase().replace(/[¿¡!.,]/g, ''); const cleanAns = data.correctAnswer.toLowerCase().replace(/[¿¡!.,]/g, ''); const correct = cleanVal === cleanAns; setStatus(correct ? 'success' : 'error'); setRevealed(true); if(onScore) onScore(correct); if (correct) { setTimeout(onNext, 1500); } }; 
    return (<div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-6 w-full animate-in zoom-in"><span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Écoute</span><button onClick={() => speak(data.audioText)} className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all animate-pulse"><Ear size={40} /></button>{revealed && <p className="text-2xl font-black text-purple-600 text-center">{data.audioText}</p>}<form onSubmit={check} className="w-full space-y-4"><input value={val} onChange={e => setVal(e.target.value)} placeholder="Écris ce que tu entends..." className={`w-full p-4 border-2 rounded-xl text-center font-bold outline-none ${status === 'error' ? 'border-red-400 bg-red-50' : status === 'success' ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-purple-400'}`} disabled={revealed && status === 'success'} /><button type="submit" disabled={!val} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">{status === 'error' ? 'Continuer' : 'Vérifier'}</button>{status === 'error' && <button type="button" onClick={onNext} className="w-full py-2 text-slate-400 font-bold">Passer</button>}</form></div>); 
};

const LeaderboardView = ({ userData }) => { const rivals = [{ name: "Maria L.", xp: 1450, avatar: "👩" }, { name: "Thomas B.", xp: 1200, avatar: "👨" }, { name: userData?.name + " (Toi)", xp: userData?.xp || 0, avatar: "😎", isMe: true }, { name: "Juan P.", xp: 850, avatar: "🧔" }].sort((a, b) => b.xp - a.xp); return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-6"><div className="text-center space-y-2 mb-8"><div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 mb-2"><Trophy size={40} /></div><h2 className="text-3xl font-black text-slate-900">Ligue Diamant</h2><p className="text-slate-500 font-medium">Fin dans 2j 4h</p></div><div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">{rivals.map((user, idx) => (<div key={idx} className={`flex items-center gap-4 p-4 border-b border-slate-50 ${user.isMe ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}`}><div className="font-black text-slate-300 w-6">{idx + 1}</div><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</div><div className="flex-1 font-bold text-slate-800">{user.name}</div><div className="font-black text-slate-900">{user.xp} XP</div></div>))}</div></div>); };
const LessonComplete = ({ xp, onHome, onDownload, isTest }) => (<div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in"><div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div><div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">{isTest ? "Examen Réussi !" : "Increíble!"}</h2><p className="text-xl text-yellow-900 font-bold opacity-80">{isTest ? "Niveau Validé" : "Leçon terminée !"}</p></div><div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div><div className="flex flex-col gap-4 w-full max-w-sm"><button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"><Download size={20} /> Télécharger PDF</button><button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl">Continuer</button></div></div>);
const DailyReadingContent = ({ userLevel }) => { const reading = getDailyReading(userLevel); const [trans, setTrans] = useState(false); return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8"><div className="text-center"><span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase">Lecture du jour</span><h2 className="text-3xl font-black text-slate-900 mt-2">{reading.title_es}</h2></div><div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-slate-100 relative overflow-hidden group"><div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Español</div><button onClick={() => speak(reading.text_es)} className="absolute top-6 right-6 p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"><Volume2 size={20} /></button><p className="text-xl text-slate-800 leading-relaxed font-medium mt-4">{reading.text_es}</p></div><div className="flex justify-center"><button onClick={() => setTrans(!trans)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">{trans ? <><X size={16}/> Masquer</> : <><Check size={16}/> Traduction</>}</button></div>{trans && <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200"><h4 className="text-lg font-bold text-slate-700 mb-2">{reading.title_fr}</h4><p className="text-slate-600 leading-relaxed">{reading.text_fr}</p></div>}</div>); };
const LandingPage = ({ onStart }) => (<div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center"><div className="z-10 space-y-8 max-w-md"><div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div><div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div><button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button></div></div>);
const AuthScreen = ({ onAuth, onGoogle, onBack, error }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}<div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (<div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6"><nav className="flex-1 space-y-2"><div className="flex items-center gap-2 mb-8 px-2"><Image src="/logo.svg" width={32} height={32} alt="Logo"/><span className="text-xl font-black tracking-tighter">Español<span className="text-red-600">Sprint</span></span></div><SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><SidebarLink icon={MessageCircle} label="Histoires" active={currentView === 'reading' || currentView === 'story'} onClick={() => onChangeView('reading')} /><SidebarLink icon={Trophy} label="Classement" active={currentView === 'leaderboard'} onClick={() => onChangeView('leaderboard')} /><SidebarLink icon={BrainCircuit} label="Entraînement" active={currentView === 'tests' || currentView === 'quiz'} onClick={() => onChangeView('tests')} /><SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></nav></div>);
const MobileHeader = ({ userData }) => (<div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div><LivesCounter userData={userData}/></div><div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div></div>);
const MobileBottomNav = ({ currentView, onChangeView }) => (<div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30"><NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><NavBtn icon={MessageCircle} label="Histoires" active={currentView === 'reading' || currentView === 'story'} onClick={() => onChangeView('reading')} /><NavBtn icon={BrainCircuit} label="Entraînement" active={currentView === 'tests' || currentView === 'quiz'} onClick={() => onChangeView('tests')} /><NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></div>);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const ProfileContent = ({ userData, email, onLogout, onUpload, onPremium, onManageSubscription, onDeleteAccount }) => {
  const isPremium = userData?.subscription?.status === 'active';

  return (
    <div className="max-w-2xl mx-auto w-full p-6 pb-32 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Mon Compte</h2>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        
        {/* INFO UTILISATEUR */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white shadow-sm">
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
                <p className="font-black text-slate-900 text-xl">{userData?.name || "Utilisateur"}</p>
                {isPremium && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">PRO</span>}
            </div>
            <p className="text-slate-400 text-sm font-medium">{email}</p>
          </div>
        </div>

        {/* STATISTIQUES */}
        <div className="grid grid-cols-3 gap-4 text-center py-6 border-y border-slate-50">
            <div><p className="text-2xl font-black text-slate-900">{userData?.xp || 0}</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">XP</p></div>
            <div><p className="text-2xl font-black text-slate-900">{userData?.streak || 0} 🔥</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Série</p></div>
            <div><p className="text-2xl font-black text-slate-900">{userData?.level || "A1"}</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Niveau</p></div>
        </div>

        {/* ABONNEMENT */}
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">👑 Abonnement</h4>
            {!isPremium ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                    <p className="text-sm text-slate-500">Débloquez la puissance de l'IA.</p>
                    <button onClick={onPremium} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-all">
                        💎 Devenir Premium
                    </button>
                </div>
            ) : (
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex flex-col gap-3">
                    <p className="text-sm text-yellow-800 font-bold">✅ Abonnement Actif</p>
                    <button onClick={onManageSubscription} className="w-full bg-white text-yellow-700 border border-yellow-200 py-3 rounded-xl font-bold text-sm">
                        Gérer mon abonnement / Résilier
                    </button>
                </div>
            )}
        </div>

        {/* ACTIONS & DANGER */}
        <div className="space-y-3 pt-4 border-t border-slate-50">
            <button onClick={onUpload} className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100 text-sm"><CloudUpload size={18} /> Réinitialiser (Admin)</button>
            <button onClick={onLogout} className="w-full text-slate-500 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"><LogOut size={18} /> Se déconnecter</button>
        </div>
        <div className="text-center pt-4">
            <button onClick={onDeleteAccount} className="text-red-300 text-xs font-bold hover:text-red-500 transition-colors px-4 py-2">Supprimer mon compte</button>
        </div>
      </div>
    </div>
  );
};
const DashboardContent = ({ userData, allLessons, onStartLesson, onDownloadPDF }) => { 
  const levels = ["A1", "A2", "B1", "B2", "C1"]; 
  const safeLevel = (userData.level && levels.includes(userData.level)) ? userData.level : "A1"; 
  const currentLevelIndex = levels.indexOf(safeLevel); 
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 md:p-8 shrink-0 flex justify-between items-end">
        <div><h2 className="text-3xl font-black text-slate-900 mb-2">Ton Parcours</h2><p className="text-slate-500">Niveau actuel : <span className="text-indigo-600 font-bold">{safeLevel}</span></p></div>
        <div className="hidden md:block"><LivesCounter userData={userData}/></div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 pb-6 snap-x snap-mandatory flex gap-6 md:gap-10 items-start">
        {levels.map((level, index) => { 
          const isLocked = index > currentLevelIndex; 
          const isCurrent = index === currentLevelIndex; 
          const isCompleted = index < currentLevelIndex; 
          const levelLessons = allLessons.filter(l => l.level === level); 
          return (
            <div key={level} className={`snap-center shrink-0 w-[85vw] md:w-[380px] h-[calc(100dvh-240px)] md:h-[calc(100vh-200px)] flex flex-col rounded-3xl border-4 ${isCurrent ? 'border-yellow-400 bg-white' : isCompleted ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 opacity-60'} p-5 md:p-6 relative overflow-hidden transition-all shadow-sm`}>
              <div className="flex justify-between items-center mb-5 shrink-0"><div><h3 className="text-2xl font-black text-slate-800">Niveau {level}</h3><p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{isCompleted ? 'Terminé' : isCurrent ? 'En cours' : 'Verrouillé'}</p></div>{isLocked && <Lock size={24} className="text-slate-400" />}{isCompleted && <div className="bg-green-500 text-white p-1.5 rounded-full"><Check size={18} /></div>}</div>
              <div className="flex-1 overflow-y-auto space-y-3 pb-4 pr-2 custom-scrollbar">{levelLessons.map((lesson) => { const isLessonDone = userData.completedLessons.includes(lesson.id); const isAccessible = isCurrent && (isLessonDone || userData.completedLessons.includes(lesson.id - 1) || lesson.id === levelLessons[0].id); if (isCompleted) { return (<div key={lesson.id} className="w-full flex gap-2 group"><button onClick={() => onStartLesson(lesson.id)} className="flex-1 p-4 rounded-2xl bg-green-100 text-green-800 flex items-center gap-3 hover:bg-green-200 transition-colors"><CheckCircle size={18} className="shrink-0" /><span className="text-sm font-bold truncate flex-1 text-left">{lesson.title}</span><span className="text-[10px] uppercase font-bold opacity-60 group-hover:opacity-100 hidden sm:inline">Réviser</span></button><button onClick={() => onDownloadPDF(lesson.id)} className="p-4 rounded-2xl bg-white border-2 border-green-100 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all" title="Télécharger PDF"><Download size={20} /></button></div>); } return (<button key={lesson.id} disabled={!isAccessible} onClick={() => onStartLesson(lesson.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all ${isLessonDone ? 'bg-green-500 text-white shadow-md' : isAccessible ? 'bg-yellow-400 text-slate-900 shadow-lg scale-[1.02] font-bold ring-4 ring-yellow-100' : 'bg-slate-200 text-slate-400'}`}><div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0">{isLessonDone ? <Check size={16} /> : lesson.id}</div><div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{lesson.title}</p></div>{isAccessible && !isLessonDone && <PlayCircle size={22} className="shrink-0" />}</button>); })}</div>
              {isLocked && (<div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center z-10"><div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-slate-100"><Lock size={32} className="mx-auto text-slate-300 mb-2" /><h4 className="font-bold text-slate-800">Niveau Bloqué</h4></div></div>)}
            </div>
          ); 
        })}
        <div className="w-4 shrink-0"></div>
      </div>
    </div>
  ); 
};

// --- NOUVEAU DASHBOARD ENTRAÎNEMENT ---
const TestDashboard = ({ userData, onStartTest }) => { 
    const levels = ["A1", "A2", "B1", "B2", "C1"]; 
    const currentIdx = levels.indexOf(userData.level || "A1"); 
    const nextLevel = levels[currentIdx + 1]; 
    const lessonsDone = userData.completedLessons.length; 
    const canTakeExam = lessonsDone >= (currentIdx + 1) * 20; 
    
    return (
        <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Zone Test 🧠</h2>
                <p className="text-slate-500">Valide tes acquis.</p>
            </div>
            
            {/* CARTE 1: Entraînement Rapide */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group" onClick={() => onStartTest('training')}>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <BrainCircuit size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">Entraînement Rapide</h3>
                        <p className="text-sm text-slate-500 mt-1">Révision intelligente.</p>
                    </div>
                    <ChevronRight className="text-slate-300" />
                </div>
            </div>

            {/* CARTE 2: COACH ORAL (Premium) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden" onClick={() => onStartTest('conversation')}>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                        <Mic size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">Coach Oral IA</h3>
                        <p className="text-sm text-slate-500 mt-1">Améliore ta prononciation.</p>
                    </div>
                    <ChevronRight className="text-slate-300" />
                </div>
                {/* Badge Premium */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-bl-xl z-20">PREMIUM</div>
            </div>

            {/* CARTE 3: EXAMEN PASSAGE DE NIVEAU */}
            <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all relative overflow-hidden ${!canTakeExam ? 'opacity-60 grayscale' : 'cursor-pointer hover:shadow-md group'}`} onClick={() => canTakeExam && onStartTest('levelup')}>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:rotate-6 transition-transform">
                        <Target size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">Examen {nextLevel}</h3>
                        <p className="text-sm text-slate-500 mt-1">Passage de niveau.</p>
                    </div>
                    {canTakeExam ? <ChevronRight className="text-slate-300" /> : <Lock className="text-slate-300" />}
                </div>
                {!canTakeExam && <div className="absolute bottom-2 right-4 text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded">Finis le niveau d'abord</div>}
            </div>
        </div>
    ); 
};

const StructuresContent = ({ structures, userVocab }) => { const safeList = Array.isArray(userVocab) ? userVocab : []; const learnedStructures = safeList.filter(item => item && item.type === 'structure'); const allStructures = [...structures, ...learnedStructures]; const uniqueStructures = allStructures.filter((item, index, self) => index === self.findIndex((t) => t.title === item.title)); return (<div className="max-w-3xl mx-auto w-full p-6 pb-24"><h2 className="text-3xl font-black text-slate-900 mb-8">Structures de Phrases 🏗️</h2><div className="space-y-6">{uniqueStructures.map((struct, idx) => (<div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"><div className="flex items-center gap-3 mb-4"><div className="p-2 bg-yellow-100 rounded-lg text-yellow-700"><Hammer size={20} /></div><h3 className="text-xl font-bold text-slate-900">{struct.title}</h3></div><div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-indigo-600 font-bold mb-4 text-center border border-slate-100">{struct.formula}</div><div className="space-y-2 mb-4">{struct.example_es ? (<><p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example_es}</p><p className="text-sm text-slate-400">🇫🇷 {struct.example_en}</p></>) : (<><p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example}</p></>)}</div><p className="text-sm text-slate-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100">💡 {struct.explanation || struct.note}</p></div>))}{uniqueStructures.length === 0 && (<div className="text-center text-slate-400 py-10"><p>Aucune structure découverte pour le moment.</p><p className="text-sm">Avance dans les leçons pour en débloquer !</p></div>)}</div></div>); };
const NotebookContent = ({ userVocab }) => { const [activeTab, setActiveTab] = useState('vocab'); const safeVocab = Array.isArray(userVocab) ? userVocab : []; const vocabItems = safeVocab.filter(item => item.type === 'swipe'); const grammarItems = safeVocab.filter(item => item.type === 'grammar'); const structureItems = safeVocab.filter(item => item.type === 'structure'); return (<div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24 space-y-6"><h2 className="text-3xl font-black text-slate-900">Mon Lexique 📚</h2><div className="flex space-x-2 bg-slate-100 p-1 rounded-xl">{['vocab', 'grammar', 'structure'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{tab === 'vocab' && 'Vocabulaire'}{tab === 'grammar' && 'Grammaire'}{tab === 'structure' && 'Structures'}</button>))}</div>{activeTab === 'vocab' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{vocabItems.length > 0 ? vocabItems.map((item, idx) => (<div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center"><div><p className="font-bold text-slate-800">{item.es}</p><p className="text-xs text-slate-400 italic">{item.context}</p></div><p className="text-indigo-600 font-medium">{item.en}</p></div>)) : <p className="text-slate-400 text-center col-span-2 py-10">Rien ici pour l'instant.</p>}</div>)}{activeTab === 'grammar' && (<div className="space-y-4">{grammarItems.length > 0 ? grammarItems.map((item, idx) => (<div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"><h4 className="font-bold text-lg text-indigo-600 mb-2">{item.title}</h4><p className="text-slate-600 mb-4 text-sm">{item.description}</p><div className="grid grid-cols-2 gap-2 text-sm">{item.conjugation && item.conjugation.map((row, rIdx) => (<div key={rIdx} className="flex justify-between bg-slate-50 p-2 rounded"><span className="text-slate-400">{row.pronoun}</span><span className="font-bold text-slate-800">{row.verb}</span></div>))}</div></div>)) : <p className="text-slate-400 text-center py-10">Aucune règle de grammaire sauvée.</p>}</div>)}{activeTab === 'structure' && (<div className="grid gap-6">{structureItems.length > 0 ? structureItems.map((item, idx) => (<div key={idx} className="group relative bg-white overflow-hidden rounded-3xl border-2 border-slate-100 hover:border-indigo-100 transition-all shadow-sm hover:shadow-md"><div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div><div className="relative p-6"><div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 bg-white border-2 border-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><Hammer size={24} /></div><div><h4 className="font-black text-xl text-slate-800 leading-tight">{item.title}</h4><span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Grammaire</span></div></div><div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 flex flex-col items-center text-center relative overflow-hidden"><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 z-10">Construction</span><code className="font-mono text-lg md:text-xl font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border-b-4 border-indigo-100 shadow-sm z-10">{item.formula}</code></div><div className="space-y-3"><div className="flex gap-4 items-start pl-2"><div className="w-1 h-12 bg-green-400 rounded-full shrink-0 mt-1"></div><div><p className="text-xs font-bold text-slate-400 uppercase mb-1">Exemple</p><p className="text-lg font-medium text-slate-700 italic">"{item.example}"</p></div></div>{item.note && (<div className="mt-4 bg-yellow-50 p-3 rounded-xl border border-yellow-100 flex gap-3 items-start"><span className="text-lg">💡</span><p className="text-sm text-yellow-800 font-medium leading-relaxed">{item.note}</p></div>)}</div></div></div>)) : (<div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center"><div className="p-4 bg-white rounded-full shadow-sm mb-4"><Hammer className="h-8 w-8 text-slate-300" /></div><p className="text-slate-900 font-bold text-lg">Aucune structure découverte</p><p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">Avance dans les leçons pour débloquer tes premières fiches de construction de phrases !</p></div>)}</div>)}</div>); };