# iCycle

## URL:
https://ohwhytina.github.io/iCycle/

## Summary: 

This app is built with safety in mind. With iCycle, a user can search for a city or zip code and find out how many bicycle-related thefts, accidents, and potential road hazards have been reported within a 10-mile radius of that searched area. The user can filter by specific dates to search for incidents, and once called, the app will produce a list of incidents with ID numbers, that can be cross referenced with the map to see where each incident occured. When the user searches anywhere in the Bay Area of CA, the app will also fetch all the known locations of Ford Bike Share stations, so the user can find a bike to borrow.

## Technology 

iCycle uses HTML5 and the Materialize CSS library for the homepage design. The functionality of the app comes from Javascript and Jquery. The app uses the BikeWise API to gather data on the area that was queried. The CityBike API is used to display the locations of the bike share stations. The information from both the BikeWise API and the CityBike API are then passed into the GoogleMaps API to display the location of the searched city and display all the applicable information. 

## Contributors 

#### Johnathan Mitchell
-BikeWise API functionality using Javascript
https://github.com/jonathanmll

#### Tina Nguyen
-Homepage design using HTML5, CSS3, and Materialize CSS
https://github.com/ohwhytina

#### Ben Wade
-CityBike API and GoogleMaps API functionality using Javascript and Jquery
https://github.com/benwade91

## Preview of Page
![alt text](/assets/images/screenshot.png?raw=true)
