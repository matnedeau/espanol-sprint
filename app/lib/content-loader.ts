// Charge à la demande les gros fichiers de contenu (histoires, banque de données, générateur)
// pour qu'ils ne ralentissent pas l'affichage de la page d'accueil.
let cache: Promise<any> | null = null;

export function loadContent() {
  if (!cache) {
    cache = Promise.all([import('./generator'), import('./stories'), import('./data-bank')]).then(
      ([generator, stories, bank]) => ({
        generateAllContent: generator.generateAllContent,
        generateExamContent: generator.generateExamContent,
        getDailyReading: generator.getDailyReading,
        STORIES_DATA: stories.STORIES_DATA,
        SENTENCE_STRUCTURES: bank.SENTENCE_STRUCTURES,
      }),
    );
  }
  return cache;
}
