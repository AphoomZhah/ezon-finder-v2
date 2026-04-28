import { Screen } from './Screen';
import { BG_APP, BORDER_REST } from '../design-tokens/tokens';

export function StepLayout({ children, cta, dir = 'forward' }) {
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {children}
      </div>
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: BG_APP,
        padding: '12px 20px 28px',
        borderTop: `1px solid ${BORDER_REST}`,
      }}>
        {cta}
      </div>
    </Screen>
  );
}
