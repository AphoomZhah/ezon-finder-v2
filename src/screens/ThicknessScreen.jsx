import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid, MeasurementInstrument } from '../components';

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
        <ScreenTitle
          helpContent={
            <div>
              <img
                src="/assets/img/P03_door_thickness-reference.png"
                alt="Cómo medir el canto de la puerta"
                style={{ width: '100%', display: 'block' }}
              />
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.55,
                color: 'var(--ink-secondary)',
                padding: '14px 20px 0',
                margin: 0,
              }}>
                Mide el canto — la orilla lateral donde se instala la
                cerradura, de frente a fondo. No es el alto ni el ancho
                de la puerta.
              </p>
            </div>
          }
        >
          ¿Qué tan grueso es el canto de tu puerta?
        </ScreenTitle>
        <ScreenDeck>El canto es la orilla donde se instala la cerradura. Mídelo de frente a fondo.</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ marginBottom: 36 }}>
          <OptionCardGrid
            variant="diagram"
            gap={8}
            options={THICKNESSES}
            value={sel}
            onChange={(id) => setAnswers(a => ({ ...a, thickness: id }))}
          />
        </div>

        {/* Section B — Measurement instrument (temporarily hidden — restore by uncommenting)
        <SectionLabel letter="B">Instrumento de medición</SectionLabel>
        <MeasurementInstrument />
        */}
      </div>
    </StepLayout>
  );
}
