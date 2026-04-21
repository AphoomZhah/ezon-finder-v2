// EZON Smart Lock Finder — Shared Components
// Design System: EZON Trusted Light

export const VERDE = '#7EDB8A';
export const BG_APP = '#F5F5F5';
export const BG_WHITE = '#FFFFFF';
export const TEXT_PRIMARY = '#111111';
export const TEXT_SECONDARY = '#6B6B6B';
export const BORDER_REST = '#E5E5E5';
export const ALERT_BG = '#FEF3C7';
export const ALERT_TEXT = '#92400E';

import { useState } from 'react';

// ─── Photo Placeholder ────────────────────────────────────────────────────────
const photoMoods = {
  hero:             { bg: '#7A8A92', stripe: '#6A7A82' },
  madera:           { bg: '#B89060', stripe: '#A07E50' },
  aluminio:         { bg: '#8EA8B8', stripe: '#7898A8' },
  metal:            { bg: '#5C6E78', stripe: '#4C5E68' },
  vidrio:           { bg: '#B8CED8', stripe: '#A4BCCC' },
  interior:         { bg: '#C4B4A0', stripe: '#B0A08C' },
  exterior_cubierto:{ bg: '#8A9C94', stripe: '#7A8C84' },
  exterior_abierto: { bg: '#8098B0', stripe: '#6888A0' },
  abatible:         { bg: '#B0A494', stripe: '#9C9080' },
  corrediza:        { bg: '#94A8B4', stripe: '#8098A4' },
  product1:         { bg: '#DDE4EC', stripe: '#CDD4DC' },
  product2:         { bg: '#E4E0DC', stripe: '#D4D0CC' },
  product3:         { bg: '#E0E8E4', stripe: '#D0D8D4' },
};

export function PhotoPlaceholder({ mood = 'hero', label, style, className, children }) {
  const m = photoMoods[mood] || photoMoods.hero;
  return (
    <div
      className={className}
      style={{
        background: `repeating-linear-gradient(135deg, ${m.bg} 0px, ${m.bg} 14px, ${m.stripe} 14px, ${m.stripe} 28px)`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 10,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
      {label && (
        <span style={{
          fontFamily: 'monospace', fontSize: 9.5,
          color: 'rgba(255,255,255,0.9)',
          background: 'rgba(0,0,0,0.38)',
          padding: '2px 8px', borderRadius: 2,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ step, total = 6 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < step ? VERDE : BORDER_REST,
            transition: 'background 0.35s ease',
          }}/>
        ))}
      </div>
      <span style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 10.5, fontWeight: 600,
        color: TEXT_SECONDARY, whiteSpace: 'nowrap',
        letterSpacing: '0.06em',
      }}>
        PASO {step} DE {total}
      </span>
    </div>
  );
}

// ─── Back Button ──────────────────────────────────────────────────────────────
export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '0 0 4px', display: 'flex', alignItems: 'center',
      gap: 5, color: TEXT_SECONDARY,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 13, fontWeight: 600,
      marginBottom: 16,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Atrás
    </button>
  );
}

// ─── Primary CTA Button ───────────────────────────────────────────────────────
export function PrimaryButton({ children, onClick, disabled, style }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: '100%', padding: '17px 24px',
        background: disabled ? '#C8E8CB' : VERDE,
        color: disabled ? '#90B893' : TEXT_PRIMARY,
        border: 'none', borderRadius: 8,
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: 400, fontSize: 14,
        letterSpacing: '0.1em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: pressed && !disabled ? 'scale(0.985)' : 'scale(1)',
        transition: 'background 0.15s, transform 0.1s',
        ...style
      }}
    >
      {children}
    </button>
  );
}

// ─── WhatsApp Link ────────────────────────────────────────────────────────────
export function WhatsAppLink({ text = 'Hablar con un asesor', style }) {
  return (
    <a href="https://wa.me/525500000000" target="_blank" rel="noreferrer" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, padding: '15px 24px',
      border: `1.5px solid ${BORDER_REST}`, borderRadius: 8,
      textDecoration: 'none',
      fontFamily: "'Open Sans', sans-serif", fontWeight: 600,
      fontSize: 14, color: TEXT_PRIMARY, background: BG_WHITE,
      cursor: 'pointer', ...style
    }}>
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M22.5 19.8c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.12-.28-.2-.58-.35z" fill="white"/>
      </svg>
      {text}
    </a>
  );
}

// ─── Alert Box ────────────────────────────────────────────────────────────────
export function AlertBox({ children }) {
  return (
    <div style={{
      background: ALERT_BG, borderRadius: 8,
      padding: '14px 16px', marginTop: 10,
      animation: 'fadeInDown 0.22s ease',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M10 2.5L18 17H2L10 2.5Z" stroke={ALERT_TEXT} strokeWidth="1.5" strokeLinejoin="round"/>
          <line x1="10" y1="8" x2="10" y2="12" stroke={ALERT_TEXT} strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="14.5" r="0.9" fill={ALERT_TEXT}/>
        </svg>
        <div style={{ color: ALERT_TEXT, fontFamily: "'Open Sans', sans-serif", fontSize: 13, lineHeight: 1.55 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Bill Illustration ────────────────────────────────────────────────────────
export function BillIllustration() {
  return (
    <div style={{
      background: BG_WHITE, borderRadius: 12,
      padding: '18px 20px 14px',
      border: `1px solid ${BORDER_REST}`,
      marginBottom: 20,
    }}>
      <p style={{
        fontFamily: "'Open Sans', sans-serif", fontSize: 11,
        fontWeight: 600, color: TEXT_SECONDARY,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        marginBottom: 12,
      }}>Referencia rápida sin regla</p>

      <svg viewBox="0 0 320 110" fill="none" style={{ width: '100%' }}>
        <rect x="8" y="30" width="18" height="50" rx="2" fill="#C4A882"/>
        <rect x="26" y="24" width="42" height="62" rx="1" fill="#A08060"/>
        <text x="47" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#888">canto</text>
        <line x1="47" y1="88" x2="47" y2="96" stroke="#aaa" strokeWidth="1"/>
        <rect x="68" y="38" width="130" height="46" rx="5" fill="#EEF8EC" stroke={VERDE} strokeWidth="2"/>
        <rect x="80" y="50" width="22" height="22" rx="2" fill={VERDE} opacity="0.25"/>
        <rect x="162" y="50" width="22" height="22" rx="2" fill={VERDE} opacity="0.25"/>
        <circle cx="131" cy="61" r="10" stroke={VERDE} strokeWidth="1.5" opacity="0.4"/>
        <text x="131" y="66" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="bold" fill="#3A6A35">$</text>
        <line x1="68" y1="28" x2="198" y2="28" stroke={TEXT_PRIMARY} strokeWidth="1"/>
        <line x1="68" y1="23" x2="68" y2="33" stroke={TEXT_PRIMARY} strokeWidth="1.5"/>
        <line x1="198" y1="23" x2="198" y2="33" stroke={TEXT_PRIMARY} strokeWidth="1.5"/>
        <text x="133" y="21" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill={TEXT_PRIMARY} fontWeight="bold">6.5 cm</text>
        <text x="215" y="46" fontFamily="sans-serif" fontSize="10" fill={TEXT_SECONDARY}>Cualquier billete</text>
        <text x="215" y="60" fontFamily="sans-serif" fontSize="10" fill={TEXT_SECONDARY}>mexicano mide</text>
        <text x="215" y="80" fontFamily="sans-serif" fontSize="13" fill={TEXT_PRIMARY} fontWeight="bold">6.5 cm de ancho</text>
        <text x="215" y="96" fontFamily="sans-serif" fontSize="9.5" fill={TEXT_SECONDARY}>Apóyalo en el canto</text>
        <text x="215" y="108" fontFamily="sans-serif" fontSize="9.5" fill={TEXT_SECONDARY}>para estimar el grosor</text>
      </svg>
    </div>
  );
}

// ─── Access Icons ─────────────────────────────────────────────────────────────
export function AccessIcon({ type, size = 26 }) {
  const s = { stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    huella: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7.03 3 3 7.03 3 12" {...s}/>
        <path d="M12 6.5C9 6.5 6.5 9 6.5 12c0 1.5.35 2.9.97 4.15" {...s}/>
        <path d="M12 10a2 2 0 012 2v5.5" {...s}/>
        <path d="M9 11.3c-.32.7-.5 1.4-.5 2.2 0 1.6.5 3.1 1.35 4.3" {...s}/>
        <path d="M12 3c4.97 0 9 4.03 9 9" {...s}/>
        <path d="M15.5 18c.56-1.1.87-2.36.87-3.6" {...s}/>
      </svg>
    ),
    pin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2.5" {...s}/>
        <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/>
        <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="13" r="1" fill="currentColor" stroke="none"/>
        <rect x="9" y="16" width="6" height="1.5" rx="0.75" fill="currentColor" stroke="none"/>
      </svg>
    ),
    rfid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="15" height="10" rx="2" {...s}/>
        <line x1="18" y1="9" x2="22" y2="9" {...s}/>
        <line x1="18" y1="12" x2="22" y2="12" {...s}/>
        <line x1="18" y1="15" x2="20" y2="15" {...s}/>
        <rect x="5" y="9" width="5" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.3"/>
      </svg>
    ),
    app: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" {...s}/>
        <circle cx="12" cy="18.5" r="1.2" fill="currentColor" stroke="none"/>
        <line x1="9.5" y1="6" x2="14.5" y2="6" {...s}/>
        <rect x="8" y="9" width="8" height="6" rx="1.5" {...s}/>
      </svg>
    ),
    facial: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 9V5a2 2 0 012-2h4M21 9V5a2 2 0 00-2-2h-4M3 15v4a2 2 0 002 2h4M21 15v4a2 2 0 01-2 2h-4" {...s}/>
        <circle cx="9.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="14.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
        <path d="M8.5 15s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5" {...s}/>
      </svg>
    ),
    llave: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="8.5" cy="12" r="4.5" {...s}/>
        <line x1="13" y1="12" x2="22" y2="12" {...s}/>
        <line x1="19" y1="10" x2="19" y2="12" {...s}/>
        <line x1="22" y1="12" x2="22" y2="14" {...s}/>
      </svg>
    ),
    wifi: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 9.5C7.5 4 16.5 4 22 9.5" {...s}/>
        <path d="M5.5 13c3.6-3.6 9.4-3.6 13 0" {...s}/>
        <path d="M9 16.5c1.7-1.7 6.3-1.7 6 0" {...s}/>
        <circle cx="12" cy="20" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    camara: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="16" height="11" rx="2" {...s}/>
        <polygon points="18,10.5 22,8 22,16 18,13.5" {...s}/>
        <circle cx="10" cy="12.5" r="2.5" {...s}/>
      </svg>
    ),
  };
  return icons[type] || null;
}

// ─── Lock Product Placeholder ──────────────────────────────────────────────────
export function LockProductPlaceholder({ mood = 'product1', size = 88 }) {
  const m = photoMoods[mood] || photoMoods.product1;
  return (
    <div style={{
      width: size, height: size,
      background: `repeating-linear-gradient(135deg, ${m.bg} 0px, ${m.bg} 10px, ${m.stripe} 10px, ${m.stripe} 20px)`,
      borderRadius: 8, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width={size * 0.52} height={size * 0.6} viewBox="0 0 26 32" fill="none">
        <rect x="1" y="13" width="24" height="18" rx="4" fill="rgba(255,255,255,0.35)"/>
        <path d="M6 13V9a7 7 0 0114 0v4" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="13" cy="22" r="2.5" fill="rgba(255,255,255,0.65)"/>
        <line x1="13" y1="24.5" x2="13" y2="27.5" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export function HeroImage({ style, className, children }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url("/assets/img/entry-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
}
