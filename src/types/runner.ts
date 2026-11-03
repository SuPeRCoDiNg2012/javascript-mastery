export interface RunResult {
  logs: string[];
  error: string | null;
  timedOut: boolean;
  /** Set when the run could not start or was intentionally interrupted. */
  message: string | null;
  durationMs: number;
}
