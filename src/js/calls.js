//active dispatch call model
//retrieves data stores in call object
//would like to use promises but, probably stick to callback hell and banana code
//want to use fetch but failed
// jquery still doesn't dataType:'jsonp xml' as advertised
// Fuuuuuuug, finaly, good ole yql sabes the day
// I hope verison doesn't wreck yql
/*
function makeRequest(url){
  var options = {
    method:'GET'
    };
  fetch(url, options)
    .then(function(response) {
      console.log(response);
    }).then(function(result){
      console.log(result);
    });
}
/*/
/* this shouldn't work on xml but with yql intermediary it's fine still errors
function makeRequest(url){
  //create callback (no jsonp support scrap this)
  window.jsonpcb = function(data){console.log(data);};
  //create container script element, set src with cb, append to DOM
  var scriptP = document.createElement('script');
  scriptP.setAttribute('src',(url + '?callback=jsonpcb'));
  scriptP.setAttribute('id','scriptp');
  scriptP.setAttribute('type','text/javascript')
  document.body.appendChild(scriptP);
}/*/
/*// fuckin cors
var request;

//lifted from Mozilla's example site
function makeRequest(url) {
  request = new XMLHttpRequest();
  //document.domain = url;
  if (!request) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  request.onreadystatechange = alertContents;
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/xml');
  request.send();
}

function alertContents() {
  if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      alert(request.responseText);
    } else {
      alert('There was a problem with the request.');
    }
  }
}
/*/
function makeRequest(url, cbCalls){
  $.ajax(url+'&jsoncallback=?',{format:'jsonp'})
    .done(function(data){
       cbCalls(data.query.results.CALLS.CALL);
       return true;
    });
}
