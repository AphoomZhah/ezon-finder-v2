export * from '../design-tokens/tokens';
import { TEXT_PRIMARY, TEXT_SECONDARY } from '../design-tokens/tokens';
export { Screen } from './Screen';
export { StepHeader } from './StepHeader';
export { StepLayout } from './StepLayout';
export { PhotoPlaceholder } from './PhotoPlaceholder';
export { HeroImage } from './HeroImage';
export { ProgressBar } from './ProgressBar';
export { PrimaryButton } from './PrimaryButton';
export { WhatsAppLink } from './WhatsAppLink';
export { AlertBox } from './AlertBox';
export { BillIllustration } from './BillIllustration';
export { AccessIcon } from './AccessIcon';
export { LockProductPlaceholder } from './LockProductPlaceholder';

export const headingStyle = {
  fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
  fontSize: 22, color: TEXT_PRIMARY, lineHeight: 1.2,
  marginBottom: 8, letterSpacing: '-0.01em',
};

export const subStyle = {
  fontFamily: "'Open Sans', sans-serif", fontSize: 13.5,
  color: TEXT_SECONDARY, lineHeight: 1.55, marginBottom: 4,
};
