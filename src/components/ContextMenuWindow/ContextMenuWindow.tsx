import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ContextMenuWindowProps, ContextMenuItem } from '../../types';
import styles from './ContextMenuWindow.module.css'


const ContextMenuWindow = (props: ContextMenuWindowProps) => {


    const container = useRef(null)
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const handleClick = () => {
            console.log("click")
            setOpen(false)
            if (props.animated === false)
                props.onTransitionEnd()
        }
        setOpen(true)
        window.addEventListener("click", handleClick);
        if (props.onAfterOpen)
            props.onAfterOpen()
        return () => {
            if (props.onClose)
                props.onClose()
            window.removeEventListener("click", handleClick);
        };
    }, []);
    
    const menuRowStyle = (index): React.CSSProperties => {
        if (index === 0)
            return {borderTopRightRadius: props.menuStyle?.row?.normal.borderRadius || 7, borderTopLeftRadius: props.menuStyle?.row?.normal.borderRadius || 7}
        if (index === props.items.length - 1)
            return {borderBottomRightRadius: props.menuStyle?.row?.normal.borderRadius || 7, borderBottomLeftRadius: props.menuStyle?.row?.normal.borderRadius || 7}
        return {}
    }

    const cleanStyles = () => {
        const styles = props.menuStyle?.row
        if (!styles)
            return {}
        delete styles.normal.borderRadius
        return styles
    }

    const screenWidth = () => {
        if (props.adaptive === false)
            return props.position.x
        return adaptiveWidth()
    }

    const screenHeight = () => {
        if (props.adaptive === false)
            return props.position.y
        return adaptiveHeight()
    }

    const adaptiveWidth = () => {
        return (props.position.x * 100)/window.innerWidth + 'vw'
    }

    const adaptiveHeight = () => {
        return (props.position.y * 100)/window.innerHeight + 'vh'
    }


    const [screenSize, setScreenSize] = useState({width: screenWidth(), height: screenHeight()});
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
        return (props.animated?.animation ?? 'zoom')  + direction
    }

    const containerStyle = useMemo(() => {
        if (props.animated === false)
            return styles.container
        return `${styles.container} ${styles[(props.variant?.theme ?? "light") + "-" + (props.variant?.opacity ?? "transparent")]} ${styles[props.variant?.elevation ?? "raised"]} ${styles[getAnimationFromProps(open ? "In" : "Out")]}`
    }, [open])


    const animationStyle = useMemo(() => {
        if (props.animated === false)
            return {}
        return {animationDuration: props.animated?.duration ?? '0.2s'}
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

    return (
    <div className={containerStyle} ref={container} onAnimationEnd={transitionEnd} style={{top: screenSize.height, left: screenSize.width, ...animationStyle, ...props.menuStyle?.container}}>
        {props.items.map((item: ContextMenuItem, index) => {
            return (
                <div key={index} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave} className={styles.menuRow} onClick={item.onClick} style={{...menuRowStyle(index), ...cleanStyles(), ...item.style, ...hoveringStyle(item, index)}}>
                    <div>{item.label}</div>
                </div>
            )
        })}
    </div>
    )
}

export default ContextMenuWindow;