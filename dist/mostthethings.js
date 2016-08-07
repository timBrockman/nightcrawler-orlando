spots = [
    {name: "Wawa", lat: 28.552518, lng: -81.396461, phone:"(407) 835-8985", web:"wawa.com", addy: "1200 W Colonial Dr, Orlando, FL 32805"},
    {name: "7-Eleven", lat: 28.553298, lng: -81.388185, phone:"", web:"", addy: "605 West Colonial Drive, Orlando, FL 32804"},
    {name: "IHOP", lat: 28.553471, lng: -81.368959, phone:"(407) 896-8313", web: "restaurants.ihop.com", addy: "647 E Colonial Dr, Orlando, FL 32803"},
    {name: "Steak-n-Shake", lat: 28.552888, lng: -81.347269, phone: "(407) 896-0827", web: "steaknshake.com", addy: "2820 E Colonial Dr, Orlando, FL 32803"},
    {name: "McDonald's", lat: 28.503997, lng: -81.396276, phone: "(407) 839-3840", web: "mcdonalds.com", addy: "3839 Orange Blossom Trail, Orlando, FL 32839"}
  ];
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
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);
/*
contains map functions including initMap
*/
function Spot(data){
  // none of these need to be observable but, maybe want to add edit features some day
  this.title  = data.hasOwnProperty('name')?data.name:'unknown place';
  this.phone  = data.hasOwnProperty('phone')?data.phone:'no telephone number';
  this.web    = data.hasOwnProperty('web')?data.web:'no website';
  this.addy   = data.hasOwnProperty('addy')?data.addy:'no address';
  this.lat    = data.hasOwnProperty('lat')?data.lat:28.537211;
  this.lng    = data.hasOwnProperty('lng')?data.lng:-81.377001;
  this.mid    = data.hasOwnProperty('markerId')?data.markerId:0; // corresponds to marker id
  this.pos    = new google.maps.LatLng(this.lat, this.lng);
  this.marker = new google.maps.Marker({
    map: map,
    position: this.pos,
    title: this.title,
    animation: google.maps.Animation.DROP,
    icon: markerIcons[5],
    id: this.mid
  });
}

function Call(data){
  var _self = this;
  var accidentTemp = (data.hasOwnProperty('DESC')?data.DESC.trim():'');
  _self.isAccident = /Accident|Hit|Vehicle|Car|Traffic/i.test(accidentTemp);
  _self.filterAccident = ko.computed(function(){
    return (/Accident|Hit|Vehicle|Car|Traffic/i.test(accidentTemp) || !onlyAccidents());
  });

  //todo: geocoding function (callback to set lat/lng)
  //todo: marker function (needs geocoding)
  var rawLocation   = data.hasOwnProperty('LOCATION')?data.LOCATION.trim():'unknown location';

  _self.description = data.hasOwnProperty('DESC')?data.DESC.trim():'unknown';
  _self.dateTime    = data.hasOwnProperty('DATE')?data.DATE.trim():'1/1/1970 00:00';
  _self.incidentId  = data.hasOwnProperty('INCIDENT')?data.INCIDENT.trim():'no id';
  _self.randIcon    = data.randIcon;
  _self.mid         = data.hasOwnProperty('markerId')?data.markerId:0; // corresponds to marker id
  //_self.tries       = 0;
  //process location for geocoder by formatting and adding component restrictions
  function processLocation(_rawLocation){
    var location = {};
    location.address = _rawLocation.replace('\/','\&');
    location.address = location.address + ', Orlando, FL';
    return location;
  }
  // geocode street address
  //geocodeLocation(processLocation(rawLocation));
  //function geocodeLocation(_location){
    geocoder.geocode(processLocation(rawLocation),function(results,status){
      if (status === google.maps.GeocoderStatus.OK) {
        _self.lat = results[0].geometry.location.lat();
        _self.lng = results[0].geometry.location.lng();
        _self.address = results[0].formatted_address;
        _self.pid =  results[0].place_id;
        _self.pos    = new google.maps.LatLng(_self.lat, _self.lng);
        _self.marker = new google.maps.Marker({
          map: map,
          position: _self.pos,
          title: _self.description,
          animation: google.maps.Animation.DROP,
          icon: markerIcons[_self.randIcon],
          id: _self.mid
        });
        _self.marker.addListener('mouseover', function() {
          this.setIcon(markerIcons[4]);
        });
        _self.marker.addListener('mouseout', function() {
          this.setIcon(markerIcons[_self.randIcon]);
        });

      }else{
        console.log('There seems to be a problem: ' + status);
      }
      //console.log(_self.mid);
    });
  //}

}
/*
apply vms to views, inits, etc.
*/
//todo: consider geocoding and makemarker in first round of callbacks then applyBindings
//
//global for dependency remote script loads
//
//global for calls
var mCalls = [];
//callback pushes new Dispatch call objects into calls array
var applied = false; //incase callback triggered twice or something
function cbCalls(data){
//  console.log(data);
//todo: geocode & add to mCalls before applyBindings
//todo: createMarkers etc for mCalls before applyBindings
  mCalls = data;
  if(!applied){
    ko.applyBindings(CallsVM, document.getElementById('callBox'));
    applied = true;
  }
};
// async defered still blocks onload event ensuring nonrace
window.onload = function(){
  //todo: info windows & related events
  ko.applyBindings(SpotsVM, document.getElementById('header'));

  //applies bindings in callback
  window.setTimeout(function () {
      makeRequest("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww1.cityoforlando.net%2Fopd%2Factivecalls%2Factivecad.xml'&format=json&diagnostics=true", cbCalls);
  }, 1000);
};
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
