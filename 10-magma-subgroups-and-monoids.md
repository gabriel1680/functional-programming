# Magma

Magma is the most basic structure. it's a Set (M) of values that is closed under a binary operator (*), and is used to build more complex structures.

```typescript 
interface Magma<M> {
    concat: (x: M, y: M) => M;
}
```

For a set to be a magma, two values of it concatenated needs to map into another value inside of the same set. So any two values of a set concatenaded will be another value inside the set.

Examples of Magma can be:

- __Integers__ with __Addition__ operator. `concat(4, 5) == 9`
- __Integers__ with __Subtraction__ operator. `concat(4, 5) == -1`
- __Integers__ with __Multiplication__ operator. `concat(4, 5) == 20`
- __Real number__ with __Division__ operator. `concat(4.0, 5.0) == 0.8`
- __Arrays__ with __Concatenation__ operator. `concat([1, 2], [3, 4]) == [1, 2, 3, 4]`
- __String__ with __Concatenation__ operator. `concat("ab", "cd) == "abcd"`

# Semigroup

Semigroup is a Magma in wich binary operator is associative.

```typescript
interface SemiGroup<S> extends Magma<S> {}
```

The associative means that the order of applying binary operator is not important.

`x * (y * z) = (x * y) * z`

The semigroup gives us a way to distribute work between workers, machines and so on (parallel work).

Examples of semigroup can be:

- __Integers__ with __Addition__ operator. `concat(x, concat(y, z)) = concat(concat(x, y), z)`
- __Integers__ with __Multiplication__ operator.
- __Arrays__ with __Concatenation__ operator.
- __String__ with __Concatenation__ operator.

Not examples:

- __Integers__ with __Subtraction__ operator. `concat(3, concat(4, 5)) != concat(concat(3, 4), 5)` => `3 - (4 - 5) = 4 != (3 - 4) - 5 = 6`
- __Real number__ with __Division__ operator. `concat(2.0, concat(2.0, 2.0)) != concat(concat(2.0, 2.0), 2.0)` => `2.0 / (2.0 / 2.0) = 2.0 != (2.0 / 2.0) / 2.0 = 0.5`

We have seen that a array concatenation is a SemiGroup operation, but when we have an empty array, what is the poduct of this concatenation?

The answer only can be given with the next structure the `Monoid`.

# Monoid

Monoid are semigroup with special information - the `Neutral Element (empty)`

```typescript
interface Monoid<M> extends SemiGroup<M> {
    empty: M;
}
```

The `Neutral Element` acts like an `Identity` for the Binary Operation.

`x * empty = empty * x = x`.

Examples of Monoid can be:

- __Integers__ with __Addition__ operator. `empty = 0`
- __Integers__ with __Multiplication__ operator. `empty = 1`
- __Arrays__ with __Concatenation__ operator. `empty = []`
- __String__ with __Concatenation__ operator. `empty = ""`

Examples of Semigroup that are `Not Monoid`:

- __Natural numbers__ with __Addition__ operator. `M = {1, 2, 3, ...}`
- __Even number__ with __Multiplication__ operator. `M = {..., -2, 0, 2, ...}`



# Coding Examples

```typescript
// ==== Normal form ====

type AddAll = (xs: List<number>) => number;
const addAll: AddAll = xs => match(
    () => 0, // the not change value
    (head: number, tail: List<number>) => head + addAll(tail),
)(xs);

// or the version with point free form (not explicitly mentioning one or more of this parameters).

const addAll: AddAll = match(
    () => 0, // the not change value
    (head: number, tail: List<number>) => head + addAll(tail),
);

type MultiplyAll = (xs: List<number>) => number;
const multiplyAll: MultiplyAll = match(
    () => 1,
    (head: number, tail: List<number>) => head * multiplyAll(tail),
);

type AppendAll = (xs: List<string>) => string;
const appendAll: AppendAll = match(
    () => "",
    (head: string, tail: List<string>) => head * appendAll(tail),
);

// ==== With Semigroups ====

const addSemigroup: Semigroup<number> = { concat: (x, y) => x + y };
const multiplySemigroup: Semigroup<number> = { concat: (x, y) => x * y };
const appendSemigroup: Semigroup<string> = { concat: (x, y) => x.concat(y) };

const concatAll = <A>(s: Semigroup<A>) => (startsWith: A) => (xs: List<A>): A => match(
    () => startsWith,
    (head: A, tail: List<A>) => s.concat(head, concatAll(s)(startsWith)(tail))
)(xs);

// ==== With Monoids ====

const addMonoid: Monoid<number> = { ...addSemigroup, empty: 0 };
const multiplyMonoid: Monoid<number> = { ...multiplySemigroup, empty: 1 };
const appendMonoid: Monoid<string> = { ...appendSemigroup, empty: "" };

const concatAll2 = <A>(m: Monoid<A>) => (xs: List<A>): A => match(
    () => m.empty,
    (head: A, tail: List<A>) => m.concat(head, concatAll2(m)(tail))
)(xs);
```
