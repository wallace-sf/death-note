import { Either, left, right } from "@/core/shared/either";
import { PageNotFoundError } from "../errors/notebook-errors";
import { NotebookTitle } from "../value-objects/notebook-title";
import { PageContent } from "../value-objects/page-content";
import { PageNumber } from "../value-objects/page-number";
import { NotePage } from "./note-page";

export type NotebookProps = {
  id: string;
  title: NotebookTitle;
  pages: NotePage[];
  createdAt: Date;
  updatedAt: Date;
};

export class Notebook {
  private constructor(private readonly props: NotebookProps) {}

  static create(params: {
    id: string;
    title: NotebookTitle;
    pages?: NotePage[];
    createdAt?: Date;
    updatedAt?: Date;
  }): Notebook {
    const now = new Date();
    const pages = params.pages?.length
      ? params.pages
      : [
          NotePage.create({
            id: crypto.randomUUID(),
            pageNumber: PageNumber.create(1).isRight()
              ? PageNumber.create(1).value
              : (() => {
                  throw new Error("Invalid default page number.");
                })(),
          }),
        ];

    return new Notebook({
      id: params.id,
      title: params.title,
      pages,
      createdAt: params.createdAt ?? now,
      updatedAt: params.updatedAt ?? now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title.value;
  }

  get pages(): NotePage[] {
    return [...this.props.pages].sort((a, b) => a.pageNumber - b.pageNumber);
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  addPage(): Notebook {
    const nextPageNumber = this.pages.length + 1;
    const pageNumberOrError = PageNumber.create(nextPageNumber);

    if (pageNumberOrError.isLeft()) {
      return this;
    }

    const page = NotePage.create({
      id: crypto.randomUUID(),
      pageNumber: pageNumberOrError.value,
    });

    return new Notebook({
      ...this.props,
      pages: [...this.props.pages, page],
      updatedAt: new Date(),
    });
  }

  rename(title: NotebookTitle): Notebook {
    return new Notebook({
      ...this.props,
      title,
      updatedAt: new Date(),
    });
  }

  updatePageContent(
    pageId: string,
    content: PageContent,
  ): Either<PageNotFoundError, Notebook> {
    const pageExists = this.props.pages.some((page) => page.id === pageId);

    if (!pageExists) {
      return left(new PageNotFoundError());
    }

    const pages = this.props.pages.map((page) => {
      if (page.id !== pageId) {
        return page;
      }

      return page.updateContent(content);
    });

    return right(
      new Notebook({
        ...this.props,
        pages,
        updatedAt: new Date(),
      }),
    );
  }
}
