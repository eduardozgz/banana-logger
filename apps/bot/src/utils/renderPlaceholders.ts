/**
 * Renders `{PLACEHOLDER}` tokens throughout an object tree in a single pass.
 *
 * The tree is deep-cloned once, then every string is visited exactly once: one
 * regex scan replaces all placeholders whose key exists in `data` (unknown
 * tokens are left as-is, matching the previous per-key replaceAll behaviour,
 * including stringifying an explicitly-undefined value). This replaces the old
 * deepReplaceAll loop, which cloned the whole tree once per data key —
 * O(keys × nodes) structuredClone calls per rendered event on the hot path.
 */
export function deepRenderPlaceholders<E>(
  object: E,
  data: Record<string, string | undefined>,
): E {
  const render = (node: unknown): unknown => {
    if (typeof node === "string") {
      return node.replace(/\{([A-Z0-9_]+)\}/g, (match, key: string) =>
        Object.hasOwn(data, key) ? String(data[key]) : match,
      );
    }

    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        node[i] = render(node[i]);
      }
      return node;
    }

    if (node !== null && typeof node === "object") {
      const record = node as Record<string, unknown>;
      for (const key in record) {
        if (Object.hasOwn(record, key)) {
          record[key] = render(record[key]);
        }
      }
      return record;
    }

    return node;
  };

  return render(structuredClone(object)) as E;
}
