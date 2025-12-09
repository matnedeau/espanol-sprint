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
      pablo: { name: "Pablo", avatar: "👨‍🦱", color: "bg-blue-100 text-blue-900" },
      sofia: { name: "Sofía", avatar: "👩‍🦰", color: "bg-pink-100 text-pink-900" }
    },
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

  // NIVEAU A2 (Élémentaire)
  { id: 201, level: "A2", title_es: "Un Viaje a México", title_fr: "Un Voyage au Mexique", text_es: "El verano pasado viajé a México con mi hermana. Fue un viaje increíble. Visitamos las antiguas pirámides de Teotihuacán y nadamos en los cenotes azules de Yucatán. La comida era picante pero deliciosa; probamos tacos auténticos y guacamole. La gente fue muy acogedora con nosotras. Fue una experiencia inolvidable conocer otra cultura tan rica y colorida.", text_fr: "L'été dernier, j'ai voyagé au Mexique avec ma sœur. C'était un voyage incroyable. Nous avons visité les anciennes pyramides de Teotihuacán et nagé dans les cénotes bleus du Yucatán. La nourriture était épicée mais délicieuse ; nous avons goûté des tacos authentiques et du guacamole. Les gens ont été très accueillants avec nous. C'était une expérience inoubliable de connaître une autre culture si riche et colorée.", difficulty: "Élémentaire (A2)" },
  { id: 202, level: "A2", title_es: "Buscando Apartamento", title_fr: "Chercher un Appartement", text_es: "Busco un piso en el centro de la ciudad para alquilar. Necesito que tenga dos habitaciones, un baño moderno y mucha luz natural. Ayer vi uno, pero era demasiado caro y la calle era muy ruidosa. Mañana tengo otra cita con la agencia inmobiliaria para ver un ático con terraza. Espero encontrar algo pronto.", text_fr: "Je cherche un appartement au centre-ville à louer. J'ai besoin qu'il ait deux chambres, une salle de bain moderne et beaucoup de lumière naturelle. Hier j'en ai vu un, mais il était trop cher et la rue était très bruyante. Demain j'ai un autre rendez-vous avec l'agence immobilière pour voir un attique avec terrasse. J'espère trouver quelque chose bientôt.", difficulty: "Élémentaire (A2)" },
  { id: 203, level: "A2", title_es: "El Clima Loco", title_fr: "Le Climat Fou", text_es: "Esta semana el clima está muy extraño en mi ciudad. El lunes hizo mucho sol y calor, parecía verano. Pero el martes llovió todo el día y bajaron las temperaturas. Ahora dicen en las noticias que el fin de semana nevará en la montaña. Tengo que preparar mi ropa de invierno y sacar el paraguas.", text_fr: "Cette semaine, le climat est très étrange dans ma ville. Lundi il a fait très beau et chaud, on aurait dit l'été. Mais mardi il a plu toute la journée et les températures ont baissé. Maintenant, ils disent aux informations que le week-end il neigera à la montagne. Je dois préparer mes vêtements d'hiver et sortir le parapluie.", difficulty: "Élémentaire (A2)" },
  { id: 204, level: "A2", title_es: "Una Entrevista de Trabajo", title_fr: "Un Entretien d'Embauche", text_es: "—Buenos días. ¿Por qué quiere trabajar con nosotros?\n—Porque admiro su empresa y tengo experiencia en ventas internacionales. Hablo inglés y español con fluidez y me gusta trabajar en equipo.\n—Excelente perfil. ¿Puede empezar el próximo lunes? Necesitamos a alguien proactivo y dinámico para el nuevo proyecto.", text_fr: "—Bonjour. Pourquoi voulez-vous travailler avec nous ?\n—Parce que j'admire votre entreprise et j'ai de l'expérience dans les ventes internationales. Je parle anglais et espagnol couramment et j'aime travailler en équipe.\n—Excellent profil. Pouvez-vous commencer lundi prochain ? Nous avons besoin de quelqu'un de proactif et dynamique pour le nouveau projet.", difficulty: "Élémentaire (A2)" },

  // NIVEAU B1 (Intermédiaire)
  { id: 301, level: "B1", title_es: "La Dieta Mediterránea", title_fr: "Le Régime Méditerranéen", text_es: "La dieta mediterránea es famosa en todo el mundo por sus grandes beneficios para la salud. Se basa principalmente en el consumo habitual de aceite de oliva, frutas frescas, verduras de temporada, pescado y cereales integrales. Estudios científicos recientes confirman que reduce significativamente el riesgo de enfermedades cardiovasculares. Además, no es solo comida, es un estilo de vida que incluye compartir la mesa tranquilamente con familia y amigos.", text_fr: "Le régime méditerranéen est célèbre dans le monde entier pour ses grands bienfaits pour la santé. Il est basé principalement sur la consommation habituelle d'huile d'olive, de fruits frais, de légumes de saison, de poisson et de céréales complètes. Des études scientifiques récentes confirment qu'il réduit significativement le risque de maladies cardiovasculaires. De plus, ce n'est pas seulement de la nourriture, c'est un mode de vie qui inclut le partage de la table tranquillement avec la famille et les amis.", difficulty: "Intermédiaire (B1)" },
  { id: 302, level: "B1", title_es: "El Futuro del Transporte", title_fr: "L'Avenir du Transport", text_es: "Las ciudades modernas están cambiando rápidamente. Los coches eléctricos y las bicicletas están reemplazando poco a poco a los vehículos tradicionales de gasolina. Muchos gobiernos europeos están invirtiendo en transporte público ecológico para reducir la contaminación del aire. Imagina un futuro cercano donde los coches se conduzcan solos y el aire de la ciudad sea limpio y silencioso. Ese futuro está más cerca de lo que pensamos.", text_fr: "Les villes modernes changent rapidement. Les voitures électriques et les vélos remplacent peu à peu les véhicules traditionnels à essence. De nombreux gouvernements européens investissent dans des transports publics écologiques pour réduire la pollution de l'air. Imaginez un futur proche où les voitures se conduisent toutes seules et l'air de la ville est propre et silencieux. Ce futur est plus proche que nous le pensons.", difficulty: "Intermédiaire (B1)" },
  { id: 303, level: "B1", title_es: "Costumbres Españolas", title_fr: "Coutumes Espagnoles", text_es: "En España, los horarios son muy diferentes al resto de Europa. Generalmente, se almuerza tarde, a las dos o tres de la tarde, y se cena a las nueve o diez de la noche. La 'siesta' es una tradición mundialmente conocida, aunque hoy en día mucha gente no tiene tiempo para dormirla debido al trabajo. Sin embargo, el ocio y la vida social en la calle, especialmente en las terrazas, son fundamentales.", text_fr: "En Espagne, les horaires sont très différents du reste de l'Europe. Généralement, on déjeune tard, à deux ou trois heures de l'après-midi, et on dîne à neuf ou dix heures du soir. La 'sieste' est une tradition mondialement connue, bien qu'aujourd'hui beaucoup de gens n'aient pas le temps de la dormir à cause du travail. Cependant, les loisirs et la vie sociale dans la rue, spécialement aux terrasses, sont fondamentaux.", difficulty: "Intermédiaire (B1)" },
  { id: 304, level: "B1", title_es: "El Reciclaje", title_fr: "Le Recyclage", text_es: "Reciclar es una responsabilidad de todos los ciudadanos. Debemos separar cuidadosamente el plástico, el papel y el vidrio en los contenedores correspondientes. Si no lo hacemos, los vertederos se llenarán y dañaremos el planeta de forma irreversible. Pequeñas acciones cotidianas, como usar bolsas de tela reutilizables o evitar plásticos de un solo uso, tienen un gran impacto positivo a largo plazo.", text_fr: "Recycler est une responsabilité de tous les citoyens. Nous devons séparer soigneusement le plastique, le papier et le verre dans les conteneurs correspondants. Si nous ne le faisons pas, les décharges se rempliront et nous endommagerons la planète de manière irréversible. De petites actions quotidiennes, comme utiliser des sacs en tissu réutilisables ou éviter les plastiques à usage unique, ont un grand impact positif à long terme.", difficulty: "Intermédiaire (B1)" },

  // NIVEAU B2 (Avancé)
  { id: 401, level: "B2", title_es: "El Impacto de la IA", title_fr: "L'Impact de l'IA", text_es: "La inteligencia artificial está revolucionando todos los sectores de nuestra sociedad, desde la medicina de precisión hasta la creación artística. Aunque ofrece herramientas increíblemente poderosas para automatizar tareas repetitivas, también plantea serios dilemas éticos sobre la privacidad de los datos y el futuro del empleo. ¿Podrá una máquina llegar a reemplazar la creatividad humana? Es un debate abierto y complejo. Lo cierto es que debemos adaptarnos a esta nueva realidad tecnológica sin perder nuestra esencia humana.", text_fr: "L'intelligence artificielle révolutionne tous les secteurs de notre société, de la médecine de précision à la création artistique. Bien qu'elle offre des outils incroyablement puissants pour automatiser des tâches répétitives, elle pose aussi de sérieux dilemmes éthiques sur la confidentialité des données et le futur de l'emploi. Une machine pourra-t-elle arriver à remplacer la créativité humaine ? C'est un débat ouvert et complexe. Ce qui est sûr, c'est que nous devons nous adapter à cette nouvelle réalité technologique sans perdre notre essence humaine.", difficulty: "Avancé (B2)" },
  { id: 402, level: "B2", title_es: "Don Quijote", title_fr: "Don Quichotte", text_es: "'En un lugar de la Mancha, de cuyo nombre no quiero acordarme...'. Así comienza Don Quijote, la obra cumbre de Miguel de Cervantes y de la literatura española. Es una sátira brillante de las novelas de caballería. El protagonista, un hidalgo enloquecido por sus lecturas, confunde molinos de viento con gigantes feroces. Esta novela nos enseña profundamente sobre el poder del idealismo y la lucha constante por los sueños, aunque a veces parezcan imposibles de alcanzar.", text_fr: "'Dans un endroit de la Manche, dont je ne veux pas me rappeler le nom...'. Ainsi commence Don Quichotte, le chef-d'œuvre de Miguel de Cervantès et de la littérature espagnole. C'est une satire brillante des romans de chevalerie. Le protagoniste, un gentilhomme rendu fou par ses lectures, confond des moulins à vent avec des géants féroces. Ce roman nous enseigne profondément le pouvoir de l'idéalisme et la lutte constante pour les rêves, même s'ils semblent parfois impossibles à atteindre.", difficulty: "Avancé (B2)" },
  { id: 403, level: "B2", title_es: "Crisis Climática", title_fr: "Crise Climatique", text_es: "Los científicos advierten unánimemente que nos acercamos a un punto de no retorno climático. El aumento constante de las temperaturas globales está provocando fenómenos meteorológicos extremos cada vez más frecuentes. Es imperativo que tanto los gobiernos como las grandes corporaciones tomen medidas drásticas e inmediatas para reducir las emisiones de carbono. La transición hacia energías renovables no es una opción política, sino una necesidad urgente para la supervivencia de nuestra civilización.", text_fr: "Les scientifiques préviennent unanimement que nous approchons d'un point de non-retour climatique. L'augmentation constante des températures mondiales provoque des phénomènes météorologiques extrêmes de plus en plus fréquents. Il est impératif que tant les gouvernements que les grandes entreprises prennent des mesures drastiques et immédiates pour réduire les émissions de carbone. La transition vers les énergies renouvelables n'est pas une option politique, mais une nécessité urgente pour la survie de notre civilisation.", difficulty: "Avancé (B2)" },
  { id: 404, level: "B2", title_es: "El Arte Flamenco", title_fr: "L'Art Flamenco", text_es: "El flamenco es mucho más que un género musical; es una expresión visceral de dolor, alegría y pasión originaria de Andalucía. Combina tres elementos clave: el cante (canto), el toque (guitarra) y el baile. Declarado Patrimonio Inmaterial de la Humanidad por la UNESCO, el flamenco emociona por su intensidad dramática. Asistir a un 'tablao' es presenciar una comunicación profunda y casi espiritual entre los artistas y el público.", text_fr: "Le flamenco est bien plus qu'un genre musical ; c'est une expression viscérale de douleur, de joie et de passion originaire d'Andalousie. Il combine trois éléments clés : le chant, le jeu de guitare et la danse. Déclaré Patrimoine Immatériel de l'Humanité par l'UNESCO, le flamenco émeut par son intensité dramatique. Assister à un 'tablao', c'est être témoin d'une communication profonde et presque spirituelle entre les artistes et le public.", difficulty: "Avancé (B2)" },

  // NIVEAU C1 (Expert)
  { id: 501, level: "C1", title_es: "Realismo Mágico", title_fr: "Réalisme Magique", text_es: "El realismo mágico es una corriente literaria fascinante donde lo extraño y lo cotidiano se entrelazan sin fisuras aparentes. Gabriel García Márquez, en su obra maestra 'Cien años de soledad', narra sucesos inverosímiles —como lluvias de flores o ascensiones al cielo— como si fueran hechos ordinarios. Esta narrativa refleja la compleja identidad de América Latina, donde el mito, la superstición y la historia conviven diariamente. Leerlo requiere suspender la incredulidad y aceptar que la realidad es mucho más maleable de lo que la razón dicta.", text_fr: "Le réalisme magique est un courant littéraire fascinant où l'étrange et le quotidien s'entrelacent sans fissures apparentes. Gabriel García Márquez, dans son chef-d'œuvre 'Cent ans de solitude', raconte des événements invraisemblables — comme des pluies de fleurs ou des ascensions au ciel — comme s'ils étaient des faits ordinaires. Cette narration reflète l'identité complexe de l'Amérique Latine, où le mythe, la superstition et l'histoire cohabitent quotidiennement. Le lire nécessite de suspendre l'incrédulité et d'accepter que la réalité est beaucoup plus malléable que ce que la raison dicte.", difficulty: "Expert (C1)" },
  { id: 502, level: "C1", title_es: "Economía Circular", title_fr: "Économie Circulaire", text_es: "Frente al modelo lineal obsoleto de 'extraer, fabricar, usar y tirar', la economía circular propone un sistema regenerativo donde los recursos se mantienen en uso el mayor tiempo posible. Se trata de rediseñar productos desde su concepción para que sean duraderos, reparables y reciclables. Este cambio de paradigma no solo beneficia al medio ambiente reduciendo residuos, sino que fomenta la innovación empresarial. Sin embargo, su implementación global enfrenta barreras logísticas, económicas y culturales significativas que requieren una cooperación internacional sin precedentes.", text_fr: "Face au modèle linéaire obsolète de 'extraire, fabriquer, utiliser et jeter', l'économie circulaire propose un système régénératif où les ressources sont maintenues en usage le plus longtemps possible. Il s'agit de repenser les produits dès leur conception pour qu'ils soient durables, réparables et recyclables. Ce changement de paradigme ne bénéficie pas seulement à l'environnement en réduisant les déchets, mais encourage l'innovation entrepreneuriale. Cependant, sa mise en œuvre mondiale affronte des barrières logistiques, économiques et culturelles significatives qui requièrent une coopération internationale sans précédent.", difficulty: "Expert (C1)" },
  { id: 503, level: "C1", title_es: "La Paradoja de la Elección", title_fr: "Le Paradoxe du Choix", text_es: "Vivimos en una era de abundancia material sin precedentes, pero ¿nos hace esto realmente más felices? La paradoja de la elección sugiere que tener demasiadas opciones genera ansiedad, parálisis por análisis y, en última instancia, insatisfacción. Al final, la satisfacción disminuye por el costo de oportunidad y el miedo constante a haber tomado la decisión equivocada. Simplificar nuestras vidas y limitar conscientemente nuestras opciones podría ser la clave contraintuitiva para recuperar el bienestar mental en la sociedad moderna.", text_fr: "Nous vivons dans une ère d'abondance matérielle sans précédent, mais cela nous rend-il vraiment plus heureux ? Le paradoxe du choix suggère qu'avoir trop d'options génère de l'anxiété, la paralysie par l'analyse et, en fin de compte, l'insatisfaction. Au final, la satisfaction diminue par le coût d'opportunité et la peur constante d'avoir pris la mauvaise décision. Simplifier nos vies et limiter consciemment nos options pourrait être la clé contre-intuitive pour récupérer le bien-être mental dans la société moderne.", difficulty: "Expert (C1)" },
  { id: 504, level: "C1", title_es: "Bioética y Genética", title_fr: "Bioéthique et Génétique", text_es: "La edición genética con herramientas como CRISPR abre la puerta a curar enfermedades hereditarias devastadoras, pero también plantea la posibilidad inquietante del diseño de bebés 'a la carta'. Este poder biotecnológico exige un marco regulatorio estricto y global. ¿Dónde trazamos la línea ética entre la terapia necesaria y la mejora eugenésica? La bioética debe guiar estos avances para evitar desigualdades biológicas profundas que podrían fracturar la sociedad en castas genéticas, separando a los 'mejorados' de los 'naturales'.", text_fr: "L'édition génétique avec des outils comme CRISPR ouvre la porte à la guérison de maladies héréditaires dévastatrices, mais pose aussi la possibilité inquiétante de la conception de bébés 'à la carte'. Ce pouvoir biotechnologique exige un cadre réglementaire strict et global. Où traçons-nous la ligne éthique entre la thérapie nécessaire et l'amélioration eugénique ? La bioéthique doit guider ces avancées pour éviter des inégalités biologiques profondes qui pourraient fracturer la société en castes génétiques, séparant les 'améliorés' des 'naturels'.", difficulty: "Expert (C1)" }
];

// --- 2. BANQUE DE DONNÉES XXL ---
export const DATA_BANK = {
  verbs: [
    // --- VERBES PRIORITAIRES (A1-A2) ---
    { levels: ["A1"], es: "Ser", en: "Être (Identité)", conjugation: [
      { pronoun: "Yo", verb: "soy", fr: "Je suis" },
      { pronoun: "Tú", verb: "eres", fr: "Tu es" },
      { pronoun: "Él", verb: "es", fr: "Il est" },
      { pronoun: "Nosotros", verb: "somos", fr: "Nous sommes" },
      { pronoun: "Vosotros", verb: "sois", fr: "Vous êtes" },
      { pronoun: "Ellos", verb: "son", fr: "Ils sont" }
    ]},
    { levels: ["A1"], es: "Estar", en: "Être (État/Lieu)", conjugation: [
      { pronoun: "Yo", verb: "estoy", fr: "Je suis" },
      { pronoun: "Tú", verb: "estás", fr: "Tu es" },
      { pronoun: "Él", verb: "está", fr: "Il est" },
      { pronoun: "Nosotros", verb: "estamos", fr: "Nous sommes" },
      { pronoun: "Vosotros", verb: "estáis", fr: "Vous êtes" },
      { pronoun: "Ellos", verb: "están", fr: "Ils sont" }
    ]},
    { levels: ["A1"], es: "Tener", en: "Avoir", conjugation: [
      { pronoun: "Yo", verb: "tengo", fr: "J'ai" },
      { pronoun: "Tú", verb: "tienes", fr: "Tu as" },
      { pronoun: "Él", verb: "tiene", fr: "Il a" },
      { pronoun: "Nosotros", verb: "tenemos", fr: "Nous avons" },
      { pronoun: "Vosotros", verb: "tenéis", fr: "Vous avez" },
      { pronoun: "Ellos", verb: "tienen", fr: "Ils ont" }
    ]},
    { levels: ["A1"], es: "Haber", en: "Avoir (Auxiliaire)", conjugation: [
      { pronoun: "Yo", verb: "he", fr: "J'ai" },
      { pronoun: "Tú", verb: "has", fr: "Tu as" },
      { pronoun: "Él", verb: "ha", fr: "Il a" },
      { pronoun: "Nosotros", verb: "hemos", fr: "Nous avons" },
      { pronoun: "Vosotros", verb: "habéis", fr: "Vous avez" },
      { pronoun: "Ellos", verb: "han", fr: "Ils ont" },
      { pronoun: "Hay", verb: "hay", fr: "Il y a" } // Forme impersonnelle souvent utilisée
    ]},
    { levels: ["A1"], es: "Hacer", en: "Faire", conjugation: [
      { pronoun: "Yo", verb: "hago", fr: "Je fais" },
      { pronoun: "Tú", verb: "haces", fr: "Tu fais" },
      { pronoun: "Él", verb: "hace", fr: "Il fait" },
      { pronoun: "Nosotros", verb: "hacemos", fr: "Nous faisons" },
      { pronoun: "Vosotros", verb: "hacéis", fr: "Vous faites" },
      { pronoun: "Ellos", verb: "hacen", fr: "Ils font" }
    ]},
    { levels: ["A1"], es: "Ir", en: "Aller", conjugation: [
      { pronoun: "Yo", verb: "voy", fr: "Je vais" },
      { pronoun: "Tú", verb: "vas", fr: "Tu vas" },
      { pronoun: "Él", verb: "va", fr: "Il va" },
      { pronoun: "Nosotros", verb: "vamos", fr: "Nous allons" },
      { pronoun: "Vosotros", verb: "vais", fr: "Vous allez" },
      { pronoun: "Ellos", verb: "van", fr: "Ils vont" }
    ]},
    { levels: ["A1"], es: "Venir", en: "Venir", conjugation: [
      { pronoun: "Yo", verb: "vengo", fr: "Je viens" },
      { pronoun: "Tú", verb: "vienes", fr: "Tu viens" },
      { pronoun: "Él", verb: "viene", fr: "Il vient" },
      { pronoun: "Nosotros", verb: "venimos", fr: "Nous venons" },
      { pronoun: "Vosotros", verb: "venís", fr: "Vous venez" },
      { pronoun: "Ellos", verb: "vienen", fr: "Ils viennent" }
    ]},
    { levels: ["A1"], es: "Decir", en: "Dire", conjugation: [
      { pronoun: "Yo", verb: "digo", fr: "Je dis" },
      { pronoun: "Tú", verb: "dices", fr: "Tu dis" },
      { pronoun: "Él", verb: "dice", fr: "Il dit" },
      { pronoun: "Nosotros", verb: "decimos", fr: "Nous disons" },
      { pronoun: "Vosotros", verb: "decís", fr: "Vous dites" },
      { pronoun: "Ellos", verb: "dicen", fr: "Ils disent" }
    ]},
    { levels: ["A1"], es: "Poder", en: "Pouvoir", conjugation: [
      { pronoun: "Yo", verb: "puedo", fr: "Je peux" },
      { pronoun: "Tú", verb: "puedes", fr: "Tu peux" },
      { pronoun: "Él", verb: "puede", fr: "Il peut" },
      { pronoun: "Nosotros", verb: "podemos", fr: "Nous pouvons" },
      { pronoun: "Vosotros", verb: "podéis", fr: "Vous pouvez" },
      { pronoun: "Ellos", verb: "pueden", fr: "Ils peuvent" }
    ]},
    { levels: ["A1"], es: "Querer", en: "Vouloir", conjugation: [
      { pronoun: "Yo", verb: "quiero", fr: "Je veux" },
      { pronoun: "Tú", verb: "quieres", fr: "Tu veux" },
      { pronoun: "Él", verb: "quiere", fr: "Il veut" },
      { pronoun: "Nosotros", verb: "queremos", fr: "Nous voulons" },
      { pronoun: "Vosotros", verb: "queréis", fr: "Vous voulez" },
      { pronoun: "Ellos", verb: "quieren", fr: "Ils veulent" }
    ]},
    { levels: ["A1"], es: "Saber", en: "Savoir", conjugation: [
      { pronoun: "Yo", verb: "sé", fr: "Je sais" },
      { pronoun: "Tú", verb: "sabes", fr: "Tu sais" },
      { pronoun: "Él", verb: "sabe", fr: "Il sait" },
      { pronoun: "Nosotros", verb: "sabemos", fr: "Nous savons" },
      { pronoun: "Vosotros", verb: "sabéis", fr: "Vous savez" },
      { pronoun: "Ellos", verb: "saben", fr: "Ils savent" }
    ]},
    { levels: ["A1"], es: "Poner", en: "Mettre", conjugation: [
      { pronoun: "Yo", verb: "pongo", fr: "Je mets" },
      { pronoun: "Tú", verb: "pones", fr: "Tu mets" },
      { pronoun: "Él", verb: "pone", fr: "Il met" },
      { pronoun: "Nosotros", verb: "ponemos", fr: "Nous mettons" },
      { pronoun: "Vosotros", verb: "ponéis", fr: "Vous mettez" },
      { pronoun: "Ellos", verb: "ponen", fr: "Ils mettent" }
    ]},
    { levels: ["A1"], es: "Ver", en: "Voir", conjugation: [
      { pronoun: "Yo", verb: "veo", fr: "Je vois" },
      { pronoun: "Tú", verb: "ves", fr: "Tu vois" },
      { pronoun: "Él", verb: "ve", fr: "Il voit" },
      { pronoun: "Nosotros", verb: "vemos", fr: "Nous voyons" },
      { pronoun: "Vosotros", verb: "veis", fr: "Vous voyez" },
      { pronoun: "Ellos", verb: "ven", fr: "Ils voient" }
    ]},
    { levels: ["A1"], es: "Dar", en: "Donner", conjugation: [
      { pronoun: "Yo", verb: "doy", fr: "Je donne" },
      { pronoun: "Tú", verb: "das", fr: "Tu donnes" },
      { pronoun: "Él", verb: "da", fr: "Il donne" },
      { pronoun: "Nosotros", verb: "damos", fr: "Nous donnons" },
      { pronoun: "Vosotros", verb: "dais", fr: "Vous donnez" },
      { pronoun: "Ellos", verb: "dan", fr: "Ils donnent" }
    ]},
    { levels: ["A1"], es: "Comer", en: "Manger", conjugation: [
      { pronoun: "Yo", verb: "como", fr: "Je mange" },
      { pronoun: "Tú", verb: "comes", fr: "Tu manges" },
      { pronoun: "Él", verb: "come", fr: "Il mange" },
      { pronoun: "Nosotros", verb: "comemos", fr: "Nous mangeons" },
      { pronoun: "Vosotros", verb: "coméis", fr: "Vous mangez" },
      { pronoun: "Ellos", verb: "comen", fr: "Ils mangent" }
    ]},
    { levels: ["A1"], es: "Vivir", en: "Vivre", conjugation: [
      { pronoun: "Yo", verb: "vivo", fr: "Je vis" },
      { pronoun: "Tú", verb: "vives", fr: "Tu vis" },
      { pronoun: "Él", verb: "vive", fr: "Il vit" },
      { pronoun: "Nosotros", verb: "vivimos", fr: "Nous vivons" },
      { pronoun: "Vosotros", verb: "vivís", fr: "Vous vivez" },
      { pronoun: "Ellos", verb: "viven", fr: "Ils vivent" }
    ]},
    { levels: ["A1"], es: "Hablar", en: "Parler", conjugation: [
      { pronoun: "Yo", verb: "hablo", fr: "Je parle" },
      { pronoun: "Tú", verb: "hablas", fr: "Tu parles" },
      { pronoun: "Él", verb: "habla", fr: "Il parle" },
      { pronoun: "Nosotros", verb: "hablamos", fr: "Nous parlons" },
      { pronoun: "Vosotros", verb: "habláis", fr: "Vous parlez" },
      { pronoun: "Ellos", verb: "hablan", fr: "Ils parlent" }
    ]},
    { levels: ["A2"], es: "Salir", en: "Sortir", conjugation: [
      { pronoun: "Yo", verb: "salgo", fr: "Je sors" },
      { pronoun: "Tú", verb: "sales", fr: "Tu sors" },
      { pronoun: "Él", verb: "sale", fr: "Il sort" },
      { pronoun: "Nosotros", verb: "salimos", fr: "Nous sortons" },
      { pronoun: "Vosotros", verb: "salís", fr: "Vous sortez" },
      { pronoun: "Ellos", verb: "salen", fr: "Ils sortent" }
    ]},
    { levels: ["A2"], es: "Llevar", en: "Porter/Emmener", conjugation: [
      { pronoun: "Yo", verb: "llevo", fr: "Je porte" },
      { pronoun: "Tú", verb: "llevas", fr: "Tu portes" },
      { pronoun: "Él", verb: "lleva", fr: "Il porte" },
      { pronoun: "Nosotros", verb: "llevamos", fr: "Nous portons" },
      { pronoun: "Vosotros", verb: "lleváis", fr: "Vous portez" },
      { pronoun: "Ellos", verb: "llevan", fr: "Ils portent" }
    ]},
    { levels: ["A2"], es: "Dejar", en: "Laisser", conjugation: [
      { pronoun: "Yo", verb: "dejo", fr: "Je laisse" },
      { pronoun: "Tú", verb: "dejas", fr: "Tu laisses" },
      { pronoun: "Él", verb: "deja", fr: "Il laisse" },
      { pronoun: "Nosotros", verb: "dejamos", fr: "Nous laissons" },
      { pronoun: "Vosotros", verb: "dejáis", fr: "Vous laissez" },
      { pronoun: "Ellos", verb: "dejan", fr: "Ils laissent" }
    ]},
    { levels: ["A2"], es: "Seguir", en: "Suivre/Continuer", conjugation: [
      { pronoun: "Yo", verb: "sigo", fr: "Je suis" },
      { pronoun: "Tú", verb: "sigues", fr: "Tu suis" },
      { pronoun: "Él", verb: "sigue", fr: "Il suit" },
      { pronoun: "Nosotros", verb: "seguimos", fr: "Nous suivons" },
      { pronoun: "Vosotros", verb: "seguís", fr: "Vous suivez" },
      { pronoun: "Ellos", verb: "siguen", fr: "Ils suivent" }
    ]},
    { levels: ["A2"], es: "Encontrar", en: "Trouver", conjugation: [
      { pronoun: "Yo", verb: "encuentro", fr: "Je trouve" },
      { pronoun: "Tú", verb: "encuentras", fr: "Tu trouves" },
      { pronoun: "Él", verb: "encuentra", fr: "Il trouve" },
      { pronoun: "Nosotros", verb: "encontramos", fr: "Nous trouvons" },
      { pronoun: "Vosotros", verb: "encontráis", fr: "Vous trouvez" },
      { pronoun: "Ellos", verb: "encuentran", fr: "Ils trouvent" }
    ]},
    { levels: ["A2"], es: "Llamar", en: "Appeler", conjugation: [
      { pronoun: "Yo", verb: "llamo", fr: "J'appelle" },
      { pronoun: "Tú", verb: "llamas", fr: "Tu appelles" },
      { pronoun: "Él", verb: "llama", fr: "Il appelle" },
      { pronoun: "Nosotros", verb: "llamamos", fr: "Nous appelons" },
      { pronoun: "Vosotros", verb: "llamáis", fr: "Vous appelez" },
      { pronoun: "Ellos", verb: "llaman", fr: "Ils appellent" }
    ]},
    { levels: ["A2"], es: "Trabajar", en: "Travailler", conjugation: [
      { pronoun: "Yo", verb: "trabajo", fr: "Je travaille" },
      { pronoun: "Tú", verb: "trabajas", fr: "Tu travailles" },
      { pronoun: "Él", verb: "trabaja", fr: "Il travaille" },
      { pronoun: "Nosotros", verb: "trabajamos", fr: "Nous travaillons" },
      { pronoun: "Vosotros", verb: "trabajáis", fr: "Vous travaillez" },
      { pronoun: "Ellos", verb: "trabajan", fr: "Ils travaillent" }
    ]},
    { levels: ["A2"], es: "Escribir", en: "Écrire", conjugation: [
      { pronoun: "Yo", verb: "escribo", fr: "J'écris" },
      { pronoun: "Tú", verb: "escribes", fr: "Tu écris" },
      { pronoun: "Él", verb: "escribe", fr: "Il écrit" },
      { pronoun: "Nosotros", verb: "escribimos", fr: "Nous écrivons" },
      { pronoun: "Vosotros", verb: "escribís", fr: "Vous écrivez" },
      { pronoun: "Ellos", verb: "escriben", fr: "Ils écrivent" }
    ]},
    { levels: ["A2"], es: "Leer", en: "Lire", conjugation: [
      { pronoun: "Yo", verb: "leo", fr: "Je lis" },
      { pronoun: "Tú", verb: "lees", fr: "Tu lis" },
      { pronoun: "Él", verb: "lee", fr: "Il lit" },
      { pronoun: "Nosotros", verb: "leemos", fr: "Nous lisons" },
      { pronoun: "Vosotros", verb: "leéis", fr: "Vous lisez" },
      { pronoun: "Ellos", verb: "leen", fr: "Ils lisent" }
    ]},
    { levels: ["A2"], es: "Jugar", en: "Jouer", conjugation: [
      { pronoun: "Yo", verb: "juego", fr: "Je joue" },
      { pronoun: "Tú", verb: "juegas", fr: "Tu joues" },
      { pronoun: "Él", verb: "juega", fr: "Il joue" },
      { pronoun: "Nosotros", verb: "jugamos", fr: "Nous jouons" },
      { pronoun: "Vosotros", verb: "jugáis", fr: "Vous jouez" },
      { pronoun: "Ellos", verb: "juegan", fr: "Ils jouent" }
    ]},
    { levels: ["A2"], es: "Dormir", en: "Dormir", conjugation: [
      { pronoun: "Yo", verb: "duermo", fr: "Je dors" },
      { pronoun: "Tú", verb: "duermes", fr: "Tu dors" },
      { pronoun: "Él", verb: "duerme", fr: "Il dort" },
      { pronoun: "Nosotros", verb: "dormimos", fr: "Nous dormons" },
      { pronoun: "Vosotros", verb: "dormís", fr: "Vous dormez" },
      { pronoun: "Ellos", verb: "duermen", fr: "Ils dorment" }
    ]},
    { levels: ["A2"], es: "Pedir", en: "Demander", conjugation: [
      { pronoun: "Yo", verb: "pido", fr: "Je demande" },
      { pronoun: "Tú", verb: "pides", fr: "Tu demandes" },
      { pronoun: "Él", verb: "pide", fr: "Il demande" },
      { pronoun: "Nosotros", verb: "pedimos", fr: "Nous demandons" },
      { pronoun: "Vosotros", verb: "pedís", fr: "Vous demandez" },
      { pronoun: "Ellos", verb: "piden", fr: "Ils demandent" }
    ]},
    { levels: ["A2"], es: "Pensar", en: "Penser", conjugation: [
      { pronoun: "Yo", verb: "pienso", fr: "Je pense" },
      { pronoun: "Tú", verb: "piensas", fr: "Tu penses" },
      { pronoun: "Él", verb: "piensa", fr: "Il pense" },
      { pronoun: "Nosotros", verb: "pensamos", fr: "Nous pensons" },
      { pronoun: "Vosotros", verb: "pensáis", fr: "Vous pensez" },
      { pronoun: "Ellos", verb: "piensan", fr: "Ils pensent" }
    ]},
    
    // --- VERBES INTERMÉDIAIRES (B1-B2) ---
    { levels: ["B1"], es: "Volver", en: "Revenir", conjugation: [
      { pronoun: "Yo", verb: "vuelvo", fr: "Je reviens" },
      { pronoun: "Tú", verb: "vuelves", fr: "Tu reviens" },
      { pronoun: "Él", verb: "vuelve", fr: "Il revient" },
      { pronoun: "Nosotros", verb: "volvemos", fr: "Nous revenons" },
      { pronoun: "Vosotros", verb: "volvéis", fr: "Vous revenez" },
      { pronoun: "Ellos", verb: "vuelven", fr: "Ils reviennent" }
    ]},
    { levels: ["B1"], es: "Empezar", en: "Commencer", conjugation: [
      { pronoun: "Yo", verb: "empiezo", fr: "Je commence" },
      { pronoun: "Tú", verb: "empiezas", fr: "Tu commences" },
      { pronoun: "Él", verb: "empieza", fr: "Il commence" },
      { pronoun: "Nosotros", verb: "empezamos", fr: "Nous commençons" },
      { pronoun: "Vosotros", verb: "empezáis", fr: "Vous commencez" },
      { pronoun: "Ellos", verb: "empiezan", fr: "Ils commencent" }
    ]},
    { levels: ["B1"], es: "Conocer", en: "Connaître", conjugation: [
      { pronoun: "Yo", verb: "conozco", fr: "Je connais" },
      { pronoun: "Tú", verb: "conoces", fr: "Tu connais" },
      { pronoun: "Él", verb: "conoce", fr: "Il connaît" },
      { pronoun: "Nosotros", verb: "conocemos", fr: "Nous connaissons" },
      { pronoun: "Vosotros", verb: "conocéis", fr: "Vous connaissez" },
      { pronoun: "Ellos", verb: "conocen", fr: "Ils connaissent" }
    ]},
    { levels: ["B1"], es: "Sentir", en: "Sentir", conjugation: [
      { pronoun: "Yo", verb: "siento", fr: "Je sens" },
      { pronoun: "Tú", verb: "sientes", fr: "Tu sens" },
      { pronoun: "Él", verb: "siente", fr: "Il sent" },
      { pronoun: "Nosotros", verb: "sentimos", fr: "Nous sentons" },
      { pronoun: "Vosotros", verb: "sentís", fr: "Vous sentez" },
      { pronoun: "Ellos", verb: "sienten", fr: "Ils sentent" }
    ]},
    { levels: ["B1"], es: "Buscar", en: "Chercher", conjugation: [
      { pronoun: "Yo", verb: "busco", fr: "Je cherche" },
      { pronoun: "Tú", verb: "buscas", fr: "Tu cherches" },
      { pronoun: "Él", verb: "busca", fr: "Il cherche" },
      { pronoun: "Nosotros", verb: "buscamos", fr: "Nous cherchons" },
      { pronoun: "Vosotros", verb: "buscáis", fr: "Vous cherchez" },
      { pronoun: "Ellos", verb: "buscan", fr: "Ils cherchent" }
    ]},
    { levels: ["B1"], es: "Necesitar", en: "Avoir besoin", conjugation: [
      { pronoun: "Yo", verb: "necesito", fr: "J'ai besoin" },
      { pronoun: "Tú", verb: "necesitas", fr: "Tu as besoin" },
      { pronoun: "Él", verb: "necesita", fr: "Il a besoin" },
      { pronoun: "Nosotros", verb: "necesitamos", fr: "Nous avons besoin" },
      { pronoun: "Vosotros", verb: "necesitáis", fr: "Vous avez besoin" },
      { pronoun: "Ellos", verb: "necesitan", fr: "Ils ont besoin" }
    ]},
    { levels: ["B1"], es: "Quedar", en: "Rester/RDV", conjugation: [
      { pronoun: "Yo", verb: "quedo", fr: "Je reste" },
      { pronoun: "Tú", verb: "quedas", fr: "Tu restes" },
      { pronoun: "Él", verb: "queda", fr: "Il reste" },
      { pronoun: "Nosotros", verb: "quedamos", fr: "Nous restons" },
      { pronoun: "Vosotros", verb: "quedáis", fr: "Vous restez" },
      { pronoun: "Ellos", verb: "quedan", fr: "Ils restent" }
    ]},
    { levels: ["B2"], es: "Esperar", en: "Attendre/Espérer", conjugation: [
      { pronoun: "Yo", verb: "espero", fr: "J'attends" },
      { pronoun: "Tú", verb: "esperas", fr: "Tu attends" },
      { pronoun: "Él", verb: "espera", fr: "Il attend" },
      { pronoun: "Nosotros", verb: "esperamos", fr: "Nous attendons" },
      { pronoun: "Vosotros", verb: "esperáis", fr: "Vous attendez" },
      { pronoun: "Ellos", verb: "esperan", fr: "Ils attendent" }
    ]},
    { levels: ["B2"], es: "Gustar", en: "Aimer", conjugation: [
      { pronoun: "A mí", verb: "me gusta", fr: "J'aime" },
      { pronoun: "A ti", verb: "te gusta", fr: "Tu aimes" },
      { pronoun: "A él", verb: "le gusta", fr: "Il aime" },
      { pronoun: "A nosotros", verb: "nos gusta", fr: "Nous aimons" },
      { pronoun: "A vosotros", verb: "os gusta", fr: "Vous aimez" },
      { pronoun: "A ellos", verb: "les gusta", fr: "Ils aiment" }
    ]},
    { levels: ["B2"], es: "Parecer", en: "Sembler", conjugation: [
      { pronoun: "Yo", verb: "parezco", fr: "Je semble" },
      { pronoun: "Tú", verb: "pareces", fr: "Tu sembles" },
      { pronoun: "Él", verb: "parece", fr: "Il semble" },
      { pronoun: "Nosotros", verb: "parecemos", fr: "Nous semblons" },
      { pronoun: "Vosotros", verb: "parecéis", fr: "Vous semblez" },
      { pronoun: "Ellos", verb: "parecen", fr: "Ils semblent" }
    ]},
    { levels: ["B2"], es: "Creer", en: "Croire", conjugation: [
      { pronoun: "Yo", verb: "creo", fr: "Je crois" },
      { pronoun: "Tú", verb: "crees", fr: "Tu crois" },
      { pronoun: "Él", verb: "cree", fr: "Il croit" },
      { pronoun: "Nosotros", verb: "creemos", fr: "Nous croyons" },
      { pronoun: "Vosotros", verb: "creéis", fr: "Vous croyez" },
      { pronoun: "Ellos", verb: "creen", fr: "Ils croient" }
    ]},
    { levels: ["B2"], es: "Tomar", en: "Prendre", conjugation: [
      { pronoun: "Yo", verb: "tomo", fr: "Je prends" },
      { pronoun: "Tú", verb: "tomas", fr: "Tu prends" },
      { pronoun: "Él", verb: "toma", fr: "Il prend" },
      { pronoun: "Nosotros", verb: "tomamos", fr: "Nous prenons" },
      { pronoun: "Vosotros", verb: "tomáis", fr: "Vous prenez" },
      { pronoun: "Ellos", verb: "toman", fr: "Ils prennent" }
    ]},
    { levels: ["C1"], es: "Recordar", en: "Se souvenir", conjugation: [
      { pronoun: "Yo", verb: "recuerdo", fr: "Je me souviens" },
      { pronoun: "Tú", verb: "recuerdas", fr: "Tu te souviens" },
      { pronoun: "Él", verb: "recuerda", fr: "Il se souvient" },
      { pronoun: "Nosotros", verb: "recordamos", fr: "Nous nous souvenons" },
      { pronoun: "Vosotros", verb: "recordáis", fr: "Vous vous souvenez" },
      { pronoun: "Ellos", verb: "recuerdan", fr: "Ils se souviennent" }
    ]},
    { levels: ["C1"], es: "Entender", en: "Comprendre", conjugation: [
      { pronoun: "Yo", verb: "entiendo", fr: "Je comprends" },
      { pronoun: "Tú", verb: "entiendes", fr: "Tu comprends" },
      { pronoun: "Él", verb: "entiende", fr: "Il comprend" },
      { pronoun: "Nosotros", verb: "entendemos", fr: "Nous comprenons" },
      { pronoun: "Vosotros", verb: "entendéis", fr: "Vous comprenez" },
      { pronoun: "Ellos", verb: "entienden", fr: "Ils comprennent" }
    ]},
    { levels: ["C1"], es: "Oír", en: "Entendre", conjugation: [
      { pronoun: "Yo", verb: "oigo", fr: "J'entends" },
      { pronoun: "Tú", verb: "oyes", fr: "Tu entends" },
      { pronoun: "Él", verb: "oye", fr: "Il entend" },
      { pronoun: "Nosotros", verb: "oímos", fr: "Nous entendons" },
      { pronoun: "Vosotros", verb: "oís", fr: "Vous entendez" },
      { pronoun: "Ellos", verb: "oyen", fr: "Ils entendent" }
    ]},
    { levels: ["C1"], es: "Traer", en: "Apporter", conjugation: [
      { pronoun: "Yo", verb: "traigo", fr: "J'apporte" },
      { pronoun: "Tú", verb: "traes", fr: "Tu apportes" },
      { pronoun: "Él", verb: "trae", fr: "Il apporte" },
      { pronoun: "Nosotros", verb: "traemos", fr: "Nous apportons" },
      { pronoun: "Vosotros", verb: "traéis", fr: "Vous apportez" },
      { pronoun: "Ellos", verb: "traen", fr: "Ils apportent" }
    ]},
    { levels: ["C1"], es: "Abrir", en: "Ouvrir", conjugation: [
      { pronoun: "Yo", verb: "abro", fr: "J'ouvre" },
      { pronoun: "Tú", verb: "abres", fr: "Tu ouvres" },
      { pronoun: "Él", verb: "abre", fr: "Il ouvre" },
      { pronoun: "Nosotros", verb: "abrimos", fr: "Nous ouvrons" },
      { pronoun: "Vosotros", verb: "abrís", fr: "Vous ouvrez" },
      { pronoun: "Ellos", verb: "abren", fr: "Ils ouvrent" }
    ]},
    { levels: ["C1"], es: "Cerrar", en: "Fermer", conjugation: [
      { pronoun: "Yo", verb: "cierro", fr: "Je ferme" },
      { pronoun: "Tú", verb: "cierras", fr: "Tu fermes" },
      { pronoun: "Él", verb: "cierra", fr: "Il ferme" },
      { pronoun: "Nosotros", verb: "cerramos", fr: "Nous fermons" },
      { pronoun: "Vosotros", verb: "cerráis", fr: "Vous fermez" },
      { pronoun: "Ellos", verb: "cierran", fr: "Ils ferment" }
    ]},
    { levels: ["C1"], es: "Nacer", en: "Naître", conjugation: [
      { pronoun: "Yo", verb: "nazco", fr: "Je nais" },
      { pronoun: "Tú", verb: "naces", fr: "Tu nais" },
      { pronoun: "Él", verb: "nace", fr: "Il naît" },
      { pronoun: "Nosotros", verb: "nacemos", fr: "Nous naissons" },
      { pronoun: "Vosotros", verb: "nacéis", fr: "Vous naissez" },
      { pronoun: "Ellos", verb: "nacen", fr: "Ils naissent" }
    ]},
    { levels: ["C1"], es: "Morir", en: "Mourir", conjugation: [
      { pronoun: "Yo", verb: "muero", fr: "Je meurs" },
      { pronoun: "Tú", verb: "mueres", fr: "Tu meurs" },
      { pronoun: "Él", verb: "muere", fr: "Il meurt" },
      { pronoun: "Nosotros", verb: "morimos", fr: "Nous mourons" },
      { pronoun: "Vosotros", verb: "morís", fr: "Vous mourez" },
      { pronoun: "Ellos", verb: "mueren", fr: "Ils meurent" }
    ]}
  ],

  nouns: {
    business: [
      { levels: ["A2"], es: "La empresa", en: "L'entreprise", sentence: "Trabajo en una empresa internacional.", sentence_trans: "Je travaille dans une entreprise internationale." },
      { levels: ["B1"], es: "El negocio", en: "L'affaire/Business", sentence: "Es un buen negocio para nosotros.", sentence_trans: "C'est une bonne affaire pour nous." },
      { levels: ["A2"], es: "La reunión", en: "La réunion", sentence: "Tengo una reunión a las diez.", sentence_trans: "J'ai une réunion à dix heures." },
      { levels: ["B2"], es: "El contrato", en: "Le contrat", sentence: "Firmamos el contrato ayer.", sentence_trans: "Nous avons signé le contrat hier." },
      { levels: ["A1"], es: "El jefe", en: "Le chef/patron", sentence: "Mi jefe es muy exigente.", sentence_trans: "Mon patron est très exigeant." },
      { levels: ["B1"], es: "El empleado", en: "L'employé", sentence: "La empresa tiene cien empleados.", sentence_trans: "L'entreprise a cent employés." },
      { levels: ["B2"], es: "El sueldo", en: "Le salaire", sentence: "Quiero un aumento de sueldo.", sentence_trans: "Je veux une augmentation de salaire." },
      { levels: ["B1"], es: "El mercado", en: "Le marché", sentence: "El mercado está cambiando rápido.", sentence_trans: "Le marché change rapidement." },
      { levels: ["C1"], es: "La inversión", en: "L'investissement", sentence: "Es una inversión de alto riesgo.", sentence_trans: "C'est un investissement à haut risque." },
      { levels: ["A2"], es: "La venta", en: "La vente", sentence: "La venta de coches ha bajado.", sentence_trans: "La vente de voitures a baissé." },
      { levels: ["A2"], es: "El cliente", en: "Le client", sentence: "El cliente siempre tiene la razón.", sentence_trans: "Le client a toujours raison." },
      { levels: ["B1"], es: "El proyecto", en: "Le projet", sentence: "Estamos terminando el proyecto.", sentence_trans: "Nous finissons le projet." },
      { levels: ["A1"], es: "La oficina", en: "Le bureau", sentence: "Voy a la oficina en metro.", sentence_trans: "Je vais au bureau en métro." },
      { levels: ["B2"], es: "El éxito", en: "Le succès", sentence: "Te deseo mucho éxito.", sentence_trans: "Je te souhaite beaucoup de succès." },
      { levels: ["C1"], es: "La estrategia", en: "La stratégie", sentence: "Necesitamos una nueva estrategia.", sentence_trans: "Nous avons besoin d'une nouvelle stratégie." }
    ],
    technology: [
      { levels: ["A1"], es: "El ordenador", en: "L'ordinateur", sentence: "Mi ordenador es muy lento.", sentence_trans: "Mon ordinateur est très lent." },
      { levels: ["A1"], es: "El móvil", en: "Le portable", sentence: "Perdí mi móvil en el tren.", sentence_trans: "J'ai perdu mon portable dans le train." },
      { levels: ["A2"], es: "La pantalla", en: "L'écran", sentence: "La pantalla está rota.", sentence_trans: "L'écran est cassé." },
      { levels: ["B1"], es: "El software", en: "Le logiciel", sentence: "Este software es gratuito.", sentence_trans: "Ce logiciel est gratuit." },
      { levels: ["B1"], es: "La red", en: "Le réseau", sentence: "No hay red en este edificio.", sentence_trans: "Il n'y a pas de réseau dans ce bâtiment." },
      { levels: ["B2"], es: "El enlace", en: "Le lien", sentence: "Haz clic en el enlace.", sentence_trans: "Clique sur le lien." },
      { levels: ["B1"], es: "El archivo", en: "Le fichier", sentence: "Guarda el archivo antes de cerrar.", sentence_trans: "Sauvegarde le fichier avant de fermer." },
      { levels: ["A2"], es: "La contraseña", en: "Le mot de passe", sentence: "Olvidé mi contraseña.", sentence_trans: "J'ai oublié mon mot de passe." },
      { levels: ["B1"], es: "El usuario", en: "L'utilisateur", sentence: "Nombre de usuario incorrecto.", sentence_trans: "Nom d'utilisateur incorrect." },
      { levels: ["A2"], es: "La aplicación", en: "L'application", sentence: "Descarga esta aplicación.", sentence_trans: "Télécharge cette application." },
      { levels: ["B2"], es: "El dato", en: "La donnée", sentence: "Los datos son confidenciales.", sentence_trans: "Les données sont confidentielles." },
      { levels: ["C1"], es: "El servidor", en: "Le serveur", sentence: "El servidor se cayó.", sentence_trans: "Le serveur est tombé." },
      { levels: ["B1"], es: "La nube", en: "Le cloud/nuage", sentence: "Sube las fotos a la nube.", sentence_trans: "Mets les photos sur le cloud." },
      { levels: ["A1"], es: "El ratón", en: "La souris", sentence: "El ratón no funciona.", sentence_trans: "La souris ne fonctionne pas." },
      { levels: ["A1"], es: "El teclado", en: "Le clavier", sentence: "Este teclado es inalámbrico.", sentence_trans: "Ce clavier est sans fil." }
    ],
    health: [
      { levels: ["A1"], es: "La salud", en: "La santé", sentence: "La salud es lo más importante.", sentence_trans: "La santé est le plus important." },
      { levels: ["A1"], es: "El médico", en: "Le médecin", sentence: "Tengo cita con el médico.", sentence_trans: "J'ai rendez-vous avec le médecin." },
      { levels: ["A2"], es: "El hospital", en: "L'hôpital", sentence: "El hospital está cerca.", sentence_trans: "L'hôpital est proche." },
      { levels: ["A2"], es: "La medicina", en: "Le médicament", sentence: "Toma tu medicina.", sentence_trans: "Prends ton médicament." },
      { levels: ["A1"], es: "El dolor", en: "La douleur", sentence: "Siento mucho dolor.", sentence_trans: "Je ressens beaucoup de douleur." },
      { levels: ["B1"], es: "La enfermedad", en: "La maladie", sentence: "Es una enfermedad rara.", sentence_trans: "C'est une maladie rare." },
      { levels: ["A1"], es: "El cuerpo", en: "Le corps", sentence: "Hay que cuidar el cuerpo.", sentence_trans: "Il faut prendre soin du corps." },
      { levels: ["A1"], es: "La cabeza", en: "La tête", sentence: "Me duele la cabeza.", sentence_trans: "J'ai mal à la tête." },
      { levels: ["B1"], es: "El corazón", en: "Le cœur", sentence: "Su corazón late fuerte.", sentence_trans: "Son cœur bat fort." },
      { levels: ["B2"], es: "La sangre", en: "Le sang", sentence: "Donar sangre salva vidas.", sentence_trans: "Donner du sang sauve des vies." },
      { levels: ["A2"], es: "La farmacia", en: "La pharmacie", sentence: "Voy a la farmacia.", sentence_trans: "Je vais à la pharmacie." },
      { levels: ["B2"], es: "El tratamiento", en: "Le traitement", sentence: "El tratamiento funciona.", sentence_trans: "Le traitement fonctionne." },
      { levels: ["B2"], es: "El virus", en: "Le virus", sentence: "El virus se propaga rápido.", sentence_trans: "Le virus se propage vite." },
      { levels: ["C1"], es: "La vacuna", en: "Le vaccin", sentence: "La vacuna es efectiva.", sentence_trans: "Le vaccin est efficace." },
      { levels: ["B1"], es: "El paciente", en: "Le patient", sentence: "El paciente está mejorando.", sentence_trans: "Le patient va mieux." }
    ],
    nature: [
      { levels: ["A1"], es: "El árbol", en: "L'arbre", sentence: "El árbol es muy alto.", sentence_trans: "L'arbre est très haut." },
      { levels: ["A1"], es: "La flor", en: "La fleur", sentence: "Me gustan las flores rojas.", sentence_trans: "J'aime les fleurs rouges." },
      { levels: ["A2"], es: "El río", en: "La rivière", sentence: "El río cruza la ciudad.", sentence_trans: "La rivière traverse la ville." },
      { levels: ["A2"], es: "La montaña", en: "La montagne", sentence: "Vamos a escalar la montaña.", sentence_trans: "Nous allons escalader la montagne." },
      { levels: ["A1"], es: "El mar", en: "La mer", sentence: "El mar está tranquilo hoy.", sentence_trans: "La mer est calme aujourd'hui." },
      { levels: ["A1"], es: "El sol", en: "Le soleil", sentence: "El sol brilla fuerte.", sentence_trans: "Le soleil brille fort." },
      { levels: ["A1"], es: "La lluvia", en: "La pluie", sentence: "Me gusta el olor a lluvia.", sentence_trans: "J'aime l'odeur de la pluie." },
      { levels: ["A2"], es: "El viento", en: "Le vent", sentence: "Hace mucho viento.", sentence_trans: "Il y a beaucoup de vent." },
      { levels: ["B1"], es: "El bosque", en: "La forêt", sentence: "Nos perdimos en el bosque.", sentence_trans: "Nous nous sommes perdus dans la forêt." },
      { levels: ["A1"], es: "El animal", en: "L'animal", sentence: "El león es un animal salvaje.", sentence_trans: "Le lion est un animal sauvage." },
      { levels: ["B1"], es: "La tierra", en: "La terre", sentence: "La tierra es fértil.", sentence_trans: "La terre est fertile." },
      { levels: ["A2"], es: "El cielo", en: "Le ciel", sentence: "El cielo está azul.", sentence_trans: "Le ciel est bleu." },
      { levels: ["B1"], es: "La nube", en: "Le nuage", sentence: "Esa nube parece un perro.", sentence_trans: "Ce nuage ressemble à un chien." },
      { levels: ["A2"], es: "La estrella", en: "L'étoile", sentence: "Mira esa estrella fugaz.", sentence_trans: "Regarde cette étoile filante." },
      { levels: ["B2"], es: "El medio ambiente", en: "L'environnement", sentence: "Protege el medio ambiente.", sentence_trans: "Protège l'environnement." }
    ],
    places: [
      { levels: ["A1"], es: "La casa", en: "La maison", sentence: "Mi casa es pequeña.", sentence_trans: "Ma maison est petite." },
      { levels: ["A1"], es: "La playa", en: "La plage", sentence: "Vamos a la playa mañana.", sentence_trans: "Nous allons à la plage demain." },
      { levels: ["A1"], es: "La escuela", en: "L'école", sentence: "Los niños van a la escuela.", sentence_trans: "Les enfants vont à l'école." },
      { levels: ["A1"], es: "El parque", en: "Le parc", sentence: "Corro en el parque.", sentence_trans: "Je cours dans le parc." },
      { levels: ["A2"], es: "El aeropuerto", en: "L'aéroport", sentence: "Llego al aeropuerto tarde.", sentence_trans: "J'arrive à l'aéroport en retard." },
      { levels: ["A2"], es: "La oficina", en: "Le bureau", sentence: "La oficina está cerrada.", sentence_trans: "Le bureau est fermé." },
      { levels: ["B1"], es: "El ayuntamiento", en: "La mairie", sentence: "Vivo cerca del ayuntamiento.", sentence_trans: "J'habite près de la mairie." },
      { levels: ["A1"], es: "La calle", en: "La rue", sentence: "Cruza la calle con cuidado.", sentence_trans: "Traverse la rue avec prudence." },
      { levels: ["A1"], es: "El restaurante", en: "Le restaurant", sentence: "Cenamos en el restaurante.", sentence_trans: "Nous dînons au restaurant." },
      { levels: ["A2"], es: "El hotel", en: "L'hôtel", sentence: "El hotel tiene piscina.", sentence_trans: "L'hôtel a une piscine." },
      { levels: ["B1"], es: "El museo", en: "Le musée", sentence: "El museo abre a las nueve.", sentence_trans: "Le musée ouvre à neuf heures." },
      { levels: ["A2"], es: "La estación", en: "La gare", sentence: "Te espero en la estación.", sentence_trans: "Je t'attends à la gare." },
      { levels: ["B1"], es: "La biblioteca", en: "La bibliothèque", sentence: "Estudio en la biblioteca.", sentence_trans: "J'étudie à la bibliothèque." },
      { levels: ["A1"], es: "El banco", en: "La banque", sentence: "Necesito ir al banco.", sentence_trans: "J'ai besoin d'aller à la banque." },
      { levels: ["A2"], es: "El cine", en: "Le cinéma", sentence: "Vamos al cine esta noche.", sentence_trans: "Nous allons au cinéma ce soir." }
    ],
    objects: [
      { levels: ["A1"], es: "El libro", en: "Le livre", sentence: "Leo un libro interesante.", sentence_trans: "Je lis un livre intéressant." },
      { levels: ["A1"], es: "El coche", en: "La voiture", sentence: "Mi coche es rojo.", sentence_trans: "Ma voiture est rouge." },
      { levels: ["A1"], es: "El dinero", en: "L'argent", sentence: "No tengo dinero.", sentence_trans: "Je n'ai pas d'argent." },
      { levels: ["A1"], es: "El teléfono", en: "Le téléphone", sentence: "Suena el teléfono.", sentence_trans: "Le téléphone sonne." },
      { levels: ["A1"], es: "La mesa", en: "La table", sentence: "Pon los platos en la mesa.", sentence_trans: "Mets les plats sur la table." },
      { levels: ["A1"], es: "La silla", en: "La chaise", sentence: "Siéntate en la silla.", sentence_trans: "Assieds-toi sur la chaise." },
      { levels: ["A1"], es: "La llave", en: "La clé", sentence: "Perdí mis llaves.", sentence_trans: "J'ai perdu mes clés." },
      { levels: ["A2"], es: "El reloj", en: "La montre/horloge", sentence: "Mira el reloj.", sentence_trans: "Regarde l'horloge." },
      { levels: ["A1"], es: "La cama", en: "Le lit", sentence: "La cama es cómoda.", sentence_trans: "Le lit est confortable." },
      { levels: ["A1"], es: "El vaso", en: "Le verre", sentence: "Dame un vaso de agua.", sentence_trans: "Donne-moi un verre d'eau." },
      { levels: ["A2"], es: "La ropa", en: "Les vêtements", sentence: "Lavo la ropa.", sentence_trans: "Je lave les vêtements." },
      { levels: ["A2"], es: "El zapato", en: "La chaussure", sentence: "Me aprieta el zapato.", sentence_trans: "La chaussure me serre." },
      { levels: ["A2"], es: "La mochila", en: "Le sac à dos", sentence: "Prepara tu mochila.", sentence_trans: "Prépare ton sac à dos." },
      { levels: ["A1"], es: "El bolígrafo", en: "Le stylo", sentence: "¿Tienes un bolígrafo?", sentence_trans: "As-tu un stylo ?" },
      { levels: ["A2"], es: "Las gafas", en: "Les lunettes", sentence: "No veo sin gafas.", sentence_trans: "Je ne vois pas sans lunettes." }
    ],
    food: [
      { levels: ["A1"], es: "La comida", en: "La nourriture", sentence: "La comida está lista.", sentence_trans: "La nourriture est prête." },
      { levels: ["A1"], es: "El pan", en: "Le pain", sentence: "Compra pan fresco.", sentence_trans: "Achète du pain frais." },
      { levels: ["A1"], es: "La manzana", en: "La pomme", sentence: "Come una manzana diaria.", sentence_trans: "Mange une pomme par jour." },
      { levels: ["A1"], es: "El café", en: "Le café", sentence: "Necesito café por la mañana.", sentence_trans: "J'ai besoin de café le matin." },
      { levels: ["A1"], es: "El agua", en: "L'eau", sentence: "Bebe mucha agua.", sentence_trans: "Bois beaucoup d'eau." },
      { levels: ["A1"], es: "La leche", en: "Le lait", sentence: "Café con leche.", sentence_trans: "Café au lait." },
      { levels: ["A2"], es: "El queso", en: "Le fromage", sentence: "Me gusta el queso.", sentence_trans: "J'aime le fromage." },
      { levels: ["A2"], es: "El huevo", en: "L'œuf", sentence: "Huevo frito.", sentence_trans: "Œuf au plat." },
      { levels: ["A2"], es: "La carne", en: "La viande", sentence: "No como carne.", sentence_trans: "Je ne mange pas de viande." },
      { levels: ["A2"], es: "El pescado", en: "Le poisson", sentence: "El pescado es fresco.", sentence_trans: "Le poisson est frais." },
      { levels: ["B1"], es: "La ensalada", en: "La salade", sentence: "Una ensalada mixta.", sentence_trans: "Une salade mixte." },
      { levels: ["A2"], es: "La fruta", en: "Le fruit", sentence: "Come más fruta.", sentence_trans: "Mange plus de fruits." },
      { levels: ["B1"], es: "El arroz", en: "Le riz", sentence: "Arroz con pollo.", sentence_trans: "Riz au poulet." },
      { levels: ["A2"], es: "El azúcar", en: "Le sucre", sentence: "Sin azúcar, por favor.", sentence_trans: "Sans sucre, s'il vous plaît." },
      { levels: ["B1"], es: "La sal", en: "Le sel", sentence: "Pásame la sal.", sentence_trans: "Passe-moi le sel." }
    ],
    people: [
      { levels: ["A1"], es: "El amigo", en: "L'ami", sentence: "Es mi mejor amigo.", sentence_trans: "C'est mon meilleur ami." },
      { levels: ["A1"], es: "La familia", en: "La famille", sentence: "Visito a mi familia.", sentence_trans: "Je rends visite à ma famille." },
      { levels: ["A2"], es: "El vecino", en: "Le voisin", sentence: "Mi vecino es ruidoso.", sentence_trans: "Mon voisin est bruyant." },
      { levels: ["A1"], es: "El niño", en: "L'enfant/garçon", sentence: "El niño juega.", sentence_trans: "L'enfant joue." },
      { levels: ["A1"], es: "La mujer", en: "La femme", sentence: "Es una mujer inteligente.", sentence_trans: "C'est une femme intelligente." },
      { levels: ["A1"], es: "El hombre", en: "L'homme", sentence: "Un hombre alto.", sentence_trans: "Un homme grand." },
      { levels: ["B1"], es: "El ciudadano", en: "Le citoyen", sentence: "Soy ciudadano español.", sentence_trans: "Je suis citoyen espagnol." },
      { levels: ["A1"], es: "El padre", en: "Le père", sentence: "Mi padre cocina.", sentence_trans: "Mon père cuisine." },
      { levels: ["A1"], es: "La madre", en: "La mère", sentence: "Mi madre lee.", sentence_trans: "Ma mère lit." },
      { levels: ["A1"], es: "El hermano", en: "Le frère", sentence: "Tengo dos hermanos.", sentence_trans: "J'ai deux frères." },
      { levels: ["A1"], es: "La hermana", en: "La sœur", sentence: "Mi hermana es doctora.", sentence_trans: "Ma sœur est médecin." },
      { levels: ["A2"], es: "El abuelo", en: "Le grand-père", sentence: "Mi abuelo tiene ochenta años.", sentence_trans: "Mon grand-père a quatre-vingts ans." },
      { levels: ["B2"], es: "El colega", en: "Le collègue", sentence: "Un colega de trabajo.", sentence_trans: "Un collègue de travail." },
      { levels: ["B2"], es: "El desconocido", en: "L'inconnu", sentence: "No hables con desconocidos.", sentence_trans: "Ne parle pas aux inconnus." },
      { levels: ["B1"], es: "La gente", en: "Les gens", sentence: "Hay mucha gente.", sentence_trans: "Il y a beaucoup de gens." }
    ],
    abstract: [
      { levels: ["A1"], es: "El tiempo", en: "Le temps", sentence: "No tengo tiempo.", sentence_trans: "Je n'ai pas le temps." },
      { levels: ["A2"], es: "La idea", en: "L'idée", sentence: "Tengo una idea.", sentence_trans: "J'ai une idée." },
      { levels: ["B1"], es: "El problema", en: "Le problème", sentence: "Es un gran problema.", sentence_trans: "C'est un grand problème." },
      { levels: ["B1"], es: "La solución", en: "La solution", sentence: "Buscamos una solución.", sentence_trans: "Nous cherchons une solution." },
      { levels: ["A1"], es: "El amor", en: "L'amour", sentence: "El amor es ciego.", sentence_trans: "L'amour est aveugle." },
      { levels: ["B1"], es: "La paz", en: "La paix", sentence: "Queremos la paz.", sentence_trans: "Nous voulons la paix." },
      { levels: ["B1"], es: "La libertad", en: "La liberté", sentence: "La libertad no tiene precio.", sentence_trans: "La liberté n'a pas de prix." },
      { levels: ["A2"], es: "El trabajo", en: "Le travail", sentence: "Busco trabajo.", sentence_trans: "Je cherche du travail." },
      { levels: ["A2"], es: "La vida", en: "La vie", sentence: "La vida es bella.", sentence_trans: "La vie est belle." },
      { levels: ["A2"], es: "La suerte", en: "La chance", sentence: "¡Buena suerte!", sentence_trans: "Bonne chance !" },
      { levels: ["B2"], es: "El miedo", en: "La peur", sentence: "No tengas miedo.", sentence_trans: "N'aie pas peur." },
      { levels: ["B2"], es: "La verdad", en: "La vérité", sentence: "Dime la verdad.", sentence_trans: "Dis-moi la vérité." },
      { levels: ["B2"], es: "La mentira", en: "Le mensonge", sentence: "Odio las mentiras.", sentence_trans: "Je déteste les mensonges." },
      { levels: ["C1"], es: "La esperanza", en: "L'espoir", sentence: "La esperanza es lo último que se pierde.", sentence_trans: "L'espoir est la dernière chose qu'on perd." },
      { levels: ["C1"], es: "El conocimiento", en: "La connaissance", sentence: "El conocimiento es poder.", sentence_trans: "La connaissance est le pouvoir." }
    ]
  },

  adjectives: [
    { levels: ["A1"], es: "Grande", en: "Grand", sentence: "Una casa grande." },
    { levels: ["A1"], es: "Pequeño", en: "Petit", sentence: "Un perro pequeño." },
    { levels: ["A1"], es: "Bueno", en: "Bon", sentence: "Un buen libro." },
    { levels: ["A1"], es: "Malo", en: "Mauvais", sentence: "Un mal día." },
    { levels: ["A2"], es: "Difícil", en: "Difficile", sentence: "Un examen difícil." },
    { levels: ["A2"], es: "Fácil", en: "Facile", sentence: "Es muy fácil." },
    { levels: ["A1"], es: "Nuevo", en: "Nouveau", sentence: "Un coche nuevo." },
    { levels: ["A1"], es: "Viejo", en: "Vieux", sentence: "Un edificio viejo." },
    { levels: ["A1"], es: "Bonito", en: "Joli", sentence: "Un paisaje bonito." },
    { levels: ["A1"], es: "Feo", en: "Laid", sentence: "Un cuadro feo." },
    { levels: ["A1"], es: "Rápido", en: "Rapide", sentence: "Un tren rápido." },
    { levels: ["A1"], es: "Lento", en: "Lent", sentence: "Internet lento." },
    { levels: ["B1"], es: "Importante", en: "Important", sentence: "Es una decisión importante." },
    { levels: ["B1"], es: "Interesante", en: "Intéressant", sentence: "Una película interesante." },
    { levels: ["B2"], es: "Sostenible", en: "Durable", sentence: "Desarrollo sostenible." },
    { levels: ["C1"], es: "Efímero", en: "Éphémère", sentence: "Belleza efímera." },
    { levels: ["B1"], es: "Feliz", en: "Heureux", sentence: "Soy muy feliz." },
    { levels: ["B1"], es: "Triste", en: "Triste", sentence: "Una noticia triste." },
    { levels: ["A1"], es: "Caliente", en: "Chaud", sentence: "Café caliente." },
    { levels: ["A1"], es: "Frío", en: "Froid", sentence: "Agua fría." }
  ],

  connectors: [
    { es: "Y", en: "Et" }, { es: "O", en: "Ou" }, { es: "Pero", en: "Mais" },
    { es: "Porque", en: "Parce que" }, { es: "Cuando", en: "Quand" },
    { es: "Si", en: "Si" }, { es: "Aunque", en: "Bien que" },
    { es: "Sin embargo", en: "Cependant" }, { es: "Además", en: "De plus" },
    { es: "Entonces", en: "Alors" }, { es: "Así que", en: "Donc" },
    { es: "Por eso", en: "C'est pourquoi" }, { es: "Mientras", en: "Pendant que" },
    { es: "Después", en: "Après" }, { es: "Antes", en: "Avant" },
    { es: "También", en: "Aussi" }, { es: "Tampoco", en: "Non plus" },
    { es: "Por lo tanto", en: "Par conséquent" }, { es: "En cambio", en: "En revanche" },
    { es: "A pesar de", en: "Malgré" }
  ],

  tips: [
    "En espagnol, le 'H' est siempre muet.",
    "Ser = Identité permanente / Estar = État temporaire.",
    "Hay (Il y a) est invariable.",
    "L'accent tonique est essentiel : hablo (je parle) vs habló (il parla).",
    "En espagnol, on utilise 'usted' pour la politesse formelle.",
    "Les adjectifs s'accordent en genre et en nombre avec le nom.",
    "La lettre 'ñ' a un son unique, comme 'gn' dans 'montagne'.",
    "Le double 'll' se prononce souvent comme 'y' dans 'yeux'.",
    "Attention aux faux amis : 'embarazada' signifie 'enceinte', pas 'embarrassée'.",
    "On omet souvent le pronom sujet (Yo, Tú...) car la conjugaison indique la personne."
  ]
};

// --- 3. PROGRAMME PÉDAGOGIQUE COMPLET (TITRES CORRIGÉS) ---
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
// --- GÉNÉRATEUR INTELLIGENT DE LEÇONS (VRAIMENT THÉMATIQUE) ---
export const generateStructuredLesson = (id) => {
  let level = "A1";
  if (id > 20) level = "A2";
  if (id > 40) level = "B1";
  if (id > 60) level = "B2";
  if (id > 80) level = "C1";

  // On récupère le programme officiel pour ce niveau
  const levelConfig = CURRICULUM_LOGIC[level] || [];
  // On trouve le sujet de la leçon (ex: "La Cuisine", "Voyage")
  const config = levelConfig[(id - 1) % levelConfig.length] || { topic: `Pratique ${level}`, grammar: "Général" };
  
  const topicLower = config.topic.toLowerCase();

  // 1. DÉTECTION INTELLIGENTE DU THÈME
  // On analyse le titre pour savoir quelle liste de vocabulaire utiliser
  let targetCategory = 'random';

  // Mots-clés pour la Nourriture
  if (topicLower.includes('cuisine') || topicLower.includes('nourriture') || topicLower.includes('restaurant') || topicLower.includes('gastronomie') || topicLower.includes('dieta')) targetCategory = 'food';
  
  // Mots-clés pour les Lieux / Voyage
  else if (topicLower.includes('voyage') || topicLower.includes('ville') || topicLower.includes('maison') || topicLower.includes('lieu') || topicLower.includes('tourisme') || topicLower.includes('monde')) targetCategory = 'places';
  
  // Mots-clés pour les Objets / Tech
  else if (topicLower.includes('objet') || topicLower.includes('technologie') || topicLower.includes('internet') || topicLower.includes('maison') || topicLower.includes('école') || topicLower.includes('ordinateur') || topicLower.includes('móvil')) targetCategory = 'technology';
  
  // Mots-clés pour les Gens / Société
  else if (topicLower.includes('famille') || topicLower.includes('ami') || topicLower.includes('gens') || topicLower.includes('société') || topicLower.includes('politique')) targetCategory = 'people';
  
  // Mots-clés pour l'Abstrait
  else if (topicLower.includes('abstrait') || topicLower.includes('sentiment') || topicLower.includes('idée') || topicLower.includes('temps') || topicLower.includes('histoire')) targetCategory = 'abstract';

  // Nouveaux Mots-clés
  else if (topicLower.includes('business') || topicLower.includes('travail') || topicLower.includes('économie') || topicLower.includes('entreprise')) targetCategory = 'business';
  else if (topicLower.includes('santé') || topicLower.includes('médecin') || topicLower.includes('corps') || topicLower.includes('maladie')) targetCategory = 'health';
  else if (topicLower.includes('nature') || topicLower.includes('environnement') || topicLower.includes('climat') || topicLower.includes('animal')) targetCategory = 'nature';

  // 2. FONCTION DE SÉLECTION CIBLÉE
  const getSmartNoun = (fallbackCategory) => {
      // Si on a trouvé un thème précis, on l'utilise. Sinon, on prend la catégorie par défaut de la carte.
      const cat = targetCategory !== 'random' ? targetCategory : fallbackCategory;
      
      const pool = DATA_BANK.nouns[cat] ? DATA_BANK.nouns[cat] : DATA_BANK.nouns['objects'];
      
      // On essaie de prendre un mot du bon niveau, sinon n'importe lequel
      const levelPool = pool.filter(n => n.levels.includes(level));
      const finalPool = levelPool.length > 0 ? levelPool : pool;

      // Hachage simple pour que la leçon soit toujours la même pour un ID donné
      return finalPool[(id + Math.floor(Math.random() * 10)) % finalPool.length];
  };

  // 3. CHOIX DU VERBE (Toujours adapté au niveau)
  const availableVerbs = DATA_BANK.verbs.filter(v => v.levels.includes(level));
  const randVerb = availableVerbs.length > 0 ? availableVerbs[id % availableVerbs.length] : DATA_BANK.verbs[0];

  // 4. SÉLECTION DES MOTS (Maintenant cohérente avec le titre !)
  // Si targetCategory est défini, on force son utilisation pour les 3 cartes
  const card1Noun = getSmartNoun(targetCategory !== 'random' ? targetCategory : 'objects');
  const card2Noun = getSmartNoun(targetCategory !== 'random' ? targetCategory : 'places');
  const card3Noun = getSmartNoun(targetCategory !== 'random' ? targetCategory : 'food');
  
  const adj = DATA_BANK.adjectives[(id + 2) % DATA_BANK.adjectives.length];
  const conn = DATA_BANK.connectors[id % DATA_BANK.connectors.length];
  const tip = DATA_BANK.tips[id % DATA_BANK.tips.length];

  // 5. CONSTRUCTION DES CARTES
  let cardId = id * 1000;
  const isPlural = id % 2 === 0;
  
  const grammarQuestionText = isPlural ? `Conjugue : Nosotros (${randVerb.es})` : `Conjugue : Tú (${randVerb.es})`;
  const targetPronoun = isPlural ? "Nos" : "Tú";
  // On cherche le pronom exact ou un qui contient (ex: "Nosotros" dans "Nos")
  const conjFn = randVerb.conjugation.find(c => c.pronoun.includes(targetPronoun) || (targetPronoun === "Nos" && c.pronoun.includes("Nosotros")));
  const grammarAnswer = conjFn ? [conjFn.verb] : [randVerb.conjugation[0].verb];

  // Construction des phrases logiques en utilisant les phrases de la banque si disponibles
  const card1 = { ...card1Noun, context: "Mot clé", sentence: card1Noun.sentence || `Necesito ${card1Noun.es.toLowerCase()}.`, sentence_trans: card1Noun.sentence_trans || `J'ai besoin de ${card1Noun.en.toLowerCase()}.` };
  const card2 = { ...card2Noun, context: "Contexte", sentence: card2Noun.sentence || `Voy a ${card2Noun.es.toLowerCase()}.`, sentence_trans: card2Noun.sentence_trans || `Je vais à ${card2Noun.en.toLowerCase()}.` };
  const card3 = { ...card3Noun, context: "Exemple", sentence: card3Noun.sentence || `Me gusta ${card3Noun.es.toLowerCase()}.`, sentence_trans: card3Noun.sentence_trans || `J'aime ${card3Noun.en.toLowerCase()}.` };

  return [
    { id: cardId++, type: "structure", title: `Leçon ${id} : ${config.topic}`, formula: config.grammar, example: `Verbe focus : ${randVerb.es}`, note: `Niveau ${level}` },
    
    // Carte 1
    { id: cardId++, type: "swipe", es: card1.es, en: card1.en, context: card1.context, sentence: card1.sentence, sentence_trans: card1.sentence_trans },
    
    // Grammaire
    { id: cardId++, type: "grammar", title: `Verbe : ${randVerb.es}`, description: randVerb.en, verb: randVerb.es, conjugation: randVerb.conjugation },
    { id: cardId++, type: "input", question: grammarQuestionText, answer: grammarAnswer, hint: `Verbe ${randVerb.es}` },

    // Carte 2
    { id: cardId++, type: "swipe", es: card2.es, en: card2.en, context: card2.context, sentence: card2.sentence, sentence_trans: card2.sentence_trans },
    
    // Structure
    { id: cardId++, type: "structure", title: "L'Accord", formula: "Nom + Adjectif", example: `${card1.es} ${adj.es.toLowerCase()}`, note: "L'adjectif s'accorde." },

    // Carte 3
    { id: cardId++, type: "swipe", es: card3.es, en: card3.en, context: card3.context, sentence: card3.sentence, sentence_trans: card3.sentence_trans },
    
    // Connecteur
    { id: cardId++, type: "swipe", es: conn.es, en: conn.en, context: "Liaison", sentence: `${conn.es}, es importante.`, sentence_trans: `${conn.en}, c'est important.` },

    { id: cardId++, type: "structure", title: "Astuce", formula: "Bon à savoir", example: tip, note: "Culture" },
    
    // Exercice final
    { id: cardId++, type: "input", question: `Traduis : "${card1.sentence_trans}"`, answer: [card1.sentence.toLowerCase().replace(/[¿¡!.,]/g, '')], hint: "Utilise le vocabulaire vu." }
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

// --- GÉNÉRATION DE LA LISTE DES LEÇONS (CORRIGÉE AVEC LES TITRES) ---
export const INITIAL_LESSONS_LIST = [];
let idCnt = 1;
["A1", "A2", "B1", "B2", "C1"].forEach(lvl => {
    const curriculum = CURRICULUM_LOGIC[lvl] || [];
    for(let i=0; i<20; i++) {
        // ON RÉCUPÈRE LE VRAI TITRE DU PROGRAMME
        const topicTitle = (curriculum[i] && curriculum[i].topic) ? curriculum[i].topic : `Pratique ${lvl} - ${i+1}`;
        
        INITIAL_LESSONS_LIST.push({ 
            id: idCnt++, 
            title: topicTitle, // <-- C'EST ICI QUE LE NOM EST CORRIGÉ
            level: lvl, 
            desc: `Niveau ${lvl}` 
        });
    }
});

// --- GÉNÉRATEUR D'EXAMEN (CORRIGÉ POUR DES QUESTIONS LOGIQUES) ---
export const generateExamContent = (allContent, startId, endId, levelName, examId) => {
  let pool = [];
  for (let i = startId; i <= endId; i++) {
    if (allContent[i]) {
      // On prend toutes les cartes utiles
      pool = [...pool, ...allContent[i].filter(c => c.type === 'swipe' || c.type === 'input')];
    }
  }

  if (pool.length < 10) return [{ id: examId, type: "structure", title: "Erreur", formula: "...", example: "...", note: "Contacte le support." }];
  
  // Mélange et sélection
  const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 20);
  
  // TRANSFORMATION EN QUESTIONS LOGIQUES
  return [
    { id: examId, type: "structure", title: `EXAMEN ${levelName}`, formula: "Test Final", example: "20 Questions", note: "Objectif 16/20" },
    ...selected.map((item, idx) => {
        // Si c'est déjà une question de grammaire (input), on la garde telle quelle
        if (item.type === 'input') {
             return { ...item, id: examId + idx + 1 };
        }
        
        // Si c'est une carte de vocabulaire (swipe), on crée une question de traduction sur la PHRASE COMPLÈTE
        // pour donner du contexte.
        const questionText = item.sentence_trans ? `Traduis : "${item.sentence_trans}"` : `Traduis : "${item.en}"`;
        const answerText = item.sentence ? item.sentence : item.es;

        return {
            ...item,
            id: examId + idx + 1,
            type: 'input', // Force le type 'question'
            question: questionText,
            // Nettoyage de la réponse attendue (minuscules, sans ponctuation)
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