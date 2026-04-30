import { EZON } from '../design-tokens/tokens';

export function HeroChip({ dot, icon, children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: 999,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 11.5,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#FFFFFF',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>
      {dot && (
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: EZON,
          boxShadow: `0 0 8px ${EZON}`,
          flexShrink: 0,
        }} />
      )}
      {icon && !dot && (
        <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
