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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.003L2 22l5.135-1.31A9.953 9.953 0 0 0 12 22c5.522 0 10-4.477 10-10S17.522 2 12 2zm0 18a7.946 7.946 0 0 1-4.073-1.117l-.292-.174-3.048.777.806-2.967-.19-.305A7.948 7.948 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
          </svg>
          Ayuda
        </button>
      )}
    </div>
  );
}
