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
      _self.marker.addListener('click', function() {
        _self.infowindow.open(map, this);
      });

    }else{
      window.alert("I'd like to think if you're having the worst day of your life. Try refreshing to fix the: " + status);
    }
  });
}
