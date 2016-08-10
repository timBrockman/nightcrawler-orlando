/*
maps.js
contains map settings and functions including initMap()
(must load before map api callback)

***Also contains ko.applyBindings calls, which must load after the async deferred Google Maps Scripts.***
*/
var map;
//var mapInited = false;
var geocoder;
var markerIcons = [];
var spotMarkers = [];
var styles = [
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "on" },
      { "color": "#000000" }
    ]
  },{
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ff0000" }
    ]
  },{
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#00ff00" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "color": "#0000ff" }
    ]
  }
];
//generate different map icons
function initIcons(){
  var iconUrls =[
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Shadow-Blinky-icon.png",
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Bashfull-Inky-icon.png",
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Pokey-Clyde-icon.png",
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Speedy-Pinky-icon.png",
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Edible-Ghost-icon.png",
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Strawberry-Bonus-icon.png",
    "http://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Onion-Bonus-icon.png"
    ];
  var max = iconUrls.length;
  for(var i = 0; i < max; i++){
    markerIcons.push(makeIcon(iconUrls[i]));
  }
  function makeIcon(icon){
    return new google.maps.MarkerImage(
      icon,
      new google.maps.Size(32, 32),
      new google.maps.Point(0, 0),
      new google.maps.Point(0, 16)
    );
  }
}

// Function to initialize the map within the map div
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.537211, lng: -81.377001},
    zoom: 11,
    styles:styles
  });
  geocoder = new google.maps.Geocoder();
  initIcons();
  //mapInited = true;
/*
apply bindings moved to Map Init
*/
  ko.applyBindings(SpotsVM, document.getElementById('header'));
  makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cbCalls);
  function cbCalls(data){
    mCalls = data;
    ko.applyBindings(CallsVM, document.getElementById('callBox'));
  };

}
