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
            //make table and add header condition
            $('<table id="weatherTable" class="pure-u-1-3 pure-table pure-table-bordered"><tr class="pure-table-odd" id="condition"><td>Condition:</td></tr></table>').appendTo( '#weatherData-inner' );
            $('<td>'+ data.weather.main +'</td>').appendTo('#condition');
            //add description
            $('<tr id="description"><td>Description:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.weather.description +'</td>').appendTo('#description');
            //add lat and lon
            $('<tr id="latLon" class="pure-table-odd"><td>Lat: '+data.coord.lat+'</td></tr>').appendTo( '#weatherTable' );
            $('<td>Lon: '+ data.coord.lon +'</td>').appendTo('#latLon');
            //add temp
            $('<tr id="temp"><td>Temperature:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.main.temp +'</td>').appendTo('#temp');
            //add low and high
            $('<tr id="loHi" class="pure-table-odd"><td>Low: '+data.main.temp_min+'</td></tr>').appendTo( '#weatherTable' );
            $('<td>High: '+ data.main.temp_max +'</td>').appendTo('#loHi');
            //add humidity
            $('<tr id="humidity"><td>Humidity:</td></tr>').appendTo( '#weatherTable' );
            $('<td>'+ data.main.humidity +'%</td>').appendTo('#humidity');
            //wind speed
            $('<tr id="wind" class="pure-table-odd"><td>Wind Speed:</td></tr>').appendTo( '#weatherTable' );
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
        $('#conditionImg').addClass('pure-u-1-3');
        
//        success();
    }
    
    //assign activities for current conndition
    function assignActivities(weatherCondition) {
        var activity1;
        var activity2;
        var activity3;

        switch(weatherCondition) {
            case "thunderstorm": case "extreme":
                activity1 = "boardGames";
                activity2 = "read";
                activity3 = "cleanHouse";
                break;
            case "drizzle":
                activity1 = "goShopping";
                activity2 = "cook";
                activity3 = "read";
                break;	
            case "rain":
                activity1 = "write";
                activity2 = "cleanHouse";
                activity3 = "videoGames";
                break;	
            case "snow":
                activity1 = "hotChocolate";
                activity2 = "ski";
                activity3 = "buildSnowman";
                break;	
            case "lowvisibility":
                activity1 = "cleanHouse";
                activity2 = "read";
                activity3 = "cook";
                break;				
            case "clouds":
                activity1 = "read";
                activity2 = "boardGames";
                activity3 = "cook";
                break;		
            case "clear":
                activity1 = "goOutside";
                activity2 = "goShopping";
                activity3 = "flyKite";
                break;
            case "windy":
                activity1 = "goOutside";
                activity2 = "flyKite";
                activity3 = "read";
                break;
        }
        addActivities(activity1, activity2, activity3);
        addActivityNav();
    } 
    
    //create activity panels
    function addActivities(act1, act2, act3) {
        var title;
        var desc;
        //create divs to hold panel content
        $('<div id="sliderContainer"></div>').appendTo("#weatherData-inner");
        $('#sliderContainer').addClass("pure-u-1-3");
        $('<div id="sliderWrapper"></div>').appendTo("#sliderContainer");
//        $('#sliderWrapper').addClass("pure-u-3-3");
        //activity one
            $('<div id="activityOne"></div').appendTo("#sliderWrapper");
            $('#activityOne').addClass("content");
            //activity one image
            $('<img/>').attr("id", "activityOneImg").appendTo("#activityOne");
            $('#activityOneImg').attr("src", "img/activityImg/"+act1+".jpg");  
            $('#activityOneImg').addClass("pure-img");
            $('#activityOneImg').addClass("activityImg");
            //activity one title
            title = assignTitle(act1);
            $('<h3>'+title+'</h3>').appendTo("#activityOne");
            //activity one desc
            desc = assignDesc(act1);
            $('<p>'+desc+'</p>').appendTo("#activityOne");     
        //activity two
            $('<div id="activityTwo"></div').appendTo("#sliderWrapper");
            $('#activityTwo').addClass("content");
            //activity two image
            $('<img/>').attr("id", "activityTwoImg").appendTo("#activityTwo");
            $('#activityTwoImg').attr("src", "img/activityImg/"+act2+".jpg");  
            $('#activityTwoImg').addClass("pure-img");
            $('#activityTwoImg').addClass("activityImg");
            //activity two title
            title = assignTitle(act2);
            $('<h3>'+title+'</h3>').appendTo("#activityTwo");
            //activity two desc
            desc = assignDesc(act2);
            $('<p>'+desc+'</p>').appendTo("#activityTwo");    
        //activity three
            $('<div id="activityThree"></div').appendTo("#sliderWrapper");
            $('#activityThree').addClass("content");
            $('<div id="activityThree"></div').appendTo("#sliderWrapper");
            $('#activityThree').addClass("content");
            //activity two image
            $('<img/>').attr("id", "activityThreeImg").appendTo("#activityThree");
            $('#activityThreeImg').attr("src", "img/activityImg/"+act3+".jpg");  
            $('#activityThreeImg').addClass("pure-img");
            $('#activityThreeImg').addClass("activityImg");
            //activity two title
            title = assignTitle(act3);
            $('<h3>'+title+'</h3>').appendTo("#activityThree");
            //activity two desc
            desc = assignDesc(act3);
            $('<p>'+desc+'</p>').appendTo("#activityThree");    
        
    }
    
    function addActivityNav() {
        var i=0;
        $('<div id=actNav></div>').insertAfter('#sliderContainer');
        $('<ul></ul>').attr("id", "actNavList").appendTo("#actNav");
        while (i < 3) {
            $('<li class="actLinks"></li>').attr("id", "actNavButton"+i).appendTo("#actNavList");
            $('#actNavButton'+i).attr("data-pos", i * -350+"px");
            $('#actNavButton'+i).click(changePosition);
            $('#actNavButton'+i).click(changeActive);
            i++
        }
        
        $('#actNavButton0').addClass("active");
    }
    
    function changePosition() {
        var clicked = $(this).attr('id');
        var pixelChange = $("#"+clicked).attr('data-pos');
        $('#sliderWrapper').css({
            transform: 'translate3d(0, '+pixelChange+', 0)'
        });
    }
    
    
    function changeActive() {
        if ($('.actLinks').hasClass("active")) {
            $('.actLinks').removeClass("active")
        }
        $(this).toggleClass("active");
    }
    
    //assign a title based on activity
    function assignTitle(activity) {
        var title;
        switch(activity) {
            case "boardGames":
                title = "Play a Board Game!";
                return title;
                break;
            case "read":
                title = "Go Read!";
                return title;
                break;
            case "cleanHouse":
                title = "Clean Your House!";
                return title;
                break;
            case "goShopping":
                title = "Go Shopping!";
                return title;
                break;
            case "cook":
                title = "Cook Something!";
                return title;
                break;
            case "write":
                title = "Write Something!";
                return title;
                break;
            case "videoGames":
                title = "Play Some Video Games!";
                return title;
                break;
            case "hotChocolate":
                title = "Drink Some Hot Chocolate!";
                return title;
                break;
            case "ski":
                title = "Go Skiing!";
                return title;
                break;
            case "buildSnowman":
                title = "Build a Snowman!";
                return title;
                break;
            case "goOutside":
                title = "Get Outside!";
                return title;
                break;
            case "flyKite":
                title = "Go Fly a Kite!";
                return title;
                break;										
        }
    }
    
    //assign a description based on activity
    function assignDesc(activity) {
        var desc;
        switch(activity) {
            case "boardGames":
                desc = "Board games are a great way to pass some time with friends! Grab your favorite and get playing.";
                return desc;
                break;
            case "read":
                desc = "Some say you're defined by the people you associate with and the books you read. Start reading a great book!";
                return desc;
                break;
            case "cleanHouse":
                desc = "Chances are there is something in your house or apartment that needs to be cleaned. Get to it!";
                return desc;
                break;
            case "goShopping":
                desc = "It's a perfect day to go shopping and spend some of your hard earned cash. Pick up something for me!";
                return desc;
                break;
            case "cook":
                desc = "Learn about a new recipe, then mess it up! Add a new meal to your arsenal.";
                return desc;
                break;
            case "write":
                desc = "Try your hand at some writing then put it online! You never know who will see your work.";
                return desc;
                break;
            case "videoGames":
                desc = "Video games are a great way to waste a day away. Go rent a new game or dust off an old favorite!";
                return desc;
                break;
            case "hotChocolate":
                desc = "Baby, it's cold outside! Grab a blanket and fill up with some hot chocolate.";
                return desc;
                break;
            case "ski":
                desc = "Go tear up that mountain and test that new powder bruh! Avalanche!";
                return desc;
                break;
            case "buildSnowman":
                desc = "Building a man of snow is an old favorite on a snowey day. Go build one and post it online!";
                return desc;
                break;
            case "goOutside":
                desc = "Get off your tuckus and go for a hike, bike ride, or whatever. Just go outside and get your blood flowing!";
                return desc;
                break;
            case "flyKite":
                desc = "It's windy enough to fly a kite outside and excite your inner child. Grab one and get going.";
                return desc;
                break;										
        }
    }
    
    
    
    
});