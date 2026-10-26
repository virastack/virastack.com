import { Check, Minus, X } from "lucide-react";

import { comparisonRows, type ComparisonCell } from "./comparison-data";

type ComparisonTableProps = {
  labels: Record<string, string>;
  head: [feature: string, unknownHint: string];
};

function Cell({ value, unknownHint }: { value: ComparisonCell; unknownHint: string }) {
  if (value === "yes") return <Check className="size-4 text-green-600" aria-label="yes" />;
  if (value === "no") return <X className="size-4 text-muted-foreground" aria-label="no" />;
  if (value === "na") return <Minus className="size-4 text-muted-foreground/60" aria-label="n/a" />;
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
            <th>ViraStack Password</th>
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
