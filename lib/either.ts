export type Either<E, A> = Left<E> | Rigth<A>;

export interface Left<E> {
    readonly _tag: 'Left';
    readonly left: E;
}

export interface Rigth<A> {
    readonly _tag: 'Rigth';
    readonly rigth: A;
}

export const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === 'Left';

export const left = <E>(e: E): Either<E, never> => ({
    _tag: 'Left',
    left: e,
});

export const rigth = <A>(v: A): Either<never, A> => ({
    _tag: 'Rigth',
    rigth: v,
});
