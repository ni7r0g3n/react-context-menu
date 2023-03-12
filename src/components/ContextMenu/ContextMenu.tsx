
import React, {useState, useEffect} from "react";
import { ContextMenuProps } from "../../types";
import ContextMenuWindow from "../ContextMenuWindow/ContextMenuWindow";
import styles from './ContextMenu.module.css'

const ContextMenu = (props: ContextMenuProps) => {
    const [show, setShow] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        if (props.setController)
            props.setController(controller)
    }, [])

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        openMenu({x: e.pageX, y: e.pageY})
    }

    const openMenu = (position: {x: number, y: number}) => {
        setShow(true)
        setMousePosition(position)
        if (props.onOpen)
            props.onOpen();
    }

    const onTransitionEnd = () => {
        setShow(false)
        if (props.onBeforeClose)
            props.onBeforeClose(); 
    }

    const controller = {
        close: () => {
            onTransitionEnd()
        },
        open: (position: {x: number, y: number}) => {
            openMenu(position)
        },
        clickItem: (index: number) => {
            if (props.items[index].onClick)
                props.items[index].onClick()
        },
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