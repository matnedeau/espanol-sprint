import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* On dit à Next.js d'ignorer les erreurs de linting et de typescript pendant le build */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;