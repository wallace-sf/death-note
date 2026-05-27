"use client";

import HTMLFlipBook from "react-pageflip";
import { PageCard } from "./page-card";
import { useDeathNoteBook } from "../hooks/use-death-note-book";

type FlipEvent = {
  data: number;
};

export function DeathNoteBook() {
  const {
    notebook,
    isLoading,
    selectedPageIndex,
    addPage,
    updatePageContent,
    setSelectedPageIndex,
  } = useDeathNoteBook();

  if (isLoading) {
    return <p className="text-stone-300">Loading notebook...</p>;
  }

  if (!notebook) {
    return <p className="text-red-200">Could not load notebook.</p>;
  }

  async function handleAddPage() {
    await addPage();
  }

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <div className="book-shadow rounded-2xl border border-red-950/40 bg-black/70 p-4 md:p-6">
        <div className="mb-5 rounded-xl border border-stone-800 bg-neutral-950 px-8 py-7 text-center">
          <h1 className="cover-title text-4xl font-bold text-stone-100 md:text-5xl">
            Death Note
          </h1>
          <p className="mt-3 text-sm text-stone-500">Personal interactive notebook</p>
        </div>

        <div className="hidden md:block">
          <HTMLFlipBook
            width={360}
            height={520}
            size="fixed"
            minWidth={320}
            maxWidth={420}
            minHeight={460}
            maxHeight={620}
            drawShadow
            flippingTime={700}
            usePortrait
            startPage={selectedPageIndex}
            autoSize={false}
            maxShadowOpacity={0.45}
            showCover={false}
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            onFlip={(event: FlipEvent) => setSelectedPageIndex(event.data)}
            className="mx-auto"
            style={{}}
            startZIndex={0}
          >
            {notebook.pages.map((page) => (
              <div key={page.id} className="bg-transparent">
                <PageCard page={page} onChange={updatePageContent} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        <div className="md:hidden">
          <PageCard
            page={notebook.pages[selectedPageIndex] ?? notebook.pages[0]}
            onChange={updatePageContent}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setSelectedPageIndex(Math.max(selectedPageIndex - 1, 0))}
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
          onClick={() =>
            setSelectedPageIndex(Math.min(selectedPageIndex + 1, notebook.pages.length - 1))
          }
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
