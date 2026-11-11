// Format de rédaction des leçons : une leçon = un objectif de grammaire + un thème, et tout sert cet objectif.
// Les leçons sont écrites une fois pour toutes ici (pas générées au hasard) ; `buildLesson` les transforme
// en cartes pour le moteur de leçons.

/** [espagnol, français, phrase d'exemple, traduction de la phrase] */
export type Word = [string, string, string, string];

/** Ligne de tableau : [libellé à gauche, forme espagnole, traduction ou exemple à droite] */
export type Row = [string, string, string];

export type Exercise =
  /** Question à choix : énoncé, options, bonne réponse, explication facultative */
  | ['choice', string, string[], string, string?]
  /** Phrase à compléter : énoncé, réponses acceptées, indice facultatif */
  | ['fill', string, string[], string?]
  /** Traduction vers l'espagnol : phrase française, réponses acceptées, indice facultatif */
  | ['translate', string, string[], string?];

export interface Table {
  title: string;
  description: string;
  /** Infinitif, si le tableau est une conjugaison (les lignes sont alors lues « pronom + verbe ») */
  verb?: string;
  /** Identifiant dans le lexique, quand le même verbe a plusieurs tableaux (un par temps) */
  key?: string;
  rows: Row[];
}

export interface AuthoredLesson {
  id: number;
  /** Titre affiché dans le parcours */
  title: string;
  /** Point de grammaire travaillé */
  grammar: string;
  /** Ce que l'élève saura faire à la fin */
  goal: string;
  rule: { title: string; formula: string; note: string; example: string; example_fr: string };
  tables?: Table[];
  words: Word[];
  exercises: Exercise[];
  /** Rappels des leçons précédentes */
  review?: Exercise[];
}

const PRONOUNS = ['Yo', 'Tú', 'Él / Ella', 'Nosotros', 'Vosotros', 'Ellos'];

/** Tableau de conjugaison à partir des six formes. Sans `tense`, c'est le présent de l'indicatif. */
export const conj = (verb: string, fr: string, forms: string[], frForms: string[], tense?: string): Table => ({
  title: tense ? `${verb} au ${tense}` : `Le verbe ${verb.toLowerCase()}`,
  description: `${fr} — ${tense || "présent de l'indicatif"}`,
  verb,
  key: tense ? `${verb.toLowerCase()} (${tense})` : undefined,
  rows: forms.map((form, i) => [PRONOUNS[i], form, frForms[i]] as Row),
});

const exerciseCard = (ex: Exercise, id: number, theme: string, isReview: boolean) => {
  const prefix = isReview ? 'Rappel · ' : '';
  if (ex[0] === 'choice') {
    const [, question, options, answer, explain] = ex;
    return { id, type: 'choice', question, options, answer, explain, label: isReview ? 'Rappel' : undefined, context: theme };
  }
  const [kind, text, answers, hint] = ex;
  const first = answers[0];
  return {
    id,
    type: 'input',
    question: kind === 'translate' ? `${prefix}Traduis : « ${text} »` : `${prefix}Complète : ${text}`,
    answer: answers,
    hint: hint || `Commence par « ${first.slice(0, Math.min(2, first.length))}… »`,
    context: theme,
  };
};

/** Transforme une leçon rédigée en cartes : objectif → règle → tableaux → mots → exercices → rappels. */
export const buildLesson = (lesson: AuthoredLesson) => {
  let cardId = lesson.id * 1000;
  const next = () => cardId++;
  return [
    { id: next(), type: 'structure', save: false, title: `Leçon ${lesson.id} : ${lesson.title}`, formula: lesson.grammar, note: `Objectif : ${lesson.goal}`, example: '' },
    { id: next(), type: 'structure', title: lesson.rule.title, formula: lesson.rule.formula, note: lesson.rule.note, example: lesson.rule.example, example_fr: lesson.rule.example_fr },
    ...(lesson.tables || []).map((t) => ({
      id: next(), type: 'grammar', title: t.title, description: t.description, verb: t.verb, key: t.key,
      conjugation: t.rows.map(([pronoun, verb, fr]) => ({ pronoun, verb, fr })),
    })),
    ...lesson.words.map(([es, en, sentence, sentence_trans]) => ({ id: next(), type: 'swipe', es, en, context: lesson.title, sentence, sentence_trans })),
    ...lesson.exercises.map((ex) => exerciseCard(ex, next(), lesson.title, false)),
    ...(lesson.review || []).map((ex) => exerciseCard(ex, next(), lesson.title, true)),
  ];
};
