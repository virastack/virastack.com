import { formatAddress } from "@virastack/address";
import { createMask } from "@virastack/mask";
import { useTranslations } from "next-intl";

import { PHONE_MASKS } from "@/features/start/demos/checkout-address/constants/addresses.constants";
import type { Address } from "@/features/start/demos/checkout-address/schemas/address.schema";
import { Badge } from "@/features/start/demos/users/ui/badge";

const phoneMask = createMask(PHONE_MASKS.phone);

export function AddressDetails({ address }: { address: Address }) {
  const t = useTranslations("CheckoutAddress");

  return (
    <span className="flex min-w-0 flex-col gap-1 text-sm">
      <span className="flex flex-wrap items-center gap-2 font-medium">
        {address.addressName}
        {address.isDefault ? <Badge variant="secondary">{t("default_badge")}</Badge> : null}
      </span>
      <span>
        {address.firstName} {address.lastName} · {phoneMask.format(address.phone)}
      </span>
      <span className="text-pretty text-muted-foreground">
        {address.addressLine}, {formatAddress(address, { postalCode: true })}
      </span>
    </span>
  );
}
