import type * as CSS from 'csstype';
import { ReactElement, ReactNode } from "react";


export interface WAStyleGridProps {
  minColumnSize?: string;
  children: ReactNode | ReactElement;
}

interface WAGridCSSProperties extends CSS.Properties, CSS.PropertiesHyphen {
  "--min-column-size"?: string;
}

export function WAStyleGrid({
  minColumnSize = "",
  children
}: WAStyleGridProps) {
  const style: WAGridCSSProperties = {}
  if (minColumnSize != "") {
    style[ "--min-column-size" ] = minColumnSize
  }

  return (
    <div className="wa-grid" style={ style }>
      { children }
    </div>
  )
}

export default WAStyleGrid;