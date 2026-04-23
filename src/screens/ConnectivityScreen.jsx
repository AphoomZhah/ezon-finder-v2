import { Screen, BackButton, ProgressBar, AccessIcon, PrimaryButton, VERDE, BORDER_REST, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const CONNECTIVITY = [
  { id: 'wifi',   label: 'WiFi y notificaciones remotas', desc: 'Recibe alertas en tu teléfono y controla desde cualquier lugar' },
  { id: 'camara', label: 'Videoportero / cámara',         desc: 'Ve quién está en tu puerta antes de abrir' },
];

export function ConnectivityScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.connectivity || [];

  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={6}/>
        <h2 style={headingStyle}>¿Qué funciones adicionales te interesan?</h2>
        <p style={subStyle}>Estas funciones son opcionales. Si no las necesitas, puedes omitirlas.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {CONNECTIVITY.map(c => {
          const active = sel.includes(c.id);
          return (
            <button key={c.id} onClick={() => {
              setAnswers(a => {
                const cur = a.connectivity || [];
                return { ...a, connectivity: cur.includes(c.id) ? cur.filter(x => x !== c.id) : [...cur, c.id], connectivityNone: false };
              });
            }}
              style={{
                width: '100%', marginBottom: 10,
                border: `2px solid ${active ? VERDE : BORDER_REST}`,
                borderRadius: 10, padding: '18px 16px',
                background: active ? '#F2FDF3' : BG_WHITE,
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'border-color 0.15s, background 0.15s',
                position: 'relative',
              }}>
              {active && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 20, height: 20, borderRadius: '50%', background: VERDE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                </div>
              )}
              <div style={{ color: active ? '#2A6A30' : TEXT_SECONDARY, flexShrink: 0 }}>
                <AccessIcon type={c.id} size={28}/>
              </div>
              <div>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TEXT_PRIMARY, marginBottom: 3 }}>{c.label}</p>
                <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{c.desc}</p>
              </div>
            </button>
          );
        })}

        <button onClick={() => setAnswers(a => ({ ...a, connectivity: [], connectivityNone: true }))}
          style={{
            width: '100%', marginBottom: 10,
            border: `2px solid ${answers.connectivityNone ? VERDE : BORDER_REST}`,
            borderRadius: 10, padding: '16px 16px',
            background: answers.connectivityNone ? '#F2FDF3' : BG_WHITE,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'border-color 0.15s, background 0.15s',
          }}>
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_SECONDARY }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="9"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TEXT_PRIMARY }}>Solo lo básico</p>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Sin conectividad adicional — la cerradura abre y ya</p>
          </div>
        </button>
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        <PrimaryButton onClick={onNext} disabled={sel.length === 0 && !answers.connectivityNone}>
          VER MIS RESULTADOS
        </PrimaryButton>
      </div>
    </Screen>
  );
}
