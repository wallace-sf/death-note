import { Notebook } from "@/core/notebook/entities/notebook";
import { NotePage } from "@/core/notebook/entities/note-page";
import { NotebookTitle } from "@/core/notebook/value-objects/notebook-title";
import { PageContent } from "@/core/notebook/value-objects/page-content";
import { PageNumber } from "@/core/notebook/value-objects/page-number";
import { NotebookDTO } from "../dtos/notebook-dto";

export function toNotebookDomain(dto: NotebookDTO): Notebook | null {
  const title = NotebookTitle.create(dto.title);

  if (title.isLeft()) {
    return null;
  }

  const pages: NotePage[] = [];

  for (const page of dto.pages) {
    const pageNumber = PageNumber.create(page.pageNumber);
    const content = PageContent.create(page.content);

    if (pageNumber.isLeft() || content.isLeft()) {
      return null;
    }

    pages.push(
      NotePage.create({
        id: page.id,
        pageNumber: pageNumber.value,
        content: content.value,
        createdAt: new Date(page.createdAt),
        updatedAt: new Date(page.updatedAt),
      }),
    );
  }

  return Notebook.create({
    id: dto.id,
    title: title.value,
    pages,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  });
}
