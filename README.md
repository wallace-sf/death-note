# Death Note

A personal interactive notebook inspired by dark fantasy aesthetics, built with Next.js, TypeScript, Tailwind CSS, Clean Architecture and DDD.

> This is a personal study project. If this becomes public portfolio material later, consider renaming the product experience to a more original name such as `Dark Note` or `Black Ledger`.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- react-pageflip
- LocalStorage persistence
- Clean Architecture + DDD-style boundaries

## Architecture

```txt
src/
  app/                 # Next.js App Router
  core/                # Domain entities, value objects, errors and ports
  application/         # Use cases, DTOs and mappers
  infra/               # Concrete adapters such as LocalStorage
  features/            # React components and hooks
```

Dependency direction:

```txt
features -> application -> core
infra -> application/core contracts
```

The domain does not depend on React, Next.js or browser APIs.

## Current features

- Dark notebook landing screen
- Editable pages
- Desktop page flip animation with `react-pageflip`
- Mobile fallback layout
- Add page action
- Previous/next page navigation
- Local browser persistence
- Domain validation with `Either`
- Isolated use cases for loading, creating, adding pages and updating page content
- ESLint flat config

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Suggested next steps

- Add IndexedDB adapter
- Add export to PDF
- Add sound effects
- Add tests for value objects, entities and use cases
- Add better mobile page transition
