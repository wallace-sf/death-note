"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AddPageUseCase } from "@/application/notebook/use-cases/add-page-use-case";
import { LoadNotebookUseCase } from "@/application/notebook/use-cases/load-notebook-use-case";
import { UpdatePageContentUseCase } from "@/application/notebook/use-cases/update-page-content-use-case";
import { Notebook } from "@/core/notebook/entities/notebook";
import { LocalStorageNotebookStore } from "@/infra/storage/local-storage-notebook-store";

export function useDeathNoteBook() {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const store = useMemo(() => new LocalStorageNotebookStore(), []);

  const reloadNotebook = useCallback(async () => {
    const loaded = await new LoadNotebookUseCase(store).execute();
    setNotebook(loaded);
    setIsLoading(false);
  }, [store]);

  useEffect(() => {
    void reloadNotebook();
  }, [reloadNotebook]);

  const addPage = useCallback(async () => {
    if (!notebook) {
      return;
    }

    const result = await new AddPageUseCase(store).execute(notebook.id);

    if (result.isRight()) {
      setNotebook(result.value);
    }
  }, [notebook, store]);

  const updatePageContent = useCallback(
    async (pageId: string, content: string) => {
      if (!notebook) {
        return;
      }

      const result = await new UpdatePageContentUseCase(store).execute({
        notebookId: notebook.id,
        pageId,
        content,
      });

      if (result.isRight()) {
        const updated = await store.findById(notebook.id);
        setNotebook(updated);
      }
    },
    [notebook, store],
  );

  return {
    notebook,
    isLoading,
    addPage,
    updatePageContent,
  };
}
