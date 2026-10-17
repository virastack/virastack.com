import { normalizeAcademySourceKey } from "@/features/academy/constants/source-kind.constants";

export type AcademySourceMention = {
  readonly name: string;
  readonly href: string;
};

const ISSUE_SUFFIX = /\s+#\d+$/;
const VERSION_SUFFIX = /^(.*\D)\s+v?\d+(?:\.\d+)*$/;
const HELP_SUFFIX = /^(.*)\s+help$/i;
const SLASH_CREDIT = /^([\w.-]+)\/([\w.-]+)$/;

type SlashCredit = {
  owner: string;
  repo: string;
};

type PreparedMention = {
  originalKey: string;
  localName: string;
  localKey: string;
  href: string;
  issuePointer: boolean;
  repo: SlashCredit | null;
};

/**
 * Groups citation credits that name one source.
 *
 * A later guide joins an existing row when its credit is the same work under
 * another label: a trailing version (`Next.js 16`) whose bare name is already
 * cited, a help center (`Figma Help`), an episode or issue number (`Syntax #900`,
 * `MSW #2000`), or a GitHub `owner/repo` path whose owner or repository slug
 * equals a cited person or product (`emilkowalski/skills`, `microsoft/playwright-mcp`).
 * An issue whose repository name contains the organization slug joins that
 * organization (`dom-testing-library #1218` on `testing-library`).
 *
 * Sibling products stay separate. TanStack Router does not become TanStack,
 * and a spec version with no bare name stays as cited (`WAI-ARIA 1.2`).
 */
export function buildAcademySourceCanonicalNames(
  mentions: readonly AcademySourceMention[],
): ReadonlyMap<string, string> {
  const prepared = mentions.map((mention) => prepareMention(mention));
  const displayByKey = new Map<string, string>();
  const counts = new Map<string, number>();
  const keysBySlug = new Map<string, string[]>();

  for (const mention of prepared) {
    if (!displayByKey.has(mention.localKey)) {
      displayByKey.set(mention.localKey, mention.localName);
    }
    counts.set(mention.localKey, (counts.get(mention.localKey) ?? 0) + 1);
    if (!mention.repo) {
      addSlugKey(keysBySlug, sourceSlug(mention.localName), mention.localKey);
    }
  }

  const alias = new Map<string, string>();
  const slugToKey = new Map<string, string>();
  for (const [slug, keys] of keysBySlug) {
    const selected = preferredKey(keys, counts, displayByKey);
    if (!selected) {
      continue;
    }
    slugToKey.set(slug, selected);
    for (const key of keys) {
      if (key !== selected) {
        alias.set(key, selected);
      }
    }
  }

  for (const mention of prepared) {
    if (alias.has(mention.localKey)) {
      continue;
    }
    const target = aliasTarget(mention, displayByKey, slugToKey);
    if (target) {
      alias.set(mention.localKey, target);
    }
  }

  const canonical = new Map<string, string>();
  for (const mention of prepared) {
    const resolved = resolveKey(mention.localKey, alias, new Set());
    canonical.set(mention.originalKey, displayByKey.get(resolved) ?? mention.localName);
  }
  return canonical;
}

function prepareMention(mention: AcademySourceMention): PreparedMention {
  const trimmed = mention.name.trim();
  const issuePointer = ISSUE_SUFFIX.test(trimmed);
  const stripped = issuePointer ? trimmed.replace(ISSUE_SUFFIX, "").trim() : trimmed;
  const localName = stripped || trimmed;
  return {
    originalKey: normalizeAcademySourceKey(trimmed),
    localName,
    localKey: normalizeAcademySourceKey(localName),
    href: mention.href,
    issuePointer,
    repo: readMatchingGitHubCredit(localName, mention.href),
  };
}

function aliasTarget(
  mention: PreparedMention,
  displayByKey: ReadonlyMap<string, string>,
  slugToKey: ReadonlyMap<string, string>,
): string | null {
  if (mention.repo) {
    return (
      targetKeyForSlug(sourceSlug(mention.repo.repo), mention.localKey, slugToKey) ??
      targetKeyForSlug(sourceSlug(mention.repo.owner), mention.localKey, slugToKey)
    );
  }

  const helpBase = HELP_SUFFIX.exec(mention.localName)?.[1]?.trim();
  if (helpBase) {
    const helpKey = normalizeAcademySourceKey(helpBase);
    if (helpKey !== mention.localKey && displayByKey.has(helpKey)) {
      return helpKey;
    }
  }

  const versionBase = VERSION_SUFFIX.exec(mention.localName)?.[1]?.trim();
  if (versionBase) {
    const versionKey = normalizeAcademySourceKey(versionBase);
    if (versionKey !== mention.localKey && displayByKey.has(versionKey)) {
      return versionKey;
    }
  }

  if (!mention.issuePointer) {
    return null;
  }

  const issueRepo = readGitHubRepo(mention.href);
  if (!issueRepo) {
    return null;
  }
  const repoSlug = sourceSlug(issueRepo.repo);
  const ownerSlug = sourceSlug(issueRepo.owner);
  const repoTarget = targetKeyForSlug(repoSlug, mention.localKey, slugToKey);
  if (repoTarget) {
    return repoTarget;
  }
  const ownerTarget = targetKeyForSlug(ownerSlug, mention.localKey, slugToKey);
  const repoBelongsToOwner =
    repoSlug === ownerSlug ||
    repoSlug.startsWith(ownerSlug) ||
    repoSlug.endsWith(ownerSlug);
  if (ownerTarget && ownerSlug.length >= 3 && repoBelongsToOwner) {
    return ownerTarget;
  }
  return null;
}

function resolveKey(key: string, alias: ReadonlyMap<string, string>, seen: ReadonlySet<string>): string {
  const next = alias.get(key);
  if (!next || seen.has(key)) {
    return key;
  }
  const followed = new Set(seen);
  followed.add(key);
  return resolveKey(next, alias, followed);
}

function preferredKey(
  keys: readonly string[],
  counts: ReadonlyMap<string, number>,
  displays: ReadonlyMap<string, string>,
): string | null {
  const ranked = [...keys].sort((left, right) => {
    const countDelta = (counts.get(right) ?? 0) - (counts.get(left) ?? 0);
    if (countDelta !== 0) {
      return countDelta;
    }
    const leftName = displays.get(left) ?? left;
    const rightName = displays.get(right) ?? right;
    const leftPretty = /[A-Z.]/.test(leftName) ? 1 : 0;
    const rightPretty = /[A-Z.]/.test(rightName) ? 1 : 0;
    if (leftPretty !== rightPretty) {
      return rightPretty - leftPretty;
    }
    return rightName.length - leftName.length;
  });
  return ranked[0] ?? null;
}

function addSlugKey(keysBySlug: Map<string, string[]>, slug: string, key: string): void {
  if (slug.length < 2) {
    return;
  }
  const existing = keysBySlug.get(slug);
  if (!existing) {
    keysBySlug.set(slug, [key]);
    return;
  }
  if (!existing.includes(key)) {
    existing.push(key);
  }
}

function targetKeyForSlug(
  slug: string,
  selfKey: string,
  slugToKey: ReadonlyMap<string, string>,
): string | null {
  if (slug.length < 2) {
    return null;
  }
  const key = slugToKey.get(slug);
  if (!key || key === selfKey) {
    return null;
  }
  return key;
}

function sourceSlug(name: string): string {
  return normalizeAcademySourceKey(name).replace(/[^a-z0-9]/g, "");
}

function readMatchingGitHubCredit(name: string, href: string): SlashCredit | null {
  const credit = readSlashCredit(name);
  const fromUrl = readGitHubRepo(href);
  if (!credit || !fromUrl) {
    return null;
  }
  if (sourceSlug(credit.owner) !== sourceSlug(fromUrl.owner)) {
    return null;
  }
  if (sourceSlug(credit.repo) !== sourceSlug(fromUrl.repo)) {
    return null;
  }
  return credit;
}

function readSlashCredit(name: string): SlashCredit | null {
  const match = SLASH_CREDIT.exec(name.trim());
  const owner = match?.[1];
  const repo = match?.[2];
  if (!owner || !repo) {
    return null;
  }
  return { owner, repo };
}

function readGitHubRepo(href: string): SlashCredit | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch (error) {
    if (error instanceof TypeError) {
      return null;
    }
    throw error;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return null;
  }
  if (url.hostname.replace(/^www\./, "") !== "github.com") {
    return null;
  }
  const [owner, repo] = url.pathname.split("/").filter(Boolean);
  if (!owner || !repo) {
    return null;
  }
  return { owner, repo };
}
