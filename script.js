


//time
const DateTime = luxon.DateTime;
const now = DateTime.now();
const date = now.toLocaleString(DateTime.DATETIME_MED)
const currentHour = now.hour


//get elements from html
var searchBar = document.getElementById('search')
var container = document.getElementById('container')
var form = document.querySelector('form')
var cityNameEl = document.getElementById('city-name')
var temperatureEl = document.getElementById('temperature')
var windEl = document.getElementById('wind')
var humidityEl = document.getElementById('humidity')



//event listener
form.addEventListener('submit', searchCity)



// var city = searchBar.value.trim();


// var city = "chicago"



//api key and query url



function searchCity(event) {
    event.preventDefault()

    var city = searchBar.value
    var APIKey = "fd21f9847f19d386e41cdfe3df89257d"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    //parse readable stream into JSON
    fetch(queryURL)
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            }
            else if (response.status === 404) {
                alert('City not found!')
            }
        })
        //retreive data
        .then(function (weather) {
            cityNameEl.textContent = weather.name
            temperatureEl.textContent = "Current Temperature " + Math.round(((weather.main.temp-273.15)*9/5+32))
            windEl.textContent = "Wind Speed " + weather.wind.speed
            humidityEl.textContent = "Humidity " + weather.main.humidity + "%"





            console.log(weather)
        })
}





