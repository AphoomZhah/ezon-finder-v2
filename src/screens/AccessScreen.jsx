import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid, AccessIcon } from '../components';
import { getViableAccessMethods } from '../data/matcher';

const ACCESS_METHODS = [
  {
    id: 'huella',
    title: 'Huella digital',
    subtitle: 'Pones tu dedo en el lector.',
    mood: 'access-huella',
    iconType: 'huella',
  },
  {
    id: 'pin',
    title: 'Código PIN',
    subtitle: 'Tecleas un código numérico.',
    mood: 'access-pin',
    iconType: 'pin',
  },
  {
    id: 'rfid',
    title: 'Tarjeta RFID',
    subtitle: 'Acercas una tarjeta o llavero.',
    mood: 'access-rfid',
    iconType: 'rfid',
  },
  {
    id: 'app',
    title: 'App móvil',
    subtitle: 'Abres desde tu celular.',
    mood: 'access-app',
    iconType: 'app',
  },
  {
    id: 'facial',
    title: 'Reconocimiento facial',
    subtitle: 'La cerradura te identifica por tu rostro.',
    mood: 'access-facial',
    iconType: 'facial',
  },
  {
    id: 'llaveRespaldo',
    title: 'Llave mecánica',
    subtitle: 'Llave física tradicional como respaldo.',
    mood: 'access-llave',
    iconType: 'llave',
  },
];

// Map access method options to inject an icon image element that sits centered
// in the visual hero area (neutral dark background, icon centered).
const ACCESS_OPTIONS = ACCESS_METHODS.map(m => {
  const cdnUrls = {
    huella: 'https://cdn.shopify.com/s/files/1/0571/0400/7337/files/icon-ezon-huella-digital_9501b436-d07d-4278-b44d-405b100779b4.svg?v=1689132524',
    pin: 'https://cdn.shopify.com/s/files/1/0571/0400/7337/files/icon-ezon-pin-code.svg?v=1689132524',
    rfid: 'https://cdn.shopify.com/s/files/1/0571/0400/7337/files/icon-ezon-rfid_58a8c994-091e-45d3-afe5-efc9bcea8c44.svg?v=1689132524',
    app: 'https://cdn.shopify.com/s/files/1/0571/0400/7337/files/icon-ezon-acceso-remoto_57db8e49-09f4-4148-a8ba-6be45018a7ec.svg?v=1689132524',
  };

  const useCdn = ['huella', 'pin', 'rfid', 'app'].includes(m.id);

  return {
    ...m,
    // The VisualCard renders `option.image` centered over the texture when present.
    // We use a neutral dark mood so the icon reads on a dark surface.
    image: (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div style={{ color: '#FAFAF8', opacity: 0.85 }}>
          {useCdn ? (
            <img
              src={cdnUrls[m.id]}
              alt={m.title}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.85,
              }}
            />
          ) : (
            <AccessIcon type={m.iconType} size={36} />
          )}
        </div>
      </div>
    ),
    // Override badge: don't show material badge for access method cards
    badge: false,
  };
});

const UNKNOWN_ACCESS = {
  id: 'unknown',
  title: 'No lo sé',
  subtitle: 'Continúa y te mostramos opciones compatibles',
  mood: 'unknown',
  badge: false,
};

export function AccessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.accessMethods || [];
  const viableAccessIds = getViableAccessMethods(answers);
  const visibleAccessOptions = ACCESS_OPTIONS.filter(opt =>
    viableAccessIds.includes(opt.id)
  );

  const handleChange = (ids) => {
    // If 'unknown' was just added, clear all other selections
    if (ids.includes('unknown') && !sel.includes('unknown')) {
      setAnswers(a => ({ ...a, accessMethods: ['unknown'] }));
      return;
    }
    // If any real method was added while 'unknown' was selected, remove 'unknown'
    const filtered = ids.filter(id => id !== 'unknown');
    setAnswers(a => ({ ...a, accessMethods: filtered }));
  };

  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 5, totalSteps: 6, stepName: 'Métodos de acceso' }}
      footerProps={{ onBack, onNext, disabled: sel.length === 0, step: 5, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>Selecciona tus métodos de acceso principal</ScreenTitle>
        <ScreenDeck>Puedes elegir varios. Lo que selecciones define los métodos disponibles día a día.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px 4px' }}>
        <OptionCardGrid
          variant="visual"
          gap={8}
          multiple
          options={[...visibleAccessOptions, UNKNOWN_ACCESS]}
          value={sel}
          onChange={handleChange}
        />
      </div>
    </StepLayout>
  );
}
