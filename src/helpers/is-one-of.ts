/** Narrows `value` to a member of a readonly literal list, without widening the list. */
export function isOneOf<const T extends string>(list: readonly T[], value: unknown): value is T {
  return list.some((item) => item === value);
}
