export const curry: Curry = (f) => (a) => (b) => f(a, b);

type Curry = <A, B, Z>(f: (a: A, b:B) => Z) 
    => (a: A) 
    => (b: B) 
    => Z;
