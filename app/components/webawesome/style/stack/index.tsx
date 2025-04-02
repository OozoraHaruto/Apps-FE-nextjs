import { CSSProperties, ReactElement, ReactNode } from "react";

import { WAAlignItems, WAGap } from "..";

export interface WAStyleStackProps {
  gap?: WAAlignItems;
  alignItems?: WAGap;
  style?: CSSProperties | undefined;
  children: ReactNode | ReactElement;
}

export function WAStyleStack({
  gap,
  alignItems,
  style = {},
  children,
}: WAStyleStackProps) {
  return (
    <div className={ `wa-stack ${gap} ${alignItems}` } style={ style }>
      { children }
    </div >
  )
}

export default WAStyleStack;