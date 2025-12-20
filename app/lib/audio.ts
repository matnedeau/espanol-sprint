// app/lib/audio.ts

let currentAudio: HTMLAudioElement | null = null;
let audioController: AbortController | null = null;

export const speak = async (text: string, voiceId: string | null = null) => {
  if (!text) return;

  // 1. SILENCE TOTAL
  if (audioController) {
      audioController.abort();
  }
  audioController = new AbortController();

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Fallback Robot
  const playRobotVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Microsoft')) && 
      (v.lang.includes('es-ES') || v.lang.includes('es'))
    ) || voices.find(v => v.lang.includes('es'));
    
    if (esVoice) utterance.voice = esVoice;
    utterance.lang = 'es-ES'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // 2. API Call
  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), 4000)
    );

    const apiPromise = fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceId }),
      signal: audioController.signal,
    });

    const response: any = await Promise.race([apiPromise, timeoutPromise]);

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      currentAudio = audio;
      
      audio.onerror = () => { playRobotVoice(); };
      
      if (audioController && !audioController.signal.aborted) {
          audio.play().catch(e => console.warn("Autoplay bloqué :", e));
      }
      return; 
    }
  } catch (error: any) {
    if (error.name === 'AbortError') return;
    playRobotVoice();
  }

  // 3. Fallback immédiat si API échoue
  if (typeof window !== 'undefined' && window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = playRobotVoice;
  } else {
    playRobotVoice();
  }
};