import { describe, expect, it } from "vitest";

import { docsMdxPlainText, parseDocsMdxHeadings } from "@/features/docs/lib/docs-mdx-source";

const page = `import { ComponentPreview } from "@/components/shared/ComponentPreview";

export const quickStartCode = \`const value = "x"

return <p>{value}</p>\`;

<DocsPageHeader
  title="Introduction"
  description="Not part of the body."
/>

<DocsProse>

Picks a **province**, then a [district](/address/docs/use-vira-address), with \`useViraAddress()\` and _no_ markup of its own.

<h2 id="neden">Why <GuideProductMark id="address" linked={false} tone="heading">Address</GuideProductMark>?</h2>

- Works with <AcademyBadge kind="react" /> and <AcademyBadge kind="nodejs" label="Node.js 20+" />.
- Escaped \\{braces\\} stay text.

<ComponentPreview preview={<Demo onChange={(event) => event} />} code={quickStartCode}>
  <DocsCodeBlock code={quickStartCode} lang="tsx" />
</ComponentPreview>

\`\`\`ts
const hidden = "code is not searched"
\`\`\`

<h2 id="tablo" className="flex">Table</h2>

<table>
  <tbody>
    <tr>
      <td>Province</td>
      <td>*il*</td>
    </tr>
  </tbody>
</table>

</DocsProse>
`;

describe("parseDocsMdxHeadings", () => {
  it("reads h2 ids and the text the reader sees", () => {
    expect(parseDocsMdxHeadings(page)).toEqual([
      { id: "neden", title: "Why ViraStack Address?", level: 2 },
      { id: "tablo", title: "Table", level: 2 },
    ]);
  });

  it("ignores headings inside code blocks", () => {
    expect(parseDocsMdxHeadings('```html\n<h2 id="x">Code</h2>\n```')).toEqual([]);
  });
});

describe("docsMdxPlainText", () => {
  const text = docsMdxPlainText(page);

  it("keeps prose, link text, badge labels and table cells", () => {
    expect(text).toContain(
      "Picks a province, then a district, with useViraAddress() and no markup of its own.",
    );
    expect(text).toContain("Why ViraStack Address?");
    expect(text).toContain("Works with React and Node.js 20+.");
    expect(text).toContain("Escaped {braces} stay text.");
    expect(text).toContain("Province il");
  });

  it("leaves out code, imports, exports and the page header", () => {
    for (const hidden of [
      "code is not searched",
      "import",
      "quickStartCode",
      "Not part of",
      "onChange",
    ]) {
      expect(text).not.toContain(hidden);
    }
    expect(text).not.toMatch(/<\/?[A-Za-z]/);
  });
});
