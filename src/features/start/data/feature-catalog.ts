export const featureGroups = ["demo", "auth", "ecommerce", "admin"] as const;

export type FeatureGroup = (typeof featureGroups)[number];

export type FeatureTag = "uiOnly" | "mockApi" | "urlState" | "form";

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
    group: "demo",
    status: "ready",
    tags: ["urlState", "form"],
  },
  {
    id: "auth",
    group: "auth",
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
    id: "checkout",
    group: "ecommerce",
    status: "soon",
    tags: ["uiOnly", "form"],
    packages: ["@virastack/mask", "@virastack/address"],
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
  {
    id: "admin-shell",
    group: "admin",
    status: "soon",
    tags: ["uiOnly"],
  },
  {
    id: "data-table",
    group: "admin",
    status: "soon",
    tags: ["urlState"],
    packages: ["@tanstack/react-table"],
  },
];
