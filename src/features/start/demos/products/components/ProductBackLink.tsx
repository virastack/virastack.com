import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ProductLink } from "@/features/start/demos/products/components/ProductLink";
import { buttonVariants } from "@/features/start/demos/users/ui/button";

/** Back to the list, from a product or from a product that is not there. */
export function ProductBackLink() {
  const t = useTranslations("StartProducts");

  return (
    <ProductLink className={buttonVariants({ variant: "ghost", size: "sm" })}>
      <ArrowLeftIcon aria-hidden />
      {t("all_products")}
    </ProductLink>
  );
}
