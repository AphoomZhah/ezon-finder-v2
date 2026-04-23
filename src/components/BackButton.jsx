import { TEXT_SECONDARY } from '../design-tokens/tokens';

export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      padding: '0 0 4px', display: 'flex', alignItems: 'center',
      gap: 5, color: TEXT_SECONDARY,
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 13, fontWeight: 600,
      marginBottom: 16,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Atrás
    </button>
  );
}
