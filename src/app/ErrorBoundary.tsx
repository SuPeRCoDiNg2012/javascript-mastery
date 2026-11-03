import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string | null;
}

/**
 * Last-resort boundary. A rendering crash must not blank the whole course:
 * the learner gets a fallback and can reload without losing local progress.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep the console useful without shipping errors to a third party.
    console.error('Errore di rendering:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-soft text-warning">
          <AlertTriangle className="h-5 w-5" aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-semibold">Qualcosa non ha risposto</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          I tuoi progressi sono salvati in locale. Ricarica la pagina: nella maggior parte dei casi basta.
        </p>
        {this.state.message && (
          <code className="mt-3 max-w-full overflow-x-auto rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
            {this.state.message}
          </code>
        )}
        <Button className="mt-5" onClick={() => window.location.reload()}>
          Ricarica l’app
        </Button>
      </div>
    );
  }
}
