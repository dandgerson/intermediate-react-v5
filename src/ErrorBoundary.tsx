import { Component, ErrorInfo, ReactElement } from "react";

type Props = {
  renderErrorContent: () => ReactElement | string;
  children: ReactElement;
};

export class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // typically you would like to log this to something like TrackJS or NewRelic
    console.error("ErrorBoundary component caught the error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderErrorContent();
    }

    return this.props.children;
  }
}
