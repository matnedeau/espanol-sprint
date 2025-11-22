import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Chargement des styles Tailwind

const inter = Inter({ subsets: ["latin"] });

// Les métadonnées pour le titre de l'onglet
export const metadata: Metadata = {
  title: "Español Sprint - B2 en 90 Jours",
  description: "L'application d'apprentissage de l'espagnol la plus rapide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* Applique la police Inter à tout le corps de l'application */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}