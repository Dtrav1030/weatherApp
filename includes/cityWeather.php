<?php
    $file = 'data/cities/timeStamp.txt';    
    if (file_exists($file)) {
		//open file
		$fileContents = file_get_contents($file);
		//change contents to current data
		if ($fileContents == "" || time() - (4 * 60 * 60) >= $fileContents){
            print("been 4 hours");
            
            if (file_exists($file)) {
                //open file
                $fileContents = file_get_contents($file);
                //change contents to current data
                $fileContents = time();
                //write file
                file_put_contents($file, $fileContents);
            }

            //get Orlando Weather as JSON
            $weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Orlando,us&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
            $weatherData = file_get_contents($weatherURL);
            $weatherDataClean1 = explode('[', $weatherData);
            $weatherDataClean2 = explode(']', $weatherDataClean1[1]);
            //print($weatherDataClean1[0]);
            //print($weatherDataClean2[0]);
            //print($weatherDataClean2[1]);
            $file = 'data/cities/orlandoData.json';
            if (file_exists($file)) {
                //open file
                $fileContents = file_get_contents($file);
                //change contents to current data
                $fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
                //write file
                file_put_contents($file, $fileContents);
            }

            //get Chicago Weather as JSON
            $weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Chicago,us&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
            $weatherData = file_get_contents($weatherURL);
            $weatherDataClean1 = explode('[', $weatherData);
            $weatherDataClean2 = explode(']', $weatherDataClean1[1]);
            //print($weatherDataClean1[0]);
            //print($weatherDataClean2[0]);
            //print($weatherDataClean2[1]);
            $file = 'data/cities/chicagoData.json';
            if (file_exists($file)) {
                //open file
                $fileContents = file_get_contents($file);
                //change contents to current data
                $fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
                //write file
                file_put_contents($file, $fileContents);
            }

            //get Grand Canyon Weather as JSON
            $weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=GrandCanyon,us&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
            $weatherData = file_get_contents($weatherURL);
            $weatherDataClean1 = explode('[', $weatherData);
            $weatherDataClean2 = explode(']', $weatherDataClean1[1]);
            //print($weatherDataClean1[0]);
            //print($weatherDataClean2[0]);
            //print($weatherDataClean2[1]);
            $file = 'data/cities/grandcanyonData.json';
            if (file_exists($file)) {
                //open file
                $fileContents = file_get_contents($file);
                //change contents to current data
                $fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
                //write file
                file_put_contents($file, $fileContents);
            }

            //get New York Weather as JSON
            $weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=NewYork,us&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
            $weatherData = file_get_contents($weatherURL);
            $weatherDataClean1 = explode('[', $weatherData);
            $weatherDataClean2 = explode(']', $weatherDataClean1[1]);
            //print($weatherDataClean1[0]);
            //print($weatherDataClean2[0]);
            //print($weatherDataClean2[1]);
            $file = 'data/cities/newyorkData.json';
            if (file_exists($file)) {
                //open file
                $fileContents = file_get_contents($file);
                //change contents to current data
                $fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
                //write file
                file_put_contents($file, $fileContents);
            }

            //get San Francisco Weather as JSON
            $weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco,us&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
            $weatherData = file_get_contents($weatherURL);
            $weatherDataClean1 = explode('[', $weatherData);
            $weatherDataClean2 = explode(']', $weatherDataClean1[1]);
            //print($weatherDataClean1[0]);
            //print($weatherDataClean2[0]);
            //print($weatherDataClean2[1]);
            $file = 'data/cities/sanfranData.json';
            if (file_exists($file)) {
                //open file
                $fileContents = file_get_contents($file);
                //change contents to current data
                $fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
                //write file
                file_put_contents($file, $fileContents);
            }
        } else {
            print("not 4 hours");
        }
	}

?>