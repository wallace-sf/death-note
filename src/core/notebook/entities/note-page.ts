import { PageContent } from "../value-objects/page-content";
import { PageNumber } from "../value-objects/page-number";

export type NotePageProps = {
  id: string;
  pageNumber: PageNumber;
  content: PageContent;
  createdAt: Date;
  updatedAt: Date;
};

export class NotePage {
  private constructor(private readonly props: NotePageProps) {}

  static create(params: {
    id: string;
    pageNumber: PageNumber;
    content?: PageContent;
    createdAt?: Date;
    updatedAt?: Date;
  }): NotePage {
    const now = new Date();

    return new NotePage({
      id: params.id,
      pageNumber: params.pageNumber,
      content: params.content ?? PageContent.empty(),
      createdAt: params.createdAt ?? now,
      updatedAt: params.updatedAt ?? now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get pageNumber(): number {
    return this.props.pageNumber.value;
  }

  get content(): string {
    return this.props.content.value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateContent(content: PageContent): NotePage {
    return new NotePage({
      ...this.props,
      content,
      updatedAt: new Date(),
    });
  }
}
