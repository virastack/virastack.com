#!/usr/bin/env node
/* eslint-disable no-console -- a CLI report: printing is its job */
// Checks every step of a ViraStack package release, from the version bump to the site.
// Read-only: it runs git fetch, but never edits, commits, pushes, tags or publishes.
//
// Usage: node check.mjs [ai|start|mask|password|address] [version] [--json]
// The version defaults to the one in the package's package.json.
// Without a product it checks every product and the site, and prints a summary.
import { execFile, execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const SITE = join(ROOT, "virastack.com");
const SITE_URL = "https://virastack.com";
const RELEASES_FILE = "src/features/releases/data/releases.ts";

const PRODUCTS = {
  ai: { repo: "ai", pkg: "ai", npm: "@virastack/ai", gh: "virastack/ai", tag: (v) => `v${v}` },
  start: {
    repo: "start",
    pkg: "start",
    npm: "virastack",
    gh: "virastack/start",
    tag: (v) => `v${v}`,
  },
  mask: {
    repo: "form",
    pkg: "form/packages/mask",
    npm: "@virastack/mask",
    gh: "virastack/form",
    tag: (v) => `mask@${v}`,
  },
  password: {
    repo: "form",
    pkg: "form/packages/password",
    npm: "@virastack/password",
    gh: "virastack/form",
    tag: (v) => `password@${v}`,
  },
  address: {
    repo: "form",
    pkg: "form/packages/address",
    npm: "@virastack/address",
    gh: "virastack/form",
    tag: (v) => `address@${v}`,
  },
};

// ---------- helpers ----------

function run(cmd, cmdArgs, cwd = ROOT) {
  try {
    return execFileSync(cmd, cmdArgs, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
}
const git = (cmdArgs, cwd = repoDir) => run("git", cmdArgs, cwd);

function parseSemver(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(v ?? "");
  return m ? { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null } : null;
}
function compareSemver(a, b) {
  const x = parseSemver(a);
  const y = parseSemver(b);
  for (const k of ["major", "minor", "patch"]) if (x[k] !== y[k]) return x[k] - y[k];
  if (x.pre === y.pre) return 0;
  if (!x.pre) return 1;
  if (!y.pre) return -1;
  return x.pre.localeCompare(y.pre, "en", { numeric: true });
}

let ghAuthed = null;
async function githubApi(path) {
  if (ghAuthed === null) ghAuthed = run("gh", ["auth", "status"]) !== null;
  if (ghAuthed) {
    const out = run("gh", ["api", path]);
    if (out !== null) return { ok: true, data: JSON.parse(out) };
  }
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  try {
    const res = await fetch(`https://api.github.com/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.status === 404) return { ok: true, data: null };
    if (!res.ok)
      return {
        ok: false,
        reason:
          res.status === 403 || res.status === 429
            ? "GitHub API limiti doldu (`gh auth login` yap)"
            : `GitHub API ${res.status}`,
      };
    return { ok: true, data: await res.json() };
  } catch (e) {
    return { ok: false, reason: `GitHub API'ye ulaşılamadı (${e.message})` };
  }
}

/** Turns a finished workflow run into a status, telling a runner outage apart from a real failure. */
async function describeRun(repo, r, label) {
  if (r.conclusion === "success")
    return { status: "ok", detail: `success (${r.head_sha.slice(0, 7)}): ${r.html_url}` };
  const jobs = await githubApi(`repos/${repo}/actions/runs/${r.id}/jobs?per_page=100`);
  const bad = jobs.ok
    ? (jobs.data?.jobs ?? []).filter(
        (j) => j.conclusion !== "success" && j.conclusion !== "skipped",
      )
    : [];
  const names = bad.map((j) => j.name).join(", ");
  const rerun = `\`gh run rerun ${r.id} --failed --repo ${repo}\``;
  // A job that never got a runner has no steps and no runner name: GitHub's capacity, not the code.
  if (bad.length && bad.every((j) => !j.steps?.length && !j.runner_name)) {
    return {
      status: "warn",
      detail: `${label}: kodda hata yok; runner bulunamadığı için düşen iş(ler): ${names}. Yeniden çalıştır: ${rerun}. ${r.html_url}`,
    };
  }
  return {
    status: "fail",
    detail: `${r.conclusion}${names ? `, düşen iş(ler): ${names}` : ""} (${r.head_sha.slice(0, 7)}): ${r.html_url}`,
  };
}

async function httpStatus(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return res.status;
  } catch {
    return null;
  }
}

const results = [];
const add = (group, title, status, detail) => results.push({ group, title, status, detail });
const ICON = { ok: "✅", warn: "⚠️", fail: "❌", pending: "⏳", unknown: "❓" };
const countStatuses = (list) =>
  Object.fromEntries(Object.keys(ICON).map((k) => [k, list.filter((r) => r.status === k).length]));

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const [productId, versionArg] = args.filter((a) => !a.startsWith("--"));

if (!productId) {
  await checkEverything();
}

const product = PRODUCTS[productId];
if (!product) {
  console.error(`Usage: node check.mjs [${Object.keys(PRODUCTS).join("|")}] [version] [--json]`);
  process.exit(2);
}

const repoDir = join(ROOT, product.repo);
const pkgDir = join(ROOT, product.pkg);
const pkgPath =
  product.pkg === product.repo
    ? "package.json"
    : `${product.pkg.slice(product.repo.length + 1)}/package.json`;
const pkgJson = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
const version = versionArg ?? pkgJson.version;
const tag = product.tag(version);

// ---------- facts ----------

const parsed = parseSemver(version);
const isPre = Boolean(parsed?.pre);
const npmVersionsRaw = run("npm", ["view", product.npm, "versions", "--json"], ROOT);
const npmTagsRaw = run("npm", ["view", product.npm, "dist-tags", "--json"], ROOT);
const npmReachable = npmVersionsRaw !== null && npmTagsRaw !== null;
const npmVersions = npmReachable ? [].concat(JSON.parse(npmVersionsRaw)) : [];
const distTags = npmReachable ? JSON.parse(npmTagsRaw) : {};
const published = npmVersions.includes(version);
const previous = npmVersions
  .filter((v) => parseSemver(v) && compareSemver(v, version) < 0 && !parseSemver(v).pre)
  .sort(compareSemver)
  .at(-1);

// Checking an older, already published version: the repo has moved on, which is expected.
const pastRelease =
  published && parseSemver(pkgJson.version) && compareSemver(pkgJson.version, version) > 0;

// In the all-products run the parent fetches each repository once, so children do not race on the same one.
if (!args.includes("--no-fetch")) {
  git(["fetch", "--quiet", "--tags", "origin"]);
  git(["fetch", "--quiet", "origin"], SITE);
}

// ---------- 1. Hazırlık ----------

const G1 = "Hazırlık";

if (!parsed) {
  add(G1, "Sürüm geçerli semver mi?", "fail", `\`${version}\` semver değil.`);
} else if (!npmReachable) {
  add(G1, "Sürüm doğru atlatıldı mı?", "unknown", "npm'e ulaşılamadı.");
} else if (published) {
  add(
    G1,
    "Sürüm doğru atlatıldı mı?",
    "ok",
    `${version} npm'de zaten var (önceki: ${previous ?? "yok"}).`,
  );
} else {
  const latest = distTags.latest;
  if (latest && compareSemver(version, latest) <= 0) {
    add(
      G1,
      "Sürüm doğru atlatıldı mı?",
      "fail",
      `${version}, npm latest ${latest} sürümünden büyük değil.`,
    );
  } else if (latest) {
    const l = parseSemver(latest);
    const expected = {
      major: `${l.major + 1}.0.0`,
      minor: `${l.major}.${l.minor + 1}.0`,
      patch: `${l.major}.${l.minor}.${l.patch + 1}`,
    };
    const base = `${parsed.major}.${parsed.minor}.${parsed.patch}`;
    const kind = Object.keys(expected).find((k) => expected[k] === base);
    if (kind) add(G1, "Sürüm doğru atlatıldı mı?", "ok", `${latest} → ${version} (${kind}).`);
    else
      add(
        G1,
        "Sürüm doğru atlatıldı mı?",
        "warn",
        `${latest} → ${version} bir sürüm atlıyor; beklenen ${Object.values(expected).join(", ")}.`,
      );
  } else {
    add(G1, "Sürüm doğru atlatıldı mı?", "ok", `${version}, npm'deki ilk sürüm.`);
  }
}

if (pastRelease) {
  add(
    G1,
    "package.json sürümü tutuyor mu?",
    "ok",
    `Eski sürüm kontrol ediliyor; package.json şu an ${pkgJson.version}.`,
  );
} else if (pkgJson.version !== version) {
  add(
    G1,
    "package.json sürümü tutuyor mu?",
    "fail",
    `package.json ${pkgJson.version}, kontrol edilen ${version}.`,
  );
} else {
  const lock = join(pkgDir, "package-lock.json");
  if (existsSync(lock)) {
    const l = JSON.parse(readFileSync(lock, "utf8"));
    const lv = l.packages?.[""]?.version ?? l.version;
    add(
      G1,
      "package.json ve lockfile tutuyor mu?",
      lv === version ? "ok" : "fail",
      lv === version
        ? `İkisi de ${version}.`
        : `package-lock.json ${lv}; \`npm install\` çalıştır.`,
    );
  } else {
    add(G1, "package.json sürümü tutuyor mu?", "ok", `package.json ${version}.`);
  }
}

let changelogDate = null;
const changelogPath = join(pkgDir, "CHANGELOG.md");
if (!existsSync(changelogPath)) {
  add(G1, "CHANGELOG yazıldı mı?", "fail", "CHANGELOG.md yok.");
} else {
  const text = readFileSync(changelogPath, "utf8");
  const headings = [...text.matchAll(/^## (.+)$/gm)];
  const esc = version.replace(/[.+]/g, "\\$&");
  const idx = headings.findIndex((h) => new RegExp(`(^|[\\[v ])${esc}(\\]|\\s|$)`).test(h[1]));
  if (idx === -1) {
    add(G1, "CHANGELOG yazıldı mı?", "fail", `\`## ${version}\` başlığı yok.`);
  } else {
    const h = headings[idx];
    const body = text.slice(h.index + h[0].length, headings[idx + 1]?.index ?? text.length).trim();
    changelogDate = /(\d{4}-\d{2}-\d{2})/.exec(h[1])?.[1] ?? null;
    if (!body) add(G1, "CHANGELOG yazıldı mı?", "fail", `\`${h[1]}\` başlığının altı boş.`);
    else if (idx !== 0 && !pastRelease)
      add(G1, "CHANGELOG yazıldı mı?", "warn", `\`${h[1]}\` var ama en üstteki başlık değil.`);
    else
      add(
        G1,
        "CHANGELOG yazıldı mı?",
        "ok",
        `\`## ${h[1]}\` ${idx === 0 ? "en üstte" : "var"}, içerik dolu.`,
      );
  }
}

// Site release note: working tree and origin/main.
const notePattern = new RegExp(
  `\\{\\s*id:\\s*"${productId}",\\s*version:\\s*"${version.replace(/[.+]/g, "\\$&")}"\\s*\\}`,
);
function findNote(source) {
  if (!source) return null;
  const m = notePattern.exec(source);
  if (!m) return null;
  const start = source.lastIndexOf("\n  {\n", m.index);
  const end = source.indexOf("\n  },", m.index);
  const entry = source.slice(start, end);
  return {
    draft: /\bdraft:\s*true/.test(entry),
    date: /\bdate:\s*"([\d-]+)"/.exec(entry)?.[1] ?? null,
    hasCommits: /\bcommits:\s*\[/.test(entry),
  };
}
const siteBranch = git(["branch", "--show-current"], SITE);
const localNote = findNote(
  existsSync(join(SITE, RELEASES_FILE)) ? readFileSync(join(SITE, RELEASES_FILE), "utf8") : null,
);
const mainNote = findNote(git(["show", `origin/main:${RELEASES_FILE}`], SITE));
const siteNoteLines = [];
// Patch versions are small fixes: they go to the CHANGELOG only, never to the releases page.
const isPatch = Boolean(parsed && !isPre && parsed.patch > 0);
if (isPatch) {
  add(
    G1,
    "Sitede sürüm notu var mı?",
    localNote || mainNote ? "warn" : "ok",
    localNote || mainNote
      ? `Patch sürüm (${version}) için releases.ts'te not var; patch'ler yalnızca CHANGELOG'a girer, notu kaldır.`
      : `Patch sürüm (${version}); site notu yazılmaz, CHANGELOG yeterli.`,
  );
} else if (!localNote && !mainNote) {
  add(
    G1,
    "Sitede sürüm notu var mı?",
    "fail",
    `releases.ts içinde \`{ id: "${productId}", version: "${version}" }\` yok (site branch'i: ${siteBranch}). \`release-notes\` skill'i ile yaz.`,
  );
} else {
  const note = mainNote ?? localNote;
  if (note.draft) siteNoteLines.push("`draft: true` hâlâ duruyor");
  if (changelogDate && note.date !== changelogDate)
    siteNoteLines.push(`tarih ${note.date}, CHANGELOG ${changelogDate}`);
  if (!note.hasCommits) siteNoteLines.push("`commits` alanı boş");
  const where = mainNote
    ? "site origin/main'de"
    : `yalnızca \`${siteBranch}\` branch'inde, site main'e henüz girmedi`;
  const status =
    note.draft || (changelogDate && note.date !== changelogDate)
      ? "fail"
      : !mainNote || !note.hasCommits
        ? "warn"
        : "ok";
  add(
    G1,
    "Sitede sürüm notu var mı?",
    status,
    `Not ${where}${siteNoteLines.length ? `; ${siteNoteLines.join(", ")}` : ""}.`,
  );
}

// ---------- 2. Git ve CI ----------

const G2 = "Git ve CI";

const branch = git(["branch", "--show-current"]);
const dirty = (git(["status", "--porcelain"]) ?? "").split("\n").filter(Boolean);
const head = git(["rev-parse", "HEAD"]);
const originMain = git(["rev-parse", "origin/main"]);
const mainPkgVersion = (() => {
  const raw = git(["show", `origin/main:${pkgPath}`]);
  return raw ? JSON.parse(raw).version : null;
})();

if (dirty.length)
  add(
    G2,
    "Çalışma ağacı temiz mi?",
    "warn",
    `${product.repo}/ içinde ${dirty.length} commit'lenmemiş dosya var.`,
  );
else add(G2, "Çalışma ağacı temiz mi?", "ok", `${product.repo}/ temiz.`);

if (pastRelease) {
  add(G2, "Sürüm main'e push edildi mi?", "ok", `Eski sürüm; origin/main şu an ${mainPkgVersion}.`);
} else if (mainPkgVersion === version) {
  const sync =
    branch === "main" && head === originMain
      ? "local main de origin ile aynı"
      : `local: \`${branch}\` @ ${head?.slice(0, 7)}`;
  add(
    G2,
    "Sürüm main'e push edildi mi?",
    "ok",
    `origin/main'de package.json ${version} (${sync}).`,
  );
} else {
  add(
    G2,
    "Sürüm main'e push edildi mi?",
    published ? "fail" : "pending",
    `origin/main'de package.json ${mainPkgVersion ?? "okunamadı"}; local branch \`${branch}\`.`,
  );
}

if (originMain) {
  const ci = await githubApi(
    `repos/${product.gh}/actions/workflows/ci.yml/runs?branch=main&per_page=10`,
  );
  if (!ci.ok) add(G2, "Main'de CI yeşil mi?", "unknown", ci.reason);
  else {
    const runForHead = ci.data?.workflow_runs?.find((r) => r.head_sha === originMain);
    if (!runForHead)
      add(
        G2,
        "Main'de CI yeşil mi?",
        "unknown",
        `origin/main (${originMain.slice(0, 7)}) için CI çalışması bulunamadı.`,
      );
    else if (runForHead.status !== "completed")
      add(G2, "Main'de CI yeşil mi?", "pending", `CI hâlâ çalışıyor: ${runForHead.html_url}`);
    else {
      const d = await describeRun(product.gh, runForHead, "CI");
      add(G2, "Main'de CI yeşil mi?", d.status, d.detail);
    }
  }
}

const remoteTagLines = (
  git(["ls-remote", "--tags", "origin", `refs/tags/${tag}`, `refs/tags/${tag}^{}`]) ?? ""
)
  .split("\n")
  .filter(Boolean);
const remoteTagSha = (remoteTagLines.find((l) => l.endsWith("^{}")) ?? remoteTagLines[0])?.split(
  "\t",
)[0];
const localTagSha = git(["rev-parse", `${tag}^{commit}`]);
let tagPushed = false;
if (!remoteTagSha) {
  if (localTagSha)
    add(
      G2,
      "Tag doğru atıldı mı?",
      "fail",
      `\`${tag}\` local'de var ama push edilmemiş: \`git push origin ${tag}\`.`,
    );
  else if (published)
    add(
      G2,
      "Tag doğru atıldı mı?",
      "warn",
      `${version} npm'de var ama \`${tag}\` tag'i yok; elle publish edilmiş olabilir.`,
    );
  else add(G2, "Tag doğru atıldı mı?", "pending", `\`${tag}\` henüz yok.`);
} else {
  tagPushed = true;
  const problems = [];
  if (localTagSha && localTagSha !== remoteTagSha)
    problems.push("local ve remote tag farklı commit'te");
  const raw = git(["show", `${remoteTagSha}:${pkgPath}`]);
  const tagVersion = raw ? JSON.parse(raw).version : null;
  if (tagVersion !== version) problems.push(`tag'in commit'inde package.json ${tagVersion}`);
  if (git(["merge-base", "--is-ancestor", remoteTagSha, "origin/main"]) === null)
    problems.push("tag'in commit'i origin/main üzerinde değil");
  add(
    G2,
    "Tag doğru atıldı mı?",
    problems.length ? "fail" : "ok",
    problems.length
      ? `\`${tag}\`: ${problems.join(", ")}.`
      : `\`${tag}\` → ${remoteTagSha.slice(0, 7)}, main üzerinde, package.json ${version}.`,
  );
}

// ---------- 3. Yayın ----------

const G3 = "Yayın";

if (!tagPushed) {
  add(
    G3,
    "Release workflow geçti mi?",
    published ? "warn" : "pending",
    published ? "Tag olmadığı için workflow çalışmamış." : "Tag push edilince çalışır.",
  );
} else {
  const rel = await githubApi(
    `repos/${product.gh}/actions/workflows/release.yml/runs?branch=${encodeURIComponent(tag)}&per_page=5`,
  );
  if (!rel.ok) add(G3, "Release workflow geçti mi?", "unknown", rel.reason);
  else {
    const r = rel.data?.workflow_runs?.[0];
    if (!r)
      add(
        G3,
        "Release workflow geçti mi?",
        "unknown",
        `\`${tag}\` için Release çalışması bulunamadı.`,
      );
    else if (r.status !== "completed")
      add(G3, "Release workflow geçti mi?", "pending", `Hâlâ çalışıyor: ${r.html_url}`);
    else {
      const d = await describeRun(product.gh, r, "Release");
      add(G3, "Release workflow geçti mi?", d.status, d.detail);
    }
  }
}

if (!npmReachable) add(G3, "npm'e doğru sürüm gitti mi?", "unknown", "npm'e ulaşılamadı.");
else if (published)
  add(G3, "npm'e doğru sürüm gitti mi?", "ok", `${product.npm}@${version} yayında.`);
else
  add(
    G3,
    "npm'e doğru sürüm gitti mi?",
    tagPushed ? "fail" : "pending",
    `${product.npm}@${version} npm'de yok.`,
  );

if (npmReachable) {
  const tagsText = Object.entries(distTags)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
  const releaseYml = readFileSync(join(repoDir, ".github/workflows/release.yml"), "utf8");
  if (isPre && !/--tag next/.test(releaseYml)) {
    add(
      G3,
      "dist-tag'ler doğru mu?",
      "fail",
      `${version} prerelease ama ${product.repo} release.yml \`--tag next\` kullanmıyor; publish latest'e gider.`,
    );
  } else if (!published) {
    add(G3, "dist-tag'ler doğru mu?", "pending", `Şu an: ${tagsText}.`);
  } else {
    const want = isPre ? "next" : "latest";
    const problems = [];
    if (distTags[want] !== version)
      problems.push(`${want} ${distTags[want] ?? "yok"}, beklenen ${version}`);
    if (isPre && distTags.latest === version) problems.push("prerelease latest'e gitmiş");
    if (!isPre && distTags.next && compareSemver(distTags.next, version) < 0)
      problems.push(
        `next eski sürümde kaldı (${distTags.next}); \`npm dist-tag rm ${product.npm} next\` ya da güncelle`,
      );
    add(
      G3,
      "dist-tag'ler doğru mu?",
      problems.length ? (distTags[want] === version ? "warn" : "fail") : "ok",
      problems.length ? `${problems.join("; ")}. Şu an: ${tagsText}.` : `${tagsText}.`,
    );
  }
}

if (!tagPushed) {
  add(
    G3,
    "GitHub Release oluştu mu?",
    published ? "warn" : "pending",
    published ? "Tag olmadığı için GitHub Release yok." : "Release workflow oluşturur.",
  );
} else {
  const gr = await githubApi(`repos/${product.gh}/releases/tags/${encodeURIComponent(tag)}`);
  if (!gr.ok) add(G3, "GitHub Release oluştu mu?", "unknown", gr.reason);
  else if (!gr.data)
    add(G3, "GitHub Release oluştu mu?", "fail", `\`${tag}\` için GitHub Release yok.`);
  else if (gr.data.prerelease !== isPre)
    add(
      G3,
      "GitHub Release oluştu mu?",
      "warn",
      `Release var ama prerelease işareti ${gr.data.prerelease}: ${gr.data.html_url}`,
    );
  else add(G3, "GitHub Release oluştu mu?", "ok", gr.data.html_url);
}

// ---------- 4. Site ve sonrası ----------

const G4 = "Site ve sonrası";

const pageUrl = `${SITE_URL}/releases/${productId}/v${version}`;
const pageStatus = isPatch ? null : await httpStatus(pageUrl);
if (isPatch)
  add(G4, "Sürüm notu sitede yayında mı?", "ok", "Patch sürüm; sürüm notu sayfası olmaz.");
else if (pageStatus === 200) add(G4, "Sürüm notu sitede yayında mı?", "ok", `${pageUrl} → 200.`);
else if (pageStatus === null)
  add(G4, "Sürüm notu sitede yayında mı?", "unknown", `${pageUrl} açılamadı.`);
else
  add(
    G4,
    "Sürüm notu sitede yayında mı?",
    published ? "fail" : "pending",
    `${pageUrl} → ${pageStatus}.`,
  );

const sitePkgRaw = git(["show", "origin/main:package.json"], SITE);
const siteDeps = sitePkgRaw
  ? { ...JSON.parse(sitePkgRaw).dependencies, ...JSON.parse(sitePkgRaw).devDependencies }
  : {};
if (product.npm in siteDeps && !isPre) {
  const pinned = siteDeps[product.npm].replace(/^[\^~]/, "");
  if (pinned === version)
    add(G4, "Site yeni sürüme geçti mi?", "ok", `Site main'de ${product.npm} ${pinned}.`);
  else
    add(
      G4,
      "Site yeni sürüme geçti mi?",
      published ? "warn" : "pending",
      `Site main'de ${product.npm} ${siteDeps[product.npm]}; ${published ? "yükselt" : "npm'e çıkınca yükseltilecek"} (${version}).`,
    );
}

const registryScript = join(ROOT, "start/scripts/build-registry.js");
if (existsSync(registryScript) && !isPre) {
  const ranges = [
    ...readFileSync(registryScript, "utf8").matchAll(
      new RegExp(`"${product.npm.replace("/", "\\/")}":\\s*"\\^?([\\d.]+)"`, "g"),
    ),
  ].map((m) => m[1]);
  if (ranges.length) {
    const old = ranges.filter((r) => parseSemver(r)?.major !== parsed.major);
    if (old.length)
      add(
        G4,
        "Start registry aralıkları uyuyor mu?",
        "warn",
        `start/scripts/build-registry.js ${product.npm} için ^${old.join(", ^")} istiyor; ${version} bu aralıkta değil.`,
      );
    else
      add(
        G4,
        "Start registry aralıkları uyuyor mu?",
        "ok",
        `^${ranges.join(", ^")}, ${version} sürümünü kapsıyor.`,
      );
  }
}

const roadmapPath = join(ROOT, "ROADMAP.md");
if (existsSync(roadmapPath)) {
  const roadmap = readFileSync(roadmapPath, "utf8");
  const heading = roadmap
    .split("\n")
    .find((l) => l.startsWith("## ") && l.includes(`\`${product.npm}\``));
  const current = /güncel ([\d.]+[-\w.]*)/.exec(heading ?? "")?.[1];
  const stillWaiting = roadmap
    .split("\n")
    .some(
      (l) =>
        l.includes(version) &&
        /yayın bekliyor|yayını/.test(l) &&
        (l.toLowerCase().includes(productId) || l.includes(product.npm)),
    );
  if (!heading) {
    // The product has no section in ROADMAP.md, so there is nothing to update.
  } else if (!published)
    add(
      G4,
      "ROADMAP güncellendi mi?",
      "pending",
      `Yayından sonra güncellenecek (başlıkta güncel ${current ?? "?"}).`,
    );
  else if (current === version && !stillWaiting)
    add(G4, "ROADMAP güncellendi mi?", "ok", `Başlık güncel ${version}.`);
  else
    add(
      G4,
      "ROADMAP güncellendi mi?",
      "warn",
      [
        current !== version && `başlık hâlâ güncel ${current ?? "?"}`,
        stillWaiting && `${version} hâlâ "yayın bekliyor"/Özet'te`,
      ]
        .filter(Boolean)
        .join("; ") + ".",
    );
}

// ---------- report ----------

const counts = countStatuses(results);
const stage = published
  ? "npm'de yayında"
  : tagPushed
    ? "tag atıldı, npm bekleniyor"
    : mainPkgVersion === version
      ? "main'de, tag bekleniyor"
      : "hazırlık";

if (asJson) {
  console.log(
    JSON.stringify(
      { product: productId, npm: product.npm, version, tag, stage, counts, results },
      null,
      2,
    ),
  );
} else {
  console.log(`# ${product.npm}@${version} (tag \`${tag}\`): ${stage}\n`);
  for (const group of [...new Set(results.map((r) => r.group))]) {
    console.log(`## ${group}`);
    for (const r of results.filter((x) => x.group === group))
      console.log(`- **${r.title}** ${ICON[r.status]} ${r.detail}`);
    console.log("");
  }
  console.log(
    `Toplam: ✅ ${counts.ok} · ⚠️ ${counts.warn} · ❌ ${counts.fail} · ⏳ ${counts.pending} · ❓ ${counts.unknown}`,
  );
}
process.exit(counts.fail ? 1 : 0);

// ---------- every product and the site ----------

function checkProductInChild(id) {
  return new Promise((done) => {
    execFile(
      process.execPath,
      [fileURLToPath(import.meta.url), id, "--json", "--no-fetch"],
      { cwd: ROOT, maxBuffer: 1 << 24 },
      (error, stdout) => {
        try {
          done(JSON.parse(stdout));
        } catch {
          done({
            product: id,
            npm: PRODUCTS[id].npm,
            version: "?",
            stage: "kontrol edilemedi",
            counts: { fail: 0, unknown: 1 },
            results: [
              {
                group: "-",
                title: "Kontrol çalıştı mı?",
                status: "unknown",
                detail: String(error?.message ?? "Çıktı okunamadı").split("\n")[0],
              },
            ],
          });
        }
      },
    );
  });
}

async function checkSite() {
  const list = [];
  const push = (title, status, detail) => list.push({ group: "Site", title, status, detail });
  const siteGit = (cmdArgs) => run("git", cmdArgs, SITE);

  siteGit(["fetch", "--quiet", "origin"]);
  const branch = siteGit(["branch", "--show-current"]);
  const dirty = (siteGit(["status", "--porcelain"]) ?? "").split("\n").filter(Boolean);
  push(
    "Çalışma ağacı temiz mi?",
    dirty.length ? "warn" : "ok",
    dirty.length
      ? `virastack.com/ içinde ${dirty.length} commit'lenmemiş dosya var (branch: \`${branch}\`).`
      : `Temiz (branch: \`${branch}\`).`,
  );

  const unmerged = (siteGit(["branch", "--list", "release/*", "--no-merged", "origin/main"]) ?? "")
    .split("\n")
    .map((b) => b.replace(/^[*+ ]+/, "").trim())
    .filter(Boolean);
  push(
    "Bekleyen release branch'leri",
    unmerged.length ? "pending" : "ok",
    unmerged.length
      ? `origin/main'e girmemiş: ${unmerged.map((b) => `\`${b}\``).join(", ")}.`
      : "Hepsi main'de.",
  );

  const originMain = siteGit(["rev-parse", "origin/main"]);
  const ci = await githubApi(
    "repos/virastack/virastack.com/actions/workflows/ci.yml/runs?branch=main&per_page=10",
  );
  if (!ci.ok) push("Main'de CI yeşil mi?", "unknown", ci.reason);
  else {
    const r = ci.data?.workflow_runs?.find((x) => x.head_sha === originMain);
    if (!r)
      push(
        "Main'de CI yeşil mi?",
        "unknown",
        `origin/main (${originMain?.slice(0, 7)}) için CI çalışması bulunamadı.`,
      );
    else if (r.status !== "completed")
      push("Main'de CI yeşil mi?", "pending", `Hâlâ çalışıyor: ${r.html_url}`);
    else {
      const d = await describeRun("virastack/virastack.com", r, "CI");
      push("Main'de CI yeşil mi?", d.status, d.detail);
    }
  }

  const pages = ["/", "/releases", "/sitemap.xml"];
  const statuses = await Promise.all(pages.map((p) => httpStatus(`${SITE_URL}${p}`)));
  const down = pages.filter((_, i) => statuses[i] !== 200);
  push(
    "Site ayakta mı?",
    down.length ? "fail" : "ok",
    down.length
      ? down.map((p) => `${p} → ${statuses[pages.indexOf(p)] ?? "yanıt yok"}`).join(", ")
      : `${pages.join(", ")} → 200.`,
  );

  const mainReleases = siteGit(["show", `origin/main:${RELEASES_FILE}`]) ?? "";
  const drafts = (mainReleases.match(/\bdraft:\s*true/g) ?? []).length;
  if (drafts)
    push(
      "Main'de taslak not var mı?",
      "warn",
      `releases.ts içinde ${drafts} tane \`draft: true\` not var; production'da görünmüyorlar.`,
    );

  const sitePkgRaw = siteGit(["show", "origin/main:package.json"]);
  if (sitePkgRaw) {
    const sitePkg = JSON.parse(sitePkgRaw);
    const deps = { ...sitePkg.dependencies, ...sitePkg.devDependencies };
    const behind = [];
    for (const { npm } of Object.values(PRODUCTS)) {
      if (!(npm in deps)) continue;
      const latest = run("npm", ["view", npm, "dist-tags.latest"]);
      const pinned = deps[npm].replace(/^[\^~]/, "");
      if (latest && pinned !== latest) behind.push(`${npm} ${pinned} → ${latest}`);
    }
    push(
      "Site paketleri npm latest'te mi?",
      behind.length ? "warn" : "ok",
      behind.length
        ? `Yükseltilecek: ${behind.join(", ")}.`
        : "Sitedeki ViraStack paketleri npm latest ile aynı.",
    );
  }
  return list;
}

async function checkEverything() {
  for (const repo of new Set(Object.values(PRODUCTS).map((p) => p.repo)))
    run("git", ["fetch", "--quiet", "--tags", "origin"], join(ROOT, repo));
  const [products, site] = await Promise.all([
    Promise.all(Object.keys(PRODUCTS).map(checkProductInChild)),
    checkSite(),
  ]);
  const all = [...products.flatMap((p) => p.results), ...site];
  const total = countStatuses(all);

  if (asJson) {
    console.log(JSON.stringify({ products, site, counts: total }, null, 2));
    process.exit(total.fail ? 1 : 0);
  }

  console.log("# ViraStack sürüm durumu\n");
  console.log("| Ürün | Sürüm | Aşama | ✅ | ⚠️ | ❌ | ⏳ | ❓ |");
  console.log("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const p of products) {
    const c = countStatuses(p.results);
    console.log(
      `| ${p.npm} | ${p.version} | ${p.stage} | ${c.ok} | ${c.warn} | ${c.fail} | ${c.pending} | ${c.unknown} |`,
    );
  }

  console.log("\n## Dikkat isteyenler\n");
  let any = false;
  for (const p of products) {
    const issues = p.results.filter((r) => ["fail", "warn", "unknown"].includes(r.status));
    if (!issues.length) continue;
    any = true;
    console.log(`### ${p.npm}@${p.version}`);
    for (const r of issues) console.log(`- **${r.title}** ${ICON[r.status]} ${r.detail}`);
    console.log("");
  }
  if (!any) console.log("Ürünlerde ❌, ⚠️ ya da ❓ yok.\n");

  console.log("## Site\n");
  for (const r of site) console.log(`- **${r.title}** ${ICON[r.status]} ${r.detail}`);
  console.log(
    `\nToplam: ✅ ${total.ok} · ⚠️ ${total.warn} · ❌ ${total.fail} · ⏳ ${total.pending} · ❓ ${total.unknown}`,
  );
  console.log("Bir ürünün bütün adımları için: node .claude/skills/release-check/check.mjs <ürün>");
  process.exit(total.fail ? 1 : 0);
}
