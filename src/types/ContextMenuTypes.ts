

interface ContextMenuProps {
    items: ContextMenuItem[];
    children: React.ReactNode;
    classNames?: string[];
    adaptive?: boolean;
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