"use client";

import { useState } from "react";
import { PageCard } from "./page-card";
import { useDeathNoteBook } from "../hooks/use-death-note-book";

export function DeathNoteBook() {
  const { notebook, isLoading, addPage, updatePageContent } = useDeathNoteBook();
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  if (isLoading) {
    return <p className="text-stone-300">Loading notebook...</p>;
  }

  if (!notebook) {
    return <p className="text-red-200">Could not load notebook.</p>;
  }

  const page = notebook.pages[selectedPageIndex] ?? notebook.pages[0];

  function goToPreviousPage() {
    setSelectedPageIndex((current) => Math.max(current - 1, 0));
  }

  function goToNextPage() {
    setSelectedPageIndex((current) => Math.min(current + 1, notebook.pages.length - 1));
  }

  async function handleAddPage() {
    await addPage();
    setSelectedPageIndex(notebook.pages.length);
  }

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <div className="book-shadow rounded-2xl border border-red-950/40 bg-black/70 p-5">
        <div className="mb-5 rounded-xl border border-stone-800 bg-neutral-950 px-10 py-8 text-center">
          <h1 className="cover-title text-4xl font-bold text-stone-100">Death Note</h1>
          <p className="mt-3 text-sm text-stone-500">Personal interactive notebook</p>
        </div>

        <PageCard page={page} onChange={updatePageContent} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={goToPreviousPage}
          disabled={selectedPageIndex === 0}
          className="rounded-full border border-stone-700 px-5 py-2 text-sm text-stone-200 transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-stone-400">
          Page {selectedPageIndex + 1} of {notebook.pages.length}
        </span>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={selectedPageIndex >= notebook.pages.length - 1}
          className="rounded-full border border-stone-700 px-5 py-2 text-sm text-stone-200 transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

        <button
          type="button"
          onClick={handleAddPage}
          className="rounded-full border border-red-900/70 bg-red-950/40 px-5 py-2 text-sm text-red-100 transition hover:bg-red-950/70"
        >
          Add page
        </button>
      </div>
    </section>
  );
}
