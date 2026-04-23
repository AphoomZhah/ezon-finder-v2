import { StepLayout, StepHeader, PhotoPlaceholder, PrimaryButton, VERDE, BORDER_REST, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const OPENINGS = [
  { id: 'abatible',   label: 'Abatible', hint: 'Se abre hacia adentro o afuera, sobre bisagras', mood: 'abatible' },
  { id: 'corrediza',  label: 'Corrediza', hint: 'Se desliza sobre un riel horizontal', mood: 'corrediza' },
];

export function OpeningScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.opening;
  return (
    <StepLayout dir={dir} cta={<PrimaryButton onClick={onNext} disabled={!sel}>CONTINUAR</PrimaryButton>}>
      <StepHeader onBack={onBack} step={4} totalSteps={6} />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={headingStyle}>¿Cómo se abre tu puerta?</h2>
        <p style={subStyle}>Reconoce tu tipo de puerta por la foto, no hace falta el nombre técnico.</p>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {OPENINGS.map(o => (
          <button key={o.id} onClick={() => setAnswers(a => ({ ...a, opening: o.id }))}
            style={{
              border: `2px solid ${sel === o.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              background: sel === o.id ? '#F2FDF3' : BG_WHITE,
              padding: 0, textAlign: 'left', position: 'relative',
              transition: 'border-color 0.15s, background 0.15s',
            }}>
            {sel === o.id && (
              <div style={{
                position: 'absolute', top: 12, right: 12, zIndex: 2,
                width: 22, height: 22, borderRadius: '50%', background: VERDE,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
            <PhotoPlaceholder mood={o.mood} label={`foto · puerta ${o.label.toLowerCase()} — bisagras / riel visibles`}
              style={{ width: '100%', height: 160 }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {o.id === 'abatible' ? (
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.45">
                    <rect x="10" y="10" width="45" height="60" rx="3" stroke="white" strokeWidth="2"/>
                    <line x1="10" y1="10" x2="10" y2="70" stroke="white" strokeWidth="3"/>
                    <path d="M55 40 A45 45 0 0 1 20 75" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <circle cx="53" cy="40" r="3" fill="white" opacity="0.7"/>
                  </svg>
                ) : (
                  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" opacity="0.45">
                    <rect x="5" y="10" width="45" height="40" rx="3" stroke="white" strokeWidth="2"/>
                    <line x1="0" y1="52" x2="75" y2="52" stroke="white" strokeWidth="2.5"/>
                    <circle cx="5" cy="52" r="3" fill="white"/>
                    <circle cx="20" cy="52" r="2" fill="white" opacity="0.5"/>
                    <circle cx="35" cy="52" r="2" fill="white" opacity="0.5"/>
                    <path d="M50 28 H75" stroke="white" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <path d="M70 23 L77 28 L70 33" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </PhotoPlaceholder>
            <div style={{ padding: '14px 16px 16px' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 4 }}>{o.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: TEXT_SECONDARY }}>{o.hint}</p>
            </div>
          </button>
        ))}
      </div>

    </StepLayout>
  );
}
