import { Flex, Heading, Text } from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from "react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./type";

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // eslint-disable-next-line no-console
      console.error({
        error: this.state.error?.message,
        stack: this.state.info?.componentStack,
      });
      return (
        <Flex
          width="100vw"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h3" size="md">
            Sorry, Something went wrong 🙏
          </Heading>
          <Text>Comeback later, We will back soon...</Text>
        </Flex>
      );
    }
    return this.props.children;
  }
}
