import { Either, left, right } from "@/core/shared/either";
import { Notebook } from "@/core/notebook/entities/notebook";
import { InvalidNotebookTitleError } from "@/core/notebook/errors/notebook-errors";
import { NotebookStore } from "@/core/notebook/ports/notebook-store";
import { NotebookTitle } from "@/core/notebook/value-objects/notebook-title";

export class CreateDefaultNotebookUseCase {
  constructor(private readonly store: NotebookStore) {}

  async execute(): Promise<Either<InvalidNotebookTitleError, Notebook>> {
    const title = NotebookTitle.create("Death Note");

    if (title.isLeft()) {
      return left(title.value);
    }

    const notebook = Notebook.create({
      id: "main-notebook",
      title: title.value,
    });

    await this.store.save(notebook);

    return right(notebook);
  }
}
