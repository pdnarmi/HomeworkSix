(function() {
    var cities = localStorage.getItem("cities");

    cities = (cities) ? JSON.parse(cities) : [];

    appendCities(cities);
})();


function appendCities(cities){
    

    var cityList = document.getElementById('cityList');

    var output = [];

    for(var i = 0; i< cities.length; i++){
        output.push(
            `<li style="list-style-type: none; justify: center;"><a id='city${i}' onClick='searchWeather("${cities[i]}")'>${cities[i]}</a></li>`
        );
   
    }

    cityList.innerHTML = output.join('');
    console.log(cityList)
}


$('#searchCity').on('click', function(e){
    $('#cityName').empty();
    $('#temp').empty();
    $('#humidity').empty();
    $('#windSpeed').empty();
    $('#uvIndex').empty();

    var cities = localStorage.getItem("cities");

    cities = (cities) ? JSON.parse(cities) : [];

    cities.push($('#city').val())

    localStorage.setItem("cities", JSON.stringify(cities));

    appendCities(cities);


   
   
    e.preventDefault();
    
    var city = $('#city').val();

    searchWeather(city);
})


function searchWeather(city){
    console.log(city);
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=166a433c57516f51dfab1f7edaed8413",
        method: "GET"
    }).then(function(response){
        console.log("first ajax call",response);
        var tempF = (response.main.temp - 273.15);
        var temp = tempF.toFixed(2);
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var humidity = response.main.humidity;
        var windSpeed= response.wind.speed;

        $('#cityName').empty();
        $('#temp').empty();
        $('#humidity').empty();
        $('#windSpeed').empty();
        $('#uvIndex').empty();
       
        $('#cityName').append('City: ', city);
        $('#temp').append('Temp(C): ', temp);
        $('#humidity').append('Humidity: ', humidity+"%");
        $('#windSpeed').append('Wind Speed: ', windSpeed+"m/s");
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=166a433c57516f51dfab1f7edaed8413",
            method: "GET"
        }).then(function(response){
            console.log("second ajax call",response);
            var uvIndex= response.current.uvi;
           
            $('#uvIndex').append('UV Index: ', uvIndex);
             if (uvIndex > 3){
               $('#uvIndex').css('color', 'red');
            }else if (uvIndex<3){
               $('#uvIndex').css('color', 'green');
            }
            
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+long+"&appid=166a433c57516f51dfab1f7edaed8413",
                method: "GET"
            }).then(function(response){
                console.log("third ajax call",response);

                for(var i = 0; i < response.list.length; i++){
                    $('#icon' + i).empty();
                    computeHighs(i, response);
                    computeLows(i, response);

                    if (response.list[i].weather[0].main === "Clouds"){
                        var cloudElement = document.createElement('img');
                        cloudElement.src = "assets/cloud.png"

                        $("#icon"+i).append(cloudElement);
                    };
                    
                    if (response.list[i].weather[0].main === "Clear"){
                        var sunElement = document.createElement('img');
                        sunElement.src = "assets/sun.png"
                        $("#icon"+i).append(sunElement);
                    };
                    
                    if (response.list[i].weather[0].main === "Rain"){
                        var rainElement = document.createElement('img');
                        rainElement.src = "assets/water.png"
                        $("#icon"+i).append(rainElement);
                    };

                    $('#day'+i).css('visibility', 'visible')
                }
            })
        })
    })
}


function computeHighs(i, response){
    $('#high'+i).empty();
    var rawHigh = (response.list[i].temp.max- 273.15);
    var high= rawHigh.toFixed(2);
    $('#high'+i).append("High: ", high);
}
function computeLows(i, response){
    $('#low'+i).empty();
    var rawLow = (response.list[i].temp.min -273.15);
    var low = rawLow.toFixed(2);
    $('#low'+i).append("Low: ", low);
};