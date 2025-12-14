import { BLOG_POSTS, BlogPost } from '@/app/data/blog-content';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ChevronLeft, Rocket } from 'lucide-react';

// 1. Génération des URLs statiques pour le SEO
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Métadonnées dynamiques
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) return { title: 'Article introuvable' };

  return {
    title: `${post.title} | Blog EspañolSprint`,
    description: post.excerpt,
  };
}

// 3. Page de l'article
export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Navigation retour */}
      <nav className="max-w-3xl mx-auto px-6 py-6">
        <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors gap-1">
          <ChevronLeft size={16} /> Retour au blog
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6">
        {/* En-tête Article */}
        <header className="mb-10 text-center">
          <div className="flex justify-center items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              <Tag size={14} className="text-indigo-500" /> {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {post.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Contenu de l'article */}
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-strong:text-indigo-900">
           {/* Injection sécurisée du HTML */}
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* CTA Fin d'article */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black">Cet article vous a plu ?</h2>
            <p className="text-indigo-100 text-lg max-w-lg mx-auto">
              Ne restez pas sur la théorie ! Passez à la pratique dès maintenant avec nos leçons interactives.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-yellow-400 text-indigo-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all"
            >
              <Rocket size={20} />
              Lancez votre 1ère leçon gratuite
            </Link>
          </div>
          
          {/* Décoration background */}
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.3C59.4,45.5,47.9,54.2,36.2,62.3C24.5,70.4,12.5,77.9,-0.7,79.1C-13.9,80.3,-26.1,75.2,-37.3,67.6C-48.5,60,-58.7,49.9,-66.6,38.1C-74.5,26.3,-80.1,12.8,-80.9,-1.1C-81.7,-15,-77.7,-29.3,-69.2,-40.8C-60.7,-52.3,-47.7,-61,-34.7,-68.8C-21.7,-76.6,-8.7,-83.5,2.9,-88.5L14.5,-93.5" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

      </main>
    </div>
  );
}