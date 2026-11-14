import { setupServer } from "msw/node";

/**
 * MSW server for component tests. Override handlers per test with `server.use()`.
 * Unhandled requests fail the test. The HTTP suite talks to a real server and does not use it.
 */
export const server = setupServer();
