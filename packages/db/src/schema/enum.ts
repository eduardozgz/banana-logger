/**
 * Builds a frozen string-enum object from a list of keys — each key maps to
 * itself — so a set of literals can be declared once instead of writing
 * `foo: "foo"` for every member.
 */
export function createEnum<T extends readonly string[]>(keys: [...T]) {
  const obj: Record<string, string> = {};
  for (const key of keys) obj[key] = key;
  return Object.freeze(obj) as { readonly [K in T[number]]: K };
}

export type EnumToUnion<E> = keyof E;
