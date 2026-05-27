export abstract class NotebookDomainError extends Error {
  abstract readonly code: string;
}

export class InvalidNotebookTitleError extends NotebookDomainError {
  readonly code = "INVALID_NOTEBOOK_TITLE";

  constructor() {
    super("Notebook title must have between 1 and 80 characters.");
  }
}

export class InvalidPageContentError extends NotebookDomainError {
  readonly code = "INVALID_PAGE_CONTENT";

  constructor() {
    super("Page content cannot exceed 5000 characters.");
  }
}

export class InvalidPageNumberError extends NotebookDomainError {
  readonly code = "INVALID_PAGE_NUMBER";

  constructor() {
    super("Page number must be a positive integer.");
  }
}

export class PageNotFoundError extends NotebookDomainError {
  readonly code = "PAGE_NOT_FOUND";

  constructor() {
    super("The requested page was not found.");
  }
}

export class NotebookNotFoundError extends NotebookDomainError {
  readonly code = "NOTEBOOK_NOT_FOUND";

  constructor() {
    super("The requested notebook was not found.");
  }
}
