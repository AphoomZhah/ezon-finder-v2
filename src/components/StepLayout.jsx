import { Screen } from './Screen';
import { AppHeader } from './AppHeader';
import { FinderFooter } from './FinderFooter';
import { StepMeta } from './StepMeta';
import { SURFACE } from '../design-tokens/tokens';

/**
 * StepLayout — shared shell for all question screens.
 *
 * Props:
 *  stepMeta  — { currentStep, totalSteps, stepName }
 *              When provided, renders <StepMeta /> just below the AppHeader
 *              and above the screen's own children.
 */
export function StepLayout({ children, dir = 'forward', footerProps, stepMeta, showBack = true, onHelp }) {
  return (
    <Screen dir={dir} style={{ background: SURFACE }} className="finder-step-layout">
      <AppHeader
        onBack={footerProps?.onBack}
        showBack={showBack}
        onHelp={onHelp}
      />
      <div style={{ flex: 1, paddingBottom: 120 }}>
        {stepMeta && (
          <div style={{ padding: '0 24px' }}>
            <StepMeta
              currentStep={stepMeta.currentStep}
              totalSteps={stepMeta.totalSteps}
              stepName={stepMeta.stepName}
            />
          </div>
        )}
        {children}
      </div>
      <FinderFooter {...footerProps} />
    </Screen>
  );
}
