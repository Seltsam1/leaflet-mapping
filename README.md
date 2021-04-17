# leaflet-mapping

Earthquakes and tectonic plates using mapbox

## Getting Started

This codebase is for a map that displayes the past 7 days of earthquake date (based on retrieval url) as circles, with color indicating depth as shown in the legend and the width shows the magnitude. Tectonic plate boundries are displayed in orange. These markers can be turned on or off using the control in the top right of the page. The user can also toggle between 3 map themes: satalite, grayscale, and outdoors.

Earthquake data is from the [USGS GeoJSON Summary Format](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php "USGS GeoJSON Summary Format") page

Tectonic plate data is from https://github.com/fraxen/tectonicplates

To get started, download the folder structure. An API key is required in a seperate congig.py file (not included). You can get an API by [signing up for mapbox](https://www.mapbox.com/ "signing up for mapbox")

This project uses html, css, javascript, mapbox and leaflet

## Features

- index.html file contains the main website framework and links to scripts for:
  - leaflet (css and js)
  - D3 js
- /static/css/style.css contains formatting for the map object and the legend
- /static/js/logic.js contains the bulk of the code for the project:
  - Tile layers for 3 different mapbox themes (light-v10, satellite-v9, outdoors-v11)
  - A map object (from leaflet) that takes in the layers with an initial center and zoom 3
  - A control object (from leaflet) for user to select different tile layers and toggle on or off the earthquake and tectonic plate info
  - d3 to read json from the usgs.gov API
  - Function to set color based on depth and width of circle markers based on magnitude, location based on coordinates
  - Includes popup that appears on click that shows the name of the location and the magnitude value
  - Adds a legend to the bottom right showing the colors and numeric values for depth
  - Adds a layer to display tectonic plate geoJson data as orange lines

## Licensing by:

The code in this project is licensed under MIT license.
