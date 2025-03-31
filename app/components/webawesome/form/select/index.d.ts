import {WAComponentIconProps} from "../../components/icon";

export declare type WAAppearanceSelect = 'filled' | 'outlined';
export declare type WAAppearancePlacement = 'top' | 'bottom';

export interface WAComponentSelectOptionIcon extends WAComponentIconProps {
  slot?: string;
}

export interface WAComponentSelectOption {
  value: string;
  label: string;
  prefixIcon?: WAComponentSelectOptionIcon;
  suffixIcon?: WAComponentSelectOptionIcon;
  disabled?: boolean;
  defaultLabel?: string;
}

export interface WAComponentSelectProps {
  id: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: WAComponentSelectOption[];
  name?: string;
  size?: WASize;
  placeholder?: string;
  multiple?: boolean;
  maxOptionsVisible?: number;
  disabled?: boolean;
  clearable?: boolean;
  open?: boolean;
  hoist?: boolean;
  appearance?: WAAppearanceSelect;
  pill?: boolean;
  label?: string;
  placement?: WAAppearancePlacement;
  hint?: string;
  withLabel?: boolean;
  withHint?: boolean;
  required?: boolean;
  children?: React.ReactNode;
}

export default class WAComponentSelect extends React.Component<WAComponentSelectProps> { }