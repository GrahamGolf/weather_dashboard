$( document ).ready(function() {

console.log($(this))

var searchedCities = localStorage.getItem("searchedCities").split(",");
console.log(searchedCities);
for (let index = 0; index < searchedCities.length; index++) {
    var pastSearches = "<button class = 'historyButton'>" + searchedCities[index] + "</button><br>";
    $("#searched").append(pastSearches);
}

function getWeatherInfo(citySearch) {

    var authKey = "28758975a50d651d79b0c8eaedc2c1d9";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial" + "&APPID=" + authKey;
    var secondURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial" + "&appid=" + authKey;

    if (searchedCities.indexOf(citySearch) == -1 && searchedCities.length < 8) {
        searchedCities.push(citySearch);
        console.log(searchedCities);
        localStorage.setItem("searchedCities", searchedCities);
        var pastSearches = "<button class = 'historyButton'>" + citySearch + "</button><br>";
        $("#searched").append(pastSearches);
    }
    else if (searchedCities.indexOf(citySearch) == -1 && searchedCities.length >= 8) {
        searchedCities.shift();
        searchedCities.push(citySearch);
        console.log(searchedCities);
    }


//create array
//as cities are searched, check if its already in array
//if it is, run the ajax call to search it
//if its not, add it to array and do the search
//limit of 8 in array
//less than 8-push to array
//8 - .pop or .shift

    $.ajax({
        url: queryURL, 
        method:"GET"})
        .done(function(data) {
            console.log(data)
            console.log(data.weather[0].icon)
    var lon = data.coord.lon
    var lat = data.coord.lat

    $.ajax({
        url: secondURL, 
        method:"GET"})
        .done(function(forecast) {
            console.log(forecast);


    var forecastData = [forecast.list[4], forecast.list[12], forecast.list[20], forecast.list[28], forecast.list[36]];
                console.log(forecastData);

                for (let index = 0; index < forecastData.length; index++) {
                var mainDiv = $("<div>").addClass("forecastDay");
                var forecastDate = "<p>"+ forecastData[index].dt_txt + "</p>";
                var day = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastData[0].weather[0].icon + ".png");
                var dayIcon = "";
                var temp = "<p> Temp: "+ forecastData[index].main.temp + "°F</p>";
                var forecastHumidity = "<p> Humidity: "+ forecastData[index].main.humidity + "%</p>";
                mainDiv.append(day, temp, forecastHumidity, forecastDate);
                $("#forecast").append(mainDiv);
}



    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + authKey + "&lat=" + lat + "&lon=" + lon,
        method:"GET"})
        .done(function(result) {
            console.log(result);

            var temp = "<p> Temperature: "+ data.main.temp + "°F</p>";
            var humidity = "<p> Humidity: "+ data.main.humidity + "%</p>";
            var windSpeed = "<p> Wind Speed: "+ data.wind.speed + " MPH</p>";
            var cityName = "<h2> City: "+ citySearch.charAt(0).toUpperCase() + citySearch.slice(1) + " </h2>";
            var date = "<p> Date: "+ result.date_iso + " </p>";
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            if (result.value <3) {
                var uv = "<p> UV Index: <span class = 'green'>"+ result.value + "</span></p>";
            }

            else if (result.value <6) {
                var uv = "<p> UV Index: <span class = 'yellow'>"+ result.value + "</span></p>";
            }

            else if (result.value <8) {
                var uv = "<p> UV Index: <span class = 'orange'>"+ result.value + "</span></p>";
            }

            else if (result.value <11) {
                var uv = "<p> UV Index: <span class = 'red'>"+ result.value + "</span></p>";
            }

            else {
                var uv = "<p> UV Index: <span class = 'purple'>"+ result.value + "</span></p>";
            }

            $("#current_weather").append(cityName, date, icon, temp, humidity, windSpeed, uv);
            
        
        })
    })

    // var time = ($(this)[0].parentElement.id)
    // console.log (inputText,time)
    // localStorage.setItem(time, inputText);

  });
    
}

$( "#search" ).click(function() {
    $("#current_weather").empty();

    var citySearch = ($(this)[0].previousElementSibling.value);
    getWeatherInfo(citySearch);


});
$( ".historyButton" ).click(function() {
    $("#current_weather").empty();
    console.log($(this));
    var citySearch = ($(this)[0].innerText);
    getWeatherInfo(citySearch);

});
});