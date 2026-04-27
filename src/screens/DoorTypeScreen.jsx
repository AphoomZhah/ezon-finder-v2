import { StepLayout, StepHeader, PhotoPlaceholder, WhatsAppLink, PrimaryButton, VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const DOOR_TYPES = [
  {
    id: 'abatible1hoja',
    label: 'Abatible 1 hoja',
    hint: 'Abre hacia adentro o afuera sobre bisagras',
    mood: 'abatible',
    icon: (
      <svg width="60" height="70" viewBox="0 0 60 70" fill="none" opacity="0.5">
        <rect x="8" y="5" width="36" height="58" rx="3" stroke="white" strokeWidth="2"/>
        <line x1="8" y1="5" x2="8" y2="63" stroke="white" strokeWidth="3"/>
        <path d="M44 34 A40 40 0 0 1 14 68" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="42" cy="34" r="3" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  {
    id: 'abatible2hojas',
    label: 'Abatible 2 hojas',
    hint: 'Dos puertas que abren desde el centro',
    mood: 'abatible',
    icon: (
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" opacity="0.5">
        <rect x="5" y="5" width="28" height="58" rx="3" stroke="white" strokeWidth="2"/>
        <rect x="37" y="5" width="28" height="58" rx="3" stroke="white" strokeWidth="2"/>
        <line x1="5" y1="5" x2="5" y2="63" stroke="white" strokeWidth="3"/>
        <line x1="65" y1="5" x2="65" y2="63" stroke="white" strokeWidth="3"/>
        <path d="M33 34 A28 28 0 0 0 13 60" stroke="white" strokeWidth="1.3" strokeDasharray="3 2"/>
        <path d="M37 34 A28 28 0 0 1 57 60" stroke="white" strokeWidth="1.3" strokeDasharray="3 2"/>
      </svg>
    ),
  },
  {
    id: 'corrediza1hoja',
    label: 'Corrediza 1 hoja',
    hint: 'Se desliza sobre un riel horizontal',
    mood: 'corrediza',
    icon: (
      <svg width="70" height="60" viewBox="0 0 70 60" fill="none" opacity="0.5">
        <rect x="5" y="8" width="38" height="42" rx="3" stroke="white" strokeWidth="2"/>
        <line x1="0" y1="52" x2="70" y2="52" stroke="white" strokeWidth="2.5"/>
        <path d="M43 28 H65" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M60 23 L67 28 L60 33" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'corrediza2hojas',
    label: 'Corrediza 2 hojas',
    hint: 'Dos paneles que se deslizan en sentido opuesto',
    mood: 'corrediza',
    icon: (
      <svg width="70" height="60" viewBox="0 0 70 60" fill="none" opacity="0.5">
        <rect x="5" y="8" width="27" height="42" rx="3" stroke="white" strokeWidth="2"/>
        <rect x="38" y="8" width="27" height="42" rx="3" stroke="white" strokeWidth="2"/>
        <line x1="0" y1="52" x2="70" y2="52" stroke="white" strokeWidth="2.5"/>
        <path d="M7 28 H-8" stroke="white" strokeWidth="1.3" strokeDasharray="3 2"/>
        <path d="M63 28 H78" stroke="white" strokeWidth="1.3" strokeDasharray="3 2"/>
      </svg>
    ),
  },
];

const REJA = {
  id: 'reja',
  label: 'Reja',
  hint: 'Puerta de herrería, portón de metal o malla',
  mood: 'metal',
};

export function DoorTypeScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.doorType;

  return (
    <StepLayout dir={dir} cta={<PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>}>
      <StepHeader onBack={onBack} step={4} totalSteps={7} />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={headingStyle}>¿Cómo se abre tu puerta?</h2>
        <p style={subStyle}>El tipo de apertura define qué mecanismo de cerradura es compatible.</p>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {DOOR_TYPES.map(dt => (
          <button key={dt.id} onClick={() => setAnswers(a => ({ ...a, doorType: dt.id }))}
            style={{
              border: `2px solid ${sel === dt.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              background: sel === dt.id ? '#F2FDF3' : BG_WHITE,
              padding: 0, textAlign: 'left',
              transition: 'border-color 0.15s, background 0.15s',
              position: 'relative',
            }}>
            {sel === dt.id && (
              <div style={{
                position: 'absolute', top: 8, right: 8, zIndex: 2,
                width: 20, height: 20, borderRadius: '50%',
                background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
            <PhotoPlaceholder mood={dt.mood} style={{ height: 100, width: '100%' }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {dt.icon}
              </div>
            </PhotoPlaceholder>
            <div style={{ padding: '10px 12px 12px' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13, color: TEXT_PRIMARY, marginBottom: 3 }}>{dt.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{dt.hint}</p>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 20px 0' }}>
        <button onClick={() => setAnswers(a => ({ ...a, doorType: REJA.id }))}
          style={{
            width: '100%', border: `2px solid ${sel === REJA.id ? VERDE : BORDER_REST}`,
            borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
            background: sel === REJA.id ? '#F2FDF3' : BG_WHITE,
            padding: 0, textAlign: 'left',
            transition: 'border-color 0.15s, background 0.15s',
            position: 'relative', display: 'flex',
          }}>
          {sel === REJA.id && (
            <div style={{
              position: 'absolute', top: 12, right: 12, zIndex: 2,
              width: 20, height: 20, borderRadius: '50%',
              background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
            </div>
          )}
          <PhotoPlaceholder mood={REJA.mood} style={{ width: 88, height: 72, flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" opacity="0.5">
                {[6, 14, 22, 30, 38].map(x => (
                  <line key={x} x1={x} y1="4" x2={x} y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                ))}
                <line x1="4" y1="12" x2="40" y2="12" stroke="white" strokeWidth="1.8"/>
                <line x1="4" y1="22" x2="40" y2="22" stroke="white" strokeWidth="1.8"/>
                <line x1="4" y1="32" x2="40" y2="32" stroke="white" strokeWidth="1.8"/>
              </svg>
            </div>
          </PhotoPlaceholder>
          <div style={{ padding: '16px 14px 16px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: TEXT_PRIMARY, marginBottom: 4 }}>{REJA.label}</p>
            <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{REJA.hint}</p>
          </div>
        </button>
      </div>

      <div style={{ padding: '12px 20px', marginBottom: 4 }}>
        <WhatsAppLink text="No reconozco el tipo de puerta"/>
      </div>

    </StepLayout>
  );
}
