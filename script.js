


//time
const DateTime = luxon.DateTime;
const now = DateTime.now();
const date = now.toLocaleString(DateTime.DATETIME_MED)
const currentHour = now.hour


//get elements from html
var searchBar = document.getElementById('search')
var container = document.getElementById('container')
var form = document.querySelector('form')


//event listener
form.addEventListener('submit', searchCity )



// var city = searchBar.value.trim();


// var city = "chicago"



//api key and query url



function searchCity(event){
    event.preventDefault()
    
    var city = searchBar.value
    
    
    console.log(city)
    



    
    var APIKey = "fd21f9847f19d386e41cdfe3df89257d"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
.then(function(response){
    return response.json()
})
//retreive data
.then(function(jsonData){
    console.log(jsonData)
})
}




//parse readable stream into JSON
