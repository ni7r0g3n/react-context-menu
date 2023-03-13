import React, { CSSProperties } from "react";


interface ContextMenuProps extends ContextMenuEvents, ContextMenuControllerSetter {
    items: ContextMenuItem[];
    children: Array<ChildrenWithItems>;
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

interface ChildrenWithItems extends JSX.Element, JSX.IntrinsicElements {
    items: ContextMenuItem[];
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

interface ContextMenuControllerSetter {
    setController?: React.Dispatch<React.SetStateAction<ContextMenuController | undefined>>
}

interface ContextMenuController {
    open: (position: {x: number, y: number}) => void;
    close: () => void;
    clickItem: (item: number) => void;
}

interface ContextMenuItem {
    label: string | React.ReactNode;
    onClick: () => void; 
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
}


export type { ContextMenuProps, ContextMenuItem, ContextMenuController }; 