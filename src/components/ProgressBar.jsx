import { VERDE, BORDER_REST, TEXT_SECONDARY } from '../design-tokens/tokens';

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
