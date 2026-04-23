import { Screen, BackButton, ProgressBar, PhotoPlaceholder, AlertBox, WhatsAppLink, PrimaryButton, VERDE, BORDER_REST, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const LOCATIONS = [
  { id: 'interior',           label: 'Interior',               hint: 'Recámara, oficina, cuarto de servicio', mood: 'interior' },
  { id: 'exterior_cubierto',  label: 'Exterior con techo',     hint: 'Marquesina, zaguán o entrada cubierta',  mood: 'exterior_cubierto' },
  { id: 'exterior_abierto',   label: 'Exterior sin techo',     hint: 'Expuesta directamente al sol y lluvia',  mood: 'exterior_abierto' },
];

export function LocationScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.location;
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={3}/>
        <h2 style={headingStyle}>¿Dónde está ubicada tu puerta?</h2>
        <p style={subStyle}>La exposición al sol afecta la vida útil de la pantalla táctil.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {LOCATIONS.map(loc => (
          <div key={loc.id} style={{ marginBottom: 12 }}>
            <button onClick={() => setAnswers(a => ({ ...a, location: loc.id }))}
              style={{
                width: '100%', border: `2px solid ${sel === loc.id ? VERDE : BORDER_REST}`,
                borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                background: sel === loc.id ? '#F2FDF3' : BG_WHITE,
                padding: 0, textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
                display: 'flex', position: 'relative',
              }}>
              {sel === loc.id && (
                <div style={{
                  position: 'absolute', top: 10, right: 10, zIndex: 2,
                  width: 20, height: 20, borderRadius: '50%', background: VERDE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                </div>
              )}
              <PhotoPlaceholder mood={loc.mood} label={`foto · ${loc.label.toLowerCase()}`}
                style={{ width: 110, height: 88, flexShrink: 0 }}/>
              <div style={{ padding: '14px 14px 14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: TEXT_PRIMARY, marginBottom: 4 }}>{loc.label}</p>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{loc.hint}</p>
              </div>
            </button>
            {sel === 'exterior_abierto' && loc.id === 'exterior_abierto' && (
              <AlertBox>
                <strong style={{ display: 'block', marginBottom: 5 }}>Atención: exposición solar directa</strong>
                La pantalla táctil de la mayoría de cerraduras inteligentes se daña en 6–12 meses bajo el sol directo. Te recomendamos hablar con un asesor para encontrar la opción más duradera para tu caso.
                <div style={{ marginTop: 12 }}>
                  <WhatsAppLink text="Hablar con un asesor" style={{ borderColor: '#F6D860', background: 'transparent', padding: '10px 16px', fontSize: 13 }}/>
                </div>
              </AlertBox>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>
      </div>
    </Screen>
  );
}
