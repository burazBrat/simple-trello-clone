import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | undefined;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error,
    };
  }
  componentDidCatch(error: Error) {
    console.log(error.toString());
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.state?.error?.message) return <h1>{this.state.error.message}</h1>;

    return <h1>Something went wrong</h1>;
  }
}
