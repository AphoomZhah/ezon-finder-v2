/**
 * ScreenDeck — canonical question-screen subtitle/deck text.
 *
 * Typography (EZON_DESIGN_LANGUAGE.md §2.3 + §5.3):
 *   Open Sans 400 · 14px · line-height 1.55 · max-width 32ch
 *   color --ink-secondary · margin-bottom 28px
 *
 * Rules:
 *  - Only Open Sans 400 (600 only inside <strong> for inline emphasis).
 *  - max-width 32ch creates natural line breaks — do not override.
 *  - No italic.
 */
export function ScreenDeck({ children, style }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.55,
        color: 'var(--ink-secondary)',
        marginBottom: 28,
        marginTop: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
