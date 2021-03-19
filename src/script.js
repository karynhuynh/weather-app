// Display date and time
function dateTime() {
  let now = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateTimeSentence = document.querySelector("h6");
  dateTimeSentence.innerHTML = `${formatDay()}, ${month} ${date}, ${year} on ${hour}:${minutes}`;
}

dateTime();

function formatDay() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  return `${day}`;
}

// Display city and temperature

const apiKey = "563b8c646e928f0609edc6757e3848c7";
const apiEndpoint = "https://api.openweathermap.org/data/2.5/";
let units = "metric";

// search by coordinates

function getCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let coordinatesUrl = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(coordinatesUrl).then(getTemperature);

  coordinatesUrl = `${apiEndpoint}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(coordinatesUrl).then(getForecast);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);

  forecastDays(latitude, longitude)
}

function getNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getNavigator);

// Search by city

function searchInput(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let searchedCity = citySearch.value;
  let apiUrl = `${apiEndpoint}weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);

  apiUrl = `${apiEndpoint}forecast?q=${searchedCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getForecast);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
}

let cityInput = document.querySelector("#input-form");
cityInput.addEventListener("submit", searchInput);

// Temperature information

function getTemperature(response) {
  let city = response.data.name;
  let cityName = document.querySelector("h2");
  cityName.innerHTML = `${city}`;

  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
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

  // Main Icon and Card Background
  let mainCard = document.querySelector(".main-card");
  let mainIcon = document.querySelector("#main-card-icon");
  let weatherID = response.data.weather[0].id;

  if (weatherID >= 200 && weatherID < 300) {
    mainIcon.setAttribute("class", "fas fa-bolt");
    mainCard.style.backgroundImage =
      "url('https://media.istockphoto.com/photos/rain-cloud-picture-id1089986346?k=6&m=1089986346&s=612x612&w=0&h=P6askeRKjcgdcKRysKkg2xu6zy4TeIhXwSgq72mSyB8=')";
  } else if (weatherID >= 300 && weatherID < 500) {
    mainIcon.setAttribute("class", "fas fa-cloud-showers-heavy");
    mainCard.style.backgroundImage =
      "url('https://media.istockphoto.com/photos/rain-cloud-picture-id1089986346?k=6&m=1089986346&s=612x612&w=0&h=P6askeRKjcgdcKRysKkg2xu6zy4TeIhXwSgq72mSyB8=')";
  } else if (weatherID <= 500 && weatherID < 600) {
    mainIcon.setAttribute("class", "fas fa-cloud-rain");
    mainCard.style.backgroundImage =
      "url('https://media.istockphoto.com/photos/rain-cloud-picture-id1089986346?k=6&m=1089986346&s=612x612&w=0&h=P6askeRKjcgdcKRysKkg2xu6zy4TeIhXwSgq72mSyB8=')";
  } else if (weatherID <= 600 && weatherID < 700) {
    mainIcon.setAttribute("class", "far fa-snowflake");
    mainCard.style.backgroundImage =
      "url('https://cdn.shopify.com/s/files/1/2084/6971/products/27clouds-11x14_2048x2048.jpg?v=1516401513')";
  } else if (weatherID <= 700 && weatherID < 800) {
    mainIcon.setAttribute("class", "fas fa-smog");
    mainCard.style.backgroundImage =
      "url('https://cdn.shopify.com/s/files/1/2084/6971/products/27clouds-11x14_2048x2048.jpg?v=1516401513')";
  } else if (weatherID === 800) {
    mainIcon.setAttribute("class", "fas fa-sun");
    mainCard.style.backgroundImage =
      "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/baby-blue-clouds-susan-bryant.jpg')";
  } else if (weatherID >= 800) {
    mainIcon.setAttribute("click", "fas fa-cloud");
    mainCard.style.backgroundImage =
      "url('https://img.buzzfeed.com/buzzfeed-static/static/2021-03/10/15/enhanced/682fe1e39732/enhanced-14446-1615391451-10.jpg')";
  }

  let longitude = response.data.coord.lon;
  let latitude = response.data.coord.lat;
  forecastDays(latitude, longitude);
}

// Forecast information

function forecastDays(latitude, longitude) {
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`
  axios.get(forecastUrl).then(getForecast)
}

function getForecast(response) {
  let forecastSection = document.querySelector(".forecast");
  forecastSection.innerHTML = null;
  let forecast = null;

  for (let i = 1; i < 6; i ++) {
    forecast = response.data.daily[i];

    // Forecast icon
    let weatherID = forecast.weather[0].id;
    let icon = "";

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

    forecastSection.innerHTML += 
          `<div class="row">
            <div class="col">
              <p class="day">${formatDay(forecast.dt * 1000)}</p>
            </div>
            <div class="col forecast-icon">
              ${icon}
            </div>
            <div class="col">
              <p class="maxmin">
                <span class="max">${Math.round(forecast.temp.max)}</span>° / 
                <span class="min">${Math.round(forecast.temp.min)}</span>°
              </p>
            </div>
          </div>`;
  }
}

//Convert celsius to fahrenheit-main card

let celsiusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let fTemperature = Math.round(celsiusTemperature * (9 / 5) + 32);
  let displayTemperature = document.querySelector(".temperature");
  // remove the active class from the celsius link:
  celsiusLink.classList.remove("active");
  // add the active class to the fahrenheit link:
  fahrenheitLink.classList.add("active");
  displayTemperature.innerHTML = fTemperature;

  convertForecastTemp("fahrenheit");

  celsiusLink.addEventListener("click", convertToCelsius);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);
}

// Convert fahrenheit to celsius-main card

function convertToCelsius(event) {
  event.preventDefault();
  let displayTemperature = document.querySelector(".temperature");
  // add the active class from the celsius link:
  celsiusLink.classList.add("active");
  // remove the active class to the fahrenheit link:
  fahrenheitLink.classList.remove("active");
  displayTemperature.innerHTML = Math.round(celsiusTemperature);

  convertForecastTemp("celsius");

  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
}

// Convert forecast max and min temp

let celsius = null;

function convertForecastTemp(unit) {
  if (unit === "celsius") {
    document.querySelectorAll(".max").forEach(function (temperature) {
      let currentTemperature = temperature.innerHTML;
      temperature.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
    });
    document.querySelectorAll(".min").forEach(function (temperature) {
      let currentTemperature = temperature.innerHTML;
      temperature.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
    });
  } else {
    document.querySelectorAll(".max").forEach(function (temperature) {
      let currentTemperature = temperature.innerHTML;
      temperature.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
    });
    document.querySelectorAll(".min").forEach(function (temperature) {
      let currentTemperature = temperature.innerHTML;
      temperature.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
    });
  }
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
