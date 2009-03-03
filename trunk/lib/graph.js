/**
 * Return next vertex in list.
 *
 * @param vertex
 * @return Next vertex in list
 */
function nextVertex(vertex)
{
    return vertex.next;
}

/**
 * Return the starting vertex of this graph.
 *
 * @return This graph's first vertex in its vertex list
 */
function firstVertex()
{
    return this.startVertex;
}

/**
 * Get the first edge of vertex's neighbour list.
 *
 * @param vertex A valid Vertex instance
 */
function firstEdge(vertex)
{
    return vertex.firstEdge;
}

/**
 * Return next edge in list.
 *
 * @param edge
 * @return Next edge in list
 */
function nextEdge(edge)
{
    return edge.next;
}

/**
 * Insert a vertex into this graph.
 * 
 * @param vertex A valid Vertex instance
 */
function insertVertex(vertex)
{
    /* Insert at the beginning. */
    vertex.next = this.startVertex;
    this.startVertex = vertex;
    this.vertexCount++;
}

/**
 * Insert an edge vertex1 --> vertex2.
 *  
 * @param label Label for this edge
 * @param weight Weight of this edge
 * @param vertex1 Starting Vertex instance
 * @param vertex2 Ending Vertex instance
 */
function insertEdge(label, weight, vertex1, vertex2)
{
    /* Put at the beginning of vertex1's neighbour list. */
    next = this.firstEdge(vertex1);
    newEdge = new Edge(label, next, weight, vertex2);
    vertex1.firstEdge = newEdge;
}

/**
 * Plots this graph to a canvas.
 *
 * @param canvas A proper canvas instance
 */
function plot(canvas)
{
  /* Pen related stuff. */
  canvas.setStroke(2);
  
  /* Draw a vertice as a circle 20 by 20 px */
  var cHeight = 40; 
  var cWidth = 80;
  
  /* Draw edges first */
  var v = this.firstVertex();
  while (v != null) {
      var x = v.x;
      var y = v.y;
      
      canvas.setColor("#000000");
      e = this.firstEdge(v);
      while(e != null) {
          /* Line endpoints. */
          var x1 = Math.round(x + cWidth/2);
          var y1 = Math.round(y + cHeight/2);
          var x2 = Math.round(e.endVertex.x + cWidth/2);
          var y2 = Math.round(e.endVertex.y + cHeight/2);
          
          canvas.drawLine(x1, y1, x2, y2);
          e = this.nextEdge(e);
      }
      
      v = this.nextVertex(v);
  }
  
  /* Drawing. */
  v = this.firstVertex();
  while (v != null) {
      var x = v.x;
      var y = v.y;
      
      /* Draw the vertex. */
      canvas.setColor("#ffffff");
      canvas.fillEllipse(x, y, cWidth, cHeight);
      canvas.setColor("#000000");
      canvas.drawEllipse(x, y, cWidth, cHeight);
      canvas.drawStringRect(v.label, x, y+13, 80, 'center')
      
      v = this.nextVertex(v);
  }
}

/**
 * Graph object constructor.
 * 
 * @param label Label of this graph
 * @param directed true or false
 */
function Graph(label, directed)
{
    /* Fields. */
    this.label = label;
    this.startVertex = null;
    this.directed = directed;
    this.vertexCount = 0;
    
    /* Graph methods. */
    this.nextVertex = nextVertex;
    this.firstVertex = firstVertex;
    this.firstEdge = firstEdge;
    this.nextEdge = nextEdge;
    this.insertVertex = insertVertex;
    this.insertEdge = insertEdge;
    this.plot = plot;
}

/**
 * Vertex object constructor.
 * 
 * @param label Label of this vertex
 * @param next Reference to the next vertex of this graph
 * @param firstEdge First edge of a linked list of edges
 */
function Vertex(label, next, firstEdge, x, y)
{
    this.label = label;
    this.next = next;
    this.firstEdge = firstEdge;
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.level = -1;
    this.numberOfParents = 0;
}

/**
 * toString overload for easier debugging
 */
 Vertex.prototype.toString = function() {
    return this.label + this.level;
}

/**
 * Edge object constructor.
 *
 * @param label Label of this edge
 * @param next Next edge reference
 * @param weight Edge weight
 * @param endVertex Destination Vertex instance
 */
function Edge(label, next, weight, endVertex)
{
    this.label = label;
    this.next = next;
    this.weight = weight;
    this.endVertex = endVertex;
}