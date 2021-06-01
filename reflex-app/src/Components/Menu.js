import * as React from 'react';
import { StyleContext } from "../Contexts/SyleContext"
function Menu(props) {
    const { sizeUnit } = React.useContext(StyleContext);
    const menuStyle = { fontSize: sizeUnit / 30, width: "100%", height: "100%", position: "absolute", left: "0", top: "0" }
    const menuPages = {
        GENERAL: "general",
        INSTR1: "instructionsFirstPage",
        INSTR2: "instructionsSecondPage"
    }
    const [menuPage, setMenuPage] = React.useState(menuPages.GENERAL);
    return (
        <div id="menu" style={menuStyle}>
            {menuPage === "general" && <>
                <h1 style={{ position: "relative", top: sizeUnit / 8 }}>REFLEX TRAINER</h1>
                <h2 id="normalHeader" style={{ position: "relative", top: sizeUnit / 7.5, fontWeight: "normal" }} onClick={() => { props.setGameMode("normal") }}>NORMAL MODE</h2>
                <h2 id="survivalHeader" style={{ position: "relative", top: sizeUnit / 7, fontWeight: "normal" }} onClick={() => { props.setGameMode("survival") }}>SURVIVAL MODE</h2>
                <h2 id="instructionsHeader" style={{ position: "relative", top: sizeUnit / 6.5, fontWeight: "normal" }} onClick={() => { setMenuPage(menuPages.INSTR1) }}>INSTRUCTIONS</h2>
            </>}
            {menuPage !== menuPages.GENERAL && <>
                {  menuPage === menuPages.INSTR1 && <>
                    <h1 style={{ position: "relative", top: sizeUnit / 8 }}>NORMAL MODE</h1>
                    <h2 style={{ position: "relative", top: sizeUnit / 7.5, fontSize: sizeUnit / 25, marginLeft: sizeUnit / 20, marginRight: sizeUnit / 20 }}  >
                        Your job is to click the values in the circles in ascending order. Do it as fast as you can.</h2>
                    <button className="instructionArrow" style={{ position: "absolute", top: sizeUnit / 1.95, fontSize: sizeUnit / 10, left: sizeUnit / 3.1 }} onClick={() => { setMenuPage(menuPages.INSTR2) }}>&#x2192;</button>
                </>}
                {  menuPage === menuPages.INSTR2 && <>
                    <h1 style={{ position: "relative", top: sizeUnit / 8 }}>SURVIVAL MODE</h1>
                    <h2 style={{ position: "relative", top: sizeUnit / 7.5, fontSize: sizeUnit / 30, marginLeft: sizeUnit / 20, marginRight: sizeUnit / 20 }} >
                        In this mode, time is limited and values are being continuously randomized. Wrong choices cost you time.
                        Correct ones result in extra time. How many points can you score?
                    </h2>
                    <button className="instructionArrow" style={{ position: "absolute", top: sizeUnit / 1.95, fontSize: sizeUnit / 10, left: sizeUnit / 3.1 }} onClick={() => { setMenuPage(menuPages.INSTR1) }}>&#x2190;</button>
                </>}
                <h2 id="goBackButton" style={{ position: "absolute", top: sizeUnit / 1.7, width: "100%" }} onClick={() => { setMenuPage(menuPages.GENERAL) }}>GO BACK</h2>
            </>}
        </div>
    )
}
export default Menu;