# Function Composition

This is the technique of composing functions and create a new function by compobining them using the output of f(x) as input of g(x).

```typescript
type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

type ToString = (x: number) => string;
const toString: ToString = (x) => `${x}`;

type IncrementThenToString = (x: number) => string.
const incrementThenToString: IncrementThenToString = (x: number) => toString(increment(x));

type Compose = <A, B, C>(
    f: (x: B) => C,
    g: (x: A) => B
) => (x: A) => C;
const compose: Compose = (f, g) => x => f(g(x));

const incrementThenToStringWithCompose: IncrementThenToString = compose(toString, increment);
```
