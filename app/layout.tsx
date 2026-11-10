import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SITE_URL } from "@/app/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// 1. CONFIGURATION VIEWPORT (Mobile Friendly)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#facc15", // Jaune Espagnol
};

// 2. METADONNÉES SEO & OPENGRAPH
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EspañolSprint – Apprendre l'espagnol en 5 minutes par jour",
    template: "%s | EspañolSprint",
  },
  description: "Apprenez l'espagnol gratuitement, du niveau A1 au niveau C1 : leçons de 5 minutes, histoires audio, test de niveau et coach IA disponible 24 h/24.",
  keywords: ["apprendre l'espagnol", "cours d'espagnol gratuit", "espagnol débutant", "vocabulaire espagnol", "test de niveau espagnol", "application pour apprendre l'espagnol"],
  alternates: { canonical: "/" },
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
    url: SITE_URL,
    title: "EspañolSprint – Apprendre l'espagnol en 5 minutes par jour",
    description: "N'apprenez pas seulement l'espagnol : vivez-le. Leçons éclair, histoires audio et coach IA.",
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
    description: "Leçons de 5 minutes, histoires audio et coach IA pour apprendre l'espagnol rapidement.",
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