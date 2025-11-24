/* eslint-disable */
// @ts-nocheck
'use client';

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

// Fonction Audio
const speak = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
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

/* =======================================================================================
   🧠 CONTENT FACTORY : LE GÉNÉRATEUR DE CONTENU INTELLIGENT
   ======================================================================================= */

// 1. BANQUE DE DONNÉES (Vocabulaire Réel)
const DATA_BANK = {
  verbs: [
    { es: "Comer", en: "Manger", conj: "Como" }, { es: "Vivir", en: "Vivre", conj: "Vivo" },
    { es: "Beber", en: "Boire", conj: "Bebo" }, { es: "Leer", en: "Lire", conj: "Leo" },
    { es: "Escribir", en: "Écrire", conj: "Escribo" }, { es: "Correr", en: "Courir", conj: "Corro" },
    { es: "Abrir", en: "Ouvrir", conj: "Abro" }, { es: "Mirar", en: "Regarder", conj: "Miro" },
    { es: "Amar", en: "Aimer", conj: "Amo" }, { es: "Llamar", en: "Appeler", conj: "Llamo" }
  ],
  nouns: [
    { es: "El libro", en: "Le livre" }, { es: "La casa", en: "La maison" },
    { es: "El coche", en: "La voiture" }, { es: "La ciudad", en: "La ville" },
    { es: "El amigo", en: "L'ami" }, { es: "La playa", en: "La plage" },
    { es: "El tiempo", en: "Le temps" }, { es: "El trabajo", en: "Le travail" }
  ],
  connectors: [
    { es: "Pero", en: "Mais" }, { es: "Y", en: "Et" }, { es: "O", en: "Ou" },
    { es: "Porque", en: "Parce que" }, { es: "Cuando", en: "Quand" }
  ],
  tips: [
    "En espagnol, le 'H' est toujours muet !",
    "Les points d'interrogation se mettent aussi au début : ¿ ?",
    "L'accent tonique est crucial pour être compris.",
    "Le 'V' se prononce presque comme un 'B'.",
    "Les adjectifs se placent généralement après le nom."
  ]
};

// 2. LOGIQUE DU CURRICULUM (A1 -> C1)
const CURRICULUM_LOGIC = {
  A1: [ // 1-20
    { topic: "Bases", grammar: "Présent" }, { topic: "Famille", grammar: "Possession" },
    { topic: "Routine", grammar: "Verbes -AR" }, { topic: "Goûts", grammar: "Gustar" },
    { topic: "Voyage", grammar: "Futur Proche" }, { topic: "Ville", grammar: "Hay (Il y a)" },
    { topic: "Vêtements", grammar: "Adjectifs" }, { topic: "Maison", grammar: "Estar (Lieu)" },
    { topic: "Corps", grammar: "Avoir mal" }, { topic: "Bilan A1", grammar: "Révision" }
  ],
  A2: [ // 21-40
    { topic: "Passé", grammar: "Passé Composé" }, { topic: "Souvenirs", grammar: "Imparfait" },
    { topic: "Projets", grammar: "Futur Simple" }, { topic: "Comparaison", grammar: "Más que" },
    { topic: "Obligation", grammar: "Tener que" }, { topic: "Santé", grammar: "Impératif" }
  ],
  B1: [ // 41-60
    { topic: "Opinion", grammar: "Subjonctif" }, { topic: "Hypothèse", grammar: "Conditionnel" },
    { topic: "Discours", grammar: "Style Indirect" }, { topic: "Relations", grammar: "Por / Para" }
  ]
};

// 3. GÉNÉRATEUR DE LEÇON (Remplace les "Palabra 4A")
const generateStructuredLesson = (id) => {
  let level = "A1";
  let config = { topic: "Thème Général", grammar: "Grammaire" };

  if (id <= 20) { level = "A1"; config = CURRICULUM_LOGIC.A1[(id-1)%10] || {topic: "Révision", grammar: "Mix"}; }
  else if (id <= 40) { level = "A2"; config = CURRICULUM_LOGIC.A2[(id-21)%6] || {topic: "Avancé A2", grammar: "Mix"}; }
  else if (id <= 60) { level = "B1"; config = CURRICULUM_LOGIC.B1[(id-41)%4] || {topic: "Expert B1", grammar: "Mix"}; }
  else { level = "B2"; config = { topic: "Avancé", grammar: "Nuances" }; }

  // Pioche aléatoire intelligente dans la banque
  const randVerb = DATA_BANK.verbs[id % DATA_BANK.verbs.length];
  const randNoun = DATA_BANK.nouns[id % DATA_BANK.nouns.length];
  const randConn = DATA_BANK.connectors[id % DATA_BANK.connectors.length];
const tipIdx = id % DATA_BANK.tips.length;
  const randTip = DATA_BANK.tips[tipIdx];
  
  let cardId = id * 1000;

  return [
    // 1. Intro Structure
    { id: cardId++, type: "structure", title: `Leçon ${id} : ${config.topic}`, formula: config.grammar, example: `${randVerb.es} ${randNoun.es}`, note: `Focus sur : ${config.topic}` },
    
    // 2. Grammaire Contextuelle
    { id: cardId++, type: "grammar", title: `Verbe : ${randVerb.es}`, description: `Conjugaison ${config.grammar}`, conjugation: [{ pronoun: "Yo", verb: randVerb.conj, fr: `Je ${randVerb.en.toLowerCase()}` }, { pronoun: "Tú", verb: `${randVerb.es}as`, fr: `Tu ${randVerb.en.toLowerCase()}s` }] },

    // 3. Vocabulaire Thématique (Vrais mots)
    { id: cardId++, type: "swipe", es: randNoun.es, en: randNoun.en, context: `Uso: ${randNoun.es} es importante` },
    { id: cardId++, type: "swipe", es: randVerb.es, en: randVerb.en, context: `Acción: ${randVerb.conj} mucho` },
    
    // 4. Exercice Actif (Input)
    { id: cardId++, type: "input", question: `Traduis '${randNoun.en}'`, answer: [randNoun.es.toLowerCase()], hint: `${randNoun.es.charAt(0)}...` },
    
    // 5. Connecteur
    { id: cardId++, type: "swipe", es: randConn.es, en: randConn.en, context: "Mot de liaison" },
    { 
      id: cardId++, 
      type: "structure", 
      title: "Astuce Pro 💡", 
      formula: "Culture & Langue", 
      example: randTip, 
      note: "Bon à savoir !" 
    },
    
    // 6. Phrase Complexe (Structure)
    { id: cardId++, type: "structure", title: "Phrase Type", formula: "Sujet + Verbe + Nom", example: `Yo ${randVerb.conj} ${randNoun.es.toLowerCase()}`, note: "Entraîne-toi à prononcer." },
    
    // 7. Exercice Final
    { id: cardId++, type: "input", question: `Écris le verbe '${randVerb.en}'`, answer: [randVerb.es.toLowerCase()], hint: `${randVerb.es.substring(0,3)}...` }
  ];
};

/* --- DATASET --- */
const INITIAL_LESSONS_LIST = [];
let idCounter = 1;
// Génération de la roadmap (100 leçons)
const levels = ["A1", "A2", "B1", "B2", "C1"];
levels.forEach(lvl => {
    for(let i=0; i<20; i++) {
        let topic = "Pratique";
        if (lvl === "A1" && CURRICULUM_LOGIC.A1[i]) topic = CURRICULUM_LOGIC.A1[i].topic;
        INITIAL_LESSONS_LIST.push({ id: idCounter++, title: topic, level: lvl, desc: "Cours complet" });
    }
});

/* --- PARTIE 1 : LEÇONS 1 à 30 (Niveaux A1 - A2 Début) --- */
const CONTENT_PART_1 = {
  // --- A1 : LES BASES ---
  1: [
    { id: 101, type: "swipe", es: "Hola", en: "Bonjour", context: "Salutation universelle" },
    { id: 102, type: "grammar", title: "Être (Ser)", description: "Identité & Origine", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }] },
    { id: 103, type: "input", question: "Traduis 'Je suis'", answer: ["yo soy", "soy"], hint: "Verbe Ser" },
    { id: 104, type: "structure", title: "La Phrase Simple", formula: "Sujet + Verbe", example: "Soy Pablo", note: "Le sujet est souvent omis." },
    { id: 105, type: "swipe", es: "Gracias", en: "Merci", context: "Politesse" },
    { id: 106, type: "swipe", es: "Adiós", en: "Au revoir", context: "Départ" }
  ],
  2: [
    { id: 201, type: "swipe", es: "La familia", en: "La famille", context: "Groupe social" },
    { id: 202, type: "grammar", title: "Avoir (Tener)", description: "Possession", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }] },
    { id: 203, type: "input", question: "J'ai", answer: ["tengo"], hint: "T..." },
    { id: 204, type: "swipe", es: "Madre", en: "Mère", context: "Parent" },
    { id: 205, type: "swipe", es: "Padre", en: "Père", context: "Parent" },
    { id: 206, type: "structure", title: "Possession", formula: "Mi + Nom", example: "Mi casa", note: "Pas d'article devant" }
  ],
  3: [
    { id: 301, type: "grammar", title: "Verbes -AR", description: "Présent", conjugation: [{ pronoun: "Yo", verb: "-o", fr: "o" }, { pronoun: "Tú", verb: "-as", fr: "as" }] },
    { id: 302, type: "swipe", es: "Hablar", en: "Parler", context: "Verbe régulier" },
    { id: 303, type: "swipe", es: "Trabajar", en: "Travailler", context: "Job" },
    { id: 304, type: "input", question: "Je parle", answer: ["hablo"], hint: "Terminaison -o" },
    { id: 305, type: "structure", title: "Négation", formula: "No + Verbe", example: "No hablo", note: "No se place avant" }
  ],
  4: [
    { id: 401, type: "swipe", es: "La comida", en: "La nourriture", context: "Repas" },
    { id: 402, type: "grammar", title: "Gustar (Aimer)", description: "Ça me plaît", conjugation: [{ pronoun: "Sing", verb: "Me gusta", fr: "J'aime" }, { pronoun: "Plur", verb: "Me gustan", fr: "J'aime les..." }] },
    { id: 403, type: "input", question: "J'aime le pain", answer: ["me gusta el pan"], hint: "Me g..." },
    { id: 404, type: "swipe", es: "El agua", en: "L'eau", context: "Boisson" },
    { id: 405, type: "swipe", es: "Comer", en: "Manger", context: "Verbe -ER" }
  ],
  5: [
    { id: 501, type: "swipe", es: "Uno, Dos, Tres", en: "1, 2, 3", context: "Compter" },
    { id: 502, type: "grammar", title: "L'heure", description: "Ser + Las", conjugation: [{ pronoun: "2h-12h", verb: "Son las...", fr: "Il est..." }, { pronoun: "1h", verb: "Es la una", fr: "Il est 1h" }] },
    { id: 503, type: "input", question: "Il est deux heures", answer: ["son las dos"], hint: "Son..." },
    { id: 504, type: "swipe", es: "Hoy", en: "Aujourd'hui", context: "Temps" },
    { id: 505, type: "swipe", es: "Mañana", en: "Demain", context: "Futur" }
  ],
  6: [
    { id: 601, type: "swipe", es: "La ciudad", en: "La ville", context: "Lieu" },
    { id: 602, type: "grammar", title: "Aller (Ir)", description: "Irrégulier", conjugation: [{ pronoun: "Yo", verb: "voy", fr: "Je vais" }, { pronoun: "Tú", verb: "vas", fr: "Tu vas" }] },
    { id: 603, type: "structure", title: "Direction", formula: "Ir + a + Lieu", example: "Voy a Madrid", note: "Toujours 'a' après Ir" },
    { id: 604, type: "swipe", es: "La calle", en: "La rue", context: "Adresse" },
    { id: 605, type: "input", question: "Je vais à la plage", answer: ["voy a la playa"], hint: "Voy..." }
  ],
  7: [
    { id: 701, type: "swipe", es: "La ropa", en: "Les vêtements", context: "Mode" },
    { id: 702, type: "swipe", es: "Rojo", en: "Rouge", context: "Couleur" },
    { id: 703, type: "swipe", es: "Azul", en: "Bleu", context: "Couleur" },
    { id: 704, type: "structure", title: "Adjectifs", formula: "Nom + Adjectif", example: "Una camisa roja", note: "L'adjectif s'accorde" },
    { id: 705, type: "input", question: "Une maison blanche", answer: ["una casa blanca"], hint: "Blanca" }
  ],
  8: [
    { id: 801, type: "grammar", title: "Estar (Être)", description: "État temporaire / Lieu", conjugation: [{ pronoun: "Yo", verb: "estoy", fr: "Je suis (ici)" }, { pronoun: "Tú", verb: "estás", fr: "Tu es (malade)" }] },
    { id: 802, type: "structure", title: "Ser vs Estar", formula: "Ser=Identité / Estar=État", example: "Soy Pablo / Estoy cansado", note: "Essentiel !" },
    { id: 803, type: "swipe", es: "Cansado", en: "Fatigué", context: "État" },
    { id: 804, type: "swipe", es: "Enfermo", en: "Malade", context: "Santé" },
    { id: 805, type: "input", question: "Je suis fatigué", answer: ["estoy cansado"], hint: "Estar" }
  ],
  9: [
    { id: 901, type: "swipe", es: "El cuerpo", en: "Le corps", context: "Anatomie" },
    { id: 902, type: "swipe", es: "La cabeza", en: "La tête", context: "Partie du corps" },
    { id: 903, type: "swipe", es: "La mano", en: "La main", context: "Partie du corps" },
    { id: 904, type: "structure", title: "Avoir mal", formula: "Me duele + Corps", example: "Me duele la cabeza", note: "Comme Gustar" },
    { id: 905, type: "input", question: "J'ai mal à la tête", answer: ["me duele la cabeza"], hint: "Me duele..." }
  ],
  10: [
    { id: 1001, type: "swipe", es: "Examen", en: "Examen", context: "Test" },
    { id: 1002, type: "input", question: "Traduis : 'Bonjour'", answer: ["hola"], hint: "H..." },
    { id: 1003, type: "input", question: "Conjugue : Tu es (Estar)", answer: ["estás"], hint: "E..." },
    { id: 1004, type: "input", question: "Traduis : 'J'aime'", answer: ["me gusta"], hint: "M... g..." },
    { id: 1005, type: "input", question: "Phrase : Je vais manger", answer: ["voy a comer"], hint: "Futur proche" }
  ],
  // ... (Leçons 11 à 19 similaires sur Animaux, Météo, École, Loisirs, Amis, Sentiments, Saisons, Nature, Questions) ...
  11: [{ id: 1101, type: "swipe", es: "El perro", en: "Chien", context: "Animal" }, { id: 1102, type: "swipe", es: "El gato", en: "Chat", context: "Animal" }, { id: 1103, type: "input", question: "Le chat", answer: ["el gato"], hint: "El g..." }],
  12: [{ id: 1201, type: "swipe", es: "Hace sol", en: "Il y a du soleil", context: "Météo" }, { id: 1202, type: "swipe", es: "Lluvia", en: "Pluie", context: "Temps" }, { id: 1203, type: "grammar", title: "Verbe Hacer (Météo)", description: "Il fait...", conjugation: [{ pronoun: "Il fait", verb: "Hace", fr: "froid/chaud" }] }],
  13: [{ id: 1301, type: "swipe", es: "La escuela", en: "L'école", context: "Éducation" }, { id: 1302, type: "swipe", es: "El libro", en: "Livre", context: "Lecture" }, { id: 1303, type: "swipe", es: "Aprender", en: "Apprendre", context: "Verbe" }],
  14: [{ id: 1401, type: "swipe", es: "Jugar", en: "Jouer", context: "Jeu" }, { id: 1402, type: "swipe", es: "Fútbol", en: "Foot", context: "Sport" }, { id: 1403, type: "structure", title: "Jouer à", formula: "Jugar + a + al", example: "Juego al fútbol", note: "a + el = al" }],
  15: [{ id: 1501, type: "swipe", es: "Amigo", en: "Ami", context: "Relation" }, { id: 1502, type: "swipe", es: "Fiesta", en: "Fête", context: "Social" }, { id: 1503, type: "swipe", es: "Salir", en: "Sortir", context: "Action" }],
  16: [{ id: 1601, type: "swipe", es: "Feliz", en: "Heureux", context: "Émotion" }, { id: 1602, type: "swipe", es: "Triste", en: "Triste", context: "Émotion" }, { id: 1603, type: "structure", title: "Être + Émotion", formula: "Estar + Adjectif", example: "Estoy feliz", note: "État passager" }],
  17: [{ id: 1701, type: "swipe", es: "Verano", en: "Été", context: "Saison" }, { id: 1702, type: "swipe", es: "Invierno", en: "Hiver", context: "Saison" }, { id: 1703, type: "input", question: "L'été", answer: ["el verano"], hint: "V..." }],
  18: [{ id: 1801, type: "swipe", es: "Árbol", en: "Arbre", context: "Nature" }, { id: 1802, type: "swipe", es: "Mar", en: "Mer", context: "Océan" }, { id: 1803, type: "swipe", es: "Sol", en: "Soleil", context: "Astre" }],
  19: [{ id: 1901, type: "swipe", es: "Qué", en: "Quoi/Quel", context: "Question" }, { id: 1902, type: "swipe", es: "Dónde", en: "Où", context: "Lieu" }, { id: 1903, type: "swipe", es: "Cuándo", en: "Quand", context: "Temps" }, { id: 1904, type: "structure", title: "Questions", formula: "¿Mot + Verbe?", example: "¿Dónde vives?", note: "Accents obligatoires" }],
  20: [{ id: 2001, type: "structure", title: "BILAN A1", formula: "Test Final", example: "Prêt ?", note: "Validation" }, { id: 2002, type: "input", question: "Où habites-tu ?", answer: ["dónde vives", "¿dónde vives?"], hint: "D..." }],

  // --- A2 : ÉLÉMENTAIRE (Passé & Futur) ---
  21: [
    { id: 2101, type: "structure", title: "Le Passé Composé", formula: "Haber + Participe", example: "He comido", note: "Passé récent" },
    { id: 2102, type: "grammar", title: "Haber (Auxiliaire)", description: "Présent", conjugation: [{ pronoun: "Yo", verb: "he", fr: "j'ai" }, { pronoun: "Tú", verb: "has", fr: "tu as" }, { pronoun: "Él", verb: "ha", fr: "il a" }] },
    { id: 2103, type: "swipe", es: "Hablado", en: "Parlé", context: "Participe" },
    { id: 2104, type: "input", question: "J'ai parlé", answer: ["he hablado"], hint: "He..." }
  ],
  22: [
    { id: 2201, type: "grammar", title: "L'Imparfait -AR", description: "Souvenirs", conjugation: [{ pronoun: "Yo", verb: "aba", fr: "ais" }, { pronoun: "Tú", verb: "abas", fr: "ais" }] },
    { id: 2202, type: "swipe", es: "Jugaba", en: "Je jouais", context: "Enfance" },
    { id: 2203, type: "input", question: "Je parlais", answer: ["hablaba"], hint: "-aba" }
  ],
  23: [
    { id: 2301, type: "structure", title: "Futur Proche", formula: "Ir a + Infinitif", example: "Voy a comer", note: "Je vais manger" },
    { id: 2302, type: "input", question: "Je vais sortir", answer: ["voy a salir"], hint: "Salir" },
    { id: 2303, type: "swipe", es: "Pronto", en: "Bientôt", context: "Temps" }
  ],
  24: [
    { id: 2401, type: "structure", title: "Comparaison (+)", formula: "Más ... que", example: "Más alto que tú", note: "Plus ... que" },
    { id: 2402, type: "structure", title: "Comparaison (-)", formula: "Menos ... que", example: "Menos rico que", note: "Moins ... que" },
    { id: 2403, type: "input", question: "Plus grand que", answer: ["más grande que"], hint: "Más..." }
  ],
  25: [
    { id: 2501, type: "structure", title: "Obligation", formula: "Tener que + Infinitif", example: "Tengo que estudiar", note: "Je dois..." },
    { id: 2502, type: "swipe", es: "Deber", en: "Devoir", context: "Verbe" },
    { id: 2503, type: "input", question: "Je dois manger", answer: ["tengo que comer"], hint: "Tengo..." }
  ],
  26: [{ id: 2601, type: "swipe", es: "Médico", en: "Médecin", context: "Santé" }, { id: 2602, type: "swipe", es: "Dolor", en: "Douleur", context: "Sensation" }, { id: 2603, type: "input", question: "J'ai mal", answer: ["me duele"], hint: "Me d..." }],
  27: [{ id: 2701, type: "swipe", es: "Hotel", en: "Hôtel", context: "Voyage" }, { id: 2702, type: "swipe", es: "Reserva", en: "Réservation", context: "Action" }, { id: 2703, type: "swipe", es: "Habitación", en: "Chambre", context: "Lieu" }],
  28: [{ id: 2801, type: "swipe", es: "La cuenta", en: "L'addition", context: "Resto" }, { id: 2802, type: "swipe", es: "Pedir", en: "Commander/Demander", context: "Verbe" }, { id: 2803, type: "swipe", es: "Delicioso", en: "Délicieux", context: "Goût" }],
  29: [{ id: 2901, type: "swipe", es: "Tienda", en: "Magasin", context: "Shopping" }, { id: 2902, type: "swipe", es: "Barato", en: "Pas cher", context: "Prix" }, { id: 2903, type: "swipe", es: "Caro", en: "Cher", context: "Prix" }],
  30: [{ id: 3001, type: "swipe", es: "Dinero", en: "Argent", context: "Banque" }, { id: 3002, type: "swipe", es: "Pagar", en: "Payer", context: "Action" }, { id: 3003, type: "swipe", es: "Tarjeta", en: "Carte", context: "Paiement" }],

// --- SUITE A2 (31-40) ---
  31: [
    { id: 3101, type: "swipe", es: "El correo", en: "La poste/Le courrier", context: "Enviar una carta" },
    { id: 3102, type: "swipe", es: "El sello", en: "Le timbre", context: "Poner un sello" },
    { id: 3103, type: "swipe", es: "El paquete", en: "Le colis", context: "Recibir un paquete" },
    { id: 3104, type: "swipe", es: "Enviar", en: "Envoyer", context: "Enviar un mensaje" },
    { id: 3105, type: "input", question: "Traduis : 'Le timbre'", answer: ["el sello", "sello"], hint: "S..." }
  ],
  32: [
    { id: 3201, type: "swipe", es: "Ayuda", en: "Aide", context: "¡Ayuda, por favor!" },
    { id: 3202, type: "swipe", es: "Emergencia", en: "Urgence", context: "Es una emergencia" },
    { id: 3203, type: "swipe", es: "La policía", en: "La police", context: "Llamar a la policía" },
    { id: 3204, type: "structure", title: "Urgence", formula: "¡Socorro! / ¡Auxilio!", example: "Au secours !", note: "À connaître par cœur." },
    { id: 3205, type: "input", question: "Traduis : 'Aide !'", answer: ["ayuda", "¡ayuda!"], hint: "A..." }
  ],
  33: [
    { id: 3301, type: "swipe", es: "La fiesta", en: "La fête", context: "Ir de fiesta" },
    { id: 3302, type: "swipe", es: "Navidad", en: "Noël", context: "Feliz Navidad" },
    { id: 3303, type: "swipe", es: "Cumpleaños", en: "Anniversaire", context: "Feliz cumpleaños" },
    { id: 3304, type: "swipe", es: "Regalo", en: "Cadeau", context: "Comprar un regalo" },
    { id: 3305, type: "swipe", es: "Celebrar", en: "Célébrer", context: "Vamos a celebrar" }
  ],
  34: [
    { id: 3401, type: "swipe", es: "La siesta", en: "La sieste", context: "Dormir la siesta" },
    { id: 3402, type: "swipe", es: "Tapas", en: "Tapas", context: "Comer tapas" },
    { id: 3403, type: "swipe", es: "Flamenco", en: "Flamenco", context: "Baile español" },
    { id: 3404, type: "swipe", es: "Costumbre", en: "Coutume/Habitude", context: "Es una costumbre" },
    { id: 3405, type: "input", question: "Traduis : 'Coutume'", answer: ["costumbre"], hint: "C..." }
  ],
  35: [
    { id: 3501, type: "swipe", es: "Norte", en: "Nord", context: "En el norte" },
    { id: 3502, type: "swipe", es: "Sur", en: "Sud", context: "En el sur" },
    { id: 3503, type: "swipe", es: "Este", en: "Est", context: "El sol sale por el este" },
    { id: 3504, type: "swipe", es: "Oeste", en: "Ouest", context: "Al oeste" },
    { id: 3505, type: "swipe", es: "El mapa", en: "La carte", context: "Mirar el mapa" }
  ],
  36: [
    { id: 3601, type: "grammar", title: "Le Gérondif (En train de)", description: "Estar + Verbe-ANDO/IENDO", conjugation: [{ pronoun: "Hablar", verb: "Estoy hablando", fr: "Je suis en train de parler" }, { pronoun: "Comer", verb: "Estás comiendo", fr: "Tu manges (là maintenant)" }] },
    { id: 3602, type: "swipe", es: "Estoy comiendo", en: "Je suis en train de manger", context: "Ahora mismo" },
    { id: 3603, type: "swipe", es: "Estás leyendo", en: "Tu es en train de lire", context: "¿Qué estás leyendo?" },
    { id: 3604, type: "input", question: "Je parle (en ce moment)", answer: ["estoy hablando"], hint: "Estar + Hablando" },
    { id: 3605, type: "structure", title: "Formation Gérondif", formula: "Radical + ANDO (ar) / IENDO (er/ir)", example: "Cant-ando, Viv-iendo", note: "Action en cours." }
  ],
  37: [
    { id: 3701, type: "grammar", title: "Pronoms COD (Le/La)", description: "Remplacer le nom", conjugation: [{ pronoun: "Lo", verb: "Lo como", fr: "Je LE mange" }, { pronoun: "La", verb: "La veo", fr: "Je LA vois" }] },
    { id: 3702, type: "swipe", es: "Lo tengo", en: "Je l'ai (le)", context: "¿El libro? Lo tengo." },
    { id: 3703, type: "swipe", es: "La quiero", en: "Je l'aime/veux (la)", context: "¿La manzana? La quiero." },
    { id: 3704, type: "input", question: "Je le mange (El pan)", answer: ["lo como"], hint: "Lo + verbe" },
    { id: 3705, type: "structure", title: "Place du pronom", formula: "Avant le verbe conjugué", example: "Lo veo (Je le vois)", note: "Mais après l'infinitif : Verlo." }
  ],
  38: [
    { id: 3801, type: "swipe", es: "Siempre", en: "Toujours", context: "Te amaré siempre" },
    { id: 3802, type: "swipe", es: "Nunca", en: "Jamais", context: "Nunca digas nunca" },
    { id: 3803, type: "swipe", es: "A veces", en: "Parfois", context: "A veces voy al cine" },
    { id: 3804, type: "swipe", es: "A menudo", en: "Souvent", context: "Vengo a menudo" },
    { id: 3805, type: "input", question: "Traduis : 'Jamais'", answer: ["nunca"], hint: "N..." }
  ],
  39: [
    { id: 3901, type: "structure", title: "Por vs Para", formula: "Por (Cause) / Para (But)", example: "Por ti (à cause de toi) / Para ti (pour toi)", note: "La bête noire des élèves !" },
    { id: 3902, type: "swipe", es: "Para mí", en: "Pour moi", context: "Es para mí" },
    { id: 3903, type: "swipe", es: "Por favor", en: "S'il vous plaît", context: "Demande" },
    { id: 3904, type: "swipe", es: "Para trabajar", en: "Pour travailler", context: "But" },
    { id: 3905, type: "input", question: "C'est pour toi", answer: ["es para ti"], hint: "Para..." }
  ],
  40: [
    { id: 4001, type: "swipe", es: "Bilan A2", en: "Niveau A2 validé", context: "Félicitations" },
    { id: 4002, type: "input", question: "Je suis en train de parler", answer: ["estoy hablando"], hint: "Gérondif" },
    { id: 4003, type: "input", question: "Je l'ai (le livre)", answer: ["lo tengo"], hint: "Pronom COD" },
    { id: 4004, type: "input", question: "Hier", answer: ["ayer"], hint: "Temps" },
    { id: 4005, type: "swipe", es: "Listo", en: "Prêt", context: "Estoy listo para B1" }
  ],

  // --- DÉBUT B1 : INTERMÉDIAIRE (41-60) ---
  41: [
    { id: 4101, type: "grammar", title: "Futur Simple", description: "Infinitif + é, ás, á, emos, án", conjugation: [{ pronoun: "Yo", verb: "hablaré", fr: "Je parlerai" }, { pronoun: "Tú", verb: "comerás", fr: "Tu mangeras" }] },
    { id: 4102, type: "swipe", es: "Iré", en: "J'irai", context: "Ir au futur" },
    { id: 4103, type: "swipe", es: "Haré", en: "Je ferai", context: "Hacer (irrégulier)" },
    { id: 4104, type: "swipe", es: "Tendré", en: "J'aurai", context: "Tener (irrégulier)" },
    { id: 4105, type: "input", question: "Je parlerai", answer: ["hablaré", "yo hablaré"], hint: "Hablar + é" }
  ],
  42: [
    { id: 4201, type: "grammar", title: "Le Conditionnel", description: "Infinitif + ía, ías, ía...", conjugation: [{ pronoun: "Yo", verb: "comería", fr: "Je mangerais" }, { pronoun: "Tú", verb: "vivirías", fr: "Tu vivrais" }] },
    { id: 4202, type: "swipe", es: "Me gustaría", en: "J'aimerais", context: "Politesse" },
    { id: 4203, type: "swipe", es: "Podría", en: "Je pourrais", context: "Poder" },
    { id: 4204, type: "structure", title: "Politesse", formula: "Verbe au conditionnel", example: "¿Podrías ayudarme?", note: "Pour demander gentiment." },
    { id: 4205, type: "input", question: "Je voudrais (Querer)", answer: ["querría", "quisiera"], hint: "Querr..." }
  ],
  43: [
    { id: 4301, type: "structure", title: "Le Subjonctif", formula: "Verbe Désir/Doute + QUE + Subjonctif", example: "Quiero que vengas", note: "Mode de l'irréel." },
    { id: 4302, type: "grammar", title: "Subjonctif Présent", description: "Inversion: AR->E, ER/IR->A", conjugation: [{ pronoun: "Que yo (Hablar)", verb: "hable", fr: "que je parle" }, { pronoun: "Que tú (Comer)", verb: "comas", fr: "que tu manges" }] },
    { id: 4303, type: "swipe", es: "Que tengas", en: "Que tu aies", context: "Espero que tengas suerte" },
    { id: 4304, type: "swipe", es: "Que sea", en: "Qu'il soit", context: "No creo que sea verdad" },
    { id: 4305, type: "input", question: "Que je mange", answer: ["coma", "yo coma"], hint: "Comer -> Coma" }
  ],
  44: [
    { id: 4401, type: "grammar", title: "L'Impératif (Ordres)", description: "Donner un ordre", conjugation: [{ pronoun: "Tú (Hablar)", verb: "¡Habla!", fr: "Parle !" }, { pronoun: "Usted (Comer)", verb: "¡Coma!", fr: "Mangez !" }] },
    { id: 4402, type: "swipe", es: "¡Mira!", en: "Regarde !", context: "Mirar" },
    { id: 4403, type: "swipe", es: "¡Escucha!", en: "Écoute !", context: "Escuchar" },
    { id: 4404, type: "swipe", es: "¡Ven aquí!", en: "Viens ici !", context: "Venir" },
    { id: 4405, type: "input", question: "Mange ! (Tu)", answer: ["come", "¡come!"], hint: "Comer" }
  ],
  45: [
    { id: 4501, type: "swipe", es: "Quizás", en: "Peut-être", context: "Quizás vaya" },
    { id: 4502, type: "swipe", es: "Tal vez", en: "Peut-être", context: "Tal vez sea mejor" },
    { id: 4503, type: "swipe", es: "Dudar", en: "Douter", context: "Dudo que..." },
    { id: 4504, type: "structure", title: "Exprimer le doute", formula: "Quizás + Subjonctif", example: "Quizás llueva (Il pleuvra peut-être)", note: "Indique une incertitude." },
    { id: 4505, type: "input", question: "Peut-être", answer: ["quizás", "tal vez"], hint: "Q... ou T..." }
  ],
  46: [
    { id: 4601, type: "swipe", es: "Medio ambiente", en: "Environnement", context: "Ecología" },
    { id: 4602, type: "swipe", es: "Reciclar", en: "Recycler", context: "Acción" },
    { id: 4603, type: "swipe", es: "Contaminación", en: "Pollution", context: "Problema" },
    { id: 4604, type: "swipe", es: "Cambio climático", en: "Changement climatique", context: "Clima" },
    { id: 4605, type: "input", question: "Traduis : 'Pollution'", answer: ["contaminación"], hint: "C..." }
  ],
  47: [
    { id: 4701, type: "swipe", es: "Ordenador", en: "Ordinateur", context: "Tecnología" },
    { id: 4702, type: "swipe", es: "Pantalla", en: "Écran", context: "Hardware" },
    { id: 4703, type: "swipe", es: "Descargar", en: "Télécharger", context: "Internet" },
    { id: 4704, type: "swipe", es: "Red social", en: "Réseau social", context: "Facebook, etc." },
    { id: 4705, type: "input", question: "Télécharger", answer: ["descargar"], hint: "D..." }
  ],
  48: [
    { id: 4801, type: "structure", title: "Discours Rapporté", formula: "Dijo que...", example: "Dijo que venía (Il a dit qu'il venait)", note: "Concordance des temps." },
    { id: 4802, type: "swipe", es: "Dijo que", en: "Il a dit que", context: "Pasado" },
    { id: 4803, type: "swipe", es: "Preguntó si", en: "Il a demandé si", context: "Pregunta" },
    { id: 4804, type: "grammar", title: "Imparfait (Rappel)", description: "Utilisé dans le discours rapporté au passé", conjugation: [{ pronoun: "Era", verb: "C'était", fr: "Dijo que era tarde" }] },
    { id: 4805, type: "input", question: "Il a dit que...", answer: ["dijo que"], hint: "D... q..." }
  ],
  49: [
    { id: 4901, type: "swipe", es: "El gobierno", en: "Le gouvernement", context: "Politique" },
    { id: 4902, type: "swipe", es: "Votar", en: "Voter", context: "Elecciones" },
    { id: 4903, type: "swipe", es: "La ley", en: "La loi", context: "Justicia" },
    { id: 4904, type: "swipe", es: "Ciudadano", en: "Citoyen", context: "Persona" },
    { id: 4905, type: "input", question: "La loi", answer: ["la ley"], hint: "L..." }
  ],
  50: [
    { id: 5001, type: "swipe", es: "Sociedad", en: "Société", context: "Groupe" },
    { id: 5002, type: "swipe", es: "Derechos", en: "Droits", context: "Derechos humanos" },
    { id: 5003, type: "swipe", es: "Igualdad", en: "Égalité", context: "Valeur" },
    { id: 5004, type: "swipe", es: "Libertad", en: "Liberté", context: "Valeur" },
    { id: 5005, type: "input", question: "Liberté", answer: ["libertad"], hint: "L..." }
  ],
  // --- SUITE B1 (51-60) ---
  51: [
    { id: 5101, type: "swipe", es: "El arte", en: "L'art", context: "Cultura" },
    { id: 5102, type: "swipe", es: "Pintar", en: "Peindre", context: "Acción" },
    { id: 5103, type: "swipe", es: "Cuadro", en: "Tableau", context: "Objeto" },
    { id: 5104, type: "swipe", es: "Dibujo", en: "Dessin", context: "Arte" },
    { id: 5105, type: "input", question: "Peindre", answer: ["pintar"], hint: "P..." }
  ],
  52: [
    { id: 5201, type: "swipe", es: "Película", en: "Film", context: "Cine" },
    { id: 5202, type: "swipe", es: "Actor", en: "Acteur", context: "Profesión" },
    { id: 5203, type: "swipe", es: "Entrada", en: "Place/Ticket", context: "Cine" },
    { id: 5204, type: "swipe", es: "Palomitas", en: "Pop-corn", context: "Comida cine" },
    { id: 5205, type: "input", question: "Film", answer: ["película"], hint: "P..." }
  ],
  53: [
    { id: 5301, type: "swipe", es: "Libro", en: "Livre", context: "Lectura" },
    { id: 5302, type: "swipe", es: "Escritor", en: "Écrivain", context: "Autor" },
    { id: 5303, type: "swipe", es: "Novela", en: "Roman", context: "Género" },
    { id: 5304, type: "swipe", es: "Poema", en: "Poème", context: "Poesía" },
    { id: 5305, type: "input", question: "Roman", answer: ["novela"], hint: "N..." }
  ],
  54: [
    { id: 5401, type: "swipe", es: "Historia", en: "Histoire", context: "Pasado" },
    { id: 5402, type: "swipe", es: "Guerra", en: "Guerre", context: "Conflicto" },
    { id: 5403, type: "swipe", es: "Paz", en: "Paix", context: "Sin guerra" },
    { id: 5404, type: "swipe", es: "Siglo", en: "Siècle", context: "100 años" },
    { id: 5405, type: "input", question: "Paix", answer: ["paz"], hint: "P..." }
  ],
  55: [
    { id: 5501, type: "swipe", es: "Economía", en: "Économie", context: "Dinero" },
    { id: 5502, type: "swipe", es: "Empresa", en: "Entreprise", context: "Negocio" },
    { id: 5503, type: "swipe", es: "Mercado", en: "Marché", context: "Bourse" },
    { id: 5504, type: "swipe", es: "Crisis", en: "Crise", context: "Problema" },
    { id: 5505, type: "input", question: "Entreprise", answer: ["empresa"], hint: "E..." }
  ],
  56: [
    { id: 5601, type: "swipe", es: "Juez", en: "Juge", context: "Justicia" },
    { id: 5602, type: "swipe", es: "Abogado", en: "Avocat", context: "Defensa" },
    { id: 5603, type: "swipe", es: "Culpable", en: "Coupable", context: "Veredicto" },
    { id: 5604, type: "swipe", es: "Cárcel", en: "Prison", context: "Prisión" },
    { id: 5605, type: "input", question: "Avocat", answer: ["abogado"], hint: "A..." }
  ],
  57: [
    { id: 5701, type: "swipe", es: "Dios", en: "Dieu", context: "Religión" },
    { id: 5702, type: "swipe", es: "Iglesia", en: "Église", context: "Edificio" },
    { id: 5703, type: "swipe", es: "Creer", en: "Croire", context: "Fe" },
    { id: 5704, type: "swipe", es: "Rezar", en: "Prier", context: "Orar" },
    { id: 5705, type: "input", question: "Croire", answer: ["creer"], hint: "C..." }
  ],
  58: [
    { id: 5801, type: "swipe", es: "Pensar", en: "Penser", context: "Mente" },
    { id: 5802, type: "swipe", es: "Razón", en: "Raison", context: "Lógica" },
    { id: 5803, type: "swipe", es: "Verdad", en: "Vérité", context: "Cierto" },
    { id: 5804, type: "swipe", es: "Mentira", en: "Mensonge", context: "Falso" },
    { id: 5805, type: "input", question: "Vérité", answer: ["verdad"], hint: "V..." }
  ],
  59: [
    { id: 5901, type: "swipe", es: "Ciencia", en: "Science", context: "Estudio" },
    { id: 5902, type: "swipe", es: "Espacio", en: "Espace", context: "Universo" },
    { id: 5903, type: "swipe", es: "Tierra", en: "Terre", context: "Planeta" },
    { id: 5904, type: "swipe", es: "Investigación", en: "Recherche", context: "Estudio" },
    { id: 5905, type: "input", question: "Terre", answer: ["tierra"], hint: "T..." }
  ],
  60: [
    { id: 6001, type: "structure", title: "Bilan B1", formula: "Review", example: "Test de niveau", note: "Bravo !" },
    { id: 6002, type: "input", question: "Conjugue : Je parlerais (Conditionnel)", answer: ["hablaría"], hint: "Hablar + ía" },
    { id: 6003, type: "input", question: "Que je mange (Subjonctif)", answer: ["coma"], hint: "Comer -> Coma" },
    { id: 6004, type: "input", question: "Je le vois (COD)", answer: ["lo veo"], hint: "Lo..." },
    { id: 6005, type: "swipe", es: "Éxito", en: "Succès", context: "Logro" }
  ],

// --- NIVEAU B2 : AVANCÉ (61-80) ---
  61: [
    { id: 6101, type: "structure", title: "Subjonctif Imparfait", formula: "3e pers pluriel Pretérito - RON + RA", example: "Ellos hablaron -> Hablara", note: "Indispensable pour les hypothèses." },
    { id: 6102, type: "grammar", title: "Terminaisons -RA", description: "yo -ra, tú -ras, él -ra...", conjugation: [{ pronoun: "Yo (Tener)", verb: "tuviera", fr: "j'eusse/j'avais" }, { pronoun: "Tú (Ser)", verb: "fueras", fr: "tu fusses/tu étais" }] },
    { id: 6103, type: "swipe", es: "Si tuviera", en: "Si j'avais", context: "Si tuviera dinero..." },
    { id: 6104, type: "swipe", es: "Quisiera", en: "Je voudrais (Poli)", context: "Quisiera pedir..." },
    { id: 6105, type: "input", question: "Si j'étais (Ser)", answer: ["si fuera", "si fuese"], hint: "F..." }
  ],
  62: [
    { id: 6201, type: "structure", title: "L'Hypothèse (Le Regret)", formula: "Si + Subj. Imp + Conditionnel", example: "Si lo supiera, te lo diría.", note: "Si je le savais, je te le dirais." },
    { id: 6202, type: "swipe", es: "Si pudiera", en: "Si je pouvais", context: "Si pudiera volar" },
    { id: 6203, type: "swipe", es: "Lo haría", en: "Je le ferais", context: "Conditionnel" },
    { id: 6204, type: "swipe", es: "Si fuera rico", en: "Si j'étais riche", context: "Imagination" },
    { id: 6205, type: "input", question: "Traduis : 'Si je pouvais'", answer: ["si pudiera", "si pudiese"], hint: "Poder -> Pudiera" }
  ],
  63: [
    { id: 6301, type: "grammar", title: "Conditionnel Passé", description: "Haber (Cond) + Participe", conjugation: [{ pronoun: "Yo", verb: "habría comido", fr: "J'aurais mangé" }] },
    { id: 6302, type: "swipe", es: "Habría ido", en: "Je serais allé", context: "Regret" },
    { id: 6303, type: "swipe", es: "Habrías visto", en: "Tu aurais vu", context: "Occasion manquée" },
    { id: 6304, type: "structure", title: "Le Reproche", formula: "Deberías haber...", example: "Deberías haber venido", note: "Tu aurais dû venir." },
    { id: 6305, type: "input", question: "J'aurais fait (Hacer)", answer: ["habría hecho"], hint: "Haber + Hecho" }
  ],
  64: [
    { id: 6401, type: "structure", title: "La Voix Passive", formula: "Ser + Participe (+ por)", example: "Fue escrito por Cervantes", note: "Le participe s'accorde." },
    { id: 6402, type: "swipe", es: "Fue construido", en: "A été construit", context: "Edificio" },
    { id: 6403, type: "swipe", es: "Es conocido", en: "Est connu", context: "Fama" },
    { id: 6404, type: "swipe", es: "Por el autor", en: "Par l'auteur", context: "Agent" },
    { id: 6405, type: "input", question: "Il a été mangé", answer: ["fue comido"], hint: "Ser au passé + comido" }
  ],
  65: [
    { id: 6501, type: "swipe", es: "Sin embargo", en: "Cependant", context: "Connecteur" },
    { id: 6502, type: "swipe", es: "Aunque", en: "Bien que/Même si", context: "Opposition" },
    { id: 6503, type: "swipe", es: "Por lo tanto", en: "Par conséquent", context: "Conclusion" },
    { id: 6504, type: "swipe", es: "Además", en: "De plus", context: "Ajout" },
    { id: 6505, type: "input", question: "Traduis : 'Cependant'", answer: ["sin embargo"], hint: "S... e..." }
  ],
  66: [
    { id: 6601, type: "structure", title: "Verbes de Changement", formula: "Ponerse / Quedarse / Volverse", example: "Se puso rojo (Il a rougi)", note: "L'espagnol est précis sur le type de changement." },
    { id: 6602, type: "swipe", es: "Ponerse triste", en: "Devenir triste", context: "Changement d'humeur" },
    { id: 6603, type: "swipe", es: "Quedarse calvo", en: "Devenir chauve", context: "Physique définitif" },
    { id: 6604, type: "swipe", es: "Hacerse rico", en: "Devenir riche", context: "Effort personnel" },
    { id: 6605, type: "input", question: "Il est devenu rouge", answer: ["se puso rojo"], hint: "Ponerse" }
  ],
  67: [
    { id: 6701, type: "swipe", es: "En mi opinión", en: "À mon avis", context: "Opinion" },
    { id: 6702, type: "swipe", es: "Creo que", en: "Je crois que (+ Ind)", context: "Croyance" },
    { id: 6703, type: "swipe", es: "No creo que", en: "Je ne crois pas que (+ Subj)", context: "Doute" },
    { id: 6704, type: "swipe", es: "Me parece que", en: "Il me semble que", context: "Avis" },
    { id: 6705, type: "input", question: "Je ne pense pas que", answer: ["no pienso que"], hint: "N... p..." }
  ],
  68: [
    { id: 6801, type: "swipe", es: "El debate", en: "Le débat", context: "Discusión" },
    { id: 6802, type: "swipe", es: "Estar de acuerdo", en: "Être d'accord", context: "Accord" },
    { id: 6803, type: "swipe", es: "Discrepar", en: "Être en désaccord", context: "Opinión" },
    { id: 6804, type: "swipe", es: "El argumento", en: "L'argument", context: "Lógica" },
    { id: 6805, type: "input", question: "Je suis d'accord", answer: ["estoy de acuerdo"], hint: "Estar..." }
  ],
  69: [
    { id: 6901, type: "swipe", es: "El medio ambiente", en: "L'environnement", context: "Ecología" },
    { id: 6902, type: "swipe", es: "Contaminación", en: "Pollution", context: "Problema" },
    { id: 6903, type: "swipe", es: "Reciclaje", en: "Recyclage", context: "Solución" },
    { id: 6904, type: "swipe", es: "Sostenible", en: "Durable", context: "Energía" },
    { id: 6905, type: "input", question: "Pollution", answer: ["contaminación"], hint: "C..." }
  ],
  70: [
    { id: 7001, type: "swipe", es: "La entrevista", en: "L'entretien", context: "Trabajo" },
    { id: 7002, type: "swipe", es: "El puesto", en: "Le poste", context: "Job" },
    { id: 7003, type: "swipe", es: "Contratar", en: "Embaucher", context: "Acción" },
    { id: 7004, type: "swipe", es: "Despedir", en: "Licencier", context: "Fin de trabajo" },
    { id: 7005, type: "input", question: "L'entretien", answer: ["la entrevista"], hint: "La e..." }
  ],
  // ... (Leçons 71-80 : Politique, Économie, Justice, Sciences, Arts, Littérature, Histoire, Géographie, Société, Bilan B2) ...
  // Pour gagner de la place, j'utilise le générateur pour 71-80, mais tu peux les détailler si tu veux.
  
  // --- NIVEAU C1 : EXPERT (81-100) ---
  81: [
    { id: 8101, type: "swipe", es: "Sutil", en: "Subtil", context: "Nuance" },
    { id: 8102, type: "swipe", es: "Matiz", en: "Nuance", context: "Detalle" },
    { id: 8103, type: "swipe", es: "Implícito", en: "Implicite", context: "No dicho" },
    { id: 8104, type: "swipe", es: "Ambigüedad", en: "Ambiguïté", context: "Doble sentido" },
    { id: 8105, type: "input", question: "Une nuance", answer: ["un matiz"], hint: "M..." }
  ],
  82: [
    { id: 8201, type: "structure", title: "Expressions Idiomatiques", formula: "Sens figuré", example: "Tomar el pelo (Se moquer)", note: "Littéralement : Prendre les cheveux." },
    { id: 8202, type: "swipe", es: "Tomar el pelo", en: "Se moquer/Taquiner", context: "Me estás tomando el pelo" },
    { id: 8203, type: "swipe", es: "Estar sin blanca", en: "Être fauché", context: "Sin dinero" },
    { id: 8204, type: "swipe", es: "Ser pan comido", en: "Être du gâteau (Facile)", context: "Es muy fácil" },
    { id: 8205, type: "input", question: "C'est facile (Expression)", answer: ["es pan comido"], hint: "Pan..." }
  ],
  83: [
    { id: 8301, type: "swipe", es: "Elocuente", en: "Éloquent", context: "Parole" },
    { id: 8302, type: "swipe", es: "Persuadir", en: "Persuader", context: "Convencer" },
    { id: 8303, type: "swipe", es: "Retórica", en: "Rhétorique", context: "Discurso" },
    { id: 8304, type: "swipe", es: "Falacia", en: "Erreur de logique", context: "Argumento falso" },
    { id: 8305, type: "input", question: "Persuader", answer: ["persuadir"], hint: "P..." }
  ],
  84: [
    { id: 8401, type: "structure", title: "Proverbes", formula: "Sagesse populaire", example: "Más vale tarde que nunca", note: "Mieux vaut tard que jamais." },
    { id: 8402, type: "swipe", es: "Ojos que no ven...", en: "Loin des yeux...", context: "...corazón que no siente" },
    { id: 8403, type: "swipe", es: "En boca cerrada...", en: "Dans une bouche fermée...", context: "...no entran moscas" },
    { id: 8404, type: "input", question: "Mieux vaut tard que jamais", answer: ["más vale tarde que nunca"], hint: "Más vale..." }
  ],
  85: [
    { id: 8501, type: "swipe", es: "Chaval", en: "Gamin/Mec", context: "Argot (Espagne)" },
    { id: 8502, type: "swipe", es: "Guay", en: "Cool", context: "Argot" },
    { id: 8503, type: "swipe", es: "Curro", en: "Boulot", context: "Argot pour Trabajo" },
    { id: 8504, type: "swipe", es: "Pasta", en: "Fric", context: "Argot pour Dinero" },
    { id: 8505, type: "input", question: "C'est cool !", answer: ["es guay", "qué guay"], hint: "G..." }
  ],
  86: [
    { id: 8601, type: "swipe", es: "Paradójicamente", en: "Paradoxalement", context: "Adverbe" },
    { id: 8602, type: "swipe", es: "Inevitablemente", en: "Inévitablement", context: "Destino" },
    { id: 8603, type: "swipe", es: "Paulatinamente", en: "Progressivement", context: "Poco a poco" },
    { id: 8604, type: "swipe", es: "Eficazmente", en: "Efficacement", context: "Modo" },
    { id: 8605, type: "input", question: "Progressivement (Soutenu)", answer: ["paulatinamente"], hint: "P..." }
  ],
  87: [
    { id: 8701, type: "swipe", es: "El auge", en: "L'essor/Apogée", context: "Economía" },
    { id: 8702, type: "swipe", es: "El declive", en: "Le déclin", context: "Caída" },
    { id: 8703, type: "swipe", es: "La brecha", en: "Le fossé/L'écart", context: "Desigualdad" },
    { id: 8704, type: "swipe", es: "El desafío", en: "Le défi", context: "Reto" },
    { id: 8705, type: "input", question: "Le défi", answer: ["el desafío", "el reto"], hint: "D..." }
  ],
  88: [
    { id: 8801, type: "swipe", es: "Cuyo", en: "Dont/Duquel", context: "El hombre cuyo hijo..." },
    { id: 8802, type: "grammar", title: "Relatifs Cultivés", description: "El cual / Cuyo", conjugation: [{ pronoun: "Le livre dont...", verb: "El libro cuyo...", fr: "L'auteur est connu" }] },
    { id: 8803, type: "swipe", es: "El cual", en: "Lequel", context: "Formal" },
    { id: 8804, type: "input", question: "L'homme dont le fils...", answer: ["el hombre cuyo hijo"], hint: "Cuyo" }
  ],
  89: [
    { id: 8901, type: "swipe", es: "Vuestra Merced", en: "Votre Grâce", context: "Histoire (Origine de Usted)" },
    { id: 8902, type: "swipe", es: "Castellano", en: "Castillan", context: "Langue" },
    { id: 8903, type: "swipe", es: "Hispanoamérica", en: "Amérique Hisapanique", context: "Géographie" },
    { id: 8904, type: "structure", title: "Vosotros vs Ustedes", formula: "Espagne vs Amérique Latine", example: "Vosotros sois / Ustedes son", note: "Différence majeure." }
  ],
  90: [
    { id: 9001, type: "swipe", es: "Epifanía", en: "Épiphanie", context: "Révélation" },
    { id: 9002, type: "swipe", es: "Serendipia", en: "Sérendipité", context: "Hasard heureux" },
    { id: 9003, type: "swipe", es: "Melancolía", en: "Mélancolie", context: "Sentimiento" },
    { id: 9004, type: "swipe", es: "Inefable", en: "Ineffable", context: "Indescriptible" },
    { id: 9005, type: "input", question: "Ineffable", answer: ["inefable"], hint: "I..." }
  ],
  // ... (91-99 : Vocabulaire technique spécifique)
  100: [
    { id: 10001, type: "structure", title: "MAÎTRISE C1", formula: "Félicitations !", example: "¡Lo lograste!", note: "Tu parles couramment." },
    { id: 10002, type: "swipe", es: "Bilingüe", en: "Bilingue", context: "Nivel experto" },
    { id: 10003, type: "swipe", es: "Nativo", en: "Natif", context: "Como un español" },
    { id: 10004, type: "swipe", es: "Orgulloso", en: "Fier", context: "Estoy orgulloso de ti" },
    { id: 10005, type: "input", question: "Je suis bilingue", answer: ["soy bilingüe"], hint: "Soy..." }
  ]
  };
// Génération du contenu complet
const generateAllContent = () => {
  const content = { ...CONTENT_PART_1 };
  for (let i = 3; i <= 100; i++) {
     content[i] = generateStructuredLesson(i);
  }
  return content;
};
const INITIAL_LESSONS_CONTENT = generateAllContent();

const SENTENCE_STRUCTURES = [
  { id: 1, title: "La Phrase Simple", formula: "Sujet + Verbe", example_es: "(Yo) como.", example_en: "Je mange.", explanation: "Sujet souvent omis." },
  { id: 2, title: "Négation", formula: "No + Verbe", example_es: "No hablo.", example_en: "Je ne parle pas.", explanation: "Simple 'No' devant." },
  { id: 3, title: "Le Futur Proche", formula: "Ir + a + Infinitif", example_es: "Voy a comer.", example_en: "Je vais manger.", explanation: "Très courant à l'oral." }
];

/* --- GENERATEUR DE TEST INTELLIGENT (VERSION CONTEXTUELLE) --- */
const generateSmartTest = (completedLessons, userVocab) => {
  const questions = [];
  let qId = 9900;

  // 1. Vocabulaire (Reverse Translation)
  if (userVocab && userVocab.length > 0) {
     const target = userVocab.filter(v => v.type === 'swipe').sort(() => 0.5 - Math.random()).slice(0, 5);
     target.forEach(w => questions.push({
         id: qId++, type: 'input', question: `Traduis '${w.en}' en espagnol`, answer: [w.es.toLowerCase()], hint: w.es.substring(0,1)+"..." 
     }));
  }

  // 2. Grammaire Contextuelle (Selon progression)
  if (completedLessons.includes(1)) questions.push({ id: qId++, type: 'input', question: "Je suis (Ser)", answer: ["soy"], hint: "S..." });
  if (completedLessons.includes(2)) questions.push({ id: qId++, type: 'input', question: "Tu as (Tener)", answer: ["tienes"], hint: "T..." });
  if (completedLessons.includes(3)) questions.push({ id: qId++, type: 'input', question: "Négation : Je ne parle pas", answer: ["no hablo"], hint: "No..." });
  if (completedLessons.includes(5)) questions.push({ id: qId++, type: 'input', question: "Futur : Je vais manger", answer: ["voy a comer"], hint: "Voy a..." });
  
  // Fallback si vide
  if (questions.length === 0) questions.push({ id: qId++, type: 'input', question: "Bonjour", answer: ["hola"], hint: "H..." });
  
  return questions.sort(() => 0.5 - Math.random());
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
    const testQuestions = generateSmartTest(userData.completedLessons, userData.vocab);
    setTestMode(mode);
    dynamicLessonsContent['TEST'] = testQuestions; 
    setActiveLessonId('TEST');
    setView('lesson');
  };

  const handleLessonComplete = async (xp, lessonContent, lessonId) => {
    if (testMode) {
        if (testMode === 'levelup') {
            const levels = ["A1", "A2", "B1", "B2", "C1"];
            const currentIdx = levels.indexOf(userData.level);
            const nextLevel = levels[currentIdx + 1] || "C1";
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, { xp: increment(500), level: nextLevel });
                setUserData(prev => ({ ...prev, level: nextLevel, xp: prev.xp + 500 }));
            }
        } else {
             if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, { xp: increment(50) });
                setUserData(prev => ({ ...prev, xp: prev.xp + 50 }));
            }
        }
        setTestMode(null);
        setView('complete');
        return;
    }

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
              {view === 'tests' && <TestDashboard userData={userData} onStartTest={startTest} />}
              {view === 'profile' && userData && <ProfileContent userData={userData} email={currentUser.email} onLogout={handleLogout} />}
              {view === 'lesson' && dynamicLessonsContent[activeLessonId] && <LessonEngine content={dynamicLessonsContent[activeLessonId]} onComplete={(xp) => handleLessonComplete(xp, dynamicLessonsContent[activeLessonId], activeLessonId)} onExit={() => setView('dashboard')} />}
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
const DashboardContent = ({ userData, allLessons, onStartLesson }) => { const levels = ["A1", "A2", "B1", "B2", "C1"]; const safeLevel = (userData.level && levels.includes(userData.level)) ? userData.level : "A1"; const currentLevelIndex = levels.indexOf(safeLevel); return (<div className="w-full h-full flex flex-col"><div className="p-6 md:p-8"><h2 className="text-3xl font-black text-slate-900 mb-2">Ton Parcours</h2><p className="text-slate-500">Niveau actuel : <span className="text-indigo-600 font-bold">{safeLevel}</span></p></div><div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap px-6 pb-10 snap-x snap-mandatory flex gap-8">{levels.map((level, index) => { const isLocked = index > currentLevelIndex; const isCurrent = index === currentLevelIndex; const isCompleted = index < currentLevelIndex; const levelLessons = allLessons.filter(l => l.level === level); return (<div key={level} className={`snap-center shrink-0 w-[300px] md:w-[350px] h-full flex flex-col rounded-3xl border-4 ${isCurrent ? 'border-yellow-400 bg-white' : isCompleted ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 opacity-60'} p-6 relative overflow-hidden`}><div className="flex justify-between items-center mb-8"><div><h3 className="text-2xl font-black text-slate-800">Niveau {level}</h3><p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{isCompleted ? 'Terminé' : isCurrent ? 'En cours' : 'Verrouillé'}</p></div>{isLocked && <Lock size={24} className="text-slate-400" />}{isCompleted && <div className="bg-green-500 text-white p-1 rounded-full"><Check size={16} /></div>}</div><div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2 custom-scrollbar">{levelLessons.map((lesson) => { const isLessonDone = userData.completedLessons.includes(lesson.id); const isAccessible = isCurrent && (isLessonDone || userData.completedLessons.includes(lesson.id - 1) || lesson.id === levelLessons[0].id); if (isCompleted) { return (<div key={lesson.id} className="w-full p-4 rounded-2xl bg-green-100 text-green-800 flex items-center gap-4 opacity-70 cursor-not-allowed"><CheckCircle size={16} /><span className="text-sm font-bold truncate flex-1">{lesson.title}</span><span className="text-xs uppercase font-bold">Acquis</span></div>); } return (<button key={lesson.id} disabled={!isAccessible} onClick={() => onStartLesson(lesson.id)} className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all ${isLessonDone ? 'bg-green-500 text-white shadow-md' : isAccessible ? 'bg-yellow-400 text-slate-900 shadow-lg scale-105 font-bold ring-4 ring-yellow-100' : 'bg-slate-200 text-slate-400'}`}><div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">{isLessonDone ? <Check size={16} /> : lesson.id}</div><div className="flex-1 truncate"><p className="text-sm truncate">{lesson.title}</p></div>{isAccessible && !isLessonDone && <PlayCircle size={20} />}</button>); })}</div>{isLocked && (<div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[2px] flex items-center justify-center z-10"><div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-slate-100"><Lock size={32} className="mx-auto text-slate-300 mb-2" /><h4 className="font-bold text-slate-800">Niveau Bloqué</h4></div></div>)}</div>); })}<div className="w-6 shrink-0"></div></div></div>); };
const StructuresContent = ({ structures }) => (<div className="max-w-3xl mx-auto w-full p-6 pb-24"><h2 className="text-3xl font-black text-slate-900 mb-8">Structures de Phrases 🏗️</h2><div className="space-y-6">{structures.map((struct) => (<div key={struct.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"><div className="flex items-center gap-3 mb-4"><div className="p-2 bg-yellow-100 rounded-lg text-yellow-700"><Hammer size={20} /></div><h3 className="text-xl font-bold text-slate-900">{struct.title}</h3></div><div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-indigo-600 font-bold mb-4 text-center border border-slate-100">{struct.formula}</div><div className="space-y-2 mb-4"><p className="text-lg font-medium text-slate-800">🇪🇸 {struct.example_es}</p><p className="text-sm text-slate-400">🇫🇷 {struct.example_en}</p></div><p className="text-sm text-slate-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100">💡 {struct.explanation}</p></div>))}</div></div>);
const NotebookContent = ({ userVocab }) => { const vocabItems = userVocab.filter(c => c.type === 'swipe'); const grammarItems = userVocab.filter(c => c.type === 'grammar'); const [showReference, setShowReference] = useState(false); const REFERENCE_VERBS = [{ title: "Verbes en -AR", endings: ["-o", "-as", "-a", "-amos", "-an"], ex: "Hablar" }, { title: "Verbes en -ER", endings: ["-o", "-es", "-e", "-emos", "-en"], ex: "Comer" }, { title: "Verbes en -IR", endings: ["-o", "-es", "-e", "-imos", "-en"], ex: "Vivir" }]; return (<div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-24"><div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-black text-slate-900">Lexique</h2><div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm">{userVocab?.length || 0} Éléments</div></div><div className="mb-8"><button onClick={() => setShowReference(!showReference)} className="w-full p-4 bg-yellow-100 text-yellow-800 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-200 transition-colors"><Table size={20} /> {showReference ? "Masquer" : "Voir les terminaisons"}</button>{showReference && (<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">{REFERENCE_VERBS.map((v, i) => (<div key={i} className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm"><h4 className="font-bold text-center mb-2 text-indigo-600">{v.title}</h4><p className="text-xs text-center text-gray-400 italic mb-2">{v.ex}</p><div className="space-y-1 text-sm text-center">{v.endings.map(e => <div key={e} className="bg-slate-50 py-1 rounded">{e}</div>)}</div></div>))}</div>)}</div><div className="grid md:grid-cols-2 gap-8"><div className="space-y-4"><h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><Edit3 size={18} /> Vocabulaire Acquis</h3>{vocabItems.length > 0 ? (<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[500px] overflow-y-auto">{vocabItems.map((item, idx) => (<div key={`vocab-${idx}`} className="p-4 flex justify-between items-center border-b border-slate-100 last:border-0 hover:bg-slate-50"><div><p className="font-bold text-slate-800">{item.es}</p><p className="text-xs text-slate-400 italic mt-0.5">{item.context}</p></div><span className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full text-sm">{item.en}</span></div>))}</div>) : <div className="p-8 text-center text-slate-400 border-2 border-dashed rounded-xl">Vide</div>}</div><div className="space-y-4"><h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm flex items-center gap-2"><BookOpen size={18} /> Grammaire Apprise</h3><div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">{grammarItems.map((item, index) => (<div key={`gram-${index}`} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"><h4 className="font-bold text-indigo-600 mb-2">{item.title}</h4><div className="bg-slate-50 rounded-xl overflow-hidden text-sm border border-slate-100">{item.conjugation && item.conjugation.map((row, idx) => (<div key={idx} className={`flex justify-between items-center p-2.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}><span className="text-slate-400 w-16 sm:w-20 shrink-0">{row.pronoun}</span><span className="font-bold text-slate-800 flex-1 text-center">{row.verb}</span><span className="text-slate-400 text-xs w-20 sm:w-auto text-right italic shrink-0">{row.fr}</span></div>))}</div></div>))}</div></div></div></div>); };
const LandingPage = ({ onStart }) => (<div className="w-full h-full flex flex-col items-center justify-center p-8 bg-yellow-400 relative overflow-hidden text-center"><div className="z-10 space-y-8 max-w-md"><div className="w-32 h-32 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center rotate-6 hover:rotate-12 transition-transform duration-500"><span className="text-6xl">🇪🇸</span></div><div><h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">Español<span className="text-red-600">Sprint</span></h1><p className="text-slate-800 font-medium text-xl md:text-2xl opacity-90">La méthode la plus rapide.</p></div><button onClick={onStart} className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Commencer</button></div></div>);
const AuthScreen = ({ onAuth, onGoogle, onBack, error }) => { const [isSignUp, setIsSignUp] = useState(false); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); return (<div className="w-full max-w-md p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500"><button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold"><X size={20} /> Retour</button><div><h2 className="text-4xl font-black text-slate-900 mb-2">{isSignUp ? 'Créer un compte' : 'Bon retour !'}</h2><p className="text-slate-500">Sauvegarde ta progression ☁️</p></div>{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}<div className="space-y-4"><button onClick={onGoogle} className="w-full bg-white border-2 border-slate-200 text-slate-800 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" /> Continuer avec Google</button><div className="flex items-center gap-4"><div className="h-px bg-slate-200 flex-1"></div><span className="text-slate-400 text-sm font-bold">OU</span><div className="h-px bg-slate-200 flex-1"></div></div><input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" placeholder="Mot de passe" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 outline-none focus:border-yellow-400" value={password} onChange={(e) => setPassword(e.target.value)} /></div><button onClick={() => onAuth(email, password, isSignUp)} className="w-full bg-yellow-400 text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">{isSignUp ? "S'inscrire" : "Se connecter"}</button><div className="text-center"><button onClick={() => setIsSignUp(!isSignUp)} className="text-indigo-600 font-bold text-sm hover:underline">{isSignUp ? "J'ai déjà un compte" : "Je n'ai pas de compte"}</button></div></div>); };
const SidebarDesktop = ({ userData, currentView, onChangeView, onLogout, onUpload }) => (<div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-full p-6"><div className="flex items-center gap-2 mb-12 px-2"><div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md rotate-3"><span className="text-2xl">🇪🇸</span></div><h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Español<span className="text-red-600">Sprint</span></h1></div><nav className="flex-1 space-y-2"><SidebarLink icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><SidebarLink icon={BrainCircuit} label="Zone Test" active={currentView === 'tests'} onClick={() => onChangeView('tests')} /><SidebarLink icon={Hammer} label="Structures" active={currentView === 'structures'} onClick={() => onChangeView('structures')} /><SidebarLink icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><SidebarLink icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></nav><button onClick={onUpload} className="mb-4 flex items-center gap-2 text-xs text-slate-300 hover:text-indigo-500 px-4 transition-colors"><CloudUpload size={14} /> Initialiser Leçons</button><div className="mt-auto pt-6 border-t border-slate-100"><div className="flex items-center gap-3 mb-6 px-2"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{userData?.name?.charAt(0).toUpperCase()}</div><div className="flex-1"><p className="text-sm font-bold text-slate-900 truncate w-24">{userData?.name}</p><p className="text-xs text-slate-400">Niveau {userData?.level}</p></div><div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full"><Flame size={14} className="text-orange-500 fill-orange-500" /><span className="text-xs font-bold text-orange-600">{userData?.streak}</span></div></div></div></div>);
const SidebarLink = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={22} strokeWidth={active ? 2.5 : 2} /><span className="font-bold text-base">{label}</span></button>);
const MobileHeader = ({ userData }) => (<div className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">{userData?.name?.charAt(0).toUpperCase()}</div></div><div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100"><Flame size={16} className="text-orange-500 fill-orange-500" /><span className="text-orange-700 font-bold">{userData?.streak}</span></div></div>);
const MobileBottomNav = ({ currentView, onChangeView }) => (<div className="md:hidden bg-white border-t border-slate-100 p-2 pb-6 flex justify-around items-center text-slate-400 z-30"><NavBtn icon={LayoutDashboard} label="Parcours" active={currentView === 'dashboard'} onClick={() => onChangeView('dashboard')} /><NavBtn icon={BrainCircuit} label="Tests" active={currentView === 'tests'} onClick={() => onChangeView('tests')} /><NavBtn icon={Library} label="Lexique" active={currentView === 'notebook'} onClick={() => onChangeView('notebook')} /><NavBtn icon={User} label="Profil" active={currentView === 'profile'} onClick={() => onChangeView('profile')} /></div>);
const NavBtn = ({ icon: Icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-indigo-600' : 'hover:text-slate-600'}`}><Icon size={24} strokeWidth={active ? 2.5 : 2} /><span className="text-[10px] font-bold mt-1">{label}</span></button>);
const ProfileContent = ({ userData, email, onLogout }) => (<div className="max-w-2xl mx-auto w-full p-6 md:p-12 space-y-8"><h2 className="text-3xl font-black text-slate-900">Mon Compte</h2><div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">{userData?.name?.charAt(0).toUpperCase()}</div><div><p className="font-bold text-slate-900 text-lg">{userData?.name}</p><p className="text-slate-400 text-sm">{email}</p></div></div><div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-slate-100"><div><p className="text-2xl font-black text-slate-900">{userData?.xp}</p><p className="text-xs text-slate-400 uppercase font-bold">XP Total</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.streak}</p><p className="text-xs text-slate-400 uppercase font-bold">Série</p></div><div><p className="text-2xl font-black text-slate-900">{userData?.level}</p><p className="text-xs text-slate-400 uppercase font-bold">Niveau</p></div></div><button onClick={onLogout} className="w-full text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"><LogOut size={20} /> Se déconnecter</button></div></div>);
const LessonEngine = ({ content, onComplete, onExit }) => { const [currentIndex, setCurrentIndex] = useState(0); const [progress, setProgress] = useState(0); const currentCard = content[currentIndex]; const handleNext = () => { if (currentIndex + 1 >= content.length) { setProgress(100); setTimeout(() => onComplete(150), 500); } else { setProgress(((currentIndex + 1) / content.length) * 100); setCurrentIndex(prev => prev + 1); } }; const handlePrev = () => { if (currentIndex > 0) { setCurrentIndex(prev => prev - 1); setProgress(((currentIndex - 1) / content.length) * 100); } }; useEffect(() => { if (currentIndex === 0 && currentCard?.es) speak(currentCard.es); }, []); return (<div className="h-full w-full flex flex-col bg-slate-50"><div className="px-6 py-4 md:py-6 flex items-center gap-6 bg-white border-b border-slate-100 z-10"><button onClick={onExit} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button><div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }}></div></div></div><div className="flex-1 flex items-center justify-center p-4 overflow-hidden"><div className="w-full max-w-md aspect-[3/4] md:aspect-auto md:h-[600px] perspective-1000">{currentCard.type === 'swipe' && <SwipeCard key={currentCard.id} data={currentCard} onNext={handleNext} onPrev={handlePrev} />}{currentCard.type === 'input' && <InputCard key={currentCard.id} data={currentCard} onNext={handleNext} />}{currentCard.type === 'grammar' && <GrammarCard key={currentCard.id} data={currentCard} onNext={handleNext} />}{currentCard.type === 'structure' && <StructureCard key={currentCard.id} data={currentCard} onNext={handleNext} />}</div></div></div>); };
const SwipeCard = ({ data, onNext, onPrev }) => { const [swiped, setSwiped] = useState(null); const handleSwipe = (dir) => { setSwiped(dir); setTimeout(() => { if (dir === 'left') onPrev(); else onNext(); }, 250); }; return (<div className={`w-full h-full bg-white rounded-3xl shadow-xl border-b-8 border-slate-100 flex flex-col relative transition-all duration-300 ${swiped === 'left' ? '-translate-x-[150%] rotate-[-20deg] opacity-0' : ''} ${swiped === 'right' ? 'translate-x-[150%] rotate-[20deg] opacity-0' : ''}`}><div className="absolute top-4 right-4 z-10"><button onClick={(e) => { e.stopPropagation(); speak(data.es); }} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 text-indigo-600 shadow-sm active:scale-95 transition-all"><Volume2 size={24} /></button></div><div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6"><h2 className="text-5xl md:text-6xl font-black text-slate-800">{data.es}</h2><div className="w-16 h-1 bg-slate-100 rounded-full"></div><div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100"><p className="text-xl md:text-2xl font-bold text-indigo-600">{data.en}</p></div><p className="text-sm text-slate-400 italic">"{data.context}"</p></div><div className="p-6 pb-8 flex justify-center gap-8"><button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-100 active:scale-95 transition-all"><RotateCcw size={32} strokeWidth={3} /></button><button onClick={() => handleSwipe('right')} className="w-16 h-16 rounded-full bg-teal-500 border-b-4 border-teal-700 text-white flex items-center justify-center hover:bg-teal-400 hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-1 transition-all"><Check size={32} strokeWidth={3} /></button></div></div>); };
const InputCard = ({ data, onNext }) => { const [val, setVal] = useState(''); const [status, setStatus] = useState('idle'); const checkAnswer = () => { const isCorrect = data.answer.includes(val.trim().toLowerCase()); setStatus(isCorrect ? 'success' : 'error'); if (isCorrect) { speak("¡Muy bien!"); setTimeout(onNext, 1500); } else { speak("Inténtalo de nuevo"); } }; return (<div className="w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col p-8 md:p-12 justify-center space-y-8 animate-in zoom-in duration-300"><div className="text-center space-y-2"><span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Challenge</span><h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3></div><input type="text" value={val} onChange={(e) => { setVal(e.target.value); setStatus('idle'); }} className={`w-full text-center text-2xl md:text-3xl font-bold p-6 rounded-2xl border-4 outline-none transition-all ${status === 'error' ? 'border-red-400 bg-red-50 text-red-500' : status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 'border-slate-100 focus:border-yellow-400 focus:bg-yellow-50'}`} placeholder="Ta réponse..." /><button onClick={checkAnswer} className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${status === 'success' ? 'bg-green-500' : 'bg-slate-900'}`}>{status === 'success' ? 'Parfait ! 🎉' : 'Vérifier'}</button>{status === 'error' && <p className="text-center text-red-400 font-bold animate-shake">Essaie encore ! Indice : {data.hint}</p>}</div>); };
const GrammarCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500"><div className="bg-indigo-600 p-8 md:p-10 text-white text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.title); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white"><Volume2 size={20} /></button><h3 className="text-3xl md:text-4xl font-black">{data.title}</h3><p className="text-indigo-200 mt-2">{data.description}</p></div><div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-slate-50"><div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">{data.conjugation.map((row, idx) => (<div key={idx} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0"><span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span><span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span><span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span></div>))}</div><button onClick={onNext} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-yellow-300 active:scale-95 transition-all">J'ai compris</button></div></div>);
const StructureCard = ({ data, onNext }) => (<div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 border-b-[12px] border-slate-100"><div className="bg-amber-400 p-8 text-slate-900 text-center relative"><button onClick={(e) => { e.stopPropagation(); speak(data.example); }} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-slate-900"><Volume2 size={20} /></button><h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3></div><div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50"><div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center"><p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p><p className="text-slate-500 text-sm">{data.note}</p></div><div className="text-center"><p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p><p className="text-sm text-slate-400 italic">Exemple</p></div><button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-all">C'est noté !</button></div></div>);
const LessonComplete = ({ xp, onHome, onDownload, isTest }) => (<div className="h-full w-full flex flex-col items-center justify-center bg-yellow-400 p-8 text-center space-y-8 animate-in zoom-in duration-500"><div className="bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform"><Trophy size={100} className="text-yellow-500 fill-yellow-500" /></div><div><h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">{isTest ? "Examen Réussi !" : "Increíble!"}</h2><p className="text-xl text-yellow-900 font-bold opacity-80">{isTest ? "Niveau Validé" : "Leçon terminée et sauvegardée."}</p></div><div className="flex gap-4"><div className="bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/50 text-slate-900 font-black text-2xl">+{xp} XP</div></div><div className="flex flex-col gap-4 w-full max-w-sm"><button onClick={onDownload} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"><Download size={20} /> Télécharger le PDF</button><button onClick={onHome} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Continuer</button></div></div>);