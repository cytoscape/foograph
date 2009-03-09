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
 * Return previous vertex in list.
 *
 * @param vertex
 * @return Previous vertex in list
 */
function prevVertex(vertex)
{
  return vertex.prev;
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
 * Return previous edge in list.
 *
 * @param edge
 * @return Next edge in list
 */
function prevEdge(edge)
{
  return edge.prev;
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
  if(this.startVertex != null)
    this.startVertex.prev = vertex;
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
 * @return Newly created Edge instance
 */
function insertEdge(label, weight, vertex1, vertex2)
{
  /* Put at the beginning of vertex1's neighbour list. */
  next = this.firstEdge(vertex1);
  newEdge = new Edge(label, next, weight, vertex2);
  if(next != null) 
    next.prev = newEdge;
  newEdge.prev = null;
  
  vertex1.firstEdge = newEdge;
  
  /* Create a reverse mapping */
  if (!vertex2.reverseEdges)
    vertex2.reverseEdges = new Array();
  
  vertex2.reverseEdges.push(vertex1);
  return newEdge;
    
}

/**
 * Insert an instantiated edge of a vertex.
 *
 * @param vertex Starting vertex
 * @param edge Edge instance
 */
function insertEdgeObj(vertex, edge)
{
  var first = this.firstEdge(vertex);
  if(first != null)
    first.prev = edge;
  edge.next = first;
  edge.prev = null;
  vertex.firstEdge = edge;
}

/** 
 * Delete edge.
 *
 * @param vertex Starting vertex
 * @param edge Edge to remove
 */
 function removeEdge(vertex, edge) 
 {
  // Forward reference update
  if(this.prevEdge(edge) != null) {
    this.prevEdge(edge).next = this.nextEdge(edge);
  }
  else {
    vertex.firstEdge = this.nextEdge(edge);
  }

  // Back reference update
  if(this.nextEdge(edge) != null) {
    this.nextEdge(edge).prev = this.prevEdge(edge);
  }
 }

/** 
 * Delete vertex.
 *
 * @param vertex Vertex to remove from the graph
 */
 function removeVertex(vertex) 
 {
  // Forward reference update
  if(this.prevVertex(vertex) != null) {
    this.prevVertex(vertex).next = this.nextVertex(vertex);
  }
  else {
    this.startVertex = this.nextVertex(vertex);
  }
  // Back reference update
  if(this.nextVertex(vertex) != null) {
    his.nextVertex(vertex).prev = this.prevVertex(vertex);
  }
  this.vertexCount--;
 }
 
/**
 * Plots this graph to a canvas.
 *
 * @param canvas A proper canvas instance
 */
function plot(canvas)
{	
  /* Draw edges first */
  var v = this.firstVertex();
  while (v != null) {
      
    if (!v.hidden) {
      e = this.firstEdge(v);
      while(e != null) {
        /* Draw edge (if not hidden) */
        if (!e.hidden)
          e.draw(canvas, v);
  
        e = this.nextEdge(e);
      }
    }
    v = this.nextVertex(v);
  }
  
  /* Draw the vertices. */
  v = this.firstVertex();
  while (v != null) {
  
    /* Draw vertex (if not hidden) */
    if (!v.hidden)
      v.draw(canvas);
    
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
  this.prevVertex = prevVertex;
  this.firstVertex = firstVertex;
  this.firstEdge = firstEdge;
  this.nextEdge = nextEdge;
  this.prevEdge = prevEdge;
  this.insertVertex = insertVertex;
  this.removeVertex = removeVertex;
  this.insertEdge = insertEdge;
  this.insertEdgeObj = insertEdgeObj;
  this.removeEdge = removeEdge;
  this.plot = plot;
}

/**
 * Vertex object constructor.
 * 
 * @param label Label of this vertex
 * @param next Reference to the next vertex of this graph
 * @param firstEdge First edge of a linked list of edges
 */
function Vertex(label, next, firstEdge, x, y, style)
{
  this.label = label;
  this.next = next;
  this.prev = null;
  this.firstEdge = firstEdge;
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.level = -1;
  this.numberOfParents = 0;
  this.hidden = false;
  this.fixed = false;     // Fixed vertices are static (unmovable)
  
  if(style != null) {    
      this.style = style;
  }
  else { // Default
      this.style = new VertexStyle('ellipse', 80, 40, '#ffffff', '#000000', true);
  }
}

/**
 * toString overload for easier debugging
 */
 Vertex.prototype.toString = function() {
    return this.label;
}

/**
 * Draw vertex method.
 *
 * @param canvas jsGraphics instance
 */
 Vertex.prototype.draw = function(canvas)
 {
  var x = this.x;
  var y = this.y;
  var width = this.style.width;
  var height = this.style.height;
  var shape = this.style.shape;
  
  canvas.setStroke(2);
  canvas.setColor(this.style.fillColor);
  
  if(shape == 'rect') {
    canvas.fillRect(x, y, width, height);
    canvas.setColor(this.style.borderColor);
    canvas.drawRect(x, y, width, height);
  }
  else { // Default to ellipse
    canvas.fillEllipse(x, y, width, height);
    canvas.setColor(this.style.borderColor);
    canvas.drawEllipse(x, y, width, height);
  }
  
  if(this.style.showLabel) {
    canvas.drawStringRect(this.label, x, y + height/2 - 7, width, 'center');
  }
 }
 
 /**
 * VertexStyle object type for defining vertex style options.
 *
 * @param shape Shape of the vertex ('ellipse' or 'rect')
 * @param width Width in px
 * @param height Height in px
 * @param fillColor The color with which the vertex is drawn (RGB HEX string)
 * @param borderColor The color with which the border of the vertex is drawn (RGB HEX string)
 * @param showLabel Show the vertex label or not
 */
function VertexStyle(shape, width, height, fillColor, borderColor, showLabel)
{
  this.shape = shape;
  this.width = width;
  this.height = height;
  this.fillColor = fillColor;
  this.borderColor = borderColor;
  this.showLabel = showLabel;
}
 
/**
 * Edge object constructor.
 *
 * @param label Label of this edge
 * @param next Next edge reference
 * @param weight Edge weight
 * @param endVertex Destination Vertex instance
 */
function Edge(label, next, weight, endVertex, style)
{
  this.label = label;
  this.next = next;
  this.prev = -1;
  this.weight = weight;
  this.endVertex = endVertex;
  this.style = style;
  this.hidden = false;
    
  // Curving information
  this.curved = false;
  this.controlX = -1;   // Control coordinates for Bezier curve drawing
  this.controlY = -1;
  this.original = null; // If this is a temporary edge it holds the original edge
  
  if(style != null) {    
    this.style = style;
  }
  else {  // Set to default
    this.style = new EdgeStyle(2, '#000000', true, false);
  }
}

/**
 * Draw edge method. Draws edge "v" --> "this".
 *
 * @param canvas jsGraphics instance
 * @param v Start vertex
 */
Edge.prototype.draw = function(canvas, v) 
{
  var x1 = Math.round(v.x + v.style.width/2);
  var y1 = Math.round(v.y + v.style.height/2);
  var x2 = Math.round(this.endVertex.x + this.endVertex.style.width/2);
  var y2 = Math.round(this.endVertex.y + this.endVertex.style.height/2);

  // Control point (needed only for curved edges)
  var x3 = this.controlX;
  var y3 = this.controlY;

  /* Quadric Bezier curve definition. */
  function Bx(t) { return (1-t)*(1-t)*x1 + 2*(1-t)*t*x3 + t*t*x2; }
  function By(t) { return (1-t)*(1-t)*y1 + 2*(1-t)*t*y3 + t*t*y2; }

  canvas.setStroke(this.style.width);
  canvas.setColor(this.style.color);
  
  if(this.curved) { // Draw a quadric Bezier curve
    this.curved = false; // Reset
    var t = 0, dt = 1/10;
    var xs = x1, ys = y1, xn, yn;
    
    while (t < 1-dt) {
      t += dt;
      xn = Bx(t);
      yn = By(t);
      canvas.drawLine(xs, ys, xn, yn);
      xs = xn;
      ys = yn;
    }
  } else {
    canvas.drawLine(x1, y1, x2, y2);
  }
  
  // TO DO
  if(this.style.showArrow) {    
  }
  
  // TO DO
  if(this.style.showLabel) {
  }
}

/**
 * EdgeStyle object type for defining vertex style options.
 *
 * @param width Edge line width
 * @param color The color with which the edge is drawn
 * @param showArrow Draw the edge arrow (only if directed)
 * @param showLabel Show the edge label or not
 */
function EdgeStyle(width, color, showArrow, showLabel)
{
  this.width = width;
  this.color = color;
  this.showArrow = showArrow;
  this.showLabel = showLabel;
}