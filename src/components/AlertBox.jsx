import { ALERT_BG, ALERT_TEXT } from '../design-tokens/tokens';

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
