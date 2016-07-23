
#NightCrawler: Orlando Edition
   __Next Orlando vacation, ignore the theme parks.
   Immerse your whole family in the world of live crime journalism.__

  - Hang out at the local 24 hour places.
  - Respond to local dispatch calls from the city.
  - Be the first reporter on the scene to get the 'money shot'.

##Running the project
  Simply visit the demo page at [https://timBrockman.github.io/nightcrawler-orlando](https://timBrockman.github.io/nightcrawler-orlando).
  Optionally, you could clone the repo and open the index.html file in a browser (with your own Google Maps api key).

##features
  - uses Google Maps api (maps, styling, custom markers, geocoding)
  - uses Orlando's active dispatch live feed
  - uses Knockout.js to connect data to DOM

###m
  - starting locations in spots array (247.js)
  - active dispatch calls (xml)

###vm
hauntsVM
callsVM

###v
wrapper
starting location list
map
active calls list

###map
separate map related calls (like geocoding)
