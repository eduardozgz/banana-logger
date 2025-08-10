export function deepReplaceAll<E>(
  object: E,
  searchValue: string | RegExp,
  replaceValue: string,
): E {
  const clonedObject = structuredClone(object);
  for (const key in clonedObject) {
    if (Object.prototype.hasOwnProperty.call(clonedObject, key)) {
      const value = clonedObject[key as keyof typeof clonedObject] as unknown;

      if (typeof value === "object" && value !== null) {
        deepReplaceAll(value, searchValue, replaceValue);
      } else if (typeof value === "string") {
        clonedObject[key as keyof typeof clonedObject] = value.replaceAll(
          searchValue,
          replaceValue,
        ) as E[keyof E];
      }
    }
  }
  return clonedObject;
}
