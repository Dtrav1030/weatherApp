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
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
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
        <h1 class="siteName banner-head">
            IdeaWeather
        </h1>
    </div>

    <div class="container centered">    
        <div class="pure-g">
            <div class="pure-u-1 pure-u-sm-1-2 pure-u-md-1-3">
                <img class="pure-img centered" src="img/zip.png" alt="Find weather by zip">
                <div class="centered">
                    <span>Zip</span>
                    <input type="text" id="zipCode"/>
                    <br>
                    <span class="button centered" id="zipSearch">Search Zip</span>
                </div>
            </div>
            <div class="pure-u-1  pure-u-sm-1-2 pure-u-md-1-3">
                <img class="pure-img centered" src="img/geolocation.png" alt="Find location by geolocation">
                <div class="centered">
                    <span class="geolocation">Geolocation</span>
                    <br>
                    <span class="button centered" id="locationSearch">Click for Location</span>
                </div>
            </div>
            <div class="pure-u-1  pure-u-sm-1 pure-u-md-1-3">
                <img class="pure-img centered" src="img/list.png" alt="Find weather by list">
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
            <div id="loading" class="centered pure-u-1">Loading...</div>
        </div>
        <div id="weatherData" class="centered pure-g"></div>
    </div>
</div>
<footer>
        Designed by Andrew Burdett for DIG4503 at the University of Central Florida 
       <div id="valid">
           <div>
            <a href="http://www.w3.org/html/logo/">
                <img src="https://www.w3.org/html/logo/badge/html5-badge-h-css3-device.png" width="90" height="35" alt="HTML5 Powered with CSS3 / Styling, and Device Access" title="HTML5 Powered with CSS3 / Styling, and Device Access">
            </a>
            <a href="http://jigsaw.w3.org/css-validator/check/referer">
            <img style="border:0;width:88px;height:31px"
                src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
                alt="Valid CSS!" />
            </a>
               </div>
        </div>    
</footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="js/weather.js"></script>
<!--<script src="js/banner.js"></script>-->
    
</body>
</html>