import { CSSProperties } from "react";


interface ContextMenuProps extends ContextMenuEvents {
    items: ContextMenuItem[];
    children: React.ReactNode;
    adaptive?: boolean;
    animated?: {
        duration?: CSSProperties['animationDuration'];
        animation?: "zoom" | "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";
    } | boolean;
    menuStyle?: {
        container?: React.CSSProperties;
        row?: {
            normal: React.CSSProperties,
            hover?: React.CSSProperties
        };
    }
    menuClassName?:{
        container?: string,
        row?: string,
    }
    variant?: {
        opacity?: "solid" | "transparent";
        theme?: "light" | "dark";
        elevation?: "raised" | "flat";
    }
}
 
interface ContextMenuEvents {
    onOpen?: () => void;
    onAfterOpen?: () => void;
    onClose?: () => void;
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
    className?: string;
    disabled?: boolean;
    disabledClassName?: string;
}

interface mousePosition {
    x: number;
    y: number;
}

interface mousePositionWithOrigin extends mousePosition {
    origin: transformOrigin;
}

interface transformOrigin {
    x: 0 | 100;
    y: 0 | 100;
}


export type { ContextMenuProps, ContextMenuItem, mousePosition, transformOrigin, mousePositionWithOrigin }; 