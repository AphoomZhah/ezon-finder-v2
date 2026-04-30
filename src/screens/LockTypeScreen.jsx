import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid } from '../components';

const LOCK_TYPES = [
  {
    id: 'conManija',
    title: 'Con manija',
    subtitle: 'Palanca o pomo — la más común en casas y departamentos',
    mood: 'lock-manija',
    image: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.65">
        <rect x="8" y="6" width="10" height="36" rx="3" stroke="white" strokeWidth="2"/>
        <path d="M18 24 H34 C34 24 40 24 40 30 V36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="14" cy="28" r="3.5" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
    badge: false,
  },
  {
    id: 'pushPull',
    title: 'Push & Pull',
    subtitle: 'Sin manija saliente — se empuja o jala la placa plana',
    mood: 'lock-pushpull',
    image: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.65">
        <rect x="10" y="6" width="12" height="40" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M22 18 H36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22 34 H36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 14 L36 18 L30 22" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 30 L36 34 L30 38" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: false,
  },
  {
    id: 'cerrojo',
    title: 'Cerrojo / deadbolt',
    subtitle: 'Se instala sobre la cerradura existente — opción sin reemplazar',
    mood: 'lock-cerrojo',
    image: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.65">
        <rect x="10" y="14" width="20" height="24" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M30 26 H44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <rect x="36" y="22" width="8" height="8" rx="2" stroke="white" strokeWidth="1.8"/>
        <circle cx="20" cy="26" r="3" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
    badge: false,
  },
  {
    id: 'candado',
    title: 'Candado',
    subtitle: 'Portátil — se coloca en argolla, reja o portón sin instalación',
    mood: 'lock-candado',
    image: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.65">
        <rect x="13" y="24" width="26" height="20" rx="4" stroke="white" strokeWidth="2"/>
        <path d="M19 24V18a7 7 0 0114 0v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="26" cy="34" r="3" stroke="white" strokeWidth="1.8"/>
        <line x1="26" y1="37" x2="26" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    badge: false,
  },
];

export function LockTypeScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.lockType;

  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 4, totalSteps: 6, stepName: 'Tipo de cerradura' }}
      footerProps={{ onBack, onNext, disabled: false, step: 4, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Qué tipo de cerradura prefieres?</ScreenTitle>
        <ScreenDeck>Opcional — si no sabes, puedes omitir esta pregunta y continuar.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px 4px' }}>
        <OptionCardGrid
          variant="visual"
          gap={8}
          options={LOCK_TYPES}
          value={sel}
          onChange={(id) => setAnswers(a => ({ ...a, lockType: a.lockType === id ? null : id }))}
        />
      </div>

      {/* Skip link — below the grid, per design spec */}
      <div style={{ padding: '12px 24px 4px', textAlign: 'center' }}>
        <button onClick={onNext} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: '#8A8A8A',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          padding: '4px 0',
        }}>
          No sé — omitir esta pregunta
        </button>
      </div>
    </StepLayout>
  );
}
