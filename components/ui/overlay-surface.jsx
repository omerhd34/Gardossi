import {
 mediaOverlaySurfaceClass,
 mediaOverlaySurfaceStyle,
 OVERLAY_SURFACE_COLOR,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export { OVERLAY_SURFACE_COLOR };

export function OverlaySurface({
 as: Comp = "span",
 className,
 style,
 children,
 ...props
}) {
 return (
  <Comp
   className={cn(mediaOverlaySurfaceClass, className)}
   style={{ ...mediaOverlaySurfaceStyle, ...style }}
   {...props}
  >
   {children}
  </Comp>
 );
}
