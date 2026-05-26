import { useState } from 'react';

/**
 * ScreenTitle — canonical question-screen heading.
 * Optional helpContent prop renders an ⓘ icon inline that
 * opens a popover overlay when tapped.
 */
export function ScreenTitle({ children, style, helpContent }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 24,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--ink-primary)',
          marginBottom: 6,
          marginTop: 0,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          ...style,
        }}
      >
        <span style={{ flex: 1 }}>{children}</span>
        {helpContent && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Más información"
            style={{
              flexShrink: 0,
              marginTop: 3,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'var(--ink-tertiary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </button>
        )}
      </h1>

      {/* Popover overlay */}
      {helpContent && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0 0 0 0',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              borderRadius: '20px 20px 0 0',
              width: '100%',
              maxWidth: 480,
              overflow: 'hidden',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0 8px',
            }}>
              <div style={{
                width: 36, height: 4,
                borderRadius: 2,
                background: 'var(--line)',
              }}/>
            </div>

            {/* Content */}
            <div style={{ padding: '0 0 32px' }}>
              {helpContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
