/* eslint-disable */
// @ts-nocheck
'use client';

import { INITIAL_LESSONS_LIST } from '@/app/lib/curriculum';
import { speak, setPremiumVoices } from '@/app/lib/audio';
import { loadContent } from '@/app/lib/content-loader';
import { auth, db, googleProvider, authFetch } from '@/app/lib/firebase-client';

// Composants modulaires existants
import LessonEngine from '@/app/components/LessonEngine';
import { InputCard } from '@/app/components/LessonCards';

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';

import { 
  Flame, ChevronRight, X, Check, Trophy, User, LogOut, PlayCircle, Lock, 
  LayoutDashboard, Library, Loader2, CloudUpload, Volume2, 
  Download, Hammer, ArrowRight, RotateCcw, CheckCircle, BrainCircuit, Target, 
  MessageCircle, Ear, Bot, Calendar, Crown, Heart, Infinity, Mic, Zap, BookOpen, Sparkles
} from 'lucide-react';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, deleteDoc, arrayUnion, increment, collection, getDocs } from "firebase/firestore";

// --- CONSTANTES PRODUIT ---
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const FREE_LESSONS_PER_DAY = 4;
const MONTHLY_PRICE = "4,99 €";
const YEARLY_ENABLED = process.env.NEXT_PUBLIC_STRIPE_YEARLY_ENABLED === 'true';
const YEARLY_PRICE = process.env.NEXT_PUBLIC_YEARLY_PRICE_LABEL || "39,99 €";
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const yesterdayKey = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };

// Messages d'erreur Firebase traduits en français clair
const AUTH_ERRORS = {
  'auth/invalid-email': "Cette adresse e-mail n'est pas valide.",
  'auth/user-not-found': "Aucun compte ne correspond à cette adresse e-mail.",
  'auth/wrong-password': "Le mot de passe est incorrect.",
  'auth/invalid-credential': "L'adresse e-mail ou le mot de passe est incorrect.",
  'auth/email-already-in-use': "Un compte existe déjà avec cette adresse e-mail. Connecte-toi !",
  'auth/weak-password': "Le mot de passe doit contenir au moins 6 caractères.",
  'auth/too-many-requests': "Trop de tentatives. Réessaie dans quelques minutes.",
  'auth/popup-closed-by-user': "La fenêtre de connexion a été fermée avant la fin.",
  'auth/operation-not-allowed': "L'inscription par e-mail est momentanément indisponible. Utilise « Continuer avec Google ».",
  'auth/network-request-failed': "Problème de connexion Internet. Réessaie.",
};
const authErrorMessage = (error) => { if (!AUTH_ERRORS[error?.code]) console.error('Erreur auth non traduite :', error?.code, error?.message); return AUTH_ERRORS[error?.code] || "Une erreur est survenue. Réessaie dans un instant."; };

// --- DONNÉES DU TEST DE NIVEAU (20 QUESTIONS) ---
const PLACEMENT_TEST = [
  // A1 (Débutant)
  { id: 1, q: "Comment dit-on « bonjour » en espagnol ?", options: ["Hola", "Adiós", "Gracias", "Por favor"], ans: "Hola" },
  { id: 2, q: "Yo ___ español.", options: ["hablo", "habla", "hablas", "hablan"], ans: "hablo" },
  { id: 3, q: "¿Cómo ___ llamas?", options: ["te", "se", "me", "le"], ans: "te" },
  { id: 4, q: "La casa es ___.", options: ["grande", "grandes", "grando", "granda"], ans: "grande" },
  { id: 5, q: "Ellos ___ mis amigos. (être)", options: ["son", "están", "es", "sois"], ans: "son" },

  // A2 (Élémentaire)
  { id: 6, q: "Ayer yo ___ al cine. (aller)", options: ["fui", "iba", "voy", "he ido"], ans: "fui" },
  { id: 7, q: "Nosotros ___ en Madrid.", options: ["vivimos", "viven", "vivo", "vivís"], ans: "vivimos" },
  { id: 8, q: "Voy a comprar ___ manzanas.", options: ["unas", "uno", "una", "un"], ans: "unas" },
  { id: 9, q: "¿___ hora es?", options: ["Qué", "Cuál", "Cómo", "Dónde"], ans: "Qué" },
  { id: 10, q: "Me gusta ___ la música.", options: ["escuchar", "escucho", "escuchando", "escucha"], ans: "escuchar" },

  // B1 (Intermédiaire)
  { id: 11, q: "Busco una persona que ___ hablar japonés.", options: ["sepa", "sabe", "sabrá", "supo"], ans: "sepa" },
  { id: 12, q: "Si ___ tiempo, viajaría más.", options: ["tuviera", "tengo", "tendría", "tenga"], ans: "tuviera" },
  { id: 13, q: "Es importante que ___ a tiempo.", options: ["llegues", "llegas", "llegarás", "llegaste"], ans: "llegues" },
  { id: 14, q: "Hemos ___ el trabajo. (finir)", options: ["terminado", "terminar", "terminando", "terminó"], ans: "terminado" },
  { id: 15, q: "Que signifie l'expression « estar en las nubes » ?", options: ["Être dans la lune", "Être pilote", "Être mort", "Être grand"], ans: "Être dans la lune" },

  // B2 (Avancé)
  { id: 16, q: "Aunque ___, saldré a correr. (pleuvoir)", options: ["llueva", "llueve", "lloverá", "llovía"], ans: "llueva" },
  { id: 17, q: "No creo que él ___ la verdad.", options: ["diga", "dice", "dirá", "dijo"], ans: "diga" },
  { id: 18, q: "Ojalá ___ mañana. (venir)", options: ["venga", "viene", "vendrá", "venía"], ans: "venga" },
  { id: 19, q: "Que signifie l'expression « tomar el pelo » ?", options: ["Se moquer de quelqu'un", "Aller chez le coiffeur", "Avoir peur", "Être chauve"], ans: "Se moquer de quelqu'un" },
  { id: 20, q: "Si hubieras estudiado, ___ el examen.", options: ["habrías aprobado", "habrás aprobado", "hubieras aprobado", "apruebas"], ans: "habrías aprobado" }
];

// --- COMPOSANT PRINCIPAL ---
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [authError, setAuthError] = useState(""); 
  const [authStartsWithSignUp, setAuthStartsWithSignUp] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [testMode, setTestMode] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  const [dailyStoryContent, setDailyStoryContent] = useState(null);
  const [lastResult, setLastResult] = useState({ xp: 0, isTest: false, passed: true, score: 0 });
  const [toast, setToast] = useState(null);

  // Promo & abonnement
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [billingPlan, setBillingPlan] = useState(YEARLY_ENABLED ? 'yearly' : 'monthly');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Contenu (chargé à la demande pour ne pas ralentir l'accueil)
  const [lib, setLib] = useState(null);
  const [dynamicLessonsList, setDynamicLessonsList] = useState(INITIAL_LESSONS_LIST);
  const [dynamicLessonsContent, setDynamicLessonsContent] = useState({});
  const lessonsListRef = useRef(INITIAL_LESSONS_LIST);
  const pendingIntent = useRef(null); // Lien profond : /?startLesson=3, /?startStory=..., /?signup=true

  // --- ÉTATS TUTEUR IA (WIDGET) ---
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
      { role: 'ai', text: "¡Hola! Je suis ton coach personnel. Pose-moi une question sur l'espagnol !" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const isPremium = userData?.subscription?.status === 'active';
  const notify = (text, type = 'success') => { setToast({ text, type }); setTimeout(() => setToast(null), 4500); };

  useEffect(() => { setPremiumVoices(isPremium); }, [isPremium]);

  // Envoie une question au coach IA. Le quota gratuit est contrôlé côté serveur.
  const askAITutor = async (question, history = []) => {
      try {
          const res = await authFetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: question, history }) });
          const data = await res.json();
          if (data.error === "LIMIT_REACHED") { setShowPremiumModal(true); return data.reply; }
          return data.reply || "Désolé, je n'ai pas réussi à joindre le coach. Réessaie dans un instant.";
      } catch (e) { return "Problème de connexion. Vérifie ton réseau et réessaie."; }
  };

  const handleAskTutorWidget = async (userMsg) => {
      if (!userMsg || !userMsg.trim()) return;
      const previous = chatHistory.slice(1);
      setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
      setIsChatLoading(true);
      const reply = await askAITutor(userMsg, previous);
      setChatHistory(prev => [...prev, { role: 'ai', text: reply }]);
      setIsChatLoading(false);
  };

  const applyLevelToProfile = async (newLevel) => {
      if (!currentUser) return;
      setLoading(true);
      try {
          const targetIdx = LEVELS.indexOf(newLevel);
          const levelsToUnlock = LEVELS.slice(0, targetIdx);
          const lessonsToValidate = dynamicLessonsList.filter(l => levelsToUnlock.includes(l.level)).map(l => l.id);
          const alreadyDone = userData?.completedLessons || [];
          const newlyValidated = lessonsToValidate.filter(id => !alreadyDone.includes(id));
          const bonusXP = newlyValidated.length * 50;

          const update = { level: newLevel, xp: increment(bonusXP) };
          if (newlyValidated.length) update.completedLessons = arrayUnion(...newlyValidated);
          await updateDoc(doc(db, "users", currentUser.uid), update);

          setUserData(prev => ({ ...prev, level: newLevel, completedLessons: [...alreadyDone, ...newlyValidated], xp: (prev.xp || 0) + bonusXP }));
          notify(`Bravo ! Ton niveau est maintenant ${newLevel}.`);
          setView('dashboard');
      } catch (e) {
          console.error(e);
          notify("Impossible de mettre à jour ton niveau. Réessaie.", 'error');
      } finally {
          setLoading(false);
      }
  };

  // INITIALISATION (un seul écouteur d'authentification)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('startLesson')) pendingIntent.current = { type: 'lesson', id: parseInt(params.get('startLesson')) };
    else if (params.get('startStory')) pendingIntent.current = { type: 'story', id: params.get('startStory') };
    if (params.get('signup') === 'true') setAuthStartsWithSignUp(true);

    // Un utilisateur déjà connu voit le chargement ; un visiteur voit tout de suite la page d'accueil.
    let knownUser = false;
    try { knownUser = localStorage.getItem('es_user') === '1'; } catch (e) {}
    if (knownUser) setLoading(true);
    else if (pendingIntent.current || params.get('signup') === 'true') setView('auth');

    const loadLessons = async () => {
      try {
        const [content, roadmapSnap, lessonsSnapshot] = await Promise.all([
          loadContent(),
          getDoc(doc(db, "meta", "roadmap")).catch(() => null),
          getDocs(collection(db, "lessons")).catch(() => null),
        ]);
        setLib(content);
        if (roadmapSnap?.exists()) { lessonsListRef.current = roadmapSnap.data().lessons; setDynamicLessonsList(roadmapSnap.data().lessons); }
        const lessonsData = {};
        lessonsSnapshot?.forEach((d) => { lessonsData[d.id] = d.data().content; });
        setDynamicLessonsContent({ ...content.generateAllContent(), ...lessonsData });
      } catch (e) { console.error("Erreur de chargement du contenu", e); }
    };

    const initApp = async (user) => {
      if (!user) {
        try { localStorage.removeItem('es_user'); } catch (e) {}
        setCurrentUser(null); setUserData(null);
        setView(v => (v === 'auth' || v === 'levelTest') ? v : 'landing');
        setLoading(false);
        return;
      }

      try { localStorage.setItem('es_user', '1'); } catch (e) {}
      setLoading(true);
      setCurrentUser(user);
      const userRef = doc(db, "users", user.uid);

      // Retour de Stripe : le serveur vérifie le paiement avant d'activer le Premium.
      let paymentConfirmed = false;
      if (params.get('payment') === 'success' && params.get('session_id')) {
          try {
              const res = await authFetch('/api/confirm-payment', { method: 'POST', body: JSON.stringify({ sessionId: params.get('session_id') }) });
              paymentConfirmed = res.ok;
          } catch (e) { console.error("Erreur d'activation Premium", e); }
      }
      if (params.get('payment')) window.history.replaceState(null, '', '/');

      try {
        const userSnap = await getDoc(userRef);
        let profile;
        if (userSnap.exists()) {
            profile = userSnap.data();
            // Série interrompue : aucun jour d'activité hier ni aujourd'hui
            if (profile.lastActive && profile.lastActive !== dayKey() && profile.lastActive !== yesterdayKey()) profile = { ...profile, streak: 0 };
        } else {
            // Nouveau compte : on applique le niveau détecté par le test (s'il a été passé avant l'inscription)
            let startLevel = "A1";
            try { startLevel = localStorage.getItem('tempLevel') || "A1"; localStorage.removeItem('tempLevel'); } catch (e) {}
            if (!LEVELS.includes(startLevel)) startLevel = "A1";
            const levelsToUnlock = LEVELS.slice(0, LEVELS.indexOf(startLevel));
            const unlockedLessons = lessonsListRef.current.filter(l => levelsToUnlock.includes(l.level)).map(l => l.id);
            profile = { 
                name: user.displayName || user.email.split('@')[0], 
                email: user.email,
                xp: unlockedLessons.length * 50, 
                streak: 0, 
                level: startLevel,
                vocab: [], 
                completedLessons: unlockedLessons,
                dailyLimit: { date: new Date().toDateString(), count: 0 }, 
                dailyStory: { date: "", storyId: "" }, 
                readStories: [], 
                subscription: { status: 'free' },
                createdAt: new Date().toISOString(),
            };
            await setDoc(userRef, profile); 
        }
        setUserData(profile);
        setView('dashboard');
        if (paymentConfirmed) notify("🎉 Félicitations ! Ton compte est maintenant Premium.");
        else if (params.get('payment') === 'success') notify("Le paiement n'a pas pu être confirmé. Contacte-nous si tu as été débité.", 'error');
      } catch (error) {
        console.error(error);
        notify("Impossible de charger ton profil. Vérifie ta connexion.", 'error');
      }
      setLoading(false);
      loadLessons(); // En arrière-plan : le tableau de bord s'affiche sans attendre
    };

    const unsubscribe = onAuthStateChanged(auth, initApp);
    return () => unsubscribe();
  }, []);

  // HISTOIRE DU JOUR
  useEffect(() => {
    const assignDailyStory = async () => {
        const STORIES_DATA = lib.STORIES_DATA;
        const today = new Date().toDateString();
        const currentDaily = userData.dailyStory; 
        if (currentDaily?.date === today) { const existingStory = STORIES_DATA.find(s => s.id === currentDaily.storyId); if (existingStory) { setDailyStoryContent(existingStory); return; } }
        const allowedLevels = LEVELS.slice(0, LEVELS.indexOf(userData.level || "A1") + 1);
        const validStories = STORIES_DATA.filter(s => allowedLevels.includes(s.level));
        let candidates = validStories.filter(s => !(userData.readStories || []).includes(s.id));
        if (candidates.length === 0) candidates = validStories;
        if (candidates.length === 0) return;
        const randomStory = candidates[Math.floor(Math.random() * candidates.length)];
        try {
            await updateDoc(doc(db, "users", currentUser.uid), { dailyStory: { date: today, storyId: randomStory.id }, readStories: arrayUnion(randomStory.id) });
            setUserData(prev => ({ ...prev, dailyStory: { date: today, storyId: randomStory.id }, readStories: [...(prev.readStories || []), randomStory.id] }));
            setDailyStoryContent(randomStory);
        } catch (e) { console.error("Erreur histoire du jour :", e); }
    };
    if (!loading && userData && currentUser && lib) assignDailyStory();
  }, [userData?.dailyStory?.date, currentUser, loading, lib]);

  // Liens profonds (pages leçon / histoire du site → application)
  useEffect(() => {
    const intent = pendingIntent.current;
    if (!intent || !userData || !lib) return;
    pendingIntent.current = null;
    window.history.replaceState(null, '', '/');
    if (intent.type === 'lesson' && intent.id) {
        const lesson = dynamicLessonsList.find(l => l.id === intent.id);
        const levelOk = lesson && LEVELS.indexOf(lesson.level) <= LEVELS.indexOf(userData.level || "A1");
        if (levelOk) startLesson(intent.id); else if (lesson) notify(`Cette leçon est de niveau ${lesson.level}. Termine d'abord ton niveau actuel !`, 'error');
    }
    if (intent.type === 'story') startStory(intent.id);
  }, [userData, lib]);

  // PORTAIL STRIPE (gérer / résilier l'abonnement)
  const handlePortal = async () => {
    if (!currentUser || !userData) return;
    if (userData.subscription?.plan === 'premium_gift') {
        notify("🎁 Ton accès Premium t'a été offert grâce à un code : aucun prélèvement, rien à résilier.");
        return; 
    }
    try {
      const res = await authFetch('/api/portal', { method: 'POST', body: JSON.stringify({}) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else notify("Impossible d'ouvrir l'espace d'abonnement. Utilise le lien reçu par e-mail ou contacte le support.", 'error');
    } catch (e) { 
        console.error(e); 
        notify("Problème de connexion au portail d'abonnement.", 'error'); 
    }
  };

  // SUPPRESSION DU COMPTE
  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    const warning = isPremium && userData?.subscription?.plan !== 'premium_gift'
        ? "⚠️ Tu as un abonnement actif : pense à le résilier d'abord (bouton « Gérer / Résilier »).\n\nSupprimer ton compte quand même ? Toute ta progression sera perdue."
        : "⚠️ Veux-tu vraiment supprimer ton compte ?\n\nToute ta progression sera définitivement perdue.";
    if (!window.confirm(warning)) return;
    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await currentUser.delete();
      window.location.reload();
    } catch (error) { 
      console.error(error);
      if (error.code === 'auth/requires-recent-login') notify("Par sécurité, déconnecte-toi, reconnecte-toi, puis relance la suppression.", 'error');
      else notify("La suppression a échoué. Réessaie dans un instant.", 'error');
    }
  };

  const handleCheckout = async () => {
    if (!currentUser) { setView('auth'); return; }
    setCheckoutLoading(true);
    try {
      const res = await authFetch('/api/checkout', { method: 'POST', body: JSON.stringify({ plan: billingPlan }) });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
      notify("Le paiement n'a pas pu démarrer. Réessaie dans un instant.", 'error');
    } catch (error) { console.error(error); notify("Problème de connexion. Réessaie.", 'error'); }
    setCheckoutLoading(false);
  };

  const handleRedeemCode = async () => {
    if (!promoCode.trim()) return;
    setPromoError("");
    try {
      const res = await authFetch('/api/verify-code', { method: 'POST', body: JSON.stringify({ code: promoCode }) });
      const data = await res.json();
      if (data.valid) {
          setUserData(prev => ({ ...prev, subscription: { status: 'active', plan: 'premium_gift' } }));
          setShowPremiumModal(false); setShowPromoInput(false); setPromoCode("");
          notify("🌟 Code validé ! Bienvenue en Premium.");
      } else setPromoError("Ce code n'est pas valide.");
    } catch (e) { setPromoError("La vérification a échoué. Réessaie."); }
  };

  const handleAuth = async (email, password, isSignUp) => {
    setAuthError("");
    if (!email.trim() || !password) { setAuthError("Saisis ton adresse e-mail et ton mot de passe."); return; }
    setAuthBusy(true);
    try {
      // Le profil est créé par l'écouteur d'authentification (avec le niveau du test, le cas échéant)
      if (isSignUp) await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) { setAuthError(authErrorMessage(error)); }
    setAuthBusy(false);
  };

  const handleResetPassword = async (email) => {
    if (!email.trim()) { setAuthError("Saisis d'abord ton adresse e-mail, puis clique à nouveau sur « Mot de passe oublié »."); return; }
    try { await sendPasswordResetEmail(auth, email.trim()); setAuthError(""); notify("Un e-mail de réinitialisation vient de t'être envoyé."); }
    catch (error) { setAuthError(authErrorMessage(error)); }
  };

  const handleGoogleLogin = async () => { setAuthError(""); try { await signInWithPopup(auth, googleProvider); } catch (error) { setAuthError(authErrorMessage(error)); } };
  const handleLogout = async () => { await signOut(auth); setChatHistory(h => h.slice(0, 1)); setView('landing'); };

  const startLesson = (lessonId) => {
    const today = new Date().toDateString();
    const isNewLesson = !(userData?.completedLessons || []).includes(lessonId);
    if (isNewLesson && !isPremium) { const currentCount = (userData?.dailyLimit?.date === today) ? userData.dailyLimit.count : 0; if (currentCount >= FREE_LESSONS_PER_DAY) { setShowLimitModal(true); return; } }
    setActiveLessonId(lessonId); setTestMode(null); setView('lesson');
  };

  const startStory = (storyId) => { const story = dailyStoryContent?.id === storyId ? dailyStoryContent : lib?.STORIES_DATA.find(s => s.id === storyId); if (story) { setActiveStory(story); setView('story'); } };

  const startTest = (mode) => {
    if (mode === 'conversation') { setView('conversation'); return; }
    if (mode === 'levelup') {
      if (!lib) { notify("Le contenu est encore en cours de chargement. Réessaie dans un instant.", 'error'); return; }
      const currentLevelIdx = LEVELS.indexOf(userData.level || "A1");
      const examContent = lib.generateExamContent(dynamicLessonsContent, (currentLevelIdx * 20) + 1, (currentLevelIdx + 1) * 20, LEVELS[currentLevelIdx], 9999);
      setDynamicLessonsContent(prev => ({ ...prev, 'exam': examContent })); setTestMode('levelup'); setActiveLessonId('exam'); setView('lesson');
    } else { setView('quiz'); }
  };

  const handleLessonComplete = async (xp, lessonContent, lessonId, finalScore = 0) => {
      const wasExam = testMode === 'levelup';
      const score = typeof finalScore === 'number' ? finalScore : 0;
      const passed = !wasExam || score >= 16;
      setLastResult({ xp: wasExam ? (passed ? 500 : 0) : xp, isTest: wasExam, passed, score });
      const proceedToCompleteScreen = () => { setTestMode(null); setView('complete'); };
      try {
          if (wasExam) {
              if (passed && currentUser) {
                  const currentIdx = LEVELS.indexOf(userData?.level || "A1");
                  const nextLevel = (currentIdx >= 0 && currentIdx < LEVELS.length - 1) ? LEVELS[currentIdx + 1] : LEVELS[Math.max(currentIdx, 0)];
                  await updateDoc(doc(db, "users", currentUser.uid), { xp: increment(500), level: nextLevel });
                  setUserData(prev => ({ ...prev, level: nextLevel, xp: (prev?.xp || 0) + 500 }));
              }
              return;
          }
          if (!currentUser) return;
          const safeContent = Array.isArray(lessonContent) ? lessonContent : [];
          const newItemsWithSRS = safeContent.filter(item => item && ['swipe', 'grammar', 'structure'].includes(item.type)).map(item => ({ ...item, grade: 0, interval: 1, lastReview: new Date().toISOString() }));
          const today = new Date().toDateString();
          const currentVocab = Array.isArray(userData?.vocab) ? userData.vocab : [];
          const currentDaily = userData?.dailyLimit || { date: today, count: 0 };
          const uniqueNewItems = newItemsWithSRS.filter(newItem => !currentVocab.some(existing => existing.id === newItem.id || (existing.es && newItem.es && existing.es.trim().toLowerCase() === newItem.es.trim().toLowerCase())));
          const isNew = !(userData.completedLessons || []).includes(lessonId);
          const baseCount = currentDaily.date === today ? currentDaily.count : 0;
          const newCount = isNew ? baseCount + 1 : baseCount;

          // Série = nombre de jours consécutifs d'apprentissage (et non nombre de leçons)
          const last = userData.lastActive;
          const newStreak = last === dayKey() ? Math.max(userData.streak || 1, 1) : (last === yesterdayKey() || !last) ? (userData.streak || 0) + 1 : 1;

          setUserData(prev => ({ ...prev, xp: (prev?.xp || 0) + xp, streak: newStreak, lastActive: dayKey(), vocab: [...currentVocab, ...uniqueNewItems], completedLessons: isNew ? [...(prev.completedLessons || []), lessonId] : prev.completedLessons, dailyLimit: { date: today, count: newCount } }));
          const update = { xp: increment(xp), streak: newStreak, lastActive: dayKey(), completedLessons: arrayUnion(lessonId), dailyLimit: { date: today, count: newCount } };
          if (uniqueNewItems.length) update.vocab = arrayUnion(...uniqueNewItems);
          await updateDoc(doc(db, "users", currentUser.uid), update);
      } catch (error) { console.error("Erreur de sauvegarde :", error); notify("Ta progression n'a pas pu être sauvegardée. Vérifie ta connexion.", 'error'); } finally { proceedToCompleteScreen(); }
  };

const handleDownloadPDF = async (lessonId) => {
    const specificContent = dynamicLessonsContent[lessonId];
    if (!specificContent || !Array.isArray(specificContent)) { notify("La fiche PDF de cette leçon n'est pas encore disponible.", 'error'); return; }
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const vocab = specificContent.filter((i) => i.type === 'swipe');
      const grammar = specificContent.filter((i) => i.type === 'grammar');
      const structures = specificContent.filter((i) => i.type === 'structure');
      if (!vocab.length && !grammar.length && !structures.length) { notify("Cette leçon est 100 % pratique : il n'y a pas de fiche à télécharger.", 'error'); return; }
      const vocabHtml = vocab.length ? `<div class="section"><h2 class="section-title">📚 Vocabulaire</h2><div class="vocab-grid">${vocab.map((item) => `<div class="vocab-item"><span class="es">${item.es}</span><span class="en">${item.en}</span></div>`).join('')}</div></div>` : '';
      const grammarHtml = grammar.length ? `<div class="section"><h2 class="section-title">📐 Grammaire</h2>${grammar.map((item) => `<div class="compact-card"><div class="card-header"><h3 class="card-title">${item.title}</h3><span class="card-desc">${item.description}</span></div>${item.conjugation ? `<table class="mini-table">${item.conjugation.map((c) => `<tr><td class="td-pn">${c.pronoun}</td><td class="td-vb">${c.verb}</td></tr>`).join('')}</table>` : ''}</div>`).join('')}</div>` : '';
      const structureHtml = structures.length ? `<div class="section"><h2 class="section-title">🏗️ Structures</h2>${structures.map((item) => { const traduction = item.example_fr || item.example_en || ""; return `<div class="compact-card"><div class="card-header"><h3 class="card-title">${item.title}</h3></div><div class="struct-content"><div class="struct-row border-b"><span class="s-label">Formule</span><span class="s-value formula-font">${item.formula}</span></div><div class="struct-row"><span class="s-label">Exemple</span><div class="s-value"><div class="ex-es">🇪🇸 ${item.example || item.example_es}</div>${traduction ? `<div class="ex-fr">🇫🇷 ${traduction}</div>` : ''}</div></div>${item.note ? `<div class="struct-note">💡 ${item.note}</div>` : ''}</div></div>`}).join('')}</div>` : '';
      const element = document.createElement('div');
      element.innerHTML = `<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');body{font-family:'Inter',sans-serif;color:#1e293b;line-height:1.5;padding:40px;background:#fff;font-size:14px;}.header{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #e2e8f0;padding-bottom:15px;margin-bottom:30px;}.brand{font-size:24px;font-weight:800;color:#0f172a;line-height:1;}.brand span{color:#dc2626;}.lesson-text{color:#4f46e5;font-size:16px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;}.section{margin-bottom:30px;page-break-inside:avoid;}.section-title{font-size:16px;font-weight:800;color:#334155;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px;border-left:4px solid #4f46e5;padding-left:10px;}.vocab-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}.vocab-item{background:#f8fafc;border:1px solid #e2e8f0;padding:8px 12px;border-radius:8px;}.es{font-weight:700;color:#0f172a;font-size:14px;}.en{font-size:12px;color:#64748b;}.compact-card{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin-bottom:15px;background:#fff;page-break-inside:avoid;box-shadow:0 1px 2px rgba(0,0,0,0.02);}.card-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;}.card-title{margin:0;font-size:15px;font-weight:800;color:#1e293b;}.card-desc{font-size:12px;color:#64748b;font-style:italic;}.mini-table{width:100%;border-collapse:collapse;}.mini-table td{padding:4px 0;border-bottom:1px dashed #f1f5f9;font-size:13px;}.td-pn{color:#94a3b8;width:35%;}.td-vb{font-weight:600;color:#4f46e5;}.struct-content{display:flex;flex-direction:column;gap:8px;}.struct-row{display:flex;gap:15px;padding:4px 0;}.border-b{border-bottom:1px dashed #f1f5f9;padding-bottom:8px;}.s-label{width:80px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;flex-shrink:0;padding-top:2px;}.s-value{flex:1;font-size:14px;color:#334155;}.formula-font{font-family:monospace;font-weight:700;color:#4f46e5;font-size:15px;letter-spacing:0.5px;}.ex-es{font-weight:700;color:#1e293b;}.ex-fr{font-style:italic;color:#64748b;font-size:13px;margin-top:2px;}.struct-note{margin-top:5px;background:#fffbeb;color:#b45309;font-size:12px;padding:8px;border-radius:6px;font-weight:500;}.footer{margin-top:40px;text-align:center;font-size:10px;color:#cbd5e1;border-top:1px solid #f1f5f9;padding-top:15px;page-break-inside:avoid;}</style><div class="header"><div class="brand">Español<span>Sprint</span></div><div class="lesson-text">Leçon ${lessonId}</div></div>${vocabHtml}${grammarHtml}${structureHtml}<div class="footer">Fiche personnelle • Générée sur EspañolSprint</div><div style="height: 50px; width: 100%;"></div>`;
      const opt = { margin: [0.5, 0.5, 0.5, 0.5], filename: `Lecon-${lessonId}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, letterRendering: true }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
      html2pdf().set(opt).from(element).save();
    } catch (e) { console.error(e); notify("La création du PDF a échoué. Réessaie.", 'error'); }
  };

  const isAdmin = !!currentUser?.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase());
  const uploadFullContentToCloud = async () => { if (!isAdmin || !lib) return; if (!confirm("ADMIN : réinitialiser tout le contenu des leçons dans la base ?")) return; try { await setDoc(doc(db, "meta", "roadmap"), { lessons: INITIAL_LESSONS_LIST }); const contentToUpload = lib.generateAllContent(); for (const [id, content] of Object.entries(contentToUpload)) { await setDoc(doc(db, "lessons", id), { content: content }); } alert("✅ Contenu réinitialisé."); window.location.reload(); } catch (e) { alert("Erreur : " + e.message); } };

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-yellow-400" role="status" aria-label="Chargement"><Loader2 size={48} className="animate-spin text-white" /></div>;

  return (
    <div className="h-[100dvh] w-full bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row overflow-hidden">
      
      {toast && (
        <div role="status" className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-[92vw] px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm text-white animate-in fade-in slide-in-from-top-4 ${toast.type === 'error' ? 'bg-red-500' : 'bg-slate-900'}`}>{toast.text}</div>
      )}

      {/* MODAL VIES */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 relative overflow-hidden shadow-2xl border-2 border-red-100">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2 animate-pulse"><Heart size={48} className="fill-red-500" /></div>
            <div><h3 className="text-2xl font-black text-slate-900">Plus de vies pour aujourd'hui 💔</h3><p className="text-slate-500 mt-2 font-medium">Tu as terminé tes {FREE_LESSONS_PER_DAY} nouvelles leçons gratuites du jour. Tu peux encore réviser les leçons déjà validées, ou continuer sans limite avec Premium.</p></div>
            <div className="space-y-3 pt-4 border-t border-slate-100">
               <button onClick={() => { setShowLimitModal(false); setShowPremiumModal(true); }} className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"><Infinity size={20} /> Passer en illimité</button>
               <button onClick={() => setShowLimitModal(false)} className="text-slate-400 font-bold text-sm hover:text-slate-600">Revenir demain</button>
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
            <p className="text-slate-500 mb-5 text-sm">Apprends sans limite et parle espagnol plus vite.</p>
            {!showPromoInput ? (
                <>
                    <ul className="text-left text-sm text-slate-700 space-y-3 mb-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Infinity size={16}/></div><span><b>Leçons illimitées :</b> plus aucune limite quotidienne.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Bot size={16}/></div><span><b>Coach IA illimité :</b> un prof particulier disponible 24 h/24.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Mic size={16}/></div><span><b>Coach oral :</b> de vraies conversations à voix haute.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-white p-1 rounded-md shadow-sm text-indigo-600"><Volume2 size={16}/></div><span><b>Voix natives :</b> un audio naturel dans les leçons et les histoires.</span></li>
                    </ul>
                    {YEARLY_ENABLED && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <button onClick={() => setBillingPlan('yearly')} className={`relative p-3 rounded-xl border-2 text-left transition-all ${billingPlan === 'yearly' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><span className="absolute -top-2 right-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">LE PLUS CHOISI</span><p className="text-xs font-bold text-slate-500">Annuel</p><p className="font-black text-slate-900">{YEARLY_PRICE}<span className="text-xs font-medium text-slate-500"> /an</span></p></button>
                            <button onClick={() => setBillingPlan('monthly')} className={`p-3 rounded-xl border-2 text-left transition-all ${billingPlan === 'monthly' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><p className="text-xs font-bold text-slate-500">Mensuel</p><p className="font-black text-slate-900">{MONTHLY_PRICE}<span className="text-xs font-medium text-slate-500"> /mois</span></p></button>
                        </div>
                    )}
                    <div className="space-y-3">
                        <button onClick={handleCheckout} disabled={checkoutLoading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] flex flex-col items-center leading-tight disabled:opacity-60">{checkoutLoading ? <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin"/> Redirection vers le paiement…</span> : <><span>Essayer 7 jours gratuitement</span><span className="text-xs font-normal opacity-70">puis {billingPlan === 'yearly' ? `${YEARLY_PRICE} par an` : `${MONTHLY_PRICE} par mois`} • sans engagement</span></>}</button>
                        <p className="text-[11px] text-slate-400">Résiliable à tout moment en deux clics depuis ton profil.</p>
                        <div className="flex justify-between items-center px-1"><button onClick={() => setShowPremiumModal(false)} className="text-slate-400 font-bold text-xs hover:text-slate-600">Non merci</button><button onClick={() => setShowPromoInput(true)} className="text-indigo-500 font-bold text-xs hover:text-indigo-700 underline">J'ai un code d'accès</button></div>
                    </div>
                </>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-sm font-bold text-slate-700 mb-2">Saisis ton code d'accès :</p>
                    <input type="text" value={promoCode} onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }} onKeyDown={(e) => e.key === 'Enter' && handleRedeemCode()} placeholder="TON-CODE" className="w-full p-3 border-2 border-slate-200 rounded-xl mb-2 text-center font-bold uppercase tracking-widest outline-none focus:border-indigo-500" />
                    {promoError && <p className="text-red-500 text-sm font-bold mb-2">{promoError}</p>}
                    <button onClick={handleRedeemCode} className="w-full mt-2 bg-green-500 text-white py-3 rounded-xl font-bold shadow-md hover:bg-green-600 transition-all">Valider mon code</button>
                    <button onClick={() => setShowPromoInput(false)} className="mt-4 text-slate-400 text-xs font-bold hover:text-slate-600">Retour</button>
                </div>
            )}
          </div>
        </div>
      )}

      {(!currentUser || view === 'landing' || view === 'auth' || view === 'levelTest') ? (
        <div className={`w-full h-full bg-white ${view === 'landing' ? 'overflow-y-auto' : 'flex items-center justify-center overflow-y-auto'}`}>
           
           {view === 'landing' && (
               <LandingPage 
                   onStart={() => { setAuthStartsWithSignUp(true); setView('auth'); }}
                   onLogin={() => { setAuthStartsWithSignUp(false); setView('auth'); }}
                   onTest={() => setView('levelTest')} // -> Ouvre le test
               />
           )}

           {view === 'auth' && (
               <AuthScreen 
                   onAuth={handleAuth} 
                   onGoogle={handleGoogleLogin} 
                   onBack={() => { setAuthError(''); setView('landing'); }} 
                   onResetPassword={handleResetPassword}
                   startWithSignUp={authStartsWithSignUp}
                   busy={authBusy}
                   error={authError} 
               />
           )}

          {/* ÉCRAN DU TEST (Compatible Visiteur & Connecté) */}
           {view === 'levelTest' && (
               <LevelTest 
                   onBack={() => {
                       // Si on est connecté, retour profil, sinon retour accueil
                       if (currentUser) setView('profile');
                       else setView('landing');
                   }}
                   onComplete={(level) => {
                       if (currentUser) {
                           // CAS 1 : Utilisateur Connecté -> On applique direct
                           applyLevelToProfile(level);
                       } else {
                           // CAS 2 : Visiteur -> On sauvegarde pour l'inscription
                           if (typeof window !== 'undefined') localStorage.setItem('tempLevel', level);
                           notify(`🎯 Niveau détecté : ${level}. Crée ton compte pour le conserver et débloquer les leçons !`);
                           setAuthStartsWithSignUp(true);
                           setView('auth'); 
                       }
                   }}
               />
           )}
        </div>
      ) : (
        <>
          <SidebarDesktop userData={userData} currentView={view} onChangeView={setView} onLogout={handleLogout} onUpload={uploadFullContentToCloud}/>
          <main className="flex-1 h-full overflow-hidden relative flex flex-col">
            <MobileHeader userData={userData} />
            <div className="flex-1 overflow-y-auto bg-slate-50 relative scroll-smooth">
              
              {view === 'dashboard' && <DashboardContent userData={userData} allLessons={dynamicLessonsList} onStartLesson={startLesson} onDownloadPDF={handleDownloadPDF}/>}
              {view === 'notebook' && <NotebookContent userVocab={userData.vocab} />}
              {view === 'conversation' && <ConversationMode onExit={() => setView('tests')} onPremiumRequired={() => { setView('tests'); setShowPremiumModal(true); }} />}
              {view === 'quiz' && (
                <QuizZone 
                  onExit={() => setView('dashboard')} 
                  userData={userData} 
                  lessonsContent={dynamicLessonsContent} 
                  askAITutor={askAITutor} 
                />
              )}
              {view === 'structures' && <StructuresContent structures={lib?.SENTENCE_STRUCTURES || []} userVocab={userData?.vocab} />}
              {view === 'tests' && (
                  <TestDashboard 
                      userData={userData} 
                      onStartTest={startTest} 
                      onTriggerPremium={() => setShowPremiumModal(true)}
                  />
              )}
              {view === 'reading' && (
                <div className="p-6 pb-24 space-y-8 max-w-2xl mx-auto min-h-screen flex flex-col">
                    <div className="text-center space-y-2"><span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Mode histoire</span><h2 className="text-3xl font-black text-slate-900">L'histoire du jour 📖</h2></div>
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
                        ) : (<div className="flex flex-col items-center justify-center space-y-4 py-12"><Loader2 className="animate-spin text-pink-400" size={48} /><p className="text-slate-400 font-bold">Nous choisissons ton histoire du jour…</p></div>)}
                    </div>
                    <div className="space-y-4 pt-4 border-t border-slate-200"><h3 className="font-bold text-slate-500 uppercase text-sm">Le texte du jour</h3>{lib && <DailyReadingContent reading={lib.getDailyReading(userData?.level)} />}</div>
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
                    onPremium={() => setShowPremiumModal(true)} 
                    onManageSubscription={handlePortal}
                    onTest={() => setView('levelTest')}
                    onDeleteAccount={handleDeleteAccount}
                    isAdmin={isAdmin}
                  />
              )}
              
              {view === 'lesson' && <LessonEngine lessonId={activeLessonId} initialContent={dynamicLessonsContent[activeLessonId]} onComplete={handleLessonComplete} onExit={() => setView('dashboard')} isExam={testMode === 'levelup'} />}
              
              {view === 'complete' && <LessonComplete result={lastResult} streak={userData?.streak || 0} isPremium={isPremium} onHome={() => setView(lastResult.isTest ? 'tests' : 'dashboard')} onDownload={() => handleDownloadPDF(activeLessonId)} onPremium={() => setShowPremiumModal(true)} />}
            </div>
            {view !== 'lesson' && view !== 'complete' && view !== 'story' && <MobileBottomNav currentView={view} onChangeView={setView} />}
            
            <AITutorWidget 
                isOpen={isTutorOpen} 
                onToggle={() => setIsTutorOpen(!isTutorOpen)}
                history={chatHistory}
                onSend={handleAskTutorWidget} 
                isLoading={isChatLoading}
                isPremium={isPremium}
                hidden={['lesson', 'complete', 'story', 'conversation', 'quiz'].includes(view)}
            />

          </main>
        </>
      )}
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

const ProfileContent = ({ userData, email, onLogout, onUpload, onPremium, onManageSubscription, onTest, onDeleteAccount, isAdmin }) => {
  const isPremium = userData?.subscription?.status === 'active';
  const initial = userData?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="max-w-2xl mx-auto w-full p-6 md:p-12 pb-32 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Mon compte</h2>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        
        {/* En-tête */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white shadow-sm">
            {initial}
          </div>
          <div>
            <div className="flex items-center gap-2">
                <p className="font-black text-slate-900 text-xl">{userData?.name || "Utilisateur"}</p>
                {isPremium && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">PRO</span>}
            </div>
            <p className="text-slate-400 text-sm font-medium">{email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center py-6 border-y border-slate-50">
            <div><p className="text-2xl font-black text-slate-900">{userData?.xp || 0}</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">XP</p></div>
            <div><p className="text-2xl font-black text-slate-900">{userData?.streak || 0} 🔥</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Série</p></div>
            <div><p className="text-2xl font-black text-slate-900">{userData?.level || "A1"}</p><p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Niveau</p></div>
        </div>
        
        <button 
            onClick={onTest} 
            className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all mt-4"
        >
            <Target size={18} /> Repasser le test de niveau
        </button>

        {/* ABONNEMENT */}
        <div className="space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">👑 Abonnement</h4>
            
            {!isPremium ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                    <p className="text-sm text-slate-500">Passe à la vitesse supérieure : leçons illimitées, coach IA et conversation orale.</p>
                    <button onClick={onPremium} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition-all">
                        💎 Essayer Premium gratuitement
                    </button>
                </div>
            ) : (
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 flex flex-col gap-3">
                    <p className="text-sm text-yellow-800 font-bold">✅ Abonnement Premium actif</p>
                    <button onClick={onManageSubscription} className="w-full bg-white text-yellow-700 border border-yellow-200 py-3 rounded-xl font-bold text-sm">
                        Gérer / Résilier
                    </button>
                </div>
            )}
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-50">
            {isAdmin && (
            <button onClick={onUpload} className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100 text-sm">
                <CloudUpload size={18} /> Réinitialiser le contenu (admin)
            </button>
            )}
            <button onClick={onLogout} className="w-full text-slate-500 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm">
                <LogOut size={18} /> Se déconnecter
            </button>
        </div>
      </div>

      {/* Suppression (Zone Danger) */}
      <div className="mt-8 text-center">
          <button onClick={onDeleteAccount} className="text-red-300 text-xs font-bold hover:text-red-500 transition-colors py-2 px-4">
            Supprimer définitivement mon compte
          </button>
      </div>
    </div>
  );
};

const AITutorWidget = ({ isOpen, onToggle, history, onSend, isLoading, isPremium, hidden }) => {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && scrollRef.current) { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }
  }, [history, isOpen]);

  const handleSubmit = (e) => { e.preventDefault(); if (!input.trim()) return; onSend(input); setInput(""); };

  if (hidden) return null; 

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200" style={{height: '500px', maxHeight: '80vh'}}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><Bot size={24} /></div><div><h3 className="font-bold text-sm leading-tight">Coach IA</h3><p className="text-[10px] text-indigo-100 font-medium opacity-90">{isPremium ? "Illimité • toujours disponible" : "3 questions gratuites par jour"}</p></div></div><button onClick={onToggle} className="text-white/80 hover:text-white transition-colors"><X size={20} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {history.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}>{msg.text}</div></div>))}
            {isLoading && (<div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm"><Loader2 size={16} className="animate-spin text-indigo-600" /></div></div>)}
          </div>
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pose ta question…" aria-label="Ta question pour le coach" className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 font-medium" /><button type="submit" disabled={isLoading || !input.trim()} className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"><ArrowRight size={20} /></button></form>
        </div>
      )}
      <button onClick={onToggle} aria-label={isOpen ? "Fermer le coach IA" : "Ouvrir le coach IA"} className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-700 rotate-90' : 'bg-gradient-to-tr from-indigo-600 to-purple-500 '}`}>{isOpen ? <X color="white" size={24} /> : <Bot color="white" size={28} />}</button>
    </div>
  );
};

const ConversationMode = ({ onExit, onPremiumRequired }) => {
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

      if (!mimeType) { alert("Ton navigateur ne permet pas l'enregistrement audio. Essaie avec Chrome ou Safari."); return; }

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
    } catch (err) { console.error("Erreur micro:", err); alert("Impossible d'accéder au micro. Autorise-le dans les réglages de ton navigateur."); setStatus("idle"); }
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
    formData.append('history', JSON.stringify(history.slice(-8)));

    try {
      const res = await authFetch('/api/conversation', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.error === "PREMIUM_REQUIRED") { setStatus("idle"); onPremiumRequired?.(); return; }
      if (data.error) { setStatus("idle"); return; }
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
      <div className="absolute top-4 left-4 z-10"><button onClick={onExit} aria-label="Quitter la conversation"><X className="text-slate-400"/></button></div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-16">
         {history.length === 0 && (
           <div className="text-center mt-20 opacity-50 space-y-4">
             <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto"><Mic size={40}/></div>
             <p>Maintiens le bouton micro enfoncé et parle en espagnol.</p>
             <p className="text-sm">Relâche pour entendre la réponse.</p>
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
      
      {status === 'recording' && <div className="absolute bottom-32 w-full text-center font-bold animate-pulse text-red-400">Je t'écoute…</div>}
      {status === 'speaking' && <div className="absolute bottom-32 w-full text-center font-bold text-green-400">Ton coach répond…</div>}
      {status === 'waiting_play' && <div className="absolute bottom-32 w-full text-center font-bold text-green-400">La réponse est prête !</div>}
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
       if (!lessonsContent || Object.keys(lessonsContent).length === 0) return; // Contenu encore en chargement
       setQuestions(module.generateSuperQuiz(lessonsContent, userData));
    });
  }, [lessonsContent]);

  if (questions.length === 0) return <div className="p-10 text-center flex items-center justify-center h-full"><Loader2 className="animate-spin mr-2"/> Préparation de ton entraînement…</div>;
  const currentQ = questions[currentIdx];
  const handleNext = () => { setAiExplanation(null); if (currentIdx + 1 < questions.length) { setCurrentIdx(p => p + 1); } else { if (wrongAnswers.length > 0 && !isReviewing) { setIsReviewing(true); setQuestions(wrongAnswers); setWrongAnswers([]); setCurrentIdx(0); } else if (wrongAnswers.length > 0 && isReviewing) { setQuestions(wrongAnswers); setWrongAnswers([]); setCurrentIdx(0); } else { onExit(); } } };
  const handleScore = (isCorrect) => { if (!isCorrect) setWrongAnswers(prev => [...prev, currentQ]); };
  
  const askAI = async () => { setAiExplanation("…"); const expected = currentQ.correctAnswer || (Array.isArray(currentQ.answer) ? currentQ.answer[0] : currentQ.answer); const exp = await askAITutor(`Explique-moi simplement cette question d'exercice et sa réponse. Question : ${currentQ.question} Réponse attendue : ${expected}`); setAiExplanation(exp); };

  return (
    <div className="h-full flex flex-col bg-slate-50">
       <div className="px-6 py-4 bg-white border-b flex items-center justify-between"><button onClick={onExit}><X className="text-slate-400"/></button><div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 transition-all" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} /></div>{isReviewing && <div className="text-red-500 font-bold flex items-center gap-1"><RotateCcw size={16}/> On revoit tes erreurs</div>}</div>
       <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full space-y-6">
           {currentQ.type === 'listening' ? <ListeningCard data={currentQ} onNext={handleNext} onScore={handleScore} /> : <InputCard data={currentQ} onNext={handleNext} onScore={handleScore} isExam={false} />}
           <button onClick={askAI} className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100"><Bot size={18}/> {aiExplanation ? "Explication du coach" : "Demander une explication au coach IA"}</button>
           {aiExplanation && <div className="bg-white border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-sm text-sm text-slate-600 animate-in slide-in-from-bottom">{aiExplanation}</div>}
       </div>
    </div>
  );
};

const ListeningCard = ({ data, onNext, onScore }) => { 
    const [val, setVal] = useState(''); const [status, setStatus] = useState('idle'); const [revealed, setRevealed] = useState(false); 
    useEffect(() => { speak(data.audioText); }, [data]); 
    const check = (e) => { e.preventDefault(); const cleanVal = val.trim().toLowerCase().replace(/[¿¡!.,]/g, ''); const cleanAns = data.correctAnswer.toLowerCase().replace(/[¿¡!.,]/g, ''); const correct = cleanVal === cleanAns; setStatus(correct ? 'success' : 'error'); setRevealed(true); if(onScore) onScore(correct); if (correct) { setTimeout(onNext, 1500); } }; 
    return (<div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center gap-6 w-full animate-in zoom-in"><span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Écoute</span><button onClick={() => speak(data.audioText)} className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all animate-pulse"><Ear size={40} /></button>{revealed && <p className="text-2xl font-black text-purple-600 text-center">{data.audioText}</p>}<form onSubmit={check} className="w-full space-y-4"><input value={val} onChange={e => setVal(e.target.value)} placeholder="Écris ce que tu entends…" className={`w-full p-4 border-2 rounded-xl text-center font-bold outline-none ${status === 'error' ? 'border-red-400 bg-red-50' : status === 'success' ? 'border-green-400 bg-green-50' : 'border-slate-200 focus:border-purple-400'}`} disabled={revealed && status === 'success'} /><button type="submit" disabled={!val} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">{status === 'error' ? 'Continuer' : 'Vérifier'}</button>{status === 'error' && <button type="button" onClick={onNext} className="w-full py-2 text-slate-400 font-bold">Passer</button>}</form></div>); 
};

const LeaderboardView = ({ userData }) => { const rivals = [{ name: "Maria L.", xp: 1450, avatar: "👩" }, { name: "Thomas B.", xp: 1200, avatar: "👨" }, { name: userData?.name + " (Toi)", xp: userData?.xp || 0, avatar: "😎", isMe: true }, { name: "Juan P.", xp: 850, avatar: "🧔" }].sort((a, b) => b.xp - a.xp); return (<div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-6"><div className="text-center space-y-2 mb-8"><div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 mb-2"><Trophy size={40} /></div><h2 className="text-3xl font-black text-slate-900">Classement</h2><p className="text-slate-500 font-medium">Gagne des XP à chaque leçon pour grimper sur le podium.</p></div><div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">{rivals.map((user, idx) => (<div key={idx} className={`flex items-center gap-4 p-4 border-b border-slate-50 ${user.isMe ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}`}><div className="font-black text-slate-300 w-6">{idx + 1}</div><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</div><div className="flex-1 font-bold text-slate-800">{user.name}</div><div className="font-black text-slate-900">{user.xp} XP</div></div>))}</div></div>); };
const LessonComplete = ({ result, streak, isPremium, onHome, onDownload, onPremium }) => {
  const failed = result.isTest && !result.passed;
  return (
    <div className={`min-h-full w-full flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in zoom-in ${failed ? 'bg-slate-100' : 'bg-yellow-400'}`}>
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform">
        {failed ? <RotateCcw size={100} className="text-slate-400" /> : <Trophy size={100} className="text-yellow-500 fill-yellow-500" />}
      </div>
      <div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">{failed ? "Presque !" : result.isTest ? "Examen réussi !" : "¡Increíble!"}</h2>
        <p className="text-xl text-slate-800 font-bold opacity-80">
          {failed ? `Tu as obtenu ${result.score}/20. Il faut 16 bonnes réponses : révise un peu et retente ta chance !` : result.isTest ? `${result.score}/20 : niveau validé !` : "Leçon terminée !"}
        </p>
      </div>
      {!failed && (
        <div className="flex gap-4 flex-wrap justify-center">
          <div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{result.xp} XP</div>
          {!result.isTest && streak > 0 && <div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl flex items-center gap-2"><Flame size={24} className="text-orange-600 fill-orange-500" /> {streak} {streak > 1 ? 'jours' : 'jour'}</div>}
        </div>
      )}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {!result.isTest && <button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"><Download size={20} /> Télécharger la fiche PDF</button>}
        <button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl">Continuer</button>
        {!isPremium && !failed && <button onClick={onPremium} className="text-slate-900 font-bold text-sm underline underline-offset-4 opacity-80 hover:opacity-100">Apprendre sans limite avec Premium — 7 jours offerts</button>}
      </div>
    </div>
  );
};
const DailyReadingContent = ({ reading }) => { const [trans, setTrans] = useState(false); if (!reading) return null; return (<div className="max-w-2xl mx-auto w-full pb-24 space-y-8"><div className="text-center"><h2 className="text-3xl font-black text-slate-900 mt-2">{reading.title_es}</h2></div><div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-slate-100 relative overflow-hidden group"><div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Español</div><button onClick={() => speak(reading.text_es)} aria-label="Écouter le texte" className="absolute top-8 right-6 p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"><Volume2 size={20} /></button><p className="text-xl text-slate-800 leading-relaxed font-medium mt-12">{reading.text_es}</p></div><div className="flex justify-center"><button onClick={() => setTrans(!trans)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">{trans ? <><X size={16}/> Masquer la traduction</> : <><Check size={16}/> Afficher la traduction</>}</button></div>{trans && <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200"><h4 className="text-lg font-bold text-slate-700 mb-2">{reading.title_fr}</h4><p className="text-slate-600 leading-relaxed">{reading.text_fr}</p></div>}</div>); };

const LANDING_FEATURES = [
  { icon: Zap, title: "5 minutes par jour", text: "Des leçons courtes et rythmées : vocabulaire, grammaire et mise en pratique immédiate." },
  { icon: BookOpen, title: "100 leçons, du A1 au C1", text: "Un parcours structuré qui t'emmène des premières salutations aux débats d'experts." },
  { icon: MessageCircle, title: "Des histoires à écouter", text: "Chaque jour, un dialogue interactif pour entraîner ton oreille en contexte réel." },
  { icon: Bot, title: "Un coach IA", text: "Pose tes questions, fais-toi corriger et converse à voix haute, à toute heure." },
];
const LANDING_FAQ = [
  { q: "EspañolSprint est-il vraiment gratuit ?", a: "Oui. L'offre gratuite donne accès à 4 nouvelles leçons par jour, aux révisions illimitées, à l'histoire du jour et à 3 questions quotidiennes au coach IA." },
  { q: "Qu'apporte l'offre Premium ?", a: "Les leçons illimitées, le coach IA sans limite, le coach oral pour converser à voix haute et les voix natives. Les 7 premiers jours sont offerts." },
  { q: "Puis-je résilier facilement ?", a: "Oui, en deux clics depuis ton profil, à tout moment et sans justification." },
  { q: "Je ne suis pas débutant. Par où commencer ?", a: "Fais le test de niveau gratuit (20 questions, 3 minutes) : tu démarreras directement au bon niveau." },
];
const LandingPage = ({ onStart, onLogin, onTest }) => (
    <div className="w-full bg-white text-slate-900">
        <header className="bg-yellow-400">
            <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <span className="text-xl font-black tracking-tighter">🇪🇸 Español<span className="text-red-600">Sprint</span></span>
                <div className="flex items-center gap-4 text-sm font-bold">
                    <Link href="/blog" className="hidden sm:inline hover:underline">Blog</Link>
                    <Link href="/tuteur-ia" className="hidden sm:inline hover:underline">Coach IA</Link>
                    <button onClick={onLogin} className="bg-white/60 hover:bg-white px-4 py-2 rounded-xl transition-colors">Se connecter</button>
                </div>
            </nav>
            <div className="max-w-2xl mx-auto px-6 pt-10 pb-16 text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Apprends l'espagnol en <span className="text-red-600">5 minutes</span> par jour</h1>
                <p className="text-lg md:text-xl font-medium text-slate-800">Leçons éclair, histoires audio et coach IA : la méthode la plus rapide pour passer du niveau A1 au niveau C1.</p>
                <div className="space-y-3 max-w-md mx-auto">
                    <button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Commencer gratuitement</button>
                    <button onClick={onTest} className="w-full bg-white/60 text-slate-900 py-4 px-8 rounded-2xl font-bold text-sm hover:bg-white hover:shadow-md transition-all flex items-center justify-center gap-2"><Target size={18}/> Je ne suis pas débutant : tester mon niveau</button>
                    <p className="text-xs font-bold text-slate-800/70">Gratuit • Sans carte bancaire • Inscription en 10 secondes</p>
                </div>
            </div>
        </header>

        <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-black text-center mb-10">Une méthode pensée pour aller vite</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {LANDING_FEATURES.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center mb-4"><Icon size={24} /></div>
                        <h3 className="font-black text-lg mb-2">{title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="bg-slate-50 border-y border-slate-100">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-black text-center mb-2">Gratuit pour apprendre, Premium pour accélérer</h2>
                <p className="text-center text-slate-500 mb-10">Commence sans payer. Passe à Premium quand tu veux aller plus vite.</p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col">
                        <h3 className="font-black text-xl">Gratuit</h3>
                        <p className="text-4xl font-black my-4">0 €</p>
                        <ul className="space-y-3 text-sm text-slate-600 flex-1">
                            {["4 nouvelles leçons par jour", "Révisions illimitées", "Histoire et texte du jour", "3 questions par jour au coach IA", "Fiches PDF de tes leçons"].map(t => <li key={t} className="flex gap-2"><Check size={18} className="text-green-500 shrink-0" /> {t}</li>)}
                        </ul>
                        <button onClick={onStart} className="mt-8 w-full border-2 border-slate-900 py-3 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-colors">Créer mon compte gratuit</button>
                    </div>
                    <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col relative overflow-hidden">
                        <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-black px-4 py-1.5 rounded-bl-2xl">7 JOURS OFFERTS</span>
                        <h3 className="font-black text-xl flex items-center gap-2"><Crown size={20} className="text-yellow-400" /> Premium</h3>
                        <p className="text-4xl font-black my-4">{MONTHLY_PRICE}<span className="text-base font-medium text-slate-400"> /mois</span></p>
                        <ul className="space-y-3 text-sm text-slate-200 flex-1">
                            {["Tout le contenu gratuit", "Leçons illimitées, sans attendre demain", "Coach IA illimité", "Coach oral : conversations à voix haute", "Voix natives dans les leçons et les histoires"].map(t => <li key={t} className="flex gap-2"><Check size={18} className="text-yellow-400 shrink-0" /> {t}</li>)}
                        </ul>
                        <button onClick={onStart} className="mt-8 w-full bg-yellow-400 text-slate-900 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors">Essayer 7 jours gratuitement</button>
                        <p className="text-[11px] text-slate-400 text-center mt-2">Sans engagement, résiliable à tout moment.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-black text-center mb-8">Questions fréquentes</h2>
            <div className="space-y-3">
                {LANDING_FAQ.map(({ q, a }) => (
                    <details key={q} className="group bg-slate-50 border border-slate-100 rounded-2xl p-5">
                        <summary className="font-bold cursor-pointer list-none flex justify-between items-center gap-4">{q}<ChevronRight size={18} className="shrink-0 transition-transform group-open:rotate-90" /></summary>
                        <p className="text-slate-600 text-sm leading-relaxed mt-3">{a}</p>
                    </details>
                ))}
            </div>
            <div className="text-center mt-12">
                <button onClick={onStart} className="bg-slate-900 text-white py-4 px-10 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all inline-flex items-center gap-2"><Sparkles size={20} /> Lancer ma première leçon</button>
            </div>
        </section>

        <footer className="border-t border-slate-100 py-8 px-6 text-sm text-slate-500">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="font-black text-slate-900">Español<span className="text-red-600">Sprint</span></span>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
                    <Link href="/lecon/1" className="hover:text-slate-900">Leçon 1</Link>
                    <Link href="/histoire/story-A1-01" className="hover:text-slate-900">Histoires</Link>
                    <Link href="/blog" className="hover:text-slate-900">Blog</Link>
                    <Link href="/tuteur-ia" className="hover:text-slate-900">Coach IA</Link>
                </div>
            </div>
        </footer>
    </div>
);
const GoogleIcon = () => (<svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/></svg>);
const AuthScreen = ({ onAuth, onGoogle, onBack, onResetPassword, startWithSignUp, busy, error }) => { const [isSignUp, setIsSignUp] = useState(!!startWithSignUp); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Crée ton compte' : 'Bon retour !'}</h2><p className="text-slate-500">{isSignUp ? "C'est gratuit, et ta progression est sauvegardée ☁️" : "Reprends là où tu t'étais arrêté ☁️"}</p></div>{error && <div role="alert" className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold">{error}</div>}<form onSubmit={(e) => { e.preventDefault(); onAuth(email, password, isSignUp); }} className="space-y-4"><button type="button" onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><GoogleIcon /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" autoComplete="email" aria-label="Adresse e-mail" placeholder="Adresse e-mail" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" autoComplete={isSignUp ? "new-password" : "current-password"} aria-label="Mot de passe" placeholder={isSignUp ? "Mot de passe (6 caractères minimum)" : "Mot de passe"} className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} />{!isSignUp && <div className="text-right -mt-2"><button type="button" onClick={() => onResetPassword(email)} className="text-slate-400 font-bold text-xs hover:text-indigo-600">Mot de passe oublié ?</button></div>}<button type="submit" disabled={busy} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2">{busy && <Loader2 size={20} className="animate-spin" />}{isSignUp ? "Créer mon compte" : "Me connecter"}</button></form><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas encore de compte"}</button></div></div>); };
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (<div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6"><nav className="flex-1 space-y-2"><div className="flex items-center gap-2 mb-8 px-2"><Image src="/logo.png" width={45} height={45} alt="Logo"/><span className="text-xl font-black tracking-tighter">Español<span className="text-red-600">Sprint</span></span></div><SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><SidebarLink icon={MessageCircle} label="Histoires" active={currentView === 'reading' || currentView === 'story'} onClick={() => onChangeView('reading')} /><SidebarLink icon={Trophy} label="Classement" active={currentView === 'leaderboard'} onClick={() => onChangeView('leaderboard')} /><SidebarLink icon={BrainCircuit} label="Entraînement" active={currentView === 'tests' || currentView === 'quiz'} onClick={() => onChangeView('tests')} /><SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></nav></div>);

const LevelTest = ({ onComplete, onBack }) => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (option) => {
        const isCorrect = option === PLACEMENT_TEST[index].ans;
        
        // On calcule le nouveau score
        const newScore = score + (isCorrect ? 1 : 0);
        if (isCorrect) setScore(newScore);

        // Passage à la suite
        if (index + 1 < PLACEMENT_TEST.length) {
            setIndex(prev => prev + 1);
        } else {
            finishTest(newScore);
        }
    };

    const finishTest = (finalScore) => {
        setFinished(true);
        
        // Barème sur 20 questions
        let detectedLevel = "A1";
        if (finalScore >= 5) detectedLevel = "A2";
        if (finalScore >= 10) detectedLevel = "B1";
        if (finalScore >= 15) detectedLevel = "B2";

        setTimeout(() => {
            onComplete(detectedLevel);
        }, 2500);
    };

    if (finished) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8 animate-in zoom-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                    <Check size={48} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Test terminé !</h2>
                <p className="text-slate-500 text-lg">Score : {score} / 20</p>
                <p className="text-indigo-600 font-bold mt-2">Analyse de ton niveau…</p>
            </div>
        );
    }

    const currentQ = PLACEMENT_TEST[index];
    const progress = ((index) / PLACEMENT_TEST.length) * 100;

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} aria-label="Quitter le test" className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                <span className="font-bold text-indigo-600">Question {index + 1} / {PLACEMENT_TEST.length}</span>
            </div>

            {/* Barre de progression */}
            <div className="h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{width: `${progress}%`}}></div>
            </div>

            {/* Question */}
            <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">{currentQ.q}</h3>

            {/* Options */}
            <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => handleAnswer(opt)}
                        className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 font-bold text-slate-700 transition-all text-left"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};
const MobileHeader = ({ userData }) => (
  <div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0">
    <div className="flex items-center gap-3">
      
      <div className="w-8 h-8 relative">
        <Image 
            src="/logo.png"  
            alt="Logo" 
            fill 
            className="object-contain" 
        />
      </div>
      
      <LivesCounter userData={userData}/>
    </div>
    
    <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
      <Flame size={16} className="text-orange-500 fill-orange-500" />
      <span className="text-orange-700 font-bold">{userData?.streak || 0}</span>
    </div>
  </div>
);
const MobileBottomNav = ({ currentView, onChangeView }) => (<div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30"><NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><NavBtn icon={MessageCircle} label="Histoires" active={currentView === 'reading' || currentView === 'story'} onClick={() => onChangeView('reading')} /><NavBtn icon={BrainCircuit} label="Entraînement" active={currentView === 'tests' || currentView === 'quiz'} onClick={() => onChangeView('tests')} /><NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></div>);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const DashboardContent = ({ userData, allLessons, onStartLesson, onDownloadPDF }) => { 
  const levels = ["A1", "A2", "B1", "B2", "C1"]; 
  const safeLevel = (userData.level && levels.includes(userData.level)) ? userData.level : "A1"; 
  const currentLevelIndex = levels.indexOf(safeLevel); 
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 md:p-8 shrink-0 flex justify-between items-end">
        <div><h2 className="text-3xl font-black text-slate-900 mb-2">Ton parcours</h2><p className="text-slate-500">Niveau actuel : <span className="text-indigo-600 font-bold">{safeLevel}</span></p></div>
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
              <div className="flex-1 overflow-y-auto space-y-3 pb-4 pr-2 custom-scrollbar">{levelLessons.map((lesson) => { const isLessonDone = userData.completedLessons.includes(lesson.id); const isAccessible = isCurrent && (isLessonDone || userData.completedLessons.includes(lesson.id - 1) || lesson.id === levelLessons[0].id); if (isCompleted) { return (<div key={lesson.id} className="w-full flex gap-2 group"><button onClick={() => onStartLesson(lesson.id)} className="flex-1 p-4 rounded-2xl bg-green-100 text-green-800 flex items-center gap-3 hover:bg-green-200 transition-colors"><CheckCircle size={18} className="shrink-0" /><span className="text-sm font-bold truncate flex-1 text-left">{lesson.title}</span><span className="text-[10px] uppercase font-bold opacity-60 group-hover:opacity-100 hidden sm:inline">Réviser</span></button><button onClick={() => onDownloadPDF(lesson.id)} className="p-4 rounded-2xl bg-white border-2 border-green-100 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all" title="Télécharger la fiche PDF" aria-label="Télécharger la fiche PDF"><Download size={20} /></button></div>); } return (<button key={lesson.id} disabled={!isAccessible} onClick={() => onStartLesson(lesson.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all ${isLessonDone ? 'bg-green-500 text-white shadow-md' : isAccessible ? 'bg-yellow-400 text-slate-900 shadow-lg scale-[1.02] font-bold ring-4 ring-yellow-100' : 'bg-slate-200 text-slate-400'}`}><div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0">{isLessonDone ? <Check size={16} /> : lesson.id}</div><div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{lesson.title}</p></div>{isAccessible && !isLessonDone && <PlayCircle size={22} className="shrink-0" />}</button>); })}</div>
              {isLocked && (<div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center z-10"><div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-slate-100"><Lock size={32} className="mx-auto text-slate-300 mb-2" /><h4 className="font-bold text-slate-800">Niveau verrouillé</h4><p className="text-xs text-slate-400 mt-1">Réussis l'examen du niveau précédent</p></div></div>)}
            </div>
          ); 
        })}
        <div className="w-4 shrink-0"></div>
      </div>
    </div>
  ); 
};
const TestDashboard = ({ userData, onStartTest, onTriggerPremium }) => { 
    const levels = ["A1", "A2", "B1", "B2", "C1"]; 
    const currentIdx = levels.indexOf(userData.level || "A1"); 
    const nextLevel = levels[currentIdx + 1]; 
    const lessonsDone = userData.completedLessons.length; 
    const canTakeExam = lessonsDone >= (currentIdx + 1) * 20; 
    const isPremium = userData?.subscription?.status === 'active';
    
    return (
        <div className="max-w-2xl mx-auto w-full p-6 pb-24 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Entraînement 🧠</h2>
                <p className="text-slate-500">Révise, parle et valide ton niveau.</p>
            </div>
            
            {/* CARTE 1: Entraînement Rapide (Gratuit) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group" onClick={() => onStartTest('training')}>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <BrainCircuit size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">Entraînement rapide</h3>
                        <p className="text-sm text-slate-500 mt-1">10 questions pour réviser ce que tu as appris.</p>
                    </div>
                    <ChevronRight className="text-slate-300" />
                </div>
            </div>

            {/* CARTE 2: COACH ORAL (Premium Uniquement) */}
            <div 
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden" 
                onClick={() => {
                    if (isPremium) {
                        onStartTest('conversation'); // ✅ Si Premium, on entre
                    } else {
                        onTriggerPremium(); // ❌ Si Gratuit, on ouvre le Modal de paiement
                    }
                }}
            >
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                        {isPremium ? <Mic size={32} /> : <Lock size={32} />} {/* Icône Cadenas si gratuit */}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">Coach oral IA</h3>
                        <p className="text-sm text-slate-500 mt-1">Discute à voix haute et gagne en aisance.</p>
                    </div>
                    {/* Flèche ou Cadenas selon le statut */}
                    {isPremium ? <ChevronRight className="text-slate-300" /> : <Lock size={16} className="text-yellow-600 opacity-50"/>}
                </div>
                {/* Badge Premium */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-bl-xl z-20 shadow-sm">PREMIUM</div>
            </div>

            {/* CARTE 3: EXAMEN PASSAGE DE NIVEAU */}
            <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all relative overflow-hidden ${!canTakeExam ? 'opacity-60 grayscale' : 'cursor-pointer hover:shadow-md group'}`} onClick={() => canTakeExam && onStartTest('levelup')}>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:rotate-6 transition-transform">
                        <Target size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{nextLevel ? `Examen ${nextLevel}` : "Examen final"}</h3>
                        <p className="text-sm text-slate-500 mt-1">20 questions, 16 bonnes réponses pour passer au niveau suivant.</p>
                    </div>
                    {canTakeExam ? <ChevronRight className="text-slate-300" /> : <Lock className="text-slate-300" />}
                </div>
                {!canTakeExam && <div className="absolute bottom-2 right-4 text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded">Termine d'abord toutes les leçons du niveau</div>}
            </div>
        </div>
    ); 
};
const StructuresContent = ({ structures, userVocab }) => { const safeList = Array.isArray(userVocab) ? userVocab : []; const learnedStructures = safeList.filter(item => item && item.type === 'structure'); const allStructures = [...structures, ...learnedStructures]; const uniqueStructures = allStructures.filter((item, index, self) => index === self.findIndex((t) => t.title === item.title)); return (<div className="max-w-3xl mx-auto w-full p-6 pb-24"><h2 className="text-3xl font-black text-slate-900 mb-8">Structures de phrases 🏗️</h2><div className="space-y-6">{uniqueStructures.map((struct, idx) => (<div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"><div className="flex items-center gap-3 mb-4"><div className="p-2 bg-yellow-100 rounded-lg text-yellow-700"><Hammer size={20} /></div><h3 className="text-xl font-bold text-slate-900">{struct.title}</h3></div><div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-indigo-600 font-bold mb-4 text-center border border-slate-100">{struct.formula}</div><div className="space-y-2 mb-4">{struct.example_es ? (<><p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example_es}</p><p className="text-sm text-slate-400">🇫🇷 {struct.example_fr || struct.example_en}</p></>) : (<><p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example}</p></>)}</div><p className="text-sm text-slate-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100">💡 {struct.explanation || struct.note}</p></div>))}{uniqueStructures.length === 0 && (<div className="text-center text-slate-400 py-10"><p>Aucune structure découverte pour le moment.</p><p className="text-sm">Avance dans les leçons pour en débloquer !</p></div>)}</div></div>); };
const NotebookContent = ({ userVocab }) => { const [activeTab, setActiveTab] = useState('vocab'); const safeVocab = Array.isArray(userVocab) ? userVocab : []; const vocabItems = safeVocab.filter(item => item.type === 'swipe'); const grammarItems = safeVocab.filter(item => item.type === 'grammar'); const structureItems = safeVocab.filter(item => item.type === 'structure'); return (<div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24 space-y-6"><h2 className="text-3xl font-black text-slate-900">Mon lexique 📚</h2><div className="flex space-x-2 bg-slate-100 p-1 rounded-xl">{['vocab', 'grammar', 'structure'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{tab === 'vocab' && 'Vocabulaire'}{tab === 'grammar' && 'Grammaire'}{tab === 'structure' && 'Structures'}</button>))}</div>{activeTab === 'vocab' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{vocabItems.length > 0 ? vocabItems.map((item, idx) => (<div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center"><div><p className="font-bold text-slate-800">{item.es}</p><p className="text-xs text-slate-400 italic">{item.context}</p></div><p className="text-indigo-600 font-medium">{item.en}</p></div>)) : <p className="text-slate-400 text-center col-span-2 py-10">Ton lexique est vide pour l'instant. Termine une leçon pour le remplir !</p>}</div>)}{activeTab === 'grammar' && (<div className="space-y-4">{grammarItems.length > 0 ? grammarItems.map((item, idx) => (<div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"><h4 className="font-bold text-lg text-indigo-600 mb-2">{item.title}</h4><p className="text-slate-600 mb-4 text-sm">{item.description}</p><div className="grid grid-cols-2 gap-2 text-sm">{item.conjugation && item.conjugation.map((row, rIdx) => (<div key={rIdx} className="flex justify-between bg-slate-50 p-2 rounded"><span className="text-slate-400">{row.pronoun}</span><span className="font-bold text-slate-800">{row.verb}</span></div>))}</div></div>)) : <p className="text-slate-400 text-center py-10">Aucune règle de grammaire enregistrée pour l'instant.</p>}</div>)}{activeTab === 'structure' && (<div className="grid gap-6">{structureItems.length > 0 ? structureItems.map((item, idx) => (<div key={idx} className="group relative bg-white overflow-hidden rounded-3xl border-2 border-slate-100 hover:border-indigo-100 transition-all shadow-sm hover:shadow-md"><div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div><div className="relative p-6"><div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 bg-white border-2 border-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><Hammer size={24} /></div><div><h4 className="font-black text-xl text-slate-800 leading-tight">{item.title}</h4><span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Grammaire</span></div></div><div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 flex flex-col items-center text-center relative overflow-hidden"><div className="hidden"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 z-10">Construction</span><code className="font-mono text-lg md:text-xl font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border-b-4 border-indigo-100 shadow-sm z-10">{item.formula}</code></div><div className="space-y-3"><div className="flex gap-4 items-start pl-2"><div className="w-1 h-12 bg-green-400 rounded-full shrink-0 mt-1"></div><div><p className="text-xs font-bold text-slate-400 uppercase mb-1">Exemple</p><p className="text-lg font-medium text-slate-700 italic">"{item.example}"</p></div></div>{item.note && (<div className="mt-4 bg-yellow-50 p-3 rounded-xl border border-yellow-100 flex gap-3 items-start"><span className="text-lg">💡</span><p className="text-sm text-yellow-800 font-medium leading-relaxed">{item.note}</p></div>)}</div></div></div>)) : (<div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center"><div className="p-4 bg-white rounded-full shadow-sm mb-4"><Hammer className="h-8 w-8 text-slate-300" /></div><p className="text-slate-900 font-bold text-lg">Aucune structure découverte</p><p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">Avance dans les leçons pour débloquer tes premières fiches de construction de phrases !</p></div>)}</div>)}</div>); };