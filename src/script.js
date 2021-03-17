// Display date and time

const currentTime = new Date();

function dateTime() {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
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
}

let cityInput = document.querySelector("#input-form");
cityInput.addEventListener("submit", searchInput);

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
