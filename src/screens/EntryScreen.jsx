import { EZON, VERDE_DEEP } from '../components';

const WA_URL = 'https://wa.me/525587432050?text=Hola%2C%20me%20interesa%20cotizar%20una%20cerradura%20inteligente.';

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function EntryScreen({ onStart }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100dvh',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#0A0A0A',
    }}>
      {/* Full-bleed image */}
      <img
        src="/assets/img/entry-bg.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
        }}
      />

      {/* Gradient overlay — transparent top, dark bottom */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.88) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Logo — top left */}
      <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
        <svg
          viewBox="0 0 796 239"
          role="img"
          aria-label="EZON"
          style={{ height: 26, width: 'auto', display: 'block' }}
        >
          {/* Letras E, Z, N → blanco */}
          <path fill="#FFFFFF" d="M133.877 51.586H59.684V94.506H130.218V137.756H59.684V186.997H133.877V230.25H8.44604V8.334H133.877V51.586Z"/>
          <path fill="#FFFFFF" d="M226.156 186.996H321.311V230.25H141.982L248.448 51.585H159.283V8.334H332.291L226.156 186.996Z"/>
          {/* O → verde de marca */}
          <path fill="#88C384" d="M386.283 69.5513C376.635 78.8683 366.653 95.1703 366.653 119.79C366.653 140.087 373.308 156.388 386.948 169.696C401.255 183.337 417.224 187.994 434.527 187.994C457.151 187.994 473.12 179.678 483.768 169.029C492.416 160.713 503.064 145.076 503.064 119.457C503.064 96.5003 493.75 79.5333 483.768 69.5513C472.788 58.9043 455.154 50.5863 434.859 50.5863C415.563 50.5863 398.26 57.5743 386.283 69.5513ZM521.03 35.6163C541.992 55.9113 555.633 85.1883 555.633 119.457C555.633 149.07 544.984 179.347 521.03 202.633C500.4 222.596 472.457 235.238 435.19 235.238C393.602 235.238 365.321 218.606 348.687 202.633C327.394 182.674 314.085 152.729 314.085 120.122C314.085 88.1823 328.391 55.9113 348.354 35.9473C363.326 20.9773 390.94 3.34329 435.19 3.34329C469.792 3.34329 498.739 13.9893 521.03 35.6163Z"/>
          <path fill="#FFFFFF" d="M571.178 230.25V8.334H615.762L736.204 151.4V8.334H787.438V230.25H742.858L622.416 86.521V230.25H571.178Z"/>
        </svg>
      </div>

      {/* Content — bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: '0 24px max(28px, env(safe-area-inset-bottom))',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Title */}
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(32px, 9vw, 40px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          marginBottom: 12,
          marginTop: 0,
        }}>
          Encuentra tu<br />cerradura ideal
        </h1>

        {/* Paragraph */}
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.75)',
          marginBottom: 16,
          marginTop: 0,
        }}>
          Responde unas preguntas y te mostraremos
          las cerraduras compatibles con tu puerta.
        </p>

        {/* Duration line */}
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.50)',
          marginBottom: 28,
          marginTop: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            6 preguntas
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ~5 min
          </span>
        </p>

        {/* CTA button */}
        <button
          onClick={onStart}
          style={{
            width: '100%',
            height: 56,
            padding: '0 24px',
            background: EZON,
            color: '#111111',
            border: 'none',
            borderRadius: 999,
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 4px 24px -4px rgba(126, 219, 138, 0.50)',
            marginBottom: 12,
            transition: 'transform 120ms ease, background-color 120ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = VERDE_DEEP;
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = EZON;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Empezar
          <ArrowRightIcon />
        </button>

        {/* Secondary link */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            width: '100%',
            height: 44,
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.50)',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 13.5,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'color 120ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.50)'; }}
        >
          Contactar a un ejecutivo
        </a>
      </div>
    </div>
  );
}
