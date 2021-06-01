import * as React from 'react';
import { StyleContext } from "../Contexts/SyleContext"
import Menu from "../Components/Menu"
import Game from '../Containers/Game';


function Frame() {
    const gameModes = {
        MENU: "menu",
        NORMAL: "normal",
        SURVIVAL: "survival"
    }

    const [gameMode, setGameMode] = React.useState(gameModes.MENU)
    const { sizeUnit, bigCircleRef } = React.useContext(StyleContext);
    const frameSide = sizeUnit * 0.75;
    const circleRadius = frameSide * 0.95;
    const frameStyle = { height: frameSide, width: frameSide, marginLeft: -frameSide / 2, marginTop: -frameSide / 2 };
    const circleStyle = { height: circleRadius, width: circleRadius, marginLeft: -circleRadius / 2, marginTop: -circleRadius / 2 }
    return (
        <div id="frame" style={frameStyle}>
            <div id="bigCircle" ref={bigCircleRef} style={circleStyle}></div>
            { gameMode === gameModes.MENU && <Menu setGameMode={setGameMode} gameMode={gameMode}></Menu>}
            { gameMode !== gameModes.MENU && <Game gameMode={gameMode} setGameMode={setGameMode} ></Game>}
        </div>
    )
}
export default Frame;