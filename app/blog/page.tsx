import Link from 'next/link';
import { BLOG_POSTS } from '@/app/data/blog-content';
import { Metadata } from 'next';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Le Blog EspañolSprint - Conseils et Astuces',
  description: 'Améliorez votre espagnol avec nos articles sur la grammaire, la prononciation et la culture.',
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Ressources Gratuites</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Le Blog Español<span className="text-red-600">Sprint</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Des guides pratiques pour booster votre apprentissage entre deux leçons.
          </p>
        </div>
      </div>

      {/* Grille d'articles */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col h-full">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded uppercase">
                    {post.category}
                  </span>
                  <div className="flex items-center text-slate-400 text-xs gap-1">
                    <Clock size={12} /> {post.readingTime}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="hover:underline focus:outline-none">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Lire <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}