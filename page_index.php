<?php
    include('includes/cityWeather.php');
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="A layout example that shows off a responsive pricing table.">

    <title>Assignment 02 jQuery – Andrew Burdett</title>

<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">

<!--[if lte IE 8]>
  
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/grids-responsive-old-ie-min.css">
  
<![endif]-->
<!--[if gt IE 8]><!-->
  
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/grids-responsive-min.css">
  
<!--<![endif]-->
  
    <!--[if lte IE 8]>
        <link rel="stylesheet" href="css/layouts/pricing-old-ie.css">
    <![endif]-->
    <!--[if gt IE 8]><!-->
        <link rel="stylesheet" href="css/layouts/pricing.css">
    <!--<![endif]-->
  
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div id="content-wrap">    
    <div class="banner">
        <h1 class="banner-head">
            IdeaWeather
        </h1>
    </div>

    <div class="container centered">    
        <div class="pure-g">
            <div class="pure-u-1-3">
                <img class="pure_img centered" src="img/zip.png" alt="Find weather by zip">
                <div class="centered">
                    <span>Zip</span>
                    <input type="text" id="zipCode"/>
                    <br>
                    <span class="button centered" id="zipSearch">Search Zip</span>
                </div>
            </div>
            <div class="pure-u-1-3">
                <img class="pure_img centered" src="img/geolocation.png" alt="Find location by geolocation">
                <div class="centered">
                    <span class="geolocation">Geolocation</span>
                    <br>
                    <span class="button centered" id="locationSearch">Click for Location</span>
                </div>
            </div>
            <div class="pure-u-1-3">
                <img class="pure_img centered" src="img/list.png" alt="Find weather by list">
                <div class="centered">
                    <span>Listed Cities</span>
                    <select id="citySelect">
                        <option value="orlando">Orlando</option>
                        <option value="grandcanyon">Grand Canyon</option>
                        <option value="newyork">New York</option>
                        <option value="chicago">Chicago</option>
                        <option value="sanfran">San Francisco</option>
                    </select>
                    <br>
                    <span class="button centered" id="retrieveList">Retrieve Data</span>
                </div>
            </div>
        </div>
    </div>    
</div>
<footer>
    <p>
        Designed by Andrew Burdett for DIG4503 at the University of Central Florida 
    </p>
</footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="js/weather.js"></script>
    
</body>
</html>
