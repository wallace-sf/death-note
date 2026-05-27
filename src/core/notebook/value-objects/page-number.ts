import { Either, left, right } from "@/core/shared/either";
import { InvalidPageNumberError } from "../errors/notebook-errors";

export class PageNumber {
  private constructor(readonly value: number) {}

  static create(value: number): Either<InvalidPageNumberError, PageNumber> {
    if (!Number.isInteger(value) || value < 1) {
      return left(new InvalidPageNumberError());
    }

    return right(new PageNumber(value));
  }
}
