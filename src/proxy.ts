import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // The first pattern skips paths with a dot; release URLs have one (`/releases/start/v1.2.0`).
  matcher: ["/((?!api|og|trpc|_next|_vercel|.*\\..*).*)", "/releases/:product/:version"],
};
