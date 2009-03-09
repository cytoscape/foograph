var g = new Graph("Simple Graph", true);

var v1 = new Vertex("1", null, null, -1, -1);
var v2 = new Vertex("2", null, null, -1, -1);
var v3 = new Vertex("3", null, null, -1, -1);
var v4 = new Vertex("4", null, null, -1, -1);
var v5 = new Vertex("5", null, null, -1, -1);
var v6 = new Vertex("6", null, null, -1, -1);

g.insertVertex(v1);
g.insertVertex(v2);
g.insertVertex(v3);
g.insertVertex(v4);
g.insertVertex(v5);
g.insertVertex(v6);

g.insertEdge("", 1, v1, v2);
g.insertEdge("", 1, v1, v3);
g.insertEdge("", 1, v2, v3);
g.insertEdge("", 1, v3, v4);
g.insertEdge("", 1, v4, v5);
g.insertEdge("", 1, v5, v6);
g.insertEdge("", 1, v6, v1);

registerGraph(g);