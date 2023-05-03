
import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import { ContextMenuProps } from "../../types";
import ContextMenuWindow from "../ContextMenuWindow/ContextMenuWindow";
import styles from './ContextMenu.module.css'
import { mousePosition, mousePositionWithOrigin } from "../../types/ContextMenuTypes";

const ContextMenu = (props: ContextMenuProps) => {
    const [show, setShow] = useState(false);
    const [mousePosition, setMousePosition] = useState<mousePositionWithOrigin>({x: 0, y: 0, origin: {x: 0, y: 0}});
    const [contextMenuSize, setContextMenuSize] = useState({width: 0, height: 0})
    const windowContainerRef = useRef(null)

    useEffect(() => {
        if (props.setController)
            props.setController(controller)
    }, [])

    useLayoutEffect(() => {
        if (windowContainerRef.current && show) {
            setContextMenuSize({
                width: windowContainerRef.current.offsetWidth,
                height: windowContainerRef.current.offsetHeight
            })
        }
    }, [show])
            

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation()
        openMenu({x: e.clientX, y: e.clientY})
    }

    //use contextMenuSize to calculate if opening the context menu will make it go off screen, if so, open it to the left of the mouse
    const calculatePosition = (position: mousePosition): mousePositionWithOrigin => {
        var processedPosition = {...position, origin: {x: 0, y: 0}} as mousePositionWithOrigin
    
        if (processedPosition.x + contextMenuSize.width > window.innerWidth) {
            processedPosition.x = processedPosition.x - contextMenuSize.width
            processedPosition.origin.x = 100
        } else {
            processedPosition.origin.x = 0
        }
            
        if (processedPosition.y + contextMenuSize.height > window.innerHeight) {
            processedPosition.y = processedPosition.y - contextMenuSize.height
            processedPosition.origin.y = 100
        } else {
            processedPosition.origin.y = 0
        }
        return {...processedPosition}
    }


    const openMenu = (position: mousePosition) => {
        if (props.onOpen)
            props.onOpen();
        setMousePosition(calculatePosition(position))
        setShow(true)
    }

    const onTransitionEnd = () => {
        setShow(false)
    }

    const controller = {
        close: () => {
            onTransitionEnd()
        },
        open: (position: mousePosition) => {
            const processedPosition = calculatePosition({...position})
            openMenu(processedPosition)
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
                        containerRef={windowContainerRef} 
                        {...props}
                        /> : null}
        </div>
    )
}

export default ContextMenu;