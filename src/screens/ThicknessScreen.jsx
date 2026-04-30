import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid, SectionLabel, MeasurementInstrument } from '../components';

const THICKNESSES = [
  { id: '2-3',  label: '2–3',  unit: 'cm', hint: 'Puertas ligeras, interiores' },
  { id: '3-5',  label: '3–5',  unit: 'cm', hint: 'Estándar — mayoría de departamentos' },
  { id: '5-7',  label: '5–7',  unit: 'cm', hint: 'Reforzadas o acceso principal' },
  { id: '7-10', label: '7–10', unit: 'cm', hint: 'Seguridad o blindadas' },
  { id: 'unknown', label: 'No lo sé', hint: 'Continúa y te mostramos opciones compatibles' },
];

export function ThicknessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.thickness;
  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 3, totalSteps: 6, stepName: 'Grosor del canto' }}
      footerProps={{ onBack, onNext, disabled: !sel, step: 3, totalSteps: 6 }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Qué tan grueso es el canto de tu puerta?</ScreenTitle>
        <ScreenDeck>El canto es la orilla donde se instala la cerradura. Mídelo de frente a fondo.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px' }}>
        {/* Section A — Options grid */}
        <SectionLabel letter="A">Selecciona el rango</SectionLabel>
        <div style={{ marginBottom: 36 }}>
          <OptionCardGrid
            variant="diagram"
            gap={8}
            options={THICKNESSES}
            value={sel}
            onChange={(id) => setAnswers(a => ({ ...a, thickness: id }))}
          />
        </div>

        {/* Section B — Measurement instrument */}
        <SectionLabel letter="B">Instrumento de medición</SectionLabel>
        <MeasurementInstrument />
      </div>
    </StepLayout>
  );
}
