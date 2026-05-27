import { Notebook } from "@/core/notebook/entities/notebook";
import { NotebookDTO } from "../dtos/notebook-dto";

export function toNotebookDTO(notebook: Notebook): NotebookDTO {
  return {
    id: notebook.id,
    title: notebook.title,
    createdAt: notebook.createdAt.toISOString(),
    updatedAt: notebook.updatedAt.toISOString(),
    pages: notebook.pages.map((page) => ({
      id: page.id,
      pageNumber: page.pageNumber,
      content: page.content,
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
    })),
  };
}
