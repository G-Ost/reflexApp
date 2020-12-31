import utils from "../utils"
import React from "react";





// Numbers displayed inside the circles
const NumbersDisplay = props => {
    let numbers = props.numbers;
    return (
        <div className="numbers">
            {utils.range(1, props.count).map(numberId => (
                <button className={"number"}
                    key={numberId}
                    id={`number${numberId}`}
                    style={{ visibility: props.visibility }}
                >
                    {numbers[numberId - 1]}
                </button>
            ))}
        </div>
    )
}


export default NumbersDisplay;