/**
 * Return next vertex in list.
 *
 * @param vertex
 * @return Next vertex in list.
 */
function nextVertex(vertex)
{
    return vertex.next;
}

/**
 * Return the starting vertex of this graph.
 *
 * @return This graph's first vertex in its vertex list.
 */
function firstVertex()
{
    return this.startVertex;
}

/**
 * Get the first edge of vertex's neighbour list.
 *
 * @param vertex
 */
function firstEdge(vertex)
{
    return vertex.firstEdge;
}

/**
 * Return next edge in list.
 *
 * @param edge
 * @return Next edge in list.
 */
function nextEdge(edge)
{
    return edge.next;
}

/**
 * Insert a vertex into this graph.
 * 
 * @param vertex
 */
function insertVertex(vertex)
{
    /* Insert at the beginning. */
    vertex.next = this.startVertex;
    this.startVertex = vertex;
}

/**
 * Insert an edge vertex1 --> vertex2.
 *  
 * @param label - Label for this edge.
 * @param weight - Weight of this edge.
 * @param vertex1 - Starting vertex.
 * @param vertex2 - Ending vertex.
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
  var cHeight = 20; 
  var cWidth = 20;
  
  /* Drawing. */
  tmp = g.firstVertex();
  while(tmp != null) {
      
      x = tmp.x;
      y = tmp.y;
      /* Draw the vertex. */
      canvas.setColor("#00ff00");
      canvas.drawEllipse(x, y, cHeight, cWidth);
      
      /* Draw its edges. */
      canvas.setColor("#000000");
      e = g.firstEdge(tmp);
      while(e != null) {
          /* Line endpoints. */
          var x1 = Math.round(x + cWidth/2);
          var y1 = Math.round(y + cHeight/2);
          var x2 = Math.round(e.endVertex.x + cWidth/2);
          var y2 = Math.round(e.endVertex.y + cHeight/2);
          
          canvas.drawLine(x1, y1, x2, y2);
          e = g.nextEdge(e);
      }
      
      tmp = g.nextVertex(tmp);
  }
}
    
/**
 * Calculates the length of a linked list.
 *
 * @param list Linked list ending with null
 */
function count(list)
{
    var i = 0;
    tmp = list;
    while (tmp != null) {
        i++;
        tmp = tmp.next;
    }
    return i;
}

/**
 * Graph object constructor.
 * 
 * @param label Label this graph.
 * @param firstVertex First vertex of a linked list of vertices
 * @param directed true or false
 */
function Graph(label, startVertex, directed)
{
    /* Fields. */
    this.label = label;
    this.startVertex = startVertex;
    this.directed = directed;
    this.V = count(startVertex);   // Number of vertices.
    
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
}

/**
 * Edge object constructor.
 *
 * @param label
 * @param next
 * @param weight
 * @param endVertex
 */
function Edge(label, next, weight, endVertex)
{
    this.label = label;
    this.next = next;
    this.weight = weight;
    this.endVertex = endVertex;
}