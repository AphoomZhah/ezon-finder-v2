import { useState, useEffect } from 'react';
import { Screen, VERDE, BORDER_REST, BG_WHITE, TEXT_PRIMARY, TEXT_SECONDARY } from '../components';

const LOADING_MESSAGES = [
  'Revisando material y grosor de puerta...',
  'Verificando compatibilidad de mecanismo...',
  'Cruzando con catálogo disponible en EZON...',
  'Calculando score de compatibilidad...',
  'Preparando tus resultados...',
];

export function LoadingScreen({ onDone, dir }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < LOADING_MESSAGES.length) {
        setMsgIndex(i);
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(onDone, 500);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Screen dir={dir} style={{ background: BG_WHITE, justifyContent: 'center', alignItems: 'center', padding: '0 40px' }}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
          fontSize: 20, letterSpacing: '0.2em', color: TEXT_PRIMARY,
          marginBottom: 48,
        }}>EZON</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i < msgIndex + 1 ? VERDE : BORDER_REST,
              transition: 'background 0.35s ease',
              transform: i === msgIndex ? 'scale(1.35)' : 'scale(1)',
            }}/>
          ))}
        </div>

        <p key={msgIndex} style={{
          fontFamily: "'Open Sans', sans-serif", fontSize: 14,
          color: TEXT_SECONDARY, lineHeight: 1.6,
          animation: 'fadeInUp 0.3s ease',
        }}>
          {done ? (
            <span style={{ color: TEXT_PRIMARY, fontWeight: 600 }}>Listo — encontramos tus cerraduras</span>
          ) : LOADING_MESSAGES[msgIndex]}
        </p>
      </div>
    </Screen>
  );
}
