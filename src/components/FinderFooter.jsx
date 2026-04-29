import { VERDE, BORDER_REST, BG_APP, TEXT_PRIMARY, TEXT_SECONDARY } from '../design-tokens/tokens';
import { ProgressBar } from './ProgressBar';
import { PrimaryButton } from './PrimaryButton';

export function FinderFooter({ onBack, onNext, disabled, step, totalSteps, label = 'CONTINUAR' }) {
  return (
    <div style={{
      position: 'sticky',
      bottom: 0,
      background: BG_APP,
      borderTop: `1px solid ${BORDER_REST}`,
      boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
      padding: '12px 20px 28px',
      zIndex: 10,
    }}>
      <div style={{ marginBottom: 12 }}>
        <ProgressBar step={step} total={totalSteps} />
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {onBack ? (
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px 4px', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke={TEXT_SECONDARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="10" x2="16" y2="10" stroke={TEXT_SECONDARY} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{
              fontFamily: "'Open Sans', sans-serif", fontSize: 13,
              fontWeight: 600, color: TEXT_SECONDARY,
            }}>
              Atrás
            </span>
          </button>
        ) : null}

        <PrimaryButton onClick={onNext} disabled={disabled} style={{ flex: 1, width: 'auto' }}>
          {label}
        </PrimaryButton>
      </div>
    </div>
  );
}
