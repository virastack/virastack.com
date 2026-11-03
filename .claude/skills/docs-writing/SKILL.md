---
name: docs-writing
description: Writes or updates ViraStack product docs on virastack.com (Start, AI, Mask, Password, Address under src/features/docs) after a product release. A major version archives the current docs and rewrites them; a minor or patch version updates them in place. Covers page structure, Turkish and English copy, badges, code and emphasis, and llms.txt. Use when product docs must follow a new version or a docs page is added or changed.
---

# Docs writing

Docs describe the product as it ships today. They follow a release: the version decides whether the docs are rewritten or edited.

## Decide by version

Compare the new version with the latest version in `src/features/docs/config/docs-products.ts` (`versions`).

| Change                        | What to do                                                                                                                 |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Major** (`2.x` → `3.0`)     | Archive the current docs, then rewrite the latest docs from scratch against the new code. Add or rewrite the upgrade page. |
| **Minor** (`2.0` → `2.1`)     | Update the affected pages in place. Raise the latest `label` (`v2.0` → `v2.1`). No archive.                                |
| **Patch** (`2.1.0` → `2.1.1`) | Fix only what the patch changes. Labels show major.minor, so they stay.                                                    |

Older archives were made per minor (Password `v1.0`). Leave them; the rule applies from now on.

Before writing, read the product's `CHANGELOG.md`, the release note in `src/features/releases/data/releases.ts` and the product source (`start/`, `ai/`, `form/packages/<name>` from the workspace root). Docs never claim what the code does not do.

## Archive (major only)

Archive the docs of the **last published version**, not the working tree: take the files from the commit that matches that release. Commits after it may already contain new-version text.

1. **Content:** copy the pages into `content/<product>/v<N>/` with versioned component names (`StartV1CliDoc`) and an `index.ts`. `<N>` is the old major.
2. **Messages:** messages-based products copy their namespace to `Docs<Product>V<N>` in both `src/messages/tr.json` and `en.json`, and add it to `DocsMessageNamespace`.
3. **Config:** add `config/<product>-docs-v<N>.config.ts` with `BASE = "/<product>/docs/v<N>"`, its nav, pages and slugs (see `start-docs-v1.config.ts`).
4. **Register:** in `docs-products.ts`, add the archive under `archives` and to `versions` with the last minor as label (`{ id: "v1", label: "v1.2", latest: false }`). The latest entry gets the new label.
5. **Page:** the product's `components/<Product>DocsPage.tsx` renders the archive, and its `UPGRADE_HREF` points to the upgrade page or, when there is none, the release note. Each archived page shows `DocsArchiveNotice`.
6. **llms:** copy `public/<product>/llms.txt` and `llms-full.txt` to `public/<product>/v<N>/` (as `public/ai/v1/` does).
7. Archived pages are frozen. Do not edit them later except for broken links.

Then rewrite the latest pages from the new code, as if no old docs existed. Reuse a sentence only after checking it is still true.

## Two content shapes

Check which one the product uses before editing:

- **Messages-based** (Start, AI): page components in `content/<product>/` (AI: `content/ai/v2/`) render keys from the product namespace (`DocsStart`, `DocsAi`) with `t()` and `t.rich(key, docsRichTags)`. Copy lives in `src/messages/tr.json` and `en.json`.
- **Locale TSX** (Mask, Password, Address): one component per locale in `content/<product>/locales/tr/` and `locales/en/`, with the text written in JSX.

New products use the messages-based shape. Edit both locales in the same change; the English page is localized, not translated word for word.

## Page structure

- `DocsPageHeader` (title, one-sentence description), then `DocsProse` with `h2` sections and `h3` subsections only.
- New `h2`/`h3` ids are English kebab-case and the same in both locales. Never rename an existing id: anchors are linked from elsewhere.
- An introduction page answers: what it is, why use it, quick start, next steps (links to the following pages).
- Install commands use `CodeBlockCommand` with `convertNpmCommand("npx ...")` so every package manager gets a tab. Other code uses `DocsCodeBlock` with a language.
- Comparisons and option lists are tables. A prompt the reader pastes into an agent uses `DocsPromptBlock`.
- The upgrade page lists breaking changes as old → new, shows the code diff, and gives a prompt for an agent to do the upgrade.
- Docs have no source list. When a statement depends on an outside fact (a Next.js API, a browser rule), link the official page inline.

## Copy

Rules come from `.cursor/rules/brand.mdc` and `.cursor/rules/terminology.mdc`; read both fresh.

- Address the reader as _sen_ (`kur`, `ekle`, `projen`). Never mix in _siz_. CLI flag descriptions have no subject (`planı gösterir`).
- Turkish keeps English dev terms with an apostrophe suffix: `client'ta`, `agent'ın`, `server'da`. Never `istemci`, `başsız`, `ajan`.
- Short sentences, one idea each. Say what the reader gets, not only what exists. No hype (`kolayca`, `tek`, `tam`) without proof.
- Every number, size, version and guarantee is checked against the product's code, `package.json` or README.

## Markup

| Need                                              | Messages-based (`t.rich`)                                         | Locale TSX                       |
| :------------------------------------------------ | :---------------------------------------------------------------- | :------------------------------- |
| Identifier, file, command, flag, package, env var | `<code>api.ts</code>`                                             | `<code>api.ts</code>`            |
| Key phrase                                        | `<bold>...</bold>`                                                | `<strong>...</strong>`           |
| Technology                                        | `<nextjs>Next.js</nextjs>` (handlers in `lib/docs-rich-tags.tsx`) | `<AcademyBadge kind="nextjs" />` |
| ViraStack product                                 | a product tag backed by `GuideProductMark`                        | `<GuideProductMark id="mask" />` |
| Internal link                                     | `<link>...</link>` with a `Link` handler                          | `<Link href="...">`              |

- A badge kind must exist in `src/features/academy/constants/badge.constants.ts`. A missing `t.rich` handler goes into `docsRichTags`, not into a local object.
- Bold: one or two key phrases per paragraph at most, never a whole sentence. No italic for emphasis (only a foreign or quoted word). Product names are never italic.
- Products follow the lockup rule in `brand.mdc`: `ViraStack Start` in running text.
- Badges, release notes (`[Next.js](badge:nextjs)`) and Academy (`[!nextjs]`) use different syntaxes; use only the docs syntax here.

## Machine-readable docs

When pages, commands or flags change, update `public/<product>/llms.txt` and `llms-full.txt` (version in the header line, page list, flags) and the ecosystem list in `public/llms-full.txt`. A new page also goes into the product's nav config.

## Check

- [ ] Version decision matches the change; archive taken from the release commit.
- [ ] Every claim checked in the product code; every command run once.
- [ ] Both locales changed; no _siz_, no forbidden terms.
- [ ] Badge kinds and rich tags exist; no tag without a handler.
- [ ] Version selector and archive notice work; old URLs under `/<product>/docs/v<N>` answer 200.
- [ ] `llms.txt` files updated.
- [ ] `npx tsc --noEmit -p .`, lint and build pass.
- [ ] Ask `ux-writing` for a copy review when the change is large. Commit only when asked.
