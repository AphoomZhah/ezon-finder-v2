/**
 * ProgressBar — standalone segmented bar (EZON Design Language)
 * Used by screens that need a progress indicator outside the FinderFooter.
 * NOTE: FinderFooter already includes its own inline progress — prefer using
 * FinderFooter directly instead of this component in question screens.
 *
 * Segment colors:
 *   done    → INK_PRIMARY (black)
 *   active  → EZON (green)
 *   pending → LINE (grey)
 */

import { INK_PRIMARY, INK_TERTIARY, LINE, EZON } from '../design-tokens/tokens';

export function ProgressBar({ step, total = 6 }) {
  const fmt = (n) => String(n).padStart(2, '0');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ display: 'flex', gap: 2, flex: 1, height: 4 }}>
        {Array.from({ length: total }).map((_, i) => {
          let bg;
          if (i < step - 1) bg = INK_PRIMARY;
          else if (i === step - 1) bg = EZON;
          else bg = LINE;
          return (
            <div key={i} style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: bg,
              transition: 'background 350ms ease',
            }} />
          );
        })}
      </div>
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: '0.15em',
        fontVariantNumeric: 'tabular-nums',
        color: INK_TERTIARY,
        whiteSpace: 'nowrap',
      }}>
        <span style={{ color: INK_PRIMARY }}>{fmt(step)}</span>
        {' / '}
        {fmt(total)}
      </span>
    </div>
  );
}
