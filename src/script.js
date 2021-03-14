// Display date and time

const currentTime = new Date()

function dateTime() {
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let day = days[currentTime.getDay()]

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let month = months[currentTime.getMonth()]

  let date = currentTime.getDate()
  let year = currentTime.getFullYear()

  let hour = currentTime.getHours()
  if(hour < 10) {
    hour = `0${hour}`
  }

  let minutes = currentTime.getMinutes()
  if(minutes < 10) {
    minutes = `0${minutes}`
  }

  let heading = document.querySelector('h6')
  heading.innerHTML = `${day}, ${month} ${date}, ${year} on ${hour}:${minutes}`
}

dateTime()

// Display city and temperature of city

const apiKey = '563b8c646e928f0609edc6757e3848c7'
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?'

function displayCity(event) {
  event.preventDefault()
  let citySearch = document.querySelector('#city-input')
  let searchedCity = citySearch.value
  let units = 'metric'
  let cityApiUrl = `${apiEndpoint}q=${searchedCity}&appid=${apiKey}&units=${units}`

  axios.get(cityApiUrl).then(getTemperature)
}

//display city search input

let cityInput = document.querySelector('#input-form')
cityInput.addEventListener('submit', displayCity)

//temperature of city

function getTemperature(response) {
  let city = response.data.name
  let cityHeading = document.querySelector('h3')
  cityHeading.innerHTML = `${city}`

  let temperature = Math.round(response.data.main.temp)
  let displayTemperature = document.querySelector('.temperature')
  displayTemperature.innerHTML = `${temperature}`

  let weatherDescription = response.data.weather[0].main
  let displayWeather = document.querySelector('.weather-description')
  displayWeather.innerHTML = `${weatherDescription}`

  let humidityPercentage = response.data.main.humidity
  let displayHumidity = document.querySelector('.humidity-percentage')
  displayHumidity.innerHTML = `${humidityPercentage}`

  let windSpeed = response.data.wind.speed
  let displayWind = document.querySelector('.wind-speed')
  displayWind.innerHTML = `${windSpeed}`
}

// current location

function getCoordinates(position) {
  console.log(position)
  let latitude = Math.round(position.coords.latitude)
  let longitude = Math.round(position.coords.longitude)
  let coordinatesUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
  console.log(coordinatesUrl)

  axios.get(coordinatesUrl).then(getTemperature)
}

let currentLocation = document.querySelector('#current-location-button')
currentLocation.addEventListener('click', getNavigator)

function getNavigator(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(getCoordinates)
}



