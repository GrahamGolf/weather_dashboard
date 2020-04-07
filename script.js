$( document ).ready(function() {

console.log($(this))

$( "#search" ).click(function() {
    $("#current_weather").empty();

    var citySearch = ($(this)[0].previousElementSibling.value);
    var authKey = "28758975a50d651d79b0c8eaedc2c1d9";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + authKey;

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

    var lon = data.coord.lon
    var lat = data.coord.lat

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + authKey + "&lat=" + lat + "&lon=" + lon,
        method:"GET"})
        .done(function(result) {
            console.log(result);

            var temp = "<p> Temperature: "+ data.main.temp + "</p>";
            var humidity = "<p> Humidity: "+ data.main.humidity + "%</p>";
            var windSpeed = "<p> Wind Speed: "+ data.wind.speed + " MPH</p>";
            
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

            $("#current_weather").append(temp, humidity, windSpeed, uv);
            

        })


    // var time = ($(this)[0].parentElement.id)
    // console.log (inputText,time)
    // localStorage.setItem(time, inputText);

  });












});
});