import { ApiError } from "@/features/start/demos/users/lib/api";

export function getErrorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Something went wrong.";
}

export function isNotFoundError(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}
