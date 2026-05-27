"use client";

import { NotePage } from "@/core/notebook/entities/note-page";

type PageCardProps = {
  page: NotePage;
  onChange: (pageId: string, value: string) => void;
};

export function PageCard({ page, onChange }: PageCardProps) {
  return (
    <article className="notebook-page flex h-[520px] w-[360px] flex-col rounded-sm p-8 shadow-2xl">
      <div className="relative z-10 mb-5 border-b border-stone-900/30 pb-3 font-serif text-xs uppercase tracking-[0.35em] text-stone-900/60">
        Page {page.pageNumber}
      </div>

      <textarea
        value={page.content}
        maxLength={5000}
        onChange={(event) => onChange(page.id, event.target.value)}
        placeholder="Start writing..."
        className="relative z-10 min-h-0 flex-1 resize-none bg-transparent font-serif text-xl leading-9 text-stone-950 outline-none placeholder:text-stone-950/35"
      />
    </article>
  );
}
