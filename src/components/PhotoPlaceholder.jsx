export const photoMoods = {
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
  neutral:          { bg: '#C8C8C8', stripe: '#B8B8B8' },
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
