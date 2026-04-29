/**
 * MeasurementInstrument — EZON Design Language
 *
 * The premium "instrument panel" for the Thickness screen.
 * Helps users measure door-edge thickness using a Mexican banknote.
 *
 * Denominations (real Mexican bill widths):
 *   $20  → 12.0 cm  (shorter side: 6.6 cm)
 *   $50  → 12.7 cm
 *   $100 → 13.4 cm
 *
 * Faithfully ported from public/ezon_finder_screen03_v2.html.
 */

import { useState } from 'react';
import {
  INK_PRIMARY, INK_SECONDARY, INK_TERTIARY, INK_QUATERNARY,
  LINE, SURFACE, EZON, EZON_SHADOW, RADIUS_XL, RADIUS_MD, RADIUS_SM,
} from '../design-tokens/tokens';

const DENOMS = [
  { value: '20',  label: '$20',  width: '12.0 cm' },
  { value: '50',  label: '$50',  width: '12.7 cm' },
  { value: '100', label: '$100', width: '13.4 cm' },
];

const BILL_GRADIENTS = {
  '20':  'linear-gradient(135deg, #6B8C5C 0%, #577246 50%, #435C36 100%)',
  '50':  'linear-gradient(135deg, #C77D5C 0%, #B26A4D 50%, #9D5A3F 100%)',
  '100': 'linear-gradient(135deg, #B45A52 0%, #9C4A45 50%, #813B38 100%)',
};

export function MeasurementInstrument() {
  const [denom, setDenom] = useState('100');
  const billWidth = DENOMS.find(d => d.value === denom)?.width ?? '13.4 cm';

  /* ── Shared tech-label text style ── */
  const techLabel = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: INK_QUATERNARY,
  };

  return (
    <div style={{
      background: INK_PRIMARY,
      color: SURFACE,
      borderRadius: RADIUS_XL,
      padding: 22,
      margin: '0 -8px 12px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background layers */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(circle at 20% 0%, rgba(126,219,138,0.06), transparent 60%),
          repeating-linear-gradient(0deg, transparent 0, transparent 23px, rgba(255,255,255,0.02) 23px, rgba(255,255,255,0.02) 24px)
        `,
        pointerEvents: 'none',
      }} />

      {/* ── Instrument header ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 22,
        position: 'relative',
      }}>
        <div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.15,
            color: SURFACE,
            marginBottom: 6,
            letterSpacing: '-0.015em',
          }}>
            Mide con un billete
          </div>
          <div style={{ ...techLabel, color: 'rgba(250,250,248,0.6)' }}>
            Sin regla · Resultado aproximado
          </div>
        </div>
        {/* LED indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[true, true, false].map((on, i) => (
              <div key={i} style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: on ? EZON : 'rgba(255,255,255,0.15)',
                boxShadow: on ? `0 0 6px ${EZON_SHADOW}` : 'none',
              }} />
            ))}
          </div>
          <div style={{ ...techLabel, fontSize: 8, letterSpacing: '0.16em' }}>READY</div>
        </div>
      </div>

      {/* ── Step 01 — Pick denomination ── */}
      <InstrStep num="01" label="Escoge el billete que tengas">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {DENOMS.map(d => {
            const active = d.value === denom;
            return (
              <button
                key={d.value}
                onClick={() => setDenom(d.value)}
                style={{
                  background: active ? 'rgba(126,219,138,0.08)' : 'rgba(255,255,255,0.04)',
                  border: active
                    ? `1px solid ${EZON}`
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: active ? `inset 0 0 0 1px ${EZON}` : 'none',
                  borderRadius: RADIUS_MD,
                  padding: '12px 8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 180ms ease',
                }}
              >
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: SURFACE,
                  lineHeight: 1,
                  marginBottom: 4,
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {d.label}
                </div>
                <div style={{
                  ...techLabel,
                  fontSize: 8,
                  color: active ? EZON : INK_QUATERNARY,
                }}>
                  MXN
                </div>
              </button>
            );
          })}
        </div>
      </InstrStep>

      {/* ── Step 02 — Bill diagram ── */}
      <InstrStep num="02" label="Estas son sus dimensiones">
        <div style={{
          margin: '18px 0 6px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          padding: '32px 16px 28px',
        }}>
          {/* Top measurement annotation */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 220,
            height: 14,
            pointerEvents: 'none',
          }}>
            {/* Left line */}
            <div style={{
              position: 'absolute', top: 7, left: 0,
              width: 100, height: 1, background: EZON,
            }} />
            {/* Right line */}
            <div style={{
              position: 'absolute', top: 7, right: 0,
              width: 100, height: 1, background: EZON,
            }} />
            {/* Left tick */}
            <div style={{
              position: 'absolute', top: 4, left: 0,
              width: 1, height: 7, background: EZON,
            }} />
            {/* Right tick */}
            <div style={{
              position: 'absolute', top: 4, right: 0,
              width: 1, height: 7, background: EZON,
            }} />
            {/* Width label */}
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10, fontWeight: 700,
              color: EZON,
              letterSpacing: '0.04em',
              background: INK_PRIMARY,
              padding: '0 6px',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
            }}>
              {billWidth}
            </div>
          </div>

          {/* Bill illustration */}
          <div style={{
            width: 220, height: 92,
            borderRadius: 4,
            position: 'relative',
            background: BILL_GRADIENTS[denom] || BILL_GRADIENTS['100'],
            boxShadow: `
              inset 0 0 0 1px rgba(0,0,0,0.2),
              inset 0 0 0 4px rgba(255,255,255,0.08),
              0 8px 24px -8px rgba(0,0,0,0.6),
              0 2px 6px -2px rgba(0,0,0,0.4)
            `,
            transition: 'background 400ms ease',
          }}>
            {/* Inner border */}
            <div style={{
              position: 'absolute', inset: 8,
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 2,
              pointerEvents: 'none',
            }} />
            {/* Bill number */}
            <div style={{
              position: 'absolute', top: 12, left: 14,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 18, fontWeight: 800,
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '-0.03em',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {denom}
            </div>
            {/* Center band */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%', height: 24,
              background: 'rgba(255,255,255,0.06)',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                BANXICO
              </span>
            </div>
            {/* Bill number mirror */}
            <div style={{
              position: 'absolute', bottom: 12, right: 14,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 18, fontWeight: 800,
              color: 'rgba(255,255,255,0.92)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {denom}
            </div>
          </div>

          {/* Side measurement annotation (6.6 cm height) */}
          <div style={{
            position: 'absolute',
            right: 'calc(50% - 110px - 36px)',
            top: '50%',
            transform: 'translateY(-50%)',
            height: 92,
            width: 14,
            pointerEvents: 'none',
          }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: 7, top: 0, bottom: 0,
              width: 1, background: EZON,
            }} />
            {/* Top tick */}
            <div style={{
              position: 'absolute',
              top: 0, left: 4,
              height: 1, width: 7, background: EZON,
            }} />
            {/* Bottom tick */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 4,
              height: 1, width: 7, background: EZON,
            }} />
            {/* Height label */}
            <div style={{
              position: 'absolute',
              top: '50%', left: 16,
              transform: 'translateY(-50%)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 10, fontWeight: 700,
              color: EZON,
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
            }}>
              6.6 cm
            </div>
          </div>
        </div>
      </InstrStep>

      {/* ── Step 03 — Apply against door ── */}
      <InstrStep num="03" label="Apóyalo contra el canto" last>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          padding: '18px 0 10px',
        }}>
          {/* Door edge */}
          <div style={{
            width: 26, height: 100,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.12) 100%)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 2,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              bottom: -18, left: '50%',
              transform: 'translateX(-50%)',
              ...techLabel, fontSize: 8, letterSpacing: '0.16em',
            }}>
              CANTO
            </div>
          </div>

          {/* Arrow */}
          <div style={{ color: EZON, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ ...techLabel, fontSize: 8, color: EZON, letterSpacing: '0.16em' }}>APOYAR</div>
          </div>

          {/* Mini bill */}
          <div style={{
            width: 90, height: 38,
            background: BILL_GRADIENTS[denom] || BILL_GRADIENTS['100'],
            borderRadius: 2,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
            position: 'relative',
            transition: 'background 400ms ease',
          }}>
            <div style={{
              position: 'absolute',
              top: -16, left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 9, fontWeight: 700,
              color: EZON,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}>
              6.6 cm
            </div>
          </div>
        </div>

        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 12,
          lineHeight: 1.5,
          color: INK_QUATERNARY,
          textAlign: 'center',
          marginTop: 8,
        }}>
          Compara el canto con el{' '}
          <strong style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            color: SURFACE,
            fontVariantNumeric: 'tabular-nums',
          }}>
            lado corto del billete (6.6 cm)
          </strong>
          {' '}y elige arriba el rango que más se parezca.
        </p>
      </InstrStep>
    </div>
  );
}

/* ── Internal sub-component for instrument steps ── */
function InstrStep({ num, label, children, last = false }) {
  const techLabel = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#BCBCBC',
  };

  return (
    <div style={{
      paddingTop: 18,
      paddingBottom: last ? 4 : 18,
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
        ...techLabel,
      }}>
        <span style={{
          background: 'rgba(255,255,255,0.08)',
          color: '#F4F3EF',
          padding: '3px 6px',
          borderRadius: 2,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.08em',
        }}>
          {num}
        </span>
        {label}
      </div>
      {children}
    </div>
  );
}
