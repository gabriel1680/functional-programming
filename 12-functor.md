# Functor (Covariant Functor)

is a mapping between (Categories)['./9-categories.md'] that preverses structure.

It includes:

- map `objects`
- map `arrows`
- preserve `identity` arrows
- preserve `composition` of arrows

A functor formalize the concept of recognizing a pattern ia a structure.

```typescript
const StrLength = (x: string) => number;
const strLength: StrLength = x => x.length;

type OptionStrLength = (Fx: Option<string>) => Option<number>;
const strLength1: OptionStrLength = Fx => match(
    () => none,
    (value: string) => some(strLength(value)),
)(Fx);

// or a point free form

const strLength1: OptionStrLength = match(
    () => none,
    (value: string) => some(strLength(value)),
);

type Increment = (x: number) => number;
const increment: Increment = x => x + 1;

type OptionIncrement = (Fx: Option<number>) => Option<number>;
const optionIncrement: OptionIncrement = match(
    () => none,
    (value: number) => some(increment(value))
);

type MapOption = <A, B>(f: (x: A) => B) => (Fx: Option<A>) => Option<B>;
const mapoption: mapoption = f => fx => match(
    () => none,
    (value: parameters<typeof f[0]>) => some(f(value))
)(Fx);

// or point free form

const mapOption: mapOption = f =>  match(
    () => none,
    (value: parameters<typeof f[0]>) => some(f(value))
);

strLength2 = mapOption(strLength);
increment2 = mapOption(increment);

const incrementLength = compose(increment, strLength);
console.log(incrementLength("abcd")) // 5

const function1 = compose(mapOption(increment), mapOption(strLength));
const function2 = mapOption(incrementLength);

console.log(function1("abcd")); // Some(5);
console.log(function2("abcd")); // Some(5);
console.log(function1(none)); // None
console.log(function2(none)); // None

// ====== Same logic for Lists and Either types
```

