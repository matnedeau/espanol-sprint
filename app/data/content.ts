/* eslint-disable */
// @ts-nocheck

/* 📚 CONTENT EXPANSION PACK 
   Généré pour EspañolSprint - Vocabulaire Enrichi & Lectures Longues & Conjugaisons Complètes & Mode Histoire
*/

export const STORIES_DATA = [
  // --- NIVEAU A1 ---
  {
    id: "story-1",
    title: "Commander au Café (Pedir un café)",
    level: "A1",
    characters: {
      carlos: {
        name: "Carlos",
        avatar: "🤵",
        color: "bg-blue-100 text-blue-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      elena: {
        name: "Elena",
        avatar: "👩",
        color: "bg-pink-100 text-pink-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "carlos", text_es: "¡Hola! ¿Qué desea tomar?", text_fr: "Bonjour ! Que désirez-vous prendre ?" },
      { type: "bubble", speaker: "elena", text_es: "Hola. Quiero un café con leche, por favor.", text_fr: "Bonjour. Je veux un café au lait, s'il vous plaît." },
      { type: "bubble", speaker: "carlos", text_es: "¿Quiere algo para comer?", text_fr: "Voulez-vous quelque chose à manger ?" },
      {
        type: "question",
        question: "Que commande Elena ?",
        options: ["Un thé", "Un café au lait", "Un jus d'orange"],
        answer: "Un café au lait"
      },
      { type: "bubble", speaker: "elena", text_es: "Sí, una tostada con tomate.", text_fr: "Oui, une tartine à la tomate." },
      { type: "bubble", speaker: "carlos", text_es: "Muy bien. ¿Algo más?", text_fr: "Très bien. Autre chose ?" },
      { type: "bubble", speaker: "elena", text_es: "No, gracias. ¿Cuánto es?", text_fr: "Non, merci. C'est combien ?" },
      {
        type: "question",
        question: "Que mange-t-elle avec son café ?",
        options: ["Un croissant", "Une tartine", "Un gâteau"],
        answer: "Une tartine"
      },
      { type: "bubble", speaker: "carlos", text_es: "Son tres euros cincuenta.", text_fr: "Cela fait trois euros cinquante." },
      { type: "bubble", speaker: "elena", text_es: "Aquí tiene. Gracias.", text_fr: "Voilà. Merci." }
    ]
  },
  {
    id: "story-2",
    title: "Perdu dans la ville (Perdido en la ciudad)",
    level: "A1",
    characters: {
      marc: {
        name: "Marc",
        avatar: "🧔",
        color: "bg-green-100 text-green-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      ana: {
        name: "Ana",
        avatar: "👩‍🦱",
        color: "bg-orange-100 text-orange-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "marc", text_es: "Perdone, señora. Estoy perdido.", text_fr: "Excusez-moi, madame. Je suis perdu." },
      { type: "bubble", speaker: "ana", text_es: "Hola. ¿Qué busca usted?", text_fr: "Bonjour. Que cherchez-vous ?" },
      { type: "bubble", speaker: "marc", text_es: "Busco el Museo del Prado.", text_fr: "Je cherche le Musée du Prado." },
      {
        type: "question",
        question: "Que cherche Marc ?",
        options: ["La gare", "L'hôtel", "Le musée"],
        answer: "Le musée"
      },
      { type: "bubble", speaker: "ana", text_es: "Está cerca. Siga todo recto.", text_fr: "C'est proche. Continuez tout droit." },
      { type: "bubble", speaker: "marc", text_es: "¿Y después?", text_fr: "Et après ?" },
      { type: "bubble", speaker: "ana", text_es: "Gire a la derecha en la plaza.", text_fr: "Tournez à droite sur la place." },
      {
        type: "question",
        question: "Quelle direction doit-il prendre après ?",
        options: ["À gauche", "Tout droit", "À droite"],
        answer: "À droite"
      },
      { type: "bubble", speaker: "marc", text_es: "Muchas gracias por su ayuda.", text_fr: "Merci beaucoup pour votre aide." },
      { type: "bubble", speaker: "ana", text_es: "De nada. ¡Buen día!", text_fr: "De rien. Bonne journée !" }
    ]
  },
  {
    id: "story-3",
    title: "Au marché (En el mercado)",
    level: "A1",
    characters: {
      luis: {
        name: "Luis",
        avatar: "👨‍🌾",
        color: "bg-yellow-100 text-yellow-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      marta: {
        name: "Marta",
        avatar: "👩",
        color: "bg-purple-100 text-purple-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "luis", text_es: "¡Buenos días! Fruta fresca hoy.", text_fr: "Bonjour ! Fruits frais aujourd'hui." },
      { type: "bubble", speaker: "marta", text_es: "Hola. ¿A cuánto están las manzanas?", text_fr: "Bonjour. À combien sont les pommes ?" },
      { type: "bubble", speaker: "luis", text_es: "A dos euros el kilo.", text_fr: "À deux euros le kilo." },
      {
        type: "question",
        question: "Quel est le prix des pommes ?",
        options: ["1€ / kg", "2€ / kg", "3€ / kg"],
        answer: "2€ / kg"
      },
      { type: "bubble", speaker: "marta", text_es: "Deme un kilo, por favor.", text_fr: "Donnez-m'en un kilo, s'il vous plaît." },
      { type: "bubble", speaker: "luis", text_es: "¿Quiere naranjas también?", text_fr: "Voulez-vous des oranges aussi ?" },
      { type: "bubble", speaker: "marta", text_es: "No, solo manzanas hoy.", text_fr: "Non, seulement des pommes aujourd'hui." },
      {
        type: "question",
        question: "Marta achète-t-elle des oranges ?",
        options: ["Oui", "Non", "Elle hésite"],
        answer: "Non"
      },
      { type: "bubble", speaker: "luis", text_es: "Aquí tiene. Son dos euros.", text_fr: "Voici. Cela fait deux euros." },
      { type: "bubble", speaker: "marta", text_es: "Gracias, adiós.", text_fr: "Merci, au revoir." }
    ]
  },
  {
    id: "story-4",
    title: "Les Présentations (Las Presentaciones)",
    level: "A1",
    characters: {
      pedro: {
        name: "Pedro",
        avatar: "👨",
        color: "bg-teal-100 text-teal-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      julia: {
        name: "Julia",
        avatar: "👩",
        color: "bg-red-100 text-red-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "julia", text_es: "¡Hola! Eres el nuevo vecino, ¿verdad?", text_fr: "Salut ! Tu es le nouveau voisin, c'est ça ?" },
      { type: "bubble", speaker: "pedro", text_es: "Sí, me llamo Pedro. Mucho gusto.", text_fr: "Oui, je m'appelle Pedro. Enchanté." },
      { type: "bubble", speaker: "julia", text_es: "Yo soy Julia. ¿De dónde eres?", text_fr: "Moi c'est Julia. D'où viens-tu ?" },
      {
        type: "question",
        question: "Qui est le nouveau voisin ?",
        options: ["Julia", "Pedro", "Carlos"],
        answer: "Pedro"
      },
      { type: "bubble", speaker: "pedro", text_es: "Soy de México. ¿Y tú?", text_fr: "Je suis du Mexique. Et toi ?" },
      { type: "bubble", speaker: "julia", text_es: "Soy española, de Madrid.", text_fr: "Je suis espagnole, de Madrid." },
      { type: "bubble", speaker: "pedro", text_es: "¿A qué te dedicas, Julia?", text_fr: "Que fais-tu dans la vie, Julia ?" },
      {
        type: "question",
        question: "D'où vient Julia ?",
        options: ["Du Mexique", "De Madrid", "De Barcelone"],
        answer: "De Madrid"
      },
      { type: "bubble", speaker: "julia", text_es: "Soy enfermera en el hospital.", text_fr: "Je suis infirmière à l'hôpital." },
      { type: "bubble", speaker: "pedro", text_es: "¡Qué interesante! Nos vemos pronto.", text_fr: "C'est intéressant ! À bientôt." }
    ]
  },

  // --- NIVEAU A2 ---
  {
    id: "story-5",
    title: "Entretien d'embauche (Entrevista de trabajo)",
    level: "A2",
    characters: {
      director: {
        name: "Sr. Garcia",
        avatar: "👴",
        color: "bg-gray-100 text-gray-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      laura: {
        name: "Laura",
        avatar: "👩‍💼",
        color: "bg-indigo-100 text-indigo-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "director", text_es: "Bienvenida, Laura. Siéntese, por favor.", text_fr: "Bienvenue, Laura. Asseyez-vous, s'il vous plaît." },
      { type: "bubble", speaker: "laura", text_es: "Gracias, Señor Garcia.", text_fr: "Merci, Monsieur Garcia." },
      { type: "bubble", speaker: "director", text_es: "Hábleme de su experiencia laboral.", text_fr: "Parlez-moi de votre expérience professionnelle." },
      {
        type: "question",
        question: "De quoi doivent-ils parler ?",
        options: ["Des vacances", "De l'expérience pro", "De la famille"],
        answer: "De l'expérience pro"
      },
      { type: "bubble", speaker: "laura", text_es: "Trabajé tres años en marketing digital.", text_fr: "J'ai travaillé trois ans en marketing digital." },
      { type: "bubble", speaker: "director", text_es: "Interesante. ¿Habla usted inglés?", text_fr: "Intéressant. Parlez-vous anglais ?" },
      { type: "bubble", speaker: "laura", text_es: "Sí, tengo un nivel avanzado.", text_fr: "Oui, j'ai un niveau avancé." },
      {
        type: "question",
        question: "Quel est le niveau d'anglais de Laura ?",
        options: ["Débutant", "Intermédiaire", "Avancé"],
        answer: "Avancé"
      },
      { type: "bubble", speaker: "director", text_es: "¿Puede empezar el lunes?", text_fr: "Pouvez-vous commencer lundi ?" },
      { type: "bubble", speaker: "laura", text_es: "¡Por supuesto! Muchas gracias.", text_fr: "Bien sûr ! Merci beaucoup." }
    ]
  },
  {
    id: "story-6",
    title: "Rendez-vous romantique (Cita romántica)",
    level: "A2",
    characters: {
      diego: {
        name: "Diego",
        avatar: "🧔",
        color: "bg-cyan-100 text-cyan-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      clara: {
        name: "Clara",
        avatar: "👩‍🦰",
        color: "bg-rose-100 text-rose-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "diego", text_es: "Estás muy guapa esta noche, Clara.", text_fr: "Tu es très belle ce soir, Clara." },
      { type: "bubble", speaker: "clara", text_es: "Gracias, Diego. Tú también.", text_fr: "Merci, Diego. Toi aussi." },
      { type: "bubble", speaker: "diego", text_es: "¿Te gusta la comida italiana?", text_fr: "Tu aimes la cuisine italienne ?" },
      {
        type: "question",
        question: "De quel type de cuisine parlent-ils ?",
        options: ["Française", "Italienne", "Japonaise"],
        answer: "Italienne"
      },
      { type: "bubble", speaker: "clara", text_es: "Me encanta. La pasta es mi favorita.", text_fr: "J'adore. Les pâtes sont mes préférées." },
      { type: "bubble", speaker: "diego", text_es: "Dime, ¿qué haces en tu tiempo libre?", text_fr: "Dis-moi, que fais-tu de ton temps libre ?" },
      { type: "bubble", speaker: "clara", text_es: "Me gusta mucho ir al cine y leer.", text_fr: "J'aime beaucoup aller au cinéma et lire." },
      {
        type: "question",
        question: "Quel est le passe-temps de Clara ?",
        options: ["Le sport", "La lecture", "La danse"],
        answer: "La lecture"
      },
      { type: "bubble", speaker: "diego", text_es: "A mí también. Deberíamos ir juntos.", text_fr: "Moi aussi. Nous devrions y aller ensemble." },
      { type: "bubble", speaker: "clara", text_es: "¡Me parece una buena idea!", text_fr: "Ça me semble être une bonne idée !" }
    ]
  },
  {
    id: "story-7",
    title: "Chez le médecin (En el médico)",
    level: "A2",
    characters: {
      doctor: {
        name: "Dr. Lopez",
        avatar: "👨‍⚕️",
        color: "bg-emerald-100 text-emerald-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      sofia: {
        name: "Sofía",
        avatar: "🤒",
        color: "bg-red-50 text-red-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "doctor", text_es: "Buenos días. ¿Qué le pasa?", text_fr: "Bonjour. Qu'est-ce qui ne va pas ?" },
      { type: "bubble", speaker: "sofia", text_es: "Me duele mucho la cabeza y tengo frío.", text_fr: "J'ai très mal à la tête et j'ai froid." },
      { type: "bubble", speaker: "doctor", text_es: "Vamos a ver... ¿Tiene fiebre?", text_fr: "Voyons voir... Avez-vous de la fièvre ?" },
      {
        type: "question",
        question: "Où Sofía a-t-elle mal ?",
        options: ["Au ventre", "À la tête", "Au pied"],
        answer: "À la tête"
      },
      { type: "bubble", speaker: "sofia", text_es: "Sí, tengo treinta y nueve grados.", text_fr: "Oui, j'ai trente-neuf degrés." },
      { type: "bubble", speaker: "doctor", text_es: "Es una gripe fuerte.", text_fr: "C'est une forte grippe." },
      { type: "bubble", speaker: "doctor", text_es: "Debe tomar estas pastillas y descansar.", text_fr: "Vous devez prendre ces comprimés et vous reposer." },
      {
        type: "question",
        question: "Que doit faire Sofía ?",
        options: ["Courir", "Se reposer", "Travailler"],
        answer: "Se reposer"
      },
      { type: "bubble", speaker: "sofia", text_es: "Gracias doctor. ¿Cuántos días?", text_fr: "Merci docteur. Combien de jours ?" },
      { type: "bubble", speaker: "doctor", text_es: "Al menos tres días en cama.", text_fr: "Au moins trois jours au lit." }
    ]
  },

  // --- NIVEAU B1 ---
  {
    id: "story-8",
    title: "Une dispute (Una discusión)",
    level: "B1",
    characters: {
      javier: {
        name: "Javier",
        avatar: "🙎‍♂️",
        color: "bg-slate-100 text-slate-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      lucia: {
        name: "Lucía",
        avatar: "🙎‍♀️",
        color: "bg-red-100 text-red-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "lucia", text_es: "Javier, ¡llegas tarde otra vez!", text_fr: "Javier, tu es encore en retard !" },
      { type: "bubble", speaker: "javier", text_es: "Lo siento, Lucía. Había mucho tráfico.", text_fr: "Désolé, Lucía. Il y avait beaucoup de circulation." },
      { type: "bubble", speaker: "lucia", text_es: "Siempre tienes una excusa.", text_fr: "Tu as toujours une excuse." },
      {
        type: "question",
        question: "Pourquoi Lucía est-elle fâchée ?",
        options: ["Javier est parti", "Javier est en retard", "Javier a oublié"],
        answer: "Javier est en retard"
      },
      { type: "bubble", speaker: "lucia", text_es: "Estoy cansada de esperarte en la calle.", text_fr: "Je suis fatiguée de t'attendre dans la rue." },
      { type: "bubble", speaker: "javier", text_es: "No volverá a pasar, te lo prometo.", text_fr: "Ça ne se reproduira plus, je te le promets." },
      { type: "bubble", speaker: "lucia", text_es: "Eso dijiste la última vez.", text_fr: "C'est ce que tu as dit la dernière fois." },
      {
        type: "question",
        question: "Est-ce la première fois que Javier est en retard ?",
        options: ["Oui", "Non", "On ne sait pas"],
        answer: "Non"
      },
      { type: "bubble", speaker: "javier", text_es: "Venga, te invito a cenar para compensar.", text_fr: "Allez, je t'invite à dîner pour compenser." },
      { type: "bubble", speaker: "lucia", text_es: "Está bien... pero que no se repita.", text_fr: "D'accord... mais que ça ne se répète pas." }
    ]
  },
  {
    id: "story-9",
    title: "Négociation de salaire (Negociación salarial)",
    level: "B1",
    characters: {
      ruiz: {
        name: "Sr. Ruiz",
        avatar: "👔",
        color: "bg-blue-50 text-blue-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      carmen: {
        name: "Carmen",
        avatar: "👩‍💻",
        color: "bg-violet-100 text-violet-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "carmen", text_es: "Señor Ruiz, ¿tiene un momento?", text_fr: "Monsieur Ruiz, avez-vous un moment ?" },
      { type: "bubble", speaker: "ruiz", text_es: "Sí, Carmen. Pase y siéntese.", text_fr: "Oui, Carmen. Entrez et asseyez-vous." },
      { type: "bubble", speaker: "carmen", text_es: "Quería hablar sobre mi salario actual.", text_fr: "Je voulais parler de mon salaire actuel." },
      {
        type: "question",
        question: "De quoi veut parler Carmen ?",
        options: ["De ses vacances", "De son salaire", "D'un projet"],
        answer: "De son salaire"
      },
      { type: "bubble", speaker: "carmen", text_es: "He superado los objetivos de ventas este año.", text_fr: "J'ai dépassé les objectifs de vente cette année." },
      { type: "bubble", speaker: "ruiz", text_es: "Es cierto, ha hecho un gran trabajo.", text_fr: "C'est vrai, vous avez fait un excellent travail." },
      { type: "bubble", speaker: "carmen", text_es: "Por eso creo que merezco un aumento.", text_fr: "C'est pourquoi je crois que je mérite une augmentation." },
      {
        type: "question",
        question: "Quel argument utilise Carmen ?",
        options: ["Son ancienneté", "Ses résultats", "Ses diplômes"],
        answer: "Ses résultats"
      },
      { type: "bubble", speaker: "ruiz", text_es: "Lo entiendo. Podemos ofrecerle un 10% más.", text_fr: "Je comprends. Nous pouvons vous offrir 10% de plus." },
      { type: "bubble", speaker: "carmen", text_es: "Me parece justo. Muchas gracias.", text_fr: "Cela me semble juste. Merci beaucoup." }
    ]
  },
  {
    id: "story-10",
    title: "Raconter un voyage (Contar un viaje)",
    level: "B1",
    characters: {
      hugo: {
        name: "Hugo",
        avatar: "🎒",
        color: "bg-amber-100 text-amber-900",
        voiceId: "ErXwobaYiN019PkySvjV"
      },
      valeria: {
        name: "Valeria",
        avatar: "👩",
        color: "bg-fuchsia-100 text-fuchsia-900",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    },
    dialogue: [
      { type: "bubble", speaker: "valeria", text_es: "¡Hugo! ¡Cuánto tiempo! ¿Qué tal Perú?", text_fr: "Hugo ! Ça fait longtemps ! Comment c'était le Pérou ?" },
      { type: "bubble", speaker: "hugo", text_es: "¡Increíble, Valeria! Machu Picchu es mágico.", text_fr: "Incroyable, Valeria ! Le Machu Picchu est magique." },
      { type: "bubble", speaker: "valeria", text_es: "¿Tuviste problemas con la altura?", text_fr: "Tu as eu des problèmes avec l'altitude ?" },
      {
        type: "question",
        question: "De quel pays revient Hugo ?",
        options: ["Du Mexique", "Du Chili", "Du Pérou"],
        answer: "Du Pérou"
      },
      { type: "bubble", speaker: "hugo", text_es: "Un poco al principio, me dolía la cabeza.", text_fr: "Un peu au début, j'avais mal à la tête." },
      { type: "bubble", speaker: "valeria", text_es: "¿Y qué tal la comida?", text_fr: "Et la nourriture ?" },
      { type: "bubble", speaker: "hugo", text_es: "Deliciosa. Comí ceviche todos los días.", text_fr: "Délicieuse. J'ai mangé du ceviche tous les jours." },
      {
        type: "question",
        question: "Qu'a mangé Hugo ?",
        options: ["Des tacos", "Du ceviche", "De la paella"],
        answer: "Du ceviche"
      },
      { type: "bubble", speaker: "valeria", text_es: "¡Qué envidia! Tienes que enseñarme las fotos.", text_fr: "Quelle chance (jalousie) ! Tu dois me montrer les photos." },
      { type: "bubble", speaker: "hugo", text_es: "Claro, ven a casa este fin de semana.", text_fr: "Bien sûr, viens à la maison ce week-end." }
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