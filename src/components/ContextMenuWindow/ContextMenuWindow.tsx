import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ContextMenuWindowProps, ContextMenuItem } from '../../types';
import styles from './ContextMenuWindow.module.css'
import Item from '../Item/Item';
import useAccessibleFocus from '../../hooks/useAccessibleFocus';
import { useLang } from '../../hooks/useLang';


export default function ContextMenuWindow (props: ContextMenuWindowProps) {
    
    const [open, setOpen] = useState(true)
    const itemsRefs = useAccessibleFocus(props.items)
    const lang = useLang();

    function fireEvent (event, item?: ContextMenuItem) {
        if (props[event])
            props[event](item)
    }

    const handleClick = useCallback(() => {     
        setOpen(false)
        if (props.animated === false)
            props.onTransitionEnd()
    }, [])

    const onKeyUp = useCallback((event) => {
        event.preventDefault()
        if (event.key === 'Escape'){
            handleClick()
        }
    }, [])

    useEffect(() => {
        window.addEventListener("click", handleClick);
        window.addEventListener("keyup", onKeyUp);
        
        fireEvent('onAfterOpen')
        return () => {
            fireEvent('onClose')
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, []);

    const adaptiveWidth = () => `${(props.position.x * 100)/document.documentElement.scrollWidth}vw`

    const adaptiveHeight = () => `${(props.position.y * 100)/document.documentElement.scrollHeight}vh`
    
    const screenWidth = useCallback(() => {
        if (props.adaptive === false)
            return props.position.x + document.documentElement.scrollLeft
        return adaptiveWidth()
    }, [props.adaptive])

    const screenHeight = useCallback(() => {
        if (props.adaptive === false)
            return props.position.y + document.documentElement.scrollTop
        return adaptiveHeight()
    }, [props.adaptive])



    const screenSize = {width: screenWidth(), height: screenHeight()};
    
    function getAnimationFromProps(direction: 'In' | 'Out') {
        if (typeof props.animated !== "boolean")
            return (props.animated?.animation ?? 'zoom')  + direction
        if (props.animated)
            return `zoom${direction}`
    }

    const originClassName = useMemo(() => {
        return `transformOrigin-${props.position?.origin.x}-${props.position?.origin.y}`
    }, [props.position?.origin.x, props.position?.origin.y])

    const composeDefaultVariants = useCallback(() => {
        return `${styles[`${(props.variant?.theme ?? "light")}-${(props.variant?.opacity ?? "transparent")}`]} ${styles[props.variant?.elevation ?? "raised"]}`
    }, [props.variant])

    const containerStyle = useMemo(() => {
        if (props.animated === false)
            return `${styles.container} ${props.menuClassName?.container ?? composeDefaultVariants()}`
        return `${styles['container']}  ${styles[originClassName]} ${styles[getAnimationFromProps(open ? "In" : "Out")]} ${props.menuClassName?.container ?? composeDefaultVariants()}`
    }, [open])


    const animationStyle = useMemo(() => {
        if (typeof props.animated !== "boolean")
            return {animationDuration: props.animated?.duration ?? '0.2s'}
        if (props.animated)
            return {animationDuration: '0.2s'}
        return {}
    }, [open])

    function transitionEnd () {
        if (!open){
            fireEvent('onOutAnimationEnd')
            props.onTransitionEnd()
            return;
        } 

        fireEvent('onInAnimationEnd')
    }

    return (
    <div 
        ref={props.containerRef} 
        className={containerStyle} 
        onAnimationEnd={transitionEnd}
        role='menu'
        aria-label={lang.contextmenu}
        style={
            {
                top: screenSize.height, 
                left: screenSize.width, 
                ...animationStyle, 
                ...props.menuStyle?.container
            }
        }>
        {props.items.map((item: ContextMenuItem, index) => {
            return (
                <Item 
                    item={item} 
                    key={index}
                    index={index} 
                    itemRef={itemsRefs[index]}
                    className={props.menuClassName?.row} 
                    style={props.menuStyle?.row} 
                    onItemHoverIn={props.onItemHoverIn} 
                    onItemHoverOut={props.onItemHoverOut} 
                    variant={props.variant} 
                />
            )
        })}
    </div>
    )
}