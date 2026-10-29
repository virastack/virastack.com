import { getBrandPalette } from "@/config/brand-palettes.config";
import { products } from "@/config/products.config";

type PillarItem = {
  id: "academy" | "guide" | "start" | "ai" | "mask" | "password" | "address";
  href: "/academy" | "/guide" | "/start" | "/ai" | "/mask" | "/password" | "/address";
  colorClass: string;
};

type Pillar = {
  id: "learn" | "start" | "build";
  items: readonly PillarItem[];
};

function product(id: PillarItem["id"]): PillarItem {
  const found = products.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown product: ${id}`);
  return { id, href: found.href as PillarItem["href"], colorClass: found.colorClass };
}

/** Learn → Start → Build: the order the homepage tells the ecosystem story in. */
export const homePillars: readonly Pillar[] = [
  {
    id: "learn",
    items: [
      { id: "academy", href: "/academy", colorClass: getBrandPalette("academy").textClass },
      product("guide"),
    ],
  },
  { id: "start", items: [product("start"), product("ai")] },
  { id: "build", items: [product("mask"), product("password"), product("address")] },
];
