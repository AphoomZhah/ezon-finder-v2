import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid } from '../components';

const MATERIALS = [
  {
    id: 'madera',
    title: 'Madera',
    subtitle: 'Puertas residenciales, departamentos y casas',
    mood: 'madera',
    badgeLabel: 'Madera',
  },
  {
    id: 'metal',
    title: 'Metal',
    subtitle: 'Herrería pesada, portones o puertas industriales',
    mood: 'metal',
    badgeLabel: 'Metal',
  },
  {
    id: 'vidrio',
    title: 'Vidrio',
    subtitle: 'Templado, sin marcos metálicos o con herraje',
    mood: 'vidrio',
    badgeLabel: 'Vidrio',
  },
  {
    id: 'otros',
    title: 'Otro',
    subtitle: 'Aluminio, PVC u otro material',
    mood: 'neutral',
    badgeLabel: 'Otro',
  },
  {
    id: 'unknown',
    title: 'No lo sé',
    subtitle: 'Continúa y te mostramos opciones compatibles',
    mood: 'unknown',
    badge: false,
  },
];

export function MaterialScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.material;
  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 1, totalSteps: 6, stepName: 'Material de la puerta' }}
      footerProps={{ onBack, onNext, disabled: !sel, step: 1, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿De qué material es tu puerta?</ScreenTitle>
        <ScreenDeck>La foto te ayuda a identificarla, no necesitas saber el nombre técnico.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px 4px' }}>
        <OptionCardGrid
          variant="visual"
          gap={10}
          options={MATERIALS}
          value={sel}
          onChange={(id) => setAnswers(a => ({ ...a, material: id }))}
        />
      </div>
    </StepLayout>
  );
}
