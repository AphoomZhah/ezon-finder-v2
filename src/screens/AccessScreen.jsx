import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid, AccessIcon } from '../components';

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
const ACCESS_OPTIONS = ACCESS_METHODS.map(m => ({
  ...m,
  // The VisualCard renders `option.image` centered over the texture when present.
  // We use a neutral dark mood so the icon reads on a dark surface.
  image: (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    }}>
      <div style={{ color: '#FAFAF8', opacity: 0.85 }}>
        <AccessIcon type={m.iconType} size={28} />
      </div>
    </div>
  ),
  // Override badge: don't show material badge for access method cards
  badge: false,
}));

export function AccessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.accessMethods || [];

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
          options={ACCESS_OPTIONS}
          value={sel}
          onChange={(ids) => setAnswers(a => ({ ...a, accessMethods: ids }))}
        />
      </div>
    </StepLayout>
  );
}
