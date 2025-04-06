export declare type WAInputSize = 'small' | 'medium' | 'large' | 'inherit';
export interface WAFormInputProps {
  id: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  size?: WAInputSize;
  placeholder?: string | undefined;
  label?: string;
  hint?: string | undefined;
  type?: string | undefined;
  clearable?: boolean | undefined;
  autofocus?: boolean | undefined;
  required?: boolean | undefined;
  passwordToggle?: boolean | undefined;
  pill?: boolean | undefined;
  style?: CSSProperties | undefined;
  children?: any;
}

export default class WAFormInput extends React.Component<WAFormInputProps> { }