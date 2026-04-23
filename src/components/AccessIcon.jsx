export function AccessIcon({ type, size = 26 }) {
  const s = { stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    huella: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7.03 3 3 7.03 3 12" {...s}/>
        <path d="M12 6.5C9 6.5 6.5 9 6.5 12c0 1.5.35 2.9.97 4.15" {...s}/>
        <path d="M12 10a2 2 0 012 2v5.5" {...s}/>
        <path d="M9 11.3c-.32.7-.5 1.4-.5 2.2 0 1.6.5 3.1 1.35 4.3" {...s}/>
        <path d="M12 3c4.97 0 9 4.03 9 9" {...s}/>
        <path d="M15.5 18c.56-1.1.87-2.36.87-3.6" {...s}/>
      </svg>
    ),
    pin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2.5" {...s}/>
        <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/>
        <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="13" r="1" fill="currentColor" stroke="none"/>
        <rect x="9" y="16" width="6" height="1.5" rx="0.75" fill="currentColor" stroke="none"/>
      </svg>
    ),
    rfid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="15" height="10" rx="2" {...s}/>
        <line x1="18" y1="9" x2="22" y2="9" {...s}/>
        <line x1="18" y1="12" x2="22" y2="12" {...s}/>
        <line x1="18" y1="15" x2="20" y2="15" {...s}/>
        <rect x="5" y="9" width="5" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.3"/>
      </svg>
    ),
    app: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" {...s}/>
        <circle cx="12" cy="18.5" r="1.2" fill="currentColor" stroke="none"/>
        <line x1="9.5" y1="6" x2="14.5" y2="6" {...s}/>
        <rect x="8" y="9" width="8" height="6" rx="1.5" {...s}/>
      </svg>
    ),
    facial: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 9V5a2 2 0 012-2h4M21 9V5a2 2 0 00-2-2h-4M3 15v4a2 2 0 002 2h4M21 15v4a2 2 0 01-2 2h-4" {...s}/>
        <circle cx="9.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="14.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
        <path d="M8.5 15s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5" {...s}/>
      </svg>
    ),
    llave: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="8.5" cy="12" r="4.5" {...s}/>
        <line x1="13" y1="12" x2="22" y2="12" {...s}/>
        <line x1="19" y1="10" x2="19" y2="12" {...s}/>
        <line x1="22" y1="12" x2="22" y2="14" {...s}/>
      </svg>
    ),
    wifi: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 9.5C7.5 4 16.5 4 22 9.5" {...s}/>
        <path d="M5.5 13c3.6-3.6 9.4-3.6 13 0" {...s}/>
        <path d="M9 16.5c1.7-1.7 6.3-1.7 6 0" {...s}/>
        <circle cx="12" cy="20" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    camara: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="16" height="11" rx="2" {...s}/>
        <polygon points="18,10.5 22,8 22,16 18,13.5" {...s}/>
        <circle cx="10" cy="12.5" r="2.5" {...s}/>
      </svg>
    ),
  };
  return icons[type] || null;
}
