/* eslint-disable */
// @ts-nocheck

/* =======================================================================================
   🧠 CONTENT FACTORY : DONNÉES ET LOGIQUE PÉDAGOGIQUE
   ======================================================================================= */

export const DATA_BANK = {
  verbs: [
    // --- NIVEAU A1/A2 (Vie quotidienne) ---
    { es: "Comer", en: "Manger", yo: "Como", tu: "Comes", el: "Come", nos: "Comemos", vos: "Coméis", ellos: "Comen" },
    { es: "Vivir", en: "Vivre", yo: "Vivo", tu: "Vives", el: "Vive", nos: "Vivimos", vos: "Vivís", ellos: "Viven" },
    { es: "Beber", en: "Boire", yo: "Bebo", tu: "Bebes", el: "Bebe", nos: "Bebemos", vos: "Bebéis", ellos: "Beben" },
    { es: "Leer", en: "Lire", yo: "Leo", tu: "Lees", el: "Lee", nos: "Leemos", vos: "Leéis", ellos: "Leen" },
    { es: "Escribir", en: "Écrire", yo: "Escribo", tu: "Escribes", el: "Escribe", nos: "Escribimos", vos: "Escribís", ellos: "Escriben" },
    { es: "Correr", en: "Courir", yo: "Corro", tu: "Corres", el: "Corre", nos: "Corremos", vos: "Corréis", ellos: "Corren" },
    { es: "Caminar", en: "Marcher", yo: "Camino", tu: "Caminas", el: "Camina", nos: "Caminamos", vos: "Camináis", ellos: "Caminan" },
    { es: "Dormir", en: "Dormir", yo: "Duermo", tu: "Duermes", el: "Duerme", nos: "Dormimos", vos: "Dormís", ellos: "Duermen" },
    { es: "Jugar", en: "Jouer", yo: "Juego", tu: "Juegas", el: "Juega", nos: "Jugamos", vos: "Jugáis", ellos: "Juegan" },
    { es: "Escuchar", en: "Écouter", yo: "Escucho", tu: "Escuchas", el: "Escucha", nos: "Escuchamos", vos: "Escucháis", ellos: "Escuchan" },
    { es: "Mirar", en: "Regarder", yo: "Miro", tu: "Miras", el: "Mira", nos: "Miramos", vos: "Miráis", ellos: "Miran" },
    { es: "Amar", en: "Aimer", yo: "Amo", tu: "Amas", el: "Ama", nos: "Amamos", vos: "Amáis", ellos: "Aman" },
    { es: "Viajar", en: "Voyager", yo: "Viajo", tu: "Viajas", el: "Viaja", nos: "Viajamos", vos: "Viajáis", ellos: "Viajan" },
    { es: "Trabajar", en: "Travailler", yo: "Trabajo", tu: "Trabajas", el: "Trabaja", nos: "Trabajamos", vos: "Trabajáis", ellos: "Trabajan" },
    { es: "Estudiar", en: "Étudier", yo: "Estudio", tu: "Estudias", el: "Estudia", nos: "Estudiamos", vos: "Estudiáis", ellos: "Estudian" },
    { es: "Comprar", en: "Acheter", yo: "Compro", tu: "Compras", el: "Compra", nos: "Compramos", vos: "Compráis", ellos: "Compran" },
    
    // --- NIVEAU B1/B2 ---
    { es: "Pensar", en: "Penser", yo: "Pienso", tu: "Piensas", el: "Piensa", nos: "Pensamos", vos: "Pensáis", ellos: "Piensan" },
    { es: "Creer", en: "Croire", yo: "Creo", tu: "Crees", el: "Cree", nos: "Creemos", vos: "Creéis", ellos: "Creen" },
    { es: "Sentir", en: "Sentir", yo: "Siento", tu: "Sientes", el: "Siente", nos: "Sentimos", vos: "Sentís", ellos: "Sienten" },
    { es: "Pedir", en: "Demander", yo: "Pido", tu: "Pides", el: "Pide", nos: "Pedimos", vos: "Pedís", ellos: "Piden" },
    { es: "Entender", en: "Comprendre", yo: "Entiendo", tu: "Entiendes", el: "Entiende", nos: "Entendemos", vos: "Entendéis", ellos: "Entienden" },
    { es: "Recordar", en: "Se souvenir", yo: "Recuerdo", tu: "Recuerdas", el: "Recuerda", nos: "Recordamos", vos: "Recordáis", ellos: "Recuerdan" },
    { es: "Conseguir", en: "Obtenir", yo: "Consigo", tu: "Consigues", el: "Consigue", nos: "Conseguimos", vos: "Conseguís", ellos: "Consiguen" },
    { es: "Elegir", en: "Choisir", yo: "Elijo", tu: "Eliges", el: "Elige", nos: "Elegimos", vos: "Elegís", ellos: "Eligen" },
    
    // --- NIVEAU C1 ---
    { es: "Analizar", en: "Analyser", yo: "Analizo", tu: "Analizas", el: "Analiza", nos: "Analizamos", vos: "Analizáis", ellos: "Analizan" },
    { es: "Debatir", en: "Débattre", yo: "Debato", tu: "Debates", el: "Debate", nos: "Debatimos", vos: "Debatís", ellos: "Debaten" },
    { es: "Influir", en: "Influencer", yo: "Influyo", tu: "Influyes", el: "Influye", nos: "Influimos", vos: "Influís", ellos: "Influyen" },
    { es: "Deducir", en: "Déduire", yo: "Deduzco", tu: "Deduces", el: "Deduce", nos: "Deducimos", vos: "Deducís", ellos: "Deducen" },
    { es: "Suponer", en: "Supposer", yo: "Supongo", tu: "Supones", el: "Supone", nos: "Suponemos", vos: "Suponéis", ellos: "Suponen" },
    { es: "Convencer", en: "Convaincre", yo: "Convenzo", tu: "Convences", el: "Convence", nos: "Convencemos", vos: "Convencéis", ellos: "Convencen" },
    { es: "Prever", en: "Prévoir", yo: "Preveo", tu: "Prever", el: "Prevé", nos: "Prevemos", vos: "Prevéis", ellos: "Prevén" },
    { es: "Exigir", en: "Exiger", yo: "Exijo", tu: "Exiges", el: "Exige", nos: "Exigimos", vos: "Exigís", ellos: "Exigen" }
  ],

  nouns: [
    { es: "El libro", en: "Le livre" }, { es: "La casa", en: "La maison" },
    { es: "El coche", en: "La voiture" }, { es: "La ciudad", en: "La ville" },
    { es: "El amigo", en: "L'ami" }, { es: "La playa", en: "La plage" },
    { es: "El tiempo", en: "Le temps" }, { es: "El trabajo", en: "Le travail" },
    { es: "La comida", en: "La nourriture" }, { es: "El dinero", en: "L'argent" },
    { es: "El mundo", en: "Le monde" }, { es: "La música", en: "La musique" },
    { es: "La familia", en: "La famille" }, { es: "El agua", en: "L'eau" },
    { es: "La escuela", en: "L'école" }, { es: "El sol", en: "Le soleil" },
    { es: "La noche", en: "La nuit" }, { es: "El problema", en: "Le problème" },
    { es: "El gobierno", en: "Le gouvernement" }, { es: "La salud", en: "La santé" },
    { es: "La empresa", en: "L'entreprise" }, { es: "El éxito", en: "Le succès" },
    { es: "La guerra", en: "La guerre" }, { es: "La paz", en: "La paix" },
    { es: "El medio ambiente", en: "L'environnement" }, { es: "La tecnología", en: "La technologie" },
    { es: "La libertad", en: "La liberté" }, { es: "El derecho", en: "Le droit" },
    { es: "La cultura", en: "La culture" }, { es: "El futuro", en: "L'avenir" },
    { es: "La duda", en: "Le doute" }, { es: "La razón", en: "La raison" },
    { es: "La paradoja", en: "Le paradoxe" }, { es: "El matiz", en: "La nuance" },
    { es: "La hipótesis", en: "L'hypothèse" }, { es: "La ironía", en: "L'ironie" },
    { es: "El fenómeno", en: "Le phénomène" }, { es: "La tendencia", en: "La tendance" },
    { es: "La controversia", en: "La controverse" }, { es: "La perspectiva", en: "La perspective" },
    { es: "El contexto", en: "Le contexte" }, { es: "La infraestructura", en: "L'infrastructure" },
    { es: "La diversidad", en: "La diversité" }, { es: "El paradigma", en: "Le paradigme" }
  ],

  adjectives: [
    { es: "Grande", en: "Grand" }, { es: "Pequeño", en: "Petit" },
    { es: "Bueno", en: "Bon" }, { es: "Malo", en: "Mauvais" },
    { es: "Nuevo", en: "Nouveau" }, { es: "Viejo", en: "Vieux" },
    { es: "Rápido", en: "Rapide" }, { es: "Lento", en: "Lent" },
    { es: "Feliz", en: "Heureux" }, { es: "Triste", en: "Triste" },
    { es: "Fácil", en: "Facile" }, { es: "Difícil", en: "Difficile" },
    { es: "Interesante", en: "Intéressant" }, { es: "Importante", en: "Important" },
    { es: "Peligroso", en: "Dangereux" }, { es: "Seguro", en: "Sûr" },
    { es: "Sostenible", en: "Durable" }, { es: "Justo", en: "Juste" },
    { es: "Necesario", en: "Nécessaire" }, { es: "Posible", en: "Possible" },
    { es: "Inevitable", en: "Inévitable" }, { es: "Eficaz", en: "Efficace" },
    { es: "Subjetivo", en: "Subjectif" }, { es: "Ambiguo", en: "Ambigu" },
    { es: "Sutil", en: "Subtil" }, { es: "Efímero", en: "Éphémère" },
    { es: "Trascendental", en: "Transcendantal" }, { es: "Polémico", en: "Polémique" }
  ],

  connectors: [
    { es: "Pero", en: "Mais" }, { es: "Y", en: "Et" }, { es: "O", en: "Ou" },
    { es: "Porque", en: "Parce que" }, { es: "Cuando", en: "Quand" },
    { es: "Si", en: "Si" }, { es: "También", en: "Aussi" },
    { es: "Aunque", en: "Bien que" }, { es: "Sin embargo", en: "Cependant" },
    { es: "Por lo tanto", en: "Par conséquent" }, { es: "Además", en: "De plus" },
    { es: "En cambio", en: "En revanche" }, { es: "Por eso", en: "C'est pour ça que" },
    { es: "No obstante", en: "Néanmoins" }, { es: "Por el contrario", en: "Au contraire" },
    { es: "En consecuencia", en: "En conséquence" }, { es: "A pesar de", en: "Malgré" },
    { es: "Dado que", en: "Étant donné que" }, { es: "A fin de que", en: "Afin que" }
  ],

  tips: [
    "En espagnol, le 'H' est toujours muet ! (Hola = Ola)",
    "Les points d'interrogation se mettent aussi au début : ¿ ?",
    "Le 'V' se prononce presque comme un 'B' doux.",
    "Le 'RR' roulé est typique : mets ta langue sur le palais.",
    "Le 'LL' se prononce comme un 'Y' (Paella = Pa-é-ya).",
    "Por = Cause (pour) / Para = But (pour). C'est le piège classique !",
    "Ser = Identité permanente / Estar = État temporaire.",
    "Les adjectifs se placent généralement APRES le nom.",
    "Le sujet (Yo, Tú) est souvent omis car le verbe suffit.",
    "Gustar s'accorde avec ce qu'on aime, pas avec la personne !",
    "En Espagne, on mange tard : déjeuner à 14h, dîner à 21h !",
    "Le tutoiement (Tuteo) est très fréquent, même avec des inconnus.",
    "En Amérique Latine, 'Vosotros' n'existe pas, on utilise 'Ustedes'.",
    "La 'Siesta' est un cliché, mais la pause de 14h à 16h est réelle.",
    "Il y a 4 langues officielles en Espagne (Castillan, Catalan, Basque, Galicien)."
  ]
};

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

export const CONTENT_PART_1 = {
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
  
  // --- A2 ---
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
  // ... Les autres leçons manuelles 31-60 ...
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
  // ... (Leçons 61-100) ...
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
  100: [
    { id: 10001, type: "structure", title: "MAÎTRISE C1", formula: "Félicitations !", example: "¡Lo lograste!", note: "Tu parles couramment." },
    { id: 10002, type: "swipe", es: "Bilingüe", en: "Bilingue", context: "Nivel experto" },
    { id: 10003, type: "swipe", es: "Nativo", en: "Natif", context: "Como un español" },
    { id: 10004, type: "swipe", es: "Orgulloso", en: "Fier", context: "Estoy orgulloso de ti" },
    { id: 10005, type: "input", question: "Je suis bilingue", answer: ["soy bilingüe"], hint: "Soy..." }
  ]
};

export const generateStructuredLesson = (id) => {
  let level = "A1";
  let config = { topic: "Thème Général", grammar: "Grammaire" };

  if (id <= 20) { level = "A1"; config = CURRICULUM_LOGIC.A1[id - 1] || { topic: "Révision", grammar: "Mix" }; }
  else if (id <= 40) { level = "A2"; config = CURRICULUM_LOGIC.A2[id - 21] || { topic: "Avancé A2", grammar: "Mix" }; }
  else if (id <= 60) { level = "B1"; config = CURRICULUM_LOGIC.B1[id - 41] || { topic: "Expert B1", grammar: "Mix" }; }
  else if (id <= 80) { level = "B2"; config = CURRICULUM_LOGIC.B2[id - 61] || { topic: "Révision B2", grammar: "Mix" }; }
  else { level = "C1"; config = CURRICULUM_LOGIC.C1[id - 81] || { topic: "Perfectionnement C1", grammar: "Expert" }; }

  const verbsCount = DATA_BANK.verbs.length;
  const verbIdx = id % verbsCount;
  const isPluralCycle = Math.floor(id / verbsCount) % 2 !== 0; 

  const randVerb = DATA_BANK.verbs[verbIdx];
  const randNoun = DATA_BANK.nouns[id % DATA_BANK.nouns.length];
  const randNoun2 = DATA_BANK.nouns[(id + 5) % DATA_BANK.nouns.length];
  const randAdj = DATA_BANK.adjectives[id % DATA_BANK.adjectives.length];
  const randConn = DATA_BANK.connectors[id % DATA_BANK.connectors.length];
  
  const tipIdx = id % DATA_BANK.tips.length;
  const randTip = DATA_BANK.tips[tipIdx];

  let cardId = id * 1000;

  const grammarTitle = isPluralCycle ? `Verbe : ${randVerb.es} (Pluriel)` : `Verbe : ${randVerb.es} (Singulier)`;
  const grammarDesc = isPluralCycle ? "Nous / Vous / Ils" : "Je / Tu / Il";
  
  const grammarConjugation = isPluralCycle 
    ? [
        { pronoun: "Nosotros", verb: randVerb.nos, fr: `Nous ${randVerb.en.toLowerCase()}ons` },
        { pronoun: "Vosotros", verb: randVerb.vos, fr: `Vous ${randVerb.en.toLowerCase()}ez` },
        { pronoun: "Ellos", verb: randVerb.ellos, fr: `Ils ${randVerb.en.toLowerCase()}ent` }
      ]
    : [
        { pronoun: "Yo", verb: randVerb.yo, fr: `Je ${randVerb.en.toLowerCase()}` },
        { pronoun: "Tú", verb: randVerb.tu, fr: `Tu ${randVerb.en.toLowerCase()}s` },
        { pronoun: "Él/Ella", verb: randVerb.el, fr: `Il/Elle ${randVerb.en.toLowerCase()}` }
      ];

  const exerciseQuestion = isPluralCycle ? `Vous ${randVerb.en.toLowerCase()}ez` : `Il ${randVerb.en.toLowerCase()}`;
  const exerciseAnswer = isPluralCycle ? [randVerb.vos.toLowerCase()] : [randVerb.el.toLowerCase()];

  return [
    { id: cardId++, type: "structure", title: `Leçon ${id} : ${config.topic}`, formula: config.grammar, example: `Focus : ${randVerb.es}`, note: `Niveau ${level}` },
    { id: cardId++, type: "swipe", es: randNoun.es, en: randNoun.en, context: "Mot clé" },
    { id: cardId++, type: "grammar", title: grammarTitle, description: grammarDesc, conjugation: grammarConjugation },
    { id: cardId++, type: "input", question: exerciseQuestion, answer: exerciseAnswer, hint: `Verbe ${randVerb.es}` },
    { id: cardId++, type: "swipe", es: randAdj.es, en: randAdj.en, context: "Description" },
    { id: cardId++, type: "structure", title: "L'accord", formula: "Nom + Adjectif", example: `${randNoun.es} ${randAdj.es.toLowerCase()}`, note: "L'adjectif s'accorde." },
    { id: cardId++, type: "swipe", es: randNoun2.es, en: randNoun2.en, context: "Bonus" },
    { id: cardId++, type: "swipe", es: randConn.es, en: randConn.en, context: "Liaison" },
    { id: cardId++, type: "structure", title: "Astuce Pro 💡", formula: "Culture & Langue", example: randTip, note: "Bon à savoir !" },
    { 
      id: cardId++, 
      type: "structure", 
      title: "Phrase Complète", 
      formula: "Sujet + Verbe + Complément", 
      example: isPluralCycle 
        ? `Vosotros ${randVerb.vos.toLowerCase()} ${randNoun.es.toLowerCase()}`
        : `Él ${randVerb.el.toLowerCase()} ${randNoun.es.toLowerCase()}`,
      note: "Répète à voix haute." 
    },
    { id: cardId++, type: "input", question: `Traduis '${randNoun.en}'`, answer: [randNoun.es.toLowerCase()], hint: `${randNoun.es.substring(0,3)}...` }
  ];
};



export const INITIAL_LESSONS_CONTENT = generateAllContent();



export const generateSmartTest = (completedLessons, userVocab) => {
  const questions = [];
  let qId = 9900;

  if (userVocab && userVocab.length > 0) {
     const target = userVocab.filter(v => v.type === 'swipe').sort(() => 0.5 - Math.random()).slice(0, 5);
     target.forEach(w => questions.push({
         id: qId++, type: 'input', question: `Traduis '${w.en}' en espagnol`, answer: [w.es.toLowerCase()], hint: w.es.substring(0,1)+"..." 
     }));
  }

  if (completedLessons.includes(1)) questions.push({ id: qId++, type: 'input', question: "Je suis (Ser)", answer: ["soy"], hint: "S..." });
  if (completedLessons.includes(2)) questions.push({ id: qId++, type: 'input', question: "Tu as (Tener)", answer: ["tienes"], hint: "T..." });
  if (completedLessons.includes(3)) questions.push({ id: qId++, type: 'input', question: "Négation : Je ne parle pas", answer: ["no hablo"], hint: "No..." });
  if (completedLessons.includes(5)) questions.push({ id: qId++, type: 'input', question: "Futur : Je vais manger", answer: ["voy a comer"], hint: "Voy a..." });
  
  if (questions.length === 0) questions.push({ id: qId++, type: 'input', question: "Bonjour", answer: ["hola"], hint: "H..." });
  
  return questions.sort(() => 0.5 - Math.random());
};

export const INITIAL_LESSONS_LIST = [];
let idCounter = 1;
const levels = ["A1", "A2", "B1", "B2", "C1"];
levels.forEach(lvl => {
    for(let i=0; i<20; i++) {
        let topic = "Pratique";
        if (lvl === "A1" && CURRICULUM_LOGIC.A1[i]) topic = CURRICULUM_LOGIC.A1[i].topic;
        if (lvl === "A2" && CURRICULUM_LOGIC.A2[i]) topic = CURRICULUM_LOGIC.A2[i].topic;
        if (lvl === "B1" && CURRICULUM_LOGIC.B1[i]) topic = CURRICULUM_LOGIC.B1[i].topic;
        if (lvl === "B2" && CURRICULUM_LOGIC.B2[i]) topic = CURRICULUM_LOGIC.B2[i].topic;
        if (lvl === "C1" && CURRICULUM_LOGIC.C1[i]) topic = CURRICULUM_LOGIC.C1[i].topic;
        INITIAL_LESSONS_LIST.push({ id: idCounter++, title: topic, level: lvl, desc: "Cours complet" });
    }
});

export const SENTENCE_STRUCTURES = [
  { id: 1, title: "La Phrase Simple", formula: "Sujet + Verbe", example_es: "(Yo) como.", example_en: "Je mange.", explanation: "Sujet souvent omis." },
  { id: 2, title: "Négation", formula: "No + Verbe", example_es: "No hablo.", example_en: "Je ne parle pas.", explanation: "Simple 'No' devant." },
  { id: 3, title: "Le Futur Proche", formula: "Ir + a + Infinitif", example_es: "Voy a comer.", example_en: "Je vais manger.", explanation: "Très courant à l'oral." }
];
// On s'assure que la fonction est bien définie avant de l'utiliser
export const generateAllContent = () => {
  const content = { ...CONTENT_PART_1 };
  for (let i = 3; i <= 100; i++) {
     if (!content[i]) {
        // Appel direct de la fonction définie plus haut dans le même fichier
        content[i] = generateStructuredLesson(i);
     }
  }
  return content;
};