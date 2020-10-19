var clouds1 = document.createElement('img');
var clouds2= document.createElement('img');
var clouds3= document.createElement('img');
var clouds4= document.createElement('img');
var clouds5= document.createElement('img');
clouds1.src = "assets/cloud.png";
clouds2.src= "assets/cloud.png";
clouds3.src= "assets/cloud.png";
clouds4.src= "assets/cloud.png";
clouds5.src= "assets/cloud.png";
var sun1 = document.createElement('img');
var sun2 = document.createElement('img');
var sun3 = document.createElement('img');
var sun4 = document.createElement('img');
var sun5 = document.createElement('img');
sun1.src = "assets/sun.png";
sun2.src = "assets/sun.png";
sun3.src = "assets/sun.png";
sun4.src = "assets/sun.png";
sun5.src = "assets/sun.png";
var rain1= document.createElement('img');
var rain2= document.createElement('img');
var rain3= document.createElement('img');
var rain4= document.createElement('img');
var rain5= document.createElement('img');
rain1.src= "assets/water.png";
rain2.src= "assets/water.png";
rain3.src= "assets/water.png";
rain4.src= "assets/water.png";
rain5.src= "assets/water.png";


$('#searchCity').on('click', function(e){
    $('#cityName').empty();
    $('#temp').empty();
    $('#humidity').empty();
    $('#windSpeed').empty();
    $('#uvIndex').empty();
    $('#high1').empty();
    $('#high2').empty();
    $('#high3').empty();
    $('#high4').empty();
    $('#high5').empty();
    $('#low1').empty();
    $('#low2').empty();
    $('#low3').empty();
    $('#low4').empty();
    $('#low5').empty();
    $('#icon1').empty();
    $('#icon2').empty();
    $('#icon3').empty();
    $('#icon4').empty();
    $('#icon5').empty();
   
    e.preventDefault();
    
    var city = $('#city').val();
    
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=166a433c57516f51dfab1f7edaed8413",
        method: "GET"
    }).then(function(response){
        console.log(response);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var temp = tempF.toFixed(2);
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var humidity = response.main.humidity;
        var windSpeed= response.wind.speed;
       
        $('#cityName').append('City: ', city);
        $('#temp').append('Temp(C): ', temp);
        $('#humidity').append('Humidity: ', humidity+"%");
        $('#windSpeed').append('Wind Speed: ', windSpeed+"m/s");
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=166a433c57516f51dfab1f7edaed8413",
            method: "GET"
        }).then(function(response){
            console.log(response);
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
                console.log(response);
                var rawHigh1= (response.list[0].temp.max- 273.15)
                var rawHigh2= (response.list[1].temp.max- 273.15)
                var rawHigh3= (response.list[2].temp.max- 273.15)
                var rawHigh4= (response.list[3].temp.max- 273.15)
                var rawHigh5= (response.list[4].temp.max- 273.15)
                var rawLow1=  (response.list[0].temp.min- 273.15)          
                var rawLow2=  (response.list[1].temp.min- 273.15)
                var rawLow3=  (response.list[2].temp.min- 273.15) 
                var rawLow4=  (response.list[3].temp.min- 273.15) 
                var rawLow5=  (response.list[4].temp.min- 273.15)
                var high1= rawHigh1.toFixed(2);
                var high2= rawHigh2.toFixed(2); 
                var high3= rawHigh3.toFixed(2); 
                var high4= rawHigh4.toFixed(2); 
                var high5= rawHigh5.toFixed(2); 
                var low1= rawLow1.toFixed(2);
                var low2= rawLow2.toFixed(2);
                var low3= rawLow3.toFixed(2);
                var low4= rawLow4.toFixed(2);
                var low5= rawLow5.toFixed(2);
                
                $('#high1').append("High: ", high1);
                $('#high2').append("High: ", high2);
                $('#high3').append("High: ", high3);
                $('#high4').append("High: ", high4);
                $('#high5').append("High: ", high5);
                $('#low1').append("Low: ",    low1);
                $('#low2').append("Low: ",    low2);
                $('#low3').append("Low: ",    low3);
                $('#low4').append("Low: ",    low4);
                $('#low5').append("Low: ",    low5);
                
                if (response.list[0].weather[0].main === "Clouds"){
                    $('#icon1').append(clouds1);
                };
                
                if (response.list[0].weather[0].main === "Clear"){
                    $('#icon1').append(sun1);
                };
                
                if (response.list[0].weather[0].main === "Rain"){
                    $('#icon1').append(rain1);
                };
               
                if (response.list[1].weather[0].main === "Clouds"){
                    $('#icon2').append(clouds2);
                };
                
                if (response.list[1].weather[0].main === "Clear"){
                    $('#icon2').append(sun2);
                };
                
                if (response.list[1].weather[0].main === "Rain"){
                    $('#icon2').append(rain2);
                };
                
                if (response.list[2].weather[0].main === "Clouds"){
                    $('#icon3').append(clouds3);
                };
                
                if (response.list[2].weather[0].main === "Clear"){
                    $('#icon3').append(sun3);
                };
               
                if (response.list[2].weather[0].main === "Rain"){
                    $('#icon3').append(rain3);
                };
               
                if (response.list[3].weather[0].main === "Clouds"){
                    $('#icon4').append(clouds4);
                };
                
                if (response.list[3].weather[0].main === "Clear"){
                    $('#icon4').append(sun4);
                };
               
                if (response.list[3].weather[0].main === "Rain"){
                    $('#icon4').append(rain4);
                };
                
                if (response.list[4].weather[0].main === "Clouds"){
                    $('#icon5').append(clouds5);
                };
               
                if (response.list[4].weather[0].main === "Clear"){
                    $('#icon5').append(sun5);
                };
                
                if (response.list[4].weather[0].main === "Rain"){
                    $('#icon5').append(rain5);
                };
                
                $('#day1').css('visibility', 'visible');
                $('#day2').css('visibility', 'visible');
                $('#day3').css('visibility', 'visible');
                $('#day4').css('visibility', 'visible');
                $('#day5').css('visibility', 'visible');
            })
        })
    })
})
function saveCity(e){
    e.preventDefault();
    localStorage.setItem;
}