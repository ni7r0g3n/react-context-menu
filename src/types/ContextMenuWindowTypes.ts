import { CSSProperties, Dispatch, SetStateAction } from "react";
import { ContextMenuItem } from "./ContextMenuTypes";

interface ContextMenuWindowProps {
    items: ContextMenuItem[]
    position: { x: number, y: number }
    adaptive?: boolean
    animated?: {
        duration?: CSSProperties['animationDuration'];
        animation?: "zoom" | "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";
    } & boolean
    onTransitionEnd?: () => void
    menuStyle?: {
        container?: React.CSSProperties;
        row?: React.CSSProperties;
    },
}

export type { ContextMenuWindowProps };