"use client";

import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useFavoriteIds } from "@/features/start/demos/users/hooks/use-favorite-ids";
import { useFavoritesStore } from "@/features/start/demos/users/stores/favorites.store";
import { Button } from "@/features/start/demos/users/ui/button";

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
      <StarIcon
        aria-hidden
        className={cn("size-4", isFavorite && "fill-amber-400 text-amber-400")}
      />
    </Button>
  );
}
