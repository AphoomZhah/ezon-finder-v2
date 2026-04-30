function normalizeFeatureKey(raw) {
  if (!raw) return null;
  const s = String(raw).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  if (s === 'huella' || s.includes('fingerprint') || s.includes('biometrico')) return 'huella';
  if (s === 'app' || s.includes('wifi') || (s.includes('app') && !s.includes('apertura'))) return 'app';
  if (s === 'pin' || (s.includes('pin') && !s.includes('campin')) || (s.includes('codigo') && !s.includes('temporal'))) return 'pin';
  if (s === 'rfid' || s.includes('tarjeta') || s.includes('rfid') || s.includes('card')) return 'rfid';
  if (s === 'facial' || s.includes('facial') || s.includes('reconocimiento') || s.includes('face id')) return 'facial';
  if (s.includes('llave') || s.includes('respaldo') || (s.includes('key') && !s.includes('keybox'))) return 'llaveRespaldo';
  if (s.includes('camara') || s.includes('camera') || (s.includes('video') && s.includes('portero'))) return 'camara';
  if (s.includes('temporal') || s.includes('reloj') || s.includes('clock')) return 'codigosTemporales';
  if (s.includes('remota') || (s.includes('apertura') && s.includes('remota'))) return 'aperturaRemota';
  if (s.includes('alexa') || s.includes('google') || s.includes('voz') || s.includes('asistente') || s.includes('voice')) return 'googleHomeAlexa';
  if (s.includes('airbnb') || (s.includes('admin') && !s.includes('administracion'))) return 'adminAirbnb';
  if (s.includes('bloqueo') || s.includes('automatico')) return 'bloqueoAutomatico';
  if (s.includes('nino') || s.includes('child') || s.includes('shield') || s.includes('escudo')) return 'modoNino';
  if (s.includes('bluetooth')) return 'bluetooth';
  if (s.includes('usuario') || s.includes('user')) return 'usuarios';
  return null;
}

const shared = (size) => ({
  width: size, height: size, viewBox: '0 0 18 18',
  fill: 'none', stroke: 'currentColor',
  strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round',
});

const ICONS = {
  huella: (size) => (
    <svg {...shared(size)}>
      <path d="M3 14 C3 7 6 4.5 9 4.5 C12 4.5 15 7 15 14"/>
      <path d="M5.5 14 C5.5 9 7 7 9 7 C11 7 12.5 9 12.5 14"/>
      <path d="M8 14 C8 11 8.5 10 9 10 C9.5 10 10 11 10 14"/>
    </svg>
  ),
  app: (size) => (
    <svg {...shared(size)}>
      <path d="M2 8 C4.5 4.5 13.5 4.5 16 8"/>
      <path d="M5 11 C6.8 8.5 11.2 8.5 13 11"/>
      <path d="M8 14 C8.8 13 9.2 13 10 14"/>
      <circle cx="9" cy="15.5" r="0.9" fill="currentColor" stroke="none"/>
    </svg>
  ),
  pin: (size) => (
    <svg {...shared(size)}>
      <circle cx="6" cy="7" r="1" fill="currentColor" stroke="none"/>
      <circle cx="9" cy="7" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/>
      <circle cx="6" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  rfid: (size) => (
    <svg {...shared(size)}>
      <rect x="2" y="5" width="14" height="10" rx="2"/>
      <path d="M2 8.5 L16 8.5"/>
      <path d="M5 11.5 L8 11.5"/>
    </svg>
  ),
  facial: (size) => (
    <svg {...shared(size)}>
      <circle cx="9" cy="9" r="6.5"/>
      <circle cx="7" cy="8" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="11" cy="8" r="0.8" fill="currentColor" stroke="none"/>
      <path d="M6.5 11 Q9 13.5 11.5 11"/>
    </svg>
  ),
  llaveRespaldo: (size) => (
    <svg {...shared(size)}>
      <circle cx="6.5" cy="8.5" r="3.5"/>
      <path d="M9.5 8.5 L15.5 8.5"/>
      <path d="M13.5 8.5 L13.5 11"/>
      <path d="M15.5 8.5 L15.5 11"/>
    </svg>
  ),
  camara: (size) => (
    <svg {...shared(size)}>
      <path d="M2 7.5 L2 14 L16 14 L16 7.5 Z"/>
      <path d="M6 7.5 L7 5.5 L11 5.5 L12 7.5"/>
      <circle cx="9" cy="10.8" r="2.2"/>
    </svg>
  ),
  codigosTemporales: (size) => (
    <svg {...shared(size)}>
      <circle cx="9" cy="9" r="6.5"/>
      <path d="M9 5.5 L9 9 L11.5 10.5"/>
    </svg>
  ),
  aperturaRemota: (size) => (
    <svg {...shared(size)}>
      <circle cx="9" cy="13.5" r="0.8" fill="currentColor" stroke="none"/>
      <path d="M6.5 11 C6.5 9 7.8 8 9 8 C10.2 8 11.5 9 11.5 11"/>
      <path d="M4 14.5 C4 9.5 6.4 6 9 6 C11.6 6 14 9.5 14 14.5"/>
    </svg>
  ),
  googleHomeAlexa: (size) => (
    <svg {...shared(size)}>
      <rect x="7" y="2.5" width="4" height="7" rx="2"/>
      <path d="M5 9 C5 12 6.8 14 9 14 C11.2 14 13 12 13 9"/>
      <path d="M9 14 L9 16"/>
      <path d="M7 16 L11 16"/>
    </svg>
  ),
  adminAirbnb: (size) => (
    <svg {...shared(size)}>
      <path d="M2.5 9.5 L9 3 L15.5 9.5"/>
      <path d="M4.5 8.5 L4.5 15 L13.5 15 L13.5 8.5"/>
      <rect x="7" y="11" width="4" height="4"/>
    </svg>
  ),
  bloqueoAutomatico: (size) => (
    <svg {...shared(size)}>
      <rect x="4.5" y="9" width="9" height="6.5" rx="1"/>
      <path d="M7 9 L7 6.5 C7 5 7.9 4 9 4 C10.1 4 11 5 11 6.5 L11 9"/>
      <circle cx="9" cy="12.2" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  modoNino: (size) => (
    <svg {...shared(size)}>
      <path d="M9 2 L15 5 L15 10 C15 13.5 12.5 16 9 17 C5.5 16 3 13.5 3 10 L3 5 Z"/>
      <path d="M6.5 9.5 L8 11 L11.5 7"/>
    </svg>
  ),
  bluetooth: (size) => (
    <svg {...shared(size)}>
      <path d="M9 2 L14 6 L9 10 L14 14 L9 18"/>
      <path d="M9 10 L5 6"/>
      <path d="M9 10 L5 14"/>
    </svg>
  ),
  usuarios: (size) => (
    <svg {...shared(size)}>
      <circle cx="9" cy="6" r="3"/>
      <path d="M3 16 C3 12.5 5.7 10 9 10 C12.3 10 15 12.5 15 16"/>
    </svg>
  ),
};

const genericIcon = (size) => (
  <svg {...shared(size)}>
    <circle cx="9" cy="9" r="6.5"/>
    <path d="M6.5 9 L8 10.5 L11.5 7"/>
  </svg>
);

export function FeatureIcon({ name, size = 18 }) {
  const key = normalizeFeatureKey(name);
  const render = (key && ICONS[key]) || genericIcon;
  return render(size);
}
