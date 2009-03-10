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
  for (var i in graph.vertices) {
    var v = graph.vertices[i];
    rootCandidate.push(v);
    v.level = -1;
    v.numberOfParents = 0;
  }
  
  /* Eliminate vertices which have edges pointing towards them */
  for (var i in graph.vertices) {
    var v = graph.vertices[i];
    for (var j in v.edges) {
      var e = v.edges[j];
      e.endVertex.numberOfParents += 1;
    }
  }
  
  var sortQueue = new Array();
  var drawQueue = new Array();
  
  for (var i in graph.vertices) {
    var v = graph.vertices[i];
    if (v.numberOfParents == 0) {
      v.level = 0;
      rootCandidate.push(v);
      sortQueue.push(v);
      drawQueue.push(v);
    }
  }
  
  while (sortQueue.length > 0) {
    var v = sortQueue.pop();
    sortedVertices.push(v);
    
    for (var j in v.edges) {
      var e = v.edges[j];
      e.endVertex.numberOfParents -= 1;
      
      if (e.endVertex.level == -1)
        e.endVertex.level = v.level + 1;
      
      if (e.endVertex.numberOfParents == 0)
        sortQueue.push(e.endVertex);
    }
  }
  
  for (var i in sortedVertices) {
    for (var j in sortedVertices[i].edges) {
      var e = sortedVertices[i].edges[j];
        if (e.endVertex.level <= sortedVertices[i].level)
          e.endVertex.level = sortedVertices[i].level + 1;
    }
  }
  
  for (var i = sortedVertices.length - 1; i >= 0; i--) {
    var v = sortedVertices[i];
    
    if (v.edges.length > 0) {
      minLevel = v.edges[0].endVertex.level;
      for (var j = 1; j<v.edges.length;j++) {
        var e = v.edges[j];

        if (e.endVertex.level < minLevel)
          minLevel = e.endVertex.level;
      }
      
      if (sortedVertices[i].level < minLevel)
        v.level = minLevel - 1;
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
    
    for (var j in v.edges) {
      var e = v.edges[j];
      
      if (e.endVertex.level != -1) {
        drawQueue.push(e.endVertex);
      }
    }
  }
}
