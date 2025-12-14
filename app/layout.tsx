import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. CONFIGURATION VIEWPORT (Mobile Friendly)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#facc15", // Jaune EspañolSprint
  maximumScale: 1, // Empêche le zoom intempestif sur mobile (app feel)
};

// 2. METADONNÉES SEO & OPENGRAPH
export const metadata: Metadata = {
  metadataBase: new URL("https://espanol-sprint.vercel.app"), // URL de production
  title: {
    default: "EspañolSprint - Apprenez l'espagnol rapidement",
    template: "%s | EspañolSprint",
  },
  description: "L'application la plus rapide pour apprendre l'espagnol. Leçons interactives, mode histoire et répétition espacée (SRS).",
  keywords: ["espagnol", "apprendre", "leçons", "rapide", "sprint", "débutant", "vocabulaire", "grammaire"],
  authors: [{ name: "EspañolSprint Team" }],
  creator: "EspañolSprint",
  
  // --- VALIDATION GOOGLE SEARCH CONSOLE ---
  verification: {
    google: "Is2zL8Pb8bMlvw09iqAH8fdoNhAemk6g-F90svyI9qs",
  },
  // ----------------------------------------

  icons: {
    icon: "/flavicon.png",
    apple: "/flavicon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://espanol-sprint.vercel.app",
    title: "EspañolSprint - Devenez bilingue en un temps record",
    description: "La méthode accélérée pour maîtriser l'espagnol. Quiz, Histoires et Audio IA.",
    siteName: "EspañolSprint",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EspañolSprint Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EspañolSprint 🚀",
    description: "Apprenez l'espagnol plus vite que jamais.",
    images: ["/og-image.jpg"],
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
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}