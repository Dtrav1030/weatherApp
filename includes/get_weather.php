<?php
	//get Orlando Weather as XML default
	/*$weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Orlando,us&appid=510a1a6b2a485687afd74a1ab4338b39&mode=xml&units=imperial";
	$weatherData = simplexml_load_file($weatherURL);
	$weatherData->asXML("data/orlandoData.xml");*/

	//set info to connect to openweathermap.org
	// order is urlStringOne, ids, units, api
	$urlStringOne = "http://api.openweathermap.org/data/2.5/group?id=";
	$api = "&appid=510a1a6b2a485687afd74a1ab4338b39";
	$unitsImperial = "&units=imperial";
	$unitsMetric = "&units=metric";
	//set id for city
	$orlando = "4176147,";
	$grandCanyon = "5296391,";
	$newYork = "5128638,";
	$chicago = "3582383,";
	$sanFran = "3621911,";
	$houston = "4699066,";
	$kansasCity = "4273837,";
	$DC = "4138106,";
	$capeCanaveral = "4149959,";
	$reno = "4522359";

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

	//get current weather by GeoLocation XML
	/*if (isset($_COOKIE["WeatherAppLat"])) {
		if (isset($_COOKIE["WeatherAppLon"])) {
			$weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=".$_COOKIE["WeatherAppLat"]."&lon=".$_COOKIE["WeatherAppLon"]."&appid=510a1a6b2a485687afd74a1ab4338b39&mode=xml&units=imperial";
			//print($weatherURL);
			$weatherData = simplexml_load_file($weatherURL);
			$weatherData->asXML("data/coordData.xml");
		} 
	}*/

	//get current weather by GeoLocation JSON
	if (isset($_COOKIE["WeatherAppLat"])) {
		if (isset($_COOKIE["WeatherAppLon"])) {
			$weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=".$_COOKIE["WeatherAppLat"]."&lon=".$_COOKIE["WeatherAppLon"]."&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial";
			$weatherData = file_get_contents($weatherURL);
			$weatherDataClean1 = explode('[', $weatherData);
			$weatherDataClean2 = explode(']', $weatherDataClean1[1]);
			$file = 'data/coordData.json';
			if (file_exists($file)) {
				//open file
				$fileContents = file_get_contents($file);
				//change contnents to current data
				$fileContents = $weatherDataClean1[0].$weatherDataClean2[0].$weatherDataClean2[1];
				//write file
				file_put_contents($file, $fileContents);
			}
		} 
	}

	//get current weather by Zip Code JSON
	if (isset($_COOKIE['WeatherAppZip'])) {
		$weatherURL = "http://api.openweathermap.org/data/2.5/weather?zip=".$_COOKIE["WeatherAppZip"].",us&appid=510a1a6b2a485687afd74a1ab4338b39&units=imperial"; 
		$weatherData = file_get_contents($weatherURL);
		$weatherDataClean1 = explode('[', $weatherData);
		$weatherDataClean2 = explode(']', $weatherDataClean1[1]);
		$weatherDataClean3 = explode('}', $weatherDataClean2[0]);
		$weatherData = $weatherDataClean1[0].$weatherDataClean3[0]."}".$weatherDataClean2[1];
		$file = 'data/zipData.json';
		if (file_exists($file)) {
			//open file
			$fileContents = file_get_contents($file);
			//change contnents to current data
			$fileContents = $weatherData;
			//write file
			file_put_contents($file, $fileContents);
		}
	}
?>