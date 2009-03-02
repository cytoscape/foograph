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
    var k = Math.sqrt(area/graph.vertexCount);

    var t = this.width/10; // Temperature.
    var dt = t/(iterations+1);

    var eps = 20; // Minimum vertex distance.
    var A = 1.5;  // Fine tune attraction.
    var R = 0.5;  // Fine tune repulsion.
       
    // Attractive and repulsive forces
    function Fa(z) { return A*z*z/k; }
    function Fr(z) { return R*k*k/z; }
    function Fw(z) { return 1/z*z; }  // Force emited by the walls
    
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
                difx = v.x - u.x;
                dify = v.y - u.y;
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
    var step = 2*Math.PI/graph.vertexCount; 
    var t = 0; // Start at "time" 0.
    
    var tmp = graph.firstVertex();
    while (tmp != null) {
        tmp.x = Math.round(r*Math.cos(t) + dx);
        tmp.y = Math.round(r*Math.sin(t) + dy);
        t = t + step;
        
        tmp = graph.nextVertex(tmp);
    }
}

/**
 * Calculates coordinates based on the hirearchy of the graph
 * Assumes directed graph
 *
 * @param graph A valid graph instance
 */
function doRootedTree(graph)
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
        while(e != null)
        { 
          e.endVertex.numberOfParents += 1;
          e = graph.nextEdge(e);
        }
      v = graph.nextVertex(v);
    }
    
    var sortQueue = new Array();
    var drawQueue = new Array();
    
    var v = graph.firstVertex();
    while(v != null)
    {
      if (v.numberOfParents == 0)
      {
        v.level = 0;
        rootCandidate.push(v);
        sortQueue.push(v);
        drawQueue.push(v);
      }
      v = graph.nextVertex(v);
    }
    
    while(sortQueue.length > 0)
    {
      var v = sortQueue.pop();
      sortedVertices.push(v);
      var e = graph.firstEdge(v);
      while(e != null)
      {
        e.endVertex.numberOfParents -= 1;
        if (e.endVertex.level == -1)
          e.endVertex.level = v.level + 1;
        if (e.endVertex.numberOfParents == 0)
          sortQueue.push(e.endVertex);
        e = graph.nextEdge(e);
      }
    }
    for (var i = 0; i<sortedVertices.length; i+=1)
    {
      e = graph.firstEdge(sortedVertices[i]);
      
      if (e != null)
      {
        do
        {
          if (e.endVertex.level <= sortedVertices[i].level)
            e.endVertex.level = sortedVertices[i].level +1;
            e = graph.nextEdge(e);
        } while (e != null);
      }
    }
    
    for (var i = sortedVertices.length - 1; i>=0; i-=1)
    {
      e = graph.firstEdge(sortedVertices[i]);
      
      if (e != null)
      {
        minLevel = e.endVertex.level
        do
        {
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
    while (drawQueue.length > 0)
    {
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
      while (e != null)
      {
        if (e.endVertex.level != -1)
        {
          drawQueue.push(e.endVertex);
        }
        e = graph.nextEdge(e);
      }
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
    this.doRootedTree = doRootedTree;
}
