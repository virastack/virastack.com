const featureGroups = ["user", "ecommerce", "admin"] as const;

export type FeatureGroup = (typeof featureGroups)[number];

export type FeatureTag = "mockApi" | "urlState" | "form";

export type CatalogFeature = {
  /** Registry item name, also the `virastack add` argument. */
  id: string;
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

/** Unready modules stay visible while developing and are left out of production builds. */
export const visibleFeatures =
  process.env.NODE_ENV === "production"
    ? featureCatalog.filter(({ status }) => status === "ready")
    : featureCatalog;

export const visibleGroups = featureGroups.filter((group) =>
  visibleFeatures.some((feature) => feature.group === group),
);
