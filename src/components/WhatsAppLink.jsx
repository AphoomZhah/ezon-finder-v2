import { TEXT_SECONDARY } from '../design-tokens/tokens';

export function WhatsAppLink({ text = 'Hablar con un asesor', style }) {
  return (
    <a href="https://wa.me/525500000000" target="_blank" rel="noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 6, padding: '8px 12px',
      border: 'none', borderRadius: 6,
      textDecoration: 'none',
      fontFamily: "'Open Sans', sans-serif", fontWeight: 600,
      fontSize: 13, color: TEXT_SECONDARY, background: 'transparent',
      cursor: 'pointer', ...style
    }}>
      <svg width="15" height="15" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M22.5 19.8c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.12-.28-.2-.58-.35z" fill="white"/>
      </svg>
      {text}
    </a>
  );
}
