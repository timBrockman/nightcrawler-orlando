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
  $.ajax(url+'&jsoncallback=?',{format:'jsonp'})
    .done(function(data){
       cbCalls(data.query.results.CALLS.CALL);
       return true;
    })
    .fail(function(data){
      console.log(data);
    });
}
// holds raw calls to map in vm using model constructors
var mCalls = [];
