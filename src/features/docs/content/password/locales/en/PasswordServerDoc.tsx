import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";

const apiCode = `import { validatePassword } from "@virastack/password/server"

const result = validatePassword(formData.get("password"), policy, {
  forbidden: [formData.get("email")],
  confirm: formData.get("confirm"), // adds password.mismatch when it differs
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
        title="Server validation"
        description="Run the same policy in Server Actions and API routes with @virastack/password/server."
      />
      <DocsProse>
        <h2 id="giris">Server entry</h2>
        <p>
          The browser can be skipped, so the server decides. <code>validatePassword</code> uses the
          same engine as the form; the same input gives the same issues on both sides. Use it for
          sign-up, password reset and password change.
        </p>
        <DocsCodeBlock code={apiCode} lang="ts" />
        <p>
          Anything that isn&apos;t a string (a missing field, a File) counts as an empty password.
        </p>

        <h2 id="server-action">Server Action</h2>
        <PasswordExamplePreview id="server-action" />
        <DocsCodeBlock code={routeCode} lang="ts" />

        <h2 id="hash">What to hash</h2>
        <p>
          Hash <code>result.password</code>: it is NFKC-normalized, so the same password typed on
          another keyboard still verifies at login. Normalize the login input the same way with{" "}
          <code>normalizePassword</code>.
        </p>

        <h2 id="nextjs">SSR & Next.js</h2>
        <ul>
          <li>
            Only <code>@virastack/password</code> has <code>&quot;use client&quot;</code>. Server
            Components, Server Actions and route handlers import <code>/server</code> or{" "}
            <code>/strength</code>.
          </li>
          <li>
            Keep the policy in a shared file without <code>&quot;use client&quot;</code>.
          </li>
          <li>
            The hook renders the same markup on the server and the client (ids come from{" "}
            <code>useId</code>), so there is no hydration mismatch.
          </li>
          <li>
            Tested with <AcademyBadge kind="nextjs" /> in <code>next dev</code> and{" "}
            <code>next start</code>.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
