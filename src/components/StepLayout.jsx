import { Screen } from './Screen';
import { AppHeader } from './AppHeader';
import { FinderFooter } from './FinderFooter';
import { SURFACE } from '../design-tokens/tokens';

export function StepLayout({ children, dir = 'forward', footerProps, showBack = true, onHelp }) {
  return (
    <Screen dir={dir} style={{ background: SURFACE }}>
      <AppHeader
        onBack={footerProps?.onBack}
        showBack={showBack}
        onHelp={onHelp}
      />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <FinderFooter {...footerProps} />
    </Screen>
  );
}
