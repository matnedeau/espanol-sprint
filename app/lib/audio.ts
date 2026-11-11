// app/lib/audio.ts
import { authFetch } from './firebase-client';

// Règle unique : une seule voix à la fois. Chaque demande de lecture reçoit un numéro ; tout ce qui arrive
// en retard (voix Premium lente, voix du navigateur différée, erreur tardive) est ignoré si une demande
// plus récente a été faite entre-temps. C'est ce qui empêche les voix de se chevaucher.
let requestId = 0;
let currentAudio: HTMLAudioElement | null = null;
let audioController: AbortController | null = null;
let premiumVoices = false;
let lastRequest = { text: '', at: 0 };

// Cache mémoire : une phrase déjà entendue est rejouée instantanément (et n'est pas refacturée).
const audioCache = new Map<string, string>();

// Une voix Premium qui met plus longtemps est abandonnée (le serveur peut être lent au premier appel).
const PREMIUM_TIMEOUT_MS = 12000;

/** Active les voix IA natives (Premium) ou la synthèse vocale du navigateur (gratuite). */
export const setPremiumVoices = (enabled: boolean) => {
  premiumVoices = enabled;
};

const isCurrent = (id: number) => id === requestId;

/** Coupe tout ce qui est en cours ou en attente : voix Premium, téléchargement, voix du navigateur. */
export const stopSpeaking = () => {
  requestId++;
  if (audioController) audioController.abort();
  audioController = null;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  if (currentAudio) {
    currentAudio.onerror = null;
    currentAudio.onended = null;
    currentAudio.pause();
    currentAudio = null;
  }
};

const waitForVoices = (): Promise<SpeechSynthesisVoice[]> =>
  new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) return resolve(voices);
    const done = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', done);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', done);
    setTimeout(done, 1500); // Certains navigateurs ne déclenchent jamais l'événement
  });

const playBrowserVoice = async (text: string, id: number) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const voices = await waitForVoices();
  if (!isCurrent(id)) return; // Une autre phrase a été demandée pendant le chargement des voix
  const utterance = new SpeechSynthesisUtterance(text);
  const esVoice =
    voices.find((v) => (v.name.includes('Google') || v.name.includes('Microsoft')) && v.lang.startsWith('es')) ||
    voices.find((v) => v.lang.startsWith('es'));
  if (esVoice) utterance.voice = esVoice;
  utterance.lang = 'es-ES';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const playUrl = (url: string, text: string, id: number) => {
  if (!isCurrent(id)) return;
  const audio = new Audio(url);
  currentAudio = audio;
  let started = false;
  audio.onplaying = () => { started = true; };
  // Repli sur la voix du navigateur seulement si ce son n'a jamais démarré et qu'il est toujours le plus récent
  audio.onerror = () => { if (!started && isCurrent(id) && currentAudio === audio) playBrowserVoice(text, id); };
  audio.play().then(() => { started = true; }).catch((e) => console.warn('Lecture automatique bloquée :', e));
};

export const speak = async (text: string, voiceId: string | null = null) => {
  if (!text) return;

  // La même phrase demandée deux fois de suite (lecture automatique + clic) : on ne la relance pas
  const now = Date.now();
  if (text === lastRequest.text && now - lastRequest.at < 400) return;
  lastRequest = { text, at: now };

  stopSpeaking();
  const id = requestId;

  if (!premiumVoices) {
    playBrowserVoice(text, id);
    return;
  }

  const key = `${voiceId || 'default'}|${text}`;
  const cached = audioCache.get(key);
  if (cached) {
    playUrl(cached, text, id);
    return;
  }

  const controller = new AbortController();
  audioController = controller;
  const timeout = setTimeout(() => controller.abort(), PREMIUM_TIMEOUT_MS);
  try {
    const response = await authFetch('/api/tts', {
      method: 'POST',
      body: JSON.stringify({ text, voiceId }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`TTS ${response.status}`);
    const url = URL.createObjectURL(await response.blob());
    audioCache.set(key, url);
    playUrl(url, text, id);
  } catch (error: any) {
    // Une phrase plus récente a été demandée : on ne joue rien du tout
    if (!isCurrent(id)) return;
    console.warn('Voix Premium indisponible, voix du navigateur utilisée :', error?.message || error);
    playBrowserVoice(text, id);
  } finally {
    clearTimeout(timeout);
    if (audioController === controller) audioController = null;
  }
};
