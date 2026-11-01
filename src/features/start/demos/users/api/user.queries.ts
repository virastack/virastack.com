import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { getUsers } from "@/features/start/demos/users/api/get-users.api";
import { userKeys } from "@/features/start/demos/users/api/query-keys";
import type { UsersFilters } from "@/features/start/demos/users/schemas/users-params.schema";

export const usersQueryOptions = ({ page, q }: UsersFilters) => {
  const filters = { page, q: q.trim() };

  return queryOptions({
    queryKey: userKeys.list(filters),
    queryFn: ({ signal }) => getUsers(filters, signal),
    placeholderData: keepPreviousData,
  });
};
