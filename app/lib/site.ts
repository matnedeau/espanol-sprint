// URL publique du site. À surcharger avec NEXT_PUBLIC_SITE_URL si tu passes sur un nom de domaine personnalisé.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://espanol-sprint.vercel.app').replace(/\/$/, '');
