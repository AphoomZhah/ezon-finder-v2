import { useState } from 'react';
import { Screen, LockProductPlaceholder, WhatsAppCTA, VERDE, BORDER_REST, BG_WHITE, BG_APP, TEXT_PRIMARY, TEXT_SECONDARY } from '../components';
import { matchProducts } from '../data/matcher';

function formatPrice(n) {
  return '$' + n.toLocaleString('es-MX') + ' MXN';
}

function ProductImage({ urlImg, name, size = 110 }) {
  const [failed, setFailed] = useState(false);
  if (!urlImg || failed) {
    return <LockProductPlaceholder mood="product1" size={size}/>;
  }
  return (
    <img
      src={urlImg}
      alt={name}
      onError={() => setFailed(true)}
      style={{ width: size, height: size, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
    />
  );
}

function ScoreBadge({ score, large }) {
  const highlight = score >= 90;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: highlight ? '#F2FDF3' : '#F5F5F5',
      border: `1.5px solid ${highlight ? VERDE : BORDER_REST}`,
      borderRadius: 20, padding: large ? '5px 14px' : '3px 10px',
    }}>
      <div style={{ width: large ? 8 : 6, height: large ? 8 : 6, borderRadius: '50%', background: highlight ? VERDE : '#C4C4C4' }}/>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: large ? 13 : 11, color: TEXT_PRIMARY }}>
        {score}% MATCH
      </span>
    </div>
  );
}

function ProductCard({ product, label, isIdeal }) {
  const size = isIdeal ? 110 : 90;
  const borderStyle = isIdeal
    ? { border: `2px solid ${VERDE}` }
    : { border: `1.5px solid ${BORDER_REST}` };

  const openShopify = () => {
    if (product.urlShopify) window.open(product.urlShopify, '_blank');
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: isIdeal ? VERDE : BORDER_REST }}/>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 10.5, color: isIdeal ? VERDE : TEXT_SECONDARY, letterSpacing: '0.1em' }}>{label}</span>
      </div>
      <div style={{ background: BG_WHITE, borderRadius: 12, overflow: 'hidden', ...borderStyle }}>
        <div style={{ display: 'flex', gap: 0 }}>
          <div style={{ padding: isIdeal ? '14px 0 14px 14px' : '12px 0 12px 12px' }}>
            <ProductImage urlImg={product.urlImg} name={product.name} size={size}/>
          </div>
          <div style={{ padding: isIdeal ? '14px 14px 14px 12px' : '12px 12px 12px 10px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ flex: 1, paddingRight: 8 }}>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10.5, fontWeight: 600, color: TEXT_SECONDARY, marginBottom: 2 }}>{product.brand}</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: isIdeal ? 14 : 13, color: TEXT_PRIMARY, lineHeight: 1.2 }}>{product.name}</p>
              </div>
              <ScoreBadge score={product.score} large={isIdeal}/>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: isIdeal ? 18 : 15, color: TEXT_PRIMARY, margin: '6px 0' }}>
              {formatPrice(product.priceDiscount)}
            </p>
            {product.priceFull > product.priceDiscount && (
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, textDecoration: 'line-through', marginBottom: 4 }}>
                {formatPrice(product.priceFull)}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, padding: isIdeal ? '12px 14px 14px' : '0 12px 12px' }}>
          <button onClick={openShopify} style={{
            flex: 1, padding: isIdeal ? '13px' : '11px',
            background: VERDE, border: 'none', borderRadius: 8,
            fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
            fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer', letterSpacing: '0.07em',
          }}>COMPRAR</button>
          <button onClick={openShopify} style={{
            flex: 1, padding: isIdeal ? '13px' : '11px',
            background: 'none', border: `1.5px solid ${BORDER_REST}`, borderRadius: 8,
            fontFamily: "'Open Sans', sans-serif", fontWeight: 600,
            fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer',
          }}>Ver detalle</button>
        </div>
      </div>
    </div>
  );
}

const CARD_LABELS = ['RECOMENDACIÓN IDEAL', 'ALTERNATIVA', 'OPCIÓN DE ENTRADA'];

export function ResultsScreen({ answers, onRestart, dir }) {
  const products = matchProducts(answers);

  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '24px 20px 0', background: BG_WHITE, borderBottom: `1px solid ${BORDER_REST}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
              EZON Smart Lock Finder
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 22, color: TEXT_PRIMARY, lineHeight: 1.15 }}>
              {products.length > 0 ? 'Tus cerraduras compatibles' : 'Sin resultados'}
            </h2>
          </div>
          <button onClick={onRestart} style={{
            background: 'none', border: `1.5px solid ${BORDER_REST}`, borderRadius: 8,
            padding: '8px 12px', cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, fontWeight: 600, color: TEXT_SECONDARY,
          }}>
            Reiniciar
          </button>
        </div>
        {products.length > 0 && (
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY, paddingBottom: 16 }}>
            Basado en tus respuestas, {products.length === 1 ? 'esta cerradura es compatible' : `estas ${products.length} cerraduras son compatibles`} con tu puerta específica.
          </p>
        )}
      </div>

      <div style={{ padding: '16px 20px' }}>
        {products.length === 0 ? (
          <div style={{ background: BG_WHITE, borderRadius: 12, border: `1px solid ${BORDER_REST}`, padding: '28px 20px', textAlign: 'center', marginBottom: 12 }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12 }}>
              No encontramos una coincidencia exacta
            </p>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: 24 }}>
              Es posible que tu puerta tenga características especiales. Un asesor EZON puede ayudarte a encontrar la solución correcta en minutos.
            </p>
            <WhatsAppCTA context="resultados"/>
            <button onClick={onRestart} style={{
              display: 'block', margin: '16px auto 0',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Open Sans', sans-serif", fontSize: 13,
              color: TEXT_SECONDARY, textDecoration: 'underline',
            }}>
              Intentar de nuevo
            </button>
          </div>
        ) : (
          products.slice(0, 3).map((product, i) => (
            <ProductCard
              key={product.urlShopify || i}
              product={product}
              label={CARD_LABELS[i] || `OPCIÓN ${i + 1}`}
              isIdeal={i === 0}
            />
          ))
        )}

        <WhatsAppCTA context="resultados" style={{ marginBottom: 32 }}/>
      </div>
    </Screen>
  );
}
