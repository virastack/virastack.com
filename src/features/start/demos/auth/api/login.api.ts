import { LOGIN_PATH } from "@/features/start/demos/auth/constants/auth.constants";
import { sessionUserSchema } from "@/features/start/demos/auth/schemas/auth.schema";
import type { LoginFormInput, SessionUser } from "@/features/start/demos/auth/schemas/auth.schema";
import { api } from "@/features/start/demos/users/lib/api";

/** The schema keeps the user and drops the tokens DummyJSON sends with it. */
export function login(input: LoginFormInput, signal?: AbortSignal): Promise<SessionUser> {
  return api.post(LOGIN_PATH, input, { schema: sessionUserSchema, signal });
}

/** No request yet: with your API, a request that ends the session and clears its cookie. */
export async function logout(): Promise<null> {
  return null;
}
