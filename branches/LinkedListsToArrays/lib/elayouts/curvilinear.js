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
	// Iterate through all vertices
	var v = graph.firstVertex();
	while (v != null) {
    if(!v.hidden) {
			// Do not move this vertex
			v.fixed = true;
			
			// Split all edges into two
			var e = graph.firstEdge(v);
			while (e != null) {
				/* Put a hidden vertex between all edges */
				var ctrlVertex = new Vertex("hidden", null, null, -1, -1, null); 
				ctrlVertex.hidden = true;     // Mark as hidden edge
				graph.insertVertex(ctrlVertex);

				// New edges
				e1 = graph.insertEdge("", 1, v, ctrlVertex);
				e2 = graph.insertEdge("", 1, ctrlVertex, e.endVertex);
				e1.original = e;  // Save original edge (for restoring)

				// Remove original edge
				graph.removeEdge(v, e);
				
				e = graph.nextEdge(e);
			}
		}
		v = graph.nextVertex(v);
	}
}

/** 
 * Remove hidden vertices from the graph.
 *
 * @param graph Valid graph instance
 */
CurvilinearEdgeLayout.prototype.removeHiddenVertices = function(graph)
{
	var v = graph.firstVertex();
	while (v != null) {
		if(!v.hidden) { // Skip hidden vertices
		  // Reset
			v.fixed = false; 
			
			// Iterate through all outgoing edges of vertex v
			var e = graph.firstEdge(v);
			while (e != null) {

				// End vertex to test
				var u = e.endVertex;
				if(u.hidden) {  // Ok, found a hidden vertex. Now restore original edge
				
					var original = e.original;  // The edge to restore
					
					// Remove edge v -> u
					graph.removeEdge(v, e);
					
					// Remove the hidden vertex (and with it its edge)
					graph.removeVertex(u);
			
					// Set curving info
					original.curved = true;
					original.controlX = u.x;
					original.controlY = u.y;
					
					// Restore original edge 
					graph.insertEdgeObj(v, original);
					
				}
				e = graph.nextEdge(e);
			}
		}
		v = graph.nextVertex(v);
  }
}