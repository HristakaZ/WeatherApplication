const apiKey = 'c834480a5bdcfab5a5686eb772fc27ba';
const submit = document.querySelector('#submit');
const temperatureUnits = ["Fahrenheit", "Celsius"];
addEventListener('load', onLoad);

//a function executing all of the logic, which is called by the main addEventListener at the top of the scripts.js file
function onLoad() {
    let mainContainer = document.querySelector("#main");
    
    mainContainer.addEventListener('load', setRandomBackgroundColor());
    
    submit.addEventListener('click', function() {
        getWeatherInformation();
    });
}

function setRandomBackgroundColor() {
    let rgb = [];

    for(let i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * 255));
    }

    let combinedRgbColors = 'rgb('+ rgb.join(',') +')';

    document.body.style.backgroundColor = combinedRgbColors;
}


function getWeatherInformation() {
    let city = document.querySelector('#city');

    let weatherInformation = [];
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                weatherInformation.push(data);
            })
            .catch(error => alert(error));
    console.log(weatherInformation);
}