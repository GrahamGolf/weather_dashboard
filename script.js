$( document ).ready(function() {

console.log($(this))

$( "#search" ).click(function() {
    var citySearch = ($(this)[0].previousElementSibling.value);
    var authKey = "28758975a50d651d79b0c8eaedc2c1d9";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + authKey;

    $.ajax({
        url: queryURL, 
        method:"GET"})
        .done(function(data) {
            console.log(data)

            var temp = "<p> temperature: "+ data.main.temp + "</p>";
            var humidity = "<p> humidity: "+ data.main.humidity + "</p>";
            $("#current_weather").append(temp, humidity);
            

        })
    // var time = ($(this)[0].parentElement.id)
    // console.log (inputText,time)
    // localStorage.setItem(time, inputText);

  });












});