export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readingTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "comment-rouler-les-r",
    title: "Comment rouler les R comme un natif",
    excerpt: "La technique infaillible pour maîtriser la vibration de la langue et ne plus jamais bloquer sur le mot 'perro'.",
    date: "2023-10-15",
    category: "Prononciation",
    readingTime: "5 min",
    content: `
      <p>Rouler les R est souvent le plus grand défi pour les francophones. Contrairement au R guttural français, le R espagnol se fait avec la pointe de la langue.</p>
      <h3>L'exercice de la moto</h3>
      <p>Pour réussir, imaginez que vous imitez le bruit d'un moteur : <em>brrrrum</em>. Votre langue doit être détendue et vibrer contre le palais, juste derrière les dents du haut.</p>
      <p>Ne forcez pas ! C'est le passage de l'air qui crée la vibration, pas votre force musculaire.</p>
      <h3>Les mots pièges</h3>
      <p>Entraînez-vous avec ces mots : <strong>Rápido, Carro, Ferrocarril</strong>. Répétez-les chaque matin sous la douche !</p>
    `
  },
  {
    id: "2",
    slug: "ser-vs-estar-astuce",
    title: "Ser vs Estar : L'astuce définitive",
    excerpt: "Ne confondez plus jamais ces deux verbes grâce à la règle du DOCTOR et du PLACE.",
    date: "2023-10-20",
    category: "Grammaire",
    readingTime: "4 min",
    content: `
      <p>C'est la question classique : quand utiliser Ser et quand utiliser Estar ? Voici les acronymes magiques.</p>
      <h3>SER = DOCTOR</h3>
      <ul>
        <li><strong>D</strong>escription (physique/personnalité)</li>
        <li><strong>O</strong>ccupation (métier)</li>
        <li><strong>C</strong>aractéristique (permanente)</li>
        <li><strong>T</strong>emps (heure/date)</li>
        <li><strong>O</strong>rigine</li>
        <li><strong>R</strong>elation</li>
      </ul>
      <h3>ESTAR = PLACE</h3>
      <ul>
        <li><strong>P</strong>osition</li>
        <li><strong>L</strong>ieu (Location)</li>
        <li><strong>A</strong>ction (en cours)</li>
        <li><strong>C</strong>ondition (variable, malade/fatigué)</li>
        <li><strong>E</strong>motion</li>
      </ul>
      <p>Mémorisez ceci et vous aurez juste à 95% du temps !</p>
    `
  },
  {
    id: "3",
    slug: "5-erreurs-debutants-francais",
    title: "5 erreurs que font tous les débutants français",
    excerpt: "Les faux amis et les pièges grammaticaux classiques à éviter dès le premier jour.",
    date: "2023-10-28",
    category: "Astuces",
    readingTime: "6 min",
    content: `
      <p>Le français et l'espagnol sont cousins, mais attention aux faux amis !</p>
      <h3>1. Je suis chaud / Estoy caliente</h3>
      <p>Grosse erreur ! En espagnol, <em>Estoy caliente</em> a une connotation sexuelle. Pour dire que vous avez chaud (température), dites <strong>Tengo calor</strong>.</p>
      <h3>2. Embarazada</h3>
      <p>Cela ne veut pas dire "embarrassée" (qui se dit <em>avergonzada</em>), mais <strong>enceinte</strong> ! Imaginez le malaise...</p>
      <h3>3. Oublier le 'A' personnel</h3>
      <p>Quand le COD est une personne, on ajoute un 'a'. On ne dit pas <em>Veo mi amigo</em> mais <strong>Veo a mi amigo</strong>.</p>
    `
  }
];