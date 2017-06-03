

var map;

//create arcgis online map
require([
  'dojo/dom',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/Color',
  'esri/map',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/symbols/SimpleMarkerSymbol'
], function(dom, on, array, Color, Map, Query, QueryTask, SimpleMarkerSymbol) {
  var map = new Map('map', {
        basemap: 'streets',
        center: [-118.2095, 34.0866], //calgary coordinates: -113.9508228, 51.1202633],
        autoResize: true,
        zoom: 10
      }),
      url = 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/la_county_labor_centroid/FeatureServer/0',
      markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, null, new Color([50,50,255]));

  function onQuerySuccess(featureSet) {
    map.graphics.clear();
    array.forEach(featureSet.features, function(feature) {
      feature.setSymbol(markerSymbol);
      map.graphics.add(feature);
    });
  }

  function onError(error) {
    console.error('An error ocurred in the query: ', error);
  }

  on(dom.byId('population'), 'change', function(e) {
    var population = e.target.value;
    if (population.length > 0) {
      var queryTask = new QueryTask(url);
      var query = new Query();
      query.where = 'TOTAL_POP > ' + population;
      query.returnGeometry = true;
      queryTask.execute(query).then(onQuerySuccess, onError);
    }
  });

  // map.on('click', function(e) {
  //       var mapPoint = e.mapPoint,
  //           symbolSize = 16,
  //           lineColor = new Color([255, 0, 0]),
  //           fillColor = new Color([255, 255, 0, 0.75]),
  //           line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
  //               lineColor, 3),
  //           sms = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,
  //               symbolSize, line, fillColor),
  //           graphic = new Graphic(mapPoint, sms);
  //       map.graphics.add(graphic);
  //     });

});
