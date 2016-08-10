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
  var self = this; //unused
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
          currentSpot.clickToggle = !currentSpot.clickToggle;
          if(currentSpot.clickToggle){
            currentSpot.infowindow.open(map, currentSpot.marker);
            currentSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
          }else{
            currentSpot.infowindow.close(map, currentSpot.marker);
            currentSpot.marker.setAnimation(null);
          }
        });
        currentSpot.mouseoutMarker = function(){
          currentSpot.marker.setIcon(markerIcons[5]);
        };
        currentSpot.mouseoverMarker = function(){
          currentSpot.marker.setIcon(markerIcons[6]);
        };
        currentSpot.clickMarker = function(){
          currentSpot.clickToggle = !currentSpot.clickToggle;
          if(currentSpot.clickToggle){
            currentSpot.infowindow.open(map, currentSpot.marker);
            currentSpot.marker.setAnimation(google.maps.Animation.BOUNCE);
          }else{
            currentSpot.infowindow.close(map, currentSpot.marker);
            currentSpot.marker.setAnimation(null);
          }
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
          currentCall.clickToggle = !currentCall.clickToggle;
          if(currentCall.clickToggle){
            currentCall.infowindow.open(map, currentCall.marker);
            currentCall.marker.setAnimation(google.maps.Animation.BOUNCE);
          }else{
            currentCall.infowindow.close(map, currentCall.marker);
            currentCall.marker.setAnimation(null);
          }
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
