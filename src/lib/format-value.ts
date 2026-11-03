/** Serialises any runtime value the way a browser console would, without deps. */
export function formatValue(value: unknown, depth = 0, seen = new WeakSet<object>()): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  const type = typeof value;
  if (type === 'string') return depth === 0 ? (value as string) : `'${value as string}'`;
  if (type === 'number' || type === 'boolean' || type === 'bigint') return String(value);
  if (type === 'symbol') return (value as symbol).toString();
  if (type === 'function') {
    const name = (value as { name?: string }).name;
    return name ? `[Function: ${name}]` : '[Function (anonymous)]';
  }

  const object = value as object;

  if (seen.has(object)) return '[Circular]';
  if (depth > 2) return Array.isArray(object) ? '[Array]' : '[Object]';

  seen.add(object);

  if (Array.isArray(object)) {
    const items = object.map((item) => formatValue(item, depth + 1, seen));
    return `[${items.join(', ')}]`;
  }

  if (object instanceof Date) return object.toISOString();
  if (object instanceof Error) return `${object.name}: ${object.message}`;
  if (object instanceof Map) {
    const entries = [...object.entries()].map(
      ([k, v]) => `${formatValue(k, depth + 1, seen)} => ${formatValue(v, depth + 1, seen)}`,
    );
    return `Map(${object.size}) {${entries.length ? ' ' + entries.join(', ') + ' ' : ''}}`;
  }
  if (object instanceof Set) {
    const entries = [...object.values()].map((v) => formatValue(v, depth + 1, seen));
    return `Set(${object.size}) {${entries.length ? ' ' + entries.join(', ') + ' ' : ''}}`;
  }

  const entries = Object.entries(object as Record<string, unknown>).map(
    ([key, val]) => `${key}: ${formatValue(val, depth + 1, seen)}`,
  );
  return `{${entries.length ? ' ' + entries.join(', ') + ' ' : ''}}`;
}

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.stack ? `${error.name}: ${error.message}` : `${error.name}: ${error.message}`;
  }
  return `Uncaught ${formatValue(error)}`;
}
