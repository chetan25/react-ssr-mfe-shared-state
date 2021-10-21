import React from "react";

interface Props {
  appName: string;
}

interface State {
  error: any | null;
  errorInfo: any | null;
}

/**
 * Error boundaries do not catch errors inside event handlers.
 * React doesn't need error boundaries to recover from errors in event handlers.
 * Unlike the render method and lifecycle methods, the event handlers
 * don't happen during rendering.
 * So if they throw, React still knows what to display on the screen.
 *
 * Error boundaries do not catch errors for:
 * Event handlers
 * Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
 * Server-side rendering
 * Errors thrown in the error boundary itself (rather than its children)
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong in Rendering {this.props.appName}</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
