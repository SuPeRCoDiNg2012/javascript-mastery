/// <reference lib="webworker" />
import { formatError, formatValue } from './format-value';

/**
 * User code runs here, never on the main thread. The host terminates this
 * worker after the timeout, which is what stops `while (true) {}` from
 * freezing the app. Console output is captured and streamed back.
 */
type DoneMessage = { type: 'done'; logs: string[]; error: string | null };

const logs: string[] = [];

const serialize = (args: unknown[]) => args.map((arg) => formatValue(arg)).join(' ');

const capture = (prefix: string) => (...args: unknown[]) => {
  logs.push(prefix + serialize(args));
};

(globalThis as unknown as { console: Console }).console = {
  ...console,
  log: capture(''),
  info: capture(''),
  debug: capture(''),
  warn: capture('[warn] '),
  error: capture('[error] '),
  table: capture('[table] '),
} as Console;

self.onmessage = async (event: MessageEvent<{ code: string }>) => {
  let error: string | null = null;
  try {
    // eslint-disable-next-line no-new-func
    const run = new Function('"use strict";\n' + event.data.code);
    const result = run();
    // Async lessons return a promise; await it so its logs are captured.
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      await (result as Promise<unknown>);
    }
  } catch (caught) {
    error = formatError(caught);
  }

  // Give queued microtasks and zero-delay timers a chance to run so event-loop
  // lessons print in the expected order. Well under the 2s execution budget.
  await new Promise((resolve) => setTimeout(resolve, 60));

  const message: DoneMessage = { type: 'done', logs, error };
  self.postMessage(message);
};

export {};
