import { Component, type ErrorInfo, type ReactNode } from 'react';
import { mapError } from './mapError';

type Props = {
  children: ReactNode;
};

type State = {
  error: unknown | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error('ErrorBoundary', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.error) {
      const mapped = mapError(this.state.error);
      return (
        <div className="banner" role="alert">
          <strong>{mapped.title}</strong>
          <p>{mapped.message}</p>
          <p className="muted">Código: {mapped.code}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
