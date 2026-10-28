/** Base URL of the server under test; `server.setup.ts` sets it. */
export const baseUrl = () => process.env.TEST_BASE_URL ?? "http://127.0.0.1:3210";

export async function status(path: string): Promise<number> {
  const response = await fetch(`${baseUrl()}${path}`, { redirect: "follow" });
  return response.status;
}

/** Runs `task` over `items` with a bounded number of requests in flight. */
export async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const queue = [...items.entries()];
  const results = new Array<R>(items.length);

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    for (let entry = queue.shift(); entry; entry = queue.shift()) {
      const [index, item] = entry;
      results[index] = await task(item);
    }
  });

  await Promise.all(workers);
  return results;
}
