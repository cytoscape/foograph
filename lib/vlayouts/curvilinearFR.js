/**
 * This file is part of foograph Javascript graph library.
 *
 * Description: Fruchterman-Reingold force-directed vertex
 *              layout manager + curvilinear method for 
 *              edge positioning.
 */

/**
 * Class constructor.
 *
 * @param width Layout width
 * @param height Layout height
 */
function CurvilinearFRVertexLayout(width, height, iterations)
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
CurvilinearFRVertexLayout.prototype.layout = function(graph)
{
    this.addHiddenVertices(graph);
    (new ForceDirectedVertexLayout(this.width, this.height, this.iterations)).layout(graph);
    this.removeHiddenVertices(graph);
}

/** 
 * Adds hidden vertices to the graph.
 *
 * @param graph Valid graph instance
 */
CurvilinearFRVertexLayout.prototype.addHiddenVertices = function(graph)
{	
	// Iterate through all vertices
	var v = graph.firstVertex();
	while (v != null) {
        if(!v.hidden) {
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
 * Remove control vertices from the graph.
 *
 * @param graph Valid graph instance
 */
CurvilinearFRVertexLayout.prototype.removeHiddenVertices = function(graph)
{
	var v = graph.firstVertex();
	while (v != null) {
		if(!v.hidden) { // Skip hidden vertices
		   
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
