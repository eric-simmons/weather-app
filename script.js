//time
const DateTime = luxon.DateTime;
const now = DateTime.now();
const date = now.toLocaleString(DateTime.DATETIME_MED)
const currentHour = now.hour
var city = 'chicago'
//get elements from html
var searchBar = document.getElementById('search')
var container = document.getElementById('container')


// var city = searchBar.value.trim();

var APIKey = "fd21f9847f19d386e41cdfe3df89257d"
// var city = "chicago"



var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;







//parse readable stream into JSON
fetch(queryURL)
.then(function(response){
    return response.json()
})
//retreive data
.then(function(jsonData){
    console.log(jsonData)
})