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
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="13"
            height="13"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.785L0 32l8.436-2.007A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0Zm0 29.334a13.26 13.26 0 0 1-6.754-1.844l-.484-.287-5.007 1.192 1.22-4.876-.315-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.334 16 29.334ZM23.27 19.54c-.38-.19-2.247-1.108-2.595-1.235-.348-.126-.602-.19-.855.19-.254.38-.982 1.235-1.204 1.49-.221.253-.443.285-.823.095-.38-.19-1.604-.59-3.054-1.883-1.128-1.006-1.89-2.25-2.112-2.63-.221-.38-.024-.585.166-.774.17-.17.38-.443.57-.665.19-.222.253-.38.38-.633.126-.254.063-.475-.032-.665-.095-.19-.855-2.06-1.172-2.82-.308-.74-.621-.64-.855-.652l-.728-.012c-.254 0-.665.095-.013.475s-1.521 1.49-1.521 3.63c0 2.14 1.557 4.21 1.775 4.5.19.254 3.063 4.678 7.422 6.558 1.038.448 1.848.715 2.48.916.042.013.082.025.123.037 1.018.308 1.944.264 2.676.16.817-.117 2.512-.027 2.87-2.02.358-1.993.358-3.71.253-4.067-.095-.254-.348-.38-.728-.57Z"/>
          </svg>
          Ayuda
        </button>
      )}
    </div>
  );
}
