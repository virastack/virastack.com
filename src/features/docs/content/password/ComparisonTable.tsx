import { GuideProductMark } from "@/features/guide/components/GuideRichText";

import { comparisonRows, type ComparisonCell } from "./comparison-data";

type ComparisonTableProps = {
  labels: Record<string, string>;
  head: [feature: string, unknownHint: string];
};

const icons = { yes: "✅", no: "❌", na: "➖" } as const;

const isIcon = (value: ComparisonCell): value is keyof typeof icons => value in icons;

function Cell({ value, unknownHint }: { value: ComparisonCell; unknownHint: string }) {
  if (isIcon(value)) {
    return (
      <span role="img" aria-label={value === "na" ? "n/a" : value}>
        {icons[value]}
      </span>
    );
  }
  if (value === "unknown") return <span title={unknownHint}>?</span>;
  return <span className="text-sm">{value}</span>;
}

/** Feature table: ViraStack Password, Radix PasswordToggleField, zxcvbn-ts. */
export function ComparisonTable({ labels, head }: ComparisonTableProps) {
  const [feature, unknownHint] = head;

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table>
        <thead>
          <tr>
            <th>{feature}</th>
            <th>
              <GuideProductMark id="password" linked={false}>
                Password
              </GuideProductMark>
            </th>
            <th>Radix PasswordToggleField</th>
            <th>zxcvbn-ts</th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.id}>
              <td>{labels[row.id]}</td>
              <td>
                <Cell value={row.password} unknownHint={unknownHint} />
              </td>
              <td>
                <Cell value={row.radix} unknownHint={unknownHint} />
              </td>
              <td>
                <Cell value={row.zxcvbn} unknownHint={unknownHint} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
