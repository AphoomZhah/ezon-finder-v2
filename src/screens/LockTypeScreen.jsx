import { StepLayout, ScreenTitle, ScreenDeck, PhotoPlaceholder, VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY } from '../components';

const LOCK_TYPES = [
  {
    id: 'conManija',
    label: 'Con manija',
    hint: 'Palanca o pomo — la más común en casas y departamentos',
    mood: 'interior',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.5">
        <rect x="8" y="6" width="10" height="36" rx="3" stroke="white" strokeWidth="2"/>
        <rect x="8" y="6" width="10" height="36" rx="3" stroke="white" strokeWidth="2"/>
        <path d="M18 24 H34 C34 24 40 24 40 30 V36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="14" cy="28" r="3.5" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'pushPull',
    label: 'Push & Pull',
    hint: 'Sin manija saliente — se empuja o jala la placa plana',
    mood: 'exterior_cubierto',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.5">
        <rect x="10" y="6" width="12" height="40" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M22 18 H36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22 34 H36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 14 L36 18 L30 22" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 30 L36 34 L30 38" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'cerrojo',
    label: 'Cerrojo / deadbolt',
    hint: 'Se instala sobre la cerradura existente — opción sin reemplazar',
    mood: 'metal',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.5">
        <rect x="10" y="14" width="20" height="24" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M30 26 H44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <rect x="36" y="22" width="8" height="8" rx="2" stroke="white" strokeWidth="1.8"/>
        <circle cx="20" cy="26" r="3" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'candado',
    label: 'Candado',
    hint: 'Portátil — se coloca en argolla, reja o portón sin instalación',
    mood: 'exterior_abierto',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.5">
        <rect x="13" y="24" width="26" height="20" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M19 24V18a7 7 0 0114 0v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="26" cy="34" r="3" stroke="white" strokeWidth="1.8"/>
        <line x1="26" y1="37" x2="26" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function LockTypeScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.lockType;

  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 6, totalSteps: 6, stepName: 'Tipo de cerradura' }}
      footerProps={{ onBack, onNext, disabled: false, step: 6, totalSteps: 6, label: 'VER MIS RESULTADOS' }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Qué tipo de cerradura prefieres?</ScreenTitle>
        <ScreenDeck>Opcional — si no sabes, puedes omitir esta pregunta y continuar.</ScreenDeck>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {LOCK_TYPES.map(lt => (
          <button key={lt.id}
            onClick={() => setAnswers(a => ({ ...a, lockType: a.lockType === lt.id ? null : lt.id }))}
            style={{
              border: `2px solid ${sel === lt.id ? VERDE : BORDER_REST}`,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              background: sel === lt.id ? '#F2FDF3' : BG_WHITE,
              padding: 0, textAlign: 'left',
              transition: 'border-color 0.15s, background 0.15s',
              position: 'relative',
            }}>
            {sel === lt.id && (
              <div style={{
                position: 'absolute', top: 8, right: 8, zIndex: 2,
                width: 20, height: 20, borderRadius: '50%',
                background: VERDE, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            )}
            <PhotoPlaceholder mood={lt.mood} style={{ height: 100, width: '100%' }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {lt.icon}
              </div>
            </PhotoPlaceholder>
            <div style={{ padding: '10px 12px 12px' }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 13, color: TEXT_PRIMARY, marginBottom: 3 }}>{lt.label}</p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{lt.hint}</p>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '14px 20px 4px', textAlign: 'center' }}>
        <button onClick={onNext} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif", fontSize: 13,
          color: TEXT_SECONDARY, textDecoration: 'underline', padding: '4px',
        }}>
          No sé — omitir esta pregunta
        </button>
      </div>

    </StepLayout>
  );
}
