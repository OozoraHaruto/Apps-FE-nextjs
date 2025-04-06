export declare type WACarouselOrientation = "horizontal" | "vertical";

export interface WAComponentCarouselProps {
  loop?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  slidesPerPage?: number;
  slidesPerMove?: number;
  orientation?: WACarouselOrientation;
  mouseDragging?: boolean;
  aspectRatio?: string;
  children?: any;
}

export default class WAComponentCarousel extends React.Component<WAComponentCarouselProps> { }