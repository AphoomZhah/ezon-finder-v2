/**
 * StepMeta — canonical step header used in every question screen.
 *
 * Renders:  • 01 / 06 · Material de la puerta
 *
 * Rules (from EZON_DESIGN_LANGUAGE.md §5.2):
 *  - Montserrat 700, 10px, letter-spacing 0.16em, uppercase, tabular-nums
 *  - Dot: 4×4 px, border-radius 50%, background var(--ezon)
 *  - Number: var(--ink-primary)  (highlighted)
 *  - Step name: var(--ink-tertiary)  (subdued)
 *  - Gap between elements: 12px
 *  - margin-bottom: 16px
 */

export function StepMeta({ currentStep, totalSteps = 6, stepName }) {
  const formatted = String(currentStep).padStart(2, '0');
  const total     = String(totalSteps).padStart(2, '0');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--ink-tertiary)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {/* Green dot */}
      <span
        style={{
          display: 'inline-block',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'var(--ezon)',
          flexShrink: 0,
        }}
      />

      {/* Step counter */}
      <span style={{ color: 'var(--ink-primary)' }}>
        {formatted} / {total}
      </span>

      {/* Step name */}
      <span>{stepName}</span>
    </div>
  );
}
