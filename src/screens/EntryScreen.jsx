import { Screen, HeroImage, PrimaryButton, BG_APP, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY, BORDER_REST } from '../components';

export function EntryScreen({ onStart }) {
  return (
    <Screen style={{ background: BG_APP }}>
      <HeroImage style={{ width: '100%', height: 480, flexShrink: 0 }}>
        <div style={{
          position: 'absolute', top: 20, left: 24,
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 18, color: '#fff', letterSpacing: '0.18em',
        }}>
          EZON
        </div>
      </HeroImage>

      <div style={{
        background: BG_WHITE, borderRadius: '14px 14px 0 0',
        marginTop: -18, flex: 1,
        padding: '28px 24px 32px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {['~5 minutos', '6 preguntas', 'Compatibilidad garantizada'].map(t => (
            <span key={t} style={{
              fontFamily: "'Open Sans', sans-serif", fontSize: 11.5, fontWeight: 600,
              color: TEXT_SECONDARY, background: BG_APP,
              border: `1px solid ${BORDER_REST}`, borderRadius: 20,
              padding: '4px 12px',
            }}>{t}</span>
          ))}
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 28, lineHeight: 1.15, color: TEXT_PRIMARY,
          letterSpacing: '-0.01em', marginBottom: 14,
          textTransform: 'uppercase',
        }}>
          Encuentra tu cerradura ideal
        </h1>

        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 15,
          color: TEXT_SECONDARY, lineHeight: 1.65, marginBottom: 28, flex: 1,
        }}>
          Responde unas preguntas sobre tu puerta y te mostramos las cerraduras inteligentes que son compatibles — con tu instalación específica, no cerraduras genéricas.
        </p>

        <PrimaryButton onClick={onStart}>Comenzar</PrimaryButton>

        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 12,
          color: TEXT_SECONDARY, textAlign: 'center', marginTop: 16, lineHeight: 1.5,
        }}>
          Distribuidor oficial Samsung Smart Lock, Igloohome y Excel
        </p>
      </div>
    </Screen>
  );
}
