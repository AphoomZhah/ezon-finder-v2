import { photoMoods } from './PhotoPlaceholder';

export function LockProductPlaceholder({ mood = 'product1', size = 88 }) {
  const m = photoMoods[mood] || photoMoods.product1;
  return (
    <div style={{
      width: size, height: size,
      background: `repeating-linear-gradient(135deg, ${m.bg} 0px, ${m.bg} 10px, ${m.stripe} 10px, ${m.stripe} 20px)`,
      borderRadius: 8, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width={size * 0.52} height={size * 0.6} viewBox="0 0 26 32" fill="none">
        <rect x="1" y="13" width="24" height="18" rx="4" fill="rgba(255,255,255,0.35)"/>
        <path d="M6 13V9a7 7 0 0114 0v4" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="13" cy="22" r="2.5" fill="rgba(255,255,255,0.65)"/>
        <line x1="13" y1="24.5" x2="13" y2="27.5" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
