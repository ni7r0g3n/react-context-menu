import { CSSProperties } from "react";


interface ContextMenuProps {
    items: ContextMenuItem[];
    children: React.ReactNode;
    classNames?: string[];
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

interface ContextMenuItem {
    label: string | React.ReactNode;
    onClick: () => void; 
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
}


export type { ContextMenuProps, ContextMenuItem };