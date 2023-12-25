# Function Recursion

Recursion is the alternative the for loops where are mutations and value changes, wich can lead to errors and mistakes.

```typescript
function normalSumAll(xs: number[]): number {
    let result = 0;
    for (let i = 0; i < xs.length; i++) {
        result += xs[i];
    }
    return result;
}

// normalSumAll([1, 2, 3]) === 6;

type SumAll = (xs: number[]) => number;
const sumAll = (xs) => { // this impl is for learning pourposes
    if (xs.length === 0) return 0;
    const [head, ...rest] = xs;
    return head + sumAll(rest);
}
// sumAll([1, 2, 3]) === 6;

const sumAll2 = (xs) => xs.length === 0 ? 0 : xs[0] + sumAll2(xs.slice(1));
// sumAll2([1, 2, 3]) === 6;
```
