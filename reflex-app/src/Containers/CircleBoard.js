import * as React from 'react';
import { StyleContext } from "../Contexts/SyleContext"
import Circle from "../Components/Circle"



function CircleBoard(props) {

    const { changeElementPosition, sizeUnit, bigCircleRef, changeElementSize } = React.useContext(StyleContext);

    React.useEffect(() => {
        if (props.gameMode === "survival" && props.timer < 0) {
            backToStartingState();
        }
    })

    const circleRefs = React.useMemo(() => Array(9).fill(0).map(i => React.createRef()), []);

    const shrinkBigCircle = React.useCallback(() => {
        changeElementPosition(sizeUnit * 0.24, sizeUnit * 0.24, 0, bigCircleRef.current)
        changeElementSize(sizeUnit * 0.23, bigCircleRef.current, 0.5)
        setTimeout(() => { bigCircleRef.current.style.visibility = "hidden" }, 100)
    }, [sizeUnit, bigCircleRef, changeElementPosition, changeElementSize]);


    const spreadCircles = React.useCallback(() => {
        let horizontalTranslationArray = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
        let verticalTranslationArray = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
        for (let i = 0; i < circleRefs.length; i++) {
            changeElementPosition(horizontalTranslationArray[i] * sizeUnit * 0.25, verticalTranslationArray[i] * sizeUnit * 0.25, 0.5, circleRefs[i].current);
            circleRefs[i].current.style.visibility = "visible";
        }
    }, [circleRefs, changeElementPosition, sizeUnit]);


    React.useEffect(() => {
        shrinkBigCircle();
        setTimeout(() => { spreadCircles(); props.backArrowRef.current.style.visibility = "visible" }, 600);
    }, [shrinkBigCircle, spreadCircles, props.backArrowRef])



    function backToStartingState() {
        for (let i = 0; i < circleRefs.length; i++) {
            changeElementPosition(0, 0, 0.5, circleRefs[i].current);
            circleRefs[i].current.style.visibility = "hidden";
        }
        setTimeout(() => { bigCircleRef.current.style.visibility = "visible" }, 500)
        setTimeout(() => {
            changeElementSize(sizeUnit * 0.75 * 0.95, bigCircleRef.current, 0.5);
            changeElementPosition(0, 0, 0.5, bigCircleRef.current)
        }, 500)

    }


    return (
        <div id="circleBoard">
            {props.values.map((value, index) => {
                return (
                    <Circle backToStartingState={backToStartingState} onClickFunction={props.onClickFunction} key={index} givenRef={circleRefs[index]} circleValue={value}></Circle>
                )
            })}
        </div>
    )
}

export default CircleBoard;

