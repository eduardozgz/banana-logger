export function deepReplaceAll<E>(
  object: E,
  searchValue: string | RegExp,
  replaceValue: string,
): E {
  // Handle primitives and strings first
  if (object === null || object === undefined) {
    return object;
  }

  if (typeof object === "string") {
    return object.replaceAll(searchValue, replaceValue) as unknown as E;
  }

  // Handle arrays by mapping each element recursively
  if (Array.isArray(object)) {
    return object.map((item) =>
      deepReplaceAll(item, searchValue, replaceValue),
    ) as unknown as E;
  }

  // Handle plain objects (including typed objects like APIEmbed)
  if (typeof object === "object") {
    const clonedObject = structuredClone(object) as Record<string, unknown>;

    for (const key in clonedObject) {
      if (Object.prototype.hasOwnProperty.call(clonedObject, key)) {
        const value = clonedObject[key];

        if (typeof value === "string") {
          clonedObject[key] = value.replaceAll(searchValue, replaceValue);
        } else if (value !== null && typeof value === "object") {
          clonedObject[key] = deepReplaceAll(value, searchValue, replaceValue);
        }
      }
    }

    return clonedObject as unknown as E;
  }

  // Fallback for other primitive types (number, boolean, bigint, symbol)
  return object;
}
