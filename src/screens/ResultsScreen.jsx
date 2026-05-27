import {
  Screen, AppHeader, WhatsAppLink, ProductCard,
  INK_PRIMARY, INK_SECONDARY, INK_TERTIARY,
  LINE, SURFACE, SURFACE_CARD,
  EZON,
} from '../components';
import { matchProducts } from '../data/matcher';

function ResultSectionLabel({ variant, children }) {
  const isIdeal = variant === 'ideal';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '24px 20px 10px',
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 11, fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: isIdeal ? INK_PRIMARY : INK_SECONDARY,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isIdeal ? EZON : '#BCBCBC',
        boxShadow: isIdeal ? `0 0 8px ${EZON}` : 'none',
        flexShrink: 0,
      }}/>
      {children}
    </div>
  );
}

function EmptyState({ onRestart }) {
  return (
    <div style={{ padding: '24px 20px' }}>
      <div style={{
        background: SURFACE_CARD,
        border: `1px solid ${LINE}`,
        borderRadius: 20,
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900, fontSize: 20,
          color: INK_PRIMARY, marginBottom: 12,
          lineHeight: 1.15,
        }}>
          No encontramos una cerradura compatible
        </p>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 14, color: INK_SECONDARY,
          lineHeight: 1.6, marginBottom: 28,
        }}>
          Es posible que tu puerta tenga características especiales. Un asesor EZON puede ayudarte a encontrar la solución correcta en minutos.
        </p>
        <WhatsAppLink text="Hablar con un asesor" style={{
          background: EZON, color: INK_PRIMARY,
          border: 'none', borderRadius: 999,
          padding: '13px 24px',
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 700, fontSize: 13.5,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          boxShadow: '0 4px 12px -4px rgba(126,219,138,0.5)',
        }}/>
        <button onClick={onRestart} style={{
          display: 'block', margin: '20px auto 0',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 13, color: INK_SECONDARY,
          textDecoration: 'underline',
        }}>
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}

export function ResultsScreen({ answers, onRestart, dir }) {
  const { products, isFallback } = matchProducts(answers);
  const count = products.length;

  return (
    <Screen dir={dir} style={{ background: SURFACE }}>
      <AppHeader showBack={false} onReset={onRestart}/>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Intro */}
        <div style={{ padding: '24px 20px 16px' }}>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: INK_TERTIARY, marginBottom: 8,
          }}>
            Resultados
          </p>
          <h1 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900, fontSize: 28,
            lineHeight: 1.05, letterSpacing: '-0.025em',
            color: INK_PRIMARY, marginBottom: 10,
          }}>
            Tus cerraduras compatibles
          </h1>
          {count > 0 && (
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 13.5, fontWeight: 400,
              lineHeight: 1.5, color: INK_SECONDARY,
            }}>
              {isFallback
                ? 'No encontramos una coincidencia exacta, pero te mostramos opciones que pueden funcionar.'
                : <>Basado en tus respuestas, encontramos{' '}
                    <strong style={{ color: INK_PRIMARY, fontWeight: 600 }}>
                      {count === 1 ? '1 cerradura compatible' : `${count} cerraduras compatibles`}
                    </strong>{' '}
                    con tu instalación específica.</>
              }
            </p>
          )}
        </div>

        {count === 0 ? (
          <EmptyState onRestart={onRestart}/>
        ) : isFallback ? (
          <>
            <ResultSectionLabel variant="alt">Puede que te funcione</ResultSectionLabel>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 13, color: INK_SECONDARY,
              lineHeight: 1.6,
              padding: '0 20px 12px',
            }}>
              No encontramos cerraduras que cumplan con todas tus necesidades, pero estos candados inteligentes pueden ser una buena alternativa para tu caso.
            </p>
            {products.map(p => (
              <ProductCard key={p.urlShopify || p.name} product={p}/>
            ))}

            {/* Footer help */}
            <div style={{
              padding: '24px 20px 32px',
              borderTop: `1px solid ${LINE}`,
              marginTop: 8,
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 13, color: INK_SECONDARY,
                marginBottom: 10,
              }}>
                ¿No estás seguro cuál elegir?
              </p>
              <WhatsAppLink text="Hablar con un ejecutivo"/>
            </div>
          </>
        ) : (
          <>
            <ResultSectionLabel variant="ideal">
              Recomendación ideal
            </ResultSectionLabel>
            <ProductCard product={products[0]}/>

            {products.length > 1 && (
              <>
                <ResultSectionLabel variant="alt">
                  {products.length === 2 ? 'Alternativa' : 'Alternativas'}
                </ResultSectionLabel>
                {products.slice(1).map((p) => (
                  <ProductCard key={p.urlShopify || p.name} product={p}/>
                ))}
              </>
            )}

            {/* Footer help */}
            <div style={{
              padding: '24px 20px 32px',
              borderTop: `1px solid ${LINE}`,
              marginTop: 8,
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 13, color: INK_SECONDARY,
                marginBottom: 10,
              }}>
                ¿No estás seguro cuál elegir?
              </p>
              <WhatsAppLink text="Hablar con un ejecutivo"/>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}
