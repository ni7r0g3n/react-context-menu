
import React, {useState, useEffect} from "react";
import { ContextMenuProps } from "../../types";
import ContextMenuWindow from "../ContextMenuWindow/ContextMenuWindow";
import './ContextMenu.css'

const ContextMenu = (props: ContextMenuProps) => {
    const [show, setShow] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShow(true);
        setMousePosition({x: e.pageX, y: e.pageY});
    }

    useEffect(() => {
        const handleClick = () => setShow(false);
        window.addEventListener("click", handleClick);
        return () => {
          window.removeEventListener("click", handleClick);
        };
      }, []);

    return (
        <div onContextMenu={onContextMenu}>
            {props.children}
            {show ? <ContextMenuWindow position={mousePosition} adaptive={props.adaptive} items={props.items} menuStyle={props.menuStyle}/> : null}
        </div>
    )
}

export default ContextMenu;