# Either

It used to provide a feedback on while a value doesn't exists.

```typescript

// partial function - it does not have a value for certain input values
function divideTwoIfEven(n: number): never | number {
    if (n === 0) throw "cannot divide by zero";

    if (n % 2 !== 0) throw "number is not even";

    return 2 / n;
} 

// total function - but it earases the messages that we need
function divideTwoIfEven(n: number): Option<number> {
    if (n === 0) return none;

    if (n % 2 !== 0) none;

    return some(2 / n);
}

// either implementation that we need

type Either<E, T> => Left<E> | Rigth<T>;

interface Left<E> {
    readonly _tag: 'Left';
    readonly left: E;
}

interface Rigth<T> {
    readonly _tag: 'Rigth';
    readonly rigth: T;
}

const left = <E, A = never>(e: E) => Either<E, A> => ({
    _tag: 'Left',
    left: e
});

const rigth = <A, E = never>(v: A) => Either<E, A> => ({
    _tag: 'Rigth',
    rigth: v
});

function divideTwoIfEven(n: number): Either<string, number> {
    if (n === 0) return left("cannot divide by zero");

    if (n % 2 !== 0) return left("number is not even");

    return rigth(2 / n);
}
```

If we wantted to use composition in this scenario (while we doesn't have learned `Functors`) we could use

```typescript

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === 'Left';

const incerment = x => x + 1;

const composed = compose(
    x => isLeft(x) ? x : rigth(increment(x.right)),
    divideTwoIfEven
);

// composed(0) -> Left with error message
// composed(2) -> Right with value

```
