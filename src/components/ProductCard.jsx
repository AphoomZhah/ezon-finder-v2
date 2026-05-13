import { useState } from 'react';
import {
  INK_PRIMARY, INK_SECONDARY, INK_QUATERNARY,
  LINE, SURFACE_CARD, SURFACE_DEEP,
  EZON, VERDE_DEEP,
} from '../design-tokens/tokens';
import { ACCESS_ICONS, ICON_DISPLAY_ORDER } from '../data/accessIcons';

function formatMXN(n) {
  if (n == null) return null;
  return '$ ' + Number(n).toLocaleString('es-MX');
}

function PlaceholderMedia() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 10px,
        ${SURFACE_DEEP} 10px, ${SURFACE_DEEP} 20px
      )`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.10))' }}>
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="rgba(255,255,255,0.95)" strokeWidth="1.6" />
        <path d="M8 11 L8 7 C8 4.79 9.79 3 12 3 C14.21 3 16 4.79 16 7 L16 11"
          stroke="rgba(255,255,255,0.95)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="rgba(255,255,255,0.95)" />
      </svg>
    </div>
  );
}

function AccessIconRow({ product }) {
  const icons = ICON_DISPLAY_ORDER
    .filter((key) => product.accessIcons?.includes(key))
    .slice(0, 4)
    .map((key) => ({ key, ...ACCESS_ICONS[key] }));

  if (icons.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: 'flex', flexDirection: 'row',
        gap: 16, flexWrap: 'nowrap',
        overflowX: 'auto', paddingBottom: 2,
      }}>
        {icons.map(({ key, label, url }) => (
          <div key={key} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: '#F0F0F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img src={url} alt={label}
                style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </div>
            <span style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 11, fontWeight: 400,
              color: INK_SECONDARY, textAlign: 'center',
              maxWidth: 64, lineHeight: 1.3,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductCard({ product }) {
  const [cardHovered, setCardHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const hasDiscount = product.priceFull > product.priceDiscount;
  const priceFormatted = formatMXN(product.priceDiscount);
  const originalFormatted = hasDiscount ? formatMXN(product.priceFull) : null;

  const handleCTA = () => {
    const url = product.urlShopify;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://wa.me/525500000000', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: SURFACE_CARD,
        border: `1px solid ${cardHovered ? INK_QUATERNARY : LINE}`,
        borderRadius: 20,
        margin: '0 20px 16px',
        overflow: 'hidden',
        transform: cardHovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: cardHovered ? '0 8px 24px -12px rgba(0,0,0,0.12)' : 'none',
        transition: 'border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease',
      }}
    >
      {/* Media zone */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 220,
        backgroundColor: '#F5F5F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {product.urlImg
          ? <img src={product.urlImg} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          : <PlaceholderMedia />
        }
        {/* Brand badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: '#FFFFFF',
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 10, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '5px 10px', borderRadius: 999,
        }}>
          {product.brand}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 18px 18px' }}>
        {/* Name */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900, fontSize: 19,
          lineHeight: 1.15, letterSpacing: '-0.02em',
          color: INK_PRIMARY, marginBottom: 4,
        }}>
          {product.name}
        </p>

        {/* Subtitle */}
        {product.sub && (
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 12.5, fontWeight: 400,
            color: INK_SECONDARY, marginBottom: 14,
          }}>
            {product.sub}
          </p>
        )}

        {/* Price block */}
        <div style={{
          display: 'flex', alignItems: 'baseline',
          gap: 10, marginBottom: 14,
        }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900, fontSize: 24,
            lineHeight: 1, letterSpacing: '-0.02em',
            color: hasDiscount ? VERDE_DEEP : INK_PRIMARY,
          }}>
            {priceFormatted}
          </span>
          {originalFormatted && (
            <span style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              color: INK_QUATERNARY, textDecoration: 'line-through',
            }}>
              {originalFormatted}
            </span>
          )}
        </div>

        {/* Access icons */}
        <AccessIconRow product={product} />

        {/* CTA */}
        <button
          onClick={handleCTA}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            width: '100%', height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10,
            background: ctaHovered ? VERDE_DEEP : EZON,
            color: INK_PRIMARY,
            border: 'none', borderRadius: 999,
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 13.5, fontWeight: 700,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 4px 12px -4px rgba(126,219,138,0.5)',
            transform: ctaHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition: 'background 160ms ease, transform 160ms ease',
          }}
        >
          Ver en tienda
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ transform: ctaHovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 160ms ease' }}>
            <path d="M3 8 L13 8 M9 4 L13 8 L9 12"
              stroke={INK_PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
