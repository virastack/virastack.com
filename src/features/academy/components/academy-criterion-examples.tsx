"use client";

import { AcademyBadgeLogo } from "@/features/academy/components/academy-badge";
import {
  getAcademySourceInitials,
  resolveAcademySourceVisual,
} from "@/features/academy/constants/source-visual.constants";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui";

export type AcademyCriterionExample = {
  name: string;
  category: "organization" | "person";
};

type AcademyCriterionExamplesProps = {
  label: string;
  items: readonly AcademyCriterionExample[];
};

function ExampleMark({ item }: { item: AcademyCriterionExample }) {
  const visual = resolveAcademySourceVisual(item.name, item.category);

  if (visual.type === "badge") {
    return (
      <Avatar>
        <AvatarFallback className="bg-background">
          <AcademyBadgeLogo kind={visual.badgeKind} className="size-4" />
        </AvatarFallback>
      </Avatar>
    );
  }

  if (visual.type === "logo" || visual.type === "avatar") {
    return (
      <Avatar>
        <AvatarImage src={visual.imageSrc} alt="" />
        <AvatarFallback>
          {visual.type === "avatar" ? visual.initials : getAcademySourceInitials(item.name)}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar>
      <AvatarFallback>{visual.initials}</AvatarFallback>
    </Avatar>
  );
}

function ExampleAvatar({ item }: { item: AcademyCriterionExample }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            tabIndex={0}
            aria-label={item.name}
            className="relative z-0 rounded-full outline-none hover:z-10 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        <span aria-hidden>
          <ExampleMark item={item} />
        </span>
      </TooltipTrigger>
      <TooltipContent>{item.name}</TooltipContent>
    </Tooltip>
  );
}

export function AcademyCriterionExamples({ label, items }: AcademyCriterionExamplesProps) {
  return (
    <AvatarGroup aria-label={label}>
      {items.map((item) => (
        <ExampleAvatar key={item.name} item={item} />
      ))}
    </AvatarGroup>
  );
}
