import * as React from 'react';

const StyleContext = React.createContext();

function PassStyles(props) {

    const sizeUnit = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    const bigCircleRef = React.useRef(null);
    const value = { sizeUnit, changeElementPosition, bigCircleRef, changeElementSize };

    function changeElementPosition(xPos, yPos, t, el) {
        el.style.transform = ` translate3d(${xPos}px, ${yPos}px, 0) `;
        el.style.transition = ` ${t}s linear`;
    };

    function changeElementSize(newSize, el, t) {
        el.style.height = newSize + "px";
        el.style.width = newSize + "px";
        el.style.transition = ` ${t}s linear`;
    }



    return (
        <StyleContext.Provider value={value}>
            {props.children}
        </StyleContext.Provider>
    )
}

export { PassStyles, StyleContext }