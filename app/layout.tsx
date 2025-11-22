import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ligne pour la police
import "./globals.css"; // Ligne pour les styles Tailwind

const inter = Inter({ subsets: ["latin"] });

// Les métadonnées pour le titre de l'onglet et le référencement
export const metadata: Metadata = {
  title: "Español Sprint - B2 en 90 Jours",
  description: "Apprends l'espagnol rapidement avec la méthode Pareto et la répétition espacée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'lang="fr"' indique au navigateur que le site est en français
    <html lang="fr">
      {/* La classe inter.className applique la police Inter à tout le corps */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}