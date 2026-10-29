import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";

const apiCode = `import { validatePassword } from "@virastack/password/server"

const result = validatePassword(formData.get("password"), policy, {
  forbidden: [formData.get("email")],
  confirm: formData.get("confirm"), // farklıysa password.mismatch ekler
})
// result.valid, result.issues, result.score, result.password (NFKC)`;

const routeCode = `// app/api/password/route.ts
import { validatePassword } from "@virastack/password/server"
import { policy } from "@/lib/password-policy"

export async function POST(request: Request) {
  const { password, email } = await request.json()
  const result = validatePassword(password, policy, { forbidden: [email] })
  return Response.json({ valid: result.valid, issues: result.issues })
}`;

export function PasswordServerDoc() {
  return (
    <>
      <DocsPageHeader
        title="Sunucu doğrulaması"
        description="Aynı politikayı @virastack/password/server ile Server Action ve API route'larda çalıştırın."
      />
      <DocsProse>
        <h2 id="giris">Sunucu girişi</h2>
        <p>
          Tarayıcı atlanabilir; karar sunucudadır. <code>validatePassword</code>&#32;formla aynı
          motoru kullanır; aynı girdi iki tarafta aynı hataları verir. Kayıt, parola sıfırlama ve
          parola değiştirmede kullanın.
        </p>
        <DocsCodeBlock code={apiCode} lang="ts" />
        <p>String olmayan her şey (eksik alan, File) boş parola sayılır.</p>

        <h2 id="server-action">Server Action</h2>
        <PasswordExamplePreview id="server-action" />
        <DocsCodeBlock code={routeCode} lang="ts" />

        <h2 id="hash">Neyi hash&apos;lemeli</h2>
        <p>
          <code>result.password</code>&#32;değerini hash&apos;leyin: NFKC ile normalleştirilmiştir;
          başka klavyede yazılan aynı parola girişte de doğrulanır. Giriş formundaki parolayı da{" "}
          <code>normalizePassword</code>&#32;ile aynı şekilde normalleştirin.
        </p>

        <h2 id="nextjs">SSR ve Next.js</h2>
        <ul>
          <li>
            Yalnızca <code>@virastack/password</code> içinde <code>&quot;use client&quot;</code>{" "}
            vardır. Server Component, Server Action ve route handler&apos;lar <code>/server</code>{" "}
            veya <code>/strength</code>&#32;import eder.
          </li>
          <li>
            Politikayı <code>&quot;use client&quot;</code>&#32;içermeyen ortak bir dosyada tutun.
          </li>
          <li>
            Hook server&apos;da ve client&apos;ta aynı işaretlemeyi üretir (id&apos;ler{" "}
            <code>useId</code>
            &apos;den gelir); hydration uyuşmazlığı olmaz.
          </li>
          <li>
            <AcademyBadge kind="nextjs" /> ile <code>next dev</code> ve <code>next start</code>{" "}
            modlarında test edildi.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
