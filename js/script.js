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
      type: "Crash",
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
      type: "Theft",
      occured_at: 1611183600
    },
    geometry: {
      coordinates: [37.8061815421042, -122.27468467188264]
    }
  }
]


var thiefIcon = "./assets/images/thief1.png";
var crashIcon = "./assets/images/crash1.png";
var hazardIcon = "./assets/images/caution1.png"
var otherIcon = "./assets/images/other1.png"


// Initialize and add the map
function initMap() {
  const sanFran = {
    lat: 37.7749,
    lng: -122.4194
  };
  // The map, centered at San Francisco
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: sanFran,
  });
}

// Update the map based on search
function updateMap(incidents) {

  const mapLocation = {
    lat: incidents[0].geometry.coordinates[0],
    lng: incidents[0].geometry.coordinates[1]
  };
 //display map area of searched city
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
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
        lat: incidents[i].geometry.coordinates[0],
        lng: incidents[i].geometry.coordinates[1]
      },
      icon: icon,

      map: map,
    });

  }

}