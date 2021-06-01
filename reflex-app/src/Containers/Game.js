import * as React from 'react';
import { StyleContext } from "../Contexts/SyleContext"
import CircleBoard from "./CircleBoard"
import backArrow from "../Images/backArrow.png"
import backArrowHover from "../Images/backArrowHover.png"
function Game(props) {
    const [circleValues, setCircleValues] = React.useState([])
    const [isGameWon, setIsGameWon] = React.useState(false)
    // Timer's initial value includes additional time for animations
    const [timer, setTimer] = React.useState(props.gameMode === "normal" ? -1 : 11);
    const [score, setScore] = React.useState(0);
    const { sizeUnit, bigCircleRef, changeElementSize, changeElementPosition } = React.useContext(StyleContext);

    const timeInterval = React.useRef(0);
    const backArrowRef = React.useRef(null);


    React.useMemo(() => {
        setCircleValues(drawRandomNumbers());
    }, [])

    React.useEffect(
        () => {
            timeInterval.current = setInterval(() => { setTimer(props.gameMode === "normal" ? timer + 0.1 : timer - 0.1) }, 100);
            return () => clearInterval(timeInterval.current);
        }, [timer, props.gameMode]);

    React.useEffect(() => {
        if (props.gameMode === "survival" && timer < 0) {
            gameOver();
        }
    })


    function drawRandomNumbers() {
        let numberHolder = [];
        let numberPool = Array.from(Array(100).keys());
        for (let i = 0; i < 9; i++) {
            let drawnIndex = Math.floor(Math.random() * numberPool.length);
            numberHolder.push(numberPool[drawnIndex]);
            numberPool.splice(drawnIndex, 1);
        };
        return numberHolder;
    };


    function circleClickNormalMode(circleValue) {
        const currentValues = [...circleValues].filter(function (x) {
            return x !== null;
        });
        if (circleValue === Math.min(...currentValues)) {
            const holderValues = [...circleValues];
            holderValues[holderValues.indexOf(circleValue)] = null;
            setCircleValues(holderValues);
        }
        if (currentValues.length === 1) {
            gameOver();
            return true;
        }
        else {
            return false;
        }
    }

    function circleClickSurvivallMode(circleValue) {
        if (circleValue === Math.min(...circleValues)) {
            setCircleValues(drawRandomNumbers());
            setScore((score) => score + 1);
            setTimer(timer + 0.25)
        }
        else {
            setTimer(timer - 1)
        }
        return false;
    }

    function gameOver() {
        setTimeout(() => { setIsGameWon(true) }, 1000);
        clearInterval(timeInterval.current);
    }


    function exitGame() {
        bigCircleRef.current.style.visibility = "visible";
        changeElementSize(sizeUnit * 0.75 * 0.95, bigCircleRef.current, 0);
        changeElementPosition(0, 0, 0, bigCircleRef.current);
        props.setGameMode("menu");
    }

    function survivalTimeLeft() {
        if (timer > 10) {
            return 10;
        }
        else if (timer < 0) {
            return 0;
        }
        else return Math.floor(timer * 1000) / 1000;
    }

    return (
        <div style={{ color: "white", fontSize: sizeUnit / 38 }}>
            { isGameWon === false &&
                <>
                    <CircleBoard backArrowRef={backArrowRef} timer={timer} gameMode={props.gameMode} onClickFunction={props.gameMode === "normal" ? circleClickNormalMode : circleClickSurvivallMode} values={circleValues}></CircleBoard>
                    {props.gameMode === "survival" && <h1 style={{ position: "absolute", color: "black", top: -sizeUnit / 8 }}>Time left: {survivalTimeLeft()}s</h1>}
                    { props.gameMode === "normal" && <h1 style={{ position: "absolute", color: "black", top: -sizeUnit / 8 }}>Time passed: {timer < 0 ? 0 : Math.floor(timer)}s</h1>}
                    {props.gameMode === "survival" && <h1 style={{ position: "absolute", color: "black", top: -sizeUnit / 8, right: "0" }}>Score:{score}</h1>}
                    <img className={"images"} ref={backArrowRef} alt="go_back" id="exitGameButton" style={{ visibility: "hidden", position: "relative", top: sizeUnit / 1.3, height: sizeUnit / 12, left: -sizeUnit / 3.1 }} onMouseOver={e => (e.currentTarget.src = backArrowHover)} onMouseOut={e => (e.currentTarget.src = backArrow)} src={backArrow} onClick={() => { exitGame() }}></img>
                </>
            }


            {isGameWon === true && <>
                {   props.gameMode === "normal" && <>
                    <h1 style={{ position: "relative", top: sizeUnit / 5 }}> Congratulations!</h1>
                    <h2 style={{ position: "relative", top: sizeUnit / 4.5, fontSize: sizeUnit / 25, marginLeft: sizeUnit / 20, marginRight: sizeUnit / 20 }}  >  Your time is: {Math.floor(timer * 100) / 100}s</h2>
                </>}

                {   props.gameMode === "survival" && <>
                    <h1 style={{ position: "relative", top: sizeUnit / 5 }}> Game over!</h1>
                    <h2 style={{ position: "relative", top: sizeUnit / 4.5, fontSize: sizeUnit / 25, marginLeft: sizeUnit / 20, marginRight: sizeUnit / 20 }}  >  Your scored: {score === 1 ? `${score} point` : `${score} points`} </h2>
                </>}
                <button id="resetGameButton" onClick={() => { props.setGameMode("menu") }} style={{ position: "relative", top: sizeUnit / 4, fontSize: sizeUnit / 17, marginLeft: sizeUnit / 20, marginRight: sizeUnit / 20 }}>Go back</button>
            </>}
        </div>

    )

}

export default Game;