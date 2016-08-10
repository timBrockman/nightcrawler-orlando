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
    .fail(function(status){
      window.alert("I'd like to think if you're having the worst day of your life.  Refresh the app to clear up the:" + status?status:' unknown problem');
    });
}
// holds raw calls to map in vm using model constructors
var mCalls = [];
