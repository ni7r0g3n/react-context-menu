import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ContextMenuWindowProps, ContextMenuItem } from '../../types';
import styles from './ContextMenuWindow.module.css'


const ContextMenuWindow = (props: ContextMenuWindowProps) => {

    const [open, setOpen] = useState(true)

    useEffect(() => {
        const handleClick = () => {
        setOpen(false)
        if (props.animated === false)
            props.onTransitionEnd()
        }
        window.addEventListener("click", handleClick);
        
        if (props.onAfterOpen)
            props.onAfterOpen()
        return () => {
            if (props.onClose)
                props.onClose()
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const cleanStyles = () => {
        const styles = props.menuStyle?.row
        if (!styles)
            return {}
        delete styles.normal.borderRadius
        return styles
    }

    const screenWidth = () => {
        if (props.adaptive === false)
            return props.position.x + document.documentElement.scrollLeft
        return adaptiveWidth()
    }

    const screenHeight = () => {
        if (props.adaptive === false)
            return props.position.y + document.documentElement.scrollTop
        return adaptiveHeight()
    }

    const adaptiveWidth = () => {
        return (props.position.x * 100)/document.documentElement.scrollWidth + 'vw'
    }

    const adaptiveHeight = () => {
        return (props.position.y * 100)/document.documentElement.scrollHeight + 'vh'
    }


    const screenSize = {width: screenWidth(), height: screenHeight()};
    const [hovering, setHovering] = useState(-1);


    const onMouseEnter = (index) => {
        setHovering(index)
        if (props.onItemHoverIn)
            props.onItemHoverIn(props.items[index])
    }

    const onMouseLeave = () => {
        if (props.onItemHoverOut)
            props.onItemHoverOut(props.items[hovering])
        setHovering(-1)
    }

    const hoveringStyle = (item, index) => {
        if (hovering === index)
            return {...props.menuStyle?.row?.hover, ...item.hoverStyle}
        return {}
    }
    
    const getAnimationFromProps = (direction: 'In' | 'Out') => {
        if (typeof props.animated != "boolean")
            return (props.animated?.animation ?? 'zoom')  + direction
        if (props.animated)
            return 'zoom' + direction
    }

    const originClassName = useMemo(() => {
        return `transformOrigin-${props.position?.origin.x}-${props.position?.origin.y}`
    }, [props.position?.origin.x, props.position?.origin.y])

    const composeDefaultVariants = () => {
        return `${styles[(props.variant?.theme ?? "light") + "-" + (props.variant?.opacity ?? "transparent")]} ${styles[props.variant?.elevation ?? "raised"]}`
    }

    const containerStyle = useMemo(() => {
        if (props.animated === false)
            return `${styles.container} ${props.menuClassName?.container ?? composeDefaultVariants()}`
        return `${styles['container']}  ${styles[originClassName]} ${styles[getAnimationFromProps(open ? "In" : "Out")]} ${props.menuClassName?.container ?? composeDefaultVariants()}`
    }, [open])


    const animationStyle = useMemo(() => {
        if (typeof props.animated != "boolean")
            return {animationDuration: props.animated?.duration ?? '0.2s'}
        if (props.animated)
            return {animationDuration: '0.2s'}
        return {}
    }, [open])

    const transitionEnd = () => {
        if (!open){
            if (props.onOutAnimationEnd)
                props.onOutAnimationEnd()
            props.onTransitionEnd()
            return;
        } 

        if (props.onInAnimationEnd)
            props.onInAnimationEnd()
        
    }

    const onClick = (item, event) => {
        if (item.disabled){
            event.preventDefault()
            event.stopPropagation()
            return
        }
        item.onClick()
    }

    return (
    <div ref={props.containerRef} className={containerStyle} onAnimationEnd={transitionEnd} style={{top: screenSize.height, left: screenSize.width, ...animationStyle, ...props.menuStyle?.container}}>
        {props.items.map((item: ContextMenuItem, index) => {
            return (
                <div key={index} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave} className={`${styles.menuRow} ${item.disabled ? (item.disabledClassName ?? styles.disabledRow) : ''} ${props.menuClassName?.row ?? (styles[props.variant?.theme + "MenuRow"])} ${item.className ?? ''}`} onClick={(event) => onClick(item, event)} style={{/*...menuRowStyle(index),*/ ...cleanStyles(), ...item.style, ...hoveringStyle(item, index)}}>
                    <div>{item.label}</div>
                </div>
            )
        })}
    </div>
    )
}

export default ContextMenuWindow;