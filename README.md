
#NightCrawler: Orlando Edition
Next vacation to Orlando, skip the theme parks.
You and your family can be immersed in the world of live crime journalism.
Hang out at the local 24 hour places.
Respond to local dispatch calls from the city.
Be the first reporter on the scene to get the 'money shot'.

##Running the project

##Demo

##Build

Organization

m
haunts locations (starter-data.json)
active dispatch calls
map api info

vm
haunts call yelp api for current whatever

v
wrapper
starting location list
map
active calls list

notes:

app idea inprogress Orlando
1. find a pit stop
2. crimes appear on map

  - get directions
  - (not in the ko version) upload photos or videos
  - (not in the ko version) get awesome badges and likes

  - list of 5 or more local places
  only 24 hour places near the happenins
  - Wawa lat: 28.552518 lng: -81.396461 phone:(407) 835-8985 web:wawa.com addy: 1200 W Colonial Dr, Orlando, FL 32805
  - 7-Eleven lat: 28.553298 lng: -81.388185 addy: 605 West Colonial Drive, Orlando, FL 32804
  - IHOP lat: 28.553471 lng: -81.368959 phone:(407) 896-8313 web: restaurants.ihop.com addy: 647 E Colonial Dr, Orlando, FL 32803
  - Steak-n-Shake lat: 28.552888 lng: -81.347269 phone: (407) 896-0827 web: steaknshake.com addy: 2820 E Colonial Dr, Orlando, FL 32803
  - McDonald's lat: 28.503997 lng: -81.396276 phone: (407) 839-3840 web: mcdonalds.com addy: 3839 Orange Blossom Trail, Orlando, FL 32839

  - uses google maps api
  - ~uses yelp for initial locations maybe~ (too authy)
  - ~uses meetup maybe~ (not with theme)
  - uses Orlando active crime dispatch feed

Map center and zoom to include all bases.
menu bar for location selection
sidebar/coffin for list of calls
static base object included as js object
ajax call for dispatch calls (simple enough)
