import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { ROLE_BADGE_CLASS_NAMES } from "@/features/start/demos/users/constants/users.constants";
import type { UserRole } from "@/features/start/demos/users/schemas/user.schema";
import { Badge } from "@/features/start/demos/users/ui/badge";

export function UserRoleBadge({ role }: { role: UserRole }) {
  const t = useTranslations("Users");
  return (
    <Badge variant="outline" className={cn("capitalize", ROLE_BADGE_CLASS_NAMES[role])}>
      {t(`role_${role}`)}
    </Badge>
  );
}
