"use server";

import { validatePassword } from "@virastack/password/server";
import type { PasswordIssue } from "@virastack/password/strength";

import { policy } from "./password-policy";

export type SignupState = { ok: boolean; issues: PasswordIssue[] } | null;

export async function signup(_state: SignupState, formData: FormData): Promise<SignupState> {
  // The browser can be skipped; the server checks again with the same policy.
  const result = validatePassword(formData.get("password"), policy, {
    forbidden: [formData.get("email")],
    confirm: formData.get("confirm"),
  });
  if (!result.valid) return { ok: false, issues: result.issues };

  // await createUser(email, await hash(result.password)) — result.password is NFKC-normalized
  return { ok: true, issues: [] };
}
