import { StarIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { GithubIcon } from "@/components/shared/icons/GithubIcon";
import { buttonVariants } from "@/components/ui/button";

type GithubRepoButtonProps = {
  href: string;
  /** Short label, e.g. `virastack/start` or `virastack`. */
  label: string;
  /** The repository's stars; the figure is left out when missing. */
  stars?: number;
};

export function GithubRepoButton({ href, label, stars }: GithubRepoButtonProps) {
  const locale = useLocale();
  const t = useTranslations("Products");

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({ variant: "outline", size: "lg" })}
    >
      <GithubIcon data-icon="inline-start" className="size-3.5" />
      <span>{label}</span>
      {stars === undefined ? null : (
        <span className="flex items-center gap-1 border-l border-border pl-2 text-muted-foreground tabular-nums">
          <StarIcon
            aria-hidden
            className="size-3.5 fill-transparent transition-colors duration-200 group-hover/button:fill-warning group-hover/button:text-warning"
          />
          {stars.toLocaleString(locale)}
          <span className="sr-only">{t("githubStars")}</span>
        </span>
      )}
    </a>
  );
}
