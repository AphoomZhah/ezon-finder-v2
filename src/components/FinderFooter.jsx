/**
 * FinderFooter — EZON Design Language canonical transverse footer
 *
 * Layout (top row):  [■■■□□□]  03 / 06
 * Layout (btm row):  [←]  [  CONTINUAR →  ]
 *
 * Button states:
 *   disabled=true  → default: black bg, off-white text, shadow 0 2px 0 #000
 *   disabled=false → ready:   EZON green bg, black text, shadow 0 2px 0 #5BAF67
 *
 * Sticky-on-scroll:
 *   The Screen wrapper has height:100vh + overflow-y:auto.
 *   position: sticky; bottom: 0 handles this natively.
 *   An IntersectionObserver on the sentinel toggles a shadow when stuck.
 */

import { useEffect, useRef, useState } from 'react';
import {
  INK_PRIMARY, INK_SECONDARY, INK_TERTIARY, INK_QUATERNARY,
  LINE, SURFACE_RAISED, SURFACE_CARD, SURFACE_DEEP,
  EZON, EZON_INK, EZON_SHADOW, RADIUS_MD,
} from '../design-tokens/tokens';

const CHEVRON_LEFT = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12L6 8L10 4"/>
  </svg>
);

export function FinderFooter({ onBack, onNext, disabled = true, step = 1, totalSteps = 6, label }) {
  const sentinelRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  /* Observe when the sentinel (just above the footer) leaves the viewport */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Button state derivation */
  const isReady = !disabled;
  const btnLabel = label || 'CONTINUAR';

  const btnStyle = {
    flex: 1,
    height: 52,
    border: 'none',
    borderRadius: RADIUS_MD,
    cursor: isReady ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    transition: 'background 180ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 180ms cubic-bezier(0.2,0.8,0.2,1), transform 120ms ease',
    /* Default: black */
    ...(isReady ? {
      background: EZON,
      color: EZON_INK,
      boxShadow: `0 2px 0 #5BAF67, 0 6px 16px -4px ${EZON_SHADOW}`,
    } : {
      background: INK_PRIMARY,
      color: '#F4F3EF', /* --surface */
      boxShadow: '0 2px 0 #000, 0 6px 16px -4px rgba(0,0,0,0.2)',
    }),
  };

  const handleContinue = () => {
    if (isReady && onNext) onNext();
  };

  /* Pad step number to 2 digits */
  const fmt = (n) => String(n).padStart(2, '0');

  return (
    <>
      {/* Sentinel — when this scrolls out of view the footer is "stuck" */}
      <div ref={sentinelRef} style={{ height: 1, flexShrink: 0 }} aria-hidden="true" />

      <div style={{
        position: 'sticky',
        bottom: 0,
        background: SURFACE_RAISED,
        borderTop: `1px solid ${LINE}`,
        boxShadow: isStuck ? '0 -4px 16px -4px rgba(0,0,0,0.10)' : 'none',
        padding: '12px 16px 18px',
        zIndex: 10,
        transition: 'box-shadow 200ms ease',
        flexShrink: 0,
      }}>

        {/* ── Progress row ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 12,
        }}>
          {/* Segmented progress bar */}
          <div style={{
            flex: 1,
            display: 'flex',
            gap: 2,
            height: 4,
          }}>
            {Array.from({ length: totalSteps }).map((_, i) => {
              let bg;
              if (i < step - 1) bg = INK_PRIMARY;       /* done — black */
              else if (i === step - 1) bg = EZON;        /* active — green */
              else bg = LINE;                            /* pending — grey */
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

          {/* Step counter */}
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: '0.15em',
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
            color: INK_TERTIARY,
          }}>
            <span style={{ color: INK_PRIMARY }}>{fmt(step)}</span>
            {' / '}
            {fmt(totalSteps)}
          </span>
        </div>

        {/* ── Controls row ── */}
        <div style={{ display: 'flex', gap: 8 }}>

          {/* Back button — 52×52, white, grey border, chevron */}
          {onBack ? (
            <button
              onClick={onBack}
              aria-label="Volver"
              style={{
                width: 52,
                height: 52,
                flexShrink: 0,
                background: SURFACE_CARD,
                border: `1px solid ${LINE}`,
                borderRadius: RADIUS_MD,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: INK_PRIMARY,
                transition: 'background 150ms ease, border-color 150ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = SURFACE_DEEP;
                e.currentTarget.style.borderColor = INK_QUATERNARY;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = SURFACE_CARD;
                e.currentTarget.style.borderColor = LINE;
              }}
            >
              {CHEVRON_LEFT}
            </button>
          ) : null}

          {/* Continue button */}
          <button
            onClick={handleContinue}
            aria-label={btnLabel}
            style={btnStyle}
            onMouseEnter={e => {
              if (!isReady) return;
              e.currentTarget.style.background = '#6BC97A';
              e.currentTarget.style.boxShadow = `0 3px 0 #5BAF67, 0 10px 20px -4px ${EZON_SHADOW}`;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              if (!isReady) return;
              e.currentTarget.style.background = EZON;
              e.currentTarget.style.boxShadow = `0 2px 0 #5BAF67, 0 6px 16px -4px ${EZON_SHADOW}`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>{btnLabel}</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 14,
            }}>→</span>
          </button>
        </div>
      </div>
    </>
  );
}
