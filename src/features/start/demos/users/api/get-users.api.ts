import {
  USERS_PAGE_SIZE,
  USERS_PATH,
} from "@/features/start/demos/users/constants/users.constants";
import { api } from "@/features/start/demos/users/lib/api";
import { usersPageSchema } from "@/features/start/demos/users/schemas/user.schema";
import type { UsersPage } from "@/features/start/demos/users/schemas/user.schema";
import type { UsersFilters } from "@/features/start/demos/users/schemas/users-params.schema";

export function getUsers({ page, q }: UsersFilters, signal?: AbortSignal): Promise<UsersPage> {
  const search = q.trim();

  return api.get(search ? `${USERS_PATH}/search` : USERS_PATH, {
    params: {
      limit: USERS_PAGE_SIZE,
      skip: (page - 1) * USERS_PAGE_SIZE,
      q: search || undefined,
      // DummyJSON lists its admins first; this order looks like a real team.
      sortBy: "lastName",
      order: "desc",
    },
    schema: usersPageSchema,
    signal,
  });
}
