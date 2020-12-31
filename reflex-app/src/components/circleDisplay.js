
import React from "react";
import utils from "../utils"


// Function to check which value of displayed numbers is the lowest
function findMin(array) {
    let thisArray = [...new Set(array)]
    let min = Math.min(...thisArray);
    let badIndex = thisArray.indexOf("");
    if (badIndex !== -1) {
        thisArray.splice(badIndex, 1)
        min = Math.min(...thisArray);
    }
    return min;
}


const CircleDisplay = props => {
    // This function will be used onClick during normal mode, if smallest number is clicked it diseappear, that is, number becomes ""
    function normalMode(clickedCircle) {
        if (props.numbers[clickedCircle - 1] === findMin(props.numbers)) {
            return (
                props.numbers[clickedCircle - 1] = "",
                props.setNumbers([...props.numbers])

            )

        }
    }
    // Function used onClick during survival mode, afert clicking on smallest number, number is being randomly replaced and additional time is added to the clock
    function survivalMode(clickedCircle) {
        if (props.numbers[clickedCircle - 1] === findMin(props.numbers)) {
            return (
                props.setScore(props.score + 1),
                props.pool.push(props.numbers[clickedCircle - 1]),
                props.setSurvivalTimer(props.survivalTimer + 0.25),
                props.numbers[clickedCircle - 1] = props.pool.splice(Math.floor(Math.random() * props.pool.length), 1)[0],
                props.setNumbers([...props.numbers])
            )

        }
        else
            // If clicked number is different than the lowest, player loses time
            props.setSurvivalTimer(props.survivalTimer - 1);
    }

    let gameModes = {
        normal: normalMode,
        survival: survivalMode
    };


    return (<div className="circles">
        {utils.range(1, props.count).map(circleId => (
            <svg key={circleId} overflow="visible" id={`svgCircle${circleId}`}>
                <circle id={`circle${circleId}`} cx={0} cy={0} r="40"
                    stroke="black"
                    fill="black"
                    onClick={(e) => {
                        let circleNumber = e.target.id[6];
                        switch (props.gameMode) {
                            case "normal": return gameModes.normal(circleNumber);
                            case "survival": return gameModes.survival(circleNumber);
                        }
                    }}
                />
            </svg>

        ))}
    </div>)
};

export default CircleDisplay;