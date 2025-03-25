import { WASize } from "../..";

export interface WAComponentCardProps {
  size?: WASize;
  withHeader?: boolean;
  withImage?: boolean;
  withFooter?: boolean;
  className?: string;
  overview?: boolean;
  children: any;
}

export default class WAComponentCard extends React.Component<WAComponentCardProps> { }