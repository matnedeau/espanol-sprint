import { DATA_BANK, DAILY_READINGS, CONTENT_PART_1, SENTENCE_STRUCTURES, LESSON_WORDS } from './data-bank';
import { CURRICULUM_LOGIC } from './curriculum';

// --- CŒUR DU GÉNÉRATEUR ---

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

// Verbe travaillé quand le point de grammaire correspond à un thème précis
const GRAMMAR_VERB_HINTS: [RegExp, string][] = [
  [/obligation/i, "Deber"],
  [/futur/i, "Ir"],
  [/passé composé|antérieur/i, "Haber"],
  [/opinion|débat|critique/i, "Creer"],
  [/subjonctif|hypoth/i, "Querer"],
  [/politesse|réservation/i, "Poder"],
  [/conseils/i, "Deber"],
  [/récit|orientation/i, "Ir"],
];

/**
 * Construit une leçon. Le résultat est déterministe : une même leçon a toujours le même contenu
 * (dans l'appli, sur la page publique et dans la fiche PDF).
 */
export const generateStructuredLesson = (id: number) => {
  const levelIdx = Math.min(Math.max(Math.ceil(id / 20) - 1, 0), LEVELS.length - 1);
  const level = LEVELS[levelIdx];
  const position = (id - 1) % 20; // rang de la leçon dans son niveau
  const levelConfig = CURRICULUM_LOGIC[level] || [];
  const config = levelConfig[position] || { topic: `Leçon ${id}`, grammar: "Révision", category: "abstract" };

  // --- VOCABULAIRE : 3 mots du thème, sans répétition entre deux leçons du même thème ---
  const nouns: any = DATA_BANK.nouns;
  const category: any[] = nouns[config.category] || nouns.abstract;
  let pool = category.filter((n) => n.levels.includes(level));
  if (pool.length < 3) {
    // Pas assez de mots à ce niveau : on complète avec les niveaux les plus proches
    const distance = (n: any) => Math.min(...n.levels.map((l: string) => Math.abs(LEVELS.indexOf(l) - levelIdx)));
    pool = [...category].sort((x, y) => distance(x) - distance(y)).slice(0, Math.max(3, pool.length));
  }
  const previousUses = levelConfig.slice(0, position).filter((c) => c.category === config.category).length;
  const start = (previousUses * 3) % pool.length;
  let [c1, c2, c3] = [0, 1, 2].map((i) => pool[(start + i) % pool.length]);
  // Mots fixés pour cette leçon (thème précis) : ils remplacent ceux de la catégorie
  const fixed = LESSON_WORDS[id];
  if (fixed && fixed.length >= 3) {
    [c1, c2, c3] = fixed.slice(0, 3).map(([es, en, sentence, sentence_trans]) => ({ levels: [level], es, en, sentence, sentence_trans }));
  }

  // --- VERBE : celui du point de grammaire s'il existe, sinon rotation parmi les verbes du niveau ---
  const verbs = DATA_BANK.verbs;
  const grammarWords = config.grammar.toLowerCase().split(/[^a-záéíóúñ]+/);
  let verb = verbs.find((v) => grammarWords.includes(v.es.toLowerCase()));
  if (!verb) {
    const hint = GRAMMAR_VERB_HINTS.find(([pattern]) => pattern.test(config.grammar));
    if (hint) verb = verbs.find((v) => v.es === hint[1]);
  }
  if (!verb) {
    const levelVerbs = verbs.filter((v) => v.levels.includes(level));
    const candidates = levelVerbs.length >= 5 ? levelVerbs : verbs;
    verb = candidates[position % candidates.length];
  }
  const verbName = verb.es.toLowerCase();

  // --- EXERCICE DE CONJUGAISON : la personne change d'une leçon à l'autre ---
  const person = verb.conjugation[position % verb.conjugation.length];
  const personLabel = person.pronoun.toLowerCase();

  const structure = SENTENCE_STRUCTURES[(id - 1) % SENTENCE_STRUCTURES.length];
  const conn = DATA_BANK.connectors[(id - 1) % DATA_BANK.connectors.length];
  const tip = DATA_BANK.tips[(id - 1) % DATA_BANK.tips.length];
  const theme = config.topic;
  const clean = (text: string) => text.toLowerCase().replace(/[¿¡!.,;«»]/g, '').trim();

  let cardId = id * 1000;
  const word = (n: any) => ({ id: cardId++, type: "swipe", es: n.es, en: n.en, context: theme, sentence: n.sentence, sentence_trans: n.sentence_trans });

  return [
    { id: cardId++, type: "structure", save: false, title: `Leçon ${id} : ${theme}`, formula: `Verbe : ${verbName}`, example: `Structure : ${structure.title.charAt(0).toLowerCase()}${structure.title.slice(1)}`, note: `Au programme : 4 mots, 1 verbe, 1 structure et 3 exercices.` },
    word(c1),
    { id: cardId++, type: "grammar", title: `Le verbe ${verbName}`, description: `${verb.en} — présent de l'indicatif`, verb: verb.es, conjugation: verb.conjugation },
    { id: cardId++, type: "input", question: `Conjugue « ${verbName} » au présent avec « ${personLabel} »`, answer: [person.verb, `${personLabel} ${person.verb}`], hint: `${person.fr} → ${person.verb.charAt(0)}…` },
    word(c2),
    { id: cardId++, type: "structure", title: structure.title, formula: structure.formula, example: structure.example_es, example_fr: structure.example_en, note: structure.explanation },
    word(c3),
    { id: cardId++, type: "input", question: `Comment dit-on « ${c2.en.toLowerCase()} » ?`, answer: [clean(c2.es)], hint: `Commence par « ${c2.es.slice(0, 4)}… »` },
    { id: cardId++, type: "swipe", es: conn.es, en: conn.en, context: "Mot de liaison", sentence: conn.sentence, sentence_trans: conn.sentence_trans },
    { id: cardId++, type: "structure", save: false, title: "Le saviez-vous ?", formula: "Astuce", example: tip, note: "" },
    { id: cardId++, type: "input", question: `Traduis : « ${c1.sentence_trans} »`, answer: [clean(c1.sentence)], hint: `Utilise « ${c1.es.toLowerCase()} ».` }
  ];
};

// --- FONCTIONS UTILITAIRES POUR EXAMENS ET LECTURE ---

export const generateExamContent = (allContent: any, startId: number, endId: number, levelName: string, examId: number) => {
  let pool: any[] = [];
  for (let i = startId; i <= endId; i++) {
    if (allContent[i]) {
      pool = [...pool, ...allContent[i].filter((c: any) => (c.type === 'swipe' || c.type === 'input') && !/^Conjugue|^Comment dit-on/.test(c.question || ''))];
    }
  }
  if (pool.length < 10) return [{ id: examId, type: "structure", title: "Examen indisponible", formula: "Contenu en cours de chargement", example: "Réessaie dans un instant", note: "Si le problème persiste, contacte le support." }];
  const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 20);
  
  return [
    { id: examId, type: "structure", title: `Examen ${levelName}`, formula: "Test final", example: "20 questions", note: "Objectif : 16 bonnes réponses sur 20" },
    ...selected.map((item: any, idx: number) => {
        if (item.type === 'input') return { ...item, id: examId + idx + 1 };
        const questionText = item.sentence_trans ? `Traduis : « ${item.sentence_trans} »` : `Traduis : « ${item.en} »`;
        const answerText = item.sentence ? item.sentence : item.es;
        return {
            ...item,
            id: examId + idx + 1,
            type: 'input',
            question: questionText,
            answer: [answerText.toLowerCase().replace(/[¿¡!.,]/g, '').trim()],
            hint: item.context || "Pense au vocabulaire du niveau."
        };
    })
  ];
};

export const getDailyReading = (userLevel: string) => {
  const targetLevel = userLevel || "A1";
  const levelReadings = DAILY_READINGS.filter(r => r.level === targetLevel);
  const pool = levelReadings.length > 0 ? levelReadings : DAILY_READINGS;
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return pool[dayIndex % pool.length];
};

export const generateAllContent = () => {
  // @ts-ignore : On accepte que CONTENT_PART_1 ait des clés numériques
  const content: any = { ...CONTENT_PART_1 };
  for (let i = 1; i <= 100; i++) {
     if (!content[i]) {
        content[i] = generateStructuredLesson(i);
     }
  }
  return content;
};