export type ProductId = "start" | "ai" | "mask" | "password" | "address" | "guide";

export type Product = {
  id: ProductId;
  href: `/${ProductId}`;
  github: string;
  colorClass: string;
};
