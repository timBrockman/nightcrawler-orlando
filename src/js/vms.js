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
  self.vmCalls = ko.observableArray(
    $.map(mCalls, function(item){
      if(itemCount<10){
        item.markerId = 'call'+ itemCount++;
        item.randIcon = Math.floor(Math.random() * 4);
        var currentCall = new Call(item);
        // event listeners added to models
        //*
        currentCall.mouseoutMarker = function(){
          currentCall.marker.setIcon(markerIcons[currentCall.randIcon]);
        };
        currentCall.mouseoverMarker = function(){
          currentCall.marker.setIcon(markerIcons[4]);
        };
        return currentCall;
      }
    })
  );

}
