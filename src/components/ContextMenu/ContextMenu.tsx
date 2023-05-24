
import React, {useState, useRef, useLayoutEffect, useCallback} from "react";
import { ContextMenuProps } from "../../types";
import ContextMenuWindow from "../ContextMenuWindow/ContextMenuWindow";
import { mousePosition, mousePositionWithOrigin } from "../../types/ContextMenuTypes";
import { useLang } from "../../hooks/useLang";

export default function ContextMenu (props: ContextMenuProps) {
    const [show, setShow] = useState(false);
    const [mousePosition, setMousePosition] = useState<mousePositionWithOrigin>({x: 0, y: 0, origin: {x: 0, y: 0}});
    const [contextMenuSize, setContextMenuSize] = useState({width: 0, height: 0})
    const windowContainerRef = useRef(null)
    const lang = useLang();

    useLayoutEffect(() => {
        if (windowContainerRef.current && show) {
            setContextMenuSize({
                width: windowContainerRef.current.offsetWidth,
                height: windowContainerRef.current.offsetHeight
            })
        }
    }, [show])
    
    const onContextMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            e.target.dispatchEvent(
                new MouseEvent(
                    'contextmenu', 
                    {
                        bubbles: true, 
                        cancelable: true, 
                        clientX: (
                            e.target as HTMLDivElement
                        ).offsetLeft - document.documentElement.scrollLeft, 
                        clientY: (
                            e.target as HTMLDivElement
                        ).offsetTop - document.documentElement.scrollTop
                    }
                )
            )
            
        }
    }, [])

    const onContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openMenu({x: e.clientX, y: e.clientY})
    }, [])

    
    function calculatePosition(position: mousePosition): mousePositionWithOrigin {
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


    function openMenu(position: mousePosition) {
        
        if (props.onOpen)
            props.onOpen();

        setMousePosition(calculatePosition(position))
        setShow(true)
    }

    const onTransitionEnd = useCallback(() => {
        setShow(false)
    }, [])

    return (
        <div aria-haspopup aria-label={lang['aria-label']} onKeyDown={onContextMenuKeyDown} onContextMenu={onContextMenu}>
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