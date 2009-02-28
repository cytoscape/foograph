/**
 * Calculates the coordinates based on 
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
 * Layout object constructor.
 *
 * @param width - frame width
 * @param height - frame height
 */
function Layout(width, height)
{
    this.width = width;
    this.height = height;
    this.doRandom = doRandom;
}