import { WAAppearance, WASize, WAVariant } from "../..";

export interface WAComponentButtonProps {
  variant?: WAVariant;
  appearance?: WAAppearance;
  size?: WASize;
  caret?: boolean;
  disabled?: boolean;
  loading?: boolean;
  pill?: boolean;
  type?: 'button' | 'submit' | 'reset';
  name?: string | undefined;
  value?: string | undefined;
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  rel?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: any;
}

export default class WAComponentButton extends React.Component<WAComponentButtonProps> { }