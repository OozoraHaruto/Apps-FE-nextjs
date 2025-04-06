export declare type WAVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'inherit';
export declare type WAAppearance = 'accent' | 'filled' | 'outlined' | 'plain';
export declare type WASize = 'small' | 'medium' | 'large' | 'inherit';

export declare type WAIconFamily = "classic" | "sharp" | "duotone" | "brands";
export declare type WAIconVariant = "thin" | "light" | "regular" | "solid";

export declare type WAImageLoading = "eager" | "lazy";

export declare type WATooltipPlacement = "top" | "right" | "bottom" | "left";

export { default as WAAvatar } from './components/avatar';
export { default as WAButton } from './components/button';
export { default as WACard } from './components/card';
export { default as WACarousel } from './components/carousel';
export { default as WACarouselItem } from './components/carouselItem';
export { default as WACopyButton } from './components/copyButton';
export { default as WAIcon } from './components/icon';
export { default as WAIconButton } from './components/iconButton';

// Form
export { default as WACheckbox } from './form/checkbox';
export { default as WAInput } from './form/input';
export { default as WASelect } from './form/select';
export { default as WATextArea } from './form/textarea';

// Styles
export { default as WAStyleCluster } from './style/cluster';
export { default as WAStyleFlank } from './style/flank';
export { default as WAStyleGrid } from './style/grid';
export { default as WAStyleStack } from './style/stack';

// Custom
export { default as WASeeMore } from './custom/seeMore';
