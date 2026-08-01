import { MoveRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { TurkuazMark } from "@/components/icons/turkuaz";

export function AboutTimeline() {
  const t = useTranslations("AboutPage");

  return (
    <div
      className="grid grid-cols-[auto_auto_auto] items-center justify-center gap-x-6 gap-y-3 py-2 sm:gap-x-10"
      role="img"
      aria-label={t("timelineAria")}
    >
      <div className="flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
        <TurkuazMark className="h-20 w-auto text-[#03968a] sm:h-24" />
      </div>

      <MoveRightIcon className="size-6 text-muted-foreground sm:size-7" aria-hidden />

      <div className="flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.webp" alt="" width={96} height={96} className="h-20 w-auto sm:h-24" />
      </div>

      <span className="text-center text-sm font-medium tracking-tight text-muted-foreground">
        {t("timelineFrom")}
      </span>
      <span aria-hidden />
      <span className="text-center text-sm font-medium tracking-tight text-muted-foreground">
        {t("timelineTo")}
      </span>
    </div>
  );
}
