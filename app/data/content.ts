/* eslint-disable */
// @ts-nocheck

/* =======================================================================================
   🧠 CONTENT FACTORY : DONNÉES XXL ET LECTURES (CORRIGÉ)
   ======================================================================================= */

// --- 1. LECTURES QUOTIDIENNES (Définies en premier pour éviter les erreurs) ---
export const DAILY_READINGS = [
  // A1
  { id: 101, level: "A1", title_es: "Mi Gato Félix", title_fr: "Mon Chat Félix", text_es: "Tengo un gato. Se llama Félix. Es negro y blanco. A Félix le gusta dormir en el sofá.", text_fr: "J'ai un chat. Il s'appelle Félix. Il est noir et blanc. Félix aime dormir sur le canapé.", difficulty: "Débutant (A1)" },
  { id: 102, level: "A1", title_es: "El Desayuno", title_fr: "Le Petit Déjeuner", text_es: "Por la mañana, como pan con tomate y aceite. Bebo un café con leche caliente.", text_fr: "Le matin, je mange du pain avec de la tomate et de l'huile. Je bois un café au lait chaud.", difficulty: "Débutant (A1)" },
  { id: 103, level: "A1", title_es: "Mi Familia", title_fr: "Ma Famille", text_es: "Vivo con mis padres y mi hermano en Madrid. Mi padre es alto y mi madre es muy amable.", text_fr: "Je vis avec mes parents et mon frère à Madrid. Mon père est grand et ma mère est très gentille.", difficulty: "Débutant (A1)" },
  { id: 104, level: "A1", title_es: "En la Escuela", title_fr: "À l'École", text_es: "La escuela es grande. Tengo muchos amigos en mi clase. La profesora escribe en la pizarra.", text_fr: "L'école est grande. J'ai beaucoup d'amis dans ma classe. La professeure écrit au tableau.", difficulty: "Débutant (A1)" },
  { id: 105, level: "A1", title_es: "Mi Casa", title_fr: "Ma Maison", text_es: "Mi casa es pequeña pero bonita. Tiene dos habitaciones y una cocina blanca.", text_fr: "Ma maison est petite mais jolie. Elle a deux chambres et une cuisine blanche.", difficulty: "Débutant (A1)" },
  { id: 106, level: "A1", title_es: "El Parque", title_fr: "Le Parc", text_es: "Hoy hace sol. Voy al parque con mi perro. Hay muchos árboles verdes y flores.", text_fr: "Aujourd'hui il fait soleil. Je vais au parc avec mon chien. Il y a beaucoup d'arbres verts et de fleurs.", difficulty: "Débutant (A1)" },
  { id: 107, level: "A1", title_es: "La Ropa", title_fr: "Les Vêtements", text_es: "Llevo una camiseta azul y pantalones negros. También tengo zapatos nuevos.", text_fr: "Je porte un t-shirt bleu et un pantalon noir. J'ai aussi des chaussures neuves.", difficulty: "Débutant (A1)" },
  
  // A2
  { id: 201, level: "A2", title_es: "Mis Vacaciones", title_fr: "Mes Vacances", text_es: "El año pasado fui a Barcelona con mis amigos. Visitamos la Sagrada Familia y caminamos por las Ramblas.", text_fr: "L'année dernière, je suis allé à Barcelone avec mes amis. Nous avons visité la Sagrada Familia et marché sur les Ramblas.", difficulty: "Élémentaire (A2)" },
  { id: 202, level: "A2", title_es: "La Rutina de Sofía", title_fr: "La Routine de Sofia", text_es: "Sofía se levanta temprano, a las siete. Se ducha, se viste y va a trabajar en autobús.", text_fr: "Sofia se lève tôt, à sept heures. Elle se douche, s'habille et va travailler en bus.", difficulty: "Élémentaire (A2)" },
  { id: 203, level: "A2", title_es: "Una Cena Especial", title_fr: "Un Dîner Spécial", text_es: "Ayer fue el cumpleaños de mi hermana. Fuimos a un restaurante italiano muy elegante.", text_fr: "Hier c'était l'anniversaire de ma sœur. Nous sommes allés dans un restaurant italien très élégant.", difficulty: "Élémentaire (A2)" },
  { id: 204, level: "A2", title_es: "El Mercado", title_fr: "Le Marché", text_es: "Todos los sábados voy al mercado central. Me gusta comprar fruta fresca y verduras.", text_fr: "Tous les samedis je vais au marché central. J'aime acheter des fruits frais et des légumes.", difficulty: "Élémentaire (A2)" },
  { id: 205, level: "A2", title_es: "Mi Primer Trabajo", title_fr: "Mon Premier Travail", text_es: "Cuando tenía dieciocho años, trabajé en una cafetería. Servía café y limpiaba las mesas.", text_fr: "Quand j'avais dix-huit ans, j'ai travaillé dans un café. Je servais le café et nettoyais les tables.", difficulty: "Élémentaire (A2)" },
  
  // B1
  { id: 301, level: "B1", title_es: "El Teletrabajo", title_fr: "Le Télétravail", text_es: "Creo que el teletrabajo tiene muchas ventajas. No tienes que viajar cada día y puedes organizar tu tiempo mejor.", text_fr: "Je crois que le télétravail a beaucoup d'avantages. Tu n'as pas à voyager chaque jour et tu peux mieux organiser ton temps.", difficulty: "Intermédiaire (B1)" },
  { id: 302, level: "B1", title_es: "Planes de Futuro", title_fr: "Projets d'Avenir", text_es: "Cuando termine mis estudios, viajaré por América del Sur. Quiero que mis padres vengan conmigo una semana.", text_fr: "Quand je terminerai mes études, je voyagerai en Amérique du Sud. Je veux que mes parents viennent avec moi une semaine.", difficulty: "Intermédiaire (B1)" },
  { id: 303, level: "B1", title_es: "Vida Saludable", title_fr: "Vie Saine", text_es: "Para tener una vida saludable, es necesario hacer ejercicio y comer bien. Intento evitar el azúcar.", text_fr: "Pour avoir une vie saine, il est nécessaire de faire de l'exercice et de bien manger. J'essaie d'éviter le sucre.", difficulty: "Intermédiaire (B1)" },
  { id: 304, level: "B1", title_es: "Las Redes Sociales", title_fr: "Les Réseaux Sociaux", text_es: "Las redes sociales son útiles para mantener el contacto, pero pasamos demasiado tiempo mirando pantallas.", text_fr: "Les réseaux sociaux sont utiles pour garder le contact, mais nous passons trop de temps à regarder des écrans.", difficulty: "Intermédiaire (B1)" },
  
  // B2
  { id: 401, level: "B2", title_es: "Turismo Sostenible", title_fr: "Tourisme Durable", text_es: "El turismo de masas ha dañado muchos ecosistemas. Es vital que los viajeros sean conscientes de su huella ecológica.", text_fr: "Le tourisme de masse a endommagé de nombreux écosystèmes. Il est vital que les voyageurs soient conscients de leur empreinte écologique.", difficulty: "Avancé (B2)" },
  { id: 402, level: "B2", title_es: "Inteligencia Artificial", title_fr: "Intelligence Artificielle", text_es: "La IA está transformando nuestra sociedad a una velocidad vertiginosa, planteando dilemas éticos importantes.", text_fr: "L'IA transforme notre société à une vitesse vertigineuse, posant des dilemmes éthiques importants.", difficulty: "Avancé (B2)" },
  
  // C1
  { id: 501, level: "C1", title_es: "La Sobremesa", title_fr: "La Sobremesa", text_es: "La sobremesa es una institución sagrada en España; ese lapso indefinido donde la conversación fluye sin prisa tras la comida.", text_fr: "La 'sobremesa' est une institution sacrée en Espagne ; ce laps de temps indéfini où la conversation coule sans hâte après le repas.", difficulty: "Expert (C1)" },
  { id: 502, level: "C1", title_es: "Don Quijote", title_fr: "Don Quichotte", text_es: "Don Quijote no es solo una sátira, sino un estudio profundo de la naturaleza humana y la lucha entre ideales y realidad.", text_fr: "Don Quichotte n'est pas seulement une satire, mais une étude profonde de la nature humaine et de la lutte entre idéaux et réalité.", difficulty: "Expert (C1)" }
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
    { levels: ["A1"], es: "Trabajar", en: "Travailler", conjugation: [{ pronoun: "Yo", verb: "trabajo", fr: "Je travaille" }, { pronoun: "Tú", verb: "trabajas", fr: "Tu travailles" }] },
    
    // A2
    { levels: ["A2"], es: "Poder", en: "Pouvoir", conjugation: [{ pronoun: "Yo", verb: "puedo", fr: "Je peux" }, { pronoun: "Tú", verb: "puedes", fr: "Tu peux" }] },
    { levels: ["A2"], es: "Querer", en: "Vouloir", conjugation: [{ pronoun: "Yo", verb: "quiero", fr: "Je veux" }, { pronoun: "Tú", verb: "quieres", fr: "Tu veux" }] },
    { levels: ["A2"], es: "Saber", en: "Savoir", conjugation: [{ pronoun: "Yo", verb: "sé", fr: "Je sais" }, { pronoun: "Tú", verb: "sabes", fr: "Tu sais" }] },
    { levels: ["A2"], es: "Ver", en: "Voir", conjugation: [{ pronoun: "Yo", verb: "veo", fr: "Je vois" }, { pronoun: "Tú", verb: "ves", fr: "Tu vois" }] },
    { levels: ["A2"], es: "Dar", en: "Donner", conjugation: [{ pronoun: "Yo", verb: "doy", fr: "Je donne" }, { pronoun: "Tú", verb: "das", fr: "Tu donnes" }] },
    { levels: ["A2"], es: "Decir", en: "Dire", conjugation: [{ pronoun: "Yo", verb: "digo", fr: "Je dis" }, { pronoun: "Tú", verb: "dices", fr: "Tu dis" }] },
    { levels: ["A2"], es: "Venir", en: "Venir", conjugation: [{ pronoun: "Yo", verb: "vengo", fr: "Je viens" }, { pronoun: "Tú", verb: "vienes", fr: "Tu viens" }] },
    { levels: ["A2"], es: "Salir", en: "Sortir", conjugation: [{ pronoun: "Yo", verb: "salgo", fr: "Je sors" }, { pronoun: "Tú", verb: "sales", fr: "Tu sors" }] },
    
    // B1-C1 (Avancé)
    { levels: ["B1", "B2"], es: "Pensar", en: "Penser", conjugation: [{ pronoun: "Yo", verb: "pienso", fr: "Je pense" }] },
    { levels: ["B1", "B2"], es: "Creer", en: "Croire", conjugation: [{ pronoun: "Yo", verb: "creo", fr: "Je crois" }] },
    { levels: ["B1", "B2"], es: "Sentir", en: "Sentir", conjugation: [{ pronoun: "Yo", verb: "siento", fr: "Je sens" }] },
    { levels: ["B2", "C1"], es: "Exigir", en: "Exiger", conjugation: [{ pronoun: "Yo", verb: "exijo", fr: "J'exige" }] },
    { levels: ["B2", "C1"], es: "Suponer", en: "Supposer", conjugation: [{ pronoun: "Yo", verb: "supongo", fr: "Je suppose" }] }
  ],

  nouns: {
    places: [
      { es: "La casa", en: "La maison" }, { es: "La playa", en: "La plage" },
      { es: "La escuela", en: "L'école" }, { es: "El parque", en: "Le parc" },
      { es: "La ciudad", en: "La ville" }, { es: "El cine", en: "Le cinéma" },
      { es: "El restaurante", en: "Le restaurant" }, { es: "El trabajo", en: "Le travail" },
      { es: "El hospital", en: "L'hôpital" }, { es: "La tienda", en: "Le magasin" }
    ],
    objects: [
      { es: "El libro", en: "Le livre" }, { es: "El coche", en: "La voiture" },
      { es: "El dinero", en: "L'argent" }, { es: "El teléfono", en: "Le téléphone" },
      { es: "La ropa", en: "Les vêtements" }, { es: "El regalo", en: "Le cadeau" },
      { es: "La llave", en: "La clé" }, { es: "La mesa", en: "La table" },
      { es: "El ordenador", en: "L'ordinateur" }, { es: "La silla", en: "La chaise" }
    ],
    food: [
      { es: "La comida", en: "La nourriture" }, { es: "El agua", en: "L'eau" },
      { es: "El pan", en: "Le pain" }, { es: "La manzana", en: "La pomme" },
      { es: "El café", en: "Le café" }, { es: "La cerveza", en: "La bière" },
      { es: "El pescado", en: "Le poisson" }, { es: "La carne", en: "La viande" },
      { es: "El queso", en: "Le fromage" }, { es: "La leche", en: "Le lait" }
    ],
    people: [
      { es: "El amigo", en: "L'ami" }, { es: "La familia", en: "La famille" },
      { es: "El hermano", en: "Le frère" }, { es: "La hermana", en: "La soeur" },
      { es: "El profesor", en: "Le professeur" }, { es: "El médico", en: "Le médecin" },
      { es: "El hombre", en: "L'homme" }, { es: "La mujer", en: "La femme" }
    ],
    abstract: [
      { es: "El tiempo", en: "Le temps" }, { es: "La idea", en: "L'idée" },
      { es: "El problema", en: "Le problème" }, { es: "La verdad", en: "La vérité" },
      { es: "El sueño", en: "Le rêve" }, { es: "La vida", en: "La vie" }
    ]
  },

  adjectives: [
    { es: "Grande", en: "Grand" }, { es: "Pequeño", en: "Petit" },
    { es: "Bueno", en: "Bon" }, { es: "Malo", en: "Mauvais" },
    { es: "Nuevo", en: "Nouveau" }, { es: "Viejo", en: "Vieux" },
    { es: "Importante", en: "Important" }, { es: "Fácil", en: "Facile" },
    { es: "Difícil", en: "Difficile" }, { es: "Rápido", en: "Rapide" },
    { es: "Lento", en: "Lent" }, { es: "Caro", en: "Cher" },
    { es: "Barato", en: "Pas cher" }, { es: "Bonito", en: "Joli" }
  ],

  connectors: [
    { es: "Pero", en: "Mais" }, { es: "Y", en: "Et" }, { es: "O", en: "Ou" },
    { es: "Porque", en: "Parce que" }, { es: "Cuando", en: "Quand" },
    { es: "Si", en: "Si" }, { es: "También", en: "Aussi" },
    { es: "Ahora", en: "Maintenant" }, { es: "Siempre", en: "Toujours" }
  ],

  tips: [
    "En espagnol, le 'H' est toujours muet ! (Hola = Ola)",
    "Les points d'interrogation se mettent aussi au début : ¿ ?",
    "Le 'V' se prononce presque comme un 'B' doux.",
    "Le 'RR' roulé est typique : mets ta langue sur le palais.",
    "Ser = Identité permanente / Estar = État temporaire.",
    "Gustar s'accorde avec ce qu'on aime (Me gustan los libros)."
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
  3: [
    { id: 301, type: "grammar", title: "Verbes -AR", description: "Présent", verb: "Hablar", conjugation: [{ pronoun: "Yo", verb: "-o", fr: "o" }, { pronoun: "Tú", verb: "-as", fr: "as" }] },
    { id: 302, type: "swipe", es: "Hablar", en: "Parler", context: "Verbe régulier", sentence: "Me gusta hablar español.", sentence_trans: "J'aime parler espagnol." },
    { id: 303, type: "swipe", es: "Trabajar", en: "Travailler", context: "Job", sentence: "Voy a trabajar mañana.", sentence_trans: "Je vais travailler demain." },
    { id: 304, type: "input", question: "Je parle", answer: ["hablo"], hint: "Terminaison -o" },
    { id: 305, type: "structure", title: "Négation", formula: "No + Verbe", example: "No hablo", note: "No se place avant" }
  ],
  15: [
    { id: 1501, type: "swipe", es: "Amigo", en: "Ami", context: "Relation", sentence: "Juan es mi mejor amigo.", sentence_trans: "Juan est mon meilleur ami." },
    { id: 1502, type: "swipe", es: "Fiesta", en: "Fête", context: "Social", sentence: "Vamos a una fiesta.", sentence_trans: "Nous allons à une fête." },
    { id: 1503, type: "swipe", es: "Salir", en: "Sortir", context: "Action", sentence: "Quiero salir esta noche.", sentence_trans: "Je veux sortir ce soir." },
    { id: 1504, type: "swipe", es: "Bailar", en: "Danser", context: "Activité", sentence: "Me encanta bailar salsa.", sentence_trans: "J'adore danser la salsa." },
    { id: 1505, type: "swipe", es: "Reír", en: "Rire", context: "Émotion", sentence: "Reír es bueno para la salud.", sentence_trans: "Rire est bon pour la santé." },
    { id: 1506, type: "grammar", title: "Verbe Quedar", description: "Se donner rdv", verb: "Quedar", conjugation: [{ pronoun: "Nosotros", verb: "Quedamos", fr: "On se voit" }, { pronoun: "A las 8", verb: "a las ocho", fr: "à 8h" }] },
    { id: 1507, type: "structure", title: "Proposer", formula: "¿Te apuntas?", example: "Voy al cine, ¿te apuntas?", note: "Tu viens avec nous ?" },
    { id: 1508, type: "input", question: "On se voit à 8h", answer: ["quedamos a las 8", "quedamos a las ocho"], hint: "Quedamos..." }
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

export const DAILY_READINGS = [
  // ==============================
  // NIVEAU A1 (Débutant)
  // ==============================
  {
    id: 101,
    level: "A1",
    title_es: "Mi Gato Félix",
    title_fr: "Mon Chat Félix",
    text_es: "Tengo un gato. Se llama Félix. Es negro y blanco. A Félix le gusta dormir en el sofá. Come mucho pescado. Es un gato muy simpático y juega con una pelota roja.",
    text_fr: "J'ai un chat. Il s'appelle Félix. Il est noir et blanc. Félix aime dormir sur le canapé. Il mange beaucoup de poisson. C'est un chat très sympathique et il joue avec une balle rouge.",
    difficulty: "Débutant (A1)"
  },
  {
    id: 102,
    level: "A1",
    title_es: "El Desayuno",
    title_fr: "Le Petit Déjeuner",
    text_es: "Por la mañana, como pan con tomate y aceite. Bebo un café con leche caliente. Mi hermana prefiere beber zumo de naranja. Es un desayuno típico en España.",
    text_fr: "Le matin, je mange du pain avec de la tomate et de l'huile. Je bois un café au lait chaud. Ma sœur préfère boire du jus d'orange. C'est un petit déjeuner typique en Espagne.",
    difficulty: "Débutant (A1)"
  },
  {
    id: 103,
    level: "A1",
    title_es: "Mi Familia",
    title_fr: "Ma Famille",
    text_es: "Vivo con mis padres y mi hermano en Madrid. Mi padre es alto y mi madre es muy amable. Mi hermano tiene diez años. Los domingos comemos todos juntos.",
    text_fr: "Je vis avec mes parents et mon frère à Madrid. Mon père est grand et ma mère est très gentille. Mon frère a dix ans. Les dimanches, nous mangeons tous ensemble.",
    difficulty: "Débutant (A1)"
  },
  {
    id: 104,
    level: "A1",
    title_es: "En la Escuela",
    title_fr: "À l'École",
    text_es: "La escuela es grande. Tengo muchos amigos en mi clase. La profesora escribe en la pizarra. Yo tengo un cuaderno azul y un bolígrafo negro. Me gusta estudiar español.",
    text_fr: "L'école est grande. J'ai beaucoup d'amis dans ma classe. La professeure écrit au tableau. J'ai un cahier bleu et un stylo noir. J'aime étudier l'espagnol.",
    difficulty: "Débutant (A1)"
  },
  {
    id: 105,
    level: "A1",
    title_es: "Mi Casa",
    title_fr: "Ma Maison",
    text_es: "Mi casa es pequeña pero bonita. Tiene dos habitaciones y una cocina blanca. En el salón hay una televisión grande. Me gusta leer en mi habitación por la noche.",
    text_fr: "Ma maison est petite mais jolie. Elle a deux chambres et une cuisine blanche. Dans le salon, il y a une grande télévision. J'aime lire dans ma chambre le soir.",
    difficulty: "Débutant (A1)"
  },
  {
    id: 106,
    level: "A1",
    title_es: "El Parque",
    title_fr: "Le Parc",
    text_es: "Hoy hace sol. Voy al parque con mi perro. Hay muchos árboles verdes y flores. Los niños juegan al fútbol. Es un día muy feliz.",
    text_fr: "Aujourd'hui il fait soleil. Je vais au parc avec mon chien. Il y a beaucoup d'arbres verts et de fleurs. Les enfants jouent au football. C'est une journée très heureuse.",
    difficulty: "Débutant (A1)"
  },
  {
    id: 107,
    level: "A1",
    title_es: "La Ropa",
    title_fr: "Les Vêtements",
    text_es: "Llevo una camiseta azul y pantalones negros. También tengo zapatos nuevos. Mi abrigo es rojo porque es mi color favorito. Me gusta ir de compras.",
    text_fr: "Je porte un t-shirt bleu et un pantalon noir. J'ai aussi des chaussures neuves. Mon manteau est rouge parce que c'est ma couleur préférée. J'aime faire du shopping.",
    difficulty: "Débutant (A1)"
  },

  // ==============================
  // NIVEAU A2 (Élémentaire)
  // ==============================
  {
    id: 201,
    level: "A2",
    title_es: "Mis Vacaciones",
    title_fr: "Mes Vacances",
    text_es: "El año pasado fui a Barcelona con mis amigos. Visitamos la Sagrada Familia y caminamos por las Ramblas. Hacía mucho sol y comimos paella cerca del mar. Fue un viaje inolvidable.",
    text_fr: "L'année dernière, je suis allé à Barcelone avec mes amis. Nous avons visité la Sagrada Familia et marché sur les Ramblas. Il faisait très beau et nous avons mangé une paella près de la mer. Ce fut un voyage inoubliable.",
    difficulty: "Élémentaire (A2)"
  },
  {
    id: 202,
    level: "A2",
    title_es: "La Rutina de Sofía",
    title_fr: "La Routine de Sofia",
    text_es: "Sofía se levanta temprano, a las siete. Se ducha, se viste y va a trabajar en autobús. Normalmente almuerza a las dos de la tarde. Por la noche, le gusta leer un libro antes de dormir.",
    text_fr: "Sofia se lève tôt, à sept heures. Elle se douche, s'habille et va travailler en bus. Normalement elle déjeune à 14h. Le soir, elle aime lire un livre avant de dormir.",
    difficulty: "Élémentaire (A2)"
  },
  {
    id: 203,
    level: "A2",
    title_es: "Una Cena Especial",
    title_fr: "Un Dîner Spécial",
    text_es: "Ayer fue el cumpleaños de mi hermana. Fuimos a un restaurante italiano muy elegante. Comí pizza y bebí vino tinto. Al final, cantamos cumpleaños feliz y comimos tarta.",
    text_fr: "Hier c'était l'anniversaire de ma sœur. Nous sommes allés dans un restaurant italien très élégant. J'ai mangé une pizza et bu du vin rouge. À la fin, nous avons chanté joyeux anniversaire et mangé du gâteau.",
    difficulty: "Élémentaire (A2)"
  },
  {
    id: 204,
    level: "A2",
    title_es: "El Mercado",
    title_fr: "Le Marché",
    text_es: "Todos los sábados voy al mercado central. Me gusta comprar fruta fresca y verduras. Los vendedores gritan los precios y hay mucha gente. Siempre compro queso y aceitunas.",
    text_fr: "Tous les samedis je vais au marché central. J'aime acheter des fruits frais et des légumes. Les vendeurs crient les prix et il y a beaucoup de monde. J'achète toujours du fromage et des olives.",
    difficulty: "Élémentaire (A2)"
  },
  {
    id: 205,
    level: "A2",
    title_es: "Mi Primer Trabajo",
    title_fr: "Mon Premier Travail",
    text_es: "Cuando tenía dieciocho años, trabajé en una cafetería. Servía café y limpiaba las mesas. Fue un trabajo duro pero aprendí mucho. Mis compañeros eran muy divertidos.",
    text_fr: "Quand j'avais dix-huit ans, j'ai travaillé dans un café. Je servais le café et nettoyais les tables. C'était un travail dur mais j'ai beaucoup appris. Mes collègues étaient très drôles.",
    difficulty: "Élémentaire (A2)"
  },
  {
    id: 206,
    level: "A2",
    title_es: "Un Día de Lluvia",
    title_fr: "Un Jour de Pluie",
    text_es: "Ayer llovió todo el día. No pude salir al parque. Me quedé en casa viendo películas y cocinando galletas. A veces, un día tranquilo en casa es lo mejor.",
    text_fr: "Hier il a plu toute la journée. Je n'ai pas pu sortir au parc. Je suis resté à la maison à regarder des films et cuisiner des biscuits. Parfois, une journée calme à la maison est ce qu'il y a de mieux.",
    difficulty: "Élémentaire (A2)"
  },
  {
    id: 207,
    level: "A2",
    title_es: "El Concierto",
    title_fr: "Le Concert",
    text_es: "La semana pasada fui a un concierto de rock. La música estaba muy alta y la gente bailaba. Compré una camiseta del grupo. Volví a casa muy tarde pero muy contento.",
    text_fr: "La semaine dernière je suis allé à un concert de rock. La musique était très forte et les gens dansaient. J'ai acheté un t-shirt du groupe. Je suis rentré très tard mais très content.",
    difficulty: "Élémentaire (A2)"
  },

  // ==============================
  // NIVEAU B1 (Intermédiaire)
  // ==============================
  {
    id: 301,
    level: "B1",
    title_es: "El Teletrabajo",
    title_fr: "Le Télétravail",
    text_es: "Creo que el teletrabajo tiene muchas ventajas. No tienes que viajar cada día y puedes organizar tu tiempo mejor. Sin embargo, a veces es difícil separar la vida laboral de la personal. Es importante tener un espacio tranquilo.",
    text_fr: "Je crois que le télétravail a beaucoup d'avantages. Tu n'as pas à voyager chaque jour et tu peux mieux organiser ton temps. Cependant, il est parfois difficile de séparer la vie professionnelle de la personnelle. Il est important d'avoir un espace calme.",
    difficulty: "Intermédiaire (B1)"
  },
  {
    id: 302,
    level: "B1",
    title_es: "Planes de Futuro",
    title_fr: "Projets d'Avenir",
    text_es: "Cuando termine mis estudios, viajaré por América del Sur. Quiero que mis padres vengan conmigo una semana. Espero poder visitar Machu Picchu y aprender más sobre la cultura inca.",
    text_fr: "Quand je terminerai mes études, je voyagerai en Amérique du Sud. Je veux que mes parents viennent avec moi une semaine. J'espère pouvoir visiter le Machu Picchu et en apprendre plus sur la culture inca.",
    difficulty: "Intermédiaire (B1)"
  },
  {
    id: 303,
    level: "B1",
    title_es: "Vida Saludable",
    title_fr: "Vie Saine",
    text_es: "Para tener una vida saludable, es necesario hacer ejercicio y comer bien. Intento evitar el azúcar y beber mucha agua. Además, dormir ocho horas es fundamental para tener energía durante el día.",
    text_fr: "Pour avoir une vie saine, il est nécessaire de faire de l'exercice et de bien manger. J'essaie d'éviter le sucre et de boire beaucoup d'eau. De plus, dormir huit heures est fondamental pour avoir de l'énergie durant la journée.",
    difficulty: "Intermédiaire (B1)"
  },
  {
    id: 304,
    level: "B1",
    title_es: "Las Redes Sociales",
    title_fr: "Les Réseaux Sociaux",
    text_es: "Las redes sociales son útiles para mantener el contacto con amigos lejanos. Sin embargo, pasamos demasiado tiempo mirando pantallas. Creo que deberíamos desconectar más a menudo y disfrutar del mundo real.",
    text_fr: "Les réseaux sociaux sont utiles pour garder le contact avec des amis lointains. Cependant, nous passons trop de temps à regarder des écrans. Je crois que nous devrions déconnecter plus souvent et profiter du monde réel.",
    difficulty: "Intermédiaire (B1)"
  },
  {
    id: 305,
    level: "B1",
    title_es: "Aprender Idiomas",
    title_fr: "Apprendre des Langues",
    text_es: "Saber otro idioma abre muchas puertas. Te permite viajar sin problemas y conocer gente nueva. Al principio es difícil, pero con práctica y paciencia, todo es posible. Ver películas en versión original ayuda mucho.",
    text_fr: "Savoir une autre langue ouvre beaucoup de portes. Cela te permet de voyager sans problèmes et de rencontrer de nouvelles personnes. Au début c'est difficile, mais avec de la pratique et de la patience, tout est possible. Regarder des films en version originale aide beaucoup.",
    difficulty: "Intermédiaire (B1)"
  },
  {
    id: 306,
    level: "B1",
    title_es: "El Medio Ambiente",
    title_fr: "L'Environnement",
    text_es: "Es urgente que cuidemos nuestro planeta. El reciclaje es un buen comienzo, pero no es suficiente. Deberíamos usar menos plástico y más transporte público. El cambio climático es un problema real que nos afecta a todos.",
    text_fr: "Il est urgent que nous prenions soin de notre planète. Le recyclage est un bon début, mais ce n'est pas suffisant. Nous devrions utiliser moins de plastique et plus de transports publics. Le changement climatique est un problème réel qui nous affecte tous.",
    difficulty: "Intermédiaire (B1)"
  },
  {
    id: 307,
    level: "B1",
    title_es: "La Gastronomía",
    title_fr: "La Gastronomie",
    text_es: "La comida española es famosa en todo el mundo. La tortilla de patatas y el gazpacho son platos deliciosos y sencillos. Me encanta cocinar para mis amigos y probar nuevas recetas cada fin de semana.",
    text_fr: "La cuisine espagnole est célèbre dans le monde entier. L'omelette de pommes de terre et le gaspacho sont des plats délicieux et simples. J'adore cuisiner pour mes amis et essayer de nouvelles recettes chaque week-end.",
    difficulty: "Intermédiaire (B1)"
  },

  // ==============================
  // NIVEAU B2 (Avancé)
  // ==============================
  {
    id: 401,
    level: "B2",
    title_es: "Turismo Sostenible",
    title_fr: "Tourisme Durable",
    text_es: "El turismo de masas ha dañado muchos ecosistemas. Es vital que los viajeros sean conscientes de su huella ecológica. Optar por alojamientos locales y respetar la naturaleza son pasos clave para un turismo más ético y responsable.",
    text_fr: "Le tourisme de masse a endommagé de nombreux écosystèmes. Il est vital que les voyageurs soient conscients de leur empreinte écologique. Opter pour des hébergements locaux et respecter la nature sont des étapes clés pour un tourisme plus éthique et responsable.",
    difficulty: "Avancé (B2)"
  },
  {
    id: 402,
    level: "B2",
    title_es: "La Inteligencia Artificial",
    title_fr: "L'Intelligence Artificielle",
    text_es: "La IA está transformando nuestra sociedad a una velocidad vertiginosa. Aunque ofrece soluciones increíbles en medicina, plantea dilemas éticos sobre la privacidad y el empleo. Debemos regular su uso para garantizar que beneficie a todos.",
    text_fr: "L'IA transforme notre société à une vitesse vertigineuse. Bien qu'elle offre des solutions incroyables en médecine, elle pose des dilemmes éthiques sur la vie privée et l'emploi. Nous devons réguler son usage pour garantir qu'elle bénéficie à tous.",
    difficulty: "Avancé (B2)"
  },
  {
    id: 403,
    level: "B2",
    title_es: "El Estrés Moderno",
    title_fr: "Le Stress Moderne",
    text_es: "Vivimos en una sociedad que valora la productividad por encima del bienestar. El estrés crónico se ha convertido en una epidemia silenciosa. Es esencial encontrar un equilibrio y dedicar tiempo a la salud mental y al ocio.",
    text_fr: "Nous vivons dans une société qui valorise la productivité au-dessus du bien-être. Le stress chronique est devenu une épidémie silencieuse. Il est essentiel de trouver un équilibre et de consacrer du temps à la santé mentale et aux loisirs.",
    difficulty: "Avancé (B2)"
  },
  {
    id: 404,
    level: "B2",
    title_es: "Ciudades del Futuro",
    title_fr: "Villes du Futur",
    text_es: "Las ciudades inteligentes prometen mejorar nuestra calidad de vida. Con edificios eficientes y transporte autónomo, podríamos reducir la contaminación. Sin embargo, el costo de esta tecnología podría aumentar la desigualdad social.",
    text_fr: "Les villes intelligentes promettent d'améliorer notre qualité de vie. Avec des bâtiments efficaces et des transports autonomes, nous pourrions réduire la pollution. Cependant, le coût de cette technologie pourrait augmenter l'inégalité sociale.",
    difficulty: "Avancé (B2)"
  },
  {
    id: 405,
    level: "B2",
    title_es: "La Educación Online",
    title_fr: "L'Éducation en Ligne",
    text_es: "La educación a distancia ha democratizado el acceso al conocimiento. Ya no es necesario estar físicamente en una universidad para aprender. No obstante, la falta de interacción social directa sigue siendo un desafío pedagógico importante.",
    text_fr: "L'éducation à distance a démocratisé l'accès à la connaissance. Il n'est plus nécessaire d'être physiquement dans une université pour apprendre. Néanmoins, le manque d'interaction sociale directe reste un défi pédagogique important.",
    difficulty: "Avancé (B2)"
  },
  {
    id: 406,
    level: "B2",
    title_es: "El Cine Español",
    title_fr: "Le Cinéma Espagnol",
    text_es: "El cine español ha ganado reconocimiento internacional gracias a directores como Almodóvar. Sus películas exploran la complejidad humana con un estilo visual único. Es un medio excelente para comprender la cultura y la historia reciente de España.",
    text_fr: "Le cinéma espagnol a gagné une reconnaissance internationale grâce à des réalisateurs comme Almodóvar. Ses films explorent la complexité humaine avec un style visuel unique. C'est un excellent moyen de comprendre la culture et l'histoire récente de l'Espagne.",
    difficulty: "Avancé (B2)"
  },
  {
    id: 407,
    level: "B2",
    title_es: "Tradiciones en Peligro",
    title_fr: "Traditions en Danger",
    text_es: "La globalización amenaza con homogeneizar las culturas. Muchas tradiciones locales están desapareciendo frente a las tendencias globales. Es nuestra responsabilidad preservar estas costumbres como parte de nuestra identidad y patrimonio.",
    text_fr: "La mondialisation menace d'homogénéiser les cultures. De nombreuses traditions locales disparaissent face aux tendances globales. Il est de notre responsabilité de préserver ces coutumes comme partie de notre identité et patrimoine.",
    difficulty: "Avancé (B2)"
  },

  // ==============================
  // NIVEAU C1 (Expert)
  // ==============================
  {
    id: 501,
    level: "C1",
    title_es: "La Sobremesa",
    title_fr: "La Sobremesa",
    text_es: "La sobremesa es una institución sagrada en España. No se trata meramente de digerir los alimentos, sino de ese lapso indefinido donde la conversación fluye sin prisa. Es allí donde se arregla el mundo y se fortalecen los lazos, desafiando la tiranía del reloj.",
    text_fr: "La 'sobremesa' est une institution sacrée en Espagne. Il ne s'agit pas simplement de digérer les aliments, mais de ce laps de temps indéfini où la conversation coule sans hâte. C'est là que l'on refait le monde et que l'on renforce les liens, défiant la tyrannie de l'horloge.",
    difficulty: "Expert (C1)"
  },
  {
    id: 502,
    level: "C1",
    title_es: "Realismo Mágico",
    title_fr: "Réalisme Magique",
    text_es: "El realismo mágico es una corriente literaria fascinante donde lo fantástico se percibe como cotidiano. Autores como García Márquez lograron plasmar una realidad donde los mitos y la historia se entrelazan de manera indisoluble, creando un universo único.",
    text_fr: "Le réalisme magique est un courant littéraire fascinant où le fantastique est perçu comme quotidien. Des auteurs comme García Márquez ont réussi à capturer une réalité où les mythes et l'histoire s'entrelacent de manière indissoluble, créant un univers unique.",
    difficulty: "Expert (C1)"
  },
  {
    id: 503,
    level: "C1",
    title_es: "La España Vaciada",
    title_fr: "L'Espagne Vide",
    text_es: "El fenómeno de la 'España vaciada' es un reto demográfico mayúsculo. Mientras las urbes se saturan, vastas regiones sufren un éxodo rural alarmante. Revitalizar estas zonas requiere políticas audaces de repoblación e inversión en infraestructuras.",
    text_fr: "Le phénomène de l''Espagne vide' est un défi démographique majeur. Alors que les villes saturent, de vastes régions souffrent d'un exode rural alarmant. Revitaliser ces zones nécessite des politiques audacieuses de repeuplement et d'investissement dans les infrastructures.",
    difficulty: "Expert (C1)"
  },
  {
    id: 504,
    level: "C1",
    title_es: "Don Quijote",
    title_fr: "Don Quichotte",
    text_es: "Don Quijote no es solo una sátira, sino un estudio profundo de la naturaleza humana. La dicotomía entre el idealismo de Quijote y el pragmatismo de Sancho refleja la eterna lucha entre nuestros sueños y la cruda realidad que nos rodea.",
    text_fr: "Don Quichotte n'est pas seulement une satire, mais une étude profonde de la nature humaine. La dichotomie entre l'idéalisme de Quichotte et le pragmatisme de Sancho reflète la lutte éternelle entre nos rêves et la crue réalité qui nous entoure.",
    difficulty: "Expert (C1)"
  },
  {
    id: 505,
    level: "C1",
    title_es: "El Flamenco",
    title_fr: "Le Flamenco",
    text_es: "El flamenco es una expresión visceral de dolor y alegría. Declarado Patrimonio de la Humanidad, trasciende la música para convertirse en un lenguaje del alma. Su complejidad rítmica y emocional requiere una vida entera para ser dominada.",
    text_fr: "Le flamenco est une expression viscérale de douleur et de joie. Déclaré Patrimoine de l'Humanité, il transcende la musique pour devenir un langage de l'âme. Sa complexité rythmique et émotionnelle nécessite une vie entière pour être maîtrisée.",
    difficulty: "Expert (C1)"
  },
  {
    id: 506,
    level: "C1",
    title_es: "La Transición",
    title_fr: "La Transition",
    text_es: "La Transición española fue un proceso político complejo que permitió el paso de una dictadura a una democracia. Fue un periodo de consenso y tensión, clave para entender la España contemporánea y sus desafíos actuales.",
    text_fr: "La Transition espagnole fut un processus politique complexe qui permit le passage d'une dictature à une démocratie. Ce fut une période de consensus et de tension, clé pour comprendre l'Espagne contemporaine et ses défis actuels.",
    difficulty: "Expert (C1)"
  },
  {
    id: 507,
    level: "C1",
    title_es: "El Surrealismo",
    title_fr: "Le Surréalisme",
    text_es: "El surrealismo de Dalí desafió la lógica racional para explorar el subconsciente. Sus obras oníricas y perturbadoras nos invitan a cuestionar la realidad percibida. Este movimiento artístico revolucionó la forma en que interpretamos los sueños y el deseo.",
    text_fr: "Le surréalisme de Dalí a défié la logique rationnelle pour explorer le subconscient. Ses œuvres oniriques et perturbantes nous invitent à questionner la réalité perçue. Ce mouvement artistique a révolutionné la façon dont nous interprétons les rêves et le désir.",
    difficulty: "Expert (C1)"
  }
];