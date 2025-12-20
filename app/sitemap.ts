import { MetadataRoute } from 'next';
import { INITIAL_LESSONS_LIST } from '@/app/lib/curriculum'; // <-- Import corrigé (Liste des IDs)
import { STORIES_DATA } from '@/app/lib/stories';       // <-- Import corrigé
import { BLOG_POSTS } from '@/app/data/blog-content';   // Celui-ci ne change pas

export default function sitemap(): MetadataRoute.Sitemap {
  // Votre URL de production (Vérifiez si c'est avec ou sans tiret selon votre Vercel)
  const baseUrl = 'https://espanolsprint.vercel.app'; 

  // 1. La Page d'Accueil & Blog (Priorité Maximale)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Leçons (On boucle sur le tableau INITIAL_LESSONS_LIST)
  const lessonPages: MetadataRoute.Sitemap = INITIAL_LESSONS_LIST.map((lesson) => ({
    url: `${baseUrl}/lecon/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Histoires (On boucle sur STORIES_DATA)
  const storyPages: MetadataRoute.Sitemap = STORIES_DATA.map((story) => ({
    url: `${baseUrl}/histoire/${story.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Articles de Blog
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 5. Fusion
  return [...staticPages, ...lessonPages, ...storyPages, ...blogPages];
}