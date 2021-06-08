const apiKey = 'c834480a5bdcfab5a5686eb772fc27ba';
const temperatureUnits = {
                            'Kelvin': 'Kelvin',
                            'Fahrenheit': 'imperial',
                            'Celsius': 'metric'
                         };
addEventListener('load', onLoad);

//a function executing all of the logic, which is called by the main addEventListener at the top of the scripts.js file
function onLoad() {
    let combinedRgbColors = getRandomBackgroundColor();
    
    document.body.style.backgroundImage = `linear-gradient(to bottom, ${combinedRgbColors} 0%, #ff99cc 100%)`;

    setTemperatureUnitsToDropdown();

    let submit = document.querySelector('#submit');
    submit.addEventListener('mouseover', function() {
        makeWigglySubmitButton();
    });
    submit.addEventListener('mouseout', function() {
        returnSubmitButtonBackToNormalDesignState();
    });
    submit.addEventListener('click', function() {
        getWeatherInformation();
    });
}

function getRandomBackgroundColor() {
    let rgb = [];

    for(let i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * 255));
    }

    let combinedRgbColors = 'rgb('+ rgb.join(',') +')';

    return combinedRgbColors;
}

function setTemperatureUnitsToDropdown() {
    let temperatureUnitsDropdownList = document.querySelector('#temperatureUnitsList');
    temperatureUnitsDropdownList.style.display = "none";

    let showDropDownBtn = document.querySelector('#showDropdown');
    showDropDownBtn.addEventListener('click', function() {
        temperatureUnitsDropdownList.style.display = "block";

        temperatureUnitsDropdownList.addEventListener('mouseover', function() {
            temperatureUnitsDropdownList.style.backgroundColor = getRandomBackgroundColor();
            temperatureUnitsDropdownList.style.opacity = "0.8s";
            temperatureUnitsDropdownList.style.transition = "0.8s";
        });

        temperatureUnitsDropdownList.addEventListener('mouseout', function() {
            temperatureUnitsDropdownList.style.backgroundColor = getRandomBackgroundColor();
            temperatureUnitsDropdownList.style.opacity = "0.8s";
            temperatureUnitsDropdownList.style.transition = "0.8s";
        });

        temperatureUnitsDropdownList.style.borderRadius = "10px";
        showDropDownBtn.style.margin = "15px";
    });

    Object.entries(temperatureUnits).forEach(([key, value]) => {
        let option = document.createElement("option");
        option.setAttribute("value", value);
        option.text = key;

        let combinedRgbColors = getRandomBackgroundColor();
        option.style.backgroundColor = combinedRgbColors;
        option.style.color = "#FCBDBD";
        temperatureUnitsDropdownList.appendChild(option);
    });
}


function setRandomTitleColorOvertime() {
    let title = document.querySelector('#title');
    console.log(title);
}

function makeWigglySubmitButton() {
    let submit = document.querySelector('#submit');
    submit.style.width = "100px";
    submit.style.height = "100px";
    submit.style.opacity = "0.8s";
    submit.style.transition = "0.8s";
    submit.style.color = "white";
    submit.style.backgroundColor = getRandomBackgroundColor();
}

function returnSubmitButtonBackToNormalDesignState() {
    let submit = document.querySelector('#submit');
    let normalSubmitWidth = "75px";
    let normalSubmitHeight = "40px";
    submit.style.width = normalSubmitWidth;
    submit.style.height = normalSubmitHeight;
    submit.style.opacity = "0.8s";
    submit.style.transition = "0.8s";
    submit.style.backgroundColor = "white";
    submit.style.color = "black";
}

function getWeatherInformation() {
    let city = document.querySelector('#city');
    let temperatureUnits = document.querySelector('#temperatureUnitsList');
    let weatherInformation = [];
    console.log(temperatureUnits.value);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${temperatureUnits.value}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                weatherInformation.push(data);
            })
            .catch(error => alert(error));
    
    console.log(weatherInformation);
}