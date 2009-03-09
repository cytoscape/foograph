/**
 * This file is part of foograph Javascript graph library.
 *
 * Description: Rooted tree vertex layout manager
 */

/**
 * Class constructor.
 *
 * @param width Layout width
 * @param height Layout height
 */
function RootedTreeVertexLayout(width, height)
{
  this.width = width;
  this.height = height;
}

/**
 * Calculates coordinates based on the hirearchy of the graph.
 * Assumes a directed graph.
 *
 * @param graph A valid graph instance
 */
RootedTreeVertexLayout.prototype.layout = function(graph)
{
  var rootCandidate = new Array();
  var sortedVertices = new Array();
  
  /* All vertices are potential root candidates */
  var v = graph.firstVertex();
  while(v != null) {
    rootCandidate.push(v);
    v.level = -1;
    v.numberOfParents = 0;
    v = graph.nextVertex(v);
  }
  
  /* Eliminate vertices which have edges pointing towards them */
  var v = graph.firstVertex();
  while(v != null) {
    var e = graph.firstEdge(v);
    while(e != null) { 
      e.endVertex.numberOfParents += 1;
      e = graph.nextEdge(e);
    }
    
    v = graph.nextVertex(v);
  }
  
  var sortQueue = new Array();
  var drawQueue = new Array();
  
  var v = graph.firstVertex();
  while(v != null) {
    if (v.numberOfParents == 0) {
      v.level = 0;
      rootCandidate.push(v);
      sortQueue.push(v);
      drawQueue.push(v);
    }
    
    v = graph.nextVertex(v);
  }
  
  while (sortQueue.length > 0) {
    var v = sortQueue.pop();
    sortedVertices.push(v);
    var e = graph.firstEdge(v);
    
    while(e != null) {
      e.endVertex.numberOfParents -= 1;
      
      if (e.endVertex.level == -1)
        e.endVertex.level = v.level + 1;
      
      if (e.endVertex.numberOfParents == 0)
        sortQueue.push(e.endVertex);
      
      e = graph.nextEdge(e);
    }
  }
  
  for (var i = 0; i<sortedVertices.length; i++) {
    e = graph.firstEdge(sortedVertices[i]);
    
    if (e != null) {
      do {
        if (e.endVertex.level <= sortedVertices[i].level)
          e.endVertex.level = sortedVertices[i].level + 1;
        
        e = graph.nextEdge(e);
      } while (e != null);
    }
  }
  
  for (var i = sortedVertices.length - 1; i >= 0; i--) {
    e = graph.firstEdge(sortedVertices[i]);
    
    if (e != null) {
      minLevel = e.endVertex.level
      do {
        if (e.endVertex.level < minLevel)
          minLevel = e.endVertex.level
        
        e = graph.nextEdge(e);
      } while (e != null);
      
      if (sortedVertices[i].level < minLevel)
        sortedVertices[i].level = minLevel - 1;
    }
  }

  var maxLeft = 25;
  
  lastLevel = -1
  while (drawQueue.length > 0) {
    var v = drawQueue.pop();
    if (v.level == -1)
      continue;
    
    
    if (v.level <= lastLevel)
      maxLeft += 100;
    lastLevel = v.level;
    
    v.y = 75 + v.level * 80;
    v.x = maxLeft;
    
    v.level = -1;
    
    e = graph.firstEdge(v);
    while (e != null) {
      if (e.endVertex.level != -1) {
        drawQueue.push(e.endVertex);
      }
      
      e = graph.nextEdge(e);
    }
  }
}
