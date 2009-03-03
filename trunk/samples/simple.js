var g = new Graph("Simple Graph", true);

var v1 = new Vertex("1", null, null, -1, -1);
var v2 = new Vertex("2", null, null, -1, -1);
var v3 = new Vertex("3", null, null, -1, -1);
var v4 = new Vertex("4", null, null, -1, -1);
var v5 = new Vertex("5", null, null, -1, -1);
var v6 = new Vertex("6", null, null, -1, -1);

var e1 = new Edge("1", null, 1, v2);
var e2 = new Edge("2", null, 1, v3);
var e4 = new Edge("4", null, 1, v4);
var e5 = new Edge("5", null, 1, v5);
var e6 = new Edge("6", null, 1, v6);
var e7 = new Edge("6", null, 1, v1);
var e3 = new Edge("3", e4, 1, v1);

v1.firstEdge = e1;
v2.firstEdge = e2;
v3.firstEdge = e3;
v4.firstEdge = e5;
v5.firstEdge = e6;
v6.firstEdge = e7;

g.insertVertex(v1);
g.insertVertex(v2);
g.insertVertex(v3);
g.insertVertex(v4);
g.insertVertex(v5);
g.insertVertex(v6);

registerGraph(g);