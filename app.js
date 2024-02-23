const iconElement= document.querySelector('.weather-icon')
const locationIcon= document.querySelector('.location-icon')
const tempElement= document.querySelector('.temperature-value p')
const descElement= document.querySelector('.temperature-description p')
const notificationElement= document.querySelector('.notification p')
const loationElement= document.querySelector('.location p')
var input =document.getElementById("search")
let city=""
let latitude =0.0
let longitude = 0.0
input.addEventListener("keyup", function(event){
    if(event.keycode===13){
        event.preventDefault();
        city= input.value
        getSearchWeather(city)
        console.log(city)
    }
})
const weather = {}
weather.temperature={
    unit: "celsius"
}
const kelvin = 273
const key="8709a2d449fb83bc9b208ab0582de0ae"
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else{
    notificationElement.style.display = "block"
    notification.innerHTML ="<p>Browser doesn't support geolocation</p>"
}
function setPosition(position){
    latitude= position.coords.latitude
    longitude= position.coords.longitude

    getWeather(latitude,longitude)
}
locationIcon.addEventListener("click",function(event){
    console.log("key")
    getWeather(latitude, longitude)
})
function showError(error){
    notificationElement.style.display ="block"
    notificationElement.innerHTML ="<p>$(error.message)</p>"
}
function getSearchWeather(city){
    let api ="https//api.openweather.org/data/2.5/weather?q=$(city)&appid=$(key)"
    fetch(api)
      .then(function(response){
        let data = response.json()
        return data
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp -kelvin)
        weather.description= data.weather[0].description
        weather.iconId= data.weather[0].iconElement
        weather.city = data.name
        weather.country = data.sys.country
    })
    .then (function(){
        displayWeather()
    })
}
function getWeather(latitude, longitude) {
    let api ="https//api.openweather.org/data/2.5/weather?lat=$(latitude)&lon=$(longitude)&appid=$(key)"
    fetch(api)
      .then(function(response){
        let data = response.json()
        return data
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp -kelvin)
        weather.description= data.weather[0].description
        weather.iconId= data.weather[0].iconElement
        weather.city = data.name
        weather.country = data.sys.country
    })
    .then (function(){
        displayWeather()
    })
}
function displayWeather(){
    iconElement.innerHTML= '<img src="icons/${weather.iconId}.png"/>'
    tempElement.innerHTML = '$(weather.temperature.value) *<span></span>'
    descElement.innerHTML = weather.description
    locationElement.innerHTML = "$(weather.city), $(weather.country)"
}