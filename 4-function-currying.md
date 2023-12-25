# Function Currying

Functions in FP needs to recieve only one input, they are called unary functions.

```typescript
    // In OOP
    function sumOOP(a: number, b: number): number {
        return a + b;
    }

    // In Fp
    type Sum = (a: number) => (b: number) => number;
    const sum: Sum = (a)=  (b) => a + b;
    
    sumOOP(1, 2) === sum(1)(2) === 3 === 1 + 2;
```

It enables us to compose the functions into others like:

```typescript
const sumWithTen = sum(10);
// sumWithTen(8) === 18;

const sumWithFive = sum(5);
// sumWithFive(7) === 12;

const increment = sum(1);
// increment(2) === 3;

const decrement = sum(-1);
// decrement(1) === 0;

// etc..
```

Its possible to convert e binary function to unary by currying it.

```typescript
type Curry = <A, B, Z>(f: (a: A, b:B) => Z) 
    => (a: A) 
    => (b: B) 
    => Z;
const curry: Curry = (f) => (a) => (b) => f(a, b);

const curriedSum = curry(sumOOP);
// curriedSum(1)(2) === 3;
```
