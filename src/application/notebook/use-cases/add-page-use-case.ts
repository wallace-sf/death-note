import { Either, left, right } from "@/core/shared/either";
import { Notebook } from "@/core/notebook/entities/notebook";
import { NotebookNotFoundError } from "@/core/notebook/errors/notebook-errors";
import { NotebookStore } from "@/core/notebook/ports/notebook-store";

export class AddPageUseCase {
  constructor(private readonly store: NotebookStore) {}

  async execute(notebookId: string): Promise<Either<NotebookNotFoundError, Notebook>> {
    const notebook = await this.store.findById(notebookId);

    if (!notebook) {
      return left(new NotebookNotFoundError());
    }

    const updated = notebook.addPage();
    await this.store.save(updated);

    return right(updated);
  }
}
