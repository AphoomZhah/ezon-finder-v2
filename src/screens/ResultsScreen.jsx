import { Screen, LockProductPlaceholder, WhatsAppLink, VERDE, BORDER_REST, BG_WHITE, BG_APP, TEXT_PRIMARY, TEXT_SECONDARY } from '../components';
import { PRODUCTS } from '../data/products';

function MatchBadge({ score, size = 'normal' }) {
  const big = size === 'big';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: score >= 95 ? '#F2FDF3' : '#F5F5F5',
      border: `1.5px solid ${score >= 95 ? VERDE : BORDER_REST}`,
      borderRadius: 20, padding: big ? '5px 14px' : '3px 10px',
    }}>
      <div style={{ width: big ? 8 : 6, height: big ? 8 : 6, borderRadius: '50%', background: score >= 95 ? VERDE : score >= 90 ? '#AAB8C2' : '#C4C4C4' }}/>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: big ? 13 : 11, color: TEXT_PRIMARY }}>
        {score}% MATCH
      </span>
    </div>
  );
}

export function ResultsScreen({ onRestart, dir }) {
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '24px 20px 0', background: BG_WHITE, borderBottom: `1px solid ${BORDER_REST}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 4 }}>
              EZON Smart Lock Finder
            </p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 22, color: TEXT_PRIMARY, lineHeight: 1.15 }}>
              Tus cerraduras compatibles
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
        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY, paddingBottom: 16 }}>
          Basado en tus respuestas, estas cerraduras son compatibles con tu puerta específica.
        </p>
      </div>

      <div style={{ padding: '16px 20px' }}>
        {/* IDEAL card */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: VERDE }}/>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 10.5, color: VERDE, letterSpacing: '0.1em' }}>RECOMENDACIÓN IDEAL</span>
          </div>
          <div style={{ background: BG_WHITE, borderRadius: 12, border: `2px solid ${VERDE}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 0 }}>
              <LockProductPlaceholder mood={PRODUCTS.ideal.mood} size={110}/>
              <div style={{ padding: '14px 14px 14px 16px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: TEXT_PRIMARY, lineHeight: 1.2 }}>{PRODUCTS.ideal.name}</p>
                    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, marginTop: 2 }}>{PRODUCTS.ideal.sub}</p>
                  </div>
                  <MatchBadge score={PRODUCTS.ideal.match} size="big"/>
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 8 }}>{PRODUCTS.ideal.price}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {PRODUCTS.ideal.features.map(f => (
                    <span key={f} style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10.5, fontWeight: 600, background: '#F2FDF3', color: '#2A6A30', border: `1px solid ${VERDE}`, borderRadius: 4, padding: '2px 7px' }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: '#FAFFFE', borderTop: `1px solid #E8F8EA`, padding: '12px 16px' }}>
              {PRODUCTS.ideal.reasons.map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginTop: 1, flexShrink: 0 }}><circle cx="7" cy="7" r="7" fill={VERDE}/><path d="M4 7l2 2 4-4" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '12px 14px 14px' }}>
              <button style={{ flex: 1, padding: '13px', background: VERDE, border: 'none', borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer', letterSpacing: '0.07em' }}>COMPRAR</button>
              <button style={{ flex: 1, padding: '13px', background: 'none', border: `1.5px solid ${BORDER_REST}`, borderRadius: 8, fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer' }}>Ver detalle</button>
            </div>
          </div>
        </div>

        {/* Alternative cards */}
        {[
          { key: 'premium', label: 'ALTERNATIVA PREMIUM' },
          { key: 'entry',   label: 'OPCIÓN DE ENTRADA' },
        ].map(({ key, label }) => {
          const p = PRODUCTS[key];
          return (
            <div key={key} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: BORDER_REST }}/>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 10.5, color: TEXT_SECONDARY, letterSpacing: '0.1em' }}>{label}</span>
              </div>
              <div style={{ background: BG_WHITE, borderRadius: 12, border: `1.5px solid ${BORDER_REST}` }}>
                <div style={{ display: 'flex', gap: 0 }}>
                  <LockProductPlaceholder mood={p.mood} size={90}/>
                  <div style={{ padding: '12px 12px 12px 14px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div>
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13, color: TEXT_PRIMARY }}>{p.name}</p>
                        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10.5, color: TEXT_SECONDARY, marginTop: 1 }}>{p.sub}</p>
                      </div>
                      <MatchBadge score={p.match}/>
                    </div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 7 }}>{p.price}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.features.map(f => (
                        <span key={f} style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10, fontWeight: 600, background: BG_APP, color: TEXT_SECONDARY, border: `1px solid ${BORDER_REST}`, borderRadius: 4, padding: '2px 6px' }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${BORDER_REST}`, padding: '10px 12px 12px' }}>
                  {p.reasons.map(r => (
                    <div key={r} style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'flex-start' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginTop: 1, flexShrink: 0 }}><circle cx="6" cy="6" r="6" fill={BORDER_REST}/><path d="M3 6l2 2 4-4" stroke="#666" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                      <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{r}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, padding: '0 12px 12px' }}>
                  <button style={{ flex: 1, padding: '11px', background: BG_APP, border: `1.5px solid ${BORDER_REST}`, borderRadius: 8, fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer' }}>Ver detalle</button>
                  <button style={{ flex: 1, padding: '11px', background: VERDE, border: 'none', borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer', letterSpacing: '0.07em' }}>COMPRAR</button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div style={{ background: BG_WHITE, borderRadius: 12, border: `1px solid ${BORDER_REST}`, padding: '20px 16px', textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY, marginBottom: 12, lineHeight: 1.5 }}>
            ¿Quieres validar tu elección con un experto antes de comprar?
          </p>
          <WhatsAppLink text="Hablar con un asesor EZON"/>
        </div>
      </div>
    </Screen>
  );
}
