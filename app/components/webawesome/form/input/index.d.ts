export interface WAFormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string | undefined;
  hint?: string | undefined;
  type?: string | undefined;
  clearable?: boolean | undefined;
  autofocus?: boolean | undefined;
  required?: boolean | undefined;
  passwordToggle?: boolean | undefined;
  pill?: boolean | undefined;
  children?: any;
}

export default class WAFormInput extends React.Component<WAFormInputProps> { }