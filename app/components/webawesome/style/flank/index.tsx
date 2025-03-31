import { ReactElement, ReactNode, CSSProperties } from "react";

import { WAAlignItems, WAGap } from "..";

export interface WAStyleFlankProps {
  end?: boolean;
  gap?: WAGap;
  alignItems?: WAAlignItems;
  children: ReactNode | ReactElement;
  style?: CSSProperties | undefined;
}

export function WAStyleFlank({
  end=false,
  gap,
  alignItems,
  children,
  style,
}: WAStyleFlankProps) {
  return (
    <div className={ `wa-flank:${end?"end":"start"} ${gap} ${alignItems}` } style={style}>
      { children }
    </div>
  )
}

export default WAStyleFlank;