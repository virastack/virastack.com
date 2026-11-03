import { USERS_PATH } from "@/features/start/demos/users/constants/users.constants";
import { toUserBody } from "@/features/start/demos/users/helpers/to-user-body";
import { api } from "@/features/start/demos/users/lib/api";
import { userSchema } from "@/features/start/demos/users/schemas/user.schema";
import type { User, UserFormInput } from "@/features/start/demos/users/schemas/user.schema";

/** DummyJSON answers as if the user was created, but it does not store it. */
export function addUser(input: UserFormInput, signal?: AbortSignal): Promise<User> {
  return api.post(`${USERS_PATH}/add`, toUserBody(input), { schema: userSchema, signal });
}
