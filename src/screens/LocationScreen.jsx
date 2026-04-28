import { StepLayout, StepHeader, AlertBox, WhatsAppCTA, VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, headingStyle, subStyle } from '../components';

const INTERIOR_LOCS = [
  { id: 'interiorPrincipal', label: 'Puerta principal',   hint: 'Entrada al departamento o casa' },
  { id: 'interiorRecamara',  label: 'Recámara / cuarto',  hint: 'Dormitorio o habitación privada' },
  { id: 'interiorCloset',    label: 'Closet / bodega',    hint: 'Almacén, clóset o cuarto de servicio' },
  { id: 'interiorOficina',   label: 'Oficina',            hint: 'Despacho, sala de juntas o coworking' },
];

const EXTERIOR_LOCS = [
  { id: 'exteriorConTecho',  label: 'Exterior con techo', hint: 'Zaguán, entrada cubierta o marquesina' },
  { id: 'exteriorSinTecho',  label: 'Exterior sin techo', hint: 'Expuesta al sol y lluvia directamente' },
  { id: 'exteriorReja',      label: 'Reja exterior',      hint: 'Portón de herrería, malla o acceso principal' },
];

function LocButton({ loc, sel, onSelect }) {
  const active = sel === loc.id;
  return (
    <button onClick={() => onSelect(loc.id)}
      style={{
        width: '100%', marginBottom: 10,
        border: `2px solid ${active ? VERDE : BORDER_REST}`,
        borderRadius: 10, padding: '13px 16px',
        background: active ? '#F2FDF3' : BG_WHITE,
        cursor: 'pointer', textAlign: 'left',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'border-color 0.15s, background 0.15s',
      }}>
      <div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: TEXT_PRIMARY }}>{loc.label}</p>
        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>{loc.hint}</p>
      </div>
      {active && (
        <div style={{
          width: 22, height: 22, borderRadius: '50%', background: VERDE,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
        </div>
      )}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'Open Sans', sans-serif", fontSize: 10.5, fontWeight: 700,
      color: TEXT_SECONDARY, letterSpacing: '0.1em', textTransform: 'uppercase',
      marginBottom: 10, marginTop: 4,
    }}>
      {children}
    </p>
  );
}

export function LocationScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.location;
  const onSelect = (id) => setAnswers(a => ({ ...a, location: id }));

  return (
    <StepLayout dir={dir} footerProps={{ onBack, onNext, disabled: !sel, step: 3, totalSteps: 7 }}>
      <StepHeader />
      <div style={{ padding: '0 20px 4px' }}>
        <h2 style={headingStyle}>¿Dónde está ubicada tu puerta?</h2>
        <p style={subStyle}>La ubicación determina la resistencia necesaria y los modelos disponibles.</p>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <SectionLabel>Interior</SectionLabel>
        {INTERIOR_LOCS.map(loc => (
          <LocButton key={loc.id} loc={loc} sel={sel} onSelect={onSelect}/>
        ))}

        <SectionLabel>Exterior</SectionLabel>
        {EXTERIOR_LOCS.map(loc => (
          <div key={loc.id}>
            <LocButton loc={loc} sel={sel} onSelect={onSelect}/>
            {sel === 'exteriorSinTecho' && loc.id === 'exteriorSinTecho' && (
              <AlertBox>
                <strong style={{ display: 'block', marginBottom: 5 }}>Atención: exposición solar directa</strong>
                La pantalla táctil de la mayoría de cerraduras se daña en 6–12 meses bajo el sol directo. Te mostramos las opciones disponibles, pero te recomendamos hablar con un asesor para la solución más duradera.
                <div style={{ marginTop: 12 }}>
                  <WhatsAppCTA context="exterior"/>
                </div>
              </AlertBox>
            )}
          </div>
        ))}
      </div>

    </StepLayout>
  );
}
