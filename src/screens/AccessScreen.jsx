import { Screen, BackButton, ProgressBar, AccessIcon, PrimaryButton, VERDE, BORDER_REST, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const ACCESS_METHODS = [
  { id: 'huella',  label: 'Huella digital' },
  { id: 'pin',     label: 'Código PIN' },
  { id: 'rfid',    label: 'Tarjeta RFID' },
  { id: 'app',     label: 'App móvil' },
  { id: 'facial',  label: 'Reconocimiento facial' },
  { id: 'llave',   label: 'Llave mecánica' },
];

export function AccessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.accessMethods || [];
  const toggle = (id) => setAnswers(a => {
    const cur = a.accessMethods || [];
    return { ...a, accessMethods: cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id] };
  });
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={5}/>
        <h2 style={headingStyle}>¿Cómo quieres abrir tu cerradura?</h2>
        <p style={subStyle}>Puedes elegir varios. Lo que selecciones define los métodos disponibles día a día.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {ACCESS_METHODS.map(m => {
            const active = sel.includes(m.id);
            return (
              <button key={m.id} onClick={() => toggle(m.id)} style={{
                border: `2px solid ${active ? VERDE : BORDER_REST}`,
                borderRadius: 10, padding: '16px 8px 14px',
                background: active ? '#F2FDF3' : BG_WHITE,
                cursor: 'pointer', textAlign: 'center',
                transition: 'border-color 0.15s, background 0.15s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                position: 'relative',
              }}>
                {active && (
                  <div style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 16, height: 16, borderRadius: '50%', background: VERDE,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="9" height="9" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#111" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
                  </div>
                )}
                <div style={{ color: active ? '#2A6A30' : TEXT_SECONDARY }}>
                  <AccessIcon type={m.id} size={26}/>
                </div>
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 11.5, color: active ? TEXT_PRIMARY : TEXT_SECONDARY, lineHeight: 1.3, textAlign: 'center' }}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={sel.length === 0}>CONTINUAR</PrimaryButton>
      </div>
    </Screen>
  );
}
