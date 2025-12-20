import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'EspañolSprint - Apprentissage Rapide';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #FBBF24, #F59E0B)', // Jaune/Orange Espagnol
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Motif de fond subtil */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, background: 'rgba(0,0,0,0.1)', borderRadius: '50%' }} />

        {/* Logo Emoji */}
        <div style={{ fontSize: 150, marginBottom: 20 }}>🇪🇸</div>

        {/* Titre */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: '-0.05em', textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            Español<span style={{ color: '#DC2626' }}>Sprint</span> {/* Rouge */}
          </span>
          <span style={{ fontSize: 40, fontWeight: 600, opacity: 0.9, marginTop: 20, background: 'rgba(0,0,0,0.2)', padding: '10px 40px', borderRadius: 50 }}>
            Niveau A1 ➔ C1
          </span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}