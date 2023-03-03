import { ContextMenuItem } from "./ContextMenuTypes";

interface ContextMenuWindowProps {
    items: ContextMenuItem[]
    position: { x: number, y: number }
    adaptive?: boolean
    menuStyle?: {
        container?: React.CSSProperties;
        row?: React.CSSProperties;
    }
}

export type { ContextMenuWindowProps };