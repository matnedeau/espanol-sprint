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

export const DATA_BANK = {
  verbs: [
    { levels: ["A1"], es: "Ser", en: "Être (Identité)", conjugation: [{ pronoun: "Yo", verb: "soy", fr: "Je suis" }, { pronoun: "Tú", verb: "eres", fr: "Tu es" }, { pronoun: "Él", verb: "es", fr: "Il est" }, { pronoun: "Nosotros", verb: "somos", fr: "Nous sommes" }, { pronoun: "Vosotros", verb: "sois", fr: "Vous êtes" }, { pronoun: "Ellos", verb: "son", fr: "Ils sont" }] },
    { levels: ["A1"], es: "Estar", en: "Être (État)", conjugation: [{ pronoun: "Yo", verb: "estoy", fr: "Je suis" }, { pronoun: "Tú", verb: "estás", fr: "Tu es" }, { pronoun: "Él", verb: "está", fr: "Il est" }, { pronoun: "Nosotros", verb: "estamos", fr: "Nous sommes" }, { pronoun: "Vosotros", verb: "estáis", fr: "Vous êtes" }, { pronoun: "Ellos", verb: "están", fr: "Ils sont" }] },
    { levels: ["A1", "A2"], es: "Tener", en: "Avoir", conjugation: [{ pronoun: "Yo", verb: "tengo", fr: "J'ai" }, { pronoun: "Tú", verb: "tienes", fr: "Tu as" }, { pronoun: "Él", verb: "tiene", fr: "Il a" }, { pronoun: "Nosotros", verb: "tenemos", fr: "Nous avons" }, { pronoun: "Vosotros", verb: "tenéis", fr: "Vous avez" }, { pronoun: "Ellos", verb: "tienen", fr: "Ils ont" }] },
    { levels: ["A1", "A2"], es: "Hacer", en: "Faire", conjugation: [{ pronoun: "Yo", verb: "hago", fr: "Je fais" }, { pronoun: "Tú", verb: "haces", fr: "Tu fais" }, { pronoun: "Él", verb: "hace", fr: "Il fait" }, { pronoun: "Nosotros", verb: "hacemos", fr: "Nous faisons" }, { pronoun: "Vosotros", verb: "hacéis", fr: "Vous faites" }, { pronoun: "Ellos", verb: "hacen", fr: "Ils font" }] },
    { levels: ["A1", "A2"], es: "Ir", en: "Aller", conjugation: [{ pronoun: "Yo", verb: "voy", fr: "Je vais" }, { pronoun: "Tú", verb: "vas", fr: "Tu vas" }, { pronoun: "Él", verb: "va", fr: "Il va" }, { pronoun: "Nosotros", verb: "vamos", fr: "Nous allons" }, { pronoun: "Vosotros", verb: "vais", fr: "Vous allez" }, { pronoun: "Ellos", verb: "van", fr: "Ils vont" }] },
    { levels: ["A2"], es: "Deber", en: "Devoir", conjugation: [{ pronoun: "Yo", verb: "debo", fr: "Je dois" }, { pronoun: "Tú", verb: "debes", fr: "Tu dois" }, { pronoun: "Él", verb: "debe", fr: "Il doit" }, { pronoun: "Nosotros", verb: "debemos", fr: "Nous devons" }, { pronoun: "Vosotros", verb: "debéis", fr: "Vous devez" }, { pronoun: "Ellos", verb: "deben", fr: "Ils doivent" }] },
    { levels: ["A2"], es: "Poder", en: "Pouvoir", conjugation: [{ pronoun: "Yo", verb: "puedo", fr: "Je peux" }, { pronoun: "Tú", verb: "puedes", fr: "Tu peux" }, { pronoun: "Él", verb: "puede", fr: "Il peut" }, { pronoun: "Nosotros", verb: "podemos", fr: "Nous pouvons" }, { pronoun: "Vosotros", verb: "podéis", fr: "Vous pouvez" }, { pronoun: "Ellos", verb: "pueden", fr: "Ils peuvent" }] },
    { levels: ["A2"], es: "Querer", en: "Vouloir", conjugation: [{ pronoun: "Yo", verb: "quiero", fr: "Je veux" }, { pronoun: "Tú", verb: "quieres", fr: "Tu veux" }, { pronoun: "Él", verb: "quiere", fr: "Il veut" }, { pronoun: "Nosotros", verb: "queremos", fr: "Nous voulons" }, { pronoun: "Vosotros", verb: "queréis", fr: "Vous voulez" }, { pronoun: "Ellos", verb: "quieren", fr: "Ils veulent" }] },
    { levels: ["B1"], es: "Creer", en: "Croire", conjugation: [{ pronoun: "Yo", verb: "creo", fr: "Je crois" }, { pronoun: "Tú", verb: "crees", fr: "Tu crois" }, { pronoun: "Él", verb: "cree", fr: "Il croit" }, { pronoun: "Nosotros", verb: "creemos", fr: "Nous croyons" }, { pronoun: "Vosotros", verb: "creéis", fr: "Vous croyez" }, { pronoun: "Ellos", verb: "creen", fr: "Ils croient" }] },
    { levels: ["B1"], es: "Pensar", en: "Penser", conjugation: [{ pronoun: "Yo", verb: "pienso", fr: "Je pense" }, { pronoun: "Tú", verb: "piensas", fr: "Tu penses" }, { pronoun: "Él", verb: "piensa", fr: "Il pense" }, { pronoun: "Nosotros", verb: "pensamos", fr: "Nous pensons" }, { pronoun: "Vosotros", verb: "pensáis", fr: "Vous pensez" }, { pronoun: "Ellos", verb: "piensan", fr: "Ils pensent" }] },
  ],

  nouns: {
    home: [
      { levels: ["A1"], es: "La mesa", en: "La table", sentence: "La cena está en la mesa.", sentence_trans: "Le dîner est sur la table." },
      { levels: ["A1"], es: "La silla", en: "La chaise", sentence: "Esta silla es cómoda.", sentence_trans: "Cette chaise est confortable." },
      { levels: ["A1"], es: "La cama", en: "Le lit", sentence: "Hago mi cama cada mañana.", sentence_trans: "Je fais mon lit chaque matin." },
      { levels: ["A1"], es: "La puerta", en: "La porte", sentence: "Cierra la puerta, por favor.", sentence_trans: "Ferme la porte, s'il te plaît." },
      { levels: ["A1"], es: "La ventana", en: "La fenêtre", sentence: "Abre la ventana.", sentence_trans: "Ouvre la fenêtre." },
      { levels: ["A2"], es: "El sofá", en: "Le canapé", sentence: "El sofá es nuevo.", sentence_trans: "Le canapé est neuf." },
      { levels: ["A2"], es: "La lámpara", en: "La lampe", sentence: "Enciende la lámpara.", sentence_trans: "Allume la lampe." },
      { levels: ["A2"], es: "El espejo", en: "Le miroir", sentence: "El espejo está roto.", sentence_trans: "Le miroir est cassé." },
      { levels: ["A2"], es: "La cocina", en: "La cuisine", sentence: "Mi cocina es pequeña.", sentence_trans: "Ma cuisine est petite." },
      { levels: ["B1"], es: "El techo", en: "Le plafond", sentence: "El techo es alto.", sentence_trans: "Le plafond est haut." }
    ],
    city: [
      { levels: ["A1"], es: "La calle", en: "La rue", sentence: "Vivo en esta calle.", sentence_trans: "J'habite dans cette rue." },
      { levels: ["A1"], es: "La plaza", en: "La place", sentence: "Nos vemos en la plaza.", sentence_trans: "On se voit sur la place." },
      { levels: ["A1"], es: "El parque", en: "Le parc", sentence: "Corro en el parque.", sentence_trans: "Je cours dans le parc." },
      { levels: ["A1"], es: "La escuela", en: "L'école", sentence: "Los niños van a la escuela.", sentence_trans: "Les enfants vont à l'école." },
      { levels: ["A2"], es: "El mercado", en: "Le marché", sentence: "Compro fruta en el mercado.", sentence_trans: "J'achète des fruits au marché." },
      { levels: ["A2"], es: "El hospital", en: "L'hôpital", sentence: "El hospital está cerca.", sentence_trans: "L'hôpital est proche." },
      { levels: ["A2"], es: "La estación", en: "La gare", sentence: "El tren llega a la estación.", sentence_trans: "Le train arrive à la gare." },
      { levels: ["B1"], es: "El puente", en: "Le pont", sentence: "Cruzamos el puente.", sentence_trans: "Nous traversons le pont." },
      { levels: ["B1"], es: "El edificio", en: "Le bâtiment", sentence: "Es un edificio moderno.", sentence_trans: "C'est un bâtiment moderne." }
    ],
    travel: [
      { levels: ["A1"], es: "El coche", en: "La voiture", sentence: "Tengo un coche rojo.", sentence_trans: "J'ai une voiture rouge." },
      { levels: ["A1"], es: "El autobús", en: "Le bus", sentence: "El autobús llega tarde.", sentence_trans: "Le bus arrive en retard." },
      { levels: ["A2"], es: "El tren", en: "Le train", sentence: "Viajo en tren.", sentence_trans: "Je voyage en train." },
      { levels: ["A2"], es: "El avión", en: "L'avion", sentence: "El avión despega.", sentence_trans: "L'avion décolle." },
      { levels: ["A2"], es: "El billete", en: "Le billet", sentence: "Compré el billete online.", sentence_trans: "J'ai acheté le billet en ligne." },
      { levels: ["A2"], es: "La maleta", en: "La valise", sentence: "Hago mi maleta.", sentence_trans: "Je fais ma valise." },
      { levels: ["B1"], es: "El pasaporte", en: "Le passeport", sentence: "Olvidé mi pasaporte.", sentence_trans: "J'ai oublié mon passeport." },
      { levels: ["B1"], es: "El viaje", en: "Le voyage", sentence: "Fue un viaje largo.", sentence_trans: "C'était un long voyage." }
    ],
    tech: [
      { levels: ["A1"], es: "El móvil", en: "Le portable", sentence: "Mi móvil no tiene batería.", sentence_trans: "Mon portable n'a plus de batterie." },
      { levels: ["A1"], es: "La foto", en: "La photo", sentence: "Saco una foto.", sentence_trans: "Je prends une photo." },
      { levels: ["A2"], es: "El ordenador", en: "L'ordinateur", sentence: "Trabajo con el ordenador.", sentence_trans: "Je travaille avec l'ordinateur." },
      { levels: ["A2"], es: "La pantalla", en: "L'écran", sentence: "La pantalla es táctil.", sentence_trans: "L'écran est tactile." },
      { levels: ["A2"], es: "El mensaje", en: "Le message", sentence: "Te envié un mensaje.", sentence_trans: "Je t'ai envoyé un message." },
      { levels: ["B1"], es: "La red", en: "Le réseau", sentence: "La red está lenta.", sentence_trans: "Le réseau est lent." },
      { levels: ["B1"], es: "El archivo", en: "Le fichier", sentence: "Guarda el archivo.", sentence_trans: "Sauvegarde le fichier." }
    ],
    food_fruit: [
      { levels: ["A1"], es: "La manzana", en: "La pomme", sentence: "Como una manzana roja.", sentence_trans: "Je mange une pomme rouge." },
      { levels: ["A1"], es: "El plátano", en: "La banane", sentence: "El plátano es dulce.", sentence_trans: "La banane est sucrée." },
      { levels: ["A1"], es: "La naranja", en: "L'orange", sentence: "Bebo jugo de naranja.", sentence_trans: "Je bois du jus d'orange." },
      { levels: ["A2"], es: "La fresa", en: "La fraise", sentence: "Me gustan las fresas.", sentence_trans: "J'aime les fraises." },
      { levels: ["A2"], es: "El tomate", en: "La tomate", sentence: "El tomate es para la ensalada.", sentence_trans: "La tomate est pour la salade." },
      { levels: ["A2"], es: "La patata", en: "La pomme de terre", sentence: "Patatas fritas.", sentence_trans: "Pommes frites." }
    ],
    food_meal: [
      { levels: ["A1"], es: "El pan", en: "Le pain", sentence: "Pan con queso.", sentence_trans: "Pain au fromage." },
      { levels: ["A1"], es: "El agua", en: "L'eau", sentence: "Un vaso de agua.", sentence_trans: "Un verre d'eau." },
      { levels: ["A1"], es: "El café", en: "Le café", sentence: "Café con leche.", sentence_trans: "Café au lait." },
      { levels: ["A2"], es: "El queso", en: "Le fromage", sentence: "Queso manchego.", sentence_trans: "Fromage manchego." },
      { levels: ["A2"], es: "El pollo", en: "Le poulet", sentence: "Pollo asado.", sentence_trans: "Poulet rôti." },
      { levels: ["A2"], es: "El pescado", en: "Le poisson", sentence: "Pescado fresco.", sentence_trans: "Poisson frais." },
      { levels: ["B1"], es: "La cena", en: "Le dîner", sentence: "La cena está lista.", sentence_trans: "Le dîner est prêt." },
      { levels: ["B1"], es: "El desayuno", en: "Le petit-déjeuner", sentence: "Desayuno fuerte.", sentence_trans: "Petit-déjeuner copieux." }
    ],
    clothing: [
      { levels: ["A1"], es: "La ropa", en: "Les vêtements", sentence: "Compro ropa nueva.", sentence_trans: "J'achète des vêtements neufs." },
      { levels: ["A1"], es: "El zapato", en: "La chaussure", sentence: "Mis zapatos son negros.", sentence_trans: "Mes chaussures sont noires." },
      { levels: ["A2"], es: "La camisa", en: "La chemise", sentence: "Una camisa blanca.", sentence_trans: "Une chemise blanche." },
      { levels: ["A2"], es: "El pantalón", en: "Le pantalon", sentence: "El pantalón es largo.", sentence_trans: "Le pantalon est long." },
      { levels: ["A2"], es: "El abrigo", en: "Le manteau", sentence: "Hace frío, ponte el abrigo.", sentence_trans: "Il fait froid, mets ton manteau." },
      { levels: ["B1"], es: "El vestido", en: "La robe", sentence: "Un vestido elegante.", sentence_trans: "Une robe élégante." },
      { levels: ["B1"], es: "Las gafas", en: "Les lunettes", sentence: "Gafas de sol.", sentence_trans: "Lunettes de soleil." }
    ],
    nature: [
      { levels: ["A1"], es: "El sol", en: "Le soleil", sentence: "Hace sol.", sentence_trans: "Il fait soleil." },
      { levels: ["A1"], es: "El gato", en: "Le chat", sentence: "El gato maúlla.", sentence_trans: "Le chat miaule." },
      { levels: ["A1"], es: "El perro", en: "Le chien", sentence: "Mi perro corre.", sentence_trans: "Mon chien court." },
      { levels: ["A2"], es: "El árbol", en: "L'arbre", sentence: "El árbol es alto.", sentence_trans: "L'arbre est haut." },
      { levels: ["A2"], es: "La flor", en: "La fleur", sentence: "Una flor bonita.", sentence_trans: "Une jolie fleur." },
      { levels: ["A2"], es: "La playa", en: "La plage", sentence: "Arena de playa.", sentence_trans: "Sable de plage." },
      { levels: ["B1"], es: "El mar", en: "La mer", sentence: "Nado en el mar.", sentence_trans: "Je nage dans la mer." },
      { levels: ["B1"], es: "La montaña", en: "La montagne", sentence: "Aire de montaña.", sentence_trans: "Air de montagne." }
    ],
    job: [
      { levels: ["A2"], es: "El trabajo", en: "Le travail", sentence: "Busco trabajo.", sentence_trans: "Je cherche du travail." },
      { levels: ["A2"], es: "El jefe", en: "Le patron", sentence: "Mi jefe es bueno.", sentence_trans: "Mon patron est bon." },
      { levels: ["A2"], es: "La oficina", en: "Le bureau (lieu)", sentence: "Voy a la oficina.", sentence_trans: "Je vais au bureau." },
      { levels: ["B1"], es: "La empresa", en: "L'entreprise", sentence: "Una empresa grande.", sentence_trans: "Une grande entreprise." },
      { levels: ["B1"], es: "El cliente", en: "Le client", sentence: "Llamo al cliente.", sentence_trans: "J'appelle le client." },
      { levels: ["B1"], es: "El proyecto", en: "Le projet", sentence: "Nuevo proyecto.", sentence_trans: "Nouveau projet." },
      { levels: ["B2"], es: "La reunión", en: "La réunion", sentence: "Estamos en una reunión.", sentence_trans: "Nous sommes en réunion." }
    ],
    family: [
      { levels: ["A1"], es: "La madre", en: "La mère", sentence: "Amo a mi madre.", sentence_trans: "J'aime ma mère." },
      { levels: ["A1"], es: "El padre", en: "Le père", sentence: "Mi padre es fuerte.", sentence_trans: "Mon père est fort." },
      { levels: ["A1"], es: "El hermano", en: "Le frère", sentence: "Tengo un hermano.", sentence_trans: "J'ai un frère." },
      { levels: ["A1"], es: "La hermana", en: "La soeur", sentence: "Mi hermana lee.", sentence_trans: "Ma soeur lit." },
      { levels: ["A2"], es: "El abuelo", en: "Le grand-père", sentence: "Visito a mi abuelo.", sentence_trans: "Je rends visite à mon grand-père." },
      { levels: ["A2"], es: "El amigo", en: "L'ami", sentence: "Salgo con mi amigo.", sentence_trans: "Je sors avec mon ami." },
      { levels: ["B1"], es: "El vecino", en: "Le voisin", sentence: "Mi vecino saluda.", sentence_trans: "Mon voisin salue." }
    ],
    abstract: [
      { levels: ["A1"], es: "El nombre", en: "Le nom", sentence: "Mi nombre es Juan.", sentence_trans: "Mon nom est Juan." },
      { levels: ["A2"], es: "El tiempo", en: "Le temps", sentence: "Pasa el tiempo.", sentence_trans: "Le temps passe." },
      { levels: ["A2"], es: "La vida", en: "La vie", sentence: "La vida es bella.", sentence_trans: "La vie est belle." },
      { levels: ["B1"], es: "La verdad", en: "La vérité", sentence: "Dime la verdad.", sentence_trans: "Dis-moi la vérité." },
      { levels: ["B1"], es: "El miedo", en: "La peur", sentence: "No tengo miedo.", sentence_trans: "Je n'ai pas peur." },
      { levels: ["B1"], es: "La suerte", en: "La chance", sentence: "Buena suerte.", sentence_trans: "Bonne chance." }
    ],
    health: [
      { levels: ["A2"], es: "El cuerpo", en: "Le corps", sentence: "Mueve el cuerpo.", sentence_trans: "Bouge ton corps." },
      { levels: ["A2"], es: "La mano", en: "La main", sentence: "Dame la mano.", sentence_trans: "Donne-moi la main." },
      { levels: ["A2"], es: "El dolor", en: "La douleur", sentence: "Siento dolor.", sentence_trans: "Je ressens de la douleur." },
      { levels: ["B1"], es: "El médico", en: "Le médecin", sentence: "Cita con el médico.", sentence_trans: "Rendez-vous avec le médecin." },
      { levels: ["B1"], es: "La salud", en: "La santé", sentence: "Salud y amor.", sentence_trans: "Santé et amour." }
    ],
    school: [
      { levels: ["A1"], es: "El libro", en: "Le livre", sentence: "Leo un libro.", sentence_trans: "Je lis un livre." },
      { levels: ["A2"], es: "El papel", en: "Le papier", sentence: "Escribe en el papel.", sentence_trans: "Écris sur le papier." },
      { levels: ["A2"], es: "La palabra", en: "Le mot", sentence: "Una palabra nueva.", sentence_trans: "Un mot nouveau." },
      { levels: ["B1"], es: "El examen", en: "L'examen", sentence: "Tengo un examen.", sentence_trans: "J'ai un examen." },
      { levels: ["B1"], es: "La clase", en: "Le cours", sentence: "Empieza la clase.", sentence_trans: "Le cours commence." }
    ],
    society: [
      { levels: ["A2"], es: "El dinero", en: "L'argent", sentence: "No tengo dinero.", sentence_trans: "Je n'ai pas d'argent." },
      { levels: ["A2"], es: "La tarjeta", en: "La carte", sentence: "Pago con tarjeta.", sentence_trans: "Je paie par carte." },
      { levels: ["A2"], es: "El banco", en: "La banque", sentence: "Voy al banco.", sentence_trans: "Je vais à la banque." },
      { levels: ["B1"], es: "La ley", en: "La loi", sentence: "Respeto la ley.", sentence_trans: "Je respecte la loi." },
      { levels: ["B1"], es: "La policía", en: "La police", sentence: "Llama a la policía.", sentence_trans: "Appelle la police." }
    ],
    objects: [
      { levels: ["A1"], es: "El bolígrafo", en: "Le stylo", sentence: "Escribe con bolígrafo.", sentence_trans: "Écris au stylo." },
      { levels: ["A1"], es: "La mochila", en: "Le sac à dos", sentence: "Mi mochila pesa.", sentence_trans: "Mon sac à dos est lourd." },
      { levels: ["A2"], es: "La caja", en: "La boîte", sentence: "Abre la caja.", sentence_trans: "Ouvre la boîte." },
      { levels: ["A2"], es: "El regalo", en: "Le cadeau", sentence: "Es un regalo.", sentence_trans: "C'est un cadeau." }
    ],
    leisure: [
      { levels: ["A1"], es: "El juego", en: "Le jeu", sentence: "Es un juego.", sentence_trans: "C'est un jeu." },
      { levels: ["A2"], es: "La fiesta", en: "La fête", sentence: "Vamos a la fiesta.", sentence_trans: "Allons à la fête." },
      { levels: ["B1"], es: "El deporte", en: "Le sport", sentence: "Hago deporte.", sentence_trans: "Je fais du sport." }
    ]
  },

  adjectives: [
    { levels: ["A1"], es: "Grande", en: "Grand", sentence: "Es muy grande." },
    { levels: ["A1"], es: "Pequeño", en: "Petit", sentence: "Es demasiado pequeño." },
    { levels: ["A1"], es: "Bueno", en: "Bon", sentence: "Es un buen día." },
    { levels: ["A1"], es: "Nuevo", en: "Nouveau", sentence: "Es totalmente nuevo." },
    { levels: ["A2"], es: "Importante", en: "Important", sentence: "Es un tema importante." },
    { levels: ["A2"], es: "Feliz", en: "Heureux", sentence: "Soy muy feliz." },
    { levels: ["B1"], es: "Posible", en: "Possible", sentence: "Todo es posible." },
    { levels: ["B1"], es: "Rápido", en: "Rapide", sentence: "El coche es rápido." }
  ],

  connectors: [
    { es: "Y", en: "Et" },
    { es: "Pero", en: "Mais" },
    { es: "O", en: "Ou" },
    { es: "Porque", en: "Parce que" },
    { es: "Si", en: "Si" },
    { es: "Cuando", en: "Quand" }
  ],

  tips: [
    "Astuce : 'H' est toujours muet en espagnol.",
    "Astuce : Ser = permanent, Estar = temporaire.",
    "Astuce : Les adjectifs s'accordent en genre/nombre.",
    "Astuce : 'Hay' (il y a) est invariable.",
    "Astuce : On tutoie plus facilement en Espagne."
  ]
};

export const SENTENCE_STRUCTURES = [
  { id: 1, title: "La Phrase Simple", formula: "Sujet + Verbe", example_es: "(Yo) como.", example_en: "Je mange.", explanation: "Sujet souvent omis." },
  { id: 2, title: "La Négation", formula: "No + Verbe", example_es: "No hablo.", example_en: "Je ne parle pas.", explanation: "'No' se place avant le verbe." },
  { id: 3, title: "L'Accord", formula: "Nom + Adjectif", example_es: "Casa roja.", example_en: "Maison rouge.", explanation: "Accord en genre et nombre." },
  { id: 4, title: "Gustar", formula: "Me gusta...", example_es: "Me gusta el pan.", example_en: "J'aime le pain.", explanation: "Verbe spécial." },
  { id: 5, title: "Futur Proche", formula: "Ir a + Infinitif", example_es: "Voy a comer.", example_en: "Je vais manger.", explanation: "Pour le futur immédiat." }
];

export const DAILY_READINGS = [
  {
    "id": 101,
    "level": "A1",
    "title_es": "Mi Rutina Diaria",
    "title_fr": "Ma Routine Quotidienne",
    "text_es": "Me levanto a las siete de la mañana todos los días. Primero, me ducho con agua caliente y luego desayuno en la cocina. Como tostadas con mermelada y bebo café con leche. Después, me cepillo los dientes y salgo de casa para ir al trabajo muy contento.",
    "text_fr": "Je me lève à sept heures du matin tous les jours. D'abord, je me douche à l'eau chaude et ensuite je prends mon petit-déjeuner dans la cuisine. Je mange des tartines avec de la confiture et je bois du café au lait. Après, je me brosse les dents et je sors de la maison pour aller au travail très content.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 102,
    "level": "A1",
    "title_es": "Mi Perro Max",
    "title_fr": "Mon Chien Max",
    "text_es": "Mi perro se llama Max y es muy simpático. Es un perro pequeño de color marrón y blanco. Tiene las orejas grandes y el pelo suave. A Max le gusta mucho jugar con su pelota en el parque y dormir en mi cama por la noche.",
    "text_fr": "Mon chien s'appelle Max et il est très sympathique. C'est un petit chien de couleur marron et blanc. Il a de grandes oreilles et le poil doux. Max aime beaucoup jouer avec sa balle dans le parc et dormir dans mon lit la nuit.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 103,
    "level": "A1",
    "title_es": "La Clase de Español",
    "title_fr": "La Classe d'Espagnol",
    "text_es": "En mi clase de español hay diez estudiantes. Tenemos mesas azules y sillas cómodas. La profesora escribe las lecciones en la pizarra blanca. Hay un mapa de España en la pared. Nosotros escuchamos y escribimos en nuestros cuadernos. Es una clase muy interesante y aprendemos mucho.",
    "text_fr": "Dans ma classe d'espagnol, il y a dix étudiants. Nous avons des tables bleues et des chaises confortables. La professeure écrit les leçons sur le tableau blanc. Il y a une carte de l'Espagne sur le mur. Nous écoutons et écrivons dans nos cahiers. C'est une classe très intéressante et nous apprenons beaucoup.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 104,
    "level": "A1",
    "title_es": "El Desayuno Típico",
    "title_fr": "Le Petit-Déjeuner Typique",
    "text_es": "El desayuno es importante para mí. Normalmente tomo un café con leche y azúcar. También como pan con tomate y aceite de oliva, es muy típico. Los fines de semana, bebo zumo de naranja natural y como huevos. Me gusta desayunar despacio con mi familia.",
    "text_fr": "Le petit-déjeuner est important pour moi. Normalement, je prends un café au lait avec du sucre. Je mange aussi du pain avec de la tomate et de l'huile d'olive, c'est très typique. Les week-ends, je bois du jus d'orange frais et je mange des œufs. J'aime déjeuner doucement avec ma famille.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 105,
    "level": "A1",
    "title_es": "Mi Ciudad Favorita",
    "title_fr": "Ma Ville Préférée",
    "text_es": "Vivo en una ciudad pequeña cerca del mar. Mi ciudad es tranquila y bonita. Tiene calles antiguas y una plaza mayor con muchas flores. Hay tiendas y restaurantes buenos. Me gusta pasear por la playa por la tarde y ver el sol. Es un lugar perfecto.",
    "text_fr": "J'habite dans une petite ville près de la mer. Ma ville est calme et jolie. Elle a des rues anciennes et une grande place avec beaucoup de fleurs. Il y a des magasins et de bons restaurants. J'aime me promener sur la plage l'après-midi et voir le soleil. C'est un endroit parfait.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 106,
    "level": "A1",
    "title_es": "Mi Mejor Amigo",
    "title_fr": "Mon Meilleur Ami",
    "text_es": "Mi mejor amigo se llama Luis. Él tiene veinte años y es estudiante. Luis es alto, delgado y tiene el pelo corto y negro. Es una persona muy alegre y divertida. Siempre nos reímos mucho juntos. Le gusta la música y el cine de acción.",
    "text_fr": "Mon meilleur ami s'appelle Luis. Il a vingt ans et il est étudiant. Luis est grand, mince et a les cheveux courts et noirs. C'est une personne très joyeuse et drôle. Nous rions toujours beaucoup ensemble. Il aime la musique et le cinéma d'action.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 107,
    "level": "A1",
    "title_es": "Los Colores del Otoño",
    "title_fr": "Les Couleurs de l'Automne",
    "text_es": "En otoño, el tiempo cambia. Hace un poco de viento y llueve a veces. Los árboles cambian de color en el parque. Las hojas son rojas, naranjas y amarillas. Me gusta llevar jerséis grandes y beber té caliente en casa. Es una estación tranquila.",
    "text_fr": "En automne, le temps change. Il y a un peu de vent et il pleut parfois. Les arbres changent de couleur dans le parc. Les feuilles sont rouges, oranges et jaunes. J'aime porter de grands pulls et boire du thé chaud à la maison. C'est une saison calme.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 108,
    "level": "A1",
    "title_es": "Hacer la Maleta",
    "title_fr": "Faire la Valise",
    "text_es": "Hoy preparo mi maleta para el viaje. Voy de vacaciones a la montaña. Pongo pantalones cómodos, camisetas y unas botas fuertes. También necesito mi chaqueta azul porque hace frío por la noche. No olvido mi cepillo de dientes y un buen libro para leer.",
    "text_fr": "Aujourd'hui je prépare ma valise pour le voyage. Je vais en vacances à la montagne. Je mets des pantalons confortables, des t-shirts et des bottes solides. J'ai aussi besoin de ma veste bleue parce qu'il fait froid la nuit. Je n'oublie pas ma brosse à dents et un bon livre à lire.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 109,
    "level": "A1",
    "title_es": "El Mercado del Domingo",
    "title_fr": "Le Marché du Dimanche",
    "text_es": "Los domingos por la mañana voy al mercado. Es un lugar lleno de colores y olores. Compro frutas frescas como manzanas y peras. También compro queso y aceitunas. Hablo con los vendedores, son muy amables. Me gusta mucho el ambiente alegre del mercado.",
    "text_fr": "Les dimanches matin, je vais au marché. C'est un endroit plein de couleurs et d'odeurs. J'achète des fruits frais comme des pommes et des poires. J'achète aussi du fromage et des olives. Je parle avec les vendeurs, ils sont très gentils. J'aime beaucoup l'ambiance joyeuse du marché.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 110,
    "level": "A1",
    "title_es": "El Tenis",
    "title_fr": "Le Tennis",
    "text_es": "Mi deporte favorito es el tenis. Juego dos veces por semana en el club deportivo. Necesito una raqueta y pelotas amarillas. Corro mucho durante el partido y bebo mucha agua. Es un deporte difícil pero muy divertido. Me siento fuerte cuando juego.",
    "text_fr": "Mon sport préféré est le tennis. Je joue deux fois par semaine au club sportif. J'ai besoin d'une raquette et de balles jaunes. Je cours beaucoup pendant le match et je bois beaucoup d'eau. C'est un sport difficile mais très amusant. Je me sens fort quand je joue.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 111,
    "level": "A1",
    "title_es": "Carta a Mamá",
    "title_fr": "Lettre à Maman",
    "text_es": "Querida mamá, te escribo esta carta desde Madrid. Estoy muy contento aquí. Estudio mucho español y conozco gente nueva. La comida es deliciosa en los restaurantes. Te echo de menos y quiero verte pronto. Un beso muy grande de tu hijo que te quiere.",
    "text_fr": "Chère maman, je t'écris cette lettre depuis Madrid. Je suis très content ici. J'étudie beaucoup l'espagnol et je rencontre de nouvelles personnes. La nourriture est délicieuse dans les restaurants. Tu me manques et je veux te voir bientôt. Un très gros bisou de ton fils qui t'aime.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 112,
    "level": "A1",
    "title_es": "El Parque Central",
    "title_fr": "Le Parc Central",
    "text_es": "El parque central está en el centro de la ciudad. Es muy grande y verde. Hay muchos árboles altos y un lago pequeño con patos. La gente camina, lee o hace deporte. Los niños juegan en los columpios. Es mi lugar favorito para descansar.",
    "text_fr": "Le parc central est au centre de la ville. Il est très grand et vert. Il y a beaucoup de grands arbres et un petit lac avec des canards. Les gens marchent, lisent ou font du sport. Les enfants jouent sur les balançoires. C'est mon endroit préféré pour me reposer.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 113,
    "level": "A1",
    "title_es": "Mi Nueva Casa",
    "title_fr": "Ma Nouvelle Maison",
    "text_es": "Mi nueva casa es perfecta para mí. Tiene un salón luminoso con un sofá gris cómodo. La cocina es moderna y tiene una mesa redonda. Hay dos dormitorios y un baño azul. Tengo una terraza pequeña con plantas verdes. Estoy muy feliz en mi nuevo hogar.",
    "text_fr": "Ma nouvelle maison est parfaite pour moi. Elle a un salon lumineux avec un canapé gris confortable. La cuisine est moderne et a une table ronde. Il y a deux chambres et une salle de bain bleue. J'ai une petite terrasse avec des plantes vertes. Je suis très heureux dans mon nouveau foyer.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 114,
    "level": "A1",
    "title_es": "Frutas de Verano",
    "title_fr": "Fruits d'Été",
    "text_es": "En verano hace mucho calor. Me gusta comer fruta fresca. La sandía es mi favorita porque tiene mucha agua. También como melón y melocotones dulces. Compro la fruta en la frutería del barrio. Es el mejor postre para los días de mucho sol.",
    "text_fr": "En été, il fait très chaud. J'aime manger des fruits frais. La pastèque est ma favorite car elle a beaucoup d'eau. Je mange aussi du melon et des pêches sucrées. J'achète les fruits chez le primeur du quartier. C'est le meilleur dessert pour les jours de grand soleil.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 115,
    "level": "A1",
    "title_es": "En el Autobús",
    "title_fr": "Dans le Bus",
    "text_es": "Para ir a la universidad, tomo el autobús número cinco. Espero en la parada cinco minutos. Cuando llega el autobús, subo y pago el billete al conductor. Me siento cerca de la ventana y miro la calle. El viaje dura veinte minutos.",
    "text_fr": "Pour aller à l'université, je prends le bus numéro cinq. J'attends à l'arrêt cinq minutes. Quand le bus arrive, je monte et je paie le billet au chauffeur. Je m'assois près de la fenêtre et je regarde la rue. Le voyage dure vingt minutes.",
    "difficulty": "Débutant (A1)"
  },
  {
    "id": 201,
    "level": "A2",
    "title_es": "Mis Vacaciones en el Mar",
    "title_fr": "Mes Vacances à la Mer",
    "text_es": "El verano pasado fui a la costa con mi familia. Hacía mucho sol y el agua estaba perfecta. Todos los días nadaba en el mar y comía pescado fresco en los restaurantes del puerto. Fue una experiencia maravillosa porque descansé mucho y leí dos libros. El año que viene visitaré una isla diferente porque quiero conocer lugares nuevos y practicar deportes acuáticos.",
    "text_fr": "L'été dernier, je suis allé sur la côte avec ma famille. Il faisait très beau et l'eau était parfaite. Tous les jours, je nageais dans la mer et je mangeais du poisson frais dans les restaurants du port. Ce fut une expérience merveilleuse car je me suis beaucoup reposé et j'ai lu deux livres. L'année prochaine, je visiterai une île différente car je veux connaître de nouveaux endroits et pratiquer des sports nautiques.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 202,
    "level": "A2",
    "title_es": "Un Recuerdo Gracioso",
    "title_fr": "Un Souvenir Drôle",
    "text_es": "Cuando era pequeño, me encantaban los dulces. Un día, encontré una caja de chocolates en la cocina y me la comí toda en secreto. Después, me dolió mucho la barriga y tuve que ir al médico. Fue una situación graciosa, pero aprendí la lección. En el futuro, comeré dulces con más moderación para cuidar mi salud y mis dientes.",
    "text_fr": "Quand j'étais petit, j'adorais les sucreries. Un jour, j'ai trouvé une boîte de chocolats dans la cuisine et je l'ai mangée tout entière en secret. Après, j'ai eu très mal au ventre et j'ai dû aller chez le médecin. C'était une situation drôle, mais j'ai appris la leçon. À l'avenir, je mangerai des sucreries avec plus de modération pour prendre soin de ma santé et de mes dents.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 203,
    "level": "A2",
    "title_es": "El Año Que Viene",
    "title_fr": "L'Année Prochaine",
    "text_es": "El año que viene será muy importante para mí. Empezaré mis estudios en la universidad y viviré en un piso compartido con otros estudiantes. Estudiaré arquitectura porque me gustan mucho los edificios modernos. Además, viajaré a Londres en verano para mejorar mi inglés. Estoy seguro de que haré muchos amigos nuevos y aprenderé muchas cosas interesantes durante este nuevo curso.",
    "text_fr": "L'année prochaine sera très importante pour moi. Je commencerai mes études à l'université et je vivrai dans un appartement en colocation avec d'autres étudiants. J'étudierai l'architecture car j'aime beaucoup les bâtiments modernes. De plus, je voyagerai à Londres en été pour améliorer mon anglais. Je suis sûr que je me ferai beaucoup de nouveaux amis et que j'apprendrai beaucoup de choses intéressantes durant cette nouvelle année scolaire.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 204,
    "level": "A2",
    "title_es": "Visita al Museo",
    "title_fr": "Visite au Musée",
    "text_es": "Ayer visité el Museo del Prado en Madrid con mi clase. Vi cuadros muy famosos de Velázquez y Goya. Había mucha gente, pero la visita fue increíble. Me impresionó mucho el tamaño de las pinturas y los colores antiguos. Aprendí mucho sobre la historia del arte español. La próxima vez, contrataré una guía para entender mejor los detalles de cada obra maestra.",
    "text_fr": "Hier, j'ai visité le Musée du Prado à Madrid avec ma classe. J'ai vu des tableaux très célèbres de Velázquez et Goya. Il y avait beaucoup de monde, mais la visite fut incroyable. J'ai été très impressionné par la taille des peintures et les couleurs anciennes. J'ai beaucoup appris sur l'histoire de l'art espagnol. La prochaine fois, je prendrai un guide pour mieux comprendre les détails de chaque chef-d'œuvre.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 205,
    "level": "A2",
    "title_es": "Receta de Paella",
    "title_fr": "Recette de Paella",
    "text_es": "Para preparar una buena paella, primero comprarás ingredientes frescos como arroz, pollo y verduras. Calentarás el aceite en una paellera grande y freirás la carne hasta que esté dorada. Luego, añadirás el tomate, las judías verdes y el azafrán para dar color. Finalmente, echarás el arroz y el agua. Cocinarás todo a fuego lento durante veinte minutos y tendrás un plato delicioso.",
    "text_fr": "Pour préparer une bonne paella, tu achèteras d'abord des ingrédients frais comme du riz, du poulet et des légumes. Tu feras chauffer l'huile dans une grande poêle à paella et tu feras frire la viande jusqu'à ce qu'elle soit dorée. Ensuite, tu ajouteras la tomate, les haricots verts et le safran pour donner de la couleur. Enfin, tu verseras le riz et l'eau. Tu cuisineras le tout à feu doux pendant vingt minutes et tu auras un plat délicieux.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 206,
    "level": "A2",
    "title_es": "Sin Electricidad",
    "title_fr": "Sans Électricité",
    "text_es": "La semana pasada hubo una tormenta fuerte y se fue la luz en mi casa. No podíamos ver la televisión ni usar internet durante horas. Encendimos velas y jugamos a las cartas en el salón toda la noche. Fue extraño estar sin tecnología, pero hablamos mucho en familia. Mis padres contaron historias de su juventud. Mañana compraré una linterna nueva por si ocurre otra vez.",
    "text_fr": "La semaine dernière, il y a eu un fort orage et l'électricité a été coupée chez moi. Nous ne pouvions ni regarder la télévision ni utiliser internet pendant des heures. Nous avons allumé des bougies et joué aux cartes dans le salon toute la nuit. C'était étrange d'être sans technologie, mais nous avons beaucoup parlé en famille. Mes parents ont raconté des histoires de leur jeunesse. Demain, j'achèterai une nouvelle lampe de poche au cas où cela se reproduirait.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 207,
    "level": "A2",
    "title_es": "Mi Primer Trabajo",
    "title_fr": "Mon Premier Travail",
    "text_es": "Mi primer trabajo fue en una cafetería pequeña del centro. Tenía dieciocho años y quería ahorrar dinero para un viaje. Servía cafés y limpiaba las mesas durante todo el verano. Al principio estaba nervioso, pero luego hice buenos amigos entre los compañeros. Fue un trabajo duro, pero gané experiencia y dinero. En el futuro, buscaré un empleo relacionado con mis estudios.",
    "text_fr": "Mon premier travail était dans un petit café du centre-ville. J'avais dix-huit ans et je voulais économiser de l'argent pour un voyage. Je servais des cafés et je nettoyais les tables pendant tout l'été. Au début j'étais nerveux, mais ensuite je me suis fait de bons amis parmi les collègues. C'était un travail dur, mais j'ai gagné de l'expérience et de l'argent. À l'avenir, je chercherai un emploi en lien avec mes études.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 208,
    "level": "A2",
    "title_es": "Fiesta Sorpresa",
    "title_fr": "Fête Surprise",
    "text_es": "El sábado pasado organizamos una fiesta sorpresa para mi hermana. Apagamos las luces y nos escondimos detrás del sofá en silencio. Cuando ella entró en casa, todos gritamos \"¡Felicidades!\". Ella se emocionó mucho y casi lloró de alegría al ver a sus amigos. Comimos tarta de chocolate y bailamos hasta tarde. El año que viene, prepararemos una fiesta en el jardín si hace buen tiempo.",
    "text_fr": "Samedi dernier, nous avons organisé une fête surprise pour ma sœur. Nous avons éteint les lumières et nous nous sommes cachés derrière le canapé en silence. Quand elle est entrée dans la maison, nous avons tous crié \"Félicitations !\". Elle a été très émue et a presque pleuré de joie en voyant ses amis. Nous avons mangé du gâteau au chocolat et dansé jusqu'à tard. L'année prochaine, nous préparerons une fête dans le jardin s'il fait beau.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 209,
    "level": "A2",
    "title_es": "¿Por qué Español?",
    "title_fr": "Pourquoi l'Espagnol ?",
    "text_es": "Aprendo español porque me encanta la cultura hispana y su música. Además, quiero viajar por América Latina sin problemas de comunicación. El próximo año viajaré a Perú y visitaré las ruinas de Machu Picchu. Hablaré con la gente local y probaré la comida tradicional picante. Creo que saber idiomas me ayudará en mi carrera profesional y me abrirá muchas puertas en el futuro.",
    "text_fr": "J'apprends l'espagnol car j'adore la culture hispanique et sa musique. De plus, je veux voyager en Amérique Latine sans problèmes de communication. L'année prochaine, je voyagerai au Pérou et je visiterai les ruines du Machu Picchu. Je parlerai avec les gens locaux et je goûterai la nourriture traditionnelle épicée. Je crois que savoir des langues m'aidera dans ma carrière professionnelle et m'ouvrira beaucoup de portes à l'avenir.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 210,
    "level": "A2",
    "title_es": "Excursión a la Montaña",
    "title_fr": "Excursion à la Montagne",
    "text_es": "El domingo pasado fuimos de excursión a la montaña. Caminamos durante cuatro horas por un sendero estrecho y empinado. Hacía un poco de frío, pero el paisaje era espectacular y verde. Vimos pájaros diferentes y árboles muy altos. Al llegar a la cima, comimos unos bocadillos mientras mirábamos las vistas. La próxima vez, llevaremos más agua porque tuvimos mucha sed durante el camino de vuelta.",
    "text_fr": "Dimanche dernier, nous sommes allés en excursion à la montagne. Nous avons marché pendant quatre heures sur un sentier étroit et raide. Il faisait un peu froid, mais le paysage était spectaculaire et vert. Nous avons vu des oiseaux différents et de très grands arbres. En arrivant au sommet, nous avons mangé des sandwichs en regardant la vue. La prochaine fois, nous emporterons plus d'eau car nous avons eu très soif sur le chemin du retour.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 211,
    "level": "A2",
    "title_es": "La Fiesta Nacional",
    "title_fr": "La Fête Nationale",
    "text_es": "Ayer celebramos la fiesta nacional en mi ciudad con mucha alegría. Había banderas en todos los balcones y la gente cantaba en las calles. Por la noche, vimos los fuegos artificiales desde la terraza de mi tío. Fue un espectáculo precioso lleno de luz y color. El año que viene, asistiré al desfile militar por la mañana porque dicen que es muy emocionante ver los aviones.",
    "text_fr": "Hier, nous avons célébré la fête nationale dans ma ville avec beaucoup de joie. Il y avait des drapeaux sur tous les balcons et les gens chantaient dans les rues. Le soir, nous avons regardé les feux d'artifice depuis la terrasse de mon oncle. C'était un spectacle magnifique plein de lumière et de couleur. L'année prochaine, j'assisterai au défilé militaire le matin car on dit que c'est très émouvant de voir les avions.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 212,
    "level": "A2",
    "title_es": "Ropa de Invierno",
    "title_fr": "Vêtements d'Hiver",
    "text_es": "El invierno llegará pronto y necesito comprar ropa nueva y abrigada. Mañana iré al centro comercial con mi madre para buscar ofertas. Compraré un abrigo de lana gris y unas botas impermeables para los días de lluvia. También buscaré unos guantes calientes porque mis manos siempre están frías. Gastaré bastante dinero, pero es necesario estar preparado para las bajas temperaturas de los próximos meses.",
    "text_fr": "L'hiver arrivera bientôt et j'ai besoin d'acheter des vêtements neufs et chauds. Demain, j'irai au centre commercial avec ma mère pour chercher des offres. J'achèterai un manteau en laine gris et des bottes imperméables pour les jours de pluie. Je chercherai aussi des gants chauds car mes mains sont toujours froides. Je dépenserai pas mal d'argent, mais il est nécessaire d'être préparé pour les basses températures des prochains mois.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 213,
    "level": "A2",
    "title_es": "Viaje en Tren",
    "title_fr": "Voyage en Train",
    "text_es": "El mes pasado viajé en tren a Barcelona para visitar a unos amigos. El viaje duró tres horas y fue muy cómodo y rápido. Mientras miraba por la ventana, vi campos verdes y pueblos pequeños muy bonitos. Leí un libro interesante y escuché música relajante durante el trayecto. Me gustó mucho más que viajar en avión. En mis próximas vacaciones, utilizaré el tren otra vez.",
    "text_fr": "Le mois dernier, j'ai voyagé en train jusqu'à Barcelone pour rendre visite à des amis. Le voyage a duré trois heures et fut très confortable et rapide. Pendant que je regardais par la fenêtre, j'ai vu des champs verts et de très jolis petits villages. J'ai lu un livre intéressant et écouté de la musique relaxante durant le trajet. J'ai beaucoup plus aimé que de voyager en avion. Pour mes prochaines vacances, j'utiliserai le train à nouveau.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 214,
    "level": "A2",
    "title_es": "Mi Película Favorita",
    "title_fr": "Mon Film Préféré",
    "text_es": "Mi película favorita es una comedia romántica que vi hace dos años en el cine. La historia trataba sobre dos personas que se conocieron en un avión y se enamoraron. Me reí mucho con los diálogos inteligentes y los actores eran fantásticos. Aunque ya la he visto tres veces, la veré de nuevo este fin de semana con mis amigos. Seguro que nos divertiremos mucho viéndola.",
    "text_fr": "Mon film préféré est une comédie romantique que j'ai vue il y a deux ans au cinéma. L'histoire parlait de deux personnes qui se sont rencontrées dans un avion et sont tombées amoureuses. J'ai beaucoup ri avec les dialogues intelligents et les acteurs étaient fantastiques. Bien que je l'aie déjà vue trois fois, je la regarderai à nouveau ce week-end avec mes amis. C'est sûr que nous nous amuserons beaucoup en la regardant.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 215,
    "level": "A2",
    "title_es": "Planes de Fin de Semana",
    "title_fr": "Projets de Week-end",
    "text_es": "Este fin de semana descansaré mucho porque he tenido una semana difícil en el trabajo. El sábado por la mañana limpiaré mi habitación y haré la compra semanal en el supermercado. Por la tarde, quedaré con mis amigos y tomaremos algo en una terraza del centro. El domingo visitaré a mis abuelos y comeremos juntos. Será un fin de semana tranquilo y recargaré energías para el lunes.",
    "text_fr": "Ce week-end, je me reposerai beaucoup car j'ai eu une semaine difficile au travail. Samedi matin, je nettoierai ma chambre et je ferai les courses de la semaine au supermarché. L'après-midi, je retrouverai mes amis et nous prendrons un verre sur une terrasse du centre. Dimanche, je rendrai visite à mes grands-parents et nous mangerons ensemble. Ce sera un week-end tranquille et je rechargerai mes énergies pour lundi.",
    "difficulty": "Élémentaire (A2)"
  },
  {
    "id": 301,
    "level": "B1",
    "title_es": "La Importancia del Reciclaje",
    "title_fr": "L'Importance du Recyclage",
    "text_es": "Hoy en día, es fundamental que todos cuidemos el medio ambiente. El reciclaje no es solo una opción, sino una necesidad urgente. Es importante que separemos la basura en casa: plástico, papel y vidrio. Aunque a veces sea incómodo, debemos pensar en el futuro del planeta. No creo que sea suficiente con reciclar; también es necesario que reduzcamos nuestro consumo de plásticos. Si todos colaboramos, es posible que logremos frenar el cambio climático antes de que sea demasiado tarde.",
    "text_fr": "De nos jours, il est fondamental que nous prenions tous soin de l'environnement. Le recyclage n'est pas seulement une option, mais une nécessité urgente. Il est important que nous triions les déchets à la maison : plastique, papier et verre. Bien que ce soit parfois incommode, nous devons penser à l'avenir de la planète. Je ne crois pas qu'il suffise de recycler ; il est aussi nécessaire que nous réduisions notre consommation de plastiques. Si nous collaborons tous, il est possible que nous réussissions à freiner le changement climatique avant qu'il ne soit trop tard.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 302,
    "level": "B1",
    "title_es": "La Vida Sin Internet",
    "title_fr": "La Vie Sans Internet",
    "text_es": "Imaginar una vida sin internet parece imposible para muchos jóvenes. Sin embargo, mis abuelos vivieron así y eran felices. Dudo que hoy en día podamos desconectar totalmente, ya que dependemos de la red para trabajar y comunicarnos. No obstante, sería bueno que apagáramos el móvil de vez en cuando. Es probable que, si lo hiciéramos, descubriéramos hobbies nuevos o disfrutáramos más de las conversaciones cara a cara. Ojalá la gente valorara más el mundo real que el virtual.",
    "text_fr": "Imaginer une vie sans internet semble impossible pour beaucoup de jeunes. Cependant, mes grands-parents ont vécu ainsi et ils étaient heureux. Je doute que nous puissions déconnecter totalement de nos jours, car nous dépendons du réseau pour travailler et communiquer. Néanmoins, il serait bon que nous éteignions le portable de temps en temps. Il est probable que, si nous le faisions, nous découvririons de nouveaux hobbies ou profiterions plus des conversations en face à face. Pourvu que les gens valorisent plus le monde réel que le virtuel.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 303,
    "level": "B1",
    "title_es": "Ventajas del Teletrabajo",
    "title_fr": "Les Avantages du Télétravail",
    "text_es": "El teletrabajo ha cambiado nuestra forma de vivir. Para mí, es fantástico que podamos trabajar desde casa, ya que ahorramos tiempo en transporte. Además, permite una mejor conciliación familiar. Sin embargo, no todo son ventajas. Es posible que algunos se sientan solos o que trabajen más horas de lo normal. Por eso, recomiendo que los teletrabajadores establezcan un horario estricto. No me parece bien que las empresas esperen que estemos disponibles las 24 horas del día.",
    "text_fr": "Le télétravail a changé notre façon de vivre. Pour moi, c'est fantastique que nous puissions travailler depuis la maison, car nous gagnons du temps de transport. De plus, cela permet une meilleure conciliation familiale. Cependant, tout n'est pas avantageux. Il est possible que certains se sentent seuls ou travaillent plus d'heures que la normale. C'est pourquoi je recommande que les télétravailleurs établissent un horaire strict. Il ne me semble pas correct que les entreprises s'attendent à ce que nous soyons disponibles 24 heures sur 24.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 304,
    "level": "B1",
    "title_es": "Opinión sobre la Moda Rápida",
    "title_fr": "Opinion sur la Fast Fashion",
    "text_es": "La moda rápida o 'fast fashion' ofrece ropa barata y moderna, pero tiene un coste oculto. Me preocupa que la gente compre ropa para usarla solo una vez. Es una lástima que la industria textil contamine tanto y que las condiciones laborales en algunos países sean precarias. Sugiero que compremos menos ropa pero de mejor calidad. Es necesario que cambiemos nuestra mentalidad consumista. Tal vez, si apoyamos a marcas sostenibles, la industria empiece a cambiar sus prácticas.",
    "text_fr": "La mode rapide ou 'fast fashion' offre des vêtements bon marché et modernes, mais elle a un coût caché. Cela m'inquiète que les gens achètent des vêtements pour ne les utiliser qu'une seule fois. C'est dommage que l'industrie textile pollue autant et que les conditions de travail dans certains pays soient précaires. Je suggère que nous achetions moins de vêtements mais de meilleure qualité. Il est nécessaire que nous changions notre mentalité consumériste. Peut-être que si nous soutenons des marques durables, l'industrie commencera à changer ses pratiques.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 305,
    "level": "B1",
    "title_es": "Redes Sociales y Jóvenes",
    "title_fr": "Réseaux Sociaux et Jeunes",
    "text_es": "Las redes sociales son una herramienta poderosa, pero peligrosa. Es lógico que los jóvenes quieran compartir sus vidas, pero me asusta que busquen la aprobación de los demás a través de 'likes'. No creo que sea saludable pasar cinco horas al día mirando una pantalla. Es aconsejable que los padres supervisen el uso de estas aplicaciones. Además, es importante que los jóvenes entiendan que lo que ven en internet no siempre es la realidad, sino una versión idealizada.",
    "text_fr": "Les réseaux sociaux sont un outil puissant, mais dangereux. Il est logique que les jeunes veuillent partager leurs vies, mais cela m'effraie qu'ils cherchent l'approbation des autres à travers des 'likes'. Je ne crois pas qu'il soit sain de passer cinq heures par jour à regarder un écran. Il est conseillé que les parents surveillent l'utilisation de ces applications. De plus, il est important que les jeunes comprennent que ce qu'ils voient sur internet n'est pas toujours la réalité, mais une version idéalisée.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 306,
    "level": "B1",
    "title_es": "Un Festival de Música",
    "title_fr": "Un Festival de Musique",
    "text_es": "El verano pasado asistí a un festival de música indie. ¡Ojalá pudieras haber venido! El ambiente era increíble y la gente muy amable. Aunque llovió un poco, no importó porque la música era excelente. Es probable que vuelva el año que viene. Recomiendo que, si vas a un festival, lleves ropa cómoda y mucha agua. Lo mejor fue cuando mi grupo favorito tocó mi canción preferida. Espero que organicen otro evento similar pronto.",
    "text_fr": "L'été dernier, j'ai assisté à un festival de musique indie. Pourvu que tu aies pu venir ! L'ambiance était incroyable et les gens très gentils. Bien qu'il ait plu un peu, cela n'avait pas d'importance car la musique était excellente. Il est probable que je revienne l'année prochaine. Je recommande que, si tu vas à un festival, tu emportes des vêtements confortables et beaucoup d'eau. Le meilleur moment a été quand mon groupe préféré a joué ma chanson favorite. J'espère qu'ils organiseront un autre événement similaire bientôt.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 307,
    "level": "B1",
    "title_es": "La Cocina Vegetariana",
    "title_fr": "La Cuisine Végétarienne",
    "text_es": "Cada vez más personas deciden dejar de comer carne. La cocina vegetariana es muy variada y saludable. No es verdad que solo coman lechuga; hay platos deliciosos con legumbres, verduras y cereales. Es posible que al principio te cueste adaptarte, pero luego te sentirás mejor. Aconsejo que pruebes nuevas recetas con especias. Es bueno que reduzcamos el consumo de carne, no solo por salud, sino también por el bienestar animal y el medio ambiente.",
    "text_fr": "De plus en plus de personnes décident d'arrêter de manger de la viande. La cuisine végétarienne est très variée et saine. Il n'est pas vrai qu'ils ne mangent que de la laitue ; il y a des plats délicieux avec des légumineuses, des légumes et des céréales. Il est possible qu'au début tu aies du mal à t'adapter, mais ensuite tu te sentiras mieux. Je conseille d'essayer de nouvelles recettes avec des épices. Il est bon que nous réduisions la consommation de viande, non seulement pour la santé, mais aussi pour le bien-être animal et l'environnement.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 308,
    "level": "B1",
    "title_es": "¿Viajar Solo o Acompañado?",
    "title_fr": "Voyager Seul ou Accompagné ?",
    "text_es": "Viajar es una experiencia enriquecedora, pero ¿es mejor hacerlo solo o con amigos? Cuando viajas solo, es probable que conozcas a más gente y tengas libertad total. Sin embargo, puede que te sientas solo en algunos momentos. Por otro lado, viajar acompañado es divertido, aunque es necesario que te pongas de acuerdo con tu compañero. Yo prefiero que mis amigos vengan conmigo, porque me gusta compartir los recuerdos. Sea como sea, lo importante es que salgas de casa.",
    "text_fr": "Voyager est une expérience enrichissante, mais est-il mieux de le faire seul ou avec des amis ? Quand tu voyages seul, il est probable que tu rencontres plus de gens et que tu aies une liberté totale. Cependant, il se peut que tu te sentes seul à certains moments. D'un autre côté, voyager accompagné est amusant, bien qu'il soit nécessaire que tu te mettes d'accord avec ton compagnon. Moi, je préfère que mes amis viennent avec moi, car j'aime partager les souvenirs. Quoi qu'il en soit, l'important est de sortir de chez soi.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 309,
    "level": "B1",
    "title_es": "Navidad en España",
    "title_fr": "Noël en Espagne",
    "text_es": "Las tradiciones navideñas en España son muy especiales. Es costumbre que las familias se reúnan para cenar en Nochebuena. Lo más curioso es la tradición de las doce uvas en Nochevieja: hay que comer una uva por cada campanada para tener suerte. También es típico que los niños reciban regalos de los Reyes Magos el 6 de enero, no solo de Papá Noel. Me encanta que las calles estén iluminadas y que haya tanta alegría en el ambiente.",
    "text_fr": "Les traditions de Noël en Espagne sont très spéciales. Il est coutume que les familles se réunissent pour dîner le soir du réveillon de Noël. Le plus curieux est la tradition des douze raisins le soir du Nouvel An : il faut manger un raisin pour chaque coup de cloche pour avoir de la chance. Il est aussi typique que les enfants reçoivent des cadeaux des Rois Mages le 6 janvier, pas seulement du Père Noël. J'adore que les rues soient illuminées et qu'il y ait tant de joie dans l'ambiance.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 310,
    "level": "B1",
    "title_es": "El Estrés Moderno",
    "title_fr": "Le Stress Moderne",
    "text_es": "Vivimos en una sociedad que va demasiado rápido. El estrés afecta nuestra salud física y mental. Es fundamental que aprendamos a relajarnos y a decir 'no' cuando tenemos demasiadas tareas. No creo que el dinero sea más importante que la tranquilidad. Recomiendo que practiques yoga o meditación para calmar la mente. Además, es esencial que duermas al menos ocho horas. Ojalá todos pudiéramos vivir con más calma y disfrutar de los pequeños detalles de la vida.",
    "text_fr": "Nous vivons dans une société qui va trop vite. Le stress affecte notre santé physique et mentale. Il est fondamental que nous apprenions à nous détendre et à dire 'non' quand nous avons trop de tâches. Je ne crois pas que l'argent soit plus important que la tranquillité. Je recommande que tu pratiques le yoga ou la méditation pour calmer l'esprit. De plus, il est essentiel que tu dormes au moins huit heures. Pourvu que nous puissions tous vivre avec plus de calme et profiter des petits détails de la vie.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 311,
    "level": "B1",
    "title_es": "Aprender Idiomas",
    "title_fr": "Apprendre des Langues",
    "text_es": "Saber idiomas es una llave que abre muchas puertas. No solo sirve para trabajar, sino también para entender otras culturas. Es útil que veas películas en versión original y que hables con nativos. Aunque te de vergüenza, es necesario que practiques sin miedo a equivocarte. Los errores son parte del aprendizaje. No pienso que sea imposible aprender un idioma de adulto, solo requiere paciencia y constancia. ¡Anímate a estudiar una lengua nueva!",
    "text_fr": "Savoir des langues est une clé qui ouvre beaucoup de portes. Cela ne sert pas seulement à travailler, mais aussi à comprendre d'autres cultures. Il est utile que tu regardes des films en version originale et que tu parles avec des natifs. Même si tu as honte, il est nécessaire que tu pratiques sans peur de te tromper. Les erreurs font partie de l'apprentissage. Je ne pense pas qu'il soit impossible d'apprendre une langue à l'âge adulte, cela demande juste de la patience et de la constance. Lance-toi pour étudier une nouvelle langue !",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 312,
    "level": "B1",
    "title_es": "Mascotas en la Ciudad",
    "title_fr": "Animaux de Compagnie en Ville",
    "text_es": "Tener un perro en un piso pequeño puede ser complicado. Es una lástima que muchas ciudades no tengan suficientes parques para ellos. Sin embargo, las mascotas nos dan mucha compañía y cariño. Es importante que los dueños sean responsables y recojan lo que sus perros ensucian. También sugiero que adopten animales en lugar de comprarlos. Es posible que un animal adoptado te esté esperando en un refugio. Ellos merecen una segunda oportunidad y un hogar feliz.",
    "text_fr": "Avoir un chien dans un petit appartement peut être compliqué. C'est dommage que beaucoup de villes n'aient pas assez de parcs pour eux. Cependant, les animaux de compagnie nous donnent beaucoup de compagnie et d'affection. Il est important que les propriétaires soient responsables et ramassent ce que leurs chiens salissent. Je suggère aussi qu'ils adoptent des animaux au lieu de les acheter. Il est possible qu'un animal adopté t'attende dans un refuge. Ils méritent une seconde chance et un foyer heureux.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 313,
    "level": "B1",
    "title_es": "Crítica de un Libro",
    "title_fr": "Critique d'un Livre",
    "text_es": "Acabo de terminar de leer 'La Sombra del Viento'. Es una novela fascinante llena de misterio y amor por los libros. La historia te atrapa desde la primera página. Me gusta que el autor describa Barcelona con tanto detalle; parece que estás allí. No obstante, es posible que el final sea un poco predecible para algunos lectores. A pesar de eso, recomiendo que lo leáis. Es uno de esos libros que te hacen soñar y viajar a otra época.",
    "text_fr": "Je viens de finir de lire 'L'Ombre du Vent'. C'est un roman fascinant plein de mystère et d'amour pour les livres. L'histoire t'accroche dès la première page. J'aime que l'auteur décrive Barcelone avec tant de détails ; on dirait qu'on y est. Néanmoins, il est possible que la fin soit un peu prévisible pour certains lecteurs. Malgré cela, je recommande que vous le lisiez. C'est un de ces livres qui te font rêver et voyager à une autre époque.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 314,
    "level": "B1",
    "title_es": "El Transporte del Futuro",
    "title_fr": "Le Transport du Futur",
    "text_es": "El tráfico en las grandes ciudades es un problema grave. En el futuro, espero que haya más coches eléctricos y menos contaminación. Tal vez usemos drones para desplazarnos o trenes de alta velocidad que conecten continentes. Es necesario que invirtamos en transporte público eficiente y barato. No creo que los coches voladores sean una realidad pronto, pero la tecnología avanza muy rápido. Lo ideal sería que las ciudades fueran para los peatones y no para los vehículos.",
    "text_fr": "Le trafic dans les grandes villes est un problème grave. Dans le futur, j'espère qu'il y aura plus de voitures électriques et moins de pollution. Peut-être utiliserons-nous des drones pour nous déplacer ou des trains à grande vitesse qui connectent des continents. Il est nécessaire que nous investissions dans un transport public efficace et bon marché. Je ne crois pas que les voitures volantes soient une réalité bientôt, mais la technologie avance très vite. L'idéal serait que les villes soient pour les piétons et non pour les véhicules.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 315,
    "level": "B1",
    "title_es": "Equilibrio Vida y Trabajo",
    "title_fr": "Équilibre Vie et Travail",
    "text_es": "Muchas personas viven para trabajar en lugar de trabajar para vivir. Es imprescindible que encontremos un equilibrio entre nuestra carrera profesional y nuestra vida personal. No es sano que lleguemos a casa agotados y sin ganas de hacer nada. Propongo que las empresas ofrezcan más flexibilidad horaria. Es importante que dediquemos tiempo a nuestros hobbies y a nuestra familia. Si estamos felices fuera del trabajo, es muy probable que seamos más productivos dentro de él.",
    "text_fr": "Beaucoup de personnes vivent pour travailler au lieu de travailler pour vivre. Il est indispensable que nous trouvions un équilibre entre notre carrière professionnelle et notre vie personnelle. Il n'est pas sain que nous rentrions à la maison épuisés et sans envie de rien faire. Je propose que les entreprises offrent plus de flexibilité horaire. Il est important que nous consacrions du temps à nos hobbies et à notre famille. Si nous sommes heureux en dehors du travail, il est très probable que nous soyons plus productifs dedans.",
    "difficulty": "Intermédiaire (B1)"
  },
  {
    "id": 401,
    "level": "B2",
    "title_es": "El Impacto de la Inteligencia Artificial",
    "title_fr": "L'Impact de l'Intelligence Artificielle",
    "text_es": "La inteligencia artificial ha dejado de ser ciencia ficción para convertirse en una realidad que impregna nuestra vida cotidiana. Si bien sus beneficios en medicina y eficiencia industrial son innegables, surgen dilemas éticos preocupantes. ¿Hasta qué punto deberíamos permitir que los algoritmos tomen decisiones por nosotros? Existe el temor de que la automatización reemplace millones de empleos, obligando a la sociedad a redefinir el concepto de trabajo. No obstante, si se regulara adecuadamente, la IA podría ser la herramienta definitiva para resolver problemas complejos como el cambio climático o las enfermedades incurables. El futuro dependerá de cómo equilibremos la innovación con la ética humana.",
    "text_fr": "L'intelligence artificielle a cessé d'être de la science-fiction pour devenir une réalité qui imprègne notre vie quotidienne. Bien que ses avantages en médecine et en efficacité industrielle soient indéniables, des dilemmes éthiques inquiétants surgissent. Jusqu'où devrions-nous permettre aux algorithmes de prendre des décisions à notre place ? Il existe la crainte que l'automatisation remplace des millions d'emplois, obligeant la société à redéfinir le concept de travail. Néanmoins, si elle était régulée adéquatement, l'IA pourrait être l'outil ultime pour résoudre des problèmes complexes comme le changement climatique ou les maladies incurables. L'avenir dépendra de la manière dont nous équilibrerons l'innovation avec l'éthique humaine.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 402,
    "level": "B2",
    "title_es": "La Crisis Climática",
    "title_fr": "La Crise Climatique",
    "text_es": "La crisis climática representa el mayor desafío existencial de nuestro tiempo. Los científicos advierten que, a menos que reduzcamos drásticamente las emisiones de gases de efecto invernadero, las consecuencias serán irreversibles. Ya estamos presenciando fenómenos meteorológicos extremos con mayor frecuencia. Es imperativo que los gobiernos y las corporaciones asuman su responsabilidad, pero también que los individuos cambien sus hábitos. Si no actuáramos con urgencia, estaríamos comprometiendo el bienestar de las generaciones futuras. La transición hacia una economía verde no es solo una opción ecológica, sino una necesidad económica y social para garantizar la supervivencia del planeta tal como lo conocemos.",
    "text_fr": "La crise climatique représente le plus grand défi existentiel de notre époque. Les scientifiques préviennent que, à moins que nous ne réduisions drastiquement les émissions de gaz à effet de serre, les conséquences seront irréversibles. Nous sommes déjà témoins de phénomènes météorologiques extrêmes plus fréquents. Il est impératif que les gouvernements et les entreprises assument leur responsabilité, mais aussi que les individus changent leurs habitudes. Si nous n'agissions pas avec urgence, nous compromettrions le bien-être des générations futures. La transition vers une économie verte n'est pas seulement une option écologique, mais une nécessité économique et sociale pour garantir la survie de la planète telle que nous la connaissons.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 403,
    "level": "B2",
    "title_es": "Evolución del Turismo de Masas",
    "title_fr": "L'Évolution du Tourisme de Masse",
    "text_es": "El turismo de masas ha transformado ciudades enteras, a menudo convirtiéndolas en parques temáticos para visitantes y desplazando a los residentes locales. Este fenómeno, conocido como gentrificación turística, plantea serios problemas de sostenibilidad. Aunque el turismo genera riqueza, es crucial preguntarse a qué precio. Las ciudades deberían buscar un modelo más equilibrado que priorice la calidad de vida de los habitantes. Si se promoviera un turismo responsable y respetuoso con la cultura local, se podrían mitigar los efectos negativos. De lo contrario, corremos el riesgo de que destinos históricos pierdan su esencia y autenticidad, convirtiéndose en meros escenarios vacíos de vida real.",
    "text_fr": "Le tourisme de masse a transformé des villes entières, les transformant souvent en parcs à thème pour les visiteurs et déplaçant les résidents locaux. Ce phénomène, connu sous le nom de gentrification touristique, pose de sérieux problèmes de durabilité. Bien que le tourisme génère de la richesse, il est crucial de se demander à quel prix. Les villes devraient chercher un modèle plus équilibré qui priorise la qualité de vie des habitants. Si l'on promouvait un tourisme responsable et respectueux de la culture locale, on pourrait atténuer les effets négatifs. Sinon, nous courons le risque que des destinations historiques perdent leur essence et leur authenticité, devenant de simples décors vides de vie réelle.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 404,
    "level": "B2",
    "title_es": "Preservación de Lenguas Minoritarias",
    "title_fr": "La Préservation des Langues Minoritaires",
    "text_es": "Cada vez que muere una lengua, desaparece una forma única de ver el mundo. La globalización ha acelerado la pérdida de lenguas minoritarias, imponiendo idiomas dominantes en el comercio y la cultura. Preservar estas lenguas es vital para mantener la diversidad cultural y la identidad de los pueblos. No se trata solo de palabras, sino de conocimientos ancestrales, tradiciones y filosofías. Sería una tragedia que permitiéramos que esta riqueza se perdiera. Es fundamental que se apoyen programas educativos bilingües y se fomente el uso de estas lenguas en la vida pública para asegurar su supervivencia.",
    "text_fr": "Chaque fois qu'une langue meurt, une façon unique de voir le monde disparaît. La mondialisation a accéléré la perte des langues minoritaires, imposant des langues dominantes dans le commerce et la culture. Préserver ces langues est vital pour maintenir la diversité culturelle et l'identité des peuples. Il ne s'agit pas seulement de mots, mais de connaissances ancestrales, de traditions et de philosophies. Ce serait une tragédie que nous permettions que cette richesse se perde. Il est fondamental que l'on soutienne des programmes éducatifs bilingues et que l'on encourage l'utilisation de ces langues dans la vie publique pour assurer leur survie.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 405,
    "level": "B2",
    "title_es": "Ética en el Consumo",
    "title_fr": "L'Éthique dans la Consommation",
    "text_es": "El acto de comprar se ha convertido en una declaración política. Los consumidores son cada vez más conscientes del impacto que tienen sus decisiones en el medio ambiente y en los derechos laborales. El consumo ético implica elegir productos que hayan sido fabricados de manera justa y sostenible. A pesar de que estos productos suelen ser más caros, muchas personas están dispuestas a pagar la diferencia. Si exigiéramos transparencia a las grandes marcas, podríamos forzar un cambio real en la industria. La pregunta es si estamos dispuestos a renunciar a la comodidad y al precio bajo en favor de nuestros valores morales.",
    "text_fr": "L'acte d'acheter est devenu une déclaration politique. Les consommateurs sont de plus en plus conscients de l'impact que leurs décisions ont sur l'environnement et les droits du travail. La consommation éthique implique de choisir des produits qui ont été fabriqués de manière juste et durable. Bien que ces produits soient souvent plus chers, beaucoup de personnes sont prêtes à payer la différence. Si nous exigions de la transparence aux grandes marques, nous pourrions forcer un changement réel dans l'industrie. La question est de savoir si nous sommes prêts à renoncer au confort et au prix bas en faveur de nos valeurs morales.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 406,
    "level": "B2",
    "title_es": "El Papel del Arte en la Sociedad",
    "title_fr": "Le Rôle de l'Art dans la Société",
    "text_es": "El arte no debe ser visto únicamente como un objeto de decoración o entretenimiento, sino como un espejo crítico de la sociedad. A lo largo de la historia, los artistas han desafiado el statu quo y han provocado debates necesarios sobre política, religión y derechos humanos. En tiempos de crisis, el arte ofrece consuelo y una vía de escape, pero también tiene el poder de movilizar a las masas. Sería un error subestimar su capacidad para generar cambios sociales. Por lo tanto, es esencial que protejamos la libertad de expresión artística, incluso cuando las obras resulten polémicas o incómodas.",
    "text_fr": "L'art ne doit pas être vu uniquement comme un objet de décoration ou de divertissement, mais comme un miroir critique de la société. Tout au long de l'histoire, les artistes ont défié le statu quo et ont provoqué des débats nécessaires sur la politique, la religion et les droits de l'homme. En temps de crise, l'art offre du réconfort et une échappatoire, mais il a aussi le pouvoir de mobiliser les masses. Ce serait une erreur de sous-estimer sa capacité à générer des changements sociaux. Par conséquent, il est essentiel que nous protégions la liberté d'expression artistique, même lorsque les œuvres s'avèrent polémiques ou inconfortables.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 407,
    "level": "B2",
    "title_es": "Desafíos de la Educación Moderna",
    "title_fr": "Les Défis de l'Éducation Moderne",
    "text_es": "La educación tradicional basada en la memorización está quedando obsoleta en la era digital. El desafío actual no es el acceso a la información, sino la capacidad de analizarla críticamente. Los educadores deben enseñar a los estudiantes a distinguir entre fuentes fiables y noticias falsas, así como a resolver problemas de manera creativa. Además, la inteligencia emocional debería tener el mismo peso que las matemáticas o la literatura. Si el sistema educativo no se adaptara a estas nuevas necesidades, estaríamos preparando a los jóvenes para un mundo que ya no existe, en lugar de capacitarlos para el futuro.",
    "text_fr": "L'éducation traditionnelle basée sur la mémorisation devient obsolète à l'ère numérique. Le défi actuel n'est pas l'accès à l'information, mais la capacité de l'analyser de manière critique. Les éducateurs doivent enseigner aux étudiants à distinguer entre sources fiables et fausses nouvelles, ainsi qu'à résoudre des problèmes de manière créative. De plus, l'intelligence émotionnelle devrait avoir le même poids que les mathématiques ou la littérature. Si le système éducatif ne s'adaptait pas à ces nouveaux besoins, nous préparerions les jeunes pour un monde qui n'existe plus, au lieu de les former pour l'avenir.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 408,
    "level": "B2",
    "title_es": "La Globalización Cultural",
    "title_fr": "La Globalisation Culturelle",
    "text_es": "La globalización ha permitido un intercambio cultural sin precedentes, acercando tradiciones de rincones opuestos del mundo. Sin embargo, existe el riesgo de una homogeneización cultural, donde las costumbres locales son reemplazadas por una cultura de consumo global. Es fascinante que podamos comer sushi en Madrid o escuchar reguetón en Tokio, pero no debemos olvidar nuestras propias raíces. El reto consiste en abrazar lo global sin perder lo local. Sería deseable que este intercambio fuera bidireccional y respetuoso, en lugar de una imposición de los valores occidentales sobre el resto del mundo.",
    "text_fr": "La mondialisation a permis un échange culturel sans précédent, rapprochant des traditions de coins opposés du monde. Cependant, il existe le risque d'une homogénéisation culturelle, où les coutumes locales sont remplacées par une culture de consommation mondiale. Il est fascinant que nous puissions manger des sushis à Madrid ou écouter du reggaeton à Tokyo, mais nous ne devons pas oublier nos propres racines. Le défi consiste à embrasser le global sans perdre le local. Il serait souhaitable que cet échange soit bidirectionnel et respectueux, au lieu d'une imposition des valeurs occidentales sur le reste du monde.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 409,
    "level": "B2",
    "title_es": "El Minimalismo como Estilo de Vida",
    "title_fr": "Le Minimalisme comme Mode de Vie",
    "text_es": "Frente al consumismo desenfrenado, el minimalismo surge como una filosofía que busca la felicidad en tener menos. No se trata solo de tirar cosas materiales, sino de eliminar lo superfluo para concentrarse en lo esencial. Los defensores de este estilo de vida aseguran que poseer menos objetos reduce el estrés y aumenta la libertad personal. Al liberarnos de la necesidad de comprar constantemente, podemos invertir más tiempo en experiencias y relaciones. Quizás, si todos adoptáramos un enfoque más minimalista, no solo mejoraríamos nuestra salud mental, sino que también reduciríamos nuestra huella ecológica.",
    "text_fr": "Face au consumérisme effréné, le minimalisme surgit comme une philosophie qui cherche le bonheur dans le fait d'avoir moins. Il ne s'agit pas seulement de jeter des choses matérielles, mais d'éliminer le superflu pour se concentrer sur l'essentiel. Les défenseurs de ce mode de vie assurent que posséder moins d'objets réduit le stress et augmente la liberté personnelle. En nous libérant du besoin d'acheter constamment, nous pouvons investir plus de temps dans des expériences et des relations. Peut-être que si nous adoptions tous une approche plus minimaliste, non seulement nous améliorerions notre santé mentale, mais nous réduirions aussi notre empreinte écologique.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 410,
    "level": "B2",
    "title_es": "La Psicología de la Felicidad",
    "title_fr": "La Psychologie du Bonheur",
    "text_es": "La búsqueda de la felicidad es una constante en la historia humana, pero la psicología moderna sugiere que a menudo la buscamos en los lugares equivocados. Muchos creen que el éxito financiero o la fama traen la dicha, cuando los estudios demuestran que las relaciones sociales y el sentido de propósito son más determinantes. La felicidad no debería ser vista como un destino final, sino como un estado fluctuante. Es vital que aceptemos las emociones negativas como parte de la vida. Si aprendiéramos a valorar el presente en lugar de obsesionarnos con el futuro, probablemente seríamos más felices.",
    "text_fr": "La recherche du bonheur est une constante dans l'histoire humaine, mais la psychologie moderne suggère que souvent nous le cherchons aux mauvais endroits. Beaucoup croient que le succès financier ou la célébrité apportent la joie, alors que les études démontrent que les relations sociales et le sens du but sont plus déterminants. Le bonheur ne devrait pas être vu comme une destination finale, mais comme un état fluctuant. Il est vital que nous acceptions les émotions négatives comme faisant partie de la vie. Si nous apprenions à valoriser le présent au lieu de nous obséder avec le futur, nous serions probablement plus heureux.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 411,
    "level": "B2",
    "title_es": "Energías Renovables",
    "title_fr": "Les Énergies Renouvelables",
    "text_es": "La transición hacia las energías renovables es imparable, aunque todavía enfrenta obstáculos políticos y económicos. La energía solar y eólica son cada vez más baratas y eficientes, lo que las convierte en una alternativa real a los combustibles fósiles. Sin embargo, el almacenamiento de esta energía sigue siendo un desafío técnico importante. Es crucial que los gobiernos inviertan en infraestructuras verdes para garantizar un suministro estable. Si no aceleramos este cambio, los daños ambientales serán catastróficos. Apostar por las renovables es apostar por un futuro más limpio, seguro y económicamente sostenible para todos.",
    "text_fr": "La transition vers les énergies renouvelables est imparable, bien qu'elle affronte encore des obstacles politiques et économiques. L'énergie solaire et éolienne sont de moins en moins chères et plus efficientes, ce qui en fait une alternative réelle aux combustibles fossiles. Cependant, le stockage de cette énergie reste un défi technique important. Il est crucial que les gouvernements investissent dans des infrastructures vertes pour garantir un approvisionnement stable. Si nous n'accélérons pas ce changement, les dommages environnementaux seront catastrophiques. Parier sur les renouvelables, c'est parier sur un futur plus propre, sûr et économiquement durable pour tous.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 412,
    "level": "B2",
    "title_es": "Historia de América Latina",
    "title_fr": "L'Histoire de l'Amérique Latine",
    "text_es": "La historia de América Latina es un tapiz complejo de civilizaciones indígenas, conquista europea y luchas por la independencia. Desde los grandes imperios Maya, Azteca e Inca hasta la llegada de los españoles, la región ha sufrido transformaciones profundas y, a menudo, dolorosas. El mestizaje cultural resultante es único en el mundo. Durante los siglos XIX y XX, la región buscó su identidad política, enfrentando dictaduras y revoluciones. Hoy en día, América Latina sigue luchando contra la desigualdad, pero su riqueza cultural y humana es inmensa. Comprender su pasado es esencial para entender sus desafíos presentes.",
    "text_fr": "L'histoire de l'Amérique Latine est une tapisserie complexe de civilisations indigènes, de conquête européenne et de luttes pour l'indépendance. Des grands empires Maya, Aztèque et Inca jusqu'à l'arrivée des Espagnols, la région a subi des transformations profondes et, souvent, douloureuses. Le métissage culturel résultant est unique au monde. Durant les XIXe et XXe siècles, la région a cherché son identité politique, affrontant dictatures et révolutions. De nos jours, l'Amérique Latine continue de lutter contre l'inégalité, mais sa richesse culturelle et humaine est immense. Comprendre son passé est essentiel pour comprendre ses défis présents.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 413,
    "level": "B2",
    "title_es": "El Siglo de Oro Español",
    "title_fr": "Le Siècle d'Or Espagnol",
    "text_es": "El Siglo de Oro representa el apogeo de la cultura española, abarcando los siglos XVI y XVII. Fue una época de extraordinario florecimiento en la literatura y las artes, coincidiendo con el auge político del imperio español. Autores como Miguel de Cervantes, con su 'Don Quijote', y dramaturgos como Lope de Vega, revolucionaron las letras universales. Las obras de este periodo suelen tratar temas como el honor, la religión y el desengaño. Es asombroso que, en un contexto de crisis económica y guerras, surgiera tanta belleza artística. Este legado sigue definiendo la identidad cultural de España.",
    "text_fr": "Le Siècle d'Or représente l'apogée de la culture espagnole, couvrant les XVIe et XVIIe siècles. Ce fut une époque d'extraordinaire épanouissement dans la littérature et les arts, coïncidant avec l'essor politique de l'empire espagnol. Des auteurs comme Miguel de Cervantes, avec son 'Don Quichotte', et des dramaturges comme Lope de Vega, ont révolutionné les lettres universelles. Les œuvres de cette période traitent souvent de thèmes comme l'honneur, la religion et la désillusion. Il est étonnant que, dans un contexte de crise économique et de guerres, ait surgi tant de beauté artistique. Cet héritage continue de définir l'identité culturelle de l'Espagne.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 414,
    "level": "B2",
    "title_es": "El Periodismo Ciudadano",
    "title_fr": "Le Journalisme Citoyen",
    "text_es": "Con la llegada de los teléfonos inteligentes y las redes sociales, cualquier persona puede convertirse en un reportero improvisado. El periodismo ciudadano ha democratizado la información, permitiendo que noticias locales lleguen a una audiencia global en segundos. Sin embargo, este fenómeno carece de los filtros profesionales de verificación, lo que facilita la propagación de noticias falsas. Aunque es valioso tener múltiples puntos de vista, es peligroso equiparar un tuit viral con una investigación periodística rigurosa. Deberíamos valorar el periodismo ciudadano como un complemento, no como un sustituto del periodismo tradicional y profesional.",
    "text_fr": "Avec l'arrivée des smartphones et des réseaux sociaux, n'importe qui peut devenir un reporter improvisé. Le journalisme citoyen a démocratisé l'information, permettant que des nouvelles locales atteignent une audience mondiale en quelques secondes. Cependant, ce phénomène manque des filtres professionnels de vérification, ce qui facilite la propagation de fausses nouvelles. Bien qu'il soit précieux d'avoir de multiples points de vue, il est dangereux d'assimiler un tweet viral à une enquête journalistique rigoureuse. Nous devrions valoriser le journalisme citoyen comme un complément, non comme un substitut du journalisme traditionnel et professionnel.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 415,
    "level": "B2",
    "title_es": "La Exploración Espacial",
    "title_fr": "L'Exploration Spatiale",
    "text_es": "La exploración espacial ha vuelto a capturar la imaginación del público, impulsada ahora por empresas privadas además de agencias gubernamentales. La idea de colonizar Marte ya no parece una fantasía lejana, sino un objetivo técnico alcanzable en las próximas décadas. Los defensores argumentan que convertirse en una especie multiplanetaria es el seguro de vida de la humanidad. Por otro lado, los críticos señalan que deberíamos resolver los problemas de la Tierra antes de gastar billones en el espacio. Sea como fuere, la curiosidad humana y el deseo de explorar lo desconocido parecen fuerzas imparables.",
    "text_fr": "L'exploration spatiale a de nouveau capturé l'imagination du public, propulsée maintenant par des entreprises privées en plus des agences gouvernementales. L'idée de coloniser Mars ne semble plus être une fantaisie lointaine, mais un objectif technique atteignable dans les prochaines décennies. Les défenseurs argumentent que devenir une espèce multiplanétaire est l'assurance-vie de l'humanité. D'un autre côté, les critiques signalent que nous devrions résoudre les problèmes de la Terre avant de dépenser des billions dans l'espace. Quoi qu'il en soit, la curiosité humaine et le désir d'explorer l'inconnu semblent être des forces imparables.",
    "difficulty": "Avancé (B2)"
  },
  {
    "id": 501,
    "level": "C1",
    "title_es": "La Dialéctica del Quijote",
    "title_fr": "La Dialectique de Don Quichotte",
    "text_es": "La obra maestra de Cervantes no es meramente una sátira de las novelas de caballería, sino una profunda exploración de la dualidad humana. Don Quijote y Sancho Panza encarnan la eterna tensión entre el idealismo y el realismo, el espíritu y la materia. Mientras el caballero andante proyecta sus sueños sobre una realidad prosaica, transformando molinos en gigantes, su escudero actúa como el ancla que lo ata a la tierra. Sin embargo, a lo largo de la novela, se produce una 'quijotización' de Sancho y una 'sanchificación' de Quijote, sugiriendo que ambas facetas son inseparables. Esta ósmosis psicológica revela que la verdad no es absoluta, sino una construcción subjetiva, un matiz que anticipa la novela moderna y el perspectivismo filosófico.",
    "text_fr": "Le chef-d'œuvre de Cervantès n'est pas seulement une satire des romans de chevalerie, mais une exploration profonde de la dualité humaine. Don Quichotte et Sancho Panza incarnent l'éternelle tension entre l'idéalisme et le réalisme, l'esprit et la matière. Alors que le chevalier errant projette ses rêves sur une réalité prosaïque, transformant des moulins en géants, son écuyer agit comme l'ancre qui l'attache à la terre. Cependant, tout au long du roman, une 'quichottisation' de Sancho et une 'sanchification' de Quichotte se produisent, suggérant que les deux facettes sont inséparables. Cette osmose psychologique révèle que la vérité n'est pas absolue, mais une construction subjective, une nuance qui anticipe le roman moderne et le perspectivisme philosophique.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 502,
    "level": "C1",
    "title_es": "La Huella Árabe en España",
    "title_fr": "L'Empreinte Arabe en Espagne",
    "text_es": "La presencia musulmana en la Península Ibérica durante casi ocho siglos ha dejado un legado indeleble que trasciende la arquitectura de la Alhambra o la Mezquita de Córdoba. Esta herencia impregna el léxico cotidiano, la gastronomía y, sobre todo, la idiosincrasia española. Al-Ándalus fue un faro de civilización donde florecieron las ciencias, la filosofía y las artes, sirviendo de puente entre Oriente y Occidente. Negar este sustrato sería mutilar una parte esencial de la identidad hispana. La convivencia, aunque a menudo idealizada, permitió un mestizaje cultural que hoy se manifiesta en el urbanismo laberíntico de los cascos antiguos y en sistemas de regadío que todavía perduran, demostrando que la historia es un palimpsesto de culturas superpuestas.",
    "text_fr": "La présence musulmane dans la Péninsule Ibérique pendant près de huit siècles a laissé un héritage indélébile qui transcende l'architecture de l'Alhambra ou de la Mosquée de Cordoue. Cet héritage imprègne le lexique quotidien, la gastronomie et, surtout, l'idiosyncrasie espagnole. Al-Andalus fut un phare de civilisation où fleurirent les sciences, la philosophie et les arts, servant de pont entre l'Orient et l'Occident. Nier ce substrat serait mutiler une partie essentielle de l'identité hispanique. La coexistence, bien que souvent idéalisée, a permis un métissage culturel qui se manifeste aujourd'hui dans l'urbanisme labyrinthique des centres historiques et dans des systèmes d'irrigation qui perdurent encore, démontrant que l'histoire est un palimpseste de cultures superposées.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 503,
    "level": "C1",
    "title_es": "Desafíos Geopolíticos Actuales",
    "title_fr": "Les Défis Géopolitiques Actuels",
    "text_es": "El tablero geopolítico contemporáneo se caracteriza por una volatilidad sin precedentes, donde la hegemonía unipolar se desvanece en favor de un orden multipolar fragmentado. Las tensiones comerciales, la ciberseguridad y la competencia por los recursos naturales están redefiniendo las alianzas tradicionales. Nos enfrentamos a guerras híbridas donde la desinformación es tan letal como el armamento convencional. Además, el cambio climático actúa como un multiplicador de amenazas, exacerbando conflictos en regiones vulnerables y provocando migraciones masivas. En este contexto, la diplomacia requiere una agilidad extraordinaria para navegar entre intereses contrapuestos. La soberanía nacional se ve constantemente desafiada por problemas transnacionales que exigen una gobernanza global cooperativa, una utopía que choca frontalmente con el resurgimiento de los nacionalismos.",
    "text_fr": "L'échiquier géopolitique contemporain se caractérise par une volatilité sans précédent, où l'hégémonie unipolaire s'efface au profit d'un ordre multipolaire fragmenté. Les tensions commerciales, la cybersécurité et la concurrence pour les ressources naturelles redéfinissent les alliances traditionnelles. Nous sommes confrontés à des guerres hybrides où la désinformation est aussi létale que l'armement conventionnel. De plus, le changement climatique agit comme un multiplicateur de menaces, exacerbant les conflits dans des régions vulnérables et provoquant des migrations massives. Dans ce contexte, la diplomatie requiert une agilité extraordinaire pour naviguer entre des intérêts opposés. La souveraineté nationale est constamment défiée par des problèmes transnationaux qui exigent une gouvernance globale coopérative, une utopie qui se heurte frontalement à la résurgence des nationalismes.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 504,
    "level": "C1",
    "title_es": "Neurobiología del Aprendizaje",
    "title_fr": "La Neurobiologie de l'Apprentissage",
    "text_es": "La plasticidad cerebral es la piedra angular de nuestra capacidad para adquirir conocimientos. Lejos de ser una estructura estática, el cerebro se remodela constantemente en respuesta a la experiencia, fortaleciendo o podando conexiones sinápticas. Este proceso neurobiológico subyace a todo aprendizaje, desde la memorización de datos hasta la adquisición de habilidades motoras. Factores como el sueño, el estrés y la nutrición juegan un papel crucial en la consolidación de la memoria. Entender estos mecanismos nos permite optimizar las estrategias pedagógicas, alejándonos de la memorización pasiva hacia un aprendizaje activo y significativo. La neuroeducación emerge así como una disciplina prometedora, aunque debemos ser cautelosos y evitar caer en 'neuromitos' que simplifican excesivamente la complejidad de la cognición humana.",
    "text_fr": "La plasticité cérébrale est la pierre angulaire de notre capacité à acquérir des connaissances. Loin d'être une structure statique, le cerveau se remodèle constamment en réponse à l'expérience, renforçant ou élaguant des connexions synaptiques. Ce processus neurobiologique sous-tend tout apprentissage, de la mémorisation de données à l'acquisition de compétences motrices. Des facteurs comme le sommeil, le stress et la nutrition jouent un rôle crucial dans la consolidation de la mémoire. Comprendre ces mécanismes nous permet d'optimiser les stratégies pédagogiques, en nous éloignant de la mémorisation passive vers un apprentissage actif et significatif. La neuroéducation émerge ainsi comme une discipline prometteuse, bien que nous devions être prudents et éviter de tomber dans des 'neuromythes' qui simplifient excessivement la complexité de la cognition humaine.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 505,
    "level": "C1",
    "title_es": "Gaudí y el Modernismo",
    "title_fr": "L'Architecture de Gaudí et le Modernisme",
    "text_es": "Antoni Gaudí no fue simplemente un arquitecto, sino un demiurgo que moldeó la piedra a imagen y semejanza de la naturaleza. Su obra representa la cumbre del modernismo catalán, un movimiento que buscaba romper con la rigidez académica para abrazar la línea curva y la asimetría orgánica. En la Sagrada Familia, la estructura se convierte en teología; cada columna y cada arco están imbuidos de simbolismo espiritual y rigor matemático. Gaudí entendía la arquitectura como una obra de arte total, integrando la forja, la vidriería y la cerámica mediante la técnica del 'trencadís'. Su genialidad radica en su capacidad para sintetizar funcionalidad y estética onírica, creando espacios que respiran y que parecen desafiar las leyes de la gravedad.",
    "text_fr": "Antoni Gaudí ne fut pas simplement un architecte, mais un démiurge qui modela la pierre à l'image et à la ressemblance de la nature. Son œuvre représente le sommet du modernisme catalan, un mouvement qui cherchait à rompre avec la rigidité académique pour embrasser la ligne courbe et l'asymétrie organique. Dans la Sagrada Familia, la structure devient théologie ; chaque colonne et chaque arc sont imprégnés de symbolisme spirituel et de rigueur mathématique. Gaudí comprenait l'architecture comme une œuvre d'art totale, intégrant la forge, le vitrail et la céramique via la technique du 'trencadís'. Son génie réside dans sa capacité à synthétiser fonctionnalité et esthétique onirique, créant des espaces qui respirent et qui semblent défier les lois de la gravité.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 506,
    "level": "C1",
    "title_es": "Sociología del Cambio",
    "title_fr": "Analyse Sociologique du Changement",
    "text_es": "El cambio social es un fenómeno ineluctable y multifacético, impulsado por fuerzas tecnológicas, demográficas e ideológicas. La 'modernidad líquida', concepto acuñado por Zygmunt Bauman, describe una sociedad donde las estructuras son volátiles y las relaciones humanas, efímeras. En este contexto, la incertidumbre se convierte en la única certeza. Las instituciones tradicionales, como la familia o el estado-nación, se erosionan, dando paso a nuevas formas de identidad y pertenencia más fluidas. Este dinamismo genera una tensión constante entre la necesidad de seguridad y el deseo de libertad. Analizar estos cambios requiere una mirada crítica que trascienda la nostalgia por el pasado y abrace la complejidad de un presente en perpetua transformación.",
    "text_fr": "Le changement social est un phénomène inéluctable et aux multiples facettes, propulsé par des forces technologiques, démographiques et idéologiques. La 'modernité liquide', concept inventé par Zygmunt Bauman, décrit une société où les structures sont volatiles et les relations humaines, éphémères. Dans ce contexte, l'incertitude devient la seule certitude. Les institutions traditionnelles, comme la famille ou l'État-nation, s'érodent, laissant place à de nouvelles formes d'identité et d'appartenance plus fluides. Ce dynamisme génère une tension constante entre le besoin de sécurité et le désir de liberté. Analyser ces changements requiert un regard critique qui transcende la nostalgie du passé et embrasse la complexité d'un présent en perpétuelle transformation.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 507,
    "level": "C1",
    "title_es": "El Realismo Mágico",
    "title_fr": "Le Réalisme Magique en Littérature",
    "text_es": "El realismo mágico no es una mera yuxtaposición de fantasía y realidad, sino una corriente literaria que naturaliza lo inverosímil. En obras como 'Cien años de soledad', Gabriel García Márquez teje un universo donde lo sobrenatural se percibe como cotidiano, borrando las fronteras entre el mito y la historia. Esta narrativa surge como respuesta a la realidad latinoamericana, tan desmesurada y convulsa que el realismo tradicional resultaba insuficiente para describirla. Al integrar leyendas, supersticiones y hechos históricos, el realismo mágico ofrece una verdad más profunda que la crónica periodística. Es una reivindicación de la imaginación como herramienta para comprender una identidad cultural forjada en la paradoja y el mestizaje.",
    "text_fr": "Le réalisme magique n'est pas une simple juxtaposition de fantaisie et de réalité, mais un courant littéraire qui naturalise l'invraisemblable. Dans des œuvres comme 'Cent ans de solitude', Gabriel García Márquez tisse un univers où le surnaturel est perçu comme quotidien, effaçant les frontières entre le mythe et l'histoire. Cette narration surgit comme une réponse à la réalité latino-américaine, si démesurée et convulsive que le réalisme traditionnel s'avérait insuffisant pour la décrire. En intégrant légendes, superstitions et faits historiques, le réalisme magique offre une vérité plus profonde que la chronique journalistique. C'est une revendication de l'imagination comme outil pour comprendre une identité culturelle forgée dans le paradoxe et le métissage.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 508,
    "level": "C1",
    "title_es": "Bioética y Genética",
    "title_fr": "La Bioéthique et la Génétique",
    "text_es": "Los avances en la edición genética, como la tecnología CRISPR, han abierto la caja de Pandora de la bioética moderna. La posibilidad de erradicar enfermedades hereditarias es prometedora, pero plantea interrogantes inquietantes sobre la eugenesia y la modificación de la línea germinal humana. ¿Tenemos derecho a 'diseñar' a nuestros descendientes? La frontera entre la terapia curativa y la mejora genética es difusa y peligrosa. Existe el riesgo de crear una brecha biológica entre quienes pueden permitirse estas mejoras y quienes no, exacerbando las desigualdades sociales. Es imperativo establecer un marco regulatorio internacional que guíe el progreso científico, asegurando que sirva a la dignidad humana y no a intereses comerciales o ideológicos.",
    "text_fr": "Les avancées dans l'édition génétique, comme la technologie CRISPR, ont ouvert la boîte de Pandore de la bioéthique moderne. La possibilité d'éradiquer des maladies héréditaires est prometteuse, mais pose des questions inquiétantes sur l'eugénisme et la modification de la lignée germinale humaine. Avons-nous le droit de 'concevoir' nos descendants ? La frontière entre la thérapie curative et l'amélioration génétique est floue et dangereuse. Il existe le risque de créer un fossé biologique entre ceux qui peuvent se permettre ces améliorations et ceux qui ne le peuvent pas, exacerbant les inégalités sociales. Il est impératif d'établir un cadre réglementaire international qui guide le progrès scientifique, assurant qu'il serve la dignité humaine et non des intérêts commerciaux ou idéologiques.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 509,
    "level": "C1",
    "title_es": "La Economía Circular",
    "title_fr": "L'Économie Circulaire",
    "text_es": "El modelo económico lineal de 'producir, usar y tirar' es insostenible en un planeta con recursos finitos. La economía circular propone un cambio de paradigma radical: disociar el crecimiento económico del consumo de recursos. Se trata de diseñar productos para ser reutilizados, reparados y reciclados, cerrando el ciclo de vida de los materiales. Esto no solo mitiga el impacto ambiental, sino que fomenta la innovación y la resiliencia empresarial. Sin embargo, la transición requiere una transformación sistémica que va más allá del reciclaje doméstico; implica repensar las cadenas de suministro y los hábitos de consumo. Si no adoptamos esta circularidad, nos enfrentaremos a una escasez de materias primas y a una crisis de residuos ingobernable.",
    "text_fr": "Le modèle économique linéaire de 'produire, utiliser et jeter' est insoutenable sur une planète aux ressources finies. L'économie circulaire propose un changement de paradigme radical : dissocier la croissance économique de la consommation de ressources. Il s'agit de concevoir des produits pour être réutilisés, réparés et recyclés, fermant le cycle de vie des matériaux. Cela atténue non seulement l'impact environnemental, mais encourage aussi l'innovation et la résilience entrepreneuriale. Cependant, la transition requiert une transformation systémique qui va au-delà du recyclage domestique ; elle implique de repenser les chaînes d'approvisionnement et les habitudes de consommation. Si nous n'adoptons pas cette circularité, nous ferons face à une pénurie de matières premières et à une crise des déchets ingérable.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 510,
    "level": "C1",
    "title_es": "La Filosofía Estoica",
    "title_fr": "La Philosophie Stoïcienne",
    "text_es": "El estoicismo, lejos de ser una doctrina de resignación pasiva, es una filosofía de acción y fortaleza mental. Séneca y Marco Aurelio nos enseñan a distinguir entre lo que está bajo nuestro control y lo que no, instándonos a aceptar lo inevitable con serenidad (ataraxia). En un mundo moderno saturado de estímulos y ansiedad, el estoicismo ofrece un refugio de racionalidad. No se trata de suprimir las emociones, sino de no ser esclavos de ellas. La virtud es el único bien supremo, y todo lo demás —riqueza, salud, reputación— son 'indiferentes preferibles'. Adoptar esta perspectiva nos dota de una invulnerabilidad interior frente a las vicisitudes de la fortuna, permitiéndonos vivir conforme a la naturaleza y la razón.",
    "text_fr": "Le stoïcisme, loin d'être une doctrine de résignation passive, est une philosophie d'action et de force mentale. Sénèque et Marc Aurèle nous enseignent à distinguer entre ce qui est sous notre contrôle et ce qui ne l'est pas, nous incitant à accepter l'inévitable avec sérénité (ataraxie). Dans un monde moderne saturé de stimuli et d'anxiété, le stoïcisme offre un refuge de rationalité. Il ne s'agit pas de supprimer les émotions, mais de ne pas en être esclaves. La vertu est le seul bien suprême, et tout le reste — richesse, santé, réputation — sont des 'indifférents préférables'. Adopter cette perspective nous dote d'une invulnérabilité intérieure face aux vicissitudes de la fortune, nous permettant de vivre conformément à la nature et à la raison.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 511,
    "level": "C1",
    "title_es": "La Pintura de Goya",
    "title_fr": "La Peinture de Goya",
    "text_es": "Francisco de Goya es el precursor ineludible del arte contemporáneo, un testigo lúcido y atormentado de su época. Su evolución artística, desde los cartones para tapices rococó hasta las sombrías 'Pinturas Negras', refleja un descenso a los abismos de la condición humana. En obras como 'El 3 de mayo en Madrid', Goya rompe con la glorificación heroica de la guerra para mostrar su brutalidad y sinsentido. Su sordera lo aisló del mundo exterior, agudizando su visión interior y crítica. Los 'Caprichos' son una sátira feroz de la superstición y la ignorancia. Goya no pinta para complacer, sino para sacudir la conciencia, utilizando una pincelada suelta y expresiva que anticipa el impresionismo y el expresionismo.",
    "text_fr": "Francisco de Goya est le précurseur incontournable de l'art contemporain, un témoin lucide et tourmenté de son époque. Son évolution artistique, des cartons pour tapisseries rococo jusqu'aux sombres 'Peintures Noires', reflète une descente dans les abîmes de la condition humaine. Dans des œuvres comme 'Le 3 mai à Madrid', Goya rompt avec la glorification héroïque de la guerre pour montrer sa brutalité et son non-sens. Sa surdité l'a isolé du monde extérieur, aiguisant sa vision intérieure et critique. Les 'Caprices' sont une satire féroce de la superstition et de l'ignorance. Goya ne peint pas pour plaire, mais pour secouer la conscience, utilisant une touche lâche et expressive qui anticipe l'impressionnisme et l'expressionnisme.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 512,
    "level": "C1",
    "title_es": "Matices del Humor Español",
    "title_fr": "Les Nuances de l'Humour Espagnol",
    "text_es": "El humor español es un fenómeno complejo, a menudo caracterizado por la ironía, el sarcasmo y una cierta tendencia al surrealismo o 'esperpento'. Tiene una fuerte raíz costumbrista, riéndose de los propios defectos y estereotipos nacionales. El doble sentido y los juegos de palabras son omnipresentes, exigiendo un dominio lingüístico alto para ser captados. A diferencia del humor anglosajón, que puede ser más seco ('deadpan'), el español suele ser más histriónico y directo. Sin embargo, también existe una vertiente de humor negro muy sofisticada, herencia de una historia turbulenta, que sirve como mecanismo de defensa y catarsis social. Entender este humor es clave para comprender la resiliencia y el carácter del pueblo español.",
    "text_fr": "L'humour espagnol est un phénomène complexe, souvent caractérisé par l'ironie, le sarcasme et une certaine tendance au surréalisme ou 'esperpento'. Il a une forte racine costumbriste, riant de ses propres défauts et stéréotypes nationaux. Le double sens et les jeux de mots sont omniprésents, exigeant une maîtrise linguistique élevée pour être saisis. Contrairement à l'humour anglo-saxon, qui peut être plus sec ('deadpan'), l'espagnol est généralement plus histrionique et direct. Cependant, il existe aussi un versant d'humour noir très sophistiqué, héritage d'une histoire turbulente, qui sert de mécanisme de défense et de catharsis sociale. Comprendre cet humour est clé pour comprendre la résilience et le caractère du peuple espagnol.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 513,
    "level": "C1",
    "title_es": "Retórica Política",
    "title_fr": "La Rhétorique Politique",
    "text_es": "El discurso político contemporáneo ha sufrido una degradación preocupante, pasando de la argumentación lógica a la apelación puramente emocional. La retórica actual abusa de falacias, eufemismos y la posverdad para manipular la opinión pública. Figuras retóricas como la hipérbole y la ad hominem son moneda corriente en los debates parlamentarios, polarizando a la sociedad. El lenguaje se utiliza no para esclarecer, sino para ofuscar y crear marcos mentales ('framing') que favorezcan una ideología. Analizar estos discursos requiere una competencia lingüística crítica para deconstruir las estrategias de persuasión y detectar los sesgos cognitivos. La salud democrática depende de la capacidad de los ciudadanos para discernir entre la oratoria vacua y las propuestas sustanciales.",
    "text_fr": "Le discours politique contemporain a subi une dégradation inquiétante, passant de l'argumentation logique à l'appel purement émotionnel. La rhétorique actuelle abuse de sophismes, d'euphémismes et de la post-vérité pour manipuler l'opinion publique. Des figures de rhétorique comme l'hyperbole et l'ad hominem sont monnaie courante dans les débats parlementaires, polarisant la société. Le langage est utilisé non pour éclaircir, mais pour offusquer et créer des cadres mentaux ('framing') qui favorisent une idéologie. Analyser ces discours requiert une compétence linguistique critique pour déconstruire les stratégies de persuasion et détecter les biais cognitifs. La santé démocratique dépend de la capacité des citoyens à discerner entre l'éloquence vide et les propositions substantielles.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 514,
    "level": "C1",
    "title_es": "Algoritmos y Democracia",
    "title_fr": "L'Impact des Algorithmes sur la Démocratie",
    "text_es": "La influencia de los algoritmos en los procesos democráticos es un tema de candente actualidad. Las redes sociales, regidas por algoritmos opacos diseñados para maximizar la atención ('engagement'), crean cámaras de eco que aíslan a los usuarios de opiniones divergentes. Esto fomenta la radicalización y dificulta el consenso social necesario para la democracia. Además, la microsegmentación permite campañas de manipulación política quirúrgicas, como se vio en el escándalo de Cambridge Analytica. La esfera pública digital, lejos de ser un ágora libre, está privatizada y mercantilizada. Regular estos algoritmos para garantizar la pluralidad y la transparencia es uno de los mayores retos legislativos del siglo XXI para proteger la integridad de las elecciones.",
    "text_fr": "L'influence des algorithmes sur les processus démocratiques est un sujet d'actualité brûlante. Les réseaux sociaux, régis par des algorithmes opaques conçus pour maximiser l'attention ('engagement'), créent des chambres d'écho qui isolent les utilisateurs des opinions divergentes. Cela encourage la radicalisation et rend difficile le consensus social nécessaire à la démocratie. De plus, le microciblage permet des campagnes de manipulation politique chirurgicales, comme on l'a vu dans le scandale de Cambridge Analytica. La sphère publique numérique, loin d'être une agora libre, est privatisée et marchandisée. Réguler ces algorithmes pour garantir la pluralité et la transparence est l'un des plus grands défis législatifs du XXIe siècle pour protéger l'intégrité des élections.",
    "difficulty": "Expert (C1)"
  },
  {
    "id": 515,
    "level": "C1",
    "title_es": "La Poesía de Lorca",
    "title_fr": "La Poésie de Federico García Lorca",
    "text_es": "Federico García Lorca es la voz más vibrante de la Generación del 27, fusionando la tradición popular andaluza con la vanguardia surrealista. Su poesía está impregnada de un simbolismo trágico: la luna, el caballo, el agua estancada y la sangre son presagios recurrentes de muerte y frustración erótica. En el 'Romancero Gitano', eleva al pueblo gitano a la categoría de mito, mientras que en 'Poeta en Nueva York', denuncia la deshumanización de la urbe capitalista con imágenes oníricas y violentas. Su obra aborda la marginación y el deseo reprimido con una sensibilidad exquisita. El asesinato de Lorca al inicio de la Guerra Civil lo convirtió en un mártir, pero es su inagotable caudal metafórico lo que lo hace inmortal.",
    "text_fr": "Federico García Lorca est la voix la plus vibrante de la Génération de 27, fusionnant la tradition populaire andalouse avec l'avant-garde surréaliste. Sa poésie est imprégnée d'un symbolisme tragique : la lune, le cheval, l'eau stagnante et le sang sont des présages récurrents de mort et de frustration érotique. Dans le 'Romancero Gitano', il élève le peuple gitan au rang de mythe, tandis que dans 'Poeta en Nueva York', il dénonce la déshumanisation de la ville capitaliste avec des images oniriques et violentes. Son œuvre aborde la marginalisation et le désir réprimé avec une sensibilité exquise. L'assassinat de Lorca au début de la Guerre Civile a fait de lui un martyr, mais c'est son inépuisable débit métaphorique qui le rend immortel.",
    "difficulty": "Expert (C1)"
  }
]
