import { useState } from 'react';
import { VERDE, TEXT_PRIMARY } from '../design-tokens/tokens';

export function PrimaryButton({ children, onClick, disabled, style }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: '100%', padding: '17px 24px',
        background: disabled ? '#C8E8CB' : VERDE,
        color: disabled ? '#90B893' : TEXT_PRIMARY,
        border: 'none', borderRadius: 8,
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: 400, fontSize: 14,
        letterSpacing: '0.1em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: pressed && !disabled ? 'scale(0.985)' : 'scale(1)',
        transition: 'background 0.15s, transform 0.1s',
        ...style
      }}
    >
      {children}
    </button>
  );
}
