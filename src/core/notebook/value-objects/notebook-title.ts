import { Either, left, right } from "@/core/shared/either";
import { InvalidNotebookTitleError } from "../errors/notebook-errors";

export class NotebookTitle {
  private constructor(readonly value: string) {}

  static create(value: string): Either<InvalidNotebookTitleError, NotebookTitle> {
    const normalized = value.trim();

    if (normalized.length < 1 || normalized.length > 80) {
      return left(new InvalidNotebookTitleError());
    }

    return right(new NotebookTitle(normalized));
  }
}
