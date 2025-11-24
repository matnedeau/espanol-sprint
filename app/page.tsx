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

/* --- GÉNÉRATEUR DE CURRICULUM (A1 -> C1) --- */
const LEVELS_CONFIG = [
  { name: "A1", count: 20, title: "Débutant", desc: "Les bases de survie" },
  { name: "A2", count: 20, title: "Élémentaire", desc: "Raconter et décrire" },
  { name: "B1", count: 20, title: "Intermédiaire", desc: "Opinions et projets" },
  { name: "B2", count: 20, title: "Avancé", desc: "Débat et argumentation" },
  { name: "C1", count: 20, title: "Expert", desc: "Nuances et maîtrise native" }
];

const LESSON_TOPICS = {
  1: "Hola! (Salutations)", 2: "Être & Avoir", 3: "La Famille", 4: "Nourriture & Goûts", 5: "Voyage & Nombres",
  6: "La Ville", 7: "Vêtements", 8: "La Maison", 9: "Le Corps", 10: "Bilan A1",
  11: "Les Animaux", 12: "La Météo", 13: "L'École", 14: "Les Loisirs", 15: "Les Amis",
  16: "Sentiments", 17: "Saisons", 18: "Nature", 19: "Questions", 20: "Examen Final A1"
};

const generateLessonList = () => {
  const list = [];
  let idCounter = 1;
  LEVELS_CONFIG.forEach(lvl => {
    for (let i = 0; i < lvl.count; i++) {
      list.push({ 
        id: idCounter, 
        title: LESSON_TOPICS[idCounter] || `Leçon ${idCounter}`, 
        level: lvl.name, 
        desc: `${lvl.desc}` 
      });
      idCounter++;
    }
  });
  return list;
};

const INITIAL_LESSONS_LIST = generateLessonList();

/* --- CONTENU PÉDAGOGIQUE PREMIUM (MANUEL) --- */
const MANUAL_CONTENT = {
  // LEÇON 1 : BASES (16 cartes)
  1: [
    { id: 101, type: "swipe", es: "Hola", en: "Bonjour", context: "Hola, ¿qué tal?" },
    { id: 102, type: "swipe", es: "Buenos días", en: "Bonjour (Matin)", context: "Buenos días, mamá" },
    { id: 103, type: "grammar", title: "Être (Ser)", description: "Identité & Origine", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }] },
    { id: 104, type: "input", question: "Traduis : 'Je suis'", answer: ["yo soy", "soy"], hint: "Verbe Ser" },
    { id: 105, type: "swipe", es: "Soy francés", en: "Je suis français", context: "Soy francés de París" },
    { id: 106, type: "structure", title: "La Phrase Simple", formula: "Sujet (Optionnel) + Verbe + Adjectif", example: "Soy alto (Je suis grand)", note: "En espagnol, le pronom 'Yo' est souvent inutile." },
    { id: 107, type: "swipe", es: "Gracias", en: "Merci", context: "Muchas gracias" },
    { id: 108, type: "swipe", es: "Por favor", en: "S'il vous plaît", context: "Agua, por favor" },
    { id: 109, type: "swipe", es: "Mucho gusto", en: "Enchanté", context: "Hola, mucho gusto" },
    { id: 110, type: "input", question: "Traduis : 'Merci'", answer: ["gracias"], hint: "G..." },
    { id: 111, type: "swipe", es: "¿Cómo estás?", en: "Comment ça va ?", context: "Hola, ¿cómo estás?" },
    { id: 112, type: "swipe", es: "Muy bien", en: "Très bien", context: "Estoy muy bien, gracias" },
    { id: 113, type: "swipe", es: "Me llamo", en: "Je m'appelle", context: "Me llamo Pedro" },
    { id: 114, type: "structure", title: "Se Présenter", formula: "Me llamo + Prénom", example: "Me llamo Maria", note: "Littéralement : Je m'appelle moi-même..." },
    { id: 115, type: "input", question: "Je m'appelle...", answer: ["me llamo"], hint: "M... Ll..." },
    { id: 116, type: "swipe", es: "Adiós", en: "Au revoir", context: "Adiós amigos" }
  ],
  // LEÇON 2 : AVOIR & FAMILLE (15 cartes)
  2: [
    { id: 201, type: "swipe", es: "La familia", en: "La famille", context: "Amo a mi familia" },
    { id: 202, type: "grammar", title: "Avoir (Tener)", description: "Pour la possession (J'ai un chien) et l'âge (J'ai 20 ans).", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }, { pronoun: "Él/Ella", verb: "tiene", fr: "Il a" }] },
    { id: 203, type: "input", question: "J'ai (Tener)", answer: ["tengo", "yo tengo"], hint: "T..." },
    { id: 204, type: "swipe", es: "El padre", en: "Le père", context: "Mi padre es alto" },
    { id: 205, type: "structure", title: "La Possession", formula: "Mi / Tu / Su + Nom", example: "Mi casa (Ma maison)", note: "Attention : on ne met PAS d'article (le/la) devant 'Mi' ou 'Tu'." },
    { id: 206, type: "swipe", es: "Mi madre", en: "Ma mère", context: "Mi madre es guapa" },
    { id: 207, type: "swipe", es: "El hermano", en: "Le frère", context: "Tengo un hermano" },
    { id: 208, type: "swipe", es: "Tu hermana", en: "Ta soeur", context: "¿Tienes una hermana?" },
    { id: 209, type: "input", question: "Traduis : 'Ma mère'", answer: ["mi madre"], hint: "Possessif 'Mi'" },
    { id: 210, type: "swipe", es: "Tener hambre", en: "Avoir faim", context: "Tengo mucha hambre" },
    { id: 211, type: "swipe", es: "La casa", en: "La maison", context: "Vivo en una casa" },
    { id: 212, type: "swipe", es: "El perro", en: "Le chien", context: "Mi perro es fiel" },
    { id: 213, type: "swipe", es: "El gato", en: "Le chat", context: "El gato duerme" },
    { id: 214, type: "structure", title: "L'Âge", formula: "Tener + Nombre + Años", example: "Tengo 20 años", note: "En espagnol on 'possède' les années (Avoir), on ne 'est' pas (Être)." },
    { id: 215, type: "input", question: "J'ai un frère", answer: ["tengo un hermano"], hint: "Tengo..." }
  ],
  // LEÇON 3 : ACTIONS (15 cartes)
  3: [
    { id: 301, type: "swipe", es: "Hablar", en: "Parler", context: "Hablo español" },
    { id: 302, type: "grammar", title: "Verbes en -AR (Présent)", description: "Ce sont les verbes les plus courants. On enlève -AR et on ajoute :", conjugation: [{ pronoun: "Yo", verb: "-o", fr: "habl(o)" }, { pronoun: "Tú", verb: "-as", fr: "habl(as)" }, { pronoun: "Él", verb: "-a", fr: "habl(a)" }, { pronoun: "Nosotros", verb: "-amos", fr: "habl(amos)" }] },
    { id: 303, type: "input", question: "Je parle (Hablar)", answer: ["hablo", "yo hablo"], hint: "Terminaison -o" },
    { id: 304, type: "swipe", es: "Trabajar", en: "Travailler", context: "Trabajo en Madrid" },
    { id: 305, type: "structure", title: "La Négation", formula: "No + Verbe", example: "No hablo inglés (Je ne parle pas anglais)", note: "C'est simple : mets juste 'No' devant le verbe conjugué." },
    { id: 306, type: "swipe", es: "No trabajo", en: "Je ne travaille pas", context: "Hoy no trabajo" },
    { id: 307, type: "swipe", es: "Estudiar", en: "Étudier", context: "Estudio mucho" },
    { id: 308, type: "swipe", es: "Escuchar", en: "Écouter", context: "Escucho música" },
    { id: 309, type: "input", question: "Tu étudies (Estudiar)", answer: ["estudias", "tú estudias"], hint: "Terminaison -as" },
    { id: 310, type: "swipe", es: "Caminar", en: "Marcher", context: "Camino en el parque" },
    { id: 311, type: "swipe", es: "Comprar", en: "Acheter", context: "Compro pan" },
    { id: 312, type: "swipe", es: "Bailar", en: "Danser", context: "Me gusta bailar" },
    { id: 313, type: "swipe", es: "Cocinar", en: "Cuisiner", context: "Cocino la cena" },
    { id: 314, type: "swipe", es: "Viajar", en: "Voyager", context: "Me gusta viajar" },
    { id: 315, type: "structure", title: "La Question", formula: "¿ + Verbe + Sujet ?", example: "¿Hablas tú español?", note: "L'intonation monte à la fin." },
    { id: 316, type: "input", question: "Traduis : 'Je ne danse pas'", answer: ["no bailo", "yo no bailo"], hint: "No + Verbe" }
  ],
  // LEÇON 4 : NOURRITURE (15 cartes) - CORRIGÉE ET COMPLÈTE
  4: [
    { id: 401, type: "swipe", es: "La comida", en: "La nourriture", context: "Me gusta la comida" },
    { id: 402, type: "grammar", title: "Le Verbe Gustar (Aimer)", description: "Attention, il s'accorde avec ce qu'on aime !", conjugation: [{ pronoun: "Singulier", verb: "Me gusta", fr: "J'aime (le pain)" }, { pronoun: "Pluriel", verb: "Me gustan", fr: "J'aime (les fruits)" }] },
    { id: 403, type: "swipe", es: "Me gusta", en: "J'aime (ça me plaît)", context: "Me gusta el chocolate" },
    { id: 404, type: "input", question: "J'aime (Singulier)", answer: ["me gusta"], hint: "M... g..." },
    { id: 405, type: "swipe", es: "El pan", en: "Le pain", context: "Como pan con queso" },
    { id: 406, type: "swipe", es: "El agua", en: "L'eau", context: "Bebo agua" },
    { id: 407, type: "structure", title: "Exprimer ses goûts", formula: "Me gusta + Article + Nom", example: "Me gusta el pan (J'aime le pain)", note: "N'oublie pas l'article 'el' ou 'la' après Gustar." },
    { id: 408, type: "swipe", es: "La fruta", en: "Les fruits", context: "Me gusta la fruta" },
    { id: 409, type: "swipe", es: "La carne", en: "La viande", context: "No como carne" },
    { id: 410, type: "swipe", es: "Comer", en: "Manger", context: "Vamos a comer" },
    { id: 411, type: "swipe", es: "Beber", en: "Boire", context: "Beber agua es bueno" },
    { id: 412, type: "input", question: "Je mange du pain", answer: ["como pan", "yo como pan"], hint: "Comer (o)" },
    { id: 413, type: "swipe", es: "El desayuno", en: "Le petit-déjeuner", context: "El desayuno es importante" },
    { id: 414, type: "swipe", es: "La cena", en: "Le dîner", context: "La cena está lista" },
    { id: 415, type: "input", question: "J'aime les fruits (Pluriel)", answer: ["me gustan las frutas", "me gustan la fruta"], hint: "Me gustan..." }
  ],
  // LEÇON 5 : VOYAGE & NOMBRES (15 cartes) - CORRIGÉE ET COMPLÈTE
  5: [
    { id: 501, type: "swipe", es: "Uno, Dos, Tres", en: "Un, Deux, Trois", context: "Uno, dos, tres, ¡ya!" },
    { id: 502, type: "grammar", title: "Les Nombres 1-10", description: "Essentiels pour tout.", conjugation: [{ pronoun: "1-3", verb: "Uno, Dos, Tres", fr: "1, 2, 3" }, { pronoun: "4-6", verb: "Cuatro, Cinco, Seis", fr: "4, 5, 6" }, { pronoun: "7-10", verb: "Siete, Ocho, Nueve, Diez", fr: "7, 8, 9, 10" }] },
    { id: 503, type: "input", question: "Écris le chiffre 5", answer: ["cinco"], hint: "C..." },
    { id: 504, type: "swipe", es: "El viaje", en: "Le voyage", context: "Buen viaje" },
    { id: 505, type: "swipe", es: "El tren", en: "Le train", context: "Voy en tren" },
    { id: 506, type: "swipe", es: "El avión", en: "L'avion", context: "El avión es rápido" },
    { id: 507, type: "structure", title: "Moyen de Transport", formula: "Ir + EN + Transport", example: "Voy en coche (Je vais en voiture)", note: "On utilise toujours 'EN' pour les véhicules." },
    { id: 508, type: "swipe", es: "Ir", en: "Aller", context: "Voy a Madrid" },
    { id: 509, type: "input", question: "Je vais en train", answer: ["voy en tren"], hint: "Voy en..." },
    { id: 510, type: "swipe", es: "La playa", en: "La plage", context: "Vamos a la playa" },
    { id: 511, type: "swipe", es: "La montaña", en: "La montagne", context: "Me gusta la montaña" },
    { id: 512, type: "swipe", es: "El billete", en: "Le billet", context: "Un billete, por favor" },
    { id: 513, type: "swipe", es: "La maleta", en: "La valise", context: "Mi maleta es roja" },
    { id: 514, type: "structure", title: "Futur Proche", formula: "Ir + a + Infinitif", example: "Voy a comer (Je vais manger)", note: "Très utile pour parler de l'avenir sans conjuguer au futur." },
    { id: 515, type: "input", question: "Je vais voyager", answer: ["voy a viajar"], hint: "Voy a..." }
  ]
};

// Générateur pour les leçons 6 à 100
const generateAllContent = () => {
  const content = { ...MANUAL_CONTENT };
  for (let i = 6; i <= 100; i++) {
    // Placeholders plus structurés
    content[i] = [
      { id: i * 100 + 1, type: "structure", title: `Structure Leçon ${i}`, formula: "Sujet + Verbe + Reste", example: "Ejemplo de frase", note: "Grammaire du niveau en cours" },
      { id: i * 100 + 2, type: "swipe", es: `Palabra ${i}A`, en: `Mot ${i}A`, context: "Contexte A" },
      { id: i * 100 + 3, type: "swipe", es: `Palabra ${i}B`, en: `Mot ${i}B`, context: "Contexte B" },
      { id: i * 100 + 4, type: "grammar", title: `Verbe ${i}`, description: "Conjugaison", conjugation: [{ pronoun: "Yo", verb: "hago", fr: "je fais" }, { pronoun: "Tú", verb: "haces", fr: "tu fais" }] },
      { id: i * 100 + 5, type: "input", question: `Traduis le mot ${i}A`, answer: [`mot ${i}a`], hint: "..." },
      { id: i * 100 + 6, type: "swipe", es: `Palabra ${i}C`, en: `Mot ${i}C`, context: "Contexte C" },
      { id: i * 100 + 7, type: "swipe", es: `Palabra ${i}D`, en: `Mot ${i}D`, context: "Contexte D" },
      { id: i * 100 + 8, type: "swipe", es: `Palabra ${i}E`, en: `Mot ${i}E`, context: "Contexte E" },
      { id: i * 100 + 9, type: "structure", title: `Expression ${i}`, formula: "Idiome", example: "Expression courante", note: "À retenir" },
      { id: i * 100 + 10, type: "input", question: `Écris le mot ${i}B`, answer: [`mot ${i}b`], hint: "..." }
    ];
  }
  return content;
};
const INITIAL_LESSONS_CONTENT = generateAllContent();

const SENTENCE_STRUCTURES = [
  { id: 1, title: "La Phrase Simple", formula: "Sujet + Verbe + Complément", example_es: "Yo como una manzana.", example_en: "Je mange une pomme.", explanation: "Comme en français." },
  { id: 2, title: "La Négation", formula: "No + Verbe", example_es: "No hablo inglés.", example_en: "Je ne parle pas anglais.", explanation: "Juste 'No' avant." },
  { id: 3, title: "Le Futur Proche", formula: "Ir + a + Infinitif", example_es: "Voy a comer.", example_en: "Je vais manger.", explanation: "Très courant à l'oral." },
  { id: 4, title: "La Possession", formula: "Mi/Tu/Su + Nom", example_es: "Mi casa.", example_en: "Ma maison.", explanation: "Pas d'article devant." }
];

/* --- APPLICATION --- */
export default function EspanolSprintPro() {
  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [authError, setAuthError] = useState(""); 
  
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
    if (!confirm("ADMIN : Initialiser les 100 leçons dans Firebase ? (Cela peut prendre quelques secondes)")) return;
    try {
      await setDoc(doc(db, "meta", "roadmap"), { lessons: INITIAL_LESSONS_LIST });
      let count = 0;
      for (const [id, content] of Object.entries(INITIAL_LESSONS_CONTENT)) {
        await setDoc(doc(db, "lessons", id), { content: content });
        count++;
      }
      alert(`✅ ${count} Leçons mises à jour !`);
      window.location.reload(); 
    } catch (e) { alert("Erreur: " + e.message); }
  };

  const handleAuth = async (email, password, isSignUp) => {
    setLoading(true);
    setAuthError("");
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
        setAuthError("Email ou mot de passe vide.");
        setLoading(false);
        return;
    }
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        await setDoc(doc(db, "users", cred.user.uid), { name: cleanEmail.split('@')[0], email: cleanEmail, xp: 0, streak: 1, level: "A1", vocab: [], completedLessons: [], dailyLimit: { date: new Date().toDateString(), count: 0 } });
      } else { await signInWithEmailAndPassword(auth, cleanEmail, password); }
    } catch (error) { 
        let msg = "Erreur inconnue";
        if (error.code === 'auth/invalid-email') msg = "Format d'email invalide.";
        if (error.code === 'auth/invalid-credential') msg = "Identifiants incorrects.";
        setAuthError(msg); 
        setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setAuthError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) { 
      setAuthError("Erreur Google : " + error.message); 
      setLoading(false); 
    }
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
      let newLevel = "A1";
      if (totalDone >= 20) newLevel = "A2";
      if (totalDone >= 40) newLevel = "B1";
      if (totalDone >= 60) newLevel = "B2";
      if (totalDone >= 80) newLevel = "C1";

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
const AuthScreen = ({ onAuth, onGoogle, onBack, error }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}<div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
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