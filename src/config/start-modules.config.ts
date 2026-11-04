import { isOneOf } from "@/helpers/is-one-of";

export const featureGroups = ["user", "ecommerce", "admin"] as const;

const featureIds = [
  "users",
  "auth",
  "product-list",
  "product-detail",
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
  return isOneOf(featureIds, value);
}

export type FeatureGroup = (typeof featureGroups)[number];

type FeatureTag = "mockApi" | "urlState" | "form";

export type FeatureStatus = "ready" | "building" | "planned";

export type CatalogFeature = {
  id: FeatureId;
  group: FeatureGroup;
  /**
   * `ready`: installable with `virastack add`. `building`: in progress, shown everywhere as under
   * construction. `planned`: not started, shown only in local development.
   */
  status: FeatureStatus;
  /** Position inside its group on the catalog page; not shown. */
  order: number;
  tags: readonly FeatureTag[];
  packages?: readonly string[];
};

export const featureCatalog: readonly CatalogFeature[] = [
  {
    id: "users",
    group: "user",
    status: "ready",
    order: 1,
    tags: ["urlState", "form"],
  },
  {
    id: "auth",
    group: "user",
    status: "planned",
    order: 2,
    tags: ["mockApi", "form"],
    packages: ["@virastack/password"],
  },
  {
    id: "product-list",
    group: "ecommerce",
    status: "building",
    order: 1,
    tags: ["mockApi", "urlState"],
  },
  {
    id: "product-detail",
    group: "ecommerce",
    status: "building",
    order: 2,
    tags: ["mockApi"],
  },
  {
    id: "cart",
    group: "ecommerce",
    status: "planned",
    order: 5,
    tags: ["mockApi"],
  },
  {
    id: "checkout-address",
    group: "ecommerce",
    status: "ready",
    order: 3,
    tags: ["mockApi", "form"],
    packages: ["@virastack/address", "@virastack/mask"],
  },
  {
    id: "checkout-card",
    group: "ecommerce",
    status: "ready",
    order: 4,
    tags: ["mockApi", "form"],
    packages: ["@virastack/mask"],
  },
  {
    id: "admin-products",
    group: "admin",
    status: "planned",
    order: 1,
    tags: ["mockApi", "urlState", "form"],
    packages: ["@tanstack/react-table"],
  },
  {
    id: "admin-orders",
    group: "admin",
    status: "planned",
    order: 2,
    tags: ["mockApi", "urlState"],
    packages: ["@tanstack/react-table"],
  },
  {
    id: "admin-customers",
    group: "admin",
    status: "planned",
    order: 3,
    tags: ["mockApi", "urlState", "form"],
    packages: ["@tanstack/react-table"],
  },
  {
    id: "admin-dashboard",
    group: "admin",
    status: "planned",
    order: 4,
    tags: ["mockApi"],
    packages: ["recharts"],
  },
];

/** Modules `virastack add` can install today; the sitemap lists only these. */
export const readyFeatures = featureCatalog.filter(({ status }) => status === "ready");

/** Planned modules show only in local development; ready and building ones also in production. */
export const visibleFeatures =
  process.env.NODE_ENV === "production"
    ? featureCatalog.filter(({ status }) => status !== "planned")
    : featureCatalog;

export const visibleGroups = featureGroups.filter((group) =>
  visibleFeatures.some((feature) => feature.group === group),
);
