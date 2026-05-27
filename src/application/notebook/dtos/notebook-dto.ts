export type NotePageDTO = {
  id: string;
  pageNumber: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type NotebookDTO = {
  id: string;
  title: string;
  pages: NotePageDTO[];
  createdAt: string;
  updatedAt: string;
};
