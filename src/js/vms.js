function SpotsVM(){
  var self = this;
  var itemCount = 0; //derp

  self.vmSpots =
    ko.observableArray($.map(
      spots, function(item){
        item.markerId = 'spot'+ itemCount++;
        return new Spot(item);//mmm banana
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
        return new Call(item);
      }
    )
  );
}
