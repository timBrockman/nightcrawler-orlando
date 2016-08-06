function Spot(data){
  // none of these need to be observable but, maybe want to add edit features some day
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
}

function Call(data){
  var accidentTemp = (data.hasOwnProperty('DESC')?data.DESC:'');
  this.isAccident = /Accident|Hit/i.test(accidentTemp);
  this.filterAccident = ko.computed(function(){
    return (/Accident|Hit/i.test(accidentTemp) || !onlyAccidents());
  });

  //todo: geocoding function (callback to set lat/lng)
  //todo: marker function (needs geocoding)
  
  this.description = data.hasOwnProperty('DESC')?data.DESC:'unknown';
  this.dateTime = data.hasOwnProperty('DATE')?data.DATE:'1/1/1970 00:00';
  this.location = data.hasOwnProperty('LOCATION')?data.LOCATION:'unknown location';
  this.incidentId = data.hasOwnProperty('INCIDENT')?data.INCIDENT:'no id';
  this.lat   = data.hasOwnProperty('lat')?data.lat:28.537211;
  this.lng   = data.hasOwnProperty('lng')?data.lng:-81.377001;
  this.mid   = data.hasOwnProperty('markerId')?data.markerId:0; // corresponds to marker id
}
