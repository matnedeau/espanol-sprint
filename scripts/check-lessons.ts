// Contrôle automatique des leçons rédigées : npm run check:lessons
// Erreurs = incohérences à corriger. Avertissements = mots utilisés dans un exercice sans avoir été vus avant.
import { AUTHORED_LESSONS } from '../app/lib/lessons/index.ts';
import type { AuthoredLesson, Exercise } from '../app/lib/lessons/types.ts';

const errors: string[] = [];
const warnings: string[] = [];
const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿¡!.,;?«»()…:·/]/g, ' ').replace(/\s+/g, ' ').trim();
const tokens = (t: string) => norm(t).split(' ').filter((w) => w && w !== '___' && !/^\d+$/.test(w));

// Prénoms, lieux et mots transparents que l'élève n'a pas besoin d'avoir appris
const FREE = new Set(['ana', 'carlos', 'madrid', 'espana', 'mexico', 'euros', 'ingles', 'paella', 'garcia', 'romanos', 'cervantes', 'america', 'argentina', 'h']);

const lessons: AuthoredLesson[] = Object.values(AUTHORED_LESSONS).sort((a, b) => a.id - b.id);
const seenWords = new Map<string, number>();
const seenRuleTitles = new Map<string, number>();
const seenTableTitles = new Map<string, number>();
const known = new Set<string>(FREE);

// Texte espagnol que l'élève doit comprendre pour faire l'exercice (les mauvaises réponses proposées
// et la forme à trouver ne comptent pas : c'est justement ce qui est testé).
const spanishOf = (ex: Exercise): string[] => {
  if (ex[0] === 'choice') return [...ex[1].matchAll(/«([^»]+)»/g)].map((m) => m[1]).filter(() => ex[1].trim().startsWith('«'));
  if (ex[0] === 'fill') return [ex[1].replace(/\([^)]*\)/g, '')];
  return [ex[2][0]];
};

// Un mot est connu s'il a été vu tel quel ou à une autre forme (pluriel, féminin).
const isKnown = (w: string) => known.has(w) || [w.replace(/es$/, ''), w.replace(/s$/, ''), w.replace(/as?$/, 'o'), w.replace(/os$/, 'o'), w.replace(/a$/, ''), w.replace(/ado$/, 'ar'), w.replace(/ido$/, 'er'), w.replace(/ido$/, 'ir')].some((v) => known.has(v))
  // Forme conjuguée d'un verbe déjà vu (même radical) : trabajaré ← trabajar
  || (w.length >= 5 && [...known].some((k) => k.length >= 5 && k.slice(0, 5) === w.slice(0, 5)));

for (const lesson of lessons) {
  const where = `Leçon ${lesson.id} (${lesson.title})`;
  const all = [...lesson.exercises, ...(lesson.review || [])];

  if (lesson.words.length < 4) errors.push(`${where} : moins de 4 mots`);
  if (lesson.exercises.length < 5) errors.push(`${where} : moins de 5 exercices`);
  if (lesson.id > 1 && lesson.id % 20 !== 0 && (lesson.review || []).length < 2) errors.push(`${where} : moins de 2 rappels`);

  for (const [es, fr, sentence, trans] of lesson.words) {
    if (!es || !fr || !sentence || !trans) errors.push(`${where} : mot incomplet « ${es} »`);
    const key = norm(es);
    if (seenWords.has(key)) errors.push(`${where} : « ${es} » déjà enseigné en leçon ${seenWords.get(key)}`);
    seenWords.set(key, lesson.id);
  }
  if (seenRuleTitles.has(lesson.rule.title)) errors.push(`${where} : titre de règle déjà utilisé en leçon ${seenRuleTitles.get(lesson.rule.title)}`);
  seenRuleTitles.set(lesson.rule.title, lesson.id);
  for (const t of lesson.tables || []) {
    const key = t.key || t.verb || t.title;
    if (seenTableTitles.has(key)) errors.push(`${where} : tableau « ${key} » déjà utilisé en leçon ${seenTableTitles.get(key)}`);
    seenTableTitles.set(key, lesson.id);
    if (t.rows.length < 3) errors.push(`${where} : tableau « ${t.title} » trop court`);
  }

  for (const ex of all) {
    if (ex[0] === 'choice') {
      const [, q, options, answer] = ex;
      if (!options.includes(answer)) errors.push(`${where} : la bonne réponse « ${answer} » n'est pas dans les options de « ${q} »`);
      if (new Set(options).size !== options.length) errors.push(`${where} : options en double dans « ${q} »`);
      if (options.length < 2) errors.push(`${where} : une seule option dans « ${q} »`);
    } else {
      const [kind, q, answers] = ex;
      if (!answers.length || answers.some((a) => !a.trim())) errors.push(`${where} : réponse vide pour « ${q} »`);
      if (kind === 'fill' && !q.includes('___')) errors.push(`${where} : pas de trou « ___ » dans « ${q} »`);
      for (const a of answers) if (a !== norm(a)) warnings.push(`${where} : réponse non normalisée « ${a} » (accents et majuscules sont ignorés à la saisie)`);
    }
  }

  // Ce que la leçon enseigne devient « connu » avant de vérifier ses exercices
  if ((lesson.tables || []).some((t) => t.verb)) ['yo', 'tu', 'el', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas'].forEach((w) => known.add(w));
  const taught = [lesson.rule.example, lesson.rule.formula, lesson.rule.note, ...lesson.words.flatMap(([es, , s]) => [es, s]), ...(lesson.tables || []).flatMap((t) => [t.verb || '', ...t.rows.flatMap((r) => (t.verb ? [r[1]] : [r[1], r[2]]))])];
  taught.forEach((t) => tokens(t).forEach((w) => known.add(w)));

  for (const ex of all) {
    const unknown = [...new Set(spanishOf(ex).flatMap(tokens))].filter((w) => !isKnown(w));
    if (unknown.length) warnings.push(`${where} : « ${ex[1]} » utilise des mots non vus : ${unknown.join(', ')}`);
  }
}

console.log(`${lessons.length} leçons contrôlées, ${seenWords.size} mots, ${lessons.reduce((n, l) => n + l.exercises.length + (l.review || []).length, 0)} exercices.`);
warnings.forEach((w) => console.log('⚠️  ' + w));
errors.forEach((e) => console.log('❌ ' + e));
console.log(errors.length ? `\n${errors.length} erreur(s).` : '\nAucune erreur.');
process.exit(errors.length ? 1 : 0);
