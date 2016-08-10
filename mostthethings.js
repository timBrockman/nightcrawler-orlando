/*
247.js
A static array of 5 places that are open 24hrs.
(static data source)
*/
const spots = [
    {name: "Wawa", lat: 28.552518, lng: -81.396461, phone:"(407) 835-8985", web:"wawa.com", addy: "1200 W Colonial Dr, Orlando, FL 32805"},
    {name: "7-Eleven", lat: 28.553298, lng: -81.388185, phone:"(407) 650-1965", web:"7-eleven.com", addy: "605 West Colonial Drive, Orlando, FL 32804"},
    {name: "IHOP", lat: 28.553471, lng: -81.368959, phone:"(407) 896-8313", web: "restaurants.ihop.com", addy: "647 E Colonial Dr, Orlando, FL 32803"},
    {name: "Steak-n-Shake", lat: 28.552888, lng: -81.347269, phone: "(407) 896-0827", web: "steaknshake.com", addy: "2820 E Colonial Dr, Orlando, FL 32803"},
    {name: "McDonald's", lat: 28.503997, lng: -81.396276, phone: "(407) 839-3840", web: "mcdonalds.com", addy: "3839 Orange Blossom Trail, Orlando, FL 32839"}
  ];
/*
calls.js
(Orlando 911 dispatch call data source)
*/

/*
this function requests the dispatch calls from the YQL url (that processes the city's 911 dispatch call data)
takes the url (YQL + city xml) and the callback that processes the dispatch call data
returns true after it recieves the data (incase that's needed)
or logs an error if it fails
*/
function makeRequest(url, cbCalls){
  $.ajax(url+'&jsoncallback=?')
    .done(function(data){
       cbCalls(data.query.results.CALLS.CALL);
       return true;
    })
    .fail(function(status){
      window.alert("I'd like to think if you're seeing me, you're having the worst day of your life. Try refreshing to fix the: " + (status && status.statusText?status.statusText:' Unknown Problem.'));
    });
}
// holds raw calls to map in vm using model constructors
var mCalls = [];
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
(moved to window.onload due to async ko & jquery from cdn often being slower than maps)
  ko.applyBindings(SpotsVM, document.getElementById('header'));
  makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cbCalls);
  function cbCalls(data){
    mCalls = data;
    ko.applyBindings(CallsVM, document.getElementById('callBox'));
  };
*/
}
/*
models.js
Knockout model class constructors
*/

/*
Spot class constructor
----
takes a raw data object from 247.js's spots array
tests for and attaches all the properties
---
creates pos LatLng property
creates marker property
creates infowindow property
*/
function Spot(data){
  // none of these need to be observable but, maybe want to add editable features some day
  this.title  = data.hasOwnProperty('name')?data.name:'unknown place';
  this.phone  = data.hasOwnProperty('phone')?data.phone:'no telephone number';
  this.web    = data.hasOwnProperty('web')?data.web:'no website';
  this.addy   = data.hasOwnProperty('addy')?data.addy:'no address';
  this.lat    = data.hasOwnProperty('lat')?data.lat:28.537211;
  this.lng    = data.hasOwnProperty('lng')?data.lng:-81.377001;
  this.mid    = data.hasOwnProperty('markerId')?data.markerId:0; // corresponds to marker id
  this.pos    = new google.maps.LatLng(this.lat, this.lng);
  this.clickToggle = false;
  this.marker = new google.maps.Marker({
    map: map,
    position: this.pos,
    title: this.title,
    animation: google.maps.Animation.DROP,
    icon: markerIcons[5],
    id: this.mid
  });
  this.infowindow =  new google.maps.InfoWindow({
    content:(
      "<strong>"+this.title+"</strong><br>"+
      this.phone + "<br>"+
      '<a href="http://'+this.web+'" target="blank">'+this.web+"</a><br>" +
      this.addy
    )
  });

}
/*
Call class constructor
----
takes raw 911 dispatch call data from calls.js
tests for and attaches the raw properties
---
creates and filters for isAccident boolean property
creates pos and address from geocodes address or intersection
creates marker and listeners
creates infowindow

*/
function Call(data){
  var _self = this;
  var accidentTemp = (data.hasOwnProperty('DESC')?data.DESC.trim():'');
  _self.isAccident = /Accident|Hit|Vehicle|Car|Traffic/i.test(accidentTemp);
  _self.filterAccident = ko.computed(function(){
    return (/Accident|Hit|Vehicle|Car|Traffic/i.test(accidentTemp) || !onlyAccidents());
  });


  var rawLocation   = data.hasOwnProperty('LOCATION')?data.LOCATION.trim():'unknown location';

  _self.description = data.hasOwnProperty('DESC')?data.DESC.trim():'unknown';
  _self.dateTime    = data.hasOwnProperty('DATE')?data.DATE.trim():'1/1/1970 00:00';
  _self.incidentId  = data.hasOwnProperty('INCIDENT')?data.INCIDENT.trim():'no id';
  _self.randIcon    = data.randIcon;
  _self.mid         = data.hasOwnProperty('markerId')?data.markerId:0; // corresponds to marker id
  _self.clickToggle = false;

  //process location for geocoder by formatting ---not adding component restrictions---
  function processLocation(_rawLocation){
    var location = {};
    location.address = _rawLocation.replace('\/','\&');
    location.address = location.address + ', Orlando, FL';
    return location;
  }
  // geocode street address
  geocoder.geocode(processLocation(rawLocation),function(results,status){
    if (status === google.maps.GeocoderStatus.OK) {
      _self.lat = results[0].geometry.location.lat();
      _self.lng = results[0].geometry.location.lng();
      _self.address = results[0].formatted_address;
      _self.pid =  results[0].place_id;
      _self.pos    = new google.maps.LatLng(_self.lat, _self.lng);
      _self.marker = new google.maps.Marker({
        map: map,
        position: _self.pos,
        title: _self.description,
        animation: google.maps.Animation.DROP,
        icon: markerIcons[_self.randIcon],
        id: _self.mid
      });
      _self.marker.addListener('mouseover', function() {
        this.setIcon(markerIcons[4]);
      });
      _self.marker.addListener('mouseout', function() {
        this.setIcon(markerIcons[_self.randIcon]);
      });
      _self.infowindow =  new google.maps.InfoWindow({
        content:(
          "<strong>"+_self.description+"</strong><br>"+
          _self.dateTime + "<br>"+
          _self.address + "<br>"
        )
      });
      _self.infowindow.addListener('closeclick', function(){
        _self.clickToggle = !_self.clickToggle;
        _self.marker.setAnimation(null);
      });
      _self.marker.addListener('click', function() {
        _self.clickToggle = !_self.clickToggle;
        if(_self.clickToggle){
          _self.infowindow.open(map, _self.marker);
          _self.marker.setAnimation(google.maps.Animation.BOUNCE);
        }else{
          _self.infowindow.close(map, _self.marker);
          _self.marker.setAnimation(null);
        }
      });

    }else{
      window.alert("I'd like to think if you're seeing me, you're having the worst day of your life. Try refreshing to fix the: " + (status && status.statusText?status.statusText:' Unknown Problem.'));
    }
  });
}
/*
views.js
contains the onload stuff
triggering functions and callbacks that applyBindings
*/
var applied = false; //incase callback triggered twice or something
function cbCalls(data){
  mCalls = data;
  if(!applied){
    ko.applyBindings(CallsVM, document.getElementById('callBox'));
    applied = true;
  }
};
// async defered still blocks onload event ensuring nonrace
window.onload = function(){

  //applies bindings in callback after other crap loads
    ko.applyBindings(SpotsVM, document.getElementById('header'));
    makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cbCalls);
  
};
/*
vms.js
knockout view model class constructors
*/
/*
SpotsVM view model constructor
----
contains vmSpots, a knockout observable array
jquery maps the raw spots data to the model,
adds behavior functions and listeners,
and returns each as a member of observable array
*/
function SpotsVM(){
  var self = this; //unused
  var itemCount = 0; //derp
  self.vmSpots =
    ko.observableArray($.map(
      spots, function(item){
        item.markerId = 'spot'+ itemCount++;
        //mapSpot(item);
        var currentSpot =  new Spot(item);//mmm banana
        currentSpot.marker.addListener('mouseover', function() {
          this.setIcon(markerIcons[6]);
        });
        currentSpot.marker.addListener('mouseout', function() {
          this.setIcon(markerIcons[5]);
        });
        currentSpot.marker.addListener('click', function(){
          currentSpot.clickToggle = !currentSpot.clickToggle;
          if(currentSpot.clickToggle){
            currentSpot.infowindow.open(map, currentSpot.marker);
            currentSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
          }else{
            currentSpot.infowindow.close(map, currentSpot.marker);
            currentSpot.marker.setAnimation(null);
          }
        });
        currentSpot.infowindow.addListener('closeclick', function(){
          currentSpot.clickToggle = !currentSpot.clickToggle;
          currentSpot.marker.setAnimation(null);
        });
        currentSpot.mouseoutMarker = function(){
          currentSpot.marker.setIcon(markerIcons[5]);
        };
        currentSpot.mouseoverMarker = function(){
          currentSpot.marker.setIcon(markerIcons[6]);
        };
        currentSpot.clickMarker = function(){
          currentSpot.clickToggle = !currentSpot.clickToggle;
          if(currentSpot.clickToggle){
            currentSpot.infowindow.open(map, currentSpot.marker);
            currentSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
          }else{
            currentSpot.infowindow.close(map, currentSpot.marker);
            currentSpot.marker.setAnimation(null);
          }
        };

        return currentSpot;
      }
    )
  );
}
/*
CallsVM view model constructor
----
contains onlyAccidents filter observable
contains hideGenCalls method/behavior for when filter is triggered
contains vmCalls, a knockout observable array
jquery maps the raw spots data to the model,
adds behavior functions,
and returns each as a member of observable array
*/
function CallsVM(){
  var self = this;
  var itemCount = 0;

  self.onlyAccidents = ko.observable(false);

  self.vmCalls = ko.observableArray(
    $.map(mCalls, function(item){
      if(itemCount<10){
        item.markerId = 'call'+ itemCount++;
        item.randIcon = Math.floor(Math.random() * 4);
        var currentCall = new Call(item);
        // event listeners added to models

        currentCall.mouseoutMarker = function(){
          currentCall.marker.setIcon(markerIcons[currentCall.randIcon]);
        };
        currentCall.mouseoverMarker = function(){
          currentCall.marker.setIcon(markerIcons[4]);
        };
        currentCall.hideMarker = function(){
          currentCall.marker.setVisible(currentCall.filterAccident());
        };
        currentCall.clickMarker = function(){
          currentCall.clickToggle = !currentCall.clickToggle;
          if(currentCall.clickToggle){
            currentCall.infowindow.open(map, currentCall.marker);
            currentCall.marker.setAnimation(google.maps.Animation.BOUNCE);
          }else{
            currentCall.infowindow.close(map, currentCall.marker);
            currentCall.marker.setAnimation(null);
          }
        };

        return currentCall;
      }
    })
  );
  self.hideGenCalls = function(){
    self.vmCalls().forEach(function(item){
      item.hideMarker();
    });
  };
}
