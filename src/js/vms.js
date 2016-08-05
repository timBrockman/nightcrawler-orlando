function SpotsVM(){
  var self = this;
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
        currentSpot.mouseoutMarker = function(){
          currentSpot.marker.setIcon(markerIcons[5]);
        };
        currentSpot.mouseoverMarker = function(){
          currentSpot.marker.setIcon(markerIcons[6]);
        };

        return currentSpot;
      }
    )
  );
}
function CallsVM(){
  var self = this;
  var itemCount = 0;

  self.onlyAccidents = ko.observable(false);
  self.vmCalls =
    ko.observableArray($.map(
      mCalls, function(item){
        item.markerId = 'call'+ itemCount++;
        var currentCall = new Call(item);
        //todo: add event listeners as above

        return currentCall;
      }
    )
  );
}
