require([
  'dojo/dom',
  'dojo/on',
  'esri/map',
  'esri/layers/FeatureLayer',
  'esri/toolbars/draw',
  'esri/tasks/query'
], function(dom, on, Map, FeatureLayer, Draw, Query) {
  var map = new Map('map', {
    basemap: 'streets',
    autoResize: true,
    center: [-118.2095, 34.0866],
    zoom: 10
  });

  var featureLayer = new FeatureLayer('http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/la_county_labor_centroid/FeatureServer/0', {
    mode: FeatureLayer.MODE_SELECTION
  });

  drawToolbar = new Draw(map); //Instantiates Draw toolbar by providing instance of map

  //Listens for Draw toolbar to finish drawing and returns an event with geometry
  drawToolbar.on('draw-end', function(e){
  drawToolbar.deactivate();
  var query = new Query();
  query.geometry = e.geometry;
  featureLayer.selectFeatures(query); //Selects features in FeatureLayer using drawn geometry
  });

  //featureLayer.setDefinitionExpression('TOTAL_POP > 5000');

  map.addLayer(featureLayer);

  on(dom.byId('drawPolygon'), 'click', function() {
    drawToolbar.activate(Draw.POLYGON);
  });

  on(dom.byId('population'), 'change', function(e) {
    var population = e.target.value;
    var definitionExpression = 'TOTAL_POP > ' + population;
    featureLayer.setDefinitionExpression(definitionExpression);
  });

});
