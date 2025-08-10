export function listFormat(list: string[], locale: string) {
  return new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  }).format(list);
}
