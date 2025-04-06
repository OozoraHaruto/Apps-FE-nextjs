import { WAIconVariant, WAIconFamily } from "../..";

export interface WAComponentIconProps {
  name: string;
  slot: string;
  family?: WAIconFamily | undefined;
  variant?: WAIconVariant | undefined;
  src?: string | undefined;
  fixedWidth?: string | undefined;
  label?: string | undefined;
  library?: string | undefined;
}

export default class WAComponentIcon extends React.Component<WAComponentIconProps> { }