addEventListener("load", onLoad);

//a function executing all of the logic, which is called by the main addEventListener at the top of the scripts.js file
function onLoad() {
    let mainContainer = document.querySelector("#main");
    console.log(mainContainer);
    mainContainer.addEventListener("load", setRandomBackgroundColor());
}

function setRandomBackgroundColor() {
    let rgb = [];

    for(let i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * 255));
    }

    let combinedRgbColors = 'rgb('+ rgb.join(',') +')';

    document.body.style.backgroundColor = combinedRgbColors;
}