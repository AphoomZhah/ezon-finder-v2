import { Screen } from './Screen';
import { BG_APP } from '../design-tokens/tokens';
import { FinderFooter } from './FinderFooter';

export function StepLayout({ children, dir = 'forward', footerProps }) {
  return (
    <Screen dir={dir} style={{ background: BG_APP }}>
      <div style={{ paddingBottom: 8 }}>
        {children}
      </div>
      <FinderFooter {...footerProps} />
    </Screen>
  );
}
