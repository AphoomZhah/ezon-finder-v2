import { BG_WHITE, BORDER_REST, TEXT_SECONDARY } from '../design-tokens/tokens';
import { WhatsAppLink } from './WhatsAppLink';

const CONTEXT_TEXT = {
  material:   '¿No reconoces el material de tu puerta?',
  grosor:     '¿No puedes medir o no tienes regla a la mano?',
  exterior:   'La exposición directa al sol puede dañar la pantalla táctil en 6–12 meses. Un asesor puede orientarte.',
  resultados: '¿Quieres validar tu elección con un experto antes de comprar?',
};

export function WhatsAppCTA({ context, style }) {
  const text = CONTEXT_TEXT[context] || '¿Tienes dudas? Un asesor puede ayudarte.';
  return (
    <div style={{
      background: BG_WHITE, border: `1px solid ${BORDER_REST}`,
      borderRadius: 12, padding: 16, ...style,
    }}>
      <p style={{
        fontFamily: "'Open Sans', sans-serif", fontSize: 13,
        color: TEXT_SECONDARY, lineHeight: 1.55,
        marginBottom: 12, textAlign: 'center',
      }}>
        {text}
      </p>
      <WhatsAppLink text="Hablar con un asesor EZON"/>
    </div>
  );
}
