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
    
    /* Graph methods. */
    this.nextVertex = nextVertex;
    this.firstVertex = firstVertex;
    this.firstEdge = firstEdge;
    this.nextEdge = nextEdge;
    this.insertVertex = insertVertex;
    this.insertEdge = insertEdge;
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