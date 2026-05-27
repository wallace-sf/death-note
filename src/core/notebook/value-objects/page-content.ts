import { Either, left, right } from "@/core/shared/either";
import { InvalidPageContentError } from "../errors/notebook-errors";

export class PageContent {
  private constructor(readonly value: string) {}

  static create(value: string): Either<InvalidPageContentError, PageContent> {
    if (value.length > 5000) {
      return left(new InvalidPageContentError());
    }

    return right(new PageContent(value));
  }

  static empty(): PageContent {
    return new PageContent("");
  }
}
