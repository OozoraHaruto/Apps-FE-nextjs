import { WATooltipPlacement } from "../..";

export interface WAComponentCopyButtonProps {
  value: string;
  copyLabel?: string | undefined;
  successLabel?: string | undefined;
  errorLabel?: string | undefined;
  disabled?: boolean;
  tooltipPlacement?: WATooltipPlacement;
  children?: ReactNode | ReactElement;
}

export default class WAComponentCopyButton extends React.Component<WAComponentCopyButtonProps> { }