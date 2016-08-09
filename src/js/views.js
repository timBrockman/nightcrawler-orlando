/*
views.js
contains the onload stuff
triggering functions and callbacks that applyBindings 
*/
var mCalls = [];
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
  window.setTimeout(function () {
      ko.applyBindings(SpotsVM, document.getElementById('header'));
      makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cbCalls);
  }, 1000);
};
