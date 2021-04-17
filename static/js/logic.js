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

// Url for the API queries for data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// get json data from url with d3
d3.json(url).then(function(response) {
    // console log response data
    console.log(response)
    // function for marker style for earthquake data
    function markerStyle(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      }
    } // function to change circle color based on depth value
    function getColor(depth) {
      if(depth > 90) {
        return "#ea2c2c";
      } else if(depth > 70) {
        return "#ea822c" 
      } else if(depth > 50) {
        return "#ee9c00"
      } else if(depth > 30) {
        return "#eecc00"
      } else if(depth > 10) {
        return "#d4ee00"
      } else {
        return "#98ee00"
      }
    }
    // if mag is zero, returns 1, then scale value by 4 so easier to see on map
    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }

    // create geojson data for markers
    L.geoJson(response, {
      pointToLayer: function(feature, latlng) {
      //  console.log(feature);
        return L.circleMarker(latlng)
      },
      style: markerStyle,
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`)
      }
    }).addTo(quakeLayer)

  // add quakeLayer to map
  quakeLayer.addTo(myMap)

  // legend steps
  let legend = L.control({position: "bottomright"});

  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let values = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];
    // loop through intervals and create label for legend
    for (var i = 0; i < values.length; i++) {
      div.innerHTML +=
      `<i style='background:${colors[i]}'></i>`
      + values[i] + (values[i + 1] ? "&dash;" + values[i + 1] + "<br>" : "+");
    }
    return div;
  };
  // add legend to map
  legend.addTo(myMap)

  // get data for tectonic plates
  let plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

  d3.json(plateUrl).then(function(plateResponse) {
    console.log(plateResponse)
    L.geoJson(plateResponse, {
      color: "#ff6500",
      weight: 2
    })
  }).addTo(plateLayer);

  // add platelayer to map
  plateLayer.addTo(myMap);


});