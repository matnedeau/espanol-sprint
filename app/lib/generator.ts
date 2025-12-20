import { DATA_BANK, DAILY_READINGS, CONTENT_PART_1 } from './data-bank';
import { CURRICULUM_LOGIC } from './curriculum';

// --- CŒUR DU GÉNÉRATEUR ---

export const generateStructuredLesson = (id: number) => {
  let level = "A1";
  if (id > 20) level = "A2";
  if (id > 40) level = "B1";
  if (id > 60) level = "B2";
  if (id > 80) level = "C1";

  // @ts-ignore : Indexation dynamique complexe
  const levelConfig = CURRICULUM_LOGIC[level] || [];
  const config = levelConfig[(id - 1) % levelConfig.length] || { topic: `Leçon ${id}`, grammar: "Général", category: "abstract" };
  const topicLower = config.topic.toLowerCase();
  const grammarLower = config.grammar.toLowerCase();

  // SÉLECTION DU VOCABULAIRE
  const forcedCategory = config.category;
  
  const getCandidatePool = (cat: string) => {
      // @ts-ignore : Accès dynamique aux clés de DATA_BANK.nouns
      let pool = DATA_BANK.nouns[cat] ? DATA_BANK.nouns[cat] : DATA_BANK.nouns['abstract'];
      // @ts-ignore : Typage faible pour l'objet pool
      const levelPool = pool.filter((n: any) => n.levels.includes(level));
      return levelPool.length > 2 ? levelPool : pool;
  };

  let candidates = getCandidatePool(forcedCategory);
  // @ts-ignore
  const shuffledCandidates = candidates.sort(() => 0.5 - Math.random());

  let card1Noun = shuffledCandidates[0];
  let card2Noun = shuffledCandidates[1] || shuffledCandidates[0];
  let card3Noun = shuffledCandidates[2] || shuffledCandidates[0];

  if (shuffledCandidates.length < 3) {
      // @ts-ignore
      const backup = getCandidatePool('abstract').sort(() => 0.5 - Math.random());
      if (!card2Noun) card2Noun = backup[0];
      if (!card3Noun) card3Noun = backup[1];
  }

  // SÉLECTION DU VERBE
  const topicToVerbMap: Record<string, string[]> = {
    "obligation": ["Deber", "Tener"],
    "futur": ["Ir", "Haber", "Pensar"],
    "passé": ["Haber", "Tener", "Ser"],
    "opinion": ["Creer", "Pensar", "Sentir"],
    "subjonctif": ["Querer", "Pedir", "Dudar"],
    "mouvement": ["Ir", "Salir", "Venir"],
    "état": ["Estar", "Ser", "Sentir"]
  };

  let targetVerbName = null;
  for (const [key, verbs] of Object.entries(topicToVerbMap)) {
    if (grammarLower.includes(key) || topicLower.includes(key)) {
      targetVerbName = verbs[Math.floor(Math.random() * verbs.length)];
      break;
    }
  }

  if (!targetVerbName) {
    const levelFallbacks: Record<string, string[]> = {
      "A1": ["Ser", "Tener", "Hacer"],
      "A2": ["Poder", "Querer", "Deber"],
      "B1": ["Creer", "Pensar", "Sentir"],
      "B2": ["Creer", "Sentir", "Haber"],
      "C1": ["Creer", "Pensar", "Haber"]
    };
    // @ts-ignore
    const candidates = levelFallbacks[level] || ["Ser"];
    targetVerbName = candidates[id % candidates.length];
  }
  const randVerb = DATA_BANK.verbs.find(v => v.es === targetVerbName) || DATA_BANK.verbs[0];

  // CONSTRUCTION
  const adj = DATA_BANK.adjectives[(id + 2) % DATA_BANK.adjectives.length];
  const conn = DATA_BANK.connectors[id % DATA_BANK.connectors.length];
  const tip = DATA_BANK.tips[id % DATA_BANK.tips.length];

  let cardId = id * 1000;
  const isPlural = id % 2 === 0;
  const grammarQuestionText = isPlural ? `Conjugue : Nosotros (${randVerb.es})` : `Conjugue : Tú (${randVerb.es})`;
  const targetPronoun = isPlural ? "Nos" : "Tú";
  const conjFn = randVerb.conjugation.find(c => c.pronoun.includes(targetPronoun) || (targetPronoun === "Nos" && c.pronoun.includes("Nosotros")));
  const grammarAnswer = conjFn ? [conjFn.verb] : [randVerb.conjugation[0].verb];

  const c1 = { ...card1Noun, context: "Mot clé", sentence: card1Noun.sentence, sentence_trans: card1Noun.sentence_trans };
  const c2 = { ...card2Noun, context: "Contexte", sentence: card2Noun.sentence, sentence_trans: card2Noun.sentence_trans };
  const c3 = { ...card3Noun, context: "Exemple", sentence: card3Noun.sentence, sentence_trans: card3Noun.sentence_trans };

  return [
    { id: cardId++, type: "structure", title: `Leçon ${id} : ${config.topic}`, formula: config.grammar, example: `Verbe focus : ${randVerb.es}`, note: `Niveau ${level}` },
    { id: cardId++, type: "swipe", es: c1.es, en: c1.en, context: c1.context, sentence: c1.sentence, sentence_trans: c1.sentence_trans },
    { id: cardId++, type: "grammar", title: `Verbe : ${randVerb.es}`, description: randVerb.en, verb: randVerb.es, conjugation: randVerb.conjugation },
    { id: cardId++, type: "input", question: grammarQuestionText, answer: grammarAnswer, hint: `Verbe ${randVerb.es}` },
    { id: cardId++, type: "swipe", es: c2.es, en: c2.en, context: c2.context, sentence: c2.sentence, sentence_trans: c2.sentence_trans },
    { id: cardId++, type: "structure", title: "L'Accord", formula: "Nom + Adjectif", example: `${c1.es} ${adj.es.toLowerCase()}`, note: "L'adjectif s'accorde." },
    { id: cardId++, type: "swipe", es: c3.es, en: c3.en, context: c3.context, sentence: c3.sentence, sentence_trans: c3.sentence_trans },
    { id: cardId++, type: "swipe", es: conn.es, en: conn.en, context: "Liaison", sentence: `${conn.es}, es importante.`, sentence_trans: `${conn.en}, c'est important.` },
    { id: cardId++, type: "structure", title: "Astuce", formula: "Bon à savoir", example: tip, note: "Culture" },
    { id: cardId++, type: "input", question: `Traduis : "${c1.sentence_trans}"`, answer: [c1.sentence.toLowerCase().replace(/[¿¡!.,]/g, '')], hint: "Utilise le vocabulaire vu." }
  ];
};

// --- FONCTIONS UTILITAIRES POUR EXAMENS ET LECTURE ---

export const generateExamContent = (allContent: any, startId: number, endId: number, levelName: string, examId: number) => {
  let pool: any[] = [];
  for (let i = startId; i <= endId; i++) {
    if (allContent[i]) {
      pool = [...pool, ...allContent[i].filter((c: any) => c.type === 'swipe' || c.type === 'input')];
    }
  }
  if (pool.length < 10) return [{ id: examId, type: "structure", title: "Erreur", formula: "...", example: "...", note: "Contacte le support." }];
  const selected = pool.sort(() => 0.5 - Math.random()).slice(0, 20);
  
  return [
    { id: examId, type: "structure", title: `EXAMEN ${levelName}`, formula: "Test Final", example: "20 Questions", note: "Objectif 16/20" },
    ...selected.map((item: any, idx: number) => {
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