import { MetadataRoute } from 'next';
import { INITIAL_LESSONS_CONTENT, STORIES_DATA } from '@/app/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://espanol-sprint.vercel.app';

  // 1. Page d'accueil (Statique)
  const homeRoute: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Pages Leçons (Dynamique : /lecon/{id})
  // On récupère les clés (IDs) de l'objet INITIAL_LESSONS_CONTENT
  const lessonRoutes: MetadataRoute.Sitemap = Object.keys(INITIAL_LESSONS_CONTENT).map((id) => ({
    url: `${baseUrl}/lecon/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Pages Histoires (Dynamique : /histoire/{id})
  // On itère sur le tableau STORIES_DATA
  const storyRoutes: MetadataRoute.Sitemap = STORIES_DATA.map((story) => ({
    url: `${baseUrl}/histoire/${story.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fusion de toutes les routes
  return [...homeRoute, ...lessonRoutes, ...storyRoutes];
}