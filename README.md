
#NightCrawler: Florida Man Edition
   __Next Orlando vacation, ignore the theme parks.
   Immerse your whole family in the world of live crime journalism.__

  - Hang out at the local 24 hour places.
  - Respond to local dispatch calls from the city.
  - Be the first reporter on the scene to get the 'money shot'.
  - Retro design with classic game icons.

##Running the project
  Simply visit the demo page at [https://timBrockman.github.io/nightcrawler-orlando](https://timBrockman.github.io/nightcrawler-orlando).
  Optionally, you could clone the repo and open the index.html file in a browser (with your own Google Maps api key).

##features
  - uses Google Maps api (maps, styling, custom markers, geocoding)
  - uses Orlando's active dispatch live feed
  - uses Yahoo Developer Network's YML to turn the archaic city gubmen xml feed to something consumable by today's browsers
  - uses Knockout.js to connect data to DOM
  - my own AMD'ish callback implementation

##Build/Deploy
  - use `npm run build` to run the following commands:
    - `npm run clean`: gives you a clean dist directory
    - `npm run concat`: cats most the js into one file
    - `npm run cp`: copies css files to the dist/css folder
    - `npm run ised`: replaces js file references
  - use `npm run deploy` to deploy dist subrepo to gh-pages

###m
  - starting locations in spots array (247.js)
  - active dispatch calls (xml -> yml:json)

###vm
  - spotsVM
  - callsVM

###v
  - wrapper
  - starting location list (ko)
  - map
  - active calls list (ko)

###map
separate map related calls (like geocoding)
