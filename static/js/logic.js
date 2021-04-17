// Leaflet mapping

// tile layer for map (light theme)
let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

// tile layer for satellite theme
let satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});

// tile layer for outdoor theme
let outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

// Creating map object
let myMap = L.map("map", {
  center: [40.7608, -111.8910],
  zoom: 3,
  layers: [satellitemap, lightmap, outdoormap, ]
});

// // Adding lightmap to map
// lightmap.addTo(myMap)

// Define base maps
let baseMaps = {
  Grayscale: lightmap,
  Outdoors: outdoormap,
  Satellite: satellitemap
};

// Base layer for markers
let quakeLayer = new L.layerGroup();
let plateLayer = new L.layerGroup();

// Define marker overlay layers
let overlays = {
  "Tectonic Plates": plateLayer,
  Earthquakes: quakeLayer
};

// User control for layers
L.control.layers(baseMaps, overlays).addTo(myMap)

// // API queries for data
// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // get json data from url with d3
// d3.json(url).then(function(response) {
//     console.log(response)



//   // array for markers

//   // loop through json data to store coordinates for markers
// //   for (let i = 0; i < response.length; i++) {
// // //     console.log(response[i].features.geometry.coordinates[0]);
// // //     console.log(response[i].features.properties.mag);
// // //   };
// // // });


//   for (let i = 0; i < response.length; i++) {
//     quakeMarkers.push(
//       L.circle(response[i].features.geometry.coordinates, {
//         stroke: false,
//         fillOpacity: 0.75,
//         color: "green",
//         fillColor: "green",
//         radius: (response[i].features.properties.mag)
//       })
//     );
//   };
// });


