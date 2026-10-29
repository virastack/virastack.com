/**
 * `NEXT_PUBLIC_*` values for code that also runs in the browser.
 *
 * Kept free of zod on purpose: `siteConfig` reaches client components (Header,
 * search), and importing the schema there shipped the whole validator to every
 * page. Validation still runs once at build/dev start: `next.config.ts` imports
 * `src/env.ts`, which checks these same variables against its schema.
 */
export const PUBLIC_ENV_DEFAULTS = {
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  NEXT_PUBLIC_APP_NAME: "ViraStack",
} as const;

export const publicEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || PUBLIC_ENV_DEFAULTS.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME:
    process.env.NEXT_PUBLIC_APP_NAME || PUBLIC_ENV_DEFAULTS.NEXT_PUBLIC_APP_NAME,
};
