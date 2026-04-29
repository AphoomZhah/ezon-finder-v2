import { Screen, HeroChip, SURFACE, INK_PRIMARY, INK_SECONDARY, EZON, VERDE_DEEP } from '../components';

const WA_URL = 'https://wa.me/525500000000';

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function EntryScreen({ onStart }) {
  return (
    <Screen style={{ overflow: 'hidden' }}>
      {/* Hero — 62% of viewport */}
      <div style={{
        flex: '0 0 62%',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}>
        <img
          src="/assets/img/entry-bg.jpg"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />
        {/* Depth gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 65%, rgba(10,10,10,0.55) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Logo */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
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
        {/* Chip stack */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <HeroChip dot>Asistente inteligente</HeroChip>
          <HeroChip icon={<CalendarIcon />}>6 preguntas</HeroChip>
          <HeroChip icon={<ClockIcon />}>~5 min</HeroChip>
        </div>
      </div>

      {/* Sheet — 38% of viewport */}
      <div style={{
        flex: '1 1 auto',
        background: SURFACE,
        padding: '28px 24px 32px',
        borderRadius: '24px 24px 0 0',
        marginTop: -20,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 8vw, 32px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: INK_PRIMARY,
          marginBottom: 14,
        }}>
          Encuentra tu<br />cerradura ideal
        </h1>

        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
          color: INK_SECONDARY,
          marginBottom: 32,
        }}>
          Responde unas preguntas y te mostraremos las cerraduras compatibles con tu instalación específica.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={onStart}
            style={{
              width: '100%',
              height: 56,
              padding: '0 24px',
              background: EZON,
              color: INK_PRIMARY,
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
              boxShadow: '0 4px 14px -4px rgba(126, 219, 138, 0.55)',
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

          <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              width: '100%',
              height: 44,
              background: 'transparent',
              border: 'none',
              color: INK_SECONDARY,
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
            onMouseEnter={e => { e.currentTarget.style.color = INK_PRIMARY; }}
            onMouseLeave={e => { e.currentTarget.style.color = INK_SECONDARY; }}
          >
            Contactar a un ejecutivo
          </a>
        </div>
      </div>
    </Screen>
  );
}
