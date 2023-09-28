
const temperatureField = document.querySelector(".temp");
const humidityField = document.querySelector(".humidity p");
const locationField = document.querySelector(".time_location p");
const dataandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');
const locationButton = document.querySelector('.location_button');

form.addEventListener('submit', searchForLocation);
locationButton.addEventListener('click', getCurrentLocation);

let target = 'Mumbai';

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=b8f3cb8445114ef1b32121517233005&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let humidity = data.current.humidity;
    let condition = data.current.condition.text;

    updateDetails(temp, humidity, locationName, time, condition);
};

function updateDetails(temp, humidity, locationName, time, condition) {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `Temperature: ${temp} °C`;
    humidityField.innerText = `Humidity: ${humidity}%`;
    locationField.innerText = locationName;
    dataandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;

    // Increase the font size for temperature to match humidity
    temperatureField.style.fontSize = `${humidityField.style.fontSize}`;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

async function getCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            async position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const targetLocation = `${latitude},${longitude}`;
                await fetchResults(targetLocation);
            },
            error => {
                console.error(error.message);
            }
        );
    } else {
        console.log('Geolocation is not available.');
    }
}

function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}



