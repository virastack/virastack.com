/** `Object.fromEntries` that keeps the key type; the built-in widens keys to `string`. */
export function fromEntries<Key extends PropertyKey, Value>(
  entries: Iterable<readonly [Key, Value]>,
): Record<Key, Value> {
  return Object.fromEntries(entries) as Record<Key, Value>;
}

/** `Object.keys` that keeps the key type; the built-in returns `string[]`. */
export function keysOf<T extends object>(value: T): Extract<keyof T, string>[] {
  return Object.keys(value) as Extract<keyof T, string>[];
}
