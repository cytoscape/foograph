/**
 * This file is part of foograph Javascript graph library.
 *
 * Description: Kamada-Kawai spring layout manager
 */

/**
 * Class constructor.
 *
 * @param width Layout width
 * @param height Layout height
 */
function KamadaKawaiVertexLayout(width, height)
{
  this.width = width;
  this.height = height;
}

function sortVertex(v1, v2)
{
  return v2.weight - v1.weight;
}

/**
 * Calculates the shortest paths from vertex to any other
 * connected vertex
 *  
 * @param graph A valid graph instance
 * @param vertex A valid vertex instance
 */
KamadaKawaiVertexLayout.prototype.__djikstraFindShortestPaths = function(graph, vertex)
{
  //reset all node weights to -1
  for (var i1 in graph.vertices) {
    graph.vertices[i1].weight = -1;
  }
  
  vertex.weight = 0;
  
  var queue = new Array();
  queue.push(vertex);
  while (queue.length > 0) {
    var a = queue.pop();
    
    for (var i2 in a.edges) {
      e = a.edges[i2];
      
      var b = e.endVertex;
      var w = a.weight + e.weight;
      if (b.weight == -1) {        
        b.weight = w;
        queue.push(b);
      } else if (b.weight > w) {
        b.weight = w;
      }
    }
    
    for (var i5 in a.reverseEdges) {
      e = a.reverseEdges[i5];
      
      var b = e.endVertex;
      var w = a.weight + e.weight;
      if (b.weight == -1) {        
        b.weight = w;
        queue.push(b);
      } else if (b.weight > w) {
        b.weight = w;
      }
    }
    
    queue.sort(sortVertex); 
  }
  
  result = new Array();
  for (i3 in graph.vertices) {
    var v = graph.vertices[i3]
    result[i3] = v.weight;
  }
  return result;
}

/**
 * Calculates the shortest paths from vertex to any other
 * connected vertex
 *  
 * @param graph A valid graph instance
 * @param vertex A valid vertex instance
 */
KamadaKawaiVertexLayout.prototype.__computeEdgeLength = function(graph, distanceMatrix, side)
{
  //edge length is side length divided by largest distance in graph
  var result = 0;
  for (var i1 in distanceMatrix)
    for (var i2 in distanceMatrix[i1])
      if (distanceMatrix[i1][i2] > result)
        result = distanceMatrix[i1][i2];
  
  return side / result;

}

this.spring_constant = 5;

/**
 * Calculates the coordinates based on Kamada-Kawai spring
 * layout algorithm.
 *
 * @param graph A valid graph instance
 */
KamadaKawaiVertexLayout.prototype.layout = function(graph)
{
  //http://www.boost.org/doc/libs/1_38_0/boost/graph/kamada_kawai_spring_layout.hpp
  //Create distance matrix
    //Johnson's algorithm to find shortest paths between all vertices should be implemented
    //http://en.wikipedia.org/wiki/Johnson's_algorithm
  var distance = new Array();
  var txt = "";
  for (var i4 in graph.vertices) {
    var v = graph.vertices[i4];
    distance[i4] = this.__djikstraFindShortestPaths(graph, v);
  }
  
  var edge_length = __computeEdgeLength(graph, distance, width);
  
  var spring_strength = new Array();
  
  var K = this.spring_constant;
  
  for (var i1 in graph.vertices) {
    spring_strength[i1] = new Array();
    for (var i2 in graph.vertices) {
      
    }
  } 
  
  
  
  
  //Do some voodoo magic with derivates
}
