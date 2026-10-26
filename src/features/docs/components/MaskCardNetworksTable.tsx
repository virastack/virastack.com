import { getTranslations } from "next-intl/server";

/** Same rules as getCardType in @virastack/mask. */
const NETWORKS = [
  { name: "Visa", type: "visa", prefixes: "4", length: "16", groups: "4-4-4-4", cvv: "3" },
  {
    name: "Mastercard",
    type: "mastercard",
    prefixes: "51–55, 2221–2720",
    length: "16",
    groups: "4-4-4-4",
    cvv: "3",
  },
  {
    name: "American Express",
    type: "amex",
    prefixes: "34, 37",
    length: "15",
    groups: "4-6-5",
    cvv: "4",
  },
  { name: "Troy", type: "troy", prefixes: "9792", length: "16", groups: "4-4-4-4", cvv: "3" },
] as const;

/**
 * Card networks the card preset detects from the leading digits.
 */
export async function MaskCardNetworksTable() {
  const t = await getTranslations("DocsMask");

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table>
        <thead>
          <tr>
            <th>{t("cardNetworksNetwork")}</th>
            <th>{t("cardNetworksPrefix")}</th>
            <th>{t("cardNetworksLength")}</th>
            <th>{t("cardNetworksGroups")}</th>
            <th>CVV</th>
            <th>getCardType</th>
          </tr>
        </thead>
        <tbody>
          {NETWORKS.map((network) => (
            <tr key={network.type}>
              <td>{network.name}</td>
              <td>
                <code>{network.prefixes}</code>
              </td>
              <td>{network.length}</td>
              <td>
                <code>{network.groups}</code>
              </td>
              <td>{network.cvv}</td>
              <td>
                <code>&quot;{network.type}&quot;</code>
              </td>
            </tr>
          ))}
          <tr>
            <td>{t("cardNetworksOther")}</td>
            <td>—</td>
            <td>16</td>
            <td>
              <code>4-4-4-4</code>
            </td>
            <td>3</td>
            <td>
              <code>&quot;unknown&quot;</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
