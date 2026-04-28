import { StepLayout, StepHeader, OptionCardGrid, headingStyle, subStyle } from '../components';

const WA_URL = 'https://wa.me/525500000000';

const DOOR_TYPES = [
  {
    id: 'abatible1hoja',
    title: 'Abatible 1 hoja',
    subtitle: 'Abre hacia adentro o afuera sobre bisagras',
    mood: 'abatible',
    image: (
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
    title: 'Abatible 2 hojas',
    subtitle: 'Dos puertas que abren desde el centro',
    mood: 'abatible',
    image: (
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
    title: 'Corrediza 1 hoja',
    subtitle: 'Se desliza sobre un riel horizontal',
    mood: 'corrediza',
    image: (
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
    title: 'Corrediza 2 hojas',
    subtitle: 'Dos paneles que se deslizan en sentido opuesto',
    mood: 'corrediza',
    image: (
      <svg width="70" height="60" viewBox="0 0 70 60" fill="none" opacity="0.5">
        <rect x="5" y="8" width="27" height="42" rx="3" stroke="white" strokeWidth="2"/>
        <rect x="38" y="8" width="27" height="42" rx="3" stroke="white" strokeWidth="2"/>
        <line x1="0" y1="52" x2="70" y2="52" stroke="white" strokeWidth="2.5"/>
        <path d="M7 28 H-8" stroke="white" strokeWidth="1.3" strokeDasharray="3 2"/>
        <path d="M63 28 H78" stroke="white" strokeWidth="1.3" strokeDasharray="3 2"/>
      </svg>
    ),
  },
  {
    id: 'reja',
    title: 'Reja',
    subtitle: 'Puerta de herrería, portón de metal o malla',
    mood: 'metal',
    image: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" opacity="0.5">
        {[6, 14, 22, 30, 38].map(x => (
          <line key={x} x1={x} y1="4" x2={x} y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        ))}
        <line x1="4" y1="12" x2="40" y2="12" stroke="white" strokeWidth="1.8"/>
        <line x1="4" y1="22" x2="40" y2="22" stroke="white" strokeWidth="1.8"/>
        <line x1="4" y1="32" x2="40" y2="32" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
  },
];

export function DoorTypeScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.doorType;

  return (
    <StepLayout dir={dir} footerProps={{ onBack, onNext, disabled: !sel, step: 2, totalSteps: 6 }}>
      <StepHeader />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={headingStyle}>¿Cómo se abre tu puerta?</h2>
        <p style={subStyle}>El tipo de apertura define qué mecanismo de cerradura es compatible.</p>
      </div>

      <div style={{ padding: '16px 20px' }}>
        <OptionCardGrid
          options={DOOR_TYPES}
          value={sel}
          onChange={(id) => setAnswers(a => ({ ...a, doorType: id }))}
          unknownOption={{
            title: 'No lo sé',
            subtitle: 'Te conectamos con un asesor',
            onSelect: () => window.open(WA_URL, '_blank'),
          }}
        />
      </div>

    </StepLayout>
  );
}
