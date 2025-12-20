'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, Check, X } from 'lucide-react';
import { speak } from '@/app/lib/audio';
import { SwipeCard, InputCard, GrammarCard, StructureCard } from './LessonCards';

interface LessonEngineProps {
  lessonId: number | string; // Accepte ID ou Content
  initialContent?: any;      // Optionnel: contenu préchargé
  onComplete: (xp: number, content: any, id: any, score: number) => void;
  onExit: () => void;
  isExam?: boolean;
}

export default function LessonEngine({ lessonId, initialContent, onComplete, onExit, isExam }: LessonEngineProps) {
  const [content, setContent] = useState<any>(initialContent || null);
  const [loading, setLoading] = useState(!initialContent);
  const [error, setError] = useState("");

  // FETCH API : Charge la leçon si le contenu n'est pas fourni
  useEffect(() => {
    if (content) return; // Si déjà chargé, on ne fait rien

    // Si lessonId est "exam", le contenu doit être fourni via initialContent (géré par page.tsx pour l'instant)
    if (lessonId === 'exam') {
        setLoading(false);
        return; 
    }

    setLoading(true);
    fetch(`/api/lesson/${lessonId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur chargement");
        return res.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de charger la leçon.");
        setLoading(false);
      });
  }, [lessonId, content]);

  // SÉCURITÉ : Filtrage des données
  const safeContent = useMemo(() => {
    if (!Array.isArray(content)) return [];
    return content.filter((item: any) => item && item.type);
  }, [content]);

  const [idx, setIdx] = useState(0); 
  const [prog, setProg] = useState(0); 
  const [score, setScore] = useState(0);
  
  const card = safeContent[idx]; 

  const next = () => { 
      if (idx + 1 >= safeContent.length) { 
          setProg(100); 
          setTimeout(() => onComplete(150, safeContent, lessonId, score), 500); 
      } else { 
          setProg(((idx + 1) / safeContent.length) * 100); 
          setIdx(i => i + 1); 
      } 
  };
  
  const handleScore = (correct: boolean) => { if(correct) setScore(s => s + 1); };

  // Audio automatique
  useEffect(() => { 
    if (card?.es && (card.type === 'swipe' || card.type === 'input')) {
        speak(card.es); 
    }
  }, [card]);
  
  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={48}/><p className="ml-2 font-bold text-indigo-600">Chargement...</p></div>;
  if (error) return <div className="h-full flex flex-col items-center justify-center"><p className="text-red-500 font-bold">{error}</p><button onClick={onExit} className="mt-4 px-4 py-2 bg-slate-200 rounded-xl font-bold">Retour</button></div>;

  if (!card) {
      if (idx >= safeContent.length && safeContent.length > 0) return null; // Fin normale
      return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin"/></div>; 
  }

  return (
    <div className="h-full w-full flex flex-col bg-slate-50">
        <div className="px-6 py-4 flex items-center gap-6 bg-white border-b z-10">
            <button onClick={onExit}><X className="text-slate-400" /></button>
            <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${prog}%` }}></div>
            </div>
            {isExam && <div className="font-black text-indigo-600">{score} / 20</div>}
        </div>
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
            {prog >= 100 ? (
                <div className="flex flex-col items-center animate-in zoom-in">
                    <Check size={48} className="text-green-600 mb-4" />
                    <h3 className="text-2xl font-black text-slate-800">Terminé !</h3>
                </div>
            ) : (
                <div className="w-full max-w-md aspect-[3/4] md:aspect-auto md:h-[600px] perspective-1000">
                    {card.type === 'swipe' && (<SwipeCard key={card.id} data={card} onNext={next} />)}
                    {card.type === 'input' && (<InputCard key={card.id} data={card} onNext={next} isExam={isExam} onScore={handleScore} />)}
                    {card.type === 'grammar' && (<GrammarCard key={card.id} data={card} onNext={next} />)}
                    {card.type === 'structure' && (<StructureCard key={card.id} data={card} onNext={next} />)}
                </div>
            )}
        </div>
    </div>
  ); 
}