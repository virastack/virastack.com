import { ApiError } from "@/features/start/demos/users/lib/api";

/** DummyJSON answers a wrong username or password with 400; most APIs use 401. */
export function isInvalidCredentials(error: unknown) {
  return (
    error instanceof ApiError && error.kind === "http" && [400, 401].includes(error.status ?? 0)
  );
}
