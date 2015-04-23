# Advantages and Disadvantages #

## Planarization Techniques ##
<p>
<b>Pro:</b><br />
+ fast running time<br />
+ applicable to straight-line, orthogonal and polyline drawings<br />
+ supported by theoretical results on planar drawings<br />
+ works well in practice, also for large graphs<br />
+ limted constraint satisfaction capability<br />
</p>
<p>
<b>Con:</b><br />
- relatively complex to implement<br />
- topological transformations may alter the user’s mental map<br />
- difficult to extend to 3D<br />
- limted constraint satisfaction capability<br />
</p>
## Force-Directed Techniques ##
<p>
<b>Pro:</b><br />
+ relatively simple to implement<br />
+ heuristic improvements easily added<br />
+ smooth evolution of the drawing into the final configuration helps preserving the user’s mental map<br />
+ can be extended to 3D<br />
+ often able to detect and display symmetries<br />
+ works well in practice for small graphs with regular structure<br />
+ limted constraint satisfaction capability<br />
</p>
<p>
<b>Con:</b><br /><b>- slow running time</b><br />
- few theoretical results on the quality of the drawings produced<br />
- diffcult to extend to orthogonal and polyline drawings<br />
- limited constraint satisfaction capability<br />
</p>

# Source #
http://www.cs.brown.edu/~rt/papers/gd-tutorial/gd-constraints.pdf