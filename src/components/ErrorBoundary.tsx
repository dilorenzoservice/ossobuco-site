import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[Ossobuco] Errore non gestito:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="min-h-screen bg-osso-black flex items-center justify-center text-osso-parchment text-center px-4">
          <div>
            <p className="font-display text-2xl mb-3">Qualcosa è andato storto.</p>
            <a href="/" className="text-osso-amber underline text-sm hover:opacity-80">
              Ricarica la pagina
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
