// app/lib/audio.ts
import { authFetch } from './firebase-client';

let currentAudio: HTMLAudioElement | null = null;
let audioController: AbortController | null = null;
let premiumVoices = false;

// Cache mémoire : une phrase déjà entendue est rejouée instantanément (et n'est pas refacturée).
const audioCache = new Map<string, string>();

/** Active les voix IA natives (Premium) ou la synthèse vocale du navigateur (gratuite). */
export const setPremiumVoices = (enabled: boolean) => {
  premiumVoices = enabled;
};

const stopAll = () => {
  if (audioController) audioController.abort();
  audioController = new AbortController();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

const playBrowserVoice = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const run = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const esVoice =
      voices.find((v) => (v.name.includes('Google') || v.name.includes('Microsoft')) && v.lang.startsWith('es')) ||
      voices.find((v) => v.lang.startsWith('es'));
    if (esVoice) utterance.voice = esVoice;
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      run();
    };
  } else {
    run();
  }
};

const playUrl = (url: string, text: string) => {
  const audio = new Audio(url);
  currentAudio = audio;
  audio.onerror = () => playBrowserVoice(text);
  audio.play().catch((e) => console.warn('Lecture automatique bloquée :', e));
};

export const speak = async (text: string, voiceId: string | null = null) => {
  if (!text) return;
  stopAll();

  if (!premiumVoices) {
    playBrowserVoice(text);
    return;
  }

  const key = `${voiceId || 'default'}|${text}`;
  const cached = audioCache.get(key);
  if (cached) {
    playUrl(cached, text);
    return;
  }

  const controller = audioController!;
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await authFetch('/api/tts', {
      method: 'POST',
      body: JSON.stringify({ text, voiceId }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`TTS ${response.status}`);
    const url = URL.createObjectURL(await response.blob());
    audioCache.set(key, url);
    if (!controller.signal.aborted) playUrl(url, text);
  } catch (error: any) {
    clearTimeout(timeout);
    // Abandon volontaire (nouvelle phrase lancée) : on ne joue rien.
    if (error?.name === 'AbortError' && audioController !== controller) return;
    console.warn('Voix Premium indisponible, voix du navigateur utilisée :', error?.message || error);
    playBrowserVoice(text);
  }
};
