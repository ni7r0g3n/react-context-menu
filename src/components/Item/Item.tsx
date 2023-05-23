import React, { useCallback, useMemo, useState } from 'react'
import { ItemProps } from '../../types/ItemTypes';
import styles from './Item.module.css';

function Item(props: ItemProps) {
    const [hovering, setHovering] = useState(false);

    function fireEvent (event) {
        if (props[event])
            props[event](props.item)
    }

    const onMouseEnter = useCallback(() => {
        setHovering(true)
        fireEvent('onItemHoverIn')
    }, [])

    const onMouseLeave = useCallback(() => {
        fireEvent('onItemHoverOut')
        setHovering(false)
    }, [])

    const onKeyDown = useCallback((event) => {
        if (event.key === 'Enter' || event.code === 'Space') {
            onClick(event)
        }
    }, [])


    const onClick = useCallback((event) => {
        if (props.item.disabled){
            event.preventDefault()
            event.stopPropagation()
            return
        }
        props.item.onClick()
    }, [])

    const cleanStyles = useCallback(() => {
        const styles = props.style
        if (!styles)
            return {}
        delete styles.normal.borderRadius
        return styles
    }, [props.style])


    const hoveringStyle = useCallback(() => {
        if (hovering)
            return {...props.style?.hover, ...props.item.hoverStyle}
        return {}
    }, [hovering])

    const rowClassName = useMemo(() => {
        const disabled = props.item.disabled ? (props.item.disabledClassName ?? styles.disabledRow) : '';
        const className = props.className ?? (styles[props.variant?.theme + "MenuRow"] ?? styles.lightMenuRow);
        const itemClassName = props.item.className ?? '';
        return `${styles.menuRow} ${disabled} ${className} ${itemClassName}`
    }, [props.className, props.item.className, props.item.disabled, props.item.disabledClassName, props.variant?.theme])


  return (
    <div 
        key={props.index}
        role='menuitem' 
        onMouseEnter={() => onMouseEnter()} 
        onMouseLeave={onMouseLeave} 
        className={rowClassName} 
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
        style={{...cleanStyles(), ...props.item.style, ...hoveringStyle()}}
    >
        <div 
            aria-description={props.item.label}
        >{props.item.label}</div>
    </div>
  )
}

export default Item