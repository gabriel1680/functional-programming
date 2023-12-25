# Option, Maybe and Null Values

This approach is used to handle abscense of a value.

The null value itself doesn't have any problem at all. If we think about a function that divide two numbers, when it receive 0 as input it would produce a null as output,
what makes it a partial function, but the null value itself is outside the integer universe, but it is in the Maybe integer universe, wich contains the integer universe.

The cordinality of a type is a the number of elements that type has and it's represented as |A| for the type A. So the Maybe integer type would have
cordinality |MaybeInteger| = |Integer| + 1.

We use the MaybeType as a Option type.

```typescript
type MaybeInteger = number | null.

type Option<A> = A | null;

Option<number> === MaybeInteger === Option<MaybeInteger>;
```

Most often we want to diferentiate those null types, and can achieve this by creating wrapers structures as `Some` and `None`.

```typescript
type Some<A> = {
    value: A
}

const none = Symbol('None');

type None = typeof none;

type Option<A> = Some<A> | None;
```


For the real implementation and use of this we need to remember of composition and currying topics.

```typescript
type DivideTwo = (x: number): number;
const devideTwo: DivideTwo = x => 2/x;

type Increment = (x: number) => number;
const increment = x => x + 1;

const composed = compose(increment, divideTwo);

type Option<A> = Some<A> | None;

interface Some<A> {
    _tag: 'Some';
    value: A;
}

interface None {
    _tag: 'None';
}

const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x })

const none = Option<never> = { _tag: 'None' };

const isNone = <A>(x: Option<A>): x is None => x._tag === 'None';

const divideTwo2 = x => x === 0 ? none : some(2/x);

// it will be increased with functors on next steps
const composed2 = compose(x => isNone(x) ? none : some(increment(x.value)), divide2);
```
