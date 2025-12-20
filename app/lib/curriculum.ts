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
    { topic: "Salutations", grammar: "Présent (Ser)", category: "abstract" },
    { topic: "La Famille", grammar: "Possession", category: "family" },
    { topic: "La Maison", grammar: "Hay (Il y a)", category: "home" },
    { topic: "Nourriture", grammar: "Gustar", category: "food_fruit" },
    { topic: "Au Café", grammar: "Querer", category: "food_meal" },
    { topic: "Vêtements", grammar: "Couleurs", category: "clothing" },
    { topic: "La Ville", grammar: "Estar (Lieu)", category: "city" },
    { topic: "Transport", grammar: "Verbe Ir", category: "travel" },
    { topic: "Animaux", grammar: "Genre", category: "nature" },
    { topic: "Le Corps", grammar: "Tener", category: "health" },
    { topic: "Techno", grammar: "Objets", category: "tech" },
    { topic: "École", grammar: "Fournitures", category: "school" },
    { topic: "Météo", grammar: "Hacer", category: "nature" },
    { topic: "Routine", grammar: "Réflexifs", category: "home" },
    { topic: "Amis", grammar: "Ser vs Estar", category: "family" },
    { topic: "Achats", grammar: "Combien ça coûte", category: "food_fruit" },
    { topic: "Loisirs", grammar: "Jugar", category: "leisure" },
    { topic: "Voyage", grammar: "Futur Proche", category: "travel" },
    { topic: "Identité", grammar: "Nationalités", category: "abstract" },
    { topic: "Bilan A1", grammar: "Révision", category: "city" }
  ],
  A2: [
    { topic: "Passé", grammar: "Passé Composé", category: "home" },
    { topic: "Souvenirs", grammar: "Imparfait", category: "family" },
    { topic: "Projets", grammar: "Futur Simple", category: "job" },
    { topic: "Restaurant", grammar: "Politesse", category: "food_meal" },
    { topic: "Santé", grammar: "Dolor", category: "health" },
    { topic: "Shopping", grammar: "Comparatifs", category: "clothing" },
    { topic: "Maison", grammar: "Conditionnel", category: "home" },
    { topic: "Nature", grammar: "Superlatifs", category: "nature" },
    { topic: "Travail", grammar: "Obligation", category: "job" },
    { topic: "Internet", grammar: "Vocabulaire", category: "tech" },
    { topic: "Hôtel", grammar: "Réservation", category: "travel" },
    { topic: "Ville", grammar: "Orientation", category: "city" },
    { topic: "Cuisine", grammar: "Impératif", category: "food_fruit" },
    { topic: "Sentiments", grammar: "Estar + Adj", category: "abstract" },
    { topic: "Musique", grammar: "Opinion", category: "leisure" },
    { topic: "Sport", grammar: "Verbes", category: "health" },
    { topic: "Fêtes", grammar: "Traditions", category: "family" },
    { topic: "Argent", grammar: "Banque", category: "society" },
    { topic: "Urgences", grammar: "Impératif Négatif", category: "health" },
    { topic: "Bilan A2", grammar: "Validation", category: "travel" }
  ],
  B1: [
    { topic: "Opinions", grammar: "Subjonctif Présent", category: "abstract" },
    { topic: "Technologie", grammar: "Avantages", category: "tech" },
    { topic: "Environnement", grammar: "Futur Antérieur", category: "nature" },
    { topic: "Monde Pro", grammar: "Entretien", category: "job" },
    { topic: "Culture", grammar: "Art", category: "city" },
    { topic: "Relations", grammar: "Réciproque", category: "family" },
    { topic: "Santé Mentale", grammar: "Conseils", category: "health" },
    { topic: "Voyage", grammar: "Récit", category: "travel" },
    { topic: "Gastronomie", grammar: "Description", category: "food_meal" },
    { topic: "Mode", grammar: "Tendances", category: "clothing" },
    { topic: "Éducation", grammar: "Système", category: "school" },
    { topic: "Architecture", grammar: "Passif", category: "home" },
    { topic: "Politique", grammar: "Débat", category: "society" },
    { topic: "Histoire", grammar: "Concordance", category: "city" },
    { topic: "Science", grammar: "Hypothèses", category: "tech" },
    { topic: "Cinéma", grammar: "Critique", category: "leisure" },
    { topic: "Justice", grammar: "Loi", category: "society" },
    { topic: "Médias", grammar: "Journalisme", category: "tech" },
    { topic: "Philosophie", grammar: "Concepts", category: "abstract" },
    { topic: "Bilan B1", grammar: "Expertise", category: "job" }
  ],
  B2: [
    { topic: "Business", grammar: "Négociation", category: "job" },
    { topic: "Écologie", grammar: "Solutions", category: "nature" },
    { topic: "Littérature", grammar: "Style", category: "school" },
    { topic: "Psychologie", grammar: "Nuances", category: "abstract" },
    { topic: "Urbanisme", grammar: "Futur", category: "city" },
    { topic: "Médecine", grammar: "Technique", category: "health" },
    { topic: "Droit", grammar: "Vocabulaire", category: "society" },
    { topic: "Art", grammar: "Analyse", category: "leisure" },
    { topic: "Conflits", grammar: "Résolution", category: "family" },
    { topic: "Innovation", grammar: "Tech", category: "tech" },
    { topic: "Tourisme", grammar: "Impact", category: "travel" },
    { topic: "Nutrition", grammar: "Diète", category: "food_fruit" },
    { topic: "Cinéma", grammar: "Réalisation", category: "leisure" },
    { topic: "Histoire", grammar: "Mémoire", category: "city" },
    { topic: "Société", grammar: "Débat", category: "society" },
    { topic: "Finance", grammar: "Marchés", category: "job" },
    { topic: "Astronomie", grammar: "Espace", category: "nature" },
    { topic: "Langues", grammar: "Linguistique", category: "school" },
    { topic: "Bénévolat", grammar: "Social", category: "family" },
    { topic: "Bilan B2", grammar: "Maîtrise", category: "abstract" }
  ],
  C1: [
    { topic: "Rhétorique", grammar: "Discours", category: "abstract" },
    { topic: "Géopolitique", grammar: "Relations", category: "society" },
    { topic: "Bioéthique", grammar: "Débat", category: "health" },
    { topic: "Métaphysique", grammar: "Concepts", category: "abstract" },
    { topic: "Finance", grammar: "Bourse", category: "job" },
    { topic: "Luxe", grammar: "Marché", category: "clothing" },
    { topic: "Gastronomie", grammar: "Haute Cuisine", category: "food_meal" },
    { topic: "Architecture", grammar: "Patrimoine", category: "city" },
    { topic: "Cinéma", grammar: "Essai", category: "leisure" },
    { topic: "Littérature", grammar: "Poésie", category: "school" },
    { topic: "Diplomatie", grammar: "Protocole", category: "job" },
    { topic: "Neuroscience", grammar: "Cerveau", category: "health" },
    { topic: "Climat", grammar: "Urgence", category: "nature" },
    { topic: "Anthropologie", grammar: "Culture", category: "family" },
    { topic: "Archéologie", grammar: "Fouilles", category: "travel" },
    { topic: "Théâtre", grammar: "Dramaturgie", category: "leisure" },
    { topic: "Musique", grammar: "Composition", category: "leisure" },
    { topic: "Journalisme", grammar: "Investigation", category: "society" },
    { topic: "Traduction", grammar: "Nuances", category: "school" },
    { topic: "Expertise C1", grammar: "Final", category: "abstract" }
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
            desc: `Niveau ${lvl}` 
        });
    }
});