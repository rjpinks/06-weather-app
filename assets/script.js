//secondFetch() works. can access the data using that for loop. need to make it append to website
var searchBox = document.querySelector("#search-box");
var weatherCallUrl = "";
var fiveDay = document.querySelector("#five-day");
var fiveDayList = document.querySelector("#five-day-list");
var pastSearches = document.querySelector("#past-searches-section");

function secondFetch () {
    fetch(weatherCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //this loop will need to give me the 5 day forecast n whatnot.
            for (let index = 0; index < 6; index++) {
                var mainTemp = data.list[index].main.temp;
                console.log("mainTemp", mainTemp);
                var windSpeed = data.list[index].wind.speed;
                console.log("windSpeed", windSpeed);
                var weatherHumidity = data.list[index].main.humidity;
                console.log("weatherHumidity", weatherHumidity);
                var weatherIcons = ['rainy', 'sunny', 'ac_unit', 'cloudy'];
                
                if (index === 0) {
                    var newListItem = document.createElement("h3");
                    var listContent = document.createTextNode('Current Weather in ' + document.querySelector("#city-search").value);
                    var iconEl = document.createElement('span');
                    var iconElAtt = document.createAttribute('class');
                    iconElAtt.value = 'material-symbols-outlined'
                    iconEl.setAttributeNode(iconElAtt);
                    console.log(data.list[index].weather[0].main)
                    
                    if (data.list[index].weather[0].main === 'Rain') {
                        iconEl.innerHTML = weatherIcons[0]
                        localStorage.setItem('icon', weatherIcons[0])
                    } else if (data.list[index].weather[0].main === 'Clouds') {
                        iconEl.innerHTML = weatherIcons[3]
                        localStorage.setItem('icon', weatherIcons[3])
                    } else if (data.list[index].weather[0].main === 'Clear') {
                        iconEl.innerHTML = weatherIcons[1]
                        localStorage.setItem('icon', weatherIcons[1])
                    } else {
                        iconEl.innerHTML = weatherIcons[2]
                        localStorage.setItem('icon', weatherIcons[2])
                    }
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);
                    
                    newListItem = document.createElement("li");
                    listContent = document.createTextNode("Temperature: " + mainTemp + ' F');
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);
                    
                    newListItem = document.createElement("li");
                    listContent = document.createTextNode("Wind Speed: " + windSpeed);
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);
                    
                    var newListItem = document.createElement("li");
                    var listContent = document.createTextNode("Humidity: " + weatherHumidity + "%");
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);
                    
                    document.body.appendChild(iconEl)
                } else {
                    var newListItem = document.createElement("h3");
                    var listContent = document.createTextNode("Day " + index);
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);
                   
                    var iconEl = document.createElement('span');
                    var iconElAtt = document.createAttribute('class');
                    iconElAtt.value = 'material-symbols-outlined'
                    iconEl.setAttributeNode(iconElAtt);
                    console.log(data.list[index].weather[0].main)
                    
                    if (data.list[index].weather[0].main === 'Rain') {
                        iconEl.innerHTML = weatherIcons[0]
                    } else if (data.list[index].weather[0].main === 'Clouds') {
                        iconEl.innerHTML = weatherIcons[3]
                    } else if (data.list[index].weather[0].main === 'Clear') {
                        iconEl.innerHTML = weatherIcons[1]
                    } else {
                        iconEl.innerHTML = weatherIcons[2]
                    }
                    
                    newListItem = document.createElement("li");
                    listContent = document.createTextNode("Temperature: " + mainTemp + ' Fahrenheit');
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);
                    
                    newListItem = document.createElement("li");
                    listContent = document.createTextNode("Wind Speed: " + windSpeed);
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);

                    var newListItem = document.createElement("li");
                    var listContent = document.createTextNode("Humidity: " + weatherHumidity + "%");
                    newListItem.appendChild(listContent);
                    document.body.appendChild(newListItem);

                    document.body.appendChild(iconEl);
            }}
            localStorage.setItem('city', document.querySelector("#city-search").value);
            localStorage.setItem('temp', mainTemp);
        })
}

searchBox.addEventListener("submit", function(event) {
    event.preventDefault();

    //this is what the user inputs
    var searchedCity = document.querySelector("#city-search").value;
    var cityApiCall = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=1&appid=e03ff718bfde42745e7d19afe3ccf6bc";

    fetch(cityApiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //this for loop needs to return the lat and long of the city. it's only one point returned to me, but it's good practice.
            for (let index = 0; index < data.length; index++) {
                var cityData = data[index];
                var dataList = [cityData.lat, cityData.lon];
                weatherCallUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + dataList[0] + "&lon=" + dataList[1] + "&units=imperial" + "&appid=e03ff718bfde42745e7d19afe3ccf6bc";
                console.log("in function, weatherCallUrl: " ,weatherCallUrl);
            }
            secondFetch();
        })

})

if (localStorage.temp) {
    var pastTemp = document.querySelector('#past-temp');
    pastTemp.innerHTML = localStorage.temp + ' Fahrenheit'
}

if (localStorage.city) {
    var pastCity = document.querySelector('#past-city')
    pastCity.innerHTML = localStorage.city
}

if (localStorage.icon) {
    var pastIcon = document.querySelector('#past-icon')
    pastIcon.innerHTML = localStorage.icon
}