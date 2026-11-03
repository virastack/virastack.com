"use client";

import { useTranslations } from "next-intl";

import { UserRoleBadge } from "@/features/start/demos/users/components/UserRoleBadge";
import { getAvatarTint } from "@/features/start/demos/users/helpers/get-avatar-tint";
import { getInitials } from "@/features/start/demos/users/helpers/get-initials";
import type { User } from "@/features/start/demos/users/schemas/user.schema";
import { Avatar, AvatarFallback } from "@/features/start/demos/users/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/features/start/demos/users/ui/dialog";

type UserDetailsDialogProps = {
  user: User;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function UserDetailsDialog({ user, isOpen, onOpenChange }: UserDetailsDialogProps) {
  const t = useTranslations("Users");
  const name = `${user.firstName} ${user.lastName}`;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("details_title")}</DialogTitle>
          <DialogDescription>{t("details_description")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback className={getAvatarTint(user.id)}>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium">{name}</p>
            <p className="truncate text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        <dl className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 rounded-lg border p-4 text-sm">
          <dt className="text-muted-foreground">{t("column_position")}</dt>
          <dd className="min-w-0 break-words">{user.company?.title ?? "—"}</dd>
          <dt className="text-muted-foreground">{t("field_department")}</dt>
          <dd className="min-w-0 break-words">{user.company?.department ?? "—"}</dd>
          <dt className="text-muted-foreground">{t("column_role")}</dt>
          <dd>
            <UserRoleBadge role={user.role} />
          </dd>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
