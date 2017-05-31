

//create your first web map
  var map;

      // require(["esri/map", "dojo/domReady!"], function(Map) {
      //   map = new Map("map", {
      //     basemap: "osm",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
      //     center: [-113.945690, 51.123993], // longitude, latitude,
      //     zoom: 13
      //   });
      // });

//create arcgis online map
require([
  "esri/map",
  "esri/arcgis/utils",
  "esri/dijit/Legend",
  "dojo/domReady!"
  ], function(Map, arcgisUtils, Legend){
      arcgisUtils.createMap("1a40fa5cc1ab4569b79f45444d728067", "mapDiv").then(function (response) {
        map = response.map;

        var legend = new Legend({
          map: map,
          layerInfos:(arcgisUtils.getLegendLayers(response))
        }, "legendDiv");
      legend.startup();
      });
    });

// arcgisUtils.createMap("1a40fa5cc1ab4569b79f45444d728067", "mapDiv").then(function (response) {
//   map = response.map;

//   var legend = new Legend({
//     map: map,
//     layerInfos:(arcgisUtils.getLegendLayers(response))
//   }, "legendDiv");

//   legend.startup();
// });