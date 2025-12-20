import { NextResponse } from 'next/server';
import { generateStructuredLesson } from '@/app/lib/generator';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);

    if (isNaN(idNum)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    // Génération à la volée côté serveur (Rapide & Léger pour le client)
    const lessonContent = generateStructuredLesson(idNum);

    return NextResponse.json(lessonContent);
  } catch (error) {
    console.error("API Lesson Error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}