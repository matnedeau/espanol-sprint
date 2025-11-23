import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Español Sprint - B2 en 90 Jours",
  description: "L'application d'apprentissage de l'espagnol la plus rapide.",
  // Note : Next.js détecte automatiquement le fichier icon.png dans le dossier app/
  // On n'a rien à ajouter ici !
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}