var map;

      require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/layers/LabelClass",
        "esri/Color",

        "dojo/domReady!"
      ], function(Map, Extent, FeatureLayer,
                  SimpleLineSymbol, SimpleFillSymbol,
                  TextSymbol, SimpleRenderer, LabelClass, Color)
      {
        // load the map centered on the United States
        var bbox = new Extent({"xmin": -1940058, "ymin": -814715, "xmax": 1683105, "ymax": 1446096, "spatialReference": {"wkid": 102003}});

        //create the map and set the extent, making sure to "showLabels"
        map = new Map("map", {
          extent: bbox,
          showLabels : true //very important that this must be set to true!
        });

        // create a renderer for the states layer to override default symbology
        var statesColor = new Color("#666");
        var statesLine = new SimpleLineSymbol("solid", statesColor, 1.5);
        var statesSymbol = new SimpleFillSymbol("solid", statesLine, null);
        var statesRenderer = new SimpleRenderer(statesSymbol);

        // create the feature layer to render and label
        var statesUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
        var states = new FeatureLayer(statesUrl, {
          id: "states",
          outFields: ["*"]
        });
        states.setRenderer(statesRenderer);


        // create a text symbol to define the style of labels
        var statesLabel = new TextSymbol().setColor(statesColor);
        statesLabel.font.setSize("14pt");
        statesLabel.font.setFamily("arial");

        //this is the very least of what should be set within the JSON
        var json = {
          "labelExpressionInfo": {"value": "{STATE_NAME}"}
        };

        //create instance of LabelClass (note: multiple LabelClasses can be passed in as an array)
        var labelClass = new LabelClass(json);
        labelClass.symbol = statesLabel; // symbol also can be set in LabelClass' json
        states.setLabelingInfo([ labelClass ]);
        map.addLayer(states);

      });