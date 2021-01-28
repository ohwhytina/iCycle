// use "updateMap(plotpoints); in console to test functionality"
// substitute plotpoints to test mapping function. 
var plotPoints = [{
  type: "Feature",
  properties: {
    type: "Crash",
    occured_at: 1611183600
  },
  geometry: {
    coordinates: [37.802894452433456, -122.2675161571865]
  }
},

{
  type: "Feature",
  properties: {
    type: "Hazard",
    occured_at: 1611183600
  },
  geometry: {
    coordinates: [37.80679186442484, -122.26515746558509]
  }
},

{
  type: "Feature",
  properties: {
    type: "Theft",
    occured_at: 1611183600
  },
  geometry: {
    coordinates: [37.800756233124126, -122.26893401582917]
  }
},

{
  type: "Feature",
  properties: {
    type: "food",
    occured_at: 1611183600
  },
  geometry: {
    coordinates: [37.8061815421042, -122.27468467188264]
  }
}
]
//location of bike share stations
var fordGoBikes = [];
//array to hold searched-for area
var searchedArea = [];
// icon variables 
var thiefIcon = "./assets/images/thief1.png";
var crashIcon = "./assets/images/crash1.png";
var hazardIcon = "./assets/images/caution1.png"
var otherIcon = "./assets/images/other1.png"
var fordIcon = "./assets/images/ford.png"

function launch(city){
fetch("https://bikewise.org:443/api/v2/locations?proximity=" + city + "&proximity_square=15")
.then(function (response) {
  return response.json();
})
.then(function (response) {
  searchedArea = response.features;
  updateMap(searchedArea)
})}

// Update the map based on search
function updateMap(incidents) {
if (!incidents[0]){
$('#modal2').modal("open");
launch("san francisco")
return;
}

let mapLocation = {
  lat: incidents[0].geometry.coordinates[1],
  lng: incidents[0].geometry.coordinates[0]
};

//display map area of searched city
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 11,
  center: mapLocation,
});
// loop through incidents and display plotpoints with icons
for (i = 0; i < incidents.length; i++) {

  var type = incidents[i].properties.type;
  var icon;

  // Decide on icon to display
  switch (type) {
    case "Theft":
      icon = thiefIcon;
      break;
    case "Crash":
      icon = crashIcon;
      break;
    case "Hazard":
      icon = hazardIcon;
      break;
    default:
      icon = otherIcon;
  }

  new google.maps.Marker({
    position: {
      lat: incidents[i].geometry.coordinates[1],
      lng: incidents[i].geometry.coordinates[0]
    },
    icon: icon,
    animation: google.maps.Animation.DROP,
    map: map,
  });
}


// Only loads rideshare bicycles in the Bay Area
if (mapLocation.lat < 38.00097580542832 && mapLocation.lat > 37.257267400382986 && mapLocation.lng > -122.70756957204485 && mapLocation.lng < -121.74497094661422) {
console.log("loading bikes");
fetch("http://api.citybik.es/v2/networks/ford-gobike")
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    fordGoBikes = response.network.stations
    for (i = 0; i < fordGoBikes.length; i++) {

      new google.maps.Marker({
        position: {
          lat: fordGoBikes[i].latitude,
          lng: fordGoBikes[i].longitude
        },
        icon: fordIcon,
        animation: google.maps.Animation.DROP,
        map: map,
      });
    }
  })
}
}


$("#searchCity").click(function(){
var searchFor = $("#cityName").val();
launch(searchFor);
});

$(document).ready(function () {
$('#modal1').modal();
});
$(document).ready(function () {
$('#modal2').modal();
});

launch("portland");