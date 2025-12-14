import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // URL de production (à configurer dans tes variables d'environnement si besoin)
  const baseUrl = 'https://espanol-sprint.vercel.app'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Note : Comme ton application gère la navigation (Leçons, Histoires) via l'état React (useState)
    // et non via des routes Next.js (/lesson/1, /story/1), nous n'indexons que la racine.
    // Si tu passes plus tard à un routing Next.js complet, nous ajouterons les autres pages ici.
  ];
}