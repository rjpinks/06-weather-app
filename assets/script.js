var searchBox = document.querySelector("#search-box");
var weatherCallUrl = "";

function secondFetch () {
    fetch(weatherCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //this loop will need to give me the 5 day forecast n whatnot.
            console.log("lol wut");
            for (let index = 0; index < data.list.length; index++) {
                console.log(data.list[index].main.temp);
                console.log(data.list[index].weather[0].main);
                console.log(data.list[index].weather[0].description);
            }
        })
}

searchBox.addEventListener("submit", function(event) {
    event.preventDefault();

    //this is what the user inputs
    var searchedCity = document.querySelector("#city-search").value;
    var cityApiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=1&appid=e03ff718bfde42745e7d19afe3ccf6bc";

    fetch(cityApiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //this for loop needs to return the lat and long of the city. it's only one point returned to me, but it's good practice.
            for (let index = 0; index < data.length; index++) {
                var cityData = data[index];
                var dataList = [cityData.lat, cityData.lon];
                weatherCallUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + dataList[0] + "&lon=" + dataList[1] + "&units=imperial" + "&appid=e03ff718bfde42745e7d19afe3ccf6bc";
                //console.log("in function" ,weatherCallUrl);
                return weatherCallUrl;
            };
        })
})

/*
PSEUDOCODE

PHASE 1:
When I enter a city into the value field of the form and submit,
    1st i must do a API call to get the coordinates of the city
    2nd once i have them i must do a new API call to get the weather
    i ONLY need to display the weather

PHASE2:
The data the I fetched will be posted into 2 different sections. Current day/info & the 5-day forecast
    to do this I will need to do a for loop. if index === 0 post in current. else post in 5 day. (actually need will need to look at the data i get from API for better judgement)
    I will need to do the 3 steps of adding to the DOM
    This should be plenty to work on for now. */