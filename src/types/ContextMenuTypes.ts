import { CSSProperties } from "react";


interface ContextMenuProps extends ContextMenuEvents {
    items: ContextMenuItem[];
    children: React.ReactNode;
    adaptive?: boolean;
    animated?: boolean & {
        duration?: CSSProperties['animationDuration'];
        animation?: "zoom" | "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";
    }
    menuStyle?: {
        container?: React.CSSProperties;
        row?: React.CSSProperties;
    }
}

interface ContextMenuEvents {
    onOpen?: () => void;
    onClose?: () => void;
    onAfterOpen?: () => void;
    onBeforeClose?: () => void;
    onItemHoverIn?: (item: ContextMenuItem) => void;
    onItemHoverOut?: (item: ContextMenuItem) => void;
    onInAnimationEnd?: () => void;
    onOutAnimationEnd?: () => void;
}

interface ContextMenuItem {
    label: string | React.ReactNode;
    onClick: () => void; 
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
}


export type { ContextMenuProps, ContextMenuItem };