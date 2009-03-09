/**
 * This file is part of foograph Javascript graph library.
 *
 * Description: Circular shaped vertex layout manager
 */

/**
 * Class constructor.
 *
 * @param width Layout width
 * @param height Layout height
 */
function CircularVertexLayout(width, height)
{
  this.width = width;
  this.height = height;
}

/**
 * Spreads the vertices evenly in a circle. No cross reduction.
 *
 * @param graph A valid graph instance
 */
CircularVertexLayout.prototype.layout = function(graph)
{
  /* Radius. */
  var r = Math.min(this.width, this.height) / 2;
  
  /* Where to start the circle. */
  var dx = this.width;
  var dy = this.height / 2;

  /* Calculate the step so that the vertices are equally apart. */
  var step = 2*Math.PI / graph.vertexCount; 
  var t = 0; // Start at "time" 0.
  
  var v = graph.firstVertex();
  while (v != null) {
    v.x = Math.round(r*Math.cos(t) + dx);
    v.y = Math.round(r*Math.sin(t) + dy);
    t = t + step;
    
    v = graph.nextVertex(v);
  }
}
