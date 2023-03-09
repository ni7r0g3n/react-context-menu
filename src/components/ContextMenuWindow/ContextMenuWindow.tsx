import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ContextMenuWindowProps, ContextMenuItem } from '../../types';
import './ContextMenuWindow.css'


const ContextMenuWindow = (props: ContextMenuWindowProps) => {


    const container = useRef(null)
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const handleClick = () => {
            setOpen(false)
            if (props.animated === false)
                props.onTransitionEnd()
        }
        setOpen(true)
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    
    const menuRowStyle = (index): React.CSSProperties => {
        if (index === 0)
            return {borderTopRightRadius: props.menuStyle?.row?.borderRadius || 10, borderTopLeftRadius: props.menuStyle?.row?.borderRadius || 10}
        if (index === props.items.length - 1)
            return {borderBottomRightRadius: props.menuStyle?.row?.borderRadius || 10, borderBottomLeftRadius: props.menuStyle?.row?.borderRadius || 10}
        return {}
    }

    const cleanStyles = () => {
        const styles = props.menuStyle?.row
        if (!styles)
            return {}
        delete styles.borderRadius
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
    }

    const onMouseLeave = () => {
        setHovering(-1)
    }

    const hoveringStyle = (item, index) => {
        if (hovering === index)
            return item.hoverStyle
        return {}
    }

    const containerStyle = useMemo(() => {
        if (props.animated === false)
            return 'container'
        return 'container' + (open ? ' animated' : ' animatedOut')
    }, [open])

    const getAnimationFromProps = (direction: 'In' | 'Out') => {
        return (props.animated?.animation ?? 'zoom')  + direction
    }

    const animationStyle = useMemo(() => {
        if (props.animated === false)
            return {}
        return {animationName: open ? getAnimationFromProps('In') : getAnimationFromProps('Out'), animationDuration: props.animated?.duration ?? '0.2s'}
    }, [open])

    const transitionEnd = () => {
        if (!open)
            props.onTransitionEnd()
    }

    return (
    <div className={containerStyle} ref={container} onAnimationEnd={transitionEnd} style={{top: screenSize.height, left: screenSize.width, ...animationStyle, ...props.menuStyle?.container}}>
        {props.items.map((item: ContextMenuItem, index) => {
            return (
                <div key={index} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave} className={'menuRow'} onClick={item.onClick} style={{...menuRowStyle(index), ...cleanStyles(), ...item.style, ...hoveringStyle(item, index)}}>
                    <div>{item.label}</div>
                </div>
            )
        })}
    </div>
    )
}

export default ContextMenuWindow;