"use server";

import { checkPwned, type PwnedResult } from "@virastack/password/pwned";

// From the server, Have I Been Pwned never sees the user's IP.
// Only the first 5 characters of the SHA-1 hash are sent.
export async function checkPassword(password: string): Promise<PwnedResult> {
  return checkPwned(password, { timeout: 3000 });
}
