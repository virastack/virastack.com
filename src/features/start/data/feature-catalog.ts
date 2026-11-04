const featureGroups = ["user", "ecommerce", "admin"] as const;

const featureIds = [
  "users",
  "auth",
  "products",
  "cart",
  "checkout-address",
  "checkout-card",
  "admin-products",
  "admin-orders",
  "admin-customers",
  "admin-dashboard",
] as const;

/** Registry item name, also the `virastack add` argument. */
export type FeatureId = (typeof featureIds)[number];

export function isFeatureId(value: string): value is FeatureId {
  return (featureIds as readonly string[]).includes(value);
}

export type FeatureGroup = (typeof featureGroups)[number];

export type FeatureTag = "mockApi" | "urlState" | "form";

export type CatalogFeature = {
  id: FeatureId;
  group: FeatureGroup;
  status: "ready" | "soon";
  tags: readonly FeatureTag[];
  packages?: readonly string[];
};

export const featureCatalog: readonly CatalogFeature[] = [
  {
    id: "users",
    group: "user",
    status: "ready",
    tags: ["urlState", "form"],
  },
  {
    id: "auth",
    group: "user",
    status: "soon",
    tags: ["mockApi", "form"],
    packages: ["@virastack/password"],
  },
  {
    id: "products",
    group: "ecommerce",
    status: "soon",
    tags: ["mockApi", "urlState"],
  },
  {
    id: "cart",
    group: "ecommerce",
    status: "soon",
    tags: ["mockApi"],
  },
  {
    id: "checkout-address",
    group: "ecommerce",
    status: "ready",
    tags: ["mockApi", "form"],
    packages: ["@virastack/address", "@virastack/mask"],
  },
  {
    id: "checkout-card",
    group: "ecommerce",
    status: "ready",
    tags: ["mockApi", "form"],
    packages: ["@virastack/mask"],
  },
  {
    id: "admin-products",
    group: "admin",
    status: "soon",
    tags: ["mockApi", "urlState", "form"],
    packages: ["@tanstack/react-table"],
  },
  {
    id: "admin-orders",
    group: "admin",
    status: "soon",
    tags: ["mockApi", "urlState"],
    packages: ["@tanstack/react-table"],
  },
  {
    id: "admin-customers",
    group: "admin",
    status: "soon",
    tags: ["mockApi", "urlState", "form"],
    packages: ["@tanstack/react-table"],
  },
  {
    id: "admin-dashboard",
    group: "admin",
    status: "soon",
    tags: ["mockApi"],
    packages: ["recharts"],
  },
];

/** Modules `virastack add` can install today; the sitemap lists only these. */
export const readyFeatures = featureCatalog.filter(({ status }) => status === "ready");

/** Unready modules stay visible while developing and are left out of production builds. */
export const visibleFeatures =
  process.env.NODE_ENV === "production" ? readyFeatures : featureCatalog;

export const visibleGroups = featureGroups.filter((group) =>
  visibleFeatures.some((feature) => feature.group === group),
);
