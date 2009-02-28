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
function doForceDirected(graph, iterations)
{
    var area = this.width * this.height;
    this.doCircular(graph);  // Assign random initial positions.
    var k = Math.sqrt(area/graph.V);
    var t = 40;

    var i = 0;
    for(i = 0; i < iterations; i++) {
        
        /* Calculate repulsive forces. */
        var v = graph.firstVertex();
        while (v != null) {
            v.dx = 0;
            v.dy = 0;
            var u = graph.firstVertex();
            while (u != null) {
                if (v != u) {
                    /* Difference vector between the two vertices. */
                    difx = v.x - u.x;
                    dify = v.y - u.y;
                    /* Length of the dif vector. */
                    d = Math.sqrt(difx*difx + dify*dify);
                    v.dx = v.dx + difx/d * fr(d);
                    v.dy = v.dy + dify/d * fr(d);
                }
            }
        }
        
        /* Calculate attractive forces. */
        var v = graph.firstVertex();
        while (v != null) {
            var e = graph.firstEdge(v);
            while (e != null) {
                
                var u = e.endVertex;
                difx = v.x - u.x;
                dify = v.y - u.y;
                
                /* Length of the dif vector. */
                d = Math.sqrt(difx*difx + dify*dify);
                v.dx = v.dx - difx/d * fa(d);
                v.dy = v.dy - dify/d * fa(d);
            }
        }
        
        /* Limit the maximum displacement to the temperature t
           and prevent from being displaced outside frame.     */
        var v = graph.firstVertex();
        while (v != null) {
            /* Length of the displacement vector. */
            d = Math.sqrt(v.dx*v.dx + v.dy*v.dy);
            
            /* Limit to the temperature t. */
            v.x = v.x + (v.dx/d)* Math.min(v.dx, t);
            v.y = v.y + (v.dy/d)* Math.min(v.dy, t);
            
            /* Stay inside the frame. */
            v.x = Math.round(min(width/2, max(-this.width/2, v.x) ));
            v.y = Math.round(min(height/2, max(-this.height/2, v.y) ));
        }
        
        t = cool(t);
    }
}

/**
 * Attractive "force".
 * 
 * @param z 
 */
function fa(z)
{
    return z*z/k;
}

/**
 * Repulsive "force".
 * 
 * @param z 
 */
function fr(z)
{
    return k*k/z;
}

/**
 * Cooling function.
 *
 * @param t Current temperature.
 */
function cool(t) 
{
    return t/2;
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
