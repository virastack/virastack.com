import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { UserRole } from "@/features/start/demos/users/schemas/user.schema";

const ROLE_STYLES: Record<UserRole, string> = {
  admin: "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300",
  moderator: "bg-indigo-500/10 text-indigo-700 ring-indigo-500/25 dark:text-indigo-300",
  user: "bg-muted text-muted-foreground ring-border",
};

type RoleBadgeProps = {
  role: UserRole;
  children: ReactNode;
};

export function RoleBadge({ role, children }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
        ROLE_STYLES[role],
      )}
    >
      {children}
    </span>
  );
}
