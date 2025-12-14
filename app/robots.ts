import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Doit correspondre à l'URL définie dans sitemap.ts et layout.tsx
  const baseUrl = 'https://espanol-sprint.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // On interdit généralement aux robots d'indexer les routes API pour éviter du bruit
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}