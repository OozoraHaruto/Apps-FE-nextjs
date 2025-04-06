import type * as CSS from 'csstype';
import { WAImageLoading } from "../..";

export declare type WAAvatarShape = "circle" | "square" | "rounded";

interface WAAvatarCSSProperties extends CSS.Properties, CSS.PropertiesHyphen {
  "--background-color"?: string;
  "--text-color"?: string;
  "--size"?: string;
}

export interface WAComponentAvatarProps {
  image?: string;
  label?: string;
  initials?: string;
  loading?: WAImageLoading;
  shape?: WAAvatarShape;
  size?: string;
  textColor?: string;
  backgroundColor?: string;
  children?: any;
}

export default class WAComponentAvatar extends React.Component<WAComponentAvatarProps> { }