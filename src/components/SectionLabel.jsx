/**
 * SectionLabel — EZON Design Language
 *
 * Internal section divider used on screens with multiple sections
 * (e.g., ThicknessScreen: A: Selecciona el rango / B: Instrumento de medición).
 *
 * Structure:
 *   [A]  SELECCIONA EL RANGO  ──────────────────
 *
 * Only use when a screen has more than one content section.
 */

import { INK_PRIMARY, INK_TERTIARY, LINE, SURFACE_DEEP } from '../design-tokens/tokens';

export function SectionLabel({ letter, children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: INK_TERTIARY,
      fontVariantNumeric: 'tabular-nums',
      position: 'relative',
    }}>
      {/* Letter chip */}
      {letter && (
        <span style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          color: INK_PRIMARY,
          background: SURFACE_DEEP,
          padding: '3px 7px',
          borderRadius: 2,
          fontSize: 9,
          letterSpacing: '0.08em',
          flexShrink: 0,
        }}>
          {letter}
        </span>
      )}
      {/* Label text */}
      <span>{children}</span>
      {/* Flex-fill line */}
      <span style={{
        flex: 1,
        height: 1,
        background: LINE,
      }} />
    </div>
  );
}
