import { Notebook } from "@/core/notebook/entities/notebook";
import { NotebookStore } from "@/core/notebook/ports/notebook-store";
import { CreateDefaultNotebookUseCase } from "./create-default-notebook-use-case";

export class LoadNotebookUseCase {
  constructor(private readonly store: NotebookStore) {}

  async execute(): Promise<Notebook | null> {
    const current = await this.store.findById("main-notebook");

    if (current) {
      return current;
    }

    const created = await new CreateDefaultNotebookUseCase(this.store).execute();

    if (created.isLeft()) {
      return null;
    }

    return created.value;
  }
}
