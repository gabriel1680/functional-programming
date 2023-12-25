# ADT and Pattern Matching

## ADT

Are composed types, created from smaller pieces (types).

- ADT stands for `Algebric Data Type`.
- ADT is basically a composite type using operations.
    - Product operation
    - Sum operation
- Not confused with Abstract Data Types.

## Pattern Matching

Is one way to verify the wich type is in the return and act on top of it.

Using with Option:

```typescript
type Match = <A, B, C>(onNone: () => B, onSome: (x: A) => C) => (x: Option<A>) => B | C;
const match: Match = (onNone, onSome) => x => isNone(x) ? onNone() : onSome(x.value);

const maybeNum: Option<number> = some(12);
const result = match(
    () => `num does not exists`,
    (a: number) => `num is ${a}`,
)(maybeNum);
```

Using with Either:

```typescript
type Match = <E, A, B>(onLeft: (e: E) => B, onRigth: (x: A) => B) => (x: Either<E, A>) => B;
const match: Match = (onLeft, onRigth) => x => isLeft(x) ? onLeft(x.left) : onRigth(x.right);

const errOrNum: Either<string, number> = rigth(120);
const result = match(
    (e: string) => `Error happened: ${e}`,
    (a: number) => `num is ${a}`,
)(errOrNum);
```

Using with List:

```typescript
type Match = <A, B>(onNil: () => B, onCons: (head: A, tail: List<A>) => B) => (xs: List<A>) => B;
const match: Match = (onNil, onCons) => xs => isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

const myList: List<string> = cons(1, cons(2, cons(3)));
const result = match(
    () => `list is empty`,
    (head: number, tail: List<number>) => `head is ${head}`,
)(myList);
```
