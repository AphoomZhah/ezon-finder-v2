import { EZON, VERDE_DEEP } from '../components';

const WA_URL = 'https://wa.me/525500000000';

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
      <div style={{
        position: 'absolute',
        top: 20,
        left: 24,
        zIndex: 2,
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 900,
        fontSize: 22,
        letterSpacing: '-0.02em',
        color: '#FFFFFF',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        EZ<span style={{ color: EZON }}>O</span>N
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
