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
  var v = graph.firstVertex();
  
  //reset all node weights to -1
  while (v != null) {
    v.weight = -1;
    v = graph.nextVertex(v);
  }
  
  vertex.weight = 0;
  
  var queue = new Array();
  queue.push(vertex);
  alert(queue);  
  while (queue.length > 0) {
    var a = queue.pop();
    
    alert(a + " [" + queue + "]");    
    var e = graph.firstEdge(a);
    while (e != null) {
      var b = e.endVertex;
      var w = a.weight + e.weight;
      if (b.weight == -1) {        
        b.weight = w;
        queue.push(b);
      } else if (b.weight > w) {
        b.weight = w;
      }
      e = graph.nextEdge(e);
    }
    queue.sort(sortVertex);
    alert(" [" + queue + "] (" + queue.length + ")");  
  }
  
  result = new Array();
  v = graph.firstVertex();
  i = 0;  
  while (v != null) {
    result[i] = v.weight;
    i++;
    v = graph.nextVertex(v);
  }
  return result;
}

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
  var v = graph.firstVertex();
  var minDistanceMatrix = new Array();
  i = 0;
  while (v != null) {
    minDistanceMatrix[i] = this.__djikstraFindShortestPaths(graph, v);
    i++;
    v = graph.nextVertex(v);
  }  
  
  //Do some voodoo magic with derivates
}
