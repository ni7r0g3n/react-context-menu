import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ContextMenuWindowProps, ContextMenuItem } from '../../types';
import './ContextMenuWindow.css'


const ContextMenuWindow = (props: ContextMenuWindowProps) => {

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

    const logAndReturn = (value) => {
            console.log({value})
            return value
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

    return (
    <div className='container' style={{top: screenSize.height, left: screenSize.width, ...props.menuStyle?.container}}>
        {props.items.map((item: ContextMenuItem, index) => {
            return (
                <div key={index} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave} className={'menuRow'} onClick={item.onRightClick} style={{...menuRowStyle(index), ...cleanStyles(), ...item.style, ...hoveringStyle(item, index)}}>
                    <div>{item.label}</div>
                </div>
            )
        })}
    </div>
    )
}

export default ContextMenuWindow;