

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
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/graphic",
  "dojo/_base/Color"
], function(
  Map,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  Graphic,
  Color
) {
  var map = new Map('map', {
        basemap: 'streets',
        center: [-113.9508228, 51.1202633],
        zoom: 14
      });

      map.on('click', function(e) {
        var mapPoint = e.mapPoint,
            symbolSize = 16,
            lineColor = new Color([255, 0, 0]),
            fillColor = new Color([255, 255, 0, 0.75]),
            line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                lineColor, 3),
            sms = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,
                symbolSize, line, fillColor),
            graphic = new Graphic(mapPoint, sms);
        map.graphics.add(graphic);
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