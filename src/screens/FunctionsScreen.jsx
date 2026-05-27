import { StepLayout, ScreenTitle, ScreenDeck, HorizontalOptionCard } from '../components';
import { getViableFunctions } from '../data/matcher';

const FUNCTIONS = [
  {
    id: 'bloqueoAutomatico',
    label: 'Bloqueo automático',
    desc: 'Se cierra sola segundos después de cerrar la puerta',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'codigosTemporales',
    label: 'Códigos temporales',
    desc: 'Crea accesos con fecha de vencimiento para visitas',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a4 4 0 00-8 0v2"/>
        <path d="M6 11h2M10 11h2M14 11h2M6 15h2M10 15h2M14 15h2"/>
      </svg>
    ),
  },
  {
    id: 'aperturaRemota',
    label: 'Apertura remota',
    desc: 'Abre la puerta desde cualquier lugar con tu teléfono',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
        <path d="M2 12h4M18 12h4M12 2v4M12 18v4"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    id: 'adminAirbnb',
    label: 'Gestión Airbnb / rentas',
    desc: 'Acceso por huéspedes, reportes de entrada y salida',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'googleHomeAlexa',
    label: 'Google Home / Alexa',
    desc: 'Control por voz y automatizaciones del hogar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
  },
  {
    id: 'camara',
    label: 'Cámara / videoportero',
    desc: 'Ve en tiempo real quién está en tu puerta',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M23 7l-7 5 7 5V7z"/>
        <rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
  },
  {
    id: 'modoNino',
    label: 'Restricción de acceso',
    desc: 'Limita el acceso de niños o restringe horarios',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M4.93 4.93l14.14 14.14"/>
      </svg>
    ),
  },
];

const NONE_OPTION = {
  id: '__none__',
  label: 'Solo lo básico',
  desc: 'Sin funciones adicionales — la cerradura abre y ya',
  icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
};

export function FunctionsScreen({ answers, setAnswers, onNext, onBack, dir }) {
  const sel = answers.functions || [];
  const noneSelected = answers.functionsNone;
  const viableFunctionIds = getViableFunctions(answers);
  const visibleFunctions = FUNCTIONS.filter(fn =>
    viableFunctionIds.includes(fn.id)
  );

  const toggle = (id) => {
    setAnswers(a => {
      const cur = a.functions || [];
      if (cur.includes(id)) {
        return { ...a, functions: cur.filter(x => x !== id), functionsNone: false };
      }
      // Enforce max 3 when >= 3 options are visible
      if (visibleFunctions.length >= 3 && cur.length >= 3) return a;
      return { ...a, functions: [...cur, id], functionsNone: false };
    });
  };

  const toggleNone = () => {
    setAnswers(a => ({ ...a, functions: [], functionsNone: !a.functionsNone }));
  };

  const canContinue = sel.length > 0 || noneSelected;

  const deckText = visibleFunctions.length >= 3
    ? 'Elige hasta 3. Estas funciones filtran los modelos disponibles.'
    : 'Estas funciones filtran los modelos disponibles.';

  return (
    <StepLayout
      dir={dir}
      stepMeta={{ currentStep: 6, totalSteps: 6, stepName: 'Funciones' }}
      footerProps={{ onBack, onNext, disabled: !canContinue, step: 6, totalSteps: 6, label: 'VER MIS RESULTADOS' }}
    >
      <div style={{ padding: '0 24px 4px' }}>
        <ScreenTitle>¿Qué funciones necesitas?</ScreenTitle>
        <ScreenDeck>{deckText}</ScreenDeck>
      </div>

      <div style={{ padding: '0 24px 4px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {visibleFunctions.map(fn => (
          <HorizontalOptionCard
            key={fn.id}
            option={fn}
            isSelected={sel.includes(fn.id)}
            onClick={() => toggle(fn.id)}
          />
        ))}
        {/* "Solo lo básico" option */}
        <HorizontalOptionCard
          option={NONE_OPTION}
          isSelected={noneSelected}
          onClick={toggleNone}
        />
      </div>
    </StepLayout>
  );
}
