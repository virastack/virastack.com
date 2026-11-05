import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskTestingDemo } from "@/features/docs/components/MaskTestingDemo";

const entryCode = `import { generateIBAN, generateTCKN } from "@virastack/mask/testing"`;

const tcknCode = `generateTCKN()             // a new number on every call
generateTCKN({ seed: 1 })  // "49537717654" on every run

isValidTCKN(generateTCKN()) // true`;

const ibanCode = `generateIBAN()                        // Turkish IBAN at a random bank
generateIBAN("TR", { bank: "0062" })  // "TR51 0006 2…", Garanti
generateIBAN("DE", { seed: 1 })       // "DE70449725173128749365" on every run

getTurkishBank(generateIBAN("TR", { bank: "0062" })) // { code: "0062", name: "T. GARANTİ BANKASI A.Ş." }`;

const seedCode = `// prisma/seed.ts — no "use client", runs in Node
import { generateIBAN, generateTCKN } from "@virastack/mask/testing"

const customers = Array.from({ length: 50 }, (_, i) => ({
  name: \`Customer \${i + 1}\`,
  tckn: generateTCKN({ seed: i }),
  iban: generateIBAN("TR", { seed: i }),
}))
// the same 50 customers on every run, so snapshots and screenshots stay stable`;

const testCode = `import { generateTCKN } from "@virastack/mask/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

it("accepts a valid TCKN", async () => {
  render(<SignupForm />)
  await userEvent.type(screen.getByLabelText("TCKN"), generateTCKN({ seed: 7 }))
  await userEvent.click(screen.getByRole("button", { name: "Continue" }))
  expect(screen.queryByText("Invalid TCKN")).toBeNull()
})`;

export function MaskTestingDoc() {
  return (
    <>
      <DocsPageHeader
        title="Test data"
        description="Generate valid TCKNs and IBANs for tests and seed data with @virastack/mask/testing (2.3+)."
      />
      <DocsProse>
        <h2 id="giris">Testing entry</h2>
        <p>
          <strong>For tests and seed data only.</strong> A generated value fits the algorithm, so it
          can belong to a real person or match a real account. Never use one as real data.
        </p>
        <p>
          The generators live in their own entry, <code>@virastack/mask/testing</code>. The root and{" "}
          <code>/server</code> entries don&apos;t export them, so they never reach your production
          bundle. The entry has no React and no <code>&quot;use client&quot;</code>: it runs in seed
          scripts, test files and Server Components. It adds about 2 KB.
        </p>
        <DocsCodeBlock code={entryCode} lang="ts" />

        <h2 id="deneyin">Try it</h2>
        <p>
          Press a button to see a value. With a seed the value stays the same; change the seed to
          get another one.
        </p>
        <MaskTestingDemo />

        <h2 id="tckn">generateTCKN</h2>
        <p>
          Picks nine digits (the first one 1–9) and computes the 10th and 11th digits with the same
          rule as <code>isValidTCKN</code>. No list is kept; every number is made on the spot.
        </p>
        <DocsCodeBlock code={tcknCode} lang="ts" />

        <h2 id="iban">generateIBAN</h2>
        <p>
          Returns the IBAN without spaces, the way the <code>iban</code> preset stores it. The
          country defaults to <code>TR</code>.
        </p>
        <ul>
          <li>
            <strong>Turkey:</strong> follows the national layout: a bank code from{" "}
            <code>turkishBanks</code>, the reserve digit <code>0</code> and a 16-digit account
            number. <code>bank</code> picks the bank by its four-digit TCMB code; without it a bank
            is picked at random. <code>getTurkishBank</code> finds the bank of every generated IBAN.
          </li>
          <li>
            <strong>Other countries:</strong> any of the 89 countries in the IBAN registry. The
            account part is digits only, at the registry length. It passes <code>isValidIBAN</code>{" "}
            (length and mod-97), not national rules such as the letters of a UK bank code.
          </li>
          <li>
            An unknown country, an unknown bank code or <code>bank</code> outside Turkey throws an
            error, so a typo doesn&apos;t give you silent data.
          </li>
        </ul>
        <DocsCodeBlock code={ibanCode} lang="ts" />

        <h2 id="seed">Seed and tests</h2>
        <p>
          Without <code>seed</code> every call gives a new value. With an integer <code>seed</code>{" "}
          the value is the same on every run and platform, so snapshots, seed data and screenshots
          stay stable. The seed is only the generator&apos;s start value; it maps to no person or
          table. One seed gives unrelated digits for a TCKN and an IBAN.
        </p>
        <DocsCodeBlock code={seedCode} lang="ts" />
        <DocsCodeBlock code={testCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
