import { StepLayout, StepHeader, PhotoPlaceholder, WhatsAppLink, PrimaryButton, VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, BG_APP, headingStyle, subStyle } from '../components';

const MATERIALS = [
  { id: 'madera',   label: 'Madera',   mood: 'madera',   hint: 'Puertas residenciales, interior o entrada' },
  { id: 'aluminio', label: 'Aluminio', mood: 'aluminio', hint: 'Perfil angosto, típica de departamento' },
  { id: 'metal',    label: 'Metal',    mood: 'metal',    hint: 'Chapa pesada, herrería o portón' },
  { id: 'vidrio',   label: 'Vidrio',   mood: 'vidrio',   hint: 'Templado, sin marcos o con herraje' },
];

export function MaterialScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.material;
  return (
    <StepLayout dir={dir} cta={<PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>}>
      <StepHeader onBack={onBack} step={1} totalSteps={6} />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={headingStyle}>¿De qué material es tu puerta?</h2>
        <p style={subStyle}>La foto te ayuda a identificarla, no necesitas saber el nombre técnico.</p>
      </div>

      <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {MATERIALS.map(m => (
          <button key={m.id} onClick={() => setAnswers(a => ({ ...a, material: m.id }))}
            style={{
              border: `2px solid ${sel === m.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              background: sel === m.id ? '#F2FDF3' : BG_WHITE,
              padding: 0, textAlign: 'left',
              transition: 'border-color 0.15s, background 0.15s',
              position: 'relative',
            }}>
            {sel === m.id && (
              <div style={{
                position: 'absolute', top: 8, right: 8, zIndex: 2,
                width: 20, height: 20, borderRadius: '50%',
                background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
            <PhotoPlaceholder mood={m.mood} label={`foto · puerta de ${m.label.toLowerCase()}`}
              style={{ height: 115, width: '100%' }}/>
            <div style={{ padding: '10px 12px 12px' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13.5, color: TEXT_PRIMARY, marginBottom: 3 }}>{m.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{m.hint}</p>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '0 20px', marginBottom: 6 }}>
        <WhatsAppLink text="No reconozco el material de mi puerta"/>
      </div>

    </StepLayout>
  );
}
