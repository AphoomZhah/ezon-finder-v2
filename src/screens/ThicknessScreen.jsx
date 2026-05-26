import { useState } from 'react';
import { StepLayout, ScreenTitle, ScreenDeck, OptionCardGrid, SectionLabel, MeasurementInstrument, BG_WHITE, BORDER_REST, TEXT_PRIMARY, TEXT_SECONDARY } from '../components';

const THICKNESSES = [
  { id: '2-3',  label: '2–3',  unit: 'cm', hint: 'Puertas ligeras, interiores' },
  { id: '3-5',  label: '3–5',  unit: 'cm', hint: 'Estándar — mayoría de departamentos' },
  { id: '5-7',  label: '5–7',  unit: 'cm', hint: 'Reforzadas o acceso principal' },
  { id: '7-10', label: '7–10', unit: 'cm', hint: 'Seguridad o blindadas' },
  { id: 'unknown', label: 'No lo sé', hint: 'Continúa y te mostramos opciones compatibles' },
];

export function ThicknessScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const [helpOpen, setHelpOpen] = useState(false);
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

        <div style={{ marginTop: 8, marginBottom: 36 }}>
          {/* Collapsible help trigger */}
          <button
            onClick={() => setHelpOpen(o => !o)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              background: BG_WHITE,
              border: `1px solid ${BORDER_REST}`,
              borderRadius: helpOpen ? '12px 12px 0 0' : 12,
              cursor: 'pointer',
              transition: 'border-radius 200ms ease',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={TEXT_SECONDARY} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 13.5,
                fontWeight: 600,
                color: TEXT_PRIMARY,
              }}>
                ¿Cómo medir el canto?
              </span>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={TEXT_SECONDARY} strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                transform: helpOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 220ms ease',
                flexShrink: 0,
              }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {/* Collapsible body */}
          {helpOpen && (
            <div style={{
              background: BG_WHITE,
              border: `1px solid ${BORDER_REST}`,
              borderTop: 'none',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
            }}>
              <img
                src="/assets/img/P03_door_thickness-reference.png"
                alt="Cómo medir el canto de la puerta"
                style={{
                  width: '100%',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.55,
                color: TEXT_SECONDARY,
                padding: '14px 16px 16px',
                margin: 0,
              }}>
                Mide el canto — la orilla lateral donde se instala la 
                cerradura, de frente a fondo. No es el alto ni el ancho 
                de la puerta.
              </p>
            </div>
          )}
        </div>

        {/* Section B — Measurement instrument (temporarily hidden — restore by uncommenting)
        <SectionLabel letter="B">Instrumento de medición</SectionLabel>
        <MeasurementInstrument />
        */}
      </div>
    </StepLayout>
  );
}
