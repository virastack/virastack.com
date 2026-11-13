import { useTranslations } from "next-intl";

import { ProductBackLink } from "@/features/start/demos/products/components/ProductBackLink";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/features/start/demos/users/ui/empty";

/**
 * A product that does not exist, with the way back to the list: the detail page's own state, and
 * the page the framework shows with the 404 status.
 */
export function ProductNotFound() {
  const t = useTranslations("StartProducts");

  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyTitle>{t("not_found_title")}</EmptyTitle>
        <EmptyDescription>{t("not_found_description")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ProductBackLink />
      </EmptyContent>
    </Empty>
  );
}
