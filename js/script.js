var plotPoints = [{
    type: "Feature",
    properties: {
      type: "Theft",
      occured_at: 1611183600
    },
    geometry: {
      coordinates: [37.802894452433456, -122.2675161571865
      ]
    }
  },

  {
    type: "Feature",
    properties: {
      type: "Theft",
      occured_at: 1611183600
    },
    geometry: {
      coordinates: [37.80679186442484, -122.26515746558509
      ]
    }
  },

  {
    type: "Feature",
    properties: {
      type: "Theft",
      occured_at: 1611183600
    },
    geometry: {
      coordinates: [37.800756233124126, -122.26893401582917
      ]
    }
  },

  {
    type: "Feature",
    properties: {
      type: "Theft",
      occured_at: 1611183600
    },
    geometry: {
      coordinates: [37.8061815421042, -122.27468467188264
      ]
    }
  }
]


var thiefIcon = "./assets/images/thief.png";
var crashIcon = "./assets/images/crash.png";

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = {
    lat: 37.7749,
    lng: -122.4194
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    icon: thiefIcon,
    map: map,
  });
}

// Update the map based on search
function updateMap(incidents) {
  
  console.log(incidents[0].geometry.coordinates[0]);

  const mapLocation = {
    lat: incidents[0].geometry.coordinates[0],
    lng: incidents[0].geometry.coordinates[1]
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: mapLocation,
  });
  
for (i = 0; i < incidents.length; i++){

  new google.maps.Marker({
    position: {
      lat: incidents[i].geometry.coordinates[0],
    lng: incidents[i].geometry.coordinates[1]
    },
    icon: thiefIcon,
    map: map,
  });

}

}