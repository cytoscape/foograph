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
    this.doRandom(graph);  // Assign random initial positions.
    var k = Math.sqrt(area/graph.V);

    var t = this.width/10; // Temperature.
    var dt = t/(iterations+1);
    
    var eps = 10; // Minimum vertex distance.
       
    // Attractive and repulsive forces
    function Fa(z) { return z*z/k; }
    function Fr(z) { return k*k/z; }
    
    for (var i = 0; i < iterations; i++) {
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
                    var d = Math.max(eps, Math.sqrt(difx*difx + dify*dify));
                    var force = Fr(d);
                    v.dx = v.dx + (difx/d) * force;
                    v.dy = v.dy + (dify/d) * force;
                }
                u = graph.nextVertex(u);
            }
            v = graph.nextVertex(v);
        }
        
        /* Calculate attractive forces. */
        v = graph.firstVertex();
        while (v != null) {
            var e = graph.firstEdge(v);
            while (e != null) {
                var u = e.endVertex;
                difx = v.x - u.x;
                dify = v.y - u.y;
                var d = Math.max(eps, Math.sqrt(difx*difx + dify*dify));
                var force = Fa(d);
                
                /* Length of the dif vector. */
                var d = Math.sqrt(difx*difx + dify*dify);
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
            } else if (v.x > this.height - borderWidth) {
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
