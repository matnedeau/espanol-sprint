import { NextResponse } from 'next/server';

// 🔒 TA LISTE DE CODES SECRETS
// Tu peux en ajouter autant que tu veux ici.
const VALID_CODES = [
  "VIP2025",       // Code générique
  "ESPANOL_BETA",  // Pour tes testeurs
  "AMIGO",         // Pour tes amis
  "ADMIN_MASTER"   // Pour toi
];

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    // On nettoie le code (enlever les espaces, mettre en majuscule)
    const cleanCode = code.toString().trim().toUpperCase();

    if (VALID_CODES.includes(cleanCode)) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}