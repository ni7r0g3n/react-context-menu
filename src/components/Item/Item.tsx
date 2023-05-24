import React, { useCallback, useMemo, useState } from 'react'
import { ItemProps } from '../../types/ItemTypes';
import styles from './Item.module.css';
import { useLang } from '../../hooks/useLang';

function Item(props: ItemProps) {
    const [hovering, setHovering] = useState(false);

    function fireEvent (event) {
        if (props[event])
            props[event](props.item)
    }

    const lang = useLang();

    const onMouseEnter = useCallback(() => {
        setHovering(true)
        fireEvent('onItemHoverIn')
    }, [])

    const onMouseLeave = useCallback(() => {
        fireEvent('onItemHoverOut')
        setHovering(false)
    }, [])
    
    const onClick = useCallback((event) => {
        if (props.item.disabled){
            event.preventDefault()
            event.stopPropagation()
            return
        }
        props.item.onClick()
    }, [])

    const onKeyDown = useCallback((event) => {
        if (event.key === 'Enter' || event.code === 'Space') {
            onClick(event)
        }
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
        const className = props.className ?? (styles[`${props.variant?.theme}MenuRow`] ?? styles.lightMenuRow);
        const itemClassName = props.item.className ?? '';
        return `${styles.menuRow} ${disabled} ${className} ${itemClassName}`
    }, [props.className, props.item.className, props.item.disabled, props.item.disabledClassName, props.variant?.theme])


  return (
    <div 
        key={props.index}
        role='menuitem'
        aria-label={lang.contextmenuitem}
        aria-disabled={props.item.disabled}
        ref={props.itemRef}
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave} 
        className={rowClassName} 
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
        style={{...cleanStyles(), ...props.item.style, ...hoveringStyle()}}
    >
        <div  
        >{props.item.label}</div>
    </div>
  )
}

export default Item