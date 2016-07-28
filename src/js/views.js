/*
apply vms to views
*/
ko.applyBindings(SpotsVM, document.getElementById('header'));

//global for calls
var mCalls = [];
//callback pushes new Dispatch call objects into calls array
var applied = false; //incase callback triggered twice or something
function cb(data){
  console.log(data);
  mCalls = data;
  if(!applied){
    ko.applyBindings(CallsVM, document.getElementById('callBox'));
    applied = true;
  }
};
makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cb);
