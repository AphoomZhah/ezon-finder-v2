import { BG_WHITE, BORDER_REST, VERDE, TEXT_PRIMARY, TEXT_SECONDARY } from '../design-tokens/tokens';

export function BillIllustration() {
  return (
    <div style={{
      background: BG_WHITE, borderRadius: 12,
      padding: '18px 20px 14px',
      border: `1px solid ${BORDER_REST}`,
      marginBottom: 20,
    }}>
      <p style={{
        fontFamily: "'Open Sans', sans-serif", fontSize: 11,
        fontWeight: 600, color: TEXT_SECONDARY,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        marginBottom: 12,
      }}>Referencia rápida sin regla</p>

      <svg viewBox="0 0 320 110" fill="none" style={{ width: '100%' }}>
        <rect x="8" y="30" width="18" height="50" rx="2" fill="#C4A882"/>
        <rect x="26" y="24" width="42" height="62" rx="1" fill="#A08060"/>
        <text x="47" y="100" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#888">canto</text>
        <line x1="47" y1="88" x2="47" y2="96" stroke="#aaa" strokeWidth="1"/>
        <rect x="68" y="38" width="130" height="46" rx="5" fill="#EEF8EC" stroke={VERDE} strokeWidth="2"/>
        <rect x="80" y="50" width="22" height="22" rx="2" fill={VERDE} opacity="0.25"/>
        <rect x="162" y="50" width="22" height="22" rx="2" fill={VERDE} opacity="0.25"/>
        <circle cx="131" cy="61" r="10" stroke={VERDE} strokeWidth="1.5" opacity="0.4"/>
        <text x="131" y="66" textAnchor="middle" fontFamily="serif" fontSize="15" fontWeight="bold" fill="#3A6A35">$</text>
        <line x1="68" y1="28" x2="198" y2="28" stroke={TEXT_PRIMARY} strokeWidth="1"/>
        <line x1="68" y1="23" x2="68" y2="33" stroke={TEXT_PRIMARY} strokeWidth="1.5"/>
        <line x1="198" y1="23" x2="198" y2="33" stroke={TEXT_PRIMARY} strokeWidth="1.5"/>
        <text x="133" y="21" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill={TEXT_PRIMARY} fontWeight="bold">6.5 cm</text>
        <text x="215" y="46" fontFamily="sans-serif" fontSize="10" fill={TEXT_SECONDARY}>Cualquier billete</text>
        <text x="215" y="60" fontFamily="sans-serif" fontSize="10" fill={TEXT_SECONDARY}>mexicano mide</text>
        <text x="215" y="80" fontFamily="sans-serif" fontSize="13" fill={TEXT_PRIMARY} fontWeight="bold">6.5 cm de ancho</text>
        <text x="215" y="96" fontFamily="sans-serif" fontSize="9.5" fill={TEXT_SECONDARY}>Apóyalo en el canto</text>
        <text x="215" y="108" fontFamily="sans-serif" fontSize="9.5" fill={TEXT_SECONDARY}>para estimar el grosor</text>
      </svg>
    </div>
  );
}
