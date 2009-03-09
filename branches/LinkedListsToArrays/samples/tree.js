var g = new Graph("Simple Tree", true);

var v1 = new Vertex("1", null, null, -1, -1);
var v2 = new Vertex("2", null, null, -1, -1);
var v3 = new Vertex("3", null, null, -1, -1);
var v4 = new Vertex("4", null, null, -1, -1);
var v5 = new Vertex("5", null, null, -1, -1);
var v6 = new Vertex("6", null, null, -1, -1);
var v7 = new Vertex("7", null, null, -1, -1);
var v8 = new Vertex("8", null, null, -1, -1);

var e1 = new Edge("1", null, 1, v3);
var e2 = new Edge("2", e1, 1, v5);
var e3 = new Edge("3", null, 1, v2);
var e4 = new Edge("4", e3, 1, v1);
var e7 = new Edge("4", e4, 1, v8);

var e5 = new Edge("5", null, 1, v6);
var e6 = new Edge("6", e5, 1, v7);

v4.firstEdge = e2;
v3.firstEdge = e7;
v5.firstEdge = e6;

g.insertVertex(v1);
g.insertVertex(v2);
g.insertVertex(v3);
g.insertVertex(v4);
g.insertVertex(v5);
g.insertVertex(v6);
g.insertVertex(v7);
g.insertVertex(v8);

registerGraph(g);