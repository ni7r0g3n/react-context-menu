import React, { useCallback, useMemo, useState } from 'react'
import { ItemProps } from '../../types/ItemTypes';
import styles from './Item.module.css';

function Item(props: ItemProps) {
    const [hovering, setHovering] = useState(false);

    function fireEvent (event) {
        if (props[event])
            props[event](props.item)
    }

    function onMouseEnter() {
        setHovering(true)
        fireEvent('onItemHoverIn')
    }

    function onMouseLeave () {
        fireEvent('onItemHoverOut')
        setHovering(false)
    }

    function onClick(event) {
        if (props.item.disabled){
            event.preventDefault()
            event.stopPropagation()
            return
        }
        props.item.onClick()
    }

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
        onMouseEnter={() => onMouseEnter()} 
        onMouseLeave={onMouseLeave} 
        className={rowClassName} 
        onClick={onClick} 
        style={{...cleanStyles(), ...props.item.style, ...hoveringStyle()}}
    >
        <div>{props.item.label}</div>
    </div>
  )
}

export default Item