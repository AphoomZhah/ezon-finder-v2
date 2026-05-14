/**
 * OptionCard / OptionCardGrid — EZON Design Language v2
 *
 * Variants:
 *   'visual'   — hero photo area (material textures), badge, title, desc
 *   'diagram'  — technical door-edge diagram at scale, numeric value, desc
 *   'unknown'  — "No lo sé" escape card with dashed border and ? circle
 *
 * Selected state (all variants):
 *   border: 2px solid INK_PRIMARY + box-shadow ring (no flood fill green)
 *   green dot 16×16 at top-right + checkmark SVG inside
 */

import {
  INK_PRIMARY, INK_SECONDARY, INK_TERTIARY, INK_QUATERNARY,
  LINE, SURFACE_CARD, SURFACE_DEEP, EZON, RADIUS_LG,
} from '../design-tokens/tokens';

/* ─── Material textures (extracted from ezon_finder_screen01_material.html) ── */
const MATERIAL_TEXTURES = {
  madera: {
    background: `
      repeating-linear-gradient(90deg,
        transparent 0, rgba(60,35,18,0) 8px,
        rgba(60,35,18,0.08) 9px, rgba(60,35,18,0.02) 14px,
        transparent 22px, transparent 38px,
        rgba(40,20,10,0.06) 39px, transparent 50px),
      radial-gradient(ellipse 80px 40px at 30% 60%, rgba(50,25,12,0.18), transparent 70%),
      radial-gradient(ellipse 50px 25px at 80% 30%, rgba(55,30,15,0.15), transparent 70%),
      linear-gradient(170deg, #B8825C 0%, #9C6843 35%, #8C5635 70%, #7A4828 100%)`,
  },
  metal: {
    background: `
      repeating-linear-gradient(90deg,
        rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px,
        transparent 1px, transparent 3px,
        rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px),
      linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%),
      linear-gradient(135deg, #5B6470 0%, #424A55 40%, #353C46 70%, #2B313A 100%)`,
  },
  vidrio: {
    background: `
      linear-gradient(125deg,
        transparent 0%, transparent 35%,
        rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.55) 50%,
        rgba(255,255,255,0.35) 55%, transparent 65%, transparent 100%),
      linear-gradient(165deg, #C5D5DD 0%, #A8BCC8 40%, #8AA3B2 75%, #6E8A9C 100%)`,
  },
  neutral: {
    background: `
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 1px, transparent 2px),
      radial-gradient(circle at 60% 70%, rgba(0,0,0,0.04) 1px, transparent 2px),
      radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 1px, transparent 2px),
      linear-gradient(160deg, #C9C5BE 0%, #ADA89F 50%, #908B82 100%)`,
    backgroundSize: '14px 14px, 18px 18px, 22px 22px, 100% 100%',
  },
  /* unknown — "No lo sé" selectable card: muted gray surface, no badge */
  unknown: {
    background: SURFACE_DEEP,
  },
  /* fallback for door-type diagrams with SVG image */
  abatible:  { background: 'linear-gradient(145deg, #5B6880 0%, #44526A 100%)' },
  corrediza: { background: 'linear-gradient(145deg, #4A6070 0%, #374D5C 100%)' },
  reja:      { background: 'linear-gradient(145deg, #3C3C3C 0%, #282828 100%)' },
  otros:     { background: 'linear-gradient(145deg, #8A8A8A 0%, #6A6A6A 100%)' },
  /* access method cards — uniform dark neutral for icon legibility */
  'access-huella':  { background: 'linear-gradient(145deg, #3A3F4A 0%, #272C36 100%)' },
  'access-pin':     { background: 'linear-gradient(145deg, #3A3F4A 0%, #272C36 100%)' },
  'access-rfid':    { background: 'linear-gradient(145deg, #3A3F4A 0%, #272C36 100%)' },
  'access-app':     { background: 'linear-gradient(145deg, #3A3F4A 0%, #272C36 100%)' },
  'access-facial':  { background: 'linear-gradient(145deg, #3A3F4A 0%, #272C36 100%)' },
  'access-llave':   { background: 'linear-gradient(145deg, #3A3F4A 0%, #272C36 100%)' },
  /* lock type cards */
  'lock-manija':    { background: 'linear-gradient(145deg, #5B6880 0%, #44526A 100%)' },
  'lock-pushpull':  { background: 'linear-gradient(145deg, #3A4550 0%, #2A3540 100%)' },
  'lock-cerrojo':   { background: 'linear-gradient(145deg, #3C3C3C 0%, #282828 100%)' },
  'lock-candado':   { background: 'linear-gradient(145deg, #4A5060 0%, #353B4A 100%)' },
};

/* ─── Checkmark SVG data-uri (black on green dot) ─────────────────────────── */
const CHECKMARK_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' fill='none'%3E%3Cpath d='M1.5 4L3 5.5L6.5 2' stroke='%230A0A0A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

/* ─── Shared selected-state style (applied in-line via className workaround) ─ */
function selectedOverlay() {
  return {
    /* green dot */
    dot: {
      position: 'absolute', top: 12, right: 12,
      width: 16, height: 16,
      background: EZON,
      borderRadius: '50%',
      boxShadow: `0 0 0 4px ${SURFACE_CARD}`,
      zIndex: 2,
    },
    /* checkmark inside dot */
    check: {
      position: 'absolute', top: 16, right: 16,
      width: 8, height: 8,
      backgroundImage: CHECKMARK_SVG,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      zIndex: 3,
    },
  };
}

/* ─── Diagram dimensions by thickness id ─────────────────────────────────── */
const DIAGRAM_WIDTHS = { '2-3': 12, '3-5': 18, '5-7': 26, '7-10': 36 };

/* ══════════════════════════════════════════════════════════════════════════════
   VARIANT: visual — hero photo + badge + title + desc
   ══════════════════════════════════════════════════════════════════════════════ */
function VisualCard({ option, isSelected, onClick }) {
  const hasPhoto = typeof option.image === 'string';
  const texture = hasPhoto ? {} : (MATERIAL_TEXTURES[option.mood] || MATERIAL_TEXTURES.neutral);
  const { dot, check } = selectedOverlay();

  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      style={{
        border: isSelected
          ? `2px solid ${INK_PRIMARY}`
          : `1px solid ${LINE}`,
        boxShadow: isSelected
          ? `0 0 0 ${isSelected ? '2px' : '0'} ${INK_PRIMARY}, 0 8px 20px -6px rgba(0,0,0,0.12)`
          : 'none',
        borderRadius: RADIUS_LG,
        overflow: 'hidden',
        cursor: 'pointer',
        background: SURFACE_CARD,
        padding: 0,
        textAlign: 'left',
        transform: isSelected ? 'translateY(-2px)' : 'none',
        transition: 'border-color 200ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 200ms cubic-bezier(0.2,0.8,0.2,1), transform 200ms cubic-bezier(0.2,0.8,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Selected indicators */}
      {isSelected && <div style={dot} />}
      {isSelected && <div style={check} />}

      {/* Hero visual */}
      <div style={{
        height: 124,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: `${RADIUS_LG} ${RADIUS_LG} 0 0`,
        background: hasPhoto ? '#F5F5F5' : undefined,
        ...texture,
      }}>
        {hasPhoto ? (
          option.imageOpen ? (
            <>
              <img
                src={option.image}
                alt=""
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  transition: 'opacity 0.35s ease',
                  opacity: isSelected ? 0 : 1,
                }}
              />
              <img
                src={option.imageOpen}
                alt=""
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  transition: 'opacity 0.35s ease',
                  opacity: isSelected ? 1 : 0,
                }}
              />
            </>
          ) : (
            <img
              src={option.image}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
              }}
            />
          )
        ) : (
          <>
            {/* Unknown mood: show "?" circle hero instead of material texture content */}
            {option.mood === 'unknown' && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 38, height: 38,
                  borderRadius: '50%',
                  border: `1.5px solid ${INK_SECONDARY}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: INK_SECONDARY,
                }}>
                  ?
                </div>
              </div>
            )}
            {/* SVG image overlay (for door-type cards) */}
            {option.image && option.mood !== 'unknown' && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {option.image}
              </div>
            )}
          </>
        )}
        {/* Inset shadow for depth */}
        <div style={{
          position: 'absolute', inset: 0,
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.06)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Text body */}
      <div style={{ padding: '14px 14px 16px', flex: 1 }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '-0.015em',
          color: INK_PRIMARY,
          lineHeight: 1.1,
          marginBottom: 4,
        }}>
          {option.title}
        </div>
        <div style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.4,
          color: INK_SECONDARY,
        }}>
          {option.subtitle}
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   VARIANT: diagram — CSS door-edge at scale + numeric value + desc
   ══════════════════════════════════════════════════════════════════════════════ */
function DiagramCard({ option, isSelected, onClick }) {
  const { dot, check } = selectedOverlay();
  const doorWidth = DIAGRAM_WIDTHS[option.id] || 20;

  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      style={{
        border: isSelected
          ? `2px solid ${INK_PRIMARY}`
          : `1px solid ${LINE}`,
        boxShadow: isSelected
          ? `0 0 0 2px ${INK_PRIMARY}, 0 4px 16px -4px rgba(0,0,0,0.08)`
          : 'none',
        borderRadius: RADIUS_LG,
        overflow: 'hidden',
        cursor: 'pointer',
        background: SURFACE_CARD,
        padding: '16px 14px 14px',
        textAlign: 'left',
        transition: 'border-color 200ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 200ms cubic-bezier(0.2,0.8,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: 156,
      }}
    >
      {isSelected && <div style={dot} />}
      {isSelected && <div style={check} />}

      {/* Diagram zone — or ? hero for unknown */}
      {option.id === 'unknown' ? (
        <div style={{
          height: 56,
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <div style={{
            width: 38, height: 38,
            borderRadius: '50%',
            border: `1.5px solid ${INK_SECONDARY}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: INK_SECONDARY,
          }}>
            ?
          </div>
        </div>
      ) : (
        <div style={{
          height: 56,
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: 28, /* room for measure-line below */
          position: 'relative',
        }}>
          {/* Door section block */}
          <div style={{
            background: INK_PRIMARY,
            height: 56,
            width: doorWidth,
            borderRadius: 1,
            position: 'relative',
            backgroundImage: `repeating-linear-gradient(
              135deg,
              transparent 0, transparent 3px,
              rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)`,
          }} />
          {/* Measure line */}
          <div style={{
            position: 'absolute',
            bottom: -18,
            left: 0,
            height: 1,
            width: doorWidth,
            background: INK_PRIMARY,
          }}>
            {/* Left tick */}
            <div style={{
              position: 'absolute', left: 0, top: -2,
              width: 1, height: 5, background: INK_PRIMARY,
            }} />
            {/* Right tick */}
            <div style={{
              position: 'absolute', right: 0, top: -2,
              width: 1, height: 5, background: INK_PRIMARY,
            }} />
          </div>
        </div>
      )}

      {/* Value + desc */}
      <div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '-0.03em',
          color: INK_PRIMARY,
          lineHeight: 1,
          marginBottom: 4,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {option.label}
          {option.unit && (
            <span style={{
              fontSize: 11,
              color: INK_TERTIARY,
              fontWeight: 500,
              marginLeft: 3,
              letterSpacing: 0,
            }}>{option.unit}</span>
          )}
        </div>
        <div style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.4,
          color: INK_SECONDARY,
        }}>
          {option.hint || option.subtitle}
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   VARIANT: unknown — "No lo sé" escape card
   ══════════════════════════════════════════════════════════════════════════════ */
function UnknownCard({ title = 'No lo sé', subtitle = 'Te conectamos con un asesor', onSelect }) {
  return (
    <button
      onClick={onSelect}
      style={{
        border: `1px dashed ${INK_QUATERNARY}`,
        borderRadius: RADIUS_LG,
        overflow: 'hidden',
        cursor: 'pointer',
        background: SURFACE_DEEP,
        padding: 0,
        textAlign: 'left',
        transition: 'border-color 180ms ease, opacity 180ms ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Question mark zone */}
      <div style={{
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: '50%',
          border: `1.5px solid ${INK_SECONDARY}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: INK_SECONDARY,
        }}>
          ?
        </div>
      </div>

      {/* Text body */}
      <div style={{ padding: '0 14px 16px' }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '-0.01em',
          color: INK_PRIMARY,
          lineHeight: 1.1,
          marginBottom: 4,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.4,
          color: INK_SECONDARY,
        }}>
          {subtitle}
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   OptionCard — public single-card export (for per-card render control)
   ══════════════════════════════════════════════════════════════════════════════ */
export function OptionCard({ option, isSelected, onClick, variant = 'visual' }) {
  if (option.id === 'unknown') {
    return (
      <UnknownCard
        title={option.label || option.title || 'No lo sé'}
        subtitle={option.hint || option.subtitle}
        onSelect={onClick}
      />
    );
  }
  if (variant === 'diagram') {
    return <DiagramCard option={option} isSelected={isSelected} onClick={onClick} />;
  }
  if (variant === 'unknown') {
    return (
      <UnknownCard
        title={option.title}
        subtitle={option.subtitle}
        onSelect={onClick}
      />
    );
  }
  return <VisualCard option={option} isSelected={isSelected} onClick={onClick} />;
}

/* ══════════════════════════════════════════════════════════════════════════════
   OptionCardGrid — renders a 2-column grid of OptionCards + optional unknown
   ══════════════════════════════════════════════════════════════════════════════ */
export function OptionCardGrid({
  options,
  value,
  onChange,
  multiple = false,
  unknownOption,
  variant = 'visual',
  gap = 8,
}) {
  const isSelected = (id) => multiple
    ? Array.isArray(value) && value.includes(id)
    : value === id;

  const handleChange = (id) => {
    if (!multiple) {
      onChange(id);
      return;
    }
    const current = Array.isArray(value) ? value : [];
    if (current.includes(id)) {
      onChange(current.filter(v => v !== id));
    } else {
      onChange([...current, id]);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap,
    }}>
      {options.map(opt => (
        <OptionCard
          key={opt.id}
          option={opt}
          isSelected={isSelected(opt.id)}
          onClick={() => handleChange(opt.id)}
          variant={variant}
        />
      ))}
      {unknownOption && (
        <UnknownCard
          title={unknownOption.title}
          subtitle={unknownOption.subtitle}
          onSelect={unknownOption.onSelect}
        />
      )}
    </div>
  );
}
