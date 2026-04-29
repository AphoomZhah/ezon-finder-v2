export * from '../design-tokens/tokens';
import { TEXT_PRIMARY, TEXT_SECONDARY } from '../design-tokens/tokens';
export { Screen } from './Screen';
export { AppHeader } from './AppHeader';
export { StepHeader } from './StepHeader';
export { StepLayout } from './StepLayout';
export { FinderFooter } from './FinderFooter';
export { OptionCardGrid } from './OptionCardGrid';
export { PhotoPlaceholder } from './PhotoPlaceholder';
export { HeroImage } from './HeroImage';
export { ProgressBar } from './ProgressBar';
export { PrimaryButton } from './PrimaryButton';
export { WhatsAppLink } from './WhatsAppLink';
export { WhatsAppCTA } from './WhatsAppCTA';
export { AlertBox } from './AlertBox';
export { BillIllustration } from './BillIllustration';
export { AccessIcon } from './AccessIcon';
export { LockProductPlaceholder } from './LockProductPlaceholder';

export const headingStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: 28,
  color: TEXT_PRIMARY,
  lineHeight: 1.15,
  marginBottom: 12,
  letterSpacing: '-0.02em',
};

export const subStyle = {
  fontFamily: "'Open Sans', sans-serif",
  fontSize: 14,
  color: TEXT_SECONDARY,
  lineHeight: 1.55,
  marginBottom: 28,
  maxWidth: '32ch',
};
