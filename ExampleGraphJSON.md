# Example graph #

```
{
  "label" : "Example graph",
  "directed" : true,
  "vertices" :
  [
    // Vertex object
    {
      "label" : "Vertex with index 0",
      "style" :
       {
         "shape" : "ellipse",
         "width" : 12,
         "height" : 12,
         "fillColor" : "#f00f00",
         "borderColor" : "#f00f00",
         "showLabel" : true
       }
    },
    {
      "label" : "Vertex 2"
      // Optional stuff is set to default if 
      // not present (e.g. style, weight).
    },
    {
      "label" : "Vertex 3"
    }
  ],
  
  "edges" :
  [
    {
      "label" : "Edge 1",
      "weight" : 1,
      // Define an edge by giving two indices
      // of the vertex array defined above.
      "from" : 0,
      "to" : 1,
      "style" :
      {
        "width" : 2,
        "color" : "#f00f00",
        "showArrow" : false,
        "showLabel" : false
      }
    },
    {
      "label" : "Edge 2",
      "from" : 0,
      "to" : 2
    }
  ]
}
```