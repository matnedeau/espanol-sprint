/* eslint-disable */
// @ts-nocheck

/* =======================================================================================
   🧠 CONTENT FACTORY : BASE DE DONNÉES ET LOGIQUE PÉDAGOGIQUE
   ======================================================================================= */

// --- 1. LECTURES QUOTIDIENNES (Définies une seule fois ici) ---
export const DAILY_READINGS = [
  // A1
  { id: 101, level: "A1", title_es: "Mi Gato Félix", title_fr: "Mon Chat Félix", text_es: "Tengo un gato. Se llama Félix. Es negro y blanco. A Félix le gusta dormir en el sofá.", text_fr: "J'ai un chat. Il s'appelle Félix. Il est noir et blanc. Félix aime dormir sur le canapé.", difficulty: "Débutant (A1)" },
  { id: 102, level: "A1", title_es: "El Desayuno", title_fr: "Le Petit Déjeuner", text_es: "Por la mañana, como pan con tomate y aceite. Bebo un café con leche caliente.", text_fr: "Le matin, je mange du pain avec de la tomate et de l'huile. Je bois un café au lait chaud.", difficulty: "Débutant (A1)" },
  { id: 103, level: "A1", title_es: "Mi Familia", title_fr: "Ma Famille", text_es: "Vivo con mis padres y mi hermano en Madrid. Mi padre es alto y mi madre es muy amable.", text_fr: "Je vis avec mes parents et mon frère à Madrid. Mon père est grand et ma mère est très gentille.", difficulty: "Débutant (A1)" },
  { id: 104, level: "A1", title_es: "En la Escuela", title_fr: "À l'École", text_es: "La escuela es grande. Tengo muchos amigos en mi clase. La profesora escribe en la pizarra.", text_fr: "L'école est grande. J'ai beaucoup d'amis dans ma classe. La professeure écrit au tableau.", difficulty: "Débutant (A1)" },
  { id: 105, level: "A1", title_es: "Mi Casa", title_fr: "Ma Maison", text_es: "Mi casa es pequeña pero bonita. Tiene dos habitaciones y una cocina blanca.", text_fr: "Ma maison est petite mais jolie. Elle a deux chambres et une cuisine blanche.", difficulty: "Débutant (A1)" },
  
  // A2
  { id: 201, level: "A2", title_es: "Mis Vacaciones", title_fr: "Mes Vacances", text_es: "El año pasado fui a Barcelona con mis amigos. Visitamos la Sagrada Familia y caminamos por las Ramblas.", text_fr: "L'année dernière, je suis allé à Barcelone avec mes amis. Nous avons visité la Sagrada Familia et marché sur les Ramblas.", difficulty: "Élémentaire (A2)" },
  { id: 202, level: "A2", title_es: "La Rutina de Sofía", title_fr: "La Routine de Sofia", text_es: "Sofía se levanta temprano, a las siete. Se ducha, se viste y va a trabajar en autobús.", text_fr: "Sofia se lève tôt, à sept heures. Elle se douche, s'habille et va travailler en bus.", difficulty: "Élémentaire (A2)" },
  
  // B1
  { id: 301, level: "B1", title_es: "El Teletrabajo", title_fr: "Le Télétravail", text_es: "Creo que el teletrabajo tiene muchas ventajas. No tienes que viajar cada día y puedes organizar tu tiempo mejor.", text_fr: "Je crois que le télétravail a beaucoup d'avantages. Tu n'as pas à voyager chaque jour et tu peux mieux organiser ton temps.", difficulty: "Intermédiaire (B1)" },
  { id: 302, level: "B1", title_es: "Planes de Futuro", title_fr: "Projets d'Avenir", text_es: "Cuando termine mis estudios, viajaré por América del Sur. Quiero que mis padres vengan conmigo una semana.", text_fr: "Quand je terminerai mes études, je voyagerai en Amérique du Sud. Je veux que mes parents viennent avec moi une semaine.", difficulty: "Intermédiaire (B1)" },
  
  // B2
  { id: 401, level: "B2", title_es: "Turismo Sostenible", title_fr: "Tourisme Durable", text_es: "El turismo de masas ha dañado muchos ecosistemas. Es vital que los viajeros sean conscientes de su huella ecológica.", text_fr: "Le tourisme de masse a endommagé de nombreux écosystèmes. Il est vital que les voyageurs soient conscients de leur empreinte écologique.", difficulty: "Avancé (B2)" },
  
  // C1
  { id: 501, level: "C1", title_es: "La Sobremesa", title_fr: "La Sobremesa", text_es: "La sobremesa es una institución sagrada en España; ese lapso indefinido donde la conversación fluye sin prisa tras la comida.", text_fr: "La 'sobremesa' est une institution sacrée en Espagne ; ce laps de temps indéfini où la conversation coule sans hâte après le repas.", difficulty: "Expert (C1)" }
];

// --- 2. BANQUE DE DONNÉES XXL ---
export const DATA_BANK = {
  verbs: [
    // A1
    { levels: ["A1"], es: "Ser", en: "Être (Essence)", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }, { pronoun: "Él", verb: "es", fr: "Il est" }, { pronoun: "Nos", verb: "somos", fr: "Nous sommes" }, { pronoun: "Vos", verb: "sois", fr: "Vous êtes" }, { pronoun: "Ellos", verb: "son", fr: "Ils sont" }] },
    { levels: ["A1"], es: "Estar", en: "Être (État)", conjugation: [{ pronoun: "Yo", verb: "estoy", fr: "Je suis" }, { pronoun: "Tú", verb: "estás", fr: "Tu es" }, { pronoun: "Él", verb: "está", fr: "Il est" }, { pronoun: "Nos", verb: "estamos", fr: "Nous sommes" }, { pronoun: "Vos", verb: "estáis", fr: "Vous êtes" }, { pronoun: "Ellos", verb: "están", fr: "Ils sont" }] },
    { levels: ["A1"], es: "Tener", en: "Avoir", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }, { pronoun: "Él", verb: "tiene", fr: "Il a" }, { pronoun: "Nos", verb: "tenemos", fr: "Nous avons" }] },
    { levels: ["A1"], es: "Hacer", en: "Faire", conjugation: [{ pronoun: "Yo", verb: "hago", fr: "Je fais" }, { pronoun: "Tú", verb: "haces", fr: "Tu fais" }, { pronoun: "Él", verb: "hace", fr: "Il fait" }] },
    { levels: ["A1"], es: "Ir", en: "Aller", conjugation: [{ pronoun: "Yo", verb: "voy", fr: "Je vais" }, { pronoun: "Tú", verb: "vas", fr: "Tu vas" }, { pronoun: "Nos", verb: "vamos", fr: "Nous allons" }] },
    { levels: ["A1"], es: "Comer", en: "Manger", conjugation: [{ pronoun: "Yo", verb: "como", fr: "Je mange" }, { pronoun: "Tú", verb: "comes", fr: "Tu manges" }] },
    { levels: ["A1"], es: "Hablar", en: "Parler", conjugation: [{ pronoun: "Yo", verb: "hablo", fr: "Je parle" }, { pronoun: "Tú", verb: "hablas", fr: "Tu parles" }] },
    { levels: ["A1"], es: "Vivir", en: "Vivre", conjugation: [{ pronoun: "Yo", verb: "vivo", fr: "Je vis" }, { pronoun: "Tú", verb: "vives", fr: "Tu vis" }] },
    
    // A2
    { levels: ["A2"], es: "Poder", en: "Pouvoir", conjugation: [{ pronoun: "Yo", verb: "puedo", fr: "Je peux" }, { pronoun: "Tú", verb: "puedes", fr: "Tu peux" }] },
    { levels: ["A2"], es: "Querer", en: "Vouloir", conjugation: [{ pronoun: "Yo", verb: "quiero", fr: "Je veux" }, { pronoun: "Tú", verb: "quieres", fr: "Tu veux" }] },
    { levels: ["A2"], es: "Saber", en: "Savoir", conjugation: [{ pronoun: "Yo", verb: "sé", fr: "Je sais" }, { pronoun: "Tú", verb: "sabes", fr: "Tu sais" }] },
    { levels: ["A2"], es: "Ver", en: "Voir", conjugation: [{ pronoun: "Yo", verb: "veo", fr: "Je vois" }, { pronoun: "Tú", verb: "ves", fr: "Tu vois" }] },
    
    // B1-C1
    { levels: ["B1", "B2"], es: "Pensar", en: "Penser", conjugation: [{ pronoun: "Yo", verb: "pienso", fr: "Je pense" }] },
    { levels: ["B1", "B2"], es: "Creer", en: "Croire", conjugation: [{ pronoun: "Yo", verb: "creo", fr: "Je crois" }] },
    { levels: ["B1", "B2"], es: "Sentir", en: "Sentir", conjugation: [{ pronoun: "Yo", verb: "siento", fr: "Je sens" }] },
    { levels: ["B2", "C1"], es: "Exigir", en: "Exiger", conjugation: [{ pronoun: "Yo", verb: "exijo", fr: "J'exige" }] }
  ],

  // NOMS CATÉGORISÉS (Pour phrases logiques)
  nouns: {
    places: [
      { es: "La casa", en: "La maison" }, { es: "La playa", en: "La plage" },
      { es: "La escuela", en: "L'école" }, { es: "El parque", en: "Le parc" },
      { es: "La ciudad", en: "La ville" }, { es: "El cine", en: "Le cinéma" }
    ],
    objects: [
      { es: "El libro", en: "Le livre" }, { es: "El coche", en: "La voiture" },
      { es: "El dinero", en: "L'argent" }, { es: "El teléfono", en: "Le téléphone" },
      { es: "La ropa", en: "Les vêtements" }, { es: "La llave", en: "La clé" }
    ],
    food: [
      { es: "La comida", en: "La nourriture" }, { es: "El agua", en: "L'eau" },
      { es: "El pan", en: "Le pain" }, { es: "La manzana", en: "La pomme" },
      { es: "El café", en: "Le café" }, { es: "La cerveza", en: "La bière" }
    ],
    people: [
      { es: "El amigo", en: "L'ami" }, { es: "La familia", en: "La famille" },
      { es: "El hermano", en: "Le frère" }, { es: "La hermana", en: "La soeur" }
    ]
  },

  adjectives: [
    { es: "Grande", en: "Grand" }, { es: "Pequeño", en: "Petit" },
    { es: "Bueno", en: "Bon" }, { es: "Malo", en: "Mauvais" },
    { es: "Nuevo", en: "Nouveau" }, { es: "Viejo", en: "Vieux" },
    { es: "Importante", en: "Important" }, { es: "Fácil", en: "Facile" }
  ],

  connectors: [
    { es: "Pero", en: "Mais" }, { es: "Y", en: "Et" }, { es: "O", en: "Ou" },
    { es: "Porque", en: "Parce que" }, { es: "Cuando", en: "Quand" },
    { es: "Si", en: "Si" }
  ],

  tips: [
    "En espagnol, le 'H' est siempre muet.",
    "Ser = Identité permanente / Estar = État temporaire.",
    "Gustar s'accorde avec la chose qu'on aime.",
    "Hay (Il y a) est invariable."
  ]
};

// --- 3. CONFIGURATION DU PROGRAMME ---
export const CURRICULUM_LOGIC = {
  A1: [
    { topic: "Bases & Salutations", grammar: "Présent (Ser)" }, { topic: "La Famille", grammar: "Possession" },
    { topic: "Ma Routine", grammar: "Verbes -AR" }, { topic: "Mes Goûts", grammar: "Gustar" },
    { topic: "Projets de Voyage", grammar: "Futur Proche" }, { topic: "Ma Ville", grammar: "Hay (Il y a)" },
    { topic: "Shopping & Vêtements", grammar: "Adjectifs" }, { topic: "La Maison", grammar: "Estar (Lieu)" },
    { topic: "Le Corps Humain", grammar: "Avoir mal" }, { topic: "La Nourriture", grammar: "Impératif (Tu)" },
    { topic: "Les Animaux", grammar: "Genre & Nombre" }, { topic: "La Météo", grammar: "Verbe Hacer" },
    { topic: "L'École", grammar: "Fournitures" }, { topic: "Les Loisirs", grammar: "Jugar (Jouer)" },
    { topic: "Les Amis", grammar: "Ser vs Estar" }, { topic: "Les Émotions", grammar: "Estar + Adj" },
    { topic: "Les Saisons", grammar: "Comparatifs" }, { topic: "La Nature", grammar: "Démonstratifs" },
    { topic: "Poser des Questions", grammar: "Interrogatifs" }, { topic: "Bilan A1", grammar: "Révision Globale" }
  ],
  A2: Array(20).fill({ topic: "Niveau A2", grammar: "Avancé" }),
  B1: Array(20).fill({ topic: "Niveau B1", grammar: "Intermédiaire" }),
  B2: Array(20).fill({ topic: "Niveau B2", grammar: "Confirmé" }),
  C1: Array(20).fill({ topic: "Niveau C1", grammar: "Expert" })
};

// --- 4. LEÇONS MANUELLES (1-20) ---
export const CONTENT_PART_1 = {
  1: [
    { id: 101, type: "swipe", es: "Hola", en: "Bonjour", context: "Salutation universelle", sentence: "Hola, ¿cómo estás?", sentence_trans: "Bonjour, comment vas-tu ?" },
    { id: 102, type: "grammar", title: "Être (Ser)", description: "Identité & Origine", verb: "Ser", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }] },
    { id: 103, type: "input", question: "Traduis 'Je suis'", answer: ["yo soy", "soy"], hint: "Verbe Ser" },
    { id: 104, type: "structure", title: "La Phrase Simple", formula: "Sujet + Verbe", example: "Soy Pablo", note: "Le sujet est souvent omis." },
    { id: 105, type: "swipe", es: "Gracias", en: "Merci", context: "Politesse", sentence: "Muchas gracias por todo.", sentence_trans: "Merci beaucoup pour tout." },
    { id: 106, type: "swipe", es: "Adiós", en: "Au revoir", context: "Départ", sentence: "Adiós, hasta mañana.", sentence_trans: "Au revoir, à demain." }
  ],
  2: [
    { id: 201, type: "swipe", es: "La familia", en: "La famille", context: "Groupe social", sentence: "Amo a mi familia.", sentence_trans: "J'aime ma famille." },
    { id: 202, type: "grammar", title: "Avoir (Tener)", description: "Possession", verb: "Tener", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }] },
    { id: 203, type: "input", question: "J'ai", answer: ["tengo"], hint: "T..." },
    { id: 204, type: "swipe", es: "Madre", en: "Mère", context: "Parent", sentence: "Mi madre es amable.", sentence_trans: "Ma mère est gentille." },
    { id: 205, type: "swipe", es: "Padre", en: "Père", context: "Parent", sentence: "Mi padre trabaja mucho.", sentence_trans: "Mon père travaille beaucoup." },
    { id: 206, type: "structure", title: "Possession", formula: "Mi + Nom", example: "Mi casa", note: "Pas d'article devant" }
  ],
  // ... Les leçons suivantes générées prendront le relais ...
  20: [
    { id: 2001, type: "structure", title: "BILAN A1", formula: "Bravo !", example: "Niveau 1 validé", note: "Prêt pour A2 ?" },
    { id: 2002, type: "input", question: "Où habites-tu ?", answer: ["dónde vives", "¿dónde vives?"], hint: "D..." },
    { id: 2003, type: "input", question: "Il fait chaud", answer: ["hace calor"], hint: "Hace..." },
    { id: 2004, type: "input", question: "Mon ami", answer: ["mi amigo"], hint: "Mi..." },
    { id: 2005, type: "input", question: "Je ne mange pas", answer: ["no como"], hint: "No..." },
    { id: 2006, type: "input", question: "Nous parlons", answer: ["hablamos"], hint: "-amos" },
    { id: 2007, type: "input", question: "Je suis fatigué", answer: ["estoy cansado"], hint: "Estar" },
    { id: 2008, type: "swipe", es: "¡Vamos!", en: "On y va !", context: "Motivation", sentence: "¡Vamos a la playa!", sentence_trans: "Allons à la plage !" }
  ]
};

// --- 5. GÉNÉRATEUR INTELLIGENT (21-100) ---
export const generateStructuredLesson = (id) => {
  let level = "A1";
  if (id > 20) level = "A2";
  if (id > 40) level = "B1";
  if (id > 60) level = "B2";
  if (id > 80) level = "C1";

  const config = CURRICULUM_LOGIC[level][(id - 1) % 20] || { topic: "Pratique", grammar: "Révision" };

  // 1. CHOIX DU VERBE
  const availableVerbs = DATA_BANK.verbs.filter(v => v.levels.includes(level));
  const randVerb = availableVerbs.length > 0 ? availableVerbs[id % availableVerbs.length] : DATA_BANK.verbs[0];

  // 2. CHOIX DES NOMS (Par catégorie pour la logique)
  const getRand = (arr) => arr[(id + Math.floor(Math.random() * 10)) % arr.length];
  
  const place = getRand(DATA_BANK.nouns.places);
  const object = getRand(DATA_BANK.nouns.objects);
  const food = getRand(DATA_BANK.nouns.food);
  const adj = getRand(DATA_BANK.adjectives);
  const conn = getRand(DATA_BANK.connectors);
  const tip = getRand(DATA_BANK.tips);

  // 3. CONSTRUCTION PHRASES LOGIQUES
  const card1 = { ...object, context: "Besoin", sentence: `Necesito ${object.es.toLowerCase()}.`, sentence_trans: `J'ai besoin de ${object.en.toLowerCase()}.` };
  const card2 = { ...place, context: "Destination", sentence: `Voy a ${place.es.toLowerCase()}.`, sentence_trans: `Je vais à ${place.en.toLowerCase()}.` };
  const card3 = { ...food, context: "Goût", sentence: `Me gusta ${food.es.toLowerCase()}.`, sentence_trans: `J'aime ${food.en.toLowerCase()}.` };

  let cardId = id * 1000;
  const isPlural = id % 2 === 0;
  const grammarQuestionText = isPlural 
    ? `Conjugue : Vosotros (${randVerb.es})` 
    : `Conjugue : Él/Ella (${randVerb.es})`;
  const grammarAnswer = isPlural 
    ? [randVerb.conjugation.find(c => c.pronoun.includes("Vos"))?.verb || randVerb.conjugation[0].verb]
    : [randVerb.conjugation.find(c => c.pronoun.includes("Él"))?.verb || randVerb.conjugation[0].verb];

  return [
    { id: cardId++, type: "structure", title: `Leçon ${id} : ${config.topic}`, formula: config.grammar, example: `Verbe : ${randVerb.es}`, note: `Niveau ${level}` },
    
    // Carte 1 (Objet)
    { id: cardId++, type: "swipe", es: card1.es, en: card1.en, context: card1.context, sentence: card1.sentence, sentence_trans: card1.sentence_trans },
    
    // Grammaire
    { id: cardId++, type: "grammar", title: `Verbe : ${randVerb.es}`, description: randVerb.en, verb: randVerb.es, conjugation: randVerb.conjugation },
    { id: cardId++, type: "input", question: grammarQuestionText, answer: grammarAnswer, hint: `Verbe ${randVerb.es}` },

    // Carte 2 (Lieu)
    { id: cardId++, type: "swipe", es: card2.es, en: card2.en, context: card2.context, sentence: card2.sentence, sentence_trans: card2.sentence_trans },
    
    // Structure
    { id: cardId++, type: "structure", title: "L'Accord", formula: "Nom + Adjectif", example: `${object.es} ${adj.es.toLowerCase()}`, note: "L'adjectif s'accorde." },

    // Carte 3 (Nourriture)
    { id: cardId++, type: "swipe", es: card3.es, en: card3.en, context: card3.context, sentence: card3.sentence, sentence_trans: card3.sentence_trans },
    
    // Connecteur
    { id: cardId++, type: "swipe", es: conn.es, en: conn.en, context: "Liaison", sentence: `${conn.es}, es importante.`, sentence_trans: `${conn.en}, c'est important.` },

    { id: cardId++, type: "structure", title: "Astuce", formula: "Bon à savoir", example: tip, note: "Culture" },
    
    // Exercice final
    { id: cardId++, type: "input", question: `Traduis '${card1.en}'`, answer: [card1.es.toLowerCase()], hint: `${card1.es.substring(0,3)}...` }
  ];
};

// --- EXPORTS UTILITAIRES ---
export const generateSmartTest = () => [];

export const SENTENCE_STRUCTURES = [
  { id: 1, title: "La Phrase Simple", formula: "Sujet + Verbe", example_es: "(Yo) como.", example_en: "Je mange.", explanation: "Sujet souvent omis." }
];

export const generateAllContent = () => {
  const content = { ...CONTENT_PART_1 };
  for (let i = 1; i <= 100; i++) {
     if (!content[i]) {
        content[i] = generateStructuredLesson(i);
     }
  }
  return content;
};

export const INITIAL_LESSONS_CONTENT = generateAllContent();
export const INITIAL_LESSONS_LIST = [];
let idCnt = 1;
["A1", "A2", "B1", "B2", "C1"].forEach(lvl => {
    for(let i=0; i<20; i++) {
        INITIAL_LESSONS_LIST.push({ id: idCnt++, title: `Leçon ${idCnt}`, level: lvl, desc: "Cours structuré" });
    }
});

// --- GÉNÉRATEUR D'EXAMEN ---
export const generateExamContent = (allContent, startId, endId, levelName, examId) => {
  let pool = [];
  for (let i = startId; i <= endId; i++) {
    if (allContent[i]) {
      const validCards = allContent[i].filter(c => c.type === 'swipe' || c.type === 'input');
      pool = [...pool, ...validCards];
    }
  }
  if (pool.length < 10) return [{ id: examId, type: "structure", title: "Erreur", formula: "Pas assez de contenu", example: "...", note: "..." }];
  
  const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 20);
  
  return [
    { id: examId, type: "structure", title: `EXAMEN ${levelName}`, formula: "Test Final", example: "20 Questions", note: "Objectif 16/20" },
    ...selected.map((item, index) => ({ ...item, id: examId + idx + 1, question: item.type === 'input' ? item.question : `Traduis : ${item.en}`, answer: item.type === 'input' ? item.answer : [item.es.toLowerCase()] }))
  ];
};

export const getDailyReading = (userLevel) => {
  const targetLevel = userLevel || "A1";
  const levelReadings = DAILY_READINGS.filter(r => r.level === targetLevel);
  const pool = levelReadings.length > 0 ? levelReadings : DAILY_READINGS;
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return pool[dayIndex % pool.length];
};