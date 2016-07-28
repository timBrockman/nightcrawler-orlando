function Spot(data){
  // not sure these need to be observable but, maybe want to add edit features some day
  this.title = ko.observable(data.hasOwnProperty('name')?data.name:'unknown place');
  this.phone = ko.observable(data.hasOwnProperty('phone')?data.phone:'no telephone number');
  this.web   = ko.observable(data.hasOwnProperty('web')?data.web:'no website');
  this.addy  = ko.observable(data.hasOwnProperty('addy')?data.addy:'no address');
  this.lat   = ko.observable(data.hasOwnProperty('lat')?data.lat:0);
  this.lng   = ko.observable(data.hasOwnProperty('lng')?data.lng:0);
  this.mid   = ko.observable(data.hasOwnProperty('markerId')?data.markerId:0); // corresponds to marker id
}

function Call(data){
  var accidentTemp = (data.hasOwnProperty('DESC')?data.DESC:'');
  this.isAccident = ko.observable(/Accident|Hit/i.test(accidentTemp));
  this.filterAccident = ko.computed(function(){
    return (/Accident|Hit/i.test(accidentTemp) || !onlyAccidents());
  });
  this.description = ko.observable(data.hasOwnProperty('DESC')?data.DESC:'unknown');
  this.dateTime = ko.observable(data.hasOwnProperty('DATE')?data.DATE:'1/1/1970 00:00');
  this.location = ko.observable(data.hasOwnProperty('LOCATION')?data.LOCATION:'unknown location');
  this.incidentId = ko.observable(data.hasOwnProperty('INCIDENT')?data.INCIDENT:'no id');
  this.lat = ko.observable(data.hasOwnProperty('lat')?data.lat:'0');
  this.lng = ko.observable(data.hasOwnProperty('lng')?data.lng:'0');
  this.mid   = ko.observable(data.hasOwnProperty('markerId')?data.markerId:0); // corresponds to marker id
}
