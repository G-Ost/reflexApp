import * as React from 'react';
import { StyleContext } from "../Contexts/SyleContext"

function Circle(props) {
    const { sizeUnit } = React.useContext(StyleContext);
    const buttonStyle = { height: sizeUnit * 0.23, width: sizeUnit * 0.23, fontSize: sizeUnit / 15, position: "absolute", visibility: "hidden", borderWidth: sizeUnit / 120, marginLeft: -sizeUnit * 0.115, marginTop: -sizeUnit * 0.115 }

    function onClick() {
        let result = props.onClickFunction(props.circleValue);
        if (result === true) {
            props.backToStartingState();
        }

    }

    return (
        <button onClick={() => { onClick() }} ref={props.givenRef} className={"circles"} style={buttonStyle}>{props.circleValue}</button>
    )
}

export default Circle;