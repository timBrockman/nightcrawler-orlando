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
  //var _self = this; //unused
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
          currentSpot.infowindow.open(map, currentSpot.marker);
        });
        currentSpot.mouseoutMarker = function(){
          currentSpot.marker.setIcon(markerIcons[5]);
        };
        currentSpot.mouseoverMarker = function(){
          currentSpot.marker.setIcon(markerIcons[6]);
        };
        currentSpot.clickMarker = function(){
          currentSpot.infowindow.open(map, currentSpot.marker);
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
          currentCall.infowindow.open(map, currentCall.marker);
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
