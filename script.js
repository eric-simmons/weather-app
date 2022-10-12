//time
const DateTime = luxon.DateTime;
const now = DateTime.now().toFormat("t");
const date = DateTime.now().toFormat("MMMM dd")
const currentHour = now.hour
// 

var weatherArr = []

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
            //put data into weather obj
            for (var i = 0; i < 40; i += 8) {
                var weatherObj = {
                    date: forecast.list[i].dt,
                    city: forecast.city.name,
                    temp: Math.round(((forecast.list[i].main.temp - 273.15) * 9 / 5 + 32)) + "°F",
                    wind: "Wind Speed " + forecast.list[i].wind.speed,
                    humidity: forecast.list[i].main.humidity + "%" + " Humidity",
                    condition: forecast.list[i].weather[0].description,
                    icon: "http://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png",
                }
                weatherArr.push(weatherObj)

            }
            
            for (var j = 0; j < weatherArr.length; j++) {
                document.body.append(Object.assign(document.createElement
                    ('div'),
                    {
                        textContent: weatherArr[j].temp,
                        id: "city-name",
                        class: "city-name flex-grow-1"
                    }))
            }










            cityNameEl.textContent = weatherArr[0].city
            dateEl.textContent = DateTime.fromSeconds(weatherArr[0].date).toFormat('LLL dd')
            temperatureEl.textContent = weatherArr[0].temp
            windEl.textContent = weatherArr[0].wind
            humidityEl.textContent = weatherArr[0].humidity
            conditionEl.textContent = weatherArr[0].condition
            document.getElementById('weather-icon').src = weatherArr[0].icon
            console.log(weatherArr)
            console.log(forecast)
        })








}




















form.addEventListener('submit', searchCity)