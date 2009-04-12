function parseGraph(input) 
{
  /* Determine if the input is safe and get the 
     raw object.  */
  var obj = JSON.parse(input);
  var g = new Graph(obj.label, obj.directed ? obj.directed : false);
  
  /* Create vertex objects. */
  for (var i = 0; i < obj.vertices.length; i++) {
    var vertex = obj.vertices[i];
    
    /* Parse style. */
    if (vertex.style) {
      var style = new VertexStyle(
        vertex.style.shape, 
        vertex.style.width,
        vertex.style.height,
        vertex.style.fillColor,
        vertex.style.borderColor,
        vertex.style.showLabel
      );
    }
    else {
      /* Default style if undefined. */
      var style = null;
    }
    
    var v = new Vertex(vertex.label, -1, -1, style);
    g.insertVertex(v);
  }

  /* Set edges to all vertices. */
  for (var i = 0; i < obj.edges.length; i++) {
    var e = obj.edges[i];
    var startVertex = g.vertices[e.from];
    var endVertex = g.vertices[e.to];
    
    if(!startVertex ||!endVertex) {
      document.write('Graph parser error: undefined edge vertice(s). Graph: '+g.label+', edge: '+e.label+'<br>');
    }
    
    /* Parse style. */
    if (e.style) {
      var style = new EdgeStyle(
        e.style.width,
        e.style.color,
        e.style.showArrow,
        e.style.showLabel
      );
    }
    else {
      /* Default style if undefined. */
      var style = null;
    }
    
    var weight = e.weight;
    if(!weight) {
      weight = 1;
    }

    g.insertEdge(e.label, weight, startVertex, endVertex, style);
  }
  
  return g;
}