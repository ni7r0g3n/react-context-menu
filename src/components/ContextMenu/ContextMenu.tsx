
import React, {useState, useEffect} from "react";
import { ContextMenuProps } from "../../types";
import ContextMenuWindow from "../ContextMenuWindow/ContextMenuWindow";
import './ContextMenu.css'

const ContextMenu = (props: ContextMenuProps) => {
    const [show, setShow] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShow(true);
        setMousePosition({x: e.pageX, y: e.pageY});
        if (props.onOpen)
            props.onOpen();
    }

    const onTransitionEnd = () => {
        setShow(false)
        if (props.onBeforeClose)
            props.onBeforeClose(); 
    }

    return (
        <div onContextMenu={onContextMenu}>
            {props.children}
            {show ? <ContextMenuWindow 
                        position={mousePosition} 
                        onTransitionEnd={onTransitionEnd} 
                        {...props}
                        /> : null}
        </div>
    )
}

export default ContextMenu;