// Fichier: app/tuteur-ia/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Check, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Tuteur Espagnol IA - Correction Instantanée & Conversation",
  description: "Discutez avec notre IA native. Correction de la prononciation et explications grammaticales 24/7.",
};

export default function TuteurIAPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="p-6 max-w-5xl mx-auto text-center space-y-6 pt-20">
        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
          Nouveau : IA Native 24/7
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Votre Prof d'Espagnol <br/><span className="text-indigo-600">dans la poche</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Plus besoin d'attendre le prochain cours. Posez vos questions à notre IA, pratiquez votre prononciation et obtenez des réponses immédiates.
        </p>
      </header>

      {/* Section Démo (Statique pour le SEO) */}
      <section className="my-16 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100">
           <div className="flex gap-4 mb-6 animate-in slide-in-from-bottom-2 fade-in duration-700">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">👤</div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none">
                 <p className="font-medium text-slate-700">Pourquoi on dit "Me gusta" et pas "Yo gusto" ?</p>
              </div>
           </div>
           <div className="flex gap-4 flex-row-reverse animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0"><Bot size={24} className="text-indigo-600"/></div>
              <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none shadow-lg">
                 <p className="font-medium">Excellente question ! <br/><br/>Le verbe <b>Gustar</b> fonctionne à l'envers. Littéralement, ça veut dire <em>"Cela me plaît"</em> (A mí me gusta).</p>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-4xl mx-auto px-6 mb-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600 mb-4"><Check size={24} /></div>
              <h3 className="font-bold text-lg mb-2">Correction Instantanée</h3>
              <p className="text-slate-500">Ne gardez pas de mauvaises habitudes. L'IA vous corrige en temps réel.</p>
          </div>
          <div className="p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto text-yellow-600 mb-4"><Star size={24} /></div>
              <h3 className="font-bold text-lg mb-2">Explications Simples</h3>
              <p className="text-slate-500">Des réponses claires, en français, adaptées à votre niveau actuel.</p>
          </div>
          <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600 mb-4"><Bot size={24} /></div>
              <h3 className="font-bold text-lg mb-2">Disponible 24/7</h3>
              <p className="text-slate-500">Apprenez à 3h du matin ou dans le bus. Votre prof est toujours là.</p>
          </div>
      </section>

      {/* Call to Action */}
      <div className="text-center pb-20 px-6">
        <Link href="/?signup=true" className="inline-block bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 hover:bg-slate-800 transition-all">
          Essayer le Tuteur Gratuitement
        </Link>
        <p className="mt-4 text-sm text-slate-400">Aucune carte bancaire requise pour l'essai.</p>
      </div>
    </div>
  );
}