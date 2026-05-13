import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid } from '../components';
import { getViableDoorTypes } from '../data/matcher';

const DOOR_TYPES = [
  {
    id: 'abatible',
    title: 'Abatible',
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
    id: 'corrediza',
    title: 'Corrediza',
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
  {
    id: 'unknown',
    title: 'No lo sé',
    subtitle: 'Continúa y te mostramos opciones compatibles',
    mood: 'unknown',
    badge: false,
  },
];

export function DoorTypeScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.doorType;
  const viableDoorTypeIds = getViableDoorTypes(answers);
  const visibleOptions = DOOR_TYPES.filter(opt =>
    opt.id === 'unknown' || viableDoorTypeIds.includes(opt.id)
  );

  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 2, totalSteps: 6, stepName: 'Tipo de apertura' }}
      footerProps={{ onBack, onNext, disabled: !sel, step: 2, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Cómo se abre tu puerta?</ScreenTitle>
        <ScreenDeck>El tipo de apertura define qué mecanismo de cerradura es compatible.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px' }}>
        <OptionCardGrid
          options={visibleOptions}
          value={sel}
          onChange={(id) => setAnswers(a => ({ ...a, doorType: id }))}
        />
      </div>

    </StepLayout>
  );
}
