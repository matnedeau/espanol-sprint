import { MetadataRoute } from 'next';
import { INITIAL_LESSONS_CONTENT, STORIES_DATA } from '@/app/data/content';
import { BLOG_POSTS } from '@/app/data/blog-content';

export default function sitemap(): MetadataRoute.Sitemap {
  // Votre URL de production
  const baseUrl = 'https://espanol-sprint.vercel.app'; 

  // 1. La Page d'Accueil (Priorité Maximale)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`, // La page liste des articles
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Génération des URLs pour les Leçons (/lecon/1, /lecon/2...)
  const lessonPages: MetadataRoute.Sitemap = Object.keys(INITIAL_LESSONS_CONTENT).map((id) => ({
    url: `${baseUrl}/lecon/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Génération des URLs pour les Histoires (/histoire/story-A1-01...)
  const storyPages: MetadataRoute.Sitemap = STORIES_DATA.map((story) => ({
    url: `${baseUrl}/histoire/${story.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Génération des URLs pour les Articles de Blog (/blog/slug...)
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date), // On utilise la vraie date de l'article
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 5. On fusionne tout pour Google
  return [...staticPages, ...lessonPages, ...storyPages, ...blogPages];
}