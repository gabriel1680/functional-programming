# Category Theory

A category cosists of:
- Objects (points)
- Morphs (arrows)

Objects and Morphs are primitives in Category Theory, they have no properties or internal structure.

Not all Objects and Morphs are Categories, they need to:

1. Composition definition: imagine three points A, B and C in space, and a bidirectional vector from A to B (f = AB), B to C (g = BC) and A to C (k = AC). The composition of f and g must be iguals to k (k = f ∘ g).
2. Composition Associativity: with the above example imageine on more point (D) where C to G is the vector h and the A to D is the vector l, so by the first rule we can say l = f ∘ g ∘ h.
The Associativity rule states that no matter the order of the composition the result should be the same: (h ∘ g) ∘ f = h ∘ (g ∘ f).
3. Composition Identity: lets take the first example, but now we can imagine the same points with a circular vector starting in point A to A itself, this vector is called $id_A$ and the same for point B ($id_B$).
Remember AB = f, so the identity rule states for f ∘ $id_A$ = f ∘ $id_b$ = f.

## Examples

- Order: we can think of objects as anything that can be compared and the arrows between them, modeling if an object comes before or after the other.
- isSubset: {x} -> {x,y} -> {x,y,z} -> {w,x,y,z}. The fisrt set is subset of the second (f) and the second set is subset of the next (g), and the next is subset of the last (h). The first set also is a subset of last set (l) so the first rule is satisfied l = f ∘ g ∘ k, and the order deosn't metter, so the second rule is satisfied too l = (f ∘ g) ∘ k = f ∘ (g ∘ k).
For the last rule the first set {x} is subset of itself, so $id_A$ ∘ f = f.

For FP we need to evaluate functions to be Categories and fit them into those rules.
