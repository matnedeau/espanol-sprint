// Définition des types pour TypeScript
export interface CurriculumItem {
  topic: string;
  grammar: string;
  category: string;
}

export interface LessonSummary {
  id: number;
  title: string;
  level: string;
  desc: string;
}

// Logique du Curriculum
export const CURRICULUM_LOGIC: Record<string, CurriculumItem[]> = {
  A1: [
    { topic: "Saluer et se présenter", grammar: "Me llamo… / Soy…", category: "abstract" },
    { topic: "Dire qui l'on est", grammar: "Le verbe ser", category: "abstract" },
    { topic: "Le masculin et le féminin", grammar: "Les articles", category: "abstract" },
    { topic: "Parler au présent", grammar: "Les verbes en -ar", category: "abstract" },
    { topic: "Manger, boire, habiter", grammar: "Les verbes en -er et -ir", category: "abstract" },
    { topic: "Dire non et poser des questions", grammar: "La négation et les questions", category: "abstract" },
    { topic: "Dire où l'on est et comment on va", grammar: "Le verbe estar", category: "abstract" },
    { topic: "Décrire la maison", grammar: "Hay et está", category: "abstract" },
    { topic: "Ser ou estar ?", grammar: "Ser et estar", category: "abstract" },
    { topic: "Avoir : la famille et l'âge", grammar: "Le verbe tener", category: "abstract" },
    { topic: "Présenter sa famille", grammar: "Les possessifs", category: "abstract" },
    { topic: "Dire ce que l'on aime", grammar: "Le verbe gustar", category: "abstract" },
    { topic: "Dire où l'on va", grammar: "Le verbe ir et le futur proche", category: "abstract" },
    { topic: "Faire, sortir, et la météo", grammar: "Les verbes irréguliers en -go", category: "abstract" },
    { topic: "Commander au café", grammar: "Querer et poder", category: "abstract" },
    { topic: "Raconter sa journée", grammar: "Les verbes pronominaux", category: "abstract" },
    { topic: "L'heure et les moments de la journée", grammar: "Dire l'heure", category: "abstract" },
    { topic: "Faire des achats", grammar: "Les démonstratifs et les prix", category: "abstract" },
    { topic: "Dire ce que l'on est en train de faire", grammar: "Estar + gérondif", category: "abstract" },
    { topic: "Bilan A1", grammar: "Révision générale", category: "abstract" }
  ],
  A2: [
    { topic: "Raconter sa journée d'aujourd'hui", grammar: "Le passé composé", category: "abstract" },
    { topic: "Déjà fait, pas encore fait", grammar: "Les participes irréguliers", category: "abstract" },
    { topic: "Raconter hier", grammar: "Le passé simple des verbes en -ar", category: "abstract" },
    { topic: "Raconter une sortie", grammar: "Le passé simple des verbes en -er et -ir", category: "abstract" },
    { topic: "Raconter ses vacances", grammar: "Les passés simples irréguliers", category: "abstract" },
    { topic: "Aujourd'hui ou hier ?", grammar: "Passé composé ou passé simple", category: "abstract" },
    { topic: "Parler de son enfance", grammar: "L'imparfait", category: "abstract" },
    { topic: "Raconter une histoire", grammar: "Imparfait ou passé simple", category: "abstract" },
    { topic: "Éviter les répétitions", grammar: "Les pronoms compléments directs", category: "abstract" },
    { topic: "Chez le médecin", grammar: "Les pronoms indirects et « me duele »", category: "abstract" },
    { topic: "Comparer", grammar: "Les comparatifs", category: "abstract" },
    { topic: "Très, beaucoup, le plus", grammar: "Le superlatif, muy et mucho", category: "abstract" },
    { topic: "Donner un conseil ou un ordre", grammar: "L'impératif", category: "abstract" },
    { topic: "Demander son chemin", grammar: "Indiquer un itinéraire", category: "abstract" },
    { topic: "Pour qui, pourquoi, par où", grammar: "Por et para", category: "abstract" },
    { topic: "Parler de l'avenir", grammar: "Le futur simple", category: "abstract" },
    { topic: "Faire des projets", grammar: "Les futurs irréguliers", category: "abstract" },
    { topic: "Demander poliment", grammar: "Le conditionnel de politesse", category: "abstract" },
    { topic: "Ser ou estar : aller plus loin", grammar: "Ser et estar avec un adjectif", category: "abstract" },
    { topic: "Bilan A2", grammar: "Révision générale", category: "abstract" }
  ],
  B1: [
    { topic: "Exprimer un souhait", grammar: "Le subjonctif présent", category: "abstract" },
    { topic: "Espérer et souhaiter", grammar: "Les subjonctifs irréguliers", category: "abstract" },
    { topic: "Réagir : joie, regret, agacement", grammar: "Le subjonctif après une émotion", category: "abstract" },
    { topic: "Croire, douter", grammar: "Indicatif ou subjonctif après une opinion", category: "abstract" },
    { topic: "Conseiller", grammar: "Le subjonctif après un conseil ou une nécessité", category: "abstract" },
    { topic: "Interdire et déconseiller", grammar: "L'impératif négatif", category: "abstract" },
    { topic: "Vouvoyer", grammar: "Usted et ustedes", category: "abstract" },
    { topic: "Quand tu arriveras…", grammar: "Cuando et para que + subjonctif", category: "abstract" },
    { topic: "Ce qui s'était passé avant", grammar: "Le plus-que-parfait", category: "abstract" },
    { topic: "S'il pleut…", grammar: "La condition réelle", category: "abstract" },
    { topic: "À ta place…", grammar: "Le conditionnel", category: "abstract" },
    { topic: "Préciser de qui ou de quoi l'on parle", grammar: "Les pronoms relatifs", category: "abstract" },
    { topic: "Rapporter ce que quelqu'un dit", grammar: "Le discours indirect", category: "abstract" },
    { topic: "Venir de, continuer, arrêter", grammar: "Les périphrases verbales", category: "abstract" },
    { topic: "On parle, on vend, on peut", grammar: "Se impersonnel et passif", category: "abstract" },
    { topic: "Je te le donne, je le lui dis", grammar: "Les pronoms doubles", category: "abstract" },
    { topic: "Relier ses idées", grammar: "Les connecteurs", category: "abstract" },
    { topic: "Donner son avis", grammar: "Parecer et les formules d'opinion", category: "abstract" },
    { topic: "Quelque chose, rien, personne", grammar: "Les indéfinis et la négation", category: "abstract" },
    { topic: "Bilan B1", grammar: "Révision générale", category: "abstract" }
  ],
  B2: [
    { topic: "Ce que l'on attendait de moi", grammar: "Le subjonctif imparfait", category: "abstract" },
    { topic: "J'aimerais que tu viennes", grammar: "Les subjonctifs imparfaits irréguliers", category: "abstract" },
    { topic: "Si j'étais riche…", grammar: "L'hypothèse irréelle", category: "abstract" },
    { topic: "Si seulement, comme si", grammar: "Ojalá et como si", category: "abstract" },
    { topic: "Je veux, je voulais", grammar: "La concordance des temps", category: "abstract" },
    { topic: "Je suis content que tu sois venu", grammar: "Le subjonctif passé", category: "abstract" },
    { topic: "Si j'avais su…", grammar: "L'hypothèse irréelle du passé", category: "abstract" },
    { topic: "Il a dit que…", grammar: "Le discours indirect au passé", category: "abstract" },
    { topic: "Construit par, écrit par", grammar: "La voix passive", category: "abstract" },
    { topic: "Bien que, même si", grammar: "La concession", category: "abstract" },
    { topic: "Puisque, donc", grammar: "La cause et la conséquence", category: "abstract" },
    { topic: "À condition que, à moins que", grammar: "Les conditions au subjonctif", category: "abstract" },
    { topic: "Je cherche quelqu'un qui…", grammar: "Les relatives au subjonctif et cuyo", category: "abstract" },
    { topic: "Il doit être chez lui", grammar: "Le futur et le conditionnel de supposition", category: "abstract" },
    { topic: "Devenir", grammar: "Les verbes de changement", category: "abstract" },
    { topic: "Penser à, rêver de", grammar: "Les verbes à préposition", category: "abstract" },
    { topic: "D'ici là, j'aurai fini", grammar: "Le futur antérieur", category: "abstract" },
    { topic: "Ce qui est important", grammar: "Lo neutre", category: "abstract" },
    { topic: "Construire une argumentation", grammar: "Les connecteurs de l'argumentation", category: "abstract" },
    { topic: "Bilan B2", grammar: "Révision générale", category: "abstract" }
  ],
  C1: [
    { topic: "J'aurais dû…", grammar: "Exprimer un regret ou un reproche", category: "abstract" },
    { topic: "Sur le point de, en vacances, en bois", grammar: "Ser et estar : les emplois fins", category: "abstract" },
    { topic: "Depuis deux ans, peu à peu", grammar: "Les périphrases de durée et d'aboutissement", category: "abstract" },
    { topic: "Au cas où, apparemment", grammar: "Les locutions avec por et para", category: "abstract" },
    { topic: "Peut-être, pourvu que, comme si !", grammar: "Le subjonctif dans une phrase indépendante", category: "abstract" },
    { topic: "Aussi difficile que ce soit", grammar: "Nuancer une concession", category: "abstract" },
    { topic: "Écrire dans un registre soutenu", grammar: "Les connecteurs du registre soutenu", category: "abstract" },
    { topic: "Affirmer, soutenir, nier", grammar: "Les verbes pour rapporter un point de vue", category: "abstract" },
    { topic: "Expressions imagées : le corps", grammar: "Les expressions idiomatiques (1)", category: "abstract" },
    { topic: "Expressions imagées : la vie courante", grammar: "Les expressions idiomatiques (2)", category: "abstract" },
    { topic: "Un petit café, un but magnifique", grammar: "Les suffixes", category: "abstract" },
    { topic: "Ir ou irse, dormir ou dormirse", grammar: "Quand le pronom change le sens", category: "abstract" },
    { topic: "C'est lui qui décide", grammar: "Mettre en relief", category: "abstract" },
    { topic: "L'espagnol d'Espagne et d'Amérique", grammar: "Les variétés de l'espagnol", category: "abstract" },
    { topic: "Les faux amis", grammar: "Les faux amis français-espagnol", category: "abstract" },
    { topic: "En arrivant, si j'avais su", grammar: "Les tournures de l'écrit", category: "abstract" },
    { topic: "Une fois la réunion terminée", grammar: "Le gérondif et le participe à l'écrit", category: "abstract" },
    { topic: "Prendre une décision, prêter attention", grammar: "Les associations de mots justes", category: "abstract" },
    { topic: "Je dirais que…", grammar: "Atténuer ce que l'on dit", category: "abstract" },
    { topic: "Bilan C1", grammar: "Révision générale", category: "abstract" }
  ]
};

// Génération de la liste initiale
export const INITIAL_LESSONS_LIST: LessonSummary[] = [];

let idCnt = 1;
const levels = ["A1", "A2", "B1", "B2", "C1"];

levels.forEach(lvl => {
    const curriculum = CURRICULUM_LOGIC[lvl] || [];
    for(let i=0; i<20; i++) {
        const item = curriculum[i];
        const topicTitle = (item && item.topic) ? item.topic : `Pratique ${lvl} - ${i+1}`;
        INITIAL_LESSONS_LIST.push({ 
            id: idCnt++, 
            title: topicTitle, 
            level: lvl, 
            desc: item?.grammar ? `Niveau ${lvl} · ${item.grammar}` : `Niveau ${lvl}` 
        });
    }
});