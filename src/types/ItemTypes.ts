import { ContextMenuItem, Variant } from "./ContextMenuTypes";

interface ItemProps {
    item: ContextMenuItem;
    index: number;
    className?: string;
    variant?: Variant;
    style?: {
        normal: React.CSSProperties,
        hover?: React.CSSProperties
    };  
    onItemHoverIn?: (item: ContextMenuItem) => void;
    onItemHoverOut?: (item: ContextMenuItem) => void;
}


export { ItemProps };