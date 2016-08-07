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
  //var itemCount = mCalls.length;

  self.onlyAccidents = ko.observable(false);
  self.vmCalls = ko.observableArray();
  for(var i = 0; i < 10; i++){
    mCalls[i].markerId = 'call'+ i;
    mCalls[i].randIcon = Math.floor(Math.random() * 4);
    var currentCall = new Call(mCalls[i]);
    // add events as above
    self.vmCalls.push(currentCall);
  }
}
