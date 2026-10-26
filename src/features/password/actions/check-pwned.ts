"use server";

import { checkPwned, type PwnedResult } from "@virastack/password/pwned";

/** Runs on the server, so Have I Been Pwned never sees the visitor's IP. */
export async function checkPasswordLeak(password: string): Promise<PwnedResult> {
  return checkPwned(password, { timeout: 3000 });
}
