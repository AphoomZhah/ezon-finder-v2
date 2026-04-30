const WA_URL = 'https://wa.me/525500000000';

export function AppHeader({ onBack, showBack = true, onHelp, onReset }) {
  const handleHelp = onHelp || (() => window.open(WA_URL, '_blank'));

  return (
    <div style={{
      padding: '18px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      {/* {showBack ? (
        <button
          onClick={onBack}
          aria-label="Volver"
          style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: 'var(--surface-card)',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4"
              stroke="var(--ink-primary)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div style={{ width: 36 }} />
      )} */}

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: '0.16em',
        color: 'var(--ink-primary)',
        textTransform: 'uppercase',
      }}>
        EZ<span style={{ color: 'var(--ezon)' }}>O</span>N
      </div>

      {onReset ? (
        <button
          onClick={onReset}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--ink-secondary)',
            background: 'transparent',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: '7px 14px',
            cursor: 'pointer',
          }}
        >
          Reiniciar
        </button>
      ) : (
        <button
          onClick={handleHelp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: 'var(--ink-tertiary)',
            textTransform: 'uppercase',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: '1px solid var(--line)',
            padding: '0 0 2px 0',
            cursor: 'pointer',
          }}
        >
          Ayuda
        </button>
      )}
    </div>
  );
}
