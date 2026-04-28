import { StepLayout, StepHeader, OptionCardGrid, WhatsAppCTA, headingStyle, subStyle } from '../components';

const WA_URL = 'https://wa.me/525500000000';

const MATERIALS = [
  { id: 'madera', title: 'Madera',  subtitle: 'Puertas residenciales, departamentos y casas', mood: 'madera' },
  { id: 'metal',  title: 'Metal',   subtitle: 'Herrería pesada, portones o puertas industriales', mood: 'metal' },
  { id: 'vidrio', title: 'Vidrio',  subtitle: 'Templado, sin marcos metálicos o con herraje', mood: 'vidrio' },
  { id: 'otros',  title: 'Otro',    subtitle: 'Aluminio, PVC u otro material', mood: 'neutral' },
];

export function MaterialScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.material;
  return (
    <StepLayout dir={dir} footerProps={{ onBack, onNext, disabled: !sel, step: 1, totalSteps: 6 }}>
      <StepHeader />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={headingStyle}>¿De qué material es tu puerta?</h2>
        <p style={subStyle}>La foto te ayuda a identificarla, no necesitas saber el nombre técnico.</p>
      </div>

      <div style={{ padding: '16px 20px' }}>
        <OptionCardGrid
          options={MATERIALS}
          value={sel}
          onChange={(id) => setAnswers(a => ({ ...a, material: id }))}
          unknownOption={{
            title: 'No lo sé',
            subtitle: 'Te conectamos con un asesor',
            onSelect: () => window.open(WA_URL, '_blank'),
          }}
        />
      </div>

      <div style={{ padding: '0 20px', marginBottom: 6 }}>
        <WhatsAppCTA context="material" />
      </div>
    </StepLayout>
  );
}
