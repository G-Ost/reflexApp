const utils = {
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),


    setTranslate: function (xPos, yPos, id, t) {
        let el = document.getElementById(id);
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        el.style.transition = `${t}s ease-in-out`;
    },


    draw: function (array, pool) {
        for (let i = 0; i < 9; i++) {
            if (array.length < 9) {
                array.push(
                    pool.splice(
                        Math.floor(Math.random() * pool.length), 1)[0]
                );
            }
        }
    },

    spread: function (elementsName) {
        let translationMatrixX = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
        let translationMatrixY = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
        let translationValue = 100;
        let translateX = translationMatrixX.map((x) => x * translationValue);
        let translateY = translationMatrixY.map((x) => x * translationValue);
        let id;
        for (let i = 0; i < 9; i++) {
            id = `${elementsName}${i + 1}`;
            utils.setTranslate(translateX[i], translateY[i], id, 1);
        }
    },

    focus: function (elementsName) {
        let id;
        for (let i = 0; i < 9; i++) {
            id = `${elementsName}${i + 1}`;
            utils.setTranslate(0, 0, id, 1);
        }
    },

    circleSizeChanger: function (size, t, el) {
        el.setAttribute("r", size);
        el.style.transition = `${t}s ease-in-out`;
    }

};

export default utils;