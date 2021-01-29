//location of bike share stations
var fordGoBikes = [];
//array to hold searched-for area
var searchedArea = [];
var previousCities = [];
// icon variables 
var thiefIcon = "./assets/images/thief1.png";
var crashIcon = "./assets/images/crash1.png";
var hazardIcon = "./assets/images/caution1.png"
var otherIcon = "./assets/images/other1.png"
var fordIcon = "./assets/images/ford.png"

function launch(city) {
  var startD = new Date($("#startDate").val()).getTime();
  var endD = new Date($("#endDate").val()).getTime();
  if (!startD){
    startD = "";
  }
  if (!endD){
    endD = "";
  }

  fetch("https://bikewise.org:443/api/v2/locations?occurred_before="+ startD +"&occurred_after=" + endD + "&proximity=" + city + "&proximity_square=10")

    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      searchedArea = response.features;
      updateMap(searchedArea);
      reports(searchedArea);
      if (previousCities[0] === city || previousCities[1] === city || previousCities[2] === city || previousCities[3] === city) {
        showPrevious();
      } else {
        previousCities.splice(0, 0, city);
        //stores previous searches in localstorage
        localStorage.setItem("cities", JSON.stringify(previousCities));
        showPrevious();
      }
    })
}

//displays previous weather searches
function showPrevious() {
  $("#previousCities").empty();
  previousCities = JSON.parse(localStorage.getItem("cities"));
  if (!previousCities) {
    previousCities = [];
  }
  for (i = 0; i < previousCities.length && i < 8; i++) {
    var previousLineItem = document.createElement("li");
    previousLineItem.textContent = previousCities[i];
    previousLineItem.style = "text-transform: capitalize";
    $("#previousCities").append(previousLineItem);
  }
}


//fills out report section 
function reports(city) {

  $("tbody").empty();

  for (i = 0; i < city.length; i++) {

    var newRow = document.createElement("tr");
    var iD = document.createElement("td");
    iD.textContent = city[i].properties.id
    newRow.appendChild(iD);

    var theDate = document.createElement("td");
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    var thisDate = (new Date(city[i].properties.occurred_at * 1000)).toLocaleDateString("en-US", options);
    theDate.textContent = thisDate;
    newRow.appendChild(theDate);

    var type = document.createElement("td");
    type.textContent = (city[i].properties.type);
    newRow.appendChild(type);
    $("tbody").append(newRow);
  }
}

// Update the map based on search
function updateMap(incidents) {
  if (!incidents[0]) {
    $('#modal2').modal("open");
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
      title: (incidents[i].properties.id).toString()
    });
  }


  // Only loads rideshare bicycles in the Bay Area
  if (mapLocation.lat < 38.00097580542832 && mapLocation.lat > 37.257267400382986 && mapLocation.lng > -122.70756957204485 && mapLocation.lng < -121.74497094661422) {

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


$("#searchCity").click(function () {
  var searchFor = $("#cityName").val();
  launch(searchFor);
});

$("#cityName").keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    event.preventDefault();
    $("#searchCity").click();
    $("#cityName").val("");
  }
});

$(document).ready(function () {
  $('#modal1').modal();
});
$(document).ready(function () {
  $('#modal2').modal();
});