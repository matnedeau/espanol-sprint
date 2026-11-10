import { INITIAL_LESSONS_LIST } from '@/app/lib/curriculum';
import { generateStructuredLesson } from '@/app/lib/generator';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/app/lib/site';

// 1. DÉFINITION DU TYPE POUR LES LEÇONS
interface Lesson {
  id: number;
  title: string;
  level: string;
  desc: string;
}

// Cast des données importées pour satisfaire TypeScript
const ALL_LESSONS = INITIAL_LESSONS_LIST as unknown as Lesson[];

// Définition des props pour Next.js 15/16 (params est une Promise)
type Props = {
  params: Promise<{ id: string }>;
};

// 2. GÉNÉRATION DES PARAMÈTRES STATIQUES (SSG)
// Correction : On itère sur la LISTE (curriculum) et non plus sur le CONTENU supprimé
export async function generateStaticParams() {
  return INITIAL_LESSONS_LIST.map((lesson) => ({
    id: lesson.id.toString(),
  }));
}

// 3. GÉNÉRATION DES MÉTADONNÉES SEO
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const idNum = parseInt(params.id);
  
  const lessonInfo = ALL_LESSONS.find((l) => l.id === idNum);
  
  return {
    title: lessonInfo ? `${lessonInfo.title} – Cours d'espagnol ${lessonInfo.level} (leçon ${lessonInfo.id})` : `Leçon ${params.id}`,
    description: lessonInfo ? `Leçon d'espagnol gratuite de niveau ${lessonInfo.level} sur le thème « ${lessonInfo.title} » : vocabulaire, grammaire et exercices interactifs en 5 minutes.` : `Apprenez l'espagnol rapidement avec cette leçon interactive.`,
    alternates: {
      canonical: `/lecon/${params.id}`,
    },
  };
}

// 4. COMPOSANT DE PAGE
export default async function LessonPage(props: Props) {
  const params = await props.params;
  const idNum = parseInt(params.id);

  // Correction : On génère le contenu à la volée via la fonction importée
  // Plus besoin de l'objet géant INITIAL_LESSONS_CONTENT
  const lessonInfo = ALL_LESSONS.find((l) => l.id === idNum);
  if (!lessonInfo) notFound();
  const lessonContent = generateStructuredLesson(idNum);

  // Gestion du cas où la leçon n'existe pas ou erreur de génération
  if (!lessonContent || !lessonInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800">
        <h1 className="text-3xl font-black mb-4">Leçon introuvable ({params.id})</h1>
        <Link href="/" className="text-indigo-600 font-bold hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Extraction du vocabulaire (items de type 'swipe') pour l'affichage SEO
  // @ts-ignore : Typage souple sur le contenu généré
  const vocabulary = Array.isArray(lessonContent) ? lessonContent.filter(i => i.type === 'swipe') : [];

  // Données structurées (JSON-LD) pour Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": lessonInfo.title,
    "description": lessonInfo.desc,
    "educationalLevel": lessonInfo.level,
    "url": `${SITE_URL}/lecon/${params.id}`,
    "isAccessibleForFree": true,
    // @ts-ignore
    "teaches": vocabulary.map((v) => v.es).join(', ')
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200">
      {/* Injection du JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BARRE DE NAVIGATION */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-sm backdrop-blur-md bg-white/90">
        <Link href="/" className="font-black text-xl tracking-tighter flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform">🇪🇸</span> 
          <span>Español<span className="text-red-600">Sprint</span></span>
        </Link>
        {/* Le bouton renvoie vers le Dashboard avec l'ID de la leçon */}
        <Link 
          href={`/?startLesson=${idNum}`} 
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 hover:bg-slate-800 transition-all shadow-lg"
        >
          Ouvrir l'appli
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* EN-TÊTE DE LEÇON */}
        <div className="text-center mb-12 space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm transform -rotate-1">
            Niveau {lessonInfo.level}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {lessonInfo.title}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto">
            Leçon {lessonInfo.id} du parcours {lessonInfo.level} : le vocabulaire essentiel à connaître sur ce thème.
          </p>
        </div>

        {/* CARTE DE CONTENU (VOCABULAIRE) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-12">
          <div className="bg-slate-50/80 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-400 text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Contenu de la leçon
            </h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
              {vocabulary.length} mots et expressions
            </span>
          </div>
          
          <div className="divide-y divide-slate-50">
            {vocabulary.length > 0 ? (
              // @ts-ignore
              vocabulary.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 hover:bg-slate-50 transition-colors group">
                  <div className="mb-1 sm:mb-0">
                    <span className="font-black text-slate-800 text-xl group-hover:text-indigo-600 transition-colors block sm:inline">
                      {item.es}
                    </span>
                    {item.context && (
                      <span className="text-xs text-slate-400 font-medium ml-0 sm:ml-2 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.context}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 font-medium text-lg">
                    {item.en}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 font-medium italic">
                Contenu interactif disponible dans l'application.
              </div>
            )}
          </div>

          {/* EFFET DE FLOU (TEASER) SI TROP LONG */}
          {vocabulary.length > 6 && (
            <div className="h-32 bg-gradient-to-t from-white via-white/90 to-transparent -mt-32 relative z-10 pointer-events-none" />
          )}

          {/* CTA BAS DE CARTE */}
          <div className="p-8 md:p-10 bg-indigo-600 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Maîtrisez cette leçon maintenant</h3>
                <p className="text-indigo-100 font-medium max-w-sm mx-auto">
                  Retrouvez l'audio, les exercices interactifs et la fiche PDF dans l'application, gratuitement.
                </p>
              </div>
              <Link 
                href={`/?startLesson=${idNum}`}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-indigo-600 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:bg-yellow-400 hover:text-yellow-900 transition-all hover:scale-[1.02] hover:shadow-2xl"
              >
                ▶ Commencer la leçon
              </Link>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>
          </div>
        </div>

        {/* NAVIGATION BAS DE PAGE */}
        <div className="flex justify-between items-center text-sm font-bold text-slate-400 border-t border-slate-200 pt-8">
          {idNum > 1 ? (
            <Link href={`/lecon/${idNum - 1}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Leçon précédente
            </Link>
          ) : <span></span>}
          
          {idNum < ALL_LESSONS.length ? (
          <Link href={`/lecon/${idNum + 1}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors group">
            Leçon suivante <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          ) : <span></span>}
        </div>
      </main>
    </div>
  );
}