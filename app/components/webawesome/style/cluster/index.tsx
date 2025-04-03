import { ReactElement, ReactNode } from "react";

import { WAAlignItems, WAGap } from "..";

export interface WAStyleClusterProps {
  gap?: WAGap;
  alignItems?: WAAlignItems;
  children: ReactNode | ReactElement;
}

export function WAStyleCluster({
  gap,
  alignItems,
  children
}: WAStyleClusterProps) {
  return (
    <div className={ `wa-cluster ${gap ?? ""} ${alignItems ?? ""}` }>
      { children }
    </div>
  )
}

export default WAStyleCluster;