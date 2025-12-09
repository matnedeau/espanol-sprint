/* eslint-disable */
// @ts-nocheck

/* 📚 CONTENT EXPANSION PACK 
   Généré pour EspañolSprint - Vocabulaire Enrichi & Lectures Longues & Conjugaisons Complètes & Mode Histoire
*/

// [STORY-MODE] STRUCTURE POUR LES HISTOIRES INTERACTIVES
export const STORIES_DATA = [
  {
    id: "story-1",
    title: "La Rencontre (El Encuentro)",
    level: "A1",
    characters: {
      pablo: { 
        name: "Pablo", 
        avatar: "👨‍🦱", 
        color: "bg-blue-100 text-blue-900",
        // 👇 AJOUTEZ L'ID DE LA VOIX HOMME ICI
        voiceId: "ErXwobaYiN019PkySvjV" 
      },
      sofia: { 
        name: "Sofía", 
        avatar: "👩‍🦰", 
        color: "bg-pink-100 text-pink-900",
        // 👇 AJOUTEZ L'ID DE LA VOIX FEMME ICI
        voiceId: "21m00Tcm4TlvDq8ikWAM" 
      }
    },
    //
    dialogue: [
      { type: "bubble", speaker: "pablo", text_es: "¡Hola! ¿Eres nueva aquí?", text_fr: "Salut ! Tu es nouvelle ici ?" },
      { type: "bubble", speaker: "sofia", text_es: "Sí, soy Sofía. Acabo de llegar de Madrid.", text_fr: "Oui, je suis Sofía. Je viens d'arriver de Madrid." },
      { 
        type: "question", 
        question: "D'où vient Sofía ?", 
        options: ["Barcelone", "Madrid", "Valence"], 
        answer: "Madrid" 
      },
      { type: "bubble", speaker: "pablo", text_es: "¡Qué bien! Yo me llamo Pablo.", text_fr: "Super ! Je m'appelle Pablo." },
      { type: "bubble", speaker: "sofia", text_es: "¿Trabajas o estudias?", text_fr: "Tu travailles ou tu étudies ?" },
      { type: "bubble", speaker: "pablo", text_es: "Estudio arquitectura. ¿Y tú?", text_fr: "J'étudie l'architecture. Et toi ?" },
      { 
        type: "question", 
        question: "Que fait Pablo ?", 
        options: ["Il travaille", "Il est étudiant", "Il est touriste"], 
        answer: "Il est étudiant" 
      },
      { type: "bubble", speaker: "sofia", text_es: "Yo busco trabajo. ¿Sabes dónde hay una buena cafetería?", text_fr: "Moi je cherche du travail. Tu sais où il y a un bon café ?" },
      { type: "bubble", speaker: "pablo", text_es: "¡Claro! Vamos, te invito.", text_fr: "Bien sûr ! Viens, je t'invite." }
    ]
  }
];

// --- 1. LECTURES QUOTIDIENNES ---
export const DAILY_READINGS = [
  // NIVEAU A1 (Débutant)
  { id: 101, level: "A1", title_es: "En el Restaurante", title_fr: "Au Restaurant", text_es: "—¡Hola! ¿Tiene una mesa para dos personas?\n—Sí, por supuesto. Aquí tiene el menú. ¿Qué desea beber?\n—Para mí, un agua mineral sin gas, por favor. Y para mi amigo, un jugo de naranja natural.\n—Muy bien. Enseguida vuelvo con las bebidas.", text_fr: "—Bonjour ! Avez-vous une table pour deux personnes ?\n—Oui, bien sûr. Voici le menu. Que désirez-vous boire ?\n—Pour moi, une eau minérale plate, s'il vous plaît. Et pour mon ami, un jus d'orange frais.\n—Très bien. Je reviens tout de suite avec les boissons.", difficulty: "Débutant (A1)" },
  { id: 102, level: "A1", title_es: "Mi Rutina Diaria", title_fr: "Ma Routine Quotidienne", text_es: "Me levanto a las siete de la mañana todos los días. Primero, me ducho y luego desayuno café con leche y tostadas. Después, voy al trabajo en autobús. Trabajo en una oficina pequeña en el centro. A las seis de la tarde vuelvo a casa, ceno ligero y leo un libro antes de dormir.", text_fr: "Je me lève à sept heures du matin tous les jours. D'abord, je me douche et ensuite je prends un café au lait et des tartines. Après, je vais au travail en bus. Je travaille dans un petit bureau au centre. À six heures du soir je rentre, je dîne léger et je lis un livre avant de dormir.", difficulty: "Débutant (A1)" },
  { id: 103, level: "A1", title_es: "La Familia de Ana", title_fr: "La Famille d'Ana", text_es: "Ana vive en Madrid con su familia. Su padre es médico y trabaja en un hospital grande. Su madre es profesora de matemáticas. Ana tiene un hermano menor que se llama Luis. Los domingos, todos comen paella en casa de sus abuelos. Es una tradición familiar muy importante.", text_fr: "Ana vit à Madrid avec sa famille. Son père est médecin et travaille dans un grand hôpital. Sa mère est professeure de mathématiques. Ana a un petit frère qui s'appelle Luis. Les dimanches, ils mangent tous de la paella chez leurs grands-parents. C'est une tradition familiale très importante.", difficulty: "Débutant (A1)" },
  { id: 104, level: "A1", title_es: "De Compras", title_fr: "Faire les Courses", text_es: "Hoy necesito comprar frutas y verduras. Voy al mercado central porque los productos son frescos. Quiero manzanas rojas, plátanos amarillos y uvas verdes. El vendedor es muy amable y siempre me da las mejores frutas. También compro pan en la panadería de la esquina.", text_fr: "Aujourd'hui, j'ai besoin d'acheter des fruits et légumes. Je vais au marché central car les produits sont frais. Je veux des pommes rouges, des bananes jaunes et des raisins verts. Le vendeur est très gentil et me donne toujours les meilleurs fruits. J'achète aussi du pain à la boulangerie du coin.", difficulty: "Débutant (A1)" },
  
  // NIVEAU A2
  { id: 201, level: "A2", title_es: "Un Viaje a México", title_fr: "Un Voyage au Mexique", text_es: "El verano pasado viajé a México con mi hermana. Fue un viaje increíble. Visitamos las antiguas pirámides de Teotihuacán y nadamos en los cenotes azules de Yucatán. La comida era picante pero deliciosa; probamos tacos auténticos y guacamole. La gente fue muy acogedora con nosotras. Fue una experiencia inolvidable conocer otra cultura tan rica y colorida.", text_fr: "L'été dernier, j'ai voyagé au Mexique avec ma sœur. C'était un voyage incroyable. Nous avons visité les anciennes pyramides de Teotihuacán et nagé dans les cénotes bleus du Yucatán. La nourriture était épicée mais délicieuse ; nous avons goûté des tacos authentiques et du guacamole. Les gens ont été très accueillants avec nous. C'était une expérience inoubliable de connaître une autre culture si riche et colorée.", difficulty: "Élémentaire (A2)" },
];

// --- 2. BANQUE DE DONNÉES XXL ---
export const DATA_BANK = {
  verbs: [
    { levels: ["A1"], es: "Ser", en: "Être (Identité)", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }, { pronoun: "Él", verb: "es", fr: "Il est" }, { pronoun: "Nosotros", verb: "somos", fr: "Nous sommes" }, { pronoun: "Vosotros", verb: "sois", fr: "Vous êtes" }, { pronoun: "Ellos", verb: "son", fr: "Ils sont" }] },
    { levels: ["A1"], es: "Estar", en: "Être (État/Lieu)", conjugation: [{ pronoun: "Yo", verb: "estoy", fr: "Je suis" }, { pronoun: "Tú", verb: "estás", fr: "Tu es" }, { pronoun: "Él", verb: "está", fr: "Il est" }, { pronoun: "Nosotros", verb: "estamos", fr: "Nous sommes" }, { pronoun: "Vosotros", verb: "estáis", fr: "Vous êtes" }, { pronoun: "Ellos", verb: "están", fr: "Ils sont" }] },
    { levels: ["A1"], es: "Tener", en: "Avoir", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }, { pronoun: "Él", verb: "tiene", fr: "Il a" }, { pronoun: "Nosotros", verb: "tenemos", fr: "Nous avons" }, { pronoun: "Vosotros", verb: "tenéis", fr: "Vous avez" }, { pronoun: "Ellos", verb: "tienen", fr: "Ils ont" }] },
    { levels: ["A1"], es: "Hacer", en: "Faire", conjugation: [{ pronoun: "Yo", verb: "hago", fr: "Je fais" }, { pronoun: "Tú", verb: "haces", fr: "Tu fais" }, { pronoun: "Él", verb: "hace", fr: "Il fait" }, { pronoun: "Nosotros", verb: "hacemos", fr: "Nous faisons" }, { pronoun: "Vosotros", verb: "hacéis", fr: "Vous faites" }, { pronoun: "Ellos", verb: "hacen", fr: "Ils font" }] },
    { levels: ["A1"], es: "Ir", en: "Aller", conjugation: [{ pronoun: "Yo", verb: "voy", fr: "Je vais" }, { pronoun: "Tú", verb: "vas", fr: "Tu vas" }, { pronoun: "Él", verb: "va", fr: "Il va" }, { pronoun: "Nosotros", verb: "vamos", fr: "Nous allons" }, { pronoun: "Vosotros", verb: "vais", fr: "Vous allez" }, { pronoun: "Ellos", verb: "van", fr: "Ils vont" }] }
  ],

  nouns: {
    business: [
      { levels: ["A2"], es: "La empresa", en: "L'entreprise", sentence: "Trabajo en una empresa internacional.", sentence_trans: "Je travaille dans une entreprise internationale." },
      { levels: ["B1"], es: "El negocio", en: "L'affaire/Business", sentence: "Es un buen negocio para nosotros.", sentence_trans: "C'est une bonne affaire pour nous." }
    ],
    technology: [
      { levels: ["A1"], es: "El ordenador", en: "L'ordinateur", sentence: "Mi ordenador es muy lento.", sentence_trans: "Mon ordinateur est très lent." }
    ],
    places: [
      { levels: ["A1"], es: "La casa", en: "La maison", sentence: "Mi casa es pequeña.", sentence_trans: "Ma maison est petite." },
      { levels: ["A1"], es: "La playa", en: "La plage", sentence: "Vamos a la playa mañana.", sentence_trans: "Nous allons à la plage demain." }
    ],
    objects: [
      { levels: ["A1"], es: "El libro", en: "Le livre", sentence: "Leo un libro interesante.", sentence_trans: "Je lis un livre intéressant." }
    ],
    food: [
      { levels: ["A1"], es: "La comida", en: "La nourriture", sentence: "La comida está lista.", sentence_trans: "La nourriture est prête." }
    ],
    people: [
      { levels: ["A1"], es: "El amigo", en: "L'ami", sentence: "Es mi mejor amigo.", sentence_trans: "C'est mon meilleur ami." }
    ],
    abstract: [
      { levels: ["A1"], es: "El tiempo", en: "Le temps", sentence: "No tengo tiempo.", sentence_trans: "Je n'ai pas le temps." }
    ]
  },

  adjectives: [
    { levels: ["A1"], es: "Grande", en: "Grand", sentence: "Una casa grande." }
  ],

  connectors: [
    { es: "Y", en: "Et" }
  ],

  tips: [
    "En espagnol, le 'H' est toujours muet.",
    "Ser = Identité permanente / Estar = État temporaire.",
    "Hay (Il y a) est invariable.",
    "L'accent tonique est essentiel : hablo (je parle) vs habló (il parla).",
    "En espagnol, on utilise 'usted' pour la politesse formelle."
  ]
};

// --- 3. PROGRAMME PÉDAGOGIQUE COMPLET ---
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
  A2: [
    { topic: "Raconter le Passé", grammar: "Passé Composé" }, { topic: "Souvenirs d'Enfance", grammar: "Imparfait" },
    { topic: "Futur & Avenir", grammar: "Futur Simple" }, { topic: "Comparaisons", grammar: "Superlatifs" },
    { topic: "Obligations", grammar: "Tener que / Deber" }, { topic: "Santé & Médecin", grammar: "Impératif (Vous)" },
    { topic: "Au Restaurant", grammar: "Politesse" }, { topic: "Réservation Hôtel", grammar: "Conditionnel (Je)" },
    { topic: "La Banque", grammar: "Chiffres élevés" }, { topic: "La Poste", grammar: "COD (Lo/La)" },
    { topic: "Urgences", grammar: "Impératif Négatif" }, { topic: "Fêtes & Traditions", grammar: "Passé Simple" },
    { topic: "La Sieste", grammar: "Habitudes" }, { topic: "Orientation", grammar: "Prépositions" },
    { topic: "Action en cours", grammar: "Gérondif" }, { topic: "Sentiments", grammar: "Subjonctif (Intro)" },
    { topic: "Musique & Cinéma", grammar: "Opinion" }, { topic: "Internet", grammar: "Verbes Techno" },
    { topic: "Voyage (Avion)", grammar: "Vocabulaire" }, { topic: "Bilan A2", grammar: "Validation" }
  ],
  B1: [
    { topic: "Exprimer l'Opinion", grammar: "Subjonctif Présent" }, { topic: "Hypothèses", grammar: "Conditionnel" },
    { topic: "Rapporter un Discours", grammar: "Style Indirect" }, { topic: "Relations Sociales", grammar: "Por vs Para" },
    { topic: "L'Environnement", grammar: "Futur Antérieur" }, { topic: "La Technologie", grammar: "Avantages/Inconvénients" },
    { topic: "Le Monde du Travail", grammar: "CV & Lettre" }, { topic: "La Politique", grammar: "Débat" },
    { topic: "La Justice", grammar: "Vocabulaire Juridique" }, { topic: "L'Économie", grammar: "Chiffres & Trends" },
    { topic: "L'Art & Culture", grammar: "Description" }, { topic: "La Littérature", grammar: "Passé Simple (Avancé)" },
    { topic: "L'Histoire", grammar: "Concordance temps" }, { topic: "La Géographie", grammar: "Régions" },
    { topic: "La Société", grammar: "Égalité/Droits" }, { topic: "La Science", grammar: "Futur Proche" },
    { topic: "Les Médias", grammar: "Connecteurs Logiques" }, { topic: "Psychologie", grammar: "Verbes de changement" },
    { topic: "Philosophie", grammar: "Abstrait" }, { topic: "Bilan B1", grammar: "Maîtrise" }
  ],
  B2: [
    { topic: "Si j'étais...", grammar: "Subjonctif Imparfait" }, { topic: "Regrets", grammar: "Conditionnel Passé" },
    { topic: "Faits Divers", grammar: "Voix Passive" }, { topic: "Rumeurs", grammar: "Discours Rapporté (Passé)" },
    { topic: "Santé Avancée", grammar: "Expressions Corps" }, { topic: "Changements d'État", grammar: "Ponerse / Quedarse" },
    { topic: "Nuances", grammar: "Por vs Para (Subtil)" }, { topic: "Précision", grammar: "Pronoms Relatifs (Cuyo)" },
    { topic: "Projets Futurs", grammar: "Futur Antérieur" }, { topic: "Récit Complexe", grammar: "Plus-que-parfait" },
    { topic: "Sentiments", grammar: "Verbes Prépositionnels" }, { topic: "Argumentation", grammar: "Concession (Bien que)" },
    { topic: "Doute & Probabilité", grammar: "Deber de / Quizás" }, { topic: "Habitudes Passées", grammar: "Soler + Infinitif" },
    { topic: "Généralités", grammar: "Le Neutre (Lo)" }, { topic: "Nuances de Taille", grammar: "Diminutifs (-ito)" },
    { topic: "Business", grammar: "Négociation" }, { topic: "Écologie", grammar: "Débat & Solutions" },
    { topic: "Humour & Ironie", grammar: "Double Sens" }, { topic: "Bilan B2", grammar: "Fluidité Totale" }
  ],
  C1: [
    { topic: "Subtilités", grammar: "Subjonctif (Nuances)" }, { topic: "Langage Soutenu", grammar: "Registres de langue" },
    { topic: "Expressions Idiomatiques", grammar: "Sens Figuré" }, { topic: "Argot & Rue", grammar: "Langage Familier" },
    { topic: "Accents & Régions", grammar: "Esp vs Latam" }, { topic: "Littérature", grammar: "Style Romanesque" },
    { topic: "Philosophie", grammar: "Concepts Abstraits" }, { topic: "Médecine", grammar: "Termes Techniques" },
    { topic: "Juridique", grammar: "Langage de Loi" }, { topic: "Histoire d'Espagne", grammar: "Civilisation" },
    { topic: "Amérique Latine", grammar: "Culture Spécifique" }, { topic: "Rhétorique", grammar: "Connecteurs Complexes" },
    { topic: "Emphase", grammar: "Double Négation" }, { topic: "Transformation", grammar: "Verbes Complexes" },
    { topic: "Faux Amis", grammar: "Pièges Courants" }, { topic: "Sagesse Populaire", grammar: "Proverbes" },
    { topic: "Presse & Média", grammar: "Analyse" }, { topic: "Rédaction", grammar: "Style Académique" },
    { topic: "Bilinguisme", grammar: "Perfectionnement" }, { topic: "BILAN FINAL C1", grammar: "Expertise" }
  ]
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
  3: [
    { id: 301, type: "grammar", title: "Verbes -AR", description: "Présent", verb: "Hablar", conjugation: [{ pronoun: "Yo", verb: "-o", fr: "o" }, { pronoun: "Tú", verb: "-as", fr: "as" }] },
    { id: 302, type: "swipe", es: "Hablar", en: "Parler", context: "Verbe régulier", sentence: "Me gusta hablar español.", sentence_trans: "J'aime parler espagnol." },
    { id: 303, type: "swipe", es: "Trabajar", en: "Travailler", context: "Job", sentence: "Voy a trabajar mañana.", sentence_trans: "Je vais travailler demain." },
    { id: 304, type: "input", question: "Je parle", answer: ["hablo"], hint: "Terminaison -o" },
    { id: 305, type: "structure", title: "Négation", formula: "No + Verbe", example: "No hablo", note: "No se place avant" }
  ],
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

  const levelConfig = CURRICULUM_LOGIC[level] || [];
  const config = levelConfig[(id - 1) % levelConfig.length] || { topic: `Pratique ${level}`, grammar: "Général" };
  const topicLower = config.topic.toLowerCase();

  let targetCategory = 'random';
  if (topicLower.includes('cuisine') || topicLower.includes('nourriture')) targetCategory = 'food';
  else if (topicLower.includes('voyage') || topicLower.includes('ville')) targetCategory = 'places';
  else if (topicLower.includes('objet') || topicLower.includes('technologie')) targetCategory = 'technology';
  else if (topicLower.includes('famille') || topicLower.includes('ami')) targetCategory = 'people';
  else if (topicLower.includes('abstrait') || topicLower.includes('sentiment')) targetCategory = 'abstract';
  else if (topicLower.includes('business')) targetCategory = 'business';
  else if (topicLower.includes('santé')) targetCategory = 'health';
  else if (topicLower.includes('nature')) targetCategory = 'nature';

  const getSmartNoun = (fallbackCategory) => {
      const cat = targetCategory !== 'random' ? targetCategory : fallbackCategory;
      const pool = DATA_BANK.nouns[cat] ? DATA_BANK.nouns[cat] : DATA_BANK.nouns['objects'];
      const levelPool = pool.filter(n => n.levels.includes(level));
      const finalPool = levelPool.length > 0 ? levelPool : pool;
      return finalPool[(id + Math.floor(Math.random() * 10)) % finalPool.length];
  };

  const availableVerbs = DATA_BANK.verbs.filter(v => v.levels.includes(level));
  const randVerb = availableVerbs.length > 0 ? availableVerbs[id % availableVerbs.length] : DATA_BANK.verbs[0];

  const card1Noun = getSmartNoun(targetCategory !== 'random' ? targetCategory : 'objects');
  const card2Noun = getSmartNoun(targetCategory !== 'random' ? targetCategory : 'places');
  const card3Noun = getSmartNoun(targetCategory !== 'random' ? targetCategory : 'food');
  
  const adj = DATA_BANK.adjectives[(id + 2) % DATA_BANK.adjectives.length];
  const conn = DATA_BANK.connectors[id % DATA_BANK.connectors.length];
  const tip = DATA_BANK.tips[id % DATA_BANK.tips.length];

  let cardId = id * 1000;
  const isPlural = id % 2 === 0;
  
  const grammarQuestionText = isPlural ? `Conjugue : Nosotros (${randVerb.es})` : `Conjugue : Tú (${randVerb.es})`;
  const targetPronoun = isPlural ? "Nos" : "Tú";
  const conjFn = randVerb.conjugation.find(c => c.pronoun.includes(targetPronoun) || (targetPronoun === "Nos" && c.pronoun.includes("Nosotros")));
  const grammarAnswer = conjFn ? [conjFn.verb] : [randVerb.conjugation[0].verb];

  const card1 = { ...card1Noun, context: "Mot clé", sentence: card1Noun.sentence || `Necesito ${card1Noun.es.toLowerCase()}.`, sentence_trans: card1Noun.sentence_trans || `J'ai besoin de ${card1Noun.en.toLowerCase()}.` };
  const card2 = { ...card2Noun, context: "Contexte", sentence: card2Noun.sentence || `Voy a ${card2Noun.es.toLowerCase()}.`, sentence_trans: card2Noun.sentence_trans || `Je vais à ${card2Noun.en.toLowerCase()}.` };
  const card3 = { ...card3Noun, context: "Exemple", sentence: card3Noun.sentence || `Me gusta ${card3Noun.es.toLowerCase()}.`, sentence_trans: card3Noun.sentence_trans || `J'aime ${card3Noun.en.toLowerCase()}.` };

  return [
    { id: cardId++, type: "structure", title: `Leçon ${id} : ${config.topic}`, formula: config.grammar, example: `Verbe focus : ${randVerb.es}`, note: `Niveau ${level}` },
    { id: cardId++, type: "swipe", es: card1.es, en: card1.en, context: card1.context, sentence: card1.sentence, sentence_trans: card1.sentence_trans },
    { id: cardId++, type: "grammar", title: `Verbe : ${randVerb.es}`, description: randVerb.en, verb: randVerb.es, conjugation: randVerb.conjugation },
    { id: cardId++, type: "input", question: grammarQuestionText, answer: grammarAnswer, hint: `Verbe ${randVerb.es}` },
    { id: cardId++, type: "swipe", es: card2.es, en: card2.en, context: card2.context, sentence: card2.sentence, sentence_trans: card2.sentence_trans },
    { id: cardId++, type: "structure", title: "L'Accord", formula: "Nom + Adjectif", example: `${card1.es} ${adj.es.toLowerCase()}`, note: "L'adjectif s'accorde." },
    { id: cardId++, type: "swipe", es: card3.es, en: card3.en, context: card3.context, sentence: card3.sentence, sentence_trans: card3.sentence_trans },
    { id: cardId++, type: "swipe", es: conn.es, en: conn.en, context: "Liaison", sentence: `${conn.es}, es importante.`, sentence_trans: `${conn.en}, c'est important.` },
    { id: cardId++, type: "structure", title: "Astuce", formula: "Bon à savoir", example: tip, note: "Culture" },
    { id: cardId++, type: "input", question: `Traduis : "${card1.sentence_trans}"`, answer: [card1.sentence.toLowerCase().replace(/[¿¡!.,]/g, '')], hint: "Utilise le vocabulaire vu." }
  ];
};

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
    const curriculum = CURRICULUM_LOGIC[lvl] || [];
    for(let i=0; i<20; i++) {
        const topicTitle = (curriculum[i] && curriculum[i].topic) ? curriculum[i].topic : `Pratique ${lvl} - ${i+1}`;
        INITIAL_LESSONS_LIST.push({ 
            id: idCnt++, 
            title: topicTitle, 
            level: lvl, 
            desc: `Niveau ${lvl}` 
        });
    }
});

export const generateExamContent = (allContent, startId, endId, levelName, examId) => {
  let pool = [];
  for (let i = startId; i <= endId; i++) {
    if (allContent[i]) {
      pool = [...pool, ...allContent[i].filter(c => c.type === 'swipe' || c.type === 'input')];
    }
  }
  if (pool.length < 10) return [{ id: examId, type: "structure", title: "Erreur", formula: "...", example: "...", note: "Contacte le support." }];
  const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 20);
  return [
    { id: examId, type: "structure", title: `EXAMEN ${levelName}`, formula: "Test Final", example: "20 Questions", note: "Objectif 16/20" },
    ...selected.map((item, idx) => {
        if (item.type === 'input') return { ...item, id: examId + idx + 1 };
        const questionText = item.sentence_trans ? `Traduis : "${item.sentence_trans}"` : `Traduis : "${item.en}"`;
        const answerText = item.sentence ? item.sentence : item.es;
        return {
            ...item,
            id: examId + idx + 1,
            type: 'input',
            question: questionText,
            answer: [answerText.toLowerCase().replace(/[¿¡!.,]/g, '').trim()],
            hint: item.context || "..."
        };
    })
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