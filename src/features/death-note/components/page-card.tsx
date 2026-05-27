"use client";

import { NotePage } from "@/core/notebook/entities/note-page";

type PageCardProps = {
  page: NotePage;
  onChange: (pageId: string, value: string) => void;
};

export function PageCard({ page, onChange }: PageCardProps) {
  const remainingCharacters = 5000 - page.content.length;

  return (
    <article className="notebook-page flex h-[520px] w-[360px] flex-col rounded-sm p-8 shadow-2xl">
      <header className="relative z-10 mb-5 flex items-center justify-between border-b border-stone-900/30 pb-3 font-serif text-xs uppercase tracking-[0.28em] text-stone-900/60">
        <span>Page {page.pageNumber}</span>
        <span>Private</span>
      </header>

      <textarea
        aria-label={`Page ${page.pageNumber} content`}
        value={page.content}
        maxLength={5000}
        spellCheck={false}
        onChange={(event) => onChange(page.id, event.target.value)}
        placeholder="Start writing..."
        className="relative z-10 min-h-0 flex-1 resize-none bg-transparent font-serif text-xl leading-9 text-stone-950 outline-none placeholder:text-stone-950/35"
      />

      <footer className="relative z-10 mt-5 flex items-center justify-between font-serif text-xs text-stone-900/45">
        <span>{page.content.length} characters</span>
        <span>{remainingCharacters} remaining</span>
      </footer>
    </article>
  );
}
