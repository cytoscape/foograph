var g = new Graph("Simple Tree", true);

var v1 = new Vertex("1", -1, -1);
var v2 = new Vertex("2", -1, -1);
var v3 = new Vertex("3", -1, -1);
var v4 = new Vertex("4", -1, -1);
var v5 = new Vertex("5", -1, -1);
var v6 = new Vertex("6", -1, -1);
var v7 = new Vertex("7", -1, -1);
var v8 = new Vertex("8", -1, -1);

g.insertVertex(v1);
g.insertVertex(v2);
g.insertVertex(v3);
g.insertVertex(v4);
g.insertVertex(v5);
g.insertVertex(v6);
g.insertVertex(v7);
g.insertVertex(v8);

g.insertEdge("", 1, v4, v3);
g.insertEdge("", 1, v4, v5);
g.insertEdge("", 1, v3, v1);
g.insertEdge("", 1, v3, v2);
g.insertEdge("", 1, v3, v8);
g.insertEdge("", 1, v5, v6);
g.insertEdge("", 1, v5, v7);

registerGraph(g);