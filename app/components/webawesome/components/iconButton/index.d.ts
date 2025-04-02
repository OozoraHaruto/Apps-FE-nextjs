import { WAIconFamily, WAIconVariant } from "../..";

export interface WAComponentIconProps {
  name: string;
  family?: WAIconFamily | undefined;
  variant?: WAIconVariant | undefined;
  src?: string | undefined;
  label?: string | undefined;
  library?: string | undefined;
  disabled?: boolean;
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default class WAComponentIcon extends React.Component<WAComponentIconProps> { }