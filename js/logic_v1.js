//API endpoint url
var url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url, function(data){
   createFeatures(data.features);
});

function createFeatures(earthquakeData){
    // Define a function we want to run once for each feature in the features array
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>"+ feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p> Magnitude:" + feature.properties.mag + "</p>");
    }

    // Creating a geoJSON layer with the retrieved data
    var earthquakes = L.geoJson(earthquakeData,{
        onEachFeature: onEachFeature
        });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes){

    // Define map layer
    // var streetmap = L.titleLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    // "access_token=pk.eyJ1IjoiY2hyaXN0YS1maWVsZHMiLCJhIjoiY2plYmpuMjc3MGU3czJ3czNwN2N5NXNsbyJ9.dSJOKWeDJ_RDvo6exW5srw");

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

    //Define a baseMap object to hold the base layer
    var baseMaps = {
        "Street Map": streetmap
    };

    //Create overlay object to hold our overlay layer
    var overlayMaps = { 
        Earthquakes: earthquakes
    };

    //Create map with streetmap and earthquake layers to displa on load
    var map = L.map("map",{
        center: [39.8283, -98.5795],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    //Create a layer control 
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map)
}
