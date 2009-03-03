/**
 * This file is part of foograph Javascript graph library.
 *
 * Description: Fruchterman-Reingold force-directed vertex
 *              layout manager
 */

/**
 * Class constructor.
 *
 * @param width Layout width
 * @param height Layout height
 */
function ForceDirectedVertexLayout(width, height, iterations)
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
ForceDirectedVertexLayout.prototype.layout = function(graph)
{
  var area = this.width * this.height;
  var k = Math.sqrt(area / graph.vertexCount);

  var t = this.width / 10; // Temperature.
  var dt = t / (this.iterations + 1);

  var eps = 20; // Minimum vertex distance.
  var A = 1.5;  // Fine tune attraction.
  var R = 0.5;  // Fine tune repulsion.
      
  // Attractive and repulsive forces
  function Fa(z) { return A*z*z/k; }
  function Fr(z) { return R*k*k/z; }
  function Fw(z) { return 1/z*z; }  // Force emited by the walls
  
  // Assign initial random positions
  randomLayout = new RandomVertexLayout(this.width, this.height);
  randomLayout.layout(graph);
  
  // Run through some iterations
  for (var i = 0; i < this.iterations; i++) {
    /* Calculate repulsive forces. */
    var v = graph.firstVertex();
    while (v != null) {
      v.dx = 0;
      v.dy = 0;
      var u = graph.firstVertex();
      while (u != null) {
        if (v != u) {
          /* Difference vector between the two vertices. */
          var difx = v.x - u.x;
          var dify = v.y - u.y;
          
          /* Length of the dif vector. */
          var d = Math.max(eps, Math.sqrt(difx*difx + dify*dify));
          var force = Fr(d);
          v.dx = v.dx + (difx/d) * force;
          v.dy = v.dy + (dify/d) * force;
        }
        
        u = graph.nextVertex(u);
      }
      /* Treat the walls as static objects emiting force Fw. */
      // Calculate the sum of "wall" forces in (v.x, v.y)
      var x = Math.max(eps, v.x);
      var y = Math.max(eps, v.y);
      var wx = Math.max(eps, this.width - v.x);
      var wy = Math.max(eps, this.height - v.y);   // Gotta love all those NaN's :)
      var Rx = Fw(x) - Fw(wx);
      var Ry = Fw(y) - Fw(wy);
      
    //  document.write(x+", "+y+", "+Rx+", "+Ry+"<br>");
      
      v.dx = v.dx + Rx;
      v.dy = v.dy + Ry;
      
      v = graph.nextVertex(v);
    }
    
    /* Calculate attractive forces. */
    v = graph.firstVertex();
    while (v != null) {
      var e = graph.firstEdge(v);
      while (e != null) {
        var u = e.endVertex;
        var difx = v.x - u.x;
        var dify = v.y - u.y;
        var d = Math.max(eps, Math.sqrt(difx*difx + dify*dify));
        var force = Fa(d);
        
        /* Length of the dif vector. */
        var d = Math.max(eps, Math.sqrt(difx*difx + dify*dify));
        v.dx = v.dx - (difx/d) * force;
        v.dy = v.dy - (dify/d) * force;
        
        u.dx = u.dx + (difx/d) * force;
        u.dy = u.dy + (dify/d) * force;
        
        e = graph.nextEdge(e);
      }
      
      v = graph.nextVertex(v);
    }
    
    /* Limit the maximum displacement to the temperature t
        and prevent from being displaced outside frame.     */
    var v = graph.firstVertex();
    while (v != null) {
      /* Length of the displacement vector. */
      var d = Math.max(eps, Math.sqrt(v.dx*v.dx + v.dy*v.dy));
  
      /* Limit to the temperature t. */
      v.x = v.x + (v.dx/d) * Math.min(d, t);
      v.y = v.y + (v.dy/d) * Math.min(d, t);
      
      /* Stay inside the frame. */
      borderWidth = this.width / 50;
      if (v.x < borderWidth) {
        v.x = borderWidth; 
      } else if (v.x > this.width - borderWidth) {
        v.x = this.width - borderWidth;
      }
      
      if (v.y < borderWidth) {
        v.y = borderWidth; 
      } else if (v.y > this.height - borderWidth) {
        v.y = this.height - borderWidth;
      }
      
      v.x = Math.round(v.x);
      v.y = Math.round(v.y);
      
      v = graph.nextVertex(v);
    }
    
    /* Cool. */
    t -= dt;
  }
}
