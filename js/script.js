var plotPoints = [{
    type: "Feature",
    properties: {
      type: "Theft",
      occured_at: 1611183600
    },
    geometry: {
      coordinates: [-122.38,
        37.73
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
      coordinates: [-122.36,
        37.74
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

// Initialize and add the map
function updateMap() {
  // The location of Uluru
  const uluru = {
    lat: 37.81700600630262,
    lng: -122.27867208032184
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: uluru,
  });
  // The marker, positioned at Uluru
  new google.maps.Marker({
    position: uluru,
    icon: crashIcon,
    map: map,
  });

  new google.maps.Marker({
    position: {
      lat: 37.81146395534422,
      lng: -122.2817383103664
    },
    icon: thiefIcon,
    map: map,
  });

  new google.maps.Marker({
    position: {
      lat: 37.812266556510906, 
      lng: -122.29575793396552
    },
    icon: thiefIcon,
    map: map,
  });
}