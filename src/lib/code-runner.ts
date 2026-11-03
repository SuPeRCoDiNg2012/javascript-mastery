import type { RunResult } from '@/types/runner';

export const DEFAULT_TIMEOUT_MS = 2000;

export interface RunOptions {
  timeoutMs?: number;
}

/**
 * Executes user code inside a disposable module Web Worker.
 * - No `eval` on the main thread.
 * - The worker is terminated after `timeoutMs` so infinite loops cannot hang the UI.
 * - Each run gets a fresh worker: no leaking globals between exercises.
 */
export function runJavaScript(
  code: string,
  { timeoutMs = DEFAULT_TIMEOUT_MS }: RunOptions = {},
): Promise<RunResult> {
  return new Promise((resolve) => {
    const started = performance.now();
    let settled = false;
    let worker: Worker | null = null;

    const finish = (result: Omit<RunResult, 'durationMs'>) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      worker?.terminate();
      resolve({ ...result, durationMs: Math.round(performance.now() - started) });
    };

    const timer = window.setTimeout(() => {
      finish({
        logs: [],
        error: null,
        timedOut: true,
        message: 'Attenzione: possibile ciclo infinito. Esecuzione interrotta dopo 2 secondi.',
      });
    }, timeoutMs);

    try {
      worker = new Worker(new URL('./code-worker.ts', import.meta.url), { type: 'module' });
    } catch {
      finish({
        logs: [],
        error: null,
        timedOut: false,
        message: 'Impossibile avviare la sandbox di esecuzione in questo browser.',
      });
      return;
    }

    worker.onmessage = (event: MessageEvent<{ type: string; logs: string[]; error: string | null }>) => {
      if (event.data?.type !== 'done') return;
      finish({ logs: event.data.logs, error: event.data.error, timedOut: false, message: null });
    };

    worker.onerror = (event) => {
      event.preventDefault();
      finish({
        logs: [],
        error: event.message || 'Errore nella sandbox',
        timedOut: false,
        message: null,
      });
    };

    worker.postMessage({ code });
  });
}
