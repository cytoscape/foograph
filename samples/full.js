var g = new Graph("K5", true);

var v1 = new Vertex("1", null, null, -1, -1);
var v2 = new Vertex("2", null, null, -1, -1);
var v3 = new Vertex("3", null, null, -1, -1);
var v4 = new Vertex("4", null, null, -1, -1);
var v5 = new Vertex("5", null, null, -1, -1);

var e1 = new Edge("1", null, 1, v2);
var e2 = new Edge("2", e1, 1, v3);
var e3 = new Edge("3", e2, 1, v4);
var e4 = new Edge("4", e3, 1, v5);

var e5 = new Edge("5", null, 1, v5);
var e6 = new Edge("6", e5, 1, v4);
var e7 = new Edge("6", e6, 1, v3);

var e8 = new Edge("8", null, 1, v4);
var e9 = new Edge("9", e8, 1, v5);
var e10 = new Edge("10", null, 1, v5);

v1.firstEdge = e4;
v2.firstEdge = e7;
v3.firstEdge = e9;
v4.firstEdge = e10;

g.insertVertex(v1);
g.insertVertex(v2);
g.insertVertex(v3);
g.insertVertex(v4);
g.insertVertex(v5);

registerGraph(g);