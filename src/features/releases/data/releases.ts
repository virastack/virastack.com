import type { EcosystemId, EcosystemLocale } from "@/config/ecosystem.config";

import type { AcademyBadgeKind } from "@/features/academy/constants/badge.constants";

export type ReleaseCopy = {
  title: string;
  /** One sentence shown on the closed card. */
  summary: string;
  whatChanged: string;
  why: string;
  migration?: string;
};

export type Release = {
  /** Stable anchor of the note (`/releases#id`); never change it once published. */
  id: string;
  /** ISO date of the release. */
  date: string;
  /** Drafts show up in development only, so placeholder notes never reach production. */
  draft?: boolean;
  /** One note can cover several products, since one decision often affects more than one. */
  products: readonly { id: EcosystemId; version: string }[];
  sources: readonly { title: string; url: string }[];
  /** Public commits behind the note, linked on its page. */
  commits?: readonly { repo: string; hash: string; title: string }[];
  /** One block per technology, labeled with its badge. */
  migrationCode?: readonly { kind: AcademyBadgeKind; code: string }[];
  copy: Record<EcosystemLocale, ReleaseCopy>;
};

const releases: readonly Release[] = [
  {
    id: "start-2-0-0",
    date: "2026-11-01",
    // Stays a draft until AI, Start and these docs go live together.
    draft: true,
    products: [{ id: "start", version: "2.0.0" }],
    sources: [
      {
        title: "Announcing TypeScript 7.0",
        url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/",
      },
      { title: "Version Support (ESLint)", url: "https://eslint.org/version-support" },
      { title: "pnpm 11", url: "https://github.com/pnpm/pnpm/releases/tag/v11.0.0" },
      { title: "pnpm 12", url: "https://github.com/pnpm/pnpm/releases/tag/v12.0.0" },
      {
        title: "2.x → 3.x (Mock Service Worker)",
        url: "https://mswjs.io/docs/migrations/2.x-to-3.x",
      },
      {
        title: "Project Structure (Bulletproof React)",
        url: "https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md",
      },
      {
        title: "Problem Details for HTTP APIs (RFC 9457)",
        url: "https://www.rfc-editor.org/rfc/rfc9457.html",
      },
      {
        title: "Query Retries (TanStack Query)",
        url: "https://tanstack.com/query/latest/docs/framework/react/guides/query-retries",
      },
      {
        title: "Installation (React Compiler)",
        url: "https://react.dev/learn/react-compiler/installation",
      },
      {
        title: "reactCompiler (Next.js)",
        url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler",
      },
      {
        title: "generateMetadata (Next.js)",
        url: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging",
      },
      {
        title: "Managing Multi-Regional and Multilingual Sites (Google)",
        url: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites",
      },
      {
        title: "Getting Started (shadcn/ui registry)",
        url: "https://ui.shadcn.com/docs/registry/getting-started",
      },
      { title: "Test Cards (iyzico)", url: "https://docs.iyzico.com/en/add-ons/test-cards" },
    ],
    copy: {
      tr: {
        title: "Yeni başlangıç sayfası, eklenip kaldırılabilen modüller ve güncel araçlar",
        summary:
          "Yeni projeler kısa bir başlangıç sayfasıyla kuruluyor, hazır modüller tek komutla eklenip kaldırılıyor; API katmanı ve araç sürümleri yenilendi, dört paket yöneticisi destekleniyor, Node aralığı yükseldi.",
        whatChanged: `- **Başlangıç sayfası:** Landing kalktı. Yerine sonraki adımları ve kullandığın stack'i sürümleriyle gösteren kısa bir sayfa geldi. Marka logosu font indirmeden inline SVG olarak çiziliyor.
- **\`virastack add <modül>\`:** \`users\`, \`checkout-address\` ve \`checkout-payment\` modüllerini \`virastack.com/r\` registry'sinden dört template'e de kurar. Yalnızca feature kurar, sayfa oluşturmaz: CLI import satırını yazar, modülün sayfası framework'üne ve sayfa yoluna göre prompt ve manuel adımlar verir. \`init\` modül kurmaz; başlangıç sayfası hazır modüllere yönlendirir. i18n'de çeviriler \`src/messages\` içine birleştirilir; çakışma varsa hiçbir dosya değişmez.
- **\`checkout-address\`:** Teslimat ve fatura adresi seçimi, popup'ta ekleme ve düzenleme. Form \`@virastack/address\` ve \`@virastack/mask\` kullanır.
- **\`checkout-payment\`:** Kayıtlı kart seçimi ve yeni kart formu. Kart numarası ve CVV network'e çıkmaz; POST yalnızca dummy token, marka, son dört hane, son kullanma tarihi ve adı taşır.
- **\`virastack remove <modül>\`:** Modülün dosyalarını, boş kalan klasörlerini ve çevirilerini siler, paketleri bırakır. Değiştirdiğin dosyalar varsa silmeden önce sorar.
- **API katmanı:** \`api.ts\` içinde \`api.get(path, { schema })\` yanıtı doğrular ve tipi çıkarır. \`ApiError.kind\` hatayı \`http\`, \`network\`, \`timeout\` ve \`parse\` olarak ayırır. \`createApi({ baseUrl, getHeaders })\` ile auth başlıkları yalnızca kendi API'ne gider. Varsayılan zaman aşımı 10 saniye.
- **[React](badge:react) Compiler:** [Next.js](badge:nextjs) ve [TanStack Start](badge:tanstack-start) template'lerinin ikisinde de açık. [Next.js](badge:nextjs) tarafında artık yalnızca production'da değil.
- **Araçlar:** [ESLint](badge:eslint) 10, MSW 3, [Vitest](badge:vitest) 5 ve [pnpm](badge:pnpm) 12. \`tsc\` [TypeScript](badge:typescript) 7 ile, \`typescript-eslint\` ve \`next build\` [TypeScript](badge:typescript) 6 ile çalışır.
- **[Prettier](badge:prettier):** Varsayılanlar \`semi: false\` ve \`trailingComma: "none"\`. Dört template'te aynı \`.prettierrc\` var.
- **SEO:** Başlangıç sayfasında canonical var, \`APP_URL\` yoksa production'da uyarı çıkar, kökteki sabit \`og:url\` kalktı. [Next.js](badge:nextjs) \`X-Powered-By\` başlığını göndermez.
- **Paket yöneticileri:** [npm](badge:npm), Yarn, bun ve [pnpm](badge:pnpm) destekleniyor. \`init\`, \`ci.yml\` ve husky hook'larını seçtiğin paket yöneticisine göre yazar, gereken ayar dosyasını ekler.
- **i18n:** Varsayılan dil \`/\` adresinde, diğer dil \`/tr\` altında. Dili yalnızca URL belirler, otomatik yönlendirme yok; \`hreflang\` etiketleri geliyor.
- **shadcn:** Dört template'e \`components.json\` eklendi, \`shadcn add\` kurulu projede hazır çalışır.
- **Layout shift:** [TanStack Start](badge:tanstack-start) template'lerinde Inter için metriği eşlenmiş fallback ve preload var.`,
        why: `- **Landing:** Kullanıcının ilk silmek zorunda kaldığı bir pazarlama sayfasıydı ve bir sonraki adımı göstermiyordu.
- **Modüller registry'de:** Template yalın kalıyor, modül istenince ekleniyor ve kaldırılıyor. Yeni modül için CLI sürümü gerekmiyor.
- **Sayfa kurulmaması:** Hangi sayfaya gireceğine sen karar veriyorsun; iki modül aynı sayfada çakışmıyor, \`/checkout\` gibi bir sayfayı kendin birleştiriyorsun.
- **API:** Aynı [Zod](badge:zod) kalıbı tekrar ediyordu, auth yalnızca yorum satırındaydı, retry hem \`api.ts\` hem [TanStack Query](badge:tanstack-query) içinde olunca çağrı sayısı katlanıyordu.
- **Araçlar:** [ESLint](badge:eslint) 9 artık desteklenmiyor. 1.2.0 template'leri [pnpm](badge:pnpm) 11 ve 12'de kurulumda \`ERR_PNPM_IGNORED_BUILDS\` basıyordu. [TypeScript](badge:typescript) 7.0'da API yok, bu yüzden Microsoft'un önerdiği alias ile iki sürüm birlikte çalışıyor; \`tsc\` ölçümümüzde [Next.js](badge:nextjs) için 2,6 sn'den 0,51 sn'ye, [TanStack Start](badge:tanstack-start) için 2,3 sn'den 0,37 sn'ye indi.
- **Node:** Node 20 desteği bitti. \`jsdom\` gibi bağımlılıklar da daha yüksek sürüm istiyor; Yarn 1 kurulumu bu yüzden düşüyordu.
- **Paket yöneticileri:** Yalnızca [pnpm](badge:pnpm) yazan CI, diğer yöneticilerde düşüyordu. [shadcn](badge:shadcn) \`pnpm-workspace.yaml\` dosyasını görüp [npm](badge:npm) projesinde [pnpm](badge:pnpm) çalıştırıyordu, Yarn 4'te Plug'n'Play build ve lint'i bozuyordu.
- **Tek yapı:** [ViraStack](badge:virastack) AI kuralları barrel'sız yapıyı ve tek alias'ı anlatıyor; template bununla çelişmemeli. Tek yönlü import, feature silindiğinde paylaşılan kodun bozulmamasını sağlıyor.
- **SEO:** Sayfadaki \`openGraph\` kök ayarı tamamen ezdiği için sayfa bazında \`url\` senin kararın. Template'teki \`llms.txt\` ise kullanıcının sitesinde ViraStack'i anlatıyordu.
- **i18n:** [Google](badge:google) dile göre otomatik yönlendirmemeyi öneriyor.
- **Layout shift:** Inter, [TanStack Start](badge:tanstack-start) template'inde CLS 0,207'ye yol açıyordu; üç ölçümde de 0,000 oldu.
- **Sınırlar:** Windows denenmedi. Üretilen \`ci.yml\` GitHub Actions'ta çalıştırılmadı. \`api.ts\` gerçek bir üretim API'si ve auth ile denenmedi. Modüller yalnızca dummy API ve dummy veriyle çalışır; gerçek API'yi bağlamak sana kalır.`,
        migration: `**Bu sürüm mevcut projeleri değiştirmez.** Aşağıdakiler 2.0.0 ile kurulan yeni projeler için geçerli; 1.x projeni taşımak istersen bunları elle uygulaman gerekir. \`virastack add users\` 2.0.0 projelerinde denendi, eski projelerde denenmedi.

**Kırılan değişiklikler:**

- **Node:** Template'ler \`^22.22.2 || ^24.15.0 || >=26.0.0\` istiyor. Önceki taban \`>=20.9.0\`.
- **Alias:** Yalnızca \`@/*\` var. \`@/ui\`, \`@/layout\`, \`@/hooks\`, \`@/schemas\` ve \`#/*\` kalktı.
- **Barrel:** Uygulama kodunda \`index.ts\` barrel'ları kalktı, import'lar tanımlandığı dosyaya gider.
- **Tek yönlü import:** Shared klasörler feature ve route, feature'lar route import ederse [ESLint](badge:eslint) hata verir.
- **Mesajlar:** i18n mesajları \`messages/\` yerine \`src/messages/\` altında. Paraglide ayarları \`baseLocale\`, \`locales\` ve \`{locale}\` kullanıyor.
- **\`api.ts\`:** \`retry\` seçeneği kalktı, retry \`makeQueryClient\` içinde. Şema vermezsen sonuç \`unknown\`. Yanıt gelmeyen hatalarda \`status\` \`null\`, ayrım \`kind\` ile yapılır.
- **Paketler:** \`clsx\` ve \`tailwind-merge\` yerine \`cn\` paketi var. \`motion\` kalktı. [TanStack Start](badge:tanstack-start) template'lerinde nuqs yerine \`validateSearch\` kullanılıyor.
- **MSW 3:** \`onUnhandledRequest\` yerine \`onUnhandledFrame\`, import'lar \`msw/http\` üzerinden.
- **[pnpm](badge:pnpm):** \`package.json\` içindeki \`pnpm\` alanı kalktı, ayarlar \`pnpm-workspace.yaml\` ve \`allowBuilds\` ile yazılıyor.
- **Kalkan dosyalar:** \`public/llms.txt\`, \`.changeset\` ve i18n'siz [Next.js](badge:nextjs) template'inde \`proxy.ts\`.`,
      },
      en: {
        title: "New start page, modules you can add and remove, and current tooling",
        summary:
          "New projects come with a short start page, and ready modules go in and out with one command; the API layer and tool versions were refreshed, four package managers are supported, and the Node range went up.",
        whatChanged: `- **Start page:** The landing page is gone. A short page now shows the next steps and your stack with its versions. The brand logo is an inline SVG, so no font is downloaded.
- **\`virastack add <module>\`:** Installs \`users\`, \`checkout-address\` and \`checkout-payment\` from the \`virastack.com/r\` registry in all four templates. It installs only the feature and creates no page: the CLI prints the import line, and the module's page gives a prompt and manual steps for your framework and page path. \`init\` installs no module; the start page points to the ready modules. With i18n, translations are merged into \`src/messages\`; if anything conflicts, no file changes.
- **\`checkout-address\`:** Choose shipping and billing addresses, and add or edit them in a popup. The form uses \`@virastack/address\` and \`@virastack/mask\`.
- **\`checkout-payment\`:** Choose a saved card or add a new one. The card number and CVV stay off the network; the POST carries only a dummy token, the brand, the last four digits, the expiry and the name.
- **\`virastack remove <module>\`:** Deletes the module's files, the folders they leave empty and its translations, and keeps the packages. It asks first if you changed any of those files.
- **API layer:** In \`api.ts\`, \`api.get(path, { schema })\` validates the response and infers its type. \`ApiError.kind\` separates \`http\`, \`network\`, \`timeout\` and \`parse\` errors. With \`createApi({ baseUrl, getHeaders })\`, auth headers go only to your own API. The default timeout is 10 seconds.
- **[React](badge:react) Compiler:** On in both the [Next.js](badge:nextjs) and [TanStack Start](badge:tanstack-start) templates. On [Next.js](badge:nextjs) it is no longer production only.
- **Tools:** [ESLint](badge:eslint) 10, MSW 3, [Vitest](badge:vitest) 5 and [pnpm](badge:pnpm) 12. \`tsc\` runs on [TypeScript](badge:typescript) 7, while \`typescript-eslint\` and \`next build\` run on [TypeScript](badge:typescript) 6.
- **[Prettier](badge:prettier):** The defaults are \`semi: false\` and \`trailingComma: "none"\`. All four templates share the same \`.prettierrc\`.
- **SEO:** The start page has a canonical, a missing \`APP_URL\` warns in production, and the fixed root \`og:url\` is gone. [Next.js](badge:nextjs) no longer sends \`X-Powered-By\`.
- **Package managers:** [npm](badge:npm), Yarn, bun and [pnpm](badge:pnpm) are supported. \`init\` writes \`ci.yml\` and the husky hooks for the one you chose and adds the config file it needs.
- **i18n:** The default language lives at \`/\` and the other at \`/tr\`. Only the URL decides the language, with no automatic redirect, and \`hreflang\` tags are included.
- **shadcn:** All four templates now have \`components.json\`, so \`shadcn add\` works in a new project right away.
- **Layout shift:** [TanStack Start](badge:tanstack-start) templates use a metric-matched fallback and a preload for Inter.`,
        why: `- **Landing:** It was a marketing page you had to delete first, and it did not show the next step.
- **Modules in the registry:** The template stays small, and a module goes in and out when you want. A new module needs no CLI release.
- **No page from \`add\`:** You decide which page a module goes on, two modules do not collide on a page, and you compose a page like \`/checkout\` yourself.
- **API:** The same [Zod](badge:zod) pattern kept repeating, auth lived only in a comment, and retries in both \`api.ts\` and [TanStack Query](badge:tanstack-query) multiplied the calls.
- **Tools:** [ESLint](badge:eslint) 9 is no longer supported. The 1.2.0 templates printed \`ERR_PNPM_IGNORED_BUILDS\` during install on [pnpm](badge:pnpm) 11 and 12. [TypeScript](badge:typescript) 7.0 has no API, so both versions run side by side through the alias Microsoft recommends; in our measurement \`tsc\` went from 2.6 s to 0.51 s on [Next.js](badge:nextjs) and from 2.3 s to 0.37 s on [TanStack Start](badge:tanstack-start).
- **Node:** Node 20 support has ended. Dependencies such as \`jsdom\` also need a higher version, which is why installs failed on Yarn 1.
- **Package managers:** A CI file that only knew [pnpm](badge:pnpm) failed on the others. [shadcn](badge:shadcn) saw \`pnpm-workspace.yaml\` and ran [pnpm](badge:pnpm) in [npm](badge:npm) projects, and Plug'n'Play broke build and lint on Yarn 4.
- **One structure:** The [ViraStack](badge:virastack) AI rules describe a structure with no barrels and one alias, and the template must not contradict them. One-way imports keep shared code working when a feature is deleted.
- **SEO:** A page's \`openGraph\` replaces the root setting entirely, so a per-page \`url\` is your decision. The template's \`llms.txt\` described ViraStack on your own site.
- **i18n:** [Google](badge:google) advises against redirecting by language automatically.
- **Layout shift:** Inter caused CLS 0.207 in the [TanStack Start](badge:tanstack-start) template; it measured 0.000 in all three runs.
- **Limits:** Windows was not tried. The generated \`ci.yml\` was not run on GitHub Actions. \`api.ts\` was not tried against a real production API or real auth. Modules run only on a dummy API and dummy data; connecting your real API is your work.`,
        migration: `**This release does not change existing projects.** The items below apply to new projects created with 2.0.0; to move a 1.x project, apply them by hand. \`virastack add users\` was tried on 2.0.0 projects, not on older ones.

**Breaking changes:**

- **Node:** The templates require \`^22.22.2 || ^24.15.0 || >=26.0.0\`. The previous floor was \`>=20.9.0\`.
- **Alias:** Only \`@/*\` remains. \`@/ui\`, \`@/layout\`, \`@/hooks\`, \`@/schemas\` and \`#/*\` are gone.
- **Barrels:** \`index.ts\` barrels are gone from application code, and imports point at the defining file.
- **One-way imports:** [ESLint](badge:eslint) fails when shared folders import features or routes, or when features import routes.
- **Messages:** i18n messages moved from \`messages/\` to \`src/messages/\`. Paraglide settings use \`baseLocale\`, \`locales\` and \`{locale}\`.
- **\`api.ts\`:** The \`retry\` option is gone, and retries live in \`makeQueryClient\`. Without a schema the result is \`unknown\`. When no response arrives, \`status\` is \`null\`; use \`kind\` to tell errors apart.
- **Packages:** The \`cn\` package replaces \`clsx\` and \`tailwind-merge\`. \`motion\` is gone. [TanStack Start](badge:tanstack-start) templates use \`validateSearch\` instead of nuqs.
- **MSW 3:** \`onUnhandledFrame\` replaces \`onUnhandledRequest\`, and imports go through \`msw/http\`.
- **[pnpm](badge:pnpm):** The \`pnpm\` field in \`package.json\` is gone; settings live in \`pnpm-workspace.yaml\` with \`allowBuilds\`.
- **Removed files:** \`public/llms.txt\`, \`.changeset\` and, in the non-i18n [Next.js](badge:nextjs) template, \`proxy.ts\`.`,
      },
    },
  },
  {
    id: "start-1-2-0",
    date: "2026-10-31",
    products: [{ id: "start", version: "1.2.0" }],
    sources: [
      {
        title: "August 2026 Security Release (Next.js)",
        url: "https://nextjs.org/blog/august-2026-security-release",
      },
      {
        title: "Next.js Security Update for a Critical Upstream Issue (Next.js)",
        url: "https://nextjs.org/blog/nextjs-security-update-september-22-2026",
      },
      {
        title: "Next.js Security Update for Upstream Vulnerabilities (Next.js)",
        url: "https://nextjs.org/blog/nextjs-security-update-october-14-2026",
      },
      {
        title: "CSRF Middleware (TanStack Start)",
        url: "https://tanstack.com/start/latest/docs/framework/react/guide/middleware",
      },
    ],
    commits: [
      {
        repo: "virastack/start",
        hash: "670d487287bde687696fda5e32d69279ffc730fe",
        title: "Next.js and React security update",
      },
      {
        repo: "virastack/start",
        hash: "7e11e52420f1af7d113e7cc2296c3e2070064601",
        title: "TanStack Start CSRF protection",
      },
      {
        repo: "virastack/start",
        hash: "8109215682d3362f512905bfc1da975ef8d1bdd8",
        title: "@virastack/address option",
      },
    ],
    migrationCode: [
      {
        kind: "nextjs",
        code: `pnpm add next@16.4.3 react@19.3.1 react-dom@19.3.1
pnpm add -D eslint-config-next@16.4.3`,
      },
      {
        kind: "tanstack-start",
        code: `// src/start.ts
import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));`,
      },
    ],
    copy: {
      tr: {
        title: "Next.js ve TanStack Start için güvenlik güncellemesi, ViraStack Address desteği",
        summary:
          "Yeni Next.js projeleri yamalı Next.js 16.4 ile kuruluyor, TanStack Start projelerinde server function'lar CSRF'e karşı korunuyor; kurulumda ViraStack Address de seçilebiliyor.",
        whatChanged: `- Yeni [Next.js](badge:nextjs) projeleri artık \`16.2.11\` yerine [Next.js](badge:nextjs) \`~16.4.3\` ve [React](badge:react) \`^19.3.1\` ile kuruluyor; sürüm aralığı sayesinde 16.4 hattının patch sürümlerini kendiliğinden alıyor.
- Yeni [TanStack Start](badge:tanstack-start) projelerinde \`src/start.ts\` artık server function'ları \`createCsrfMiddleware\` ile koruyor, başka siteden gelen istekler \`403\` alıyor.
- CLI, kurulumdaki araç sorusunda \`@virastack/address\` paketini de sunuyor; \`--tools address\` ve \`add address\` ile de eklenebiliyor.`,
        why: `- [Next.js](badge:nextjs) 2026'da Image Optimization API ve \`next/og\` gibi alanlarda **kritik remote code execution** açıklarını yamaladı; \`16.2.11\` bu yamaların dışında kalıyor.
- [TanStack Start](badge:tanstack-start) CSRF korumasını otomatik kuruyor, ama proje *kendi* \`src/start.ts\` dosyasını tanımlarsa bunu yapmıyor. Şablonda bu dosya vardı, bu yüzden server function ekleyen projeler korumasız kalıyordu.
- \`@virastack/address\`, diğer ViraStack araçları gibi kurulumdan seçilebilsin diye eklendi.`,
        migration:
          "**Bu sürüm mevcut projeleri değiştirmez.** [Next.js](badge:nextjs) 16.2 veya 16.3 kullanan projeleri kendin yükselt. [TanStack Start](badge:tanstack-start) projende `src/start.ts` varsa middleware'i ekle ve `requestMiddleware` listendeki diğer middleware'leri koru.",
      },
      en: {
        title: "Security update for Next.js and TanStack Start, plus ViraStack Address support",
        summary:
          "New Next.js projects install patched Next.js 16.4, and server functions in TanStack Start projects are protected against CSRF; ViraStack Address can now be selected during setup.",
        whatChanged: `- New [Next.js](badge:nextjs) projects now install [Next.js](badge:nextjs) \`~16.4.3\` and [React](badge:react) \`^19.3.1\` instead of \`16.2.11\`, and the version range picks up patch releases on the 16.4 line automatically.
- In new [TanStack Start](badge:tanstack-start) projects, \`src/start.ts\` now protects server functions with \`createCsrfMiddleware\`, so cross-site requests get a \`403\`.
- The CLI also offers \`@virastack/address\` in its tools question, and you can add it with \`--tools address\` or \`add address\`.`,
        why: `- In 2026 [Next.js](badge:nextjs) patched **critical remote code execution** vulnerabilities in areas such as the Image Optimization API and \`next/og\`, and version \`16.2.11\` misses those patches.
- [TanStack Start](badge:tanstack-start) installs CSRF protection automatically, but not when a project defines *its own* \`src/start.ts\`. The template had that file, so projects that added server functions were left unprotected.
- \`@virastack/address\` was added so it can be selected during setup, like the other ViraStack tools.`,
        migration:
          "**This release does not change existing projects.** Upgrade projects on [Next.js](badge:nextjs) 16.2 or 16.3 yourself. If your [TanStack Start](badge:tanstack-start) project has `src/start.ts`, add the middleware and keep the other entries in your `requestMiddleware` list.",
      },
    },
  },
];

/** Newest first; drafts are left out of production builds. */
export function getReleases(): readonly Release[] {
  return releases
    .filter((release) => !release.draft || process.env.NODE_ENV !== "production")
    .toSorted((a, b) => b.date.localeCompare(a.date));
}

/** A note lives under its first product: `/releases/start/v1.2.0`. */
export function getReleaseParams(release: Release) {
  const product = release.products[0];

  return { product: product?.id ?? "", version: `v${product?.version ?? ""}` };
}

export function getReleaseHref(release: Release) {
  const { product, version } = getReleaseParams(release);

  return `/releases/${product}/${version}`;
}

export function findRelease(product: string, version: string) {
  return getReleases().find((release) => {
    const params = getReleaseParams(release);

    return params.product === product && params.version === version;
  });
}

/** Derived from semver, so the label can never disagree with the version. */
export function getReleaseType(version: string): "major" | "minor" | "patch" {
  const [, minor, patch] = version.split(".");
  if (minor === "0" && patch === "0") return "major";

  return patch === "0" ? "minor" : "patch";
}
