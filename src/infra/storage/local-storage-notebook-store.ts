import { NotebookDTO } from "@/application/notebook/dtos/notebook-dto";
import { toNotebookDomain } from "@/application/notebook/mappers/to-notebook-domain";
import { toNotebookDTO } from "@/application/notebook/mappers/to-notebook-dto";
import { Notebook } from "@/core/notebook/entities/notebook";
import { NotebookStore } from "@/core/notebook/ports/notebook-store";

export class LocalStorageNotebookStore implements NotebookStore {
  private readonly prefix = "death-note:notebook";

  async findById(id: string): Promise<Notebook | null> {
    if (typeof window === "undefined") {
      return null;
    }

    const raw = window.localStorage.getItem(`${this.prefix}:${id}`);

    if (!raw) {
      return null;
    }

    try {
      const dto = JSON.parse(raw) as NotebookDTO;
      return toNotebookDomain(dto);
    } catch {
      return null;
    }
  }

  async save(notebook: Notebook): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }

    const dto = toNotebookDTO(notebook);
    window.localStorage.setItem(
      `${this.prefix}:${notebook.id}`,
      JSON.stringify(dto),
    );
  }
}
