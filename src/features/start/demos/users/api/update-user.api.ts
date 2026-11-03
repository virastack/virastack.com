import { USERS_PATH } from "@/features/start/demos/users/constants/users.constants";
import { toUserBody } from "@/features/start/demos/users/helpers/to-user-body";
import { api } from "@/features/start/demos/users/lib/api";
import { userSchema } from "@/features/start/demos/users/schemas/user.schema";
import type { User, UserFormInput } from "@/features/start/demos/users/schemas/user.schema";

/** DummyJSON answers with the changed user, but it does not store the change. */
export function updateUser(id: number, input: UserFormInput): Promise<User> {
  return api.put(`${USERS_PATH}/${id}`, toUserBody(input), { schema: userSchema });
}
