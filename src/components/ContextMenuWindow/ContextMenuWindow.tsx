import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ContextMenuWindowProps, ContextMenuItem } from '../../types';
import styles from './ContextMenuWindow.module.css'
import Item from '../Item/Item';


export default function ContextMenuWindow (props: ContextMenuWindowProps) {
    
    const [open, setOpen] = useState(true)
 
    function fireEvent (event, item?: ContextMenuItem) {
        if (props[event])
            props[event](item)
    }

    function handleClick() {     
        setOpen(false)
        if (props.animated === false)
            props.onTransitionEnd()
    }

    useEffect(() => {
        window.addEventListener("click", handleClick);
        
        fireEvent('onAfterOpen')
        return () => {
            fireEvent('onClose')
            window.removeEventListener("click", handleClick);
        };
    }, []);

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

    const adaptiveWidth = () => (props.position.x * 100)/document.documentElement.scrollWidth + 'vw'

    const adaptiveHeight = () => (props.position.y * 100)/document.documentElement.scrollHeight + 'vh'


    const screenSize = {width: screenWidth(), height: screenHeight()};
    
    const getAnimationFromProps = useCallback((direction: 'In' | 'Out') => {
        if (typeof props.animated != "boolean")
            return (props.animated?.animation ?? 'zoom')  + direction
        if (props.animated)
            return 'zoom' + direction
    }, [props.animated])

    const originClassName = useMemo(() => {
        return `transformOrigin-${props.position?.origin.x}-${props.position?.origin.y}`
    }, [props.position?.origin.x, props.position?.origin.y])

    const composeDefaultVariants = useCallback(() => {
        return `${styles[(props.variant?.theme ?? "light") + "-" + (props.variant?.opacity ?? "transparent")]} ${styles[props.variant?.elevation ?? "raised"]}`
    }, [props.variant])

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

    function transitionEnd() {
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