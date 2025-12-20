import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. CONFIGURATION VIEWPORT (Mobile Friendly)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#facc15", // Jaune Espagnol
  maximumScale: 1,
};

// 2. METADONNÉES SEO & OPENGRAPH
export const metadata: Metadata = {
  metadataBase: new URL("https://espanolsprint.vercel.app"), // Remplacez par votre URL Vercel finale si différente
  title: {
    default: "EspañolSprint - Apprenez l'espagnol en vitesse éclair",
    template: "%s | EspañolSprint",
  },
  description: "La méthode la plus rapide pour passer de A1 à C1. 5 minutes par jour, gamification style Vision Pro et Audio IA.",
  keywords: ["espagnol", "apprendre espagnol", "cours espagnol gratuit", "vocabulaire espagnol", "application langue", "sprint", "bilingue espagnol 3 mois"],
  authors: [{ name: "EspañolSprint Team" }],
  creator: "EspañolSprint",
  
  // --- VALIDATION GOOGLE SEARCH CONSOLE ---
  verification: {
    google: "Is2zL8Pb8bMlvw09iqAH8fdoNhAemk6g-F90svyI9qs",
  },
  // ----------------------------------------

  // Note : La configuration 'icons' a été supprimée.
  // Next.js détectera automatiquement le fichier 'app/icon.png'.

  // Configuration OpenGraph (Réseaux Sociaux)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://espanolsprint.vercel.app",
    title: "EspañolSprint - Devenez bilingue rapidement",
    description: "N'apprenez pas l'espagnol, vivez-le. Méthode interactive avec Audio IA et Répétition Espacée.",
    siteName: "EspañolSprint",
    images: [
      {
        url: "/opengraph-image", // Utilise l'image générée dynamiquement (si vous avez créé le fichier opengraph-image.tsx)
        width: 1200,
        height: 630,
        alt: "Aperçu EspañolSprint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EspañolSprint 🇪🇸",
    description: "Le Duolingo killer ? Apprenez l'espagnol avec une UX incroyable.",
    images: ["/opengraph-image"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased selection:bg-yellow-200 selection:text-yellow-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}