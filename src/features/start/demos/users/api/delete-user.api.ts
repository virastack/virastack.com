import { USERS_PATH } from "@/features/start/demos/users/constants/users.constants";
import { api } from "@/features/start/demos/users/lib/api";
import { deletedUserSchema } from "@/features/start/demos/users/schemas/user.schema";

/** DummyJSON answers as if the user was deleted, but the user stays on its side. */
export function deleteUser(id: number) {
  return api.delete(`${USERS_PATH}/${id}`, { schema: deletedUserSchema });
}
