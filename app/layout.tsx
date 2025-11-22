import type { Metadata } from "next";
// Décommente la ligne ci-dessous chez toi pour la police Google :
// import { Inter } from "next/font/google"; 
// Décommente la ligne ci-dessous pour charger tes styles CSS :
// import "./globals.css";

// Mock pour éviter l'erreur ici (tu peux utiliser la vraie fonction Inter chez toi)
const inter = { className: "" }; 
// const inter = Inter({ subsets: ["latin"] }); // Utilise ceci chez toi

export const metadata: Metadata = {
  title: "EspaSprint",
  description: "Apprends l'espagnol rapidement avec la méthode Pareto et la répétition espacée.",
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