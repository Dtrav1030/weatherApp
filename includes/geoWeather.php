<?php 
    if (isset($_GET['lat'])) {
        if (isset($_GET['lon'])) {
            $weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=".$_GET["lat"]."&lon=".$_GET["lon"]."&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
            $weatherData = file_get_contents($weatherURL);
            $weatherDataClean1 = explode('[', $weatherData);
            $weatherDataClean2 = explode(']', $weatherDataClean1[1]);
            $weatherData = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
            $file = '../data/coordData.json';
            if (file_exists($file)) {
            //open file
            $fileContents = file_get_contents($file);
            //change contnents to current data
            $fileContents = $weatherData;   
//            $fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
            //write file
            file_put_contents($file, $fileContents);
            }
        }
    }
?>