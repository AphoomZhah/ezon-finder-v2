/**
 * ScreenTitle — canonical question-screen heading.
 *
 * Typography (EZON_DESIGN_LANGUAGE.md §2.3 + §5.3):
 *   Montserrat 700 · 28px · line-height 1.15 · tracking -0.02em
 *   margin-bottom 12px
 *
 * Rules:
 *  - No <em>, no italic, no serif.
 *  - Always renders as <h1> (one per screen).
 */
export function ScreenTitle({ children, style }) {
  return (
    <h1
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        color: 'var(--ink-primary)',
        marginBottom: 12,
        marginTop: 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}
