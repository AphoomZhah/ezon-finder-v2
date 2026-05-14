import { Screen, WhatsAppLink, PrimaryButton, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_REST, VERDE, ALERT_BG, ALERT_TEXT } from '../components';

export function IncompatibleScreen({ onRestart }) {
  return (
    <Screen style={{ background: BG_APP, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        background: BG_WHITE, margin: 24, borderRadius: 16,
        padding: '36px 24px 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: ALERT_BG, display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4M12 17h.01" stroke={ALERT_TEXT} strokeWidth="2" strokeLinecap="round"/>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={ALERT_TEXT} strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
        </div>

        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, fontWeight: 600,
          color: ALERT_TEXT, letterSpacing: '0.08em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          Tipo de puerta no compatible
        </p>

        <h2 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 22, color: TEXT_PRIMARY, textAlign: 'center',
          lineHeight: 1.2, marginBottom: 16,
        }}>
          No encontramos cerraduras inteligentes para este tipo de puerta
        </h2>

        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 14,
          color: TEXT_SECONDARY, lineHeight: 1.65, textAlign: 'center',
          marginBottom: 28,
        }}>
          Las cerraduras digitales requieren instalarse en el canto lateral de la puerta. Algunos tipos de construcción no permiten hacer la instalación estándar.
        </p>

        <div style={{
          background: ALERT_BG, borderRadius: 10, padding: '14px 16px',
          width: '100%', marginBottom: 24,
        }}>
          <p style={{
            fontFamily: "'Open Sans', sans-serif", fontSize: 13,
            color: ALERT_TEXT, lineHeight: 1.55, textAlign: 'center',
          }}>
            Un asesor EZON puede recomendarte la solución adecuada para tu puerta específica.
          </p>
        </div>

        <WhatsAppLink text="Hablar con un asesor EZON" style={{ width: '100%', justifyContent: 'center' }}/>

        <button onClick={onRestart} style={{
          marginTop: 16, background: 'none', border: 'none',
          fontFamily: "'Open Sans', sans-serif", fontSize: 13,
          color: TEXT_SECONDARY, cursor: 'pointer', textDecoration: 'underline',
          padding: '4px',
        }}>
          Volver al inicio
        </button>
      </div>
    </Screen>
  );
}
