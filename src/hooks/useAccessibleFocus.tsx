import React, { useEffect, useState } from "react";

export default function useAccessibleFocus(items: any[]) {
    const [focused, setFocused] = useState(-1);
    const refs = items.map(() => React.createRef<HTMLDivElement>());

    function up(){
        setFocused((prev) => prev - 1 >= 0 ? prev - 1 : refs.length - 1);
    }

    function down(){
        setFocused((prev) => prev + 1 < refs.length ? prev + 1 : 0);
    }

    function handleKeyDown(event: KeyboardEvent) {
        event.preventDefault();

        if (event.key === "Tab") {
            down();
        }

        if (event.key === "ArrowDown") {
            down();
        }

        if (event.key === "ArrowUp") {
            up();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (focused >= 0 && focused < refs.length) {
            refs[focused].current?.focus();
        }
    }, [focused]);

    return refs;
}