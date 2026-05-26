import { Fence, HelpCircle } from 'lucide-react';
import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid } from '../components';
import { getViableDoorTypes } from '../data/matcher';
import { ICON_SIZE_HERO, ICON_STROKE, ICON_COLOR_ON_DARK, ICON_COLOR_MUTED } from '../design-tokens/tokens';

const DOOR_TYPES = [
  {
    id: 'abatible',
    title: 'Abatible',
    subtitle: 'Abre hacia adentro o afuera sobre bisagras',
    mood: 'abatible',
    image: (
      <img
        src="/assets/img/ico-puerta-01-abatible.svg"
        style={{
          height: '78%',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          opacity: 0.85,
        }}
      />
    ),
  },
  {
    id: 'corrediza',
    title: 'Corrediza',
    subtitle: 'Se desliza sobre un riel horizontal',
    mood: 'corrediza',
    image: (
      <img
        src="/assets/img/ico-puerta-02-corrediza.svg"
        style={{
          height: '74%',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          opacity: 0.85,
        }}
      />
    ),
  },
  {
    id: 'reja',
    title: 'Reja',
    subtitle: 'Puerta de herrería, portón de metal o malla',
    mood: 'metal',
    image: <Fence size={ICON_SIZE_HERO} strokeWidth={ICON_STROKE} color={ICON_COLOR_ON_DARK} />,
  },
  {
    id: 'unknown',
    title: 'No lo sé',
    subtitle: 'Continúa y te mostramos opciones compatibles',
    mood: 'unknown',
    badge: false,
    image: <HelpCircle size={ICON_SIZE_HERO} strokeWidth={ICON_STROKE} color={ICON_COLOR_MUTED} />,
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
