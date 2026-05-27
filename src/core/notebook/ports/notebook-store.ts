import { Notebook } from "../entities/notebook";

export interface NotebookStore {
  findById(id: string): Promise<Notebook | null>;
  save(notebook: Notebook): Promise<void>;
}
