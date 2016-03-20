$( document ).ready(function() {
    //functions to display error and successes
    function success() {
        $('<div class="success">Success!</div>').insertBefore('.banner').delay(2000).fadeOut();
    }
    
    function zipError() {
        $('<div class="error">The Zip Code you entered was not valid...</div>').insertBefore('.banner').delay(2000).fadeOut();    
    }
    
    function showGeoError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                $('<div class="error">User denied the request for Geolocation.</div>').insertBefore('.banner').delay(3000).fadeOut();
                break;
            case error.POSITION_UNAVAILABLE:
                $('<div class="error">Location information is unavailable.</div>').insertBefore('.banner').delay(3000).fadeOut();
                break;
            case error.TIMEOUT:
                $('<div class="error">The request to get user location timed out.</div>').insertBefore('.banner').delay(3000).fadeOut();
                break;
            case error.UNKNOWN_ERROR:
                $('<div class="error">An unknown error occurred.</div>').insertBefore('.banner').delay(3000).fadeOut();
                break;
        }
    }   
    
    function geoNotSupported() {
        $('<div class="error">Geolocation Not supported in this browser, enter a Zip code.</div>').insertBefore('.banner').delay(3000).fadeOut();
    }
    
    var jsonUrl = "";

    //Zip Code Search Function
    $( "#zipSearch" ).click(zipSearch); 
    
    function zipSearch() {
        var zipPatt = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
        var zipResult = zipPatt.test($("#zipCode").val());
        if (zipResult == true) {
            $.ajax({
                method: 'get',
                url: 'includes/zipWeather.php',
                data: {
                'zip': $("#zipCode").val()
                },
                success: function(data) {
                    changeHeader()
                    
                    jsonUrl = "data/zipData.json";
                    loadData(jsonUrl);
                }
            });
        } else {
            zipError();
        }
    }
    

    
    //Geolocation search function
    $("#locationSearch").click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setGeoData, showGeoError);
        } else {
            geoNotSupported();
        }
        
    })
    
    function setGeoData(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var roundedLat = Math.round(latitude);
        var roundedLon = Math.round(longitude);
        
        $.ajax({
            method: 'get',
            url: 'includes/geoWeather.php',
            data: {
            'lat': roundedLat,
            'lon': roundedLon     
            },
            success: function(data) {
            changeHeader()
                    
            jsonUrl = "data/coordData.json";
            loadData(jsonUrl);
            }
        });
    }
    
    //City List click function
    $( "#retrieveList" ).click(listSearch); 
    
    function listSearch() {
        
        switch($("#citySelect").val()) {
            case 'chicago':
                jsonUrl = "data/cities/chicagoData.json"
                break;
            case 'grandcanyon':
                jsonUrl = "data/cities/grandcanyonData.json"
                break;
            case 'newyork':
                jsonUrl = "data/cities/newyorkData.json"
                break;
            case 'orlando':
                jsonUrl = "data/cities/orlandoData.json"
                break;
            case 'sanfran':
                jsonUrl = "data/cities/sanfranData.json"
                break;
        }
        
        changeHeader()

        loadData(jsonUrl);
    }
    
    function changeHeader() {
        //empty banner
        $( ".banner" ).animate({
            height : 80
        },600);
        
        $( ".banner-head" ).animate({
            backgroundColor : "#1D1840"
        },600);

    }
    
    function loadData (jsonUrl) {
        $('#weatherData').empty().fadeOut;
        $.getJSON( jsonUrl, function( data ) {
            //add cty name  
            $('<h2>'+data.name+'</h2>').appendTo( '#weatherData' );
            //add inner data container
            $('<div id="weatherData-inner" class="centered"></div>').appendTo('#weatherData');
            //add condition
            $('<table id="weatherTable" class="pure-u-1-2"><tr id="condition"><td>Condition:</td></tr></table>').appendTo( '#weatherData-inner' );
            $('<td>'+ data.weather.main +'</td>').appendTo('#condition');
            //add description
            $('<tr id="description"><td>Description:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.weather.description +'</td>').appendTo('#description');
            //add lat and lon
            $('<tr id="latLon"><td>Lat: '+data.coord.lat+'</td></tr>').appendTo( '#weatherTable' );
            $('<td>Lon: '+ data.coord.lon +'</td>').appendTo('#latLon');
            //add temp
            $('<tr id="temp"><td>Temperature:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.main.temp +'</td>').appendTo('#temp');
            //add low and high
            $('<tr id="loHi"><td>Low: '+data.main.temp_min+'</td></tr>').appendTo( '#weatherTable' );
            $('<td>High: '+ data.main.temp_max +'</td>').appendTo('#loHi');
            //add humidity
            $('<tr id="humidity"><td>Humidity:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.main.humidity +'%</td>').appendTo('#humidity');
            //wind speed
            $('<tr id="wind"><td>Wind Speed:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.wind.speed +' mph</td>').appendTo('#wind');
            
            //assign id to weather condition to be used in assigncondition()
			var weatherCondition = data.weather.id;
            assignCondition(weatherCondition);
        })
    }
    
    //function to assign a condition based on weather ID code to appropriate condition
    function assignCondition(weatherCondition) {
        switch(weatherCondition) {
            //assign thunderstorm
            case 200: case 201: case 202: case 210: case 211: case 212: case 221: case 230: case 231: case 232:
                weatherCondition = "thunderstorm";
                break;
            //asssign drizzle
            case 300: case 301: case 302: case 310: case 311: case 312: case 313: case 314: case 321: 
                weatherCondition = "drizzle";
                break;	
            //assign rain
            case 500: case 501: case 502: case 503: case 504: case 511: case 520: case 521: case 522: case 531: case 960:
                weatherCondition = "rain";
                break;
            //assign snow
            case 600: case 601: case 602: case 611: case 612: case 615: case 616: case 620: case 621: case 622: 
                weatherCondition = "snow";
                break;
            //assign low visibility
            case 701: case 711: case 721: case 731: case 741: case 751: case 761: case 762: 
                weatherCondition = "lowvisibility";
                break;
            //assign clear sky
            case 800: case 951: case 952: case 953: case 954: case 955: 
                weatherCondition = "clear";
                break;
            //assign clouds
            case 801: case 802: case 803: case 804:
                weatherCondition = "clouds";
                break;
            //assign extreme
            case 900: case 901: case 902: case 903: case 904: case 905: case 906: case 771: case 781: case 961: case 962:
                weatherCondition = "extreme";
                break;
            //assign windy	
            case 956: case 957: case 958: case 959: 
            weatherCondition = "windy";
                break;			
        }
        //alert(weatherCondition);
        addConditionImg(weatherCondition);
        assignActivities(weatherCondition);
    }
    
    //add main image for condition
    function addConditionImg(weatherCondition) {
        //create image
        $("<img/>").attr("id", "conditionImg").insertBefore("#weatherTable");
        $("#conditionImg").attr("src", "img/conditionImg/"+weatherCondition+".png");
        $("#conditionImg").attr("alt", "Image representing "+weatherCondition+" weather.");
        $('#conditionImg').addClass('pure-img');
        $('#conditionImg').addClass('pure-u-1-2');
        
        success();
    }

});