import { ProgressBar } from './ProgressBar';

export function StepHeader({ onBack, step, totalSteps = 6 }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px 0',
        marginBottom: 8,
      }}>
        <button onClick={onBack} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="6" y1="10" x2="16" y2="10" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <img src="/assets/main-logo.png" alt="EZON" style={{ height: 22, display: 'block' }} />
        <div style={{ width: 32 }} />
      </div>
      <div style={{ padding: '0 20px' }}>
        <ProgressBar step={step} total={totalSteps} />
      </div>
    </div>
  );
}
