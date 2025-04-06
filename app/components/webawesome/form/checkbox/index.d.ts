export declare type WAInputSize = 'small' | 'medium' | 'large' | 'inherit';
export interface WAFormCheckboxProps {
  id: string;
  onChange: Dispatch<SetStateAction<string>>;
  value?: string;
  size?: WAInputSize;
  hint?: string | undefined;
  style?: CSSProperties | undefined;
  children?: any;
}

export default class WAFormCheckbox extends React.Component<WAFormCheckboxProps> { }