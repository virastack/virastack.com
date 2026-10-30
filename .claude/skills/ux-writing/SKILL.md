---
name: ux-writing
description: Review ViraStack user-facing copy (src/messages tr.json/en.json, docs locales, ecosystem.config.ts). Fixes terminology errors per .cursor/rules/terminology.mdc, then reports copy-editing issues (readability, flow, benefit, tone, claim accuracy, card layout) and emphasis/tag issues (bold, italic, rich-text tags, AcademyBadge) with one suggestion each, and scores the page before and after. Use when asked to review, check or polish copy, a page's texts, or "terminology kontrol".
---

# UX writing review

Terminology errors are fixed in place; everything else is only reported, each with a concrete change. Never edit style, emphasis or tags without being told to.

## Scope

Use what the user names: a page, product, section or file. With no scope, review the `src/messages/tr.json` and `en.json` diff (`git diff`). Read the full copy of the target first (hero and meta in `src/config/ecosystem.config.ts`, the namespace in both locales, `Seo`, every component that renders it) and judge tone and terms across the page, not line by line. Check how each component renders text (`t()` vs `t.rich`, which handlers exist) before suggesting tags.

## Step 1: Terminology (fix)

1. Read `.cursor/rules/terminology.mdc` fresh every run; it is the source of truth.
2. Search Turkish copy (`tr.json`, `src/features/**/locales/tr/**/*.tsx`, `ecosystem.config.ts`) for every "Never" term and forbidden form (`ajan`, `başsız`, `istemci`), including suffixed forms.
3. Fix hits in place: apostrophe suffixes (`agent'ın`; `&apos;` in JSX), pairs, `sunucu` exceptions. Keep JSON valid and run `npx tsc --noEmit -p .` afterwards.
4. Address form: the whole site uses **sen** (`kurulur`, `ekle`, `kullan`, `seç`, `öğren`), one form per page. Fix stray **siz** forms (`ekleyin`, `kullanın`, `projeniz`, `-iniz/-ınız`, `-sınız`) in place; CLI flag descriptions have no subject. Read the address-form section of `terminology.mdc` for the exact scope and exceptions.
5. **Established English dev terms stay English** (`state`, `feature`, `framework`, `hook`, `server`, `client`, `agent`, `build`, `props`, `parse`, `lockfile`…). Fix Turkish coinages that replaced them (`durum yönetimi`, `kanca`, `ayrıştırılıp`). Never flag English terms or English card titles in Turkish copy as "mixed language" (`Data & State` is correct) and never suggest translating them.
6. A term that looks like it deserves a rule but is missing: report it as a proposed row, do not add it.

Report fixes as `file:key: old → new`.

## Step 2: Copy editing (report only)

| Check              | What to flag                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Readability**    | Two or more ideas in a sentence; more than ~25 words; chained semicolons; sentences that end on a list                                                                                                                                                                           |
| **Flow**           | Comma splices, translated-sounding Turkish, noun stacks                                                                                                                                                                                                                          |
| **Benefit**        | Cards that list what exists without what it gives the reader; identifiers where a plain phrase works                                                                                                                                                                             |
| **Tone**           | Repeated negative openings; hype ("tek", "kolayca", "tam") without proof; mixed hitap (sen/siz)                                                                                                                                                                                  |
| **Claim accuracy** | Numbers, sizes, counts, guarantees. Verify against the product README, source and package.json size-limit (`form/`, `ai/`, `start/` at the repo root); mark what cannot be verified                                                                                              |
| **Redundancy**     | The same fact in title, subtitle and description; the same thing called by different names across the page                                                                                                                                                                       |
| **Card layout**    | In feature cards each title fits on **one line**, and descriptions are close in length so one card is not 2 lines while another is 6. Flag titles likely to wrap and descriptions much shorter or longer than their siblings (aim for similar character counts, 2–3 lines each)  |
| **Consistency**    | Same capitalization, apostrophe style (`’`), and unit wording across the page and across product pages                                                                                                                                                                           |
| **EN/TR parity**   | The locales say the same thing. Localize rather than translate word for word: when Turkish leads with something meaningful only in Turkey (TCKN, VKN, a Turkish bank), the English may use the recognizable equivalent ("credit card number", "national ID") or a neutral phrase |

Card titles use sentence-style capitalization (`Tek komutla kurulum`, `Sunucuda aynı kurallar`) on every product page.

## Step 3: Emphasis and tags (report only)

Read `.cursor/rules/brand.mdc` each run. Flag:

- Product names as plain text (must be `<start>Start</start>` etc.).
- Technology names as plain text that should be a badge (`AcademyBadge` / `guideStackTags` handlers). Only where the component uses `t.rich`; otherwise say "not renderable here".
- Bold gaps (a key phrase with none; at most 1–2 per paragraph) and bold overuse (more than ~2 spans, whole sentences, product short names).
- Italic used for emphasis (allowed only for foreign or quoted words; acronyms like NIST are not).
- Code-like text (paths, flags, package names, env vars, API names) that should use the component's `<code>` or mono styling, applied the same way across the page.
- Tags without a handler in the component, or handlers without a tag.

## Output format

Write the whole report and all chat in **Turkish**. Keys, paths and code stay as they are. Be brief; lead with counts, then one list per step.

**Score:** rate the whole page (hero, meta, all components, both locales) out of 100 before any edit and again after the edits are applied (re-read the files). Report only the two totals (`Skor: 71 → 90`) and one line on what holds it back. No per-criterion table. Say so when the "before" is estimated rather than measured. A finding that is reported but not applied does not raise the score.

```
Terminoloji: 1 düzeltme
- tr.json Ai.how2Body: ajan → agent'

Metin: 2 bulgu
1. Ai.rulesDesc — tek cümlede üç fikir var; ikiye bölelim.
2. Kart başlıkları Title Case; yalnızca ilk harf büyük olsun.

Vurgu/etiket: 1 bulgu
1. Start.featuresAiDesc — "Claude Code ve Cursor" düz; kart açıklaması t.rich değil, bu yüzden render edilemiyor.
```

Rules for the report:

- Name only the part to change, not the whole text: key, what is wrong in a few words, the new words. Give a full replacement sentence only when the fix is a rewrite that cannot be said shorter, and then one sentence.
- Natural Turkish, varied wording; do not end every line with "önerilir".
- **Group repeated patterns** (card titles, a repeated term, punctuation) into one finding that states the rule once; do not list every item.
- **Never mention English for a fix that applies to both locales.** A Turkish change is assumed to be applied to the English text too; no "EN de aynı", no "TR ve EN", no repeated English suggestion. Mention English only when it needs a different change or is wrong on its own.
- Say "sorun yok" for a clean step; do not invent findings.
- End by asking which suggestions to apply. Apply only those, then re-run `npx tsc --noEmit -p .`.

## Do not

- Add terminology rows, change `brand.mdc` or rewrite copy the user did not ask about.
- Touch Academy lesson content (`academy-lesson-writing` owns it).
- Commit.
