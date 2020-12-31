import React from "react";


const MenuDisplay = props => {
    return (
        <div className="menu">
            <svg overflow="visible" id={`menuSvg`}>
                <circle id={`menuCircle`} cx={0} cy={0} r="140"
                    stroke="black"
                    fill="black"
                />
            </svg>
            <p id={`title`} style={{ visibility: props.visibility }}>
                REFLEX TRAINER
            </p>

            <button id={`startNormalButton`} style={{ visibility: props.visibility }} onClick={() => (props.setGameMode("normal"), props.gameStart("normal"))}>
                START NORMAL MODE
            </button>

            <button id={`startSurivalButton`} style={{ visibility: props.visibility }} onClick={() => (props.setGameMode("survival"), props.gameStart("survival"))} >
                START SURVIVAL MODE
            </button>

            <button id={`helpButton`} style={{ visibility: props.visibility }} onClick={() => props.showHelp1()}>
                HELP
            </button>

            <p id={`normalWinMessage`} style={{ visibility: props.visibilityNormalWin }}>
                CONGRATULATIONS!<br /><br />
                    Your time is: &nbsp; {props.solveTime}s
            </p>


            <p id={`survivalWinMessage`} style={{ visibility: props.visibilitySurvivalWin }}>
                Time's up!<br /><br />
                Your score: {props.score}
            </p>

            <button id={`backButton`} style={{ visibility: props.visibilityBackButton }} onClick={() => props.resetFunction()}>
                GO BACK
            </button>

            <p id={`clock`} style={{ visibility: props.clockVisibility }}>
                {props.timeMessage} {props.solveTime}s &nbsp; &nbsp; {props.scoreMessage} {props.score}
            </p>

            <p id={`helpMessage1`} style={{ visibility: props.visibilityHelp1 }}>
                NORMAL MODE:<br /><br /><br />
                Your job is to click the values in <br />
                 the circles in ascending order.<br /><br />
                Do it as fast as you can.<br /><br />
                <button id="helpArrow1" onClick={props.showHelp2}>&#x2192;</button>
            </p>

            <p id={`helpMessage2`} style={{ visibility: props.visibilityHelp2 }}>
                SURVIVAL MODE:<br /><br /><br />
                In this mode, time is limited and values<br />
                 are being continuously replenished. <br /><br />
                Wrong choices cost you time.<br />
                Correct ones result in extra time. <br /> <br />
                How many points can you score?<br />
                <button id="helpArrow2" onClick={props.showHelp1}>&#x2190;</button>
            </p>
        </div>
    )
}

export default MenuDisplay;

