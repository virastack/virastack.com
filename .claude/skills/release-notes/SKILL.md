---
name: release-notes
description: Writes or updates a ViraStack release note in src/features/releases/data/releases.ts (what changed, why, migration, sources, commits) in Turkish and English, from the product's CHANGELOG, commits and the local release ledger. Use when a product version needs a release note or an existing note must change. Verification afterwards belongs to release-check.
---

# Release notes

A release note tells a developer what changed, why, and what they have to do. Every claim is backed by a source, a commit or a test we ran. This skill writes the note; `release-check` verifies it before publishing.

## Inputs

Read these before writing:

1. **Product repository** (from the workspace root): `start/`, `ai/`, `form/packages/<mask|password|address>`, `guide/`, `academy/`. Read its `CHANGELOG.md` entry for the version and `git log` since the last published version.
2. **Release ledger**: `../.analiz/11-SURUM-NOTU-KAYDI.md` (local, outside the repository). It holds each decision with its reason, sources and limits. Use only entries for this product and version, and only sources marked as read. If the file is missing, ask for the raw material instead of inventing it.
3. **The existing notes** in `releases.ts`, the newest two at least, to match tone.

## Version

- Semver follows the shipped content, not the headline. Any new feature is at least minor; anything that breaks an existing project or its upgrade path is major.
- Only major and minor versions get a note. A patch version (`2.1.1`) is a small fix: it goes to the product's `CHANGELOG.md` only, never to `releases.ts`.
- The version and date equal `package.json` and the `CHANGELOG.md` heading.
- A major version also needs the docs rewritten and the old docs archived (`docs-writing`). A minor or patch version updates the current docs.

## Entry shape

```ts
{
  id: "start-2-0-0",              // <product>-<major>-<minor>-<patch>; never change once published
  date: "2026-11-01",             // ISO, equals the changelog date
  draft: true,                    // until the product and its docs go live together
  products: [{ id: "start", version: "2.0.0" }],
  sources: [{ title: "Page title (Site)", url: "https://..." }],
  commits: [{ repo: "virastack/start", hash: "<full 40-char hash>", title: "Short English summary" }],
  migrationCode: [{ kind: "nextjs", code: "..." }],
  copy: { tr: { title, summary, whatChanged, why, migration }, en: { ... } },
}
```

- New entries go at the top of the array: the list is newest first.
- `draft: true` hides the note in production. Keep it until the package is published and its docs are live; remove it in the same change that publishes them.
- One note may list several products when one decision changed them together.
- `sources`: title as `Page title (Site)`, the page's real title in its original language. Only pages that support a claim in the note. No blogs, summaries or vendor marketing; the source rules match Academy's (official docs, recognized engineers, independent institutions).
- `commits`: public commits on the product's `main`, full hash. A commit that is not on the remote yet is a blocker for publishing, not for drafting.
- `migrationCode`: one block per technology, `kind` from `src/constants/academy-badge.constants.ts`. Only code you ran (or that `release-check` will run) in a project from before the change.

## Copy

Turkish first, then English. Both say the same thing; English is localized, not translated word for word.

- **`title`**: sentence case, the main outcome, not a list of everything (`Kurallar güncel dokümanlara göre yenilendi`).
- **`summary`**: one sentence for the closed card. Product names may stay plain here.
- **`whatChanged`**: bullets, each starting with a bold label and a colon: `- **API katmanı:** ...`. One topic per bullet, concrete names and values (`` `api.get(path, { schema })` ``, `Node ^22.22.2`). Most important first.
- **`why`**: bullets with the same labels where they map. State the problem the change fixes, with the measured number when there is one (`2,6 sn'den 0,51 sn'ye`). The last bullet is `**Sınırlar:**` / `**Limits:**`: what was not tried (Windows, real API, CI) and what is unknown. Say "bilinmiyor" instead of claiming a benefit nobody measured.
- **`migration`**: opens with one bold sentence that answers "do I have to do anything?": `**Bu sürüm mevcut projeleri değiştirmez.**` or `**Komutu çalıştır, elle taşınacak bir şey yok.**`. A major version follows with `**Kırılan değişiklikler:**` and one bullet per break, old value → new value. Omit `migration` only when there is truly nothing to say.

### Voice

- Reader is _sen_ (`projeni`, `kendin yükselt`); the team is _biz_ when we report what we did (`denedik`, `bulamadık`).
- Short sentences, no hype (`tek`, `kolayca`, `tam` without proof), no emoji.
- Turkish keeps English dev terms (`client`, `server`, `agent`, `headless`, `build`, `lockfile`) per `.cursor/rules/terminology.mdc`.

### Markup

The copy is Markdown rendered by `ReleaseRichText`, which allows only paragraphs, lists, `code`, **bold**, _italic_ and badges.

- Technology badges are links: `[Next.js](badge:nextjs)`, `[TanStack Start](badge:tanstack-start)`. Use the badge where the technology is named in `whatChanged`, `why` and `migration`, once or more per bullet as it reads naturally. Not in `title` or `summary`.
- This differs from Academy (`[!nextjs]`) and site messages (`<nextjs>`); never mix them.
- `code` for every file, command, flag, package, option and literal.
- Bold for bullet labels and at most one key phrase per bullet. Italic only for a word stressed against another (_kendi_ `src/start.ts`).
- Template literals: escape backticks (`` \` ``).

## Steps

1. Collect inputs and list every `feat` and `fix` since the last published version.
2. Propose the version, title, the `whatChanged` bullet labels and the sources. Wait for approval.
3. Write the entry with `draft: true`.
4. Run `npx tsc --noEmit -p .` and open the page (`/releases/<product>/<version>`) in development.
5. Hand over to `release-check`. Do not remove `draft`, commit or publish unless asked.
