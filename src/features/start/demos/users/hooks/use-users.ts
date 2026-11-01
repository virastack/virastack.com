"use client";

import { useQuery } from "@tanstack/react-query";

import { usersQueryOptions } from "@/features/start/demos/users/api/user.queries";
import type { UsersFilters } from "@/features/start/demos/users/schemas/users-params.schema";

export function useUsers(filters: UsersFilters) {
  return useQuery(usersQueryOptions(filters));
}
