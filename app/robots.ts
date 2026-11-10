import { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/lib/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

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