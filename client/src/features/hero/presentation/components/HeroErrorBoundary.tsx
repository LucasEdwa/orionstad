import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class HeroErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Hero] Render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-screen flex items-center justify-center bg-black">
          <div className="text-center text-white/80">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
