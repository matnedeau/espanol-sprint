import { STORIES_DATA } from '@/app/data/content';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Play, MessageCircle, BookOpen, ArrowLeft } from 'lucide-react';

// 1. DÉFINITION DES TYPES
// Basé sur la structure de STORIES_DATA dans content.ts
interface Character {
  name: string;
  avatar: string;
  color: string;
  voiceId: string;
}

interface DialogueItem {
  type: string;
  speaker?: string;
  text_es?: string;
  text_fr?: string;
  question?: string; // Pour les items de type 'question'
}

interface Story {
  id: string;
  title: string;
  level: string;
  characters: Record<string, Character>;
  dialogue: DialogueItem[];
}

type Props = {
  params: Promise<{ id: string }>;
};

// 2. GÉNÉRATION DES SLUGS STATIQUES (SSG)
export async function generateStaticParams() {
  return STORIES_DATA.map((story) => ({
    id: story.id,
  }));
}

// 3. MÉTADONNÉES SEO
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const story = STORIES_DATA.find((s) => s.id === params.id) as unknown as Story;

  if (!story) {
    return { title: 'Histoire introuvable' };
  }

  return {
    title: `Histoire Espagnol : ${story.title} (${story.level})`,
    description: `Lisez et écoutez l'histoire interactive "${story.title}". Améliorez votre espagnol avec ce dialogue de niveau ${story.level}.`,
    alternates: {
      canonical: `/histoire/${story.id}`,
    },
    openGraph: {
      title: `Histoire Espagnol : ${story.title}`,
      description: `Une histoire interactive pour apprendre l'espagnol (Niveau ${story.level}).`,
      type: 'article',
    },
  };
}

// 4. COMPOSANT DE PAGE
export default async function StoryPage(props: Props) {
  const params = await props.params;
  const story = STORIES_DATA.find((s) => s.id === params.id) as unknown as Story;

  if (!story) {
    notFound();
  }

  // Filtrer uniquement les dialogues (on exclut les questions pour la vue lecture seule)
  const dialogueLines = story.dialogue.filter((line) => line.type === 'bubble');

  // Données structurées (Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "headline": story.title,
    "genre": "Educational",
    "learningResourceType": "Story",
    "educationalLevel": story.level,
    "inLanguage": "es",
    "author": {
      "@type": "Organization",
      "name": "EspañolSprint"
    },
    "url": `https://espanolsprint.com/histoire/${story.id}`,
    "character": Object.values(story.characters).map(c => c.name)
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER SIMPLE */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link href="/" className="font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Retour
        </Link>
        <span className="font-black text-xl tracking-tighter">
          🇪🇸 Español<span className="text-red-600">Sprint</span>
        </span>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        
        {/* EN-TÊTE DE L'HISTOIRE */}
        <div className="text-center mb-10 space-y-4">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Mode Histoire • Niveau {story.level}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {story.title}
          </h1>
          <div className="flex justify-center gap-4 mt-4">
            {Object.values(story.characters).map((char, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                <span className="text-xl" role="img" aria-label={`Avatar de ${char.name}`}>{char.avatar}</span>
                {char.name}
              </div>
            ))}
          </div>
        </div>

        {/* ENCART MODE INTERACTIF (CTA PRINCIPAL) */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 mb-12 shadow-xl text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                <Play className="fill-white" size={24} /> Mode Interactif
              </h2>
              <p className="text-indigo-100 max-w-md">
                Ne vous contentez pas de lire ! Écoutez les voix IA natives, répondez aux questions et améliorez votre prononciation.
              </p>
            </div>
            <Link 
              href={`/?startStory=${story.id}`}
              className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-400 hover:text-indigo-900 transition-all hover:scale-105 whitespace-nowrap"
            >
              Lancer l'histoire
            </Link>
          </div>
          {/* Décoration d'arrière-plan */}
          <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12 group-hover:rotate-6 transition-transform duration-700">
             <MessageCircle size={180} />
          </div>
        </div>

        {/* SCRIPT THÉÂTRAL */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
            <BookOpen size={16} /> Script de l'histoire
          </h3>

          <div className="space-y-8">
            {dialogueLines.map((line, index) => {
              // Récupération sécurisée du personnage
              const characterKey = line.speaker || 'narrator';
              const character = story.characters[characterKey];

              return (
                <div key={index} className="flex gap-4 sm:gap-6">
                  {/* Colonne Personnage */}
                  <div className="flex-shrink-0 w-16 sm:w-24 text-center">
                    <div className="text-3xl mb-1 filter drop-shadow-sm">
                      {character?.avatar || '📢'}
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide truncate">
                      {character?.name || 'Narrateur'}
                    </div>
                  </div>

                  {/* Colonne Texte */}
                  <div className="flex-grow space-y-2 pt-1">
                    <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed">
                      {line.text_es}
                    </p>
                    {line.text_fr && (
                      <p className="text-slate-400 text-sm italic font-medium">
                        {line.text_fr}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Vous avez lu le script ? Maintenant, pratiquez l'écoute.</p>
          <Link 
            href={`/?startStory=${story.id}`}
            className="inline-flex items-center gap-2 text-indigo-600 font-black hover:underline text-lg"
          >
            Démarrer l'expérience audio <Play size={20} className="fill-indigo-600" />
          </Link>
        </div>

      </main>
    </div>
  );
}