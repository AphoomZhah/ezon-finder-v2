import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid } from '../components';
import { getViableLockTypes } from '../data/matcher';

const LOCK_TYPES = [
  {
    id: 'unknown',
    title: 'Todos',
    subtitle: 'Muéstrame todos los tipos compatibles',
    mood: 'unknown',
    badge: false,
  },
  {
    id: 'conManija',
    title: 'Con manija',
    subtitle: 'Palanca o pomo — la más común en casas y departamentos',
    mood: 'lock-manija',
    image: (
      <img src="/assets/img/ico-cerradura-01-manija.svg"
        style={{ height: '72%', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
    ),
    badge: false,
  },
  {
    id: 'pushPull',
    title: 'Push & Pull',
    subtitle: 'Sin manija saliente — se empuja o jala la placa plana',
    mood: 'lock-pushpull',
    image: (
      <img src="/assets/img/ico-cerradura-02-push-pull.svg"
        style={{ height: '80%', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
    ),
    badge: false,
  },
  {
    id: 'cerrojo',
    title: 'Cerrojo / deadbolt',
    subtitle: 'Se instala sobre la cerradura existente — opción sin reemplazar',
    mood: 'lock-cerrojo',
    image: (
      <img src="/assets/img/ico-cerradura-03-cerrojo.svg"
        style={{ height: '58%', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
    ),
    badge: false,
  },
  {
    id: 'candado',
    title: 'Candado',
    subtitle: 'Portátil — se coloca en argolla, reja o portón sin instalación',
    mood: 'lock-candado',
    image: (
      <img src="/assets/img/ico-cerradura-04-candado.svg"
        style={{ height: '50%', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
    ),
    badge: false,
  },
];

export function LockTypeScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.lockType || [];
  const viableLockTypeIds = getViableLockTypes(answers);
  const visibleOptions = LOCK_TYPES.filter(opt =>
    opt.id === 'unknown' || viableLockTypeIds.includes(opt.id)
  );

  const handleChange = (ids) => {
    // If 'unknown' was just added, clear all other selections
    if (ids.includes('unknown') && !sel.includes('unknown')) {
      setAnswers(a => ({ ...a, lockType: ['unknown'] }));
      return;
    }
    const filtered = ids.filter(id => id !== 'unknown');
    setAnswers(a => ({ ...a, lockType: filtered }));
  };

  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 4, totalSteps: 6, stepName: 'Tipo de cerradura' }}
      footerProps={{ onBack, onNext, disabled: sel.length === 0, step: 4, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Qué tipo de cerradura prefieres?</ScreenTitle>
        <ScreenDeck>Puedes elegir más de uno. El tipo define el mecanismo y la instalación necesaria.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px 4px' }}>
        <OptionCardGrid
          variant="visual"
          gap={8}
          multiple
          options={visibleOptions}
          value={sel}
          onChange={handleChange}
        />
      </div>
    </StepLayout>
  );
}
