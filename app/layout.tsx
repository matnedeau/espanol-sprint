import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Español Sprint",
  description: "L'application d'apprentissage de l'espagnol la plus rapide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* J'ai changé v=3 en v=4 pour forcer la mise à jour */}
        <link rel="icon" href="/icon.png?v=4" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}