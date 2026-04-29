/**
 * HorizontalOptionCard — EZON Design Language
 *
 * Single-column horizontal card variant for multi-select screens
 * where the icon/image sits on the left (64px zone) and text on the right.
 *
 * Used by: FunctionsScreen (Paso 5)
 *
 * Selected state follows the canonic EZON pattern:
 *   border: 2px solid INK_PRIMARY + box-shadow ring
 *   green dot 16×16 top-right + checkmark inside
 *   NO flood fill green
 */

import {
  INK_PRIMARY, INK_SECONDARY, INK_TERTIARY, INK_QUATERNARY,
  LINE, SURFACE_CARD, SURFACE_DEEP, EZON, RADIUS_MD, RADIUS_LG,
} from '../design-tokens/tokens';

const CHECKMARK_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' fill='none'%3E%3Cpath d='M1.5 4L3 5.5L6.5 2' stroke='%230A0A0A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

export function HorizontalOptionCard({ option, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        border: isSelected ? `2px solid ${INK_PRIMARY}` : `1px solid ${LINE}`,
        boxShadow: isSelected
          ? `0 0 0 2px ${INK_PRIMARY}, 0 4px 16px -4px rgba(0,0,0,0.08)`
          : 'none',
        borderRadius: RADIUS_LG,
        background: SURFACE_CARD,
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        transition: 'border-color 200ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 200ms cubic-bezier(0.2,0.8,0.2,1)',
        marginBottom: 0,
      }}
    >
      {/* Selected: green dot */}
      {isSelected && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 16, height: 16,
          background: EZON,
          borderRadius: '50%',
          boxShadow: `0 0 0 4px ${SURFACE_CARD}`,
          zIndex: 2,
        }} />
      )}
      {/* Selected: checkmark inside dot */}
      {isSelected && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          width: 8, height: 8,
          backgroundImage: CHECKMARK_SVG,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          zIndex: 3,
        }} />
      )}

      {/* Icon zone (64px) */}
      <div style={{
        width: 48,
        height: 48,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isSelected ? 'rgba(126,219,138,0.10)' : SURFACE_DEEP,
        borderRadius: RADIUS_MD,
        color: isSelected ? INK_PRIMARY : INK_TERTIARY,
        transition: 'background 200ms ease, color 200ms ease',
      }}>
        {option.icon}
      </div>

      {/* Text zone */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '-0.012em',
          color: INK_PRIMARY,
          lineHeight: 1.2,
          marginBottom: 3,
        }}>
          {option.label}
        </div>
        <div style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.4,
          color: INK_SECONDARY,
        }}>
          {option.desc}
        </div>
      </div>
    </button>
  );
}
