/**
 * Calculates the coordinates based on pure chance.
 *
 * @param graph A valid graph instance
 */
function doRandom(graph)
{
    tmp = graph.firstVertex();
    while (tmp != null) {
        tmp.x = Math.round(Math.random()*this.width);
        tmp.y = Math.round(Math.random()*this.height);
        tmp = tmp.next;
    }
}

/**
 * Calculates the coordinates based on force-directed placement
 * algorithm.
 *
 * @param graph A valid graph instance
 */
function doForceDirected(graph)
{
  // TODO
}

/**
 * Spreads the vertices evenly in a circle.
 * No cross reduction.
 *
 * @param graph A valid graph instance
 */
function doCircular(graph)
{
    /* Radius. */
    var r = Math.min(this.width, this.height)/2; 
    
    /* Where to start the circle. */
    var dx = this.width;
    var dy = this.height/2;

    /* Calculate the step so that the vertices are equally apart. */
    var step = 2*Math.PI/graph.V; 
    var t = 0; // Start at "time" 0.
    
    var tmp = graph.firstVertex();
    while (tmp != null)
    {
        tmp.x = Math.round(r*Math.cos(t) + dx);
        tmp.y = Math.round(r*Math.sin(t) + dy);
        t = t + step;
        
        tmp = graph.nextVertex(tmp);
    }
}

/**
 * Layout object constructor.
 *
 * @param width Frame width (in px)
 * @param height Frame height (in px)
 */
function Layout(width, height)
{
    this.width = width;
    this.height = height;
    
    /* Class methods */
    this.doRandom = doRandom;
    this.doForceDirected = doForceDirected;
    this.doCircular = doCircular;
}
