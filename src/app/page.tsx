import { DeathNoteBook } from "@/features/death-note/components/death-note-book";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.45em] text-red-200/50">
            Interactive notebook
          </p>
          <h2 className="text-3xl font-semibold text-stone-100 md:text-5xl">
            A dark notebook experience built with Clean Architecture.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-400">
            Write pages locally in your browser while the project keeps domain rules,
            application use cases and infrastructure separated.
          </p>
        </div>

        <DeathNoteBook />
      </div>
    </main>
  );
}
