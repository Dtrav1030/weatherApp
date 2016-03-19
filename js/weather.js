$( document ).ready(function() {
    //functions to display error and successes
    function success() {
        $('<div class="success">Success!</div>').insertBefore('.banner').delay(3000).fadeOut();
    }
    
    function zipError() {
        $('<div class="error">The Zip Code you entered was not valid...</div>').insertBefore('.banner').delay(3000).fadeOut();    
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

    //Zip Code Search Function
    $( "#zipSearch" ).click(function() {
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
                success();
                }
            });
        } else {
            zipError();
        }
    });

    
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
            success();
            }
        });
    }
//    jQuery(document).ready(function($) {
//	alert("Your location is: " + geoplugin_countryName() + ", " + geoplugin_region() + ", " + geoplugin_city());
//
//	var country = geoplugin_countryName();
//	$("#country").append("<option value='1' selected>"+country+"</option>");
//
//	var zone = geoplugin_region();
//	$("#zone").append("<option value='1' selected>"+zone+"</option>");
//
//	var district = geoplugin_city();
//	$("#district").append("<option value='1' selected>"+district+"</option>");
//});
});