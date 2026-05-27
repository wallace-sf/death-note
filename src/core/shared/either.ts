export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R = never> {
  readonly kind = "left" as const;

  constructor(readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

export class Right<L = never, R = never> {
  readonly kind = "right" as const;

  constructor(readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export function left<L, R = never>(value: L): Either<L, R> {
  return new Left(value);
}

export function right<L = never, R = never>(value: R): Either<L, R> {
  return new Right(value);
}
