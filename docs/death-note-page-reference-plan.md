# Death Note page reference plan

This document captures the visual direction for using printable/3D-model references as inspiration for the 2D notebook UI.

## Reference found

A useful reference is the Printables model series by Venterus:

- `Death Note Page 0 / Book Cover`
- `Death Note Page 1`
- related highlighted models for pages 2, 3, and 5

The Printables pages describe these as 2D plate/logo-style models, with a 155.12 x 240 mm page size, black/white filament swaps, and HueForge-style tags. The important point for this project is not the printable file itself, but the idea of representing the notebook as a sequence of recognizable static pages.

Do not commit downloaded PDFs, STL files, screenshots, previews, or other third-party assets from Printables or any other source unless the license explicitly allows redistribution in this repository and the material itself is safe to redistribute.

## Product direction

The app should not only contain:

```txt
Cover -> Rules page -> Editable pages
```

It should evolve toward:

```txt
Cover -> Canonical/inspired static notebook pages -> Editable user pages
```

The static notebook pages should cover as much of the recognizable Death Note notebook structure as possible, excluding pages intended for user writing.

## Static pages vs writable pages

Separate page types clearly in the UI and code.

Recommended conceptual model:

```ts
type NotebookPageKind = "static-reference" | "editable";
```

Static reference pages:

- are part of the notebook experience;
- appear before user-created editable pages;
- are not editable;
- should recreate the layout/feel of the notebook using original CSS/React implementation;
- should not contain verbatim copied rule text from the manga/anime;
- should not rely on official scans or downloaded model assets.

Editable pages:

- are where the user writes;
- continue using localStorage persistence;
- keep character limits and accessibility labels;
- should visually match the aged paper style of the static pages.

## Implementation guidance

Create a structured registry for static pages instead of hardcoding everything inside `DeathNoteBook`.

Suggested structure:

```txt
src/features/death-note/static-pages/
  static-notebook-pages.ts
  static-page-copy.ts
  static-page-layouts.tsx
```

Suggested data shape:

```ts
type StaticNotebookPage = {
  id: string;
  title: string;
  order: number;
  kind: "cover" | "rules" | "reference";
  component: React.ComponentType;
};
```

The page flip order should be:

```txt
1. Cover page
2. Static page 1
3. Static page 2
4. Static page 3
5. Static page 4
6. Static page 5
7. Additional static pages as researched/recreated
8. User editable pages
```

## Visual guidance from the Printables reference

Use the reference to study:

- page aspect ratio around 155 x 240 mm;
- black/white high-contrast page graphics;
- flat page-like composition rather than a 3D viewer;
- cover/page sequencing;
- printable plate clarity: strong silhouettes, readable typography, and simple contrast;
- how each static page could be represented as a designed 2D page.

Translate these into CSS/React:

- fixed notebook page aspect ratio;
- strong centered typography for the cover;
- aging, stains, and subtle page grain for internal pages;
- rules/reference pages with careful serif typography;
- shadow and page-flip depth via CSS and `react-pageflip`;
- no official image assets.

## Copyright-safe rule

The goal is to be visually inspired by the notebook and by the printable reference structure, not to ship copied protected material.

Allowed:

- original CSS recreation;
- original fictional rule copy;
- original page layouts inspired by the structure;
- generated textures owned by the project;
- local-only private references ignored by git.

Not allowed:

- official manga scans;
- anime screenshots;
- copied official rule text;
- downloaded Printables PDFs/STLs committed to the repo;
- screenshots/previews from Printables committed as assets;
- third-party renders or model files committed as assets.

## Acceptance criteria

The next visual implementation should satisfy:

- The notebook has a sequence of non-editable static pages before writable pages.
- Static pages are rendered with project-owned CSS/React, not third-party images.
- User writing pages remain editable and persisted.
- The cover and internal pages better resemble a physical Death Note notebook in 2D.
- `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass.
