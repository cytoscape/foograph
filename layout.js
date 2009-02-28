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
}
