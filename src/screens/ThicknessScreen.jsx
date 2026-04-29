import { StepLayout, ScreenTitle, ScreenDeck, BillIllustration, WhatsAppCTA, VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY } from '../components';

const THICKNESSES = [
  { id: '2-3',  label: '2–3 cm',  hint: 'Puertas ligeras, interiores' },
  { id: '3-5',  label: '3–5 cm',  hint: 'Estándar — mayoría de departamentos' },
  { id: '5-7',  label: '5–7 cm',  hint: 'Reforzadas o acceso principal' },
  { id: '7-10', label: '7–10 cm', hint: 'Seguridad o blindadas' },
];

export function ThicknessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.thickness;
  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 3, totalSteps: 6, stepName: 'Grosor del canto' }}
      footerProps={{ onBack, onNext, disabled: !sel, step: 3, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Qué tan grueso es el canto de tu puerta?</ScreenTitle>
        <ScreenDeck>El canto es la orilla donde se instala la cerradura, mídelo de frente a fondo.</ScreenDeck>
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

        <WhatsAppCTA context="grosor" style={{ marginBottom: 10 }}/>
      </div>

    </StepLayout>
  );
}
