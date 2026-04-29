import { WhatsAppLink } from './WhatsAppLink';

export function WhatsAppCTA({ context, style }) {
  return (
    <div style={{ textAlign: 'center', ...style }}>
      <WhatsAppLink text="¿Tienes dudas? Habla con un asesor"/>
    </div>
  );
}
