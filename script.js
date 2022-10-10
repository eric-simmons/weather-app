


//time

const DateTime = luxon.DateTime;

const now = DateTime.now().toFormat("t");
const date = DateTime.now().toFormat("MMMM dd")
const currentHour = now.hour

console.log(date)

//get elements from html
var searchBar = document.getElementById('search')
var container = document.getElementById('container')
var form = document.querySelector('form')
var cityNameEl = document.getElementById('city-name')
var temperatureEl = document.getElementById('temperature')
var windEl = document.getElementById('wind')
var humidityEl = document.getElementById('humidity')
var conditionEl = document.getElementById('condition')
var dateEl = document.getElementById('date')
var icon = document.getElementById('weather-icon').src


var timeEl = document.getElementById('time')


timeEl.textContent = now

function searchCity(event) {
    event.preventDefault()

    var city = searchBar.value
    var APIKey = "fd21f9847f19d386e41cdfe3df89257d"
    var forecastWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;



    //parse readable stream into JSON
    fetch(forecastWeatherURL)
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            }
            else if (response.status !== 200) {
                alert('City not found!')
            }
        })
        //retreive data
        .then(function (forecast) {

            var weatherObj = {
                city: forecast.city.name,
                temp: Math.round(((forecast.list[0].main.temp - 273.15) * 9 / 5 + 32)) + "°F",
                wind: "Wind Speed " + forecast.list[0].wind.speed,
                humidity: forecast.list[0].main.humidity + "%" + " Humidity",
                condition: forecast.list[0].weather[0].description,
                icon: "http://openweathermap.org/img/wn/" + forecast.list[0].weather[0].icon + "@2x.png",
            }

            cityNameEl.textContent = weatherObj.city
            temperatureEl.textContent = weatherObj.temp
            windEl.textContent = weatherObj.wind
            humidityEl.textContent = weatherObj.humidity
            conditionEl.textContent = weatherObj.condition
            document.getElementById('weather-icon').src = "http://openweathermap.org/img/wn/" + forecast.list[0].weather[0].icon + "@2x.png"


            console.log(weatherObj)
            console.log(forecast)
        })


}






form.addEventListener('submit', searchCity)