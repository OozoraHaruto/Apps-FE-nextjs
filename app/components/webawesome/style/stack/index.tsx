import { ReactElement, ReactNode, CSSProperties } from "react";

import { WAAlignItems, WAGap } from "..";

export interface WAStyleStackProps {
  gap?: WAAlignItems;
  alignItems?: WAGap;
  children: ReactNode | ReactElement;
  style?: CSSProperties | undefined
}

export function WAStyleStack({
  gap,
  alignItems,
  children
}: WAStyleStackProps) {
  return (
    <div className={ `wa-stack ${gap} ${alignItems}` }>
      { children }
    </div>
  )
}

export default WAStyleStack;