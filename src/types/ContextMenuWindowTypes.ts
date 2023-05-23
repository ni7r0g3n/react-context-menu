import { ContextMenuProps } from "./ContextMenuTypes";

interface ContextMenuWindowProps extends Omit<ContextMenuProps, 'children'> {
    position: { x: number, y: number, origin: {
        x: 0 | 100,
        y: 0 | 100
    } }
    onTransitionEnd?: () => void
    containerRef?: React.RefObject<HTMLDivElement>
}

export type { ContextMenuWindowProps };