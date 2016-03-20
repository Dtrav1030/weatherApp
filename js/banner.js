function changeHeader() {
    //empty banner
    $( ".header" ).empty();
    $( ".pure-g" ).empty();
    
    //Change banner to navigation bar
    $( "div.header" ).toggleClass( "banner" )
    $( "div.header" ).toggleClass( "nav" )
    
    
    $(".header").append("<ul class=\"nav-links\"></ul>");
    $(".nav-links").append("<li class=\"site-name\"><h1>IdeaWeather</h1></li>");
    $(".nav-links").append("<li><span>Zip</span></li>");
    $(".nav-links").append("<li><input type=\"text\" id=\"zipCode\"/></li>");
    $(".nav-links").append("<li><span class=\"nav-button zip-button\" id=\"zipSearch\">Search Zip</span></li>");
    $(".zip-button").attr('id', 'zipSearch');
    $(".nav-links").append("<li><span class=\"geolocation\">Geolocation</span></li>");
    $(".nav-links").append("<li><span class=\"nav-button\" id=\"locationSearch\">Click for Location</span></li>");
    $(".nav-links").append("<li><span>Listed Cities</span></li>");
    $(".nav-links").append("<li><select id=\"citySelect\"><option value=\"orlando\">Orlando</option><option value=\"grandcanyon\">Grand Canyon</option><option value=\"newyork\">New York</option><option value=\"chicago\">Chicago</option><option value=\"sanfran\">San Francisco</option></select></li>");
    $(".nav-links").append("<li><span class=\"nav-button\" id=\"retrieveList\">Retrieve Data</span></li>");
    
    $( "#zipSearch" ).click(zipSearch); 

}

