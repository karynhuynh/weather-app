// Display date and time

const currentTime = new Date();

function dateTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentTime.getMonth()];

  let date = currentTime.getDate();

  let year = currentTime.getFullYear();

  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateTimeSentence = document.querySelector("h6");
  dateTimeSentence.innerHTML = `${day}, ${month} ${date}, ${year} on ${hour}:${minutes}`;
}

dateTime();

function formatDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  return `${day}`;
}

// Display city and temperature
// current location

const apiKey = "563b8c646e928f0609edc6757e3848c7";
const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";

function getCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordinatesUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(coordinatesUrl).then(getTemperature);
}

function getNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getNavigator);

// Search for the city

function searchInput(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let searchedCity = citySearch.value;
  let apiUrl = `${apiEndpoint}q=${searchedCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getForecast);
}

let cityInput = document.querySelector("#input-form");
cityInput.addEventListener("submit", searchInput);

// Forecast information

function getForecast(response) {
  console.log(response);
  let forecastSection = document.querySelector(".forecast");
  forecastSection.innerHTML = null;
  let forecast = null;

  for (let index = 1; index <= 5; index++) {
    forecast = response.data.list[index];

    // Forecast icon
    let weatherID = forecast.weather[0].id;
    let icon = " ";

    if (weatherID >= 200 && weatherID < 300) {
      // weather: thunderstorm
      icon = `<i class="fas fa-bolt"></i>`;
    } else if (weatherID >= 300 && weatherID < 500) {
      // weather: drizzle
      icon = `<i class="fas fa-cloud-showers-heavy"></i>`;
    } else if (weatherID <= 500 && weatherID < 600) {
      // weather: rain
      icon = `<i class="fas fa-cloud-rain"></i>`;
    } else if (weatherID <= 600 && weatherID < 700) {
      // weather: snow
      icon = `<i class="far fa-snowflake"></i>`;
    } else if (weatherID <= 700 && weatherID < 800) {
      // weather: atmosphere
      icon = `<i class="fas fa-smog"></i>`;
    } else if (weatherID === 800) {
      // weather: clear
      icon = `<i class="fas fa-sun"></i>`;
    } else if (weatherID >= 800) {
      // weather: clouds
      icon = `<i class="fas fa-cloud"></i>`;
    }

    forecastSection.innerHTML += `<div class="row">
            <div class="col">
              <p class="day">${formatDay(forecast.dt * 1000)}</p>
            </div>
            <div class="col forecast-icon">
              ${icon}
            </div>
            <div class="col">
              <p class="maxmin">${Math.round(
                forecast.main.temp_max
              )}° / ${Math.round(forecast.main.temp_min)}°</p>
            </div>
          </div>`;
  }
}
// Temperature information

function getTemperature(response) {
  let city = response.data.name;
  let cityName = document.querySelector("h2");
  cityName.innerHTML = `${city}`;

  let temperature = Math.round(celciusTemperature);
  let mainDegree = document.querySelector(".temperature");
  mainDegree.innerHTML = `${temperature}`;

  let weather = response.data.weather[0].description;
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = `${weather}`;

  let humidity = response.data.main.humidity;
  let humidityPercentage = document.querySelector(".humidity-percentage");
  humidityPercentage.innerHTML = `${humidity}`;

  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${wind}`;

  celciusTemperature = response.data.main.temp;

  //Main Icon
  
}

//Convert celsius to fahrenheit

let celciusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let fTemperature = Math.round(celciusTemperature * (9 / 5) + 32);
  let displayTemperature = document.querySelector(".temperature");
  // remove the active class from the celsius link:
  celsiusLink.classList.remove("active");
  // add the active class to the fahrenheit link:
  fahrenheitLink.classList.add("active");
  displayTemperature.innerHTML = fTemperature;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Convert fahrenheit to celsius

function convertToCelsius(event) {
  event.preventDefault();
  let displayTemperature = document.querySelector(".temperature");
  // add the active class from the celsius link:
  celsiusLink.classList.add("active");
  // remove the active class to the fahrenheit link:
  fahrenheitLink.classList.remove("active");
  displayTemperature.innerHTML = Math.round(celciusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
