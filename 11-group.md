# Group

Is a (monoid)['./10-magma-subgroups-and-monoids.md'] that each value has a unique inverse.

$a x a' = I$
$a' x a = I$

```typescript
interface Group<A> {
    concat: (x: A, y: A) => A;
    empty: A;
    inverse: (a: A) => A;
}

// OR

interface Group<A> extends Monoid<A> {
    inverse: (a: A) => A;
}
```

Groups encodes the concept of symetry.

```typescript
const addGroup: Group<number> = {
    concat: (x, y) => x + y,
    empty: 0,
    inverse: (a) => -a
};

// 80 + 20 - 10 = 90
const walletBalance = addGroup.concat(
    addGroup.empty,
    addGroup.concat(80,
        addGroup.concat(20,
            addGroup.inverse(10))));

// ====== Ceasar Cipher ======

type Encrypt = (plainText: string, key: number) => string;
type Decrypt = (cypherText: string, key: number) => string;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const ceasarGroup: Group<number> = {
    concat: (x, y) => (x + y) % ALPHABET.length,
    empty: 0,
    inverse: a => (ALPHABET.length - a) % ALPHABET.lenght
};

const encrypt: Encrypt = (text, key) =>
    text.toLowerCase().split('').map(c => {
        const index = ALPHABET.indexOf(c);
        if (index === -1) return c;
        const newIndex = ceasarGroup.concat(index, key);
        return ALPHABET[newIndex];
    }).join('');

const decrypt: Decrypt = (text, key) => encrypt(text, ceasarGroup.inverse(key));

decrypt(encrypt("hello world!", 3), 3); // hello world!
```

