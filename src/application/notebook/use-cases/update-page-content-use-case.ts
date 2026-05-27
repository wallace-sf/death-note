import { Either, left, right } from "@/core/shared/either";
import {
  InvalidPageContentError,
  NotebookNotFoundError,
  PageNotFoundError,
} from "@/core/notebook/errors/notebook-errors";
import { NotebookStore } from "@/core/notebook/ports/notebook-store";
import { PageContent } from "@/core/notebook/value-objects/page-content";

export type UpdatePageContentError =
  | InvalidPageContentError
  | NotebookNotFoundError
  | PageNotFoundError;

export class UpdatePageContentUseCase {
  constructor(private readonly store: NotebookStore) {}

  async execute(input: {
    notebookId: string;
    pageId: string;
    content: string;
  }): Promise<Either<UpdatePageContentError, void>> {
    const notebook = await this.store.findById(input.notebookId);

    if (!notebook) {
      return left(new NotebookNotFoundError());
    }

    const content = PageContent.create(input.content);

    if (content.isLeft()) {
      return left(content.value);
    }

    const updated = notebook.updatePageContent(input.pageId, content.value);

    if (updated.isLeft()) {
      return left(updated.value);
    }

    await this.store.save(updated.value);

    return right(undefined);
  }
}
