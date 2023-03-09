import { CSSProperties, Dispatch, SetStateAction } from "react";
import { ContextMenuItem, ContextMenuProps } from "./ContextMenuTypes";

interface ContextMenuWindowProps extends Omit<ContextMenuProps, 'children'> {
    position: { x: number, y: number }
    onTransitionEnd?: () => void
}

export type { ContextMenuWindowProps };