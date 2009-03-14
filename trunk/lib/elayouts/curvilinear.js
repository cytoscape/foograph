/**
 * This file is part of foograph Javascript graph library.
 *
 * Description: Edge layout - curvilinear method. This class
 * acts as a 'filter', independent of the vertex layout. 
 * It assumes the vertex layout of the input graph is
 * optimal. 
 */

/**
 * Class constructor.
 *
 * @param width Layout width
 * @param height Layout height
 * @param iterations Define the number of iterations of edge positioning 
 */
function CurvilinearEdgeLayout(width, height, iterations)
{
  this.width = width;
  this.height = height;
  this.iterations = iterations;
}

/**
 * Calculates the coordinates based on force-directed placement
 * algorithm.
 *
 * @param graph A valid graph instance
 */
CurvilinearEdgeLayout.prototype.layout = function(graph)
{
  this.addHiddenVertices(graph);
  (new ForceDirectedVertexLayout(this.width, this.height, this.iterations, false)).layout(graph);
  this.removeHiddenVertices(graph);
}

/** 
 * Adds hidden vertices to the graph.
 *
 * @param graph Valid graph instance
 */
CurvilinearEdgeLayout.prototype.addHiddenVertices = function(graph)
{
  this.originalEdges = new Array();
  this.newNodes = new Array();
  // Iterate through all vertices
  var numv = graph.vertices.length
  for (var i1 = graph.vertices.length - 1; i1 >= 0; i1--) {
    var v = graph.vertices[i1];
    
    if(!v.hidden) {
      // Split all edges into two
      for (var i2 = v.edges.length - 1; i2 >= 0; i2--) {
        e = v.edges[i2];
        
        /* Put a hidden vertex between all edges */
        var ctrlVertex = new Vertex("hidden" + i1 + i2, -1, -1, null); 
        ctrlVertex.hidden = true;     // Mark as hidden edge
        ctrlVertex.__sourceEdge = e;
        graph.insertVertex(ctrlVertex);
        
        this.newNodes.push(ctrlVertex);

        // New edges
        e1 = graph.insertEdge("", 1, v, ctrlVertex);
        e2 = graph.insertEdge("", 1, ctrlVertex, e.endVertex);
        
        /* save original edge */
        this.originalEdges.push(new Array(v, e));
        graph.removeEdge(v, e.endVertex);
      }
    }
  }
}

/** 
 * Remove hidden vertices from the graph.
 *
 * @param graph Valid graph instance
 */
CurvilinearEdgeLayout.prototype.removeHiddenVertices = function(graph)
{
  for (var i1 in this.newNodes) {
    var u = this.newNodes[i1];
    // Remove the hidden vertex
    graph.removeVertex(u);

    // Set curving info
    u.__sourceEdge.curved = true;
    u.__sourceEdge.controlX = u.x;
    u.__sourceEdge.controlY = u.y;          
  }
  
  for (var i3 in this.originalEdges) {
    var p = this.originalEdges[i3];
    var e = graph.insertEdge(p[1].label, p[1].weight, p[0], p[1].endVertex);
    e.curved = p[1].curved;
    e.controlX = p[1].controlX;
    e.controlY = p[1].controlY;
  }
}
