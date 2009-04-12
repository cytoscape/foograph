// Example graph in json format
var input = '{'+
'  "label" : "Foo",'+
'  "directed" : true,'+
'  "vertices" :'+
'  ['+
'    {'+
'      "label" : "label1",'+
'      "style" :'+
'      {'+
'        "shape" : "ellipse",'+
'        "width" : 12,'+
'        "height" : 12,'+
'        "fillColor" : "#f00f00",'+
'        "borderColor" : "#000000",'+
'        "showLabel" : true'+
'      }'+
'    },'+
'    {'+
'      "label" : "label2",'+
'      "style" : '+
'      {'+
'        "shape" : "ellipse",'+
'        "width" : 12,'+
'        "height" : 12,'+
'        "fillColor" : "#00ff00",'+
'        "borderColor" : "#000000",'+
'        "showLabel" : true'+
'      }'+
'   },'+
'   {'+
'      "label" : "label3"'+
// Optional stuff is set to default if 
// not present (e.g. style, weight).
'   }'+
'  ],'+
'  '+
'  "edges" : '+
'  ['+
'    {'+
'      "label" : "edge1", '+
'      "weight" : 1,'+
// Define edge by giving two indices
// of the vertex array defined above.
'      "from" : 0,'+
'      "to" : 1,'+
'    },'+
'    {'+
'      "from" : 0,'+
'      "to" : 2,'+
'      "style" : '+
'      {'+
'        "width" : 2,'+
'        "color" : "#f00f00",'+
'        "showArrow" : false,'+
'        "showLabel" : false'+
'      }'+
'    }'+
'  ]'+
'}';

var g = parseGraph(input);
registerGraph(g);