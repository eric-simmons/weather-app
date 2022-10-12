//time
const DateTime = luxon.DateTime;
const now = DateTime.now().toFormat("t");
const date = DateTime.now().toFormat("MMMM dd")
const currentHour = now.hour
// 



//get elements from html
var searchBar = document.getElementById('search')
var container = document.getElementById('container')
var searchHistory = document.getElementById('search-history')
var hey = document.getElementById('hey')
var form = document.querySelector('form')
buttonsArr = []

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
            //clear weather array

            weatherArr = []
            for (var i = 0; i < 40; i += 8) {
                var weatherObj = {
                    date: DateTime.fromSeconds(forecast.list[i].dt).toFormat('LLL dd'),
                    city: forecast.city.name,
                    temp: Math.round(((forecast.list[i].main.temp - 273.15) * 9 / 5 + 32)) + "°F",
                    wind: "Wind Speed " + forecast.list[i].wind.speed,
                    humidity: forecast.list[i].main.humidity + "%" + " Humidity",
                    condition: forecast.list[i].weather[0].description,
                    icon: "http://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png",
                }

                weatherArr.push(weatherObj)

            }


            var btn = document.createElement('button');
            btn.id = weatherObj.city + 'btn'
            btn.textContent = weatherObj.city
            buttonsArr.push(btn)
            searchHistory.appendChild(btn)

console.log(buttonsArr)
for (k = 0; k < buttonsArr.length; k++){
            buttonsArr[k].addEventListener('click', recall)
}

            function recall() {
                console.log('clicked')
            }





            localStorage.setItem(weatherObj.city, JSON.stringify(weatherArr))

            var recallHistory = JSON.parse(localStorage.getItem(weatherObj.city))
            console.log(recallHistory)

            container.innerHTML = ''
            displayForecast()

        })
}



function displayForecast() {


    for (var j = 0; j < weatherArr.length; j++) {

        var section = document.createElement('section');
        section.id = 'container'
        section.textContent = 'testing'
        container.appendChild(section)

        var card = document.createElement('card');
        card.id = 'cardBody'
        card.textContent = "this is a card"
        section.appendChild(card)

        var cityDiv = document.createElement('cityDiv');
        cityDiv.id = 'cityDiv'
        cityDiv.textContent = weatherArr[j].city
        cityDiv.style = 'background-color: green'
        card.appendChild(cityDiv)

        var dateDiv = document.createElement('dateDiv');
        dateDiv.id = 'dateDiv'
        dateDiv.textContent = weatherArr[j].date
        dateDiv.style = 'background-color: red'
        card.appendChild(dateDiv)

        var tempDiv = document.createElement('tempDiv');
        tempDiv.id = 'tempDiv'
        tempDiv.textContent = weatherArr[j].temp
        tempDiv.style = 'background-color: blue'
        card.appendChild(tempDiv)

        var windDiv = document.createElement('windDiv');
        windDiv.id = 'windDiv'
        windDiv.textContent = weatherArr[j].wind
        windDiv.style = 'background-color: yellow'
        card.appendChild(windDiv)

        var humidityDiv = document.createElement('humidityDiv');
        humidityDiv.id = 'humidityDiv'
        humidityDiv.textContent = weatherArr[j].humidity
        humidityDiv.style = 'background-color: white'
        card.appendChild(humidityDiv)

        var conditionDiv = document.createElement('conditionDiv');
        conditionDiv.id = 'conditionDiv'
        conditionDiv.textContent = weatherArr[j].condition
        conditionDiv.style = 'background-color: purple'
        card.appendChild(conditionDiv)

        var iconDiv = document.createElement('img');
        iconDiv.id = 'iconDiv'
        iconDiv.src = weatherArr[j].icon
        card.appendChild(iconDiv)
    }
}




form.addEventListener('submit', searchCity)