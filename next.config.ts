import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* On dit à Next.js d'ignorer les erreurs de typescript pendant le build */
  typescript: {
    ignoreBuildErrors: true,
  },
  /* Note : La clé 'eslint' a été supprimée car elle n'est plus supportée dans cette version de Next.js */
};

export default nextConfig;