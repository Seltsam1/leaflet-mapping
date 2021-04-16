// Leaflet mapping

// Creating map object
let myMap = L.map("map", {
    center: [40.7608, -111.8910],
    zoom: 6
  });

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

// API queries for data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// get json data from url with d3
d3.json(url).then(function(response) {
    console.log(response)
});