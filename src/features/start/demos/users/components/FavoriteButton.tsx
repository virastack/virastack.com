"use client";

import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useFavoriteIds } from "@/features/start/demos/users/hooks/use-favorite-ids";
import { useFavoritesStore } from "@/features/start/demos/users/stores/favorites.store";

type FavoriteButtonProps = {
  userId: number;
  userName: string;
};

export function FavoriteButton({ userId, userName }: FavoriteButtonProps) {
  const isFavorite = useFavoriteIds().includes(userId);
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Favorite ${userName}`}
      aria-pressed={isFavorite}
      onClick={() => toggle(userId)}
    >
      <StarIcon aria-hidden className={cn("size-4", isFavorite && "fill-current")} />
    </Button>
  );
}
