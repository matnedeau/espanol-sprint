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

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "comment-rouler-les-r",
    title: "Comment rouler les R comme un natif",
    excerpt: "La technique pas à pas pour faire vibrer sa langue et ne plus jamais bloquer sur le mot « perro ».",
    date: "2023-10-15",
    category: "Prononciation",
    readingTime: "5 min",
    content: `
      <p>Rouler les R est souvent le plus grand défi des francophones. Contrairement au R français, qui se forme au fond de la gorge, le R espagnol se prononce avec la pointe de la langue.</p>
      <h3>Deux R à ne pas confondre</h3>
      <p>L'espagnol possède en réalité deux sons : le R simple, un battement bref de la langue (<em>pero</em>, « mais »), et le R roulé, une vibration prolongée (<em>perro</em>, « chien »). On roule le R lorsqu'il est doublé ou placé en début de mot : <em>rojo</em>, <em>carro</em>.</p>
      <h3>L'exercice de la moto</h3>
      <p>Imitez le bruit d'un moteur : <em>brrrrum</em>. Votre langue doit rester détendue et vibrer contre le palais, juste derrière les dents du haut.</p>
      <p>Ne forcez pas ! C'est le passage de l'air qui crée la vibration, pas la force musculaire.</p>
      <h3>L'astuce du « D »</h3>
      <p>Si la vibration ne vient pas, répétez rapidement « te-de-te-de » : la langue frappe exactement au bon endroit. Remplacez ensuite « de » par un R bref, puis allongez-le.</p>
      <h3>Les mots pour s'entraîner</h3>
      <p>Répétez chaque jour : <strong>rápido, carro, ferrocarril</strong>. Deux minutes sous la douche suffisent, et la plupart des apprenants y arrivent en quelques semaines.</p>
    `
  },
  {
    id: "2",
    slug: "ser-vs-estar-astuce",
    title: "Ser ou estar : l'astuce pour ne plus hésiter",
    excerpt: "Ne confondez plus jamais ces deux verbes grâce aux moyens mnémotechniques DOCTOR et PLACE.",
    date: "2023-10-20",
    category: "Grammaire",
    readingTime: "4 min",
    content: `
      <p>C'est la question classique : quand utiliser <em>ser</em> et quand utiliser <em>estar</em> ? Les deux se traduisent par « être », mais ils ne sont pas interchangeables. Voici deux acronymes pour s'en souvenir.</p>
      <h3>SER = DOCTOR</h3>
      <ul>
        <li><strong>D</strong>escription (physique, personnalité) : <em>Es alto.</em></li>
        <li><strong>O</strong>ccupation (métier) : <em>Soy profesor.</em></li>
        <li><strong>C</strong>aractéristique durable : <em>Es inteligente.</em></li>
        <li><strong>T</strong>emps (heure, date) : <em>Son las tres.</em></li>
        <li><strong>O</strong>rigine : <em>Soy de Francia.</em></li>
        <li><strong>R</strong>elation : <em>Es mi hermano.</em></li>
      </ul>
      <h3>ESTAR = PLACE</h3>
      <ul>
        <li><strong>P</strong>osition : <em>Está sentado.</em></li>
        <li><strong>L</strong>ieu : <em>Estoy en Madrid.</em></li>
        <li><strong>A</strong>ction en cours : <em>Estoy comiendo.</em></li>
        <li><strong>C</strong>ondition passagère (malade, fatigué) : <em>Está cansada.</em></li>
        <li><strong>É</strong>motion : <em>Estoy feliz.</em></li>
      </ul>
      <h3>Le piège : un adjectif, deux sens</h3>
      <p>Certains adjectifs changent de sens selon le verbe : <em>ser listo</em> signifie « être intelligent », <em>estar listo</em> « être prêt » ; <em>ser aburrido</em> « être ennuyeux », <em>estar aburrido</em> « s'ennuyer ».</p>
      <p>Retenez ces deux acronymes et vous aurez juste dans plus de neuf cas sur dix !</p>
    `
  },
  {
    id: "3",
    slug: "5-erreurs-debutants-francais",
    title: "5 erreurs que font tous les débutants francophones",
    excerpt: "Les faux amis et les pièges grammaticaux classiques à éviter dès le premier jour.",
    date: "2023-10-28",
    category: "Astuces",
    readingTime: "6 min",
    content: `
      <p>Le français et l'espagnol sont des langues cousines, ce qui est un avantage… et une source de pièges. Voici les cinq erreurs les plus fréquentes.</p>
      <h3>1. « Estoy caliente » pour dire « j'ai chaud »</h3>
      <p>Grosse erreur : <em>estoy caliente</em> a une connotation sexuelle. Pour parler de la température, dites <strong>tengo calor</strong>. De même, on dit <em>tengo frío</em>, <em>tengo hambre</em> et <em>tengo sueño</em>.</p>
      <h3>2. « Embarazada »</h3>
      <p>Ce mot ne veut pas dire « embarrassée » (qui se dit <em>avergonzada</em>), mais <strong>enceinte</strong> ! Imaginez le malentendu…</p>
      <h3>3. Oublier le « a » devant une personne</h3>
      <p>Quand le complément d'objet direct est une personne, on ajoute la préposition <em>a</em>. On ne dit pas <em>Veo mi amigo</em>, mais <strong>Veo a mi amigo</strong>.</p>
      <h3>4. Traduire « j'ai 20 ans » avec « ser »</h3>
      <p>En espagnol comme en français, on « a » son âge : <strong>Tengo veinte años</strong>, et surtout pas <em>Soy veinte años</em>.</p>
      <h3>5. Répéter le pronom sujet</h3>
      <p>Dire <em>yo</em> à chaque phrase sonne peu naturel. La terminaison du verbe suffit : <strong>Hablo español</strong>. Gardez <em>yo</em> pour insister : <em>Yo no fui</em> (« Ce n'est pas moi »).</p>
    `
  },
  {
    id: "4",
    slug: "por-ou-para-difference",
    title: "Por ou para : la différence expliquée simplement",
    excerpt: "Deux prépositions pour un seul « pour » français. Voici la logique qui se cache derrière chacune.",
    date: "2026-09-08",
    category: "Grammaire",
    readingTime: "5 min",
    content: `
      <p>En français, « pour » fait tout le travail. En espagnol, il faut choisir entre <em>por</em> et <em>para</em>. La bonne nouvelle : la logique est simple.</p>
      <h3>Para regarde vers l'avant : le but, la destination</h3>
      <ul>
        <li><strong>Objectif</strong> : <em>Estudio para aprender.</em> (J'étudie pour apprendre.)</li>
        <li><strong>Destinataire</strong> : <em>Este regalo es para ti.</em> (Ce cadeau est pour toi.)</li>
        <li><strong>Destination</strong> : <em>Salgo para Madrid.</em> (Je pars pour Madrid.)</li>
        <li><strong>Échéance</strong> : <em>Es para mañana.</em> (C'est pour demain.)</li>
      </ul>
      <h3>Por regarde vers l'arrière : la cause, le moyen</h3>
      <ul>
        <li><strong>Cause</strong> : <em>Gracias por tu ayuda.</em> (Merci pour ton aide.)</li>
        <li><strong>Moyen</strong> : <em>Te llamo por teléfono.</em> (Je t'appelle par téléphone.)</li>
        <li><strong>Lieu traversé</strong> : <em>Paseo por el parque.</em> (Je me promène dans le parc.)</li>
        <li><strong>Durée</strong> : <em>Viví allí por dos años.</em> (J'y ai vécu pendant deux ans.)</li>
        <li><strong>Échange</strong> : <em>Lo compré por diez euros.</em> (Je l'ai acheté pour dix euros.)</li>
      </ul>
      <h3>Le test rapide</h3>
      <p>Si vous pouvez remplacer « pour » par « afin de » ou « à destination de », choisissez <strong>para</strong>. Si vous pouvez le remplacer par « à cause de », « par » ou « en échange de », choisissez <strong>por</strong>.</p>
      <blockquote>Un exemple qui résume tout : <em>Trabajo por mi familia</em> (à cause d'elle, c'est ma motivation) et <em>Trabajo para mi familia</em> (elle est mon employeur ou la bénéficiaire).</blockquote>
    `
  },
  {
    id: "5",
    slug: "100-mots-espagnol-les-plus-utiles",
    title: "Les mots espagnols les plus utiles pour se débrouiller",
    excerpt: "Avec quelques dizaines de mots bien choisis, on comprend déjà l'essentiel d'une conversation. Voici par où commencer.",
    date: "2026-09-22",
    category: "Vocabulaire",
    readingTime: "6 min",
    content: `
      <p>Dans toutes les langues, un petit nombre de mots revient sans cesse. Plutôt que d'apprendre des listes au hasard, commencez par ceux qui servent tous les jours.</p>
      <h3>Les indispensables de la politesse</h3>
      <table>
        <tr><th>Espagnol</th><th>Français</th></tr>
        <tr><td>Hola / Buenos días</td><td>Salut / Bonjour</td></tr>
        <tr><td>Por favor</td><td>S'il vous plaît</td></tr>
        <tr><td>Gracias / De nada</td><td>Merci / De rien</td></tr>
        <tr><td>Perdón / Lo siento</td><td>Pardon / Je suis désolé</td></tr>
        <tr><td>Hasta luego</td><td>À plus tard</td></tr>
      </table>
      <h3>Les petits mots qui construisent les phrases</h3>
      <p><strong>y</strong> (et), <strong>pero</strong> (mais), <strong>porque</strong> (parce que), <strong>con</strong> (avec), <strong>sin</strong> (sans), <strong>muy</strong> (très), <strong>también</strong> (aussi), <strong>ahora</strong> (maintenant), <strong>aquí</strong> (ici).</p>
      <h3>Les verbes à connaître en premier</h3>
      <p><strong>ser</strong> et <strong>estar</strong> (être), <strong>tener</strong> (avoir), <strong>ir</strong> (aller), <strong>hacer</strong> (faire), <strong>querer</strong> (vouloir), <strong>poder</strong> (pouvoir), <strong>hablar</strong> (parler), <strong>comer</strong> (manger).</p>
      <h3>Les questions de survie</h3>
      <ul>
        <li><em>¿Dónde está…?</em> — Où se trouve… ?</li>
        <li><em>¿Cuánto cuesta?</em> — Combien ça coûte ?</li>
        <li><em>¿Puede repetir, por favor?</em> — Pouvez-vous répéter, s'il vous plaît ?</li>
        <li><em>No entiendo.</em> — Je ne comprends pas.</li>
      </ul>
      <h3>La bonne méthode pour les retenir</h3>
      <p>Apprenez chaque mot dans une phrase, écoutez-le à voix haute et révisez-le plusieurs jours de suite. C'est exactement ce que proposent les leçons d'EspañolSprint : cinq minutes par jour suffisent.</p>
    `
  },
  {
    id: "6",
    slug: "apprendre-espagnol-rapidement-methode",
    title: "Apprendre l'espagnol rapidement : la méthode en 5 étapes",
    excerpt: "Régularité, écoute, pratique orale : les habitudes qui font vraiment la différence quand on part de zéro.",
    date: "2026-10-06",
    category: "Méthode",
    readingTime: "7 min",
    content: `
      <p>Bonne nouvelle : pour un francophone, l'espagnol est l'une des langues les plus accessibles. Une grande partie du vocabulaire ressemble au français et la prononciation est régulière. Encore faut-il s'y prendre de la bonne façon.</p>
      <h3>1. Un peu chaque jour plutôt que beaucoup une fois par semaine</h3>
      <p>La mémoire retient mieux ce qu'elle revoit souvent. Dix minutes quotidiennes valent mieux qu'une heure le dimanche. Fixez un moment précis : le café du matin, le trajet en métro.</p>
      <h3>2. Commencer par les mots et les verbes les plus fréquents</h3>
      <p>Les verbes <em>ser, estar, tener, ir</em> et <em>hacer</em> apparaissent dans presque toutes les conversations. Maîtrisez-les au présent avant de vous lancer dans les temps du passé.</p>
      <h3>3. Écouter dès le premier jour</h3>
      <p>Histoires courtes, chansons, séries en version originale sous-titrée : votre oreille doit s'habituer au rythme de la langue. Peu importe de ne pas tout comprendre au début.</p>
      <h3>4. Parler, même mal</h3>
      <p>C'est l'étape que tout le monde repousse, et c'est pourtant celle qui fait le plus progresser. Répétez les phrases à voix haute, parlez-vous à vous-même, ou entraînez-vous avec un coach IA qui ne vous jugera jamais.</p>
      <h3>5. Mesurer ses progrès</h3>
      <p>Passez un test de niveau au départ, puis tous les deux ou trois mois. Voir sa progression est le meilleur carburant pour la motivation.</p>
      <blockquote>Combien de temps faut-il ? Avec une pratique quotidienne, comptez environ trois mois pour tenir une conversation simple (niveau A2) et un an pour être à l'aise (niveau B1-B2).</blockquote>
    `
  },
  {
    id: "7",
    slug: "passe-simple-ou-imparfait-espagnol",
    title: "Pretérito ou imparfait : quel passé choisir en espagnol ?",
    excerpt: "« Fui » ou « iba » ? « Comí » ou « comía » ? La règle pour choisir entre les deux principaux temps du passé.",
    date: "2026-10-20",
    category: "Grammaire",
    readingTime: "5 min",
    content: `
      <p>L'espagnol utilise au quotidien un temps que le français a presque abandonné à l'oral : le passé simple, ou <em>pretérito indefinido</em>. Il s'emploie là où nous utilisons le passé composé.</p>
      <h3>Le pretérito : une action terminée, à un moment précis</h3>
      <ul>
        <li><em>Ayer comí paella.</em> (Hier, j'ai mangé une paella.)</li>
        <li><em>En 2020 viajé a México.</em> (En 2020, j'ai voyagé au Mexique.)</li>
      </ul>
      <p>Mots-clés : <strong>ayer</strong> (hier), <strong>anoche</strong> (hier soir), <strong>la semana pasada</strong> (la semaine dernière), <strong>de repente</strong> (soudain).</p>
      <h3>L'imparfait : le décor, l'habitude, la description</h3>
      <ul>
        <li><em>Cuando era niño, jugaba al fútbol.</em> (Quand j'étais enfant, je jouais au football.)</li>
        <li><em>Hacía sol y la gente paseaba.</em> (Il faisait beau et les gens se promenaient.)</li>
      </ul>
      <p>Mots-clés : <strong>siempre</strong> (toujours), <strong>cada día</strong> (chaque jour), <strong>a menudo</strong> (souvent), <strong>antes</strong> (avant).</p>
      <h3>Les deux dans la même phrase</h3>
      <p>L'imparfait plante le décor, le pretérito raconte l'événement : <em><strong>Dormía</strong> cuando <strong>sonó</strong> el teléfono</em> (Je dormais quand le téléphone a sonné).</p>
      <p>Pour un francophone, c'est rassurant : l'imparfait espagnol s'emploie presque exactement comme l'imparfait français. Il suffit de remplacer notre passé composé par le pretérito.</p>
    `
  },
  {
    id: "8",
    slug: "expressions-espagnoles-courantes",
    title: "10 expressions espagnoles à connaître pour parler comme un natif",
    excerpt: "« Estar en las nubes », « tomar el pelo », « no pasa nada »… Les expressions du quotidien que les manuels oublient.",
    date: "2026-11-03",
    category: "Culture",
    readingTime: "5 min",
    content: `
      <p>Connaître la grammaire, c'est bien. Comprendre ce que disent vraiment les Espagnols entre eux, c'est mieux. Voici dix expressions que vous entendrez partout.</p>
      <ol>
        <li><strong>No pasa nada</strong> — « Ce n'est pas grave ». La réponse universelle à toutes les excuses.</li>
        <li><strong>Vale</strong> — « D'accord ». Probablement le mot le plus prononcé d'Espagne.</li>
        <li><strong>Estar en las nubes</strong> — « Être dans la lune » (littéralement : dans les nuages).</li>
        <li><strong>Tomar el pelo</strong> — « Se moquer de quelqu'un », le faire marcher.</li>
        <li><strong>Ser pan comido</strong> — « C'est du gâteau » (littéralement : du pain mangé).</li>
        <li><strong>Costar un ojo de la cara</strong> — « Coûter les yeux de la tête ».</li>
        <li><strong>Estar hecho polvo</strong> — « Être épuisé » (littéralement : réduit en poussière).</li>
        <li><strong>¡Qué guay!</strong> — « Trop bien ! » (familier, en Espagne).</li>
        <li><strong>Echar de menos</strong> — « Manquer à quelqu'un » : <em>Te echo de menos</em>, « tu me manques ».</li>
        <li><strong>Ponerse las pilas</strong> — « Se bouger », se mettre au travail (littéralement : mettre ses piles).</li>
      </ol>
      <h3>Comment les retenir ?</h3>
      <p>Choisissez-en deux par semaine et placez-les dans une vraie phrase, à l'écrit ou à l'oral. Une expression utilisée trois fois est une expression acquise.</p>
    `
  }
];
