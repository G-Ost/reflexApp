import React, { useState, useEffect } from "react";
import CircleDisplay from "./circleDisplay"
import NumbersDisplay from "./numberDisplay";
import MenuDisplay from "./menuDisplay";
import utils from "../utils"

// Variables for time control
let time = {
    start: "",
    current: "",
    end: "",
    clockNormal: "",
    clockSurvival: ""

};
// 0-99 number pool that in-game values are generated from
let pool = [];
for (let i = 0; i < 100; i++) {
    pool.push(i);
}

const Game = props => {
    const [menuVisibility, setMenuVisibility] = useState("visible");
    const [numberVisibility, setNumberVisibility] = useState("hidden");
    const [visibilityNormalWin, setVisibilityNormalWin] = useState("hidden");
    const [visibilitySurvivalWin, setVisibilitySurvivalWin] = useState("hidden");
    const [visibilityBackButton, setVisibilityBackButton] = useState("hidden");
    const [visibilityHelp1, setVisibilityHelp1] = useState("hidden");
    const [visibilityHelp2, setVisibilityHelp2] = useState("hidden");
    const [numbers, setNumbers] = useState("DontCheat");
    const [normalTimer, setNormalTimer] = useState("error");
    const [survivalTimer, setSurvivalTimer] = useState("error");
    const [gameMode, setGameMode] = useState("normal");
    const [score, setScore] = useState(0);

    // Placeholder for 9 random numbers
    let randomNumbers = [];

    // Numbers is array of current in-game displayed numbers
    // After value is clicked is being replaced by "", reducedNumbers checks if this is the only value in array
    let reducedNumbers = [...new Set(numbers)];
    // Here program checks if conditions of wining normal mode are fulffiled
    (() => (reducedNumbers.length === 1
        ? (clearInterval(time.clockNormal), setNumbers([]), setNumberVisibility("hidden"), winNormalMode())
        : null))();
    // Here program checks if conditions of finishing survival mode are fulffiled, that is if time is over
    (() => (survivalTimer < 0
        ? (endSurvivalMode())
        : null))();

    // Function starting time count in normal mode
    function startClock() {
        time.clockNormal = setInterval(() => {
            time.current = new Date().getTime();
            let timePassed = Math.floor((time.current - time.start) / 1000);
            setNormalTimer(timePassed);
        }, 100);
    }

    // Time counter for survival mode, after initialization is being set to default value and starts countdown
    useEffect(() => {
        time.clockSurvival =
            setInterval(() => (setSurvivalTimer(survivalTimer - 1)), 1000);
        return () => clearInterval(time.clockSurvival);
    }, [survivalTimer]);

    // Messages displayed during game and condition according to which those are being shown regarding normal or survival mode
    let scoreMessage = "";
    let solveTime = normalTimer;
    let timeMessage = "Time passed:";
    if (gameMode === "survival") {
        timeMessage = "Time left:"
        solveTime = survivalTimer;
        scoreMessage = "score:";
    }


    // Function initialized after game starts, displayed numbers are generated and shown
    function gameStart(givenGameMode) {
        if (givenGameMode === "normal") {
            startClock();
            // Score in normal mode becomes invisible
            setScore("");
        }
        else if (givenGameMode === "survival") {
            // Reseting clock, counting down time left for survival mode
            setSurvivalTimer(11);
        }
        utils.draw(randomNumbers, pool);
        setNumbers([...randomNumbers]);
        let el = document.getElementById("menuCircle");
        setMenuVisibility("hidden");
        utils.circleSizeChanger("0", 0.7, el);
        setTimeout(() => (utils.spread("circle")), 500);
        setTimeout(() => (utils.spread("number")), 500);
        time.start = new Date().getTime() + 1200;
        setTimeout(() => (setNumberVisibility("visible")), 1300);

    }

    // What happens after winning normal mode
    function winNormalMode() {
        time.end = new Date().getTime();
        let solveTime = (time.end - time.start) / 1000;
        setNormalTimer((solveTime).toString());
        utils.focus("circle");
        utils.focus("number");
        let el = document.getElementById("menuCircle");
        setTimeout(() => (utils.circleSizeChanger(140, 0.7, el)), 1000);
        setTimeout(() => (setVisibilityBackButton("visible")), 1700);
        setTimeout(() => (setVisibilityNormalWin("visible")), 1700);
    }

    // What happens when time in survival mode runs out
    function endSurvivalMode() {
        setNumbers([]);
        clearInterval(time.clockSurvival);
        setSurvivalTimer(0);
        setNumberVisibility("hidden");
        utils.focus("circle");
        utils.focus("number");
        let el = document.getElementById("menuCircle");
        setTimeout(() => (utils.circleSizeChanger(140, 0.7, el)), 1000);
        setTimeout(() => (setVisibilitySurvivalWin("visible")), 1700);
        setTimeout(() => (setVisibilityBackButton("visible")), 1700);
    }



    return (<div className="game">
        <CircleDisplay
            count={9}
            numbers={numbers}
            setNumbers={setNumbers}
            pool={pool}
            survivalTimer={survivalTimer}
            setSurvivalTimer={setSurvivalTimer}
            gameMode={gameMode}
            score={score}
            setScore={setScore}
        />


        <NumbersDisplay
            count={9}
            visibility={numberVisibility}
            numbers={numbers}
        />


        <MenuDisplay
            gameStart={gameStart}
            gameMode={gameMode}
            setGameMode={setGameMode}
            resetFunction={props.reset}
            visibility={menuVisibility}
            clockVisibility={numberVisibility}
            visibilityNormalWin={visibilityNormalWin}
            visibilitySurvivalWin={visibilitySurvivalWin}
            visibilityBackButton={visibilityBackButton}
            timeMessage={timeMessage}
            solveTime={solveTime}
            visibilityHelp1={visibilityHelp1}
            visibilityHelp2={visibilityHelp2}
            showHelp1={() => { return (setVisibilityHelp1("visible"), setVisibilityHelp2("hidden"), setMenuVisibility("hidden"), setVisibilityBackButton("visible")) }}
            showHelp2={() => { return (setVisibilityHelp1("hidden"), setVisibilityHelp2("visible")) }}
            score={score}
            scoreMessage={scoreMessage}
        />
        <p id="credits">Author: Grzegorz Ostapczuk</p>
    </div>)
}






export default Game;