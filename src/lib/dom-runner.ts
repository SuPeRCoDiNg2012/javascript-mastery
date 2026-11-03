import type { RunResult } from '@/types/runner';

/**
 * DOM lessons need a real document, which a plain worker does not have. User
 * code runs in a sandboxed (`allow-scripts`, no same-origin) iframe with a small
 * fixture, and console output is posted back. The iframe is removed after the
 * run, so every exercise starts from a clean DOM.
 */
const FIXTURE = `<!doctype html>
<html lang="it">
  <head><meta charset="utf-8" /><title>sandbox</title></head>
  <body>
    <div id="app"></div>
    <ul id="lista"><li>Pane</li><li>Latte</li></ul>
    <p id="messaggio">Testo iniziale</p>
    <button id="btn" type="button">Clic</button>
    <input id="input" value="" />
    <form id="form">
      <input id="nome" name="nome" value="" />
      <button id="invia" type="submit">Invia</button>
    </form>
  </body>
</html>`;

const BOOTSTRAP = `<script>
(function () {
  var logs = [];

  function format(value, depth) {
    depth = depth || 0;
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    var type = typeof value;
    if (type === 'string') return depth === 0 ? value : "'" + value + "'";
    if (type === 'number' || type === 'boolean' || type === 'bigint') return String(value);
    if (type === 'function') return '[Function]';
    if (value instanceof Error) return value.name + ': ' + value.message;
    if (depth > 2) return Array.isArray(value) ? '[Array]' : '[Object]';
    try {
      if (Array.isArray(value)) {
        return '[' + value.map(function (item) { return format(item, depth + 1); }).join(', ') + ']';
      }
      var keys = Object.keys(value);
      return '{' + (keys.length ? ' ' : '') + keys.map(function (key) {
        return key + ': ' + format(value[key], depth + 1);
      }).join(', ') + (keys.length ? ' ' : '') + '}';
    } catch (error) {
      return String(value);
    }
  }

  function capture(prefix) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      logs.push(prefix + args.map(function (a) { return format(a); }).join(' '));
    };
  }

  var nativeConsole = window.console;
  window.console = {
    log: capture(''),
    info: capture(''),
    debug: capture(''),
    warn: capture('[warn] '),
    error: capture('[error] '),
    table: capture('[table] '),
    dir: capture(''),
    clear: function () { logs.length = 0; }
  };

  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.type !== 'run') return;
    logs.length = 0;
    var error = null;
    var returned;
    try {
      returned = new Function('"use strict";' + data.code)();
    } catch (caught) {
      error = (caught && caught.name ? caught.name + ': ' + caught.message : String(caught));
    }
    Promise.resolve(returned).then(function () {
      setTimeout(function () {
        parent.postMessage({ type: 'dom-result', id: data.id, logs: logs, error: error }, '*');
      }, 40);
    }, function (rejection) {
      parent.postMessage({
        type: 'dom-result',
        id: data.id,
        logs: logs,
        error: rejection && rejection.name ? rejection.name + ': ' + rejection.message : String(rejection)
      }, '*');
    });
  });

  window.__sandboxReady = true;
  void nativeConsole;
})();
</script>`;

export const DOM_TIMEOUT_MS = 2000;

export function runDomJavaScript(
  code: string,
  { timeoutMs = DOM_TIMEOUT_MS, fixture }: { timeoutMs?: number; fixture?: string } = {},
): Promise<RunResult> {
  return new Promise((resolve) => {
    const started = performance.now();
    const runId = `run-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.setAttribute('title', 'Sandbox esercizio DOM');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.cssText = 'position:fixed;left:-10000px;top:0;width:800px;height:600px;border:0;';

    let settled = false;

    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(timer);
      iframe.remove();
    };

    const finish = (result: Omit<RunResult, 'durationMs'>) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve({ ...result, durationMs: Math.round(performance.now() - started) });
    };

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; id?: string; logs?: string[]; error?: string | null };
      if (data?.type !== 'dom-result' || data.id !== runId) return;
      finish({
        logs: Array.isArray(data.logs) ? data.logs : [],
        error: data.error ?? null,
        timedOut: false,
        message: null,
      });
    };

    const timer = window.setTimeout(() => {
      finish({
        logs: [],
        error: null,
        timedOut: true,
        message: 'Attenzione: possibile ciclo infinito. Esecuzione interrotta dopo 2 secondi.',
      });
    }, timeoutMs);

    window.addEventListener('message', onMessage);

    const html = (fixture ?? FIXTURE).replace('</body>', `${BOOTSTRAP}</body>`);
    iframe.onload = () => {
      iframe.contentWindow?.postMessage({ type: 'run', code, id: runId }, '*');
    };
    iframe.srcdoc = html;
    document.body.appendChild(iframe);
  });
}
