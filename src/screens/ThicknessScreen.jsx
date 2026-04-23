import { Screen, BackButton, ProgressBar, BillIllustration, WhatsAppLink, PrimaryButton, VERDE, BORDER_REST, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const THICKNESSES = [
  { id: '2-3', label: '2–3 cm', hint: 'Puertas ligeras, interiores' },
  { id: '3-5', label: '3–5 cm', hint: 'Estándar — mayoría de departamentos' },
  { id: '5-7', label: '5–7 cm', hint: 'Reforzadas o acceso principal' },
  { id: '7-10',label: '7–10 cm',hint: 'Seguridad o blindadas' },
];

export function ThicknessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.thickness;
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ padding: '20px 20px 0' }}>
        <BackButton onClick={onBack}/>
        <ProgressBar step={2}/>
        <h2 style={headingStyle}>¿Qué tan grueso es el canto lateral de tu puerta?</h2>
        <p style={subStyle}>El canto es la orilla donde se instala la cerradura, mídelo de frente a fondo.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <BillIllustration/>

        {THICKNESSES.map(t => (
          <button key={t.id} onClick={() => setAnswers(a => ({ ...a, thickness: t.id }))}
            style={{
              width: '100%', marginBottom: 10,
              border: `2px solid ${sel === t.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, padding: '14px 16px',
              background: sel === t.id ? '#F2FDF3' : BG_WHITE,
              cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'border-color 0.15s, background 0.15s',
            }}>
            <div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: TEXT_PRIMARY }}>{t.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>{t.hint}</p>
            </div>
            {sel === t.id && (
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: VERDE,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
          </button>
        ))}

        <button onClick={() => setAnswers(a => ({ ...a, thickness: 'no-se' }))}
          style={{
            width: '100%', marginBottom: 10,
            border: `2px solid ${sel === 'no-se' ? VERDE : BORDER_REST}`,
            borderRadius: 10, padding: '14px 16px',
            background: sel === 'no-se' ? '#F2FDF3' : BG_WHITE,
            cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'border-color 0.15s, background 0.15s',
          }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8.5" stroke={TEXT_SECONDARY} strokeWidth="1.5"/>
            <path d="M10 6c1.5 0 2.5 1 2.5 2.2 0 1-1 1.8-2 2.3-.7.3-1 .8-1 1.5" stroke={TEXT_SECONDARY} strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="14.5" r="1" fill={TEXT_SECONDARY}/>
          </svg>
          <div>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TEXT_PRIMARY }}>No sé / Ayúdame a medir</p>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, color: TEXT_SECONDARY, marginTop: 1 }}>Un asesor te guía por WhatsApp</p>
          </div>
        </button>
      </div>

      <div style={{ padding: '12px 20px 32px', marginTop: 'auto' }}>
        {sel === 'no-se'
          ? <WhatsAppLink text="Pedir ayuda para medir"/>
          : <PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>
        }
      </div>
    </Screen>
  );
}
