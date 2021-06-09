const apiKey = 'c834480a5bdcfab5a5686eb772fc27ba';
const temperatureUnits = {
                            'Kelvin': 'Kelvin',
                            'Fahrenheit': 'imperial',
                            'Celsius': 'metric'
                         };
const iconURL = "http://openweathermap.org/img/wn/"
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
        option.style.color = "orangered";
        temperatureUnitsDropdownList.appendChild(option);
    });
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
    let cityValidationMessage = document.querySelector('#validationForCity');
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${temperatureUnits.value}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                cityValidationMessage.innerHTML = "";
                setWeatherInformation(data);
            })
            .catch(error => {
                let weatherApiInfo = document.querySelector('#weatherapiinfo');
                if(city.value == null || city.value == '' || city.value == ' ') {
                    cityValidationMessage.innerHTML = "The city field is required!";
                    cityValidationMessage.style.color = "orangered";
                    let alertWarning = document.createElement('div');
                    alertWarning.setAttribute('class', 'alert alert-warning');
                    alertWarning.setAttribute('role', 'alert');
                    alertWarning.innerHTML = "Please check the validation messages!";
                    weatherApiInfo.appendChild(alertWarning);
                }
                else {
                    cityValidationMessage.innerHTML = "";
                    let alertError = document.createElement('div');
                    alertError.setAttribute('class', 'alert alert-danger');
                    alertError.setAttribute('role', 'alert');
                    alertError.innerHTML = "Oops, an error occured!";
                    weatherApiInfo.appendChild(alertError);
                }
            });
}

function setWeatherInformation(data) {
    let weatherApiInfo = document.querySelector('#weatherapiinfo');
    weatherApiInfo.innerHTML = '';
    let temperatureUnitsList = document.querySelector('#temperatureUnitsList');
    let temperatureUnits = temperatureUnitsList.options[temperatureUnitsList.selectedIndex].text;
    let locationResponse = data['name'] + ', ' + data['sys']['country'];
    let weatherInformationResponse = data['weather'];
    let weatherInfo = {};
    for (let index = 0; index < weatherInformationResponse.length; index++) {
        weatherInfo = weatherInformationResponse[index];
    }
    let temperatureResponse = 'Min temperature: ' + data['main']['temp_min'] + ' ' + temperatureUnits + 
    ', ' + 'Max temperature: ' + data['main']['temp_max'] + ' ' + temperatureUnits + ', ' + 'Feels like: ' + data['main']['feels_like'] + 
    ' ' + temperatureUnits;
    let iconResponse = weatherInfo['icon'];
    let humidityResponse = data['main']['humidity'];

    let location = document.createElement('h4');
    let weatherVision = document.createElement('p');
    let temperature = document.createElement('p');
    let icon = document.createElement('img');
    let humidity = document.createElement('p');

    location.setAttribute('class', 'display-4');
    location.innerHTML = locationResponse;

    weatherVision.setAttribute('class', 'text-muted');
    weatherVision.innerHTML = weatherInfo['main'] + ' - ' + weatherInfo['description'];

    temperature.setAttribute('class', 'text-muted');
    temperature.innerHTML = temperatureResponse;

    humidity.setAttribute('class', 'text-muted');
    humidity.innerHTML = 'Humidity: ' + humidityResponse + '%';

    icon.setAttribute('src', iconURL + iconResponse + '.png');
    icon.setAttribute('title', weatherInfo['description']);

    weatherApiInfo.appendChild(location);
    weatherApiInfo.appendChild(weatherVision);
    weatherApiInfo.appendChild(temperature);
    weatherApiInfo.appendChild(humidity);
    weatherApiInfo.appendChild(icon);
}