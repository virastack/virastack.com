"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

type AcademyBackLinkProps = {
  href?: "/academy" | "/academy/sources" | `/academy/${string}`;
  label?: string;
};

export function AcademyBackLink({ href = "/academy", label }: AcademyBackLinkProps) {
  const t = useTranslations("Academy");

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden />
      {label ?? t("backToAcademy")}
    </Link>
  );
}
