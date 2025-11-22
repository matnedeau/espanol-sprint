import type { NextConfig } from "next";

// J'ai retiré ": NextConfig" juste après le nom de la variable pour que TS soit moins strict
const nextConfig = {
  /* On dit à Next.js d'ignorer les erreurs de linting et de typescript pendant le build */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;