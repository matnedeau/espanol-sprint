'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import { speak } from '@/app/lib/audio';

// --- TYPE 1 : INPUT CARD (Saisie) ---
export const InputCard = ({ data, onNext, isExam, onScore }: any) => { 
  const [val, setVal] = useState(''); 
  const [status, setStatus] = useState('idle'); 
  const [sub, setSub] = useState(false); 
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setVal(''); setStatus('idle'); setSub(false);
    setTimeout(() => { inputRef.current?.focus(); }, 100);
  }, [data]); 

  const addChar = (c: string) => { 
    if (sub) return; 
    setVal(p => p + c); 
    inputRef.current?.focus(); 
  };

  const check = (e?: React.FormEvent) => { 
      e?.preventDefault(); 
      if (sub) return; 
      
      const normalize = (text: string) => {
          if (!text) return "";
          return text.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[¿¡!.,;?]/g, '').replace(/\s+/g, ' ');
      };

      const userVal = normalize(val); 
      const possibleAnswers = Array.isArray(data.answer) ? data.answer : [data.answer];
      
      const isCorrect = possibleAnswers.some((ans: string) => {
          const correctVal = normalize(ans);
          if (userVal === correctVal) return true;
          // Tolérance articles/pronoms
          const articlesRegex = /^(el|la|los|las|un|una|unos|unas)\s+/;
          const pronounsRegex = /^(yo|tu|el|ella|nosotros|nosotras|vosotros|vosotras|ellos|ellas)\s+/;
          if (userVal.replace(articlesRegex, '') === correctVal.replace(articlesRegex, '')) return true;
          if (userVal.replace(pronounsRegex, '') === correctVal.replace(pronounsRegex, '')) return true;
          return false;
      });
      
      setStatus(isCorrect ? 'success' : 'error'); 
      
      if (isCorrect) { 
          setSub(true);
          if(onScore) onScore(true); 
          setTimeout(onNext, 1500); 
      } else { 
          if (isExam) {
             setSub(true);
             if(onScore) onScore(false);
             setTimeout(onNext, 2500);
          } else {
             inputRef.current?.focus();
          }
      } 
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl border-b-[12px] border-slate-100 flex flex-col p-8 md:p-12 justify-center space-y-6 animate-in zoom-in">
        <div className="text-center space-y-2">
            {isExam && <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase">Examen</span>}
            <h3 className="text-2xl md:text-4xl font-black text-slate-800">{data.question}</h3>
        </div>
        
        <div className="flex gap-2 justify-center flex-wrap">
            {['á','é','í','ó','ú','ñ','¿','¡'].map(c => (
                <button key={c} type="button" onClick={() => addChar(c)} disabled={sub} className="w-10 h-10 bg-white border-2 border-slate-200 shadow-sm font-bold rounded-xl active:scale-95 transition-all hover:bg-slate-50 disabled:opacity-50">{c}</button>
            ))}
        </div>

        <form onSubmit={check} className="w-full space-y-6">
            <input 
                ref={inputRef} 
                type="text" 
                value={val} 
                onChange={(e) => { if(!sub) { setVal(e.target.value); if (status === 'error') setStatus('idle'); } }} 
                disabled={sub} 
                className={`w-full text-center text-2xl font-bold p-6 rounded-2xl border-4 outline-none transition-all ${
                    status === 'error' ? 'border-red-400 bg-red-50 text-red-500 animate-shake' : 
                    status === 'success' ? 'border-green-400 bg-green-50 text-green-600' : 
                    'border-slate-100 focus:border-yellow-400 text-slate-800'
                }`} 
                placeholder="..." 
                autoComplete="off"
            />
            <button type="submit" disabled={sub || !val.trim()} className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl active:scale-95 transition-all ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-slate-900'}`}>
                {status === 'success' ? 'Validé !' : status === 'error' ? 'Réessayer' : 'Vérifier'}
            </button>
        </form>

        {status === 'error' && !isExam && (
            <div className="text-center space-y-2 animate-in slide-in-from-bottom-2 fade-in">
                <p className="text-red-500 font-bold text-lg">Oups ! Essaie encore.</p>
                <p className="text-slate-400 text-sm font-medium">Indice : {data.hint}</p>
            </div>
        )}
        
        {status === 'error' && isExam && (
            <div className="text-center text-red-500 font-bold animate-in zoom-in">
                <p>Réponse : {Array.isArray(data.answer) ? data.answer[0] : data.answer}</p>
            </div>
        )}
    </div>
  ); 
};

// --- TYPE 2 : SWIPE CARD (Vocabulaire) ---
export const SwipeCard = ({ data, onNext }: any) => { 
    const [swiped, setSwiped] = useState<string | null>(null); 
    const swipe = (dir: string) => { setSwiped(dir); setTimeout(onNext, 250); }; 
    useEffect(() => { 
        const handler = (e: KeyboardEvent) => { 
            if(e.key==="ArrowRight") swipe('right'); 
            if(e.key===" " || e.key==="Enter") { e.preventDefault(); speak(data.es); } 
        }; 
        window.addEventListener("keydown", handler); 
        return () => window.removeEventListener("keydown", handler); 
    }, [data]); 
    return (
        <div className={`w-full h-full bg-white rounded-3xl shadow-xl border-b-8 border-slate-100 flex flex-col relative transition-all duration-300 ${swiped ? 'opacity-0 translate-x-full' : ''}`}>
            <div className="absolute top-4 right-4"><button onClick={(e) => { e.stopPropagation(); speak(data.es); }} className="p-3 bg-slate-100 rounded-full text-indigo-600"><Volume2 size={24}/></button></div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                <h2 className="text-5xl font-black text-slate-800">{data.es}</h2>
                <div className="bg-indigo-50 px-6 py-3 rounded-2xl"><p className="text-xl font-bold text-indigo-600">{data.en}</p></div>
                <p className="text-sm text-slate-400 italic">"{data.context}"</p>
            </div>
            <div className="p-6 flex justify-center"><button onClick={() => swipe('right')} className="w-full py-4 bg-teal-500 text-white rounded-xl font-bold text-xl shadow-lg">Compris !</button></div>
        </div>
    ); 
};

// --- TYPE 3 : GRAMMAR CARD ---
export const GrammarCard = ({ data, onNext }: any) => { 
    const [rev, setRev] = useState(false); 
    return (
        <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-indigo-600 p-8 text-white text-center relative">
                <button onClick={() => speak(data.title)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><Volume2 size={20}/></button>
                <h3 className="text-3xl font-black">{data.title}</h3>
                <p className="text-indigo-200 mt-2">{data.description}</p>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between bg-slate-50">
                {rev ? (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {data.conjugation.map((row: any, i: number) => (
                            <div key={i} className="flex justify-between p-4 border-b last:border-0">
                                <span className="text-slate-400 font-medium w-1/3">{row.pronoun}</span>
                                <span className="text-indigo-600 font-black text-xl w-1/3 text-center">{row.verb}</span>
                                <span className="text-slate-300 text-sm w-1/3 text-right italic">{row.fr}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center"><p className="text-slate-400 italic">Clique pour révéler</p></div>
                )}
                <button onClick={rev ? onNext : () => setRev(true)} className="w-full mt-6 bg-yellow-400 text-slate-900 py-5 rounded-2xl font-bold text-xl shadow-lg">{rev ? 'Continuer' : 'Voir Conjugaison'}</button>
            </div>
        </div>
    ); 
};

// --- TYPE 4 : STRUCTURE CARD ---
export const StructureCard = ({ data, onNext }: any) => (
    <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border-b-[12px] border-slate-100">
        <div className="bg-amber-400 p-8 text-slate-900 text-center relative">
            <button onClick={() => speak(data.example)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full"><Volume2 size={20}/></button>
            <h3 className="text-2xl font-black uppercase tracking-wider">{data.title}</h3>
        </div>
        <div className="flex-1 p-8 flex flex-col justify-center items-center gap-6 bg-slate-50">
            <div className="bg-white p-6 rounded-xl border-2 border-slate-200 w-full text-center">
                <p className="font-mono text-indigo-600 font-bold text-lg mb-2">{data.formula}</p>
                <p className="text-slate-500 text-sm">{data.note}</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-slate-800 mb-1">{data.example}</p>
                <p className="text-sm text-slate-400 italic">Exemple</p>
            </div>
            <button onClick={onNext} className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-lg">C'est noté !</button>
        </div>
    </div>
);