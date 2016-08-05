/*
apply vms to views, inits, etc.
*/
//todo: consider geocoding and makemarker in first round of callbacks then applyBindings
//
//global for dependency remote script loads
//
//global for calls
var mCalls = [];
//callback pushes new Dispatch call objects into calls array
var applied = false; //incase callback triggered twice or something
function cbCalls(data){
//  console.log(data);
//todo: geocode & add to mCalls before applyBindings
//todo: createMarkers etc for mCalls before applyBindings
  mCalls = data;
  if(!applied){
    ko.applyBindings(CallsVM, document.getElementById('callBox'));
    applied = true;
  }
};
// async defered still blocks onload event ensuring nonrace
window.onload = function(){
  //todo: info windows & related events
  ko.applyBindings(SpotsVM, document.getElementById('header'));

  //applies bindings in callback
  makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cbCalls);
};
