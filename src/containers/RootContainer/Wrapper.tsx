"use client";
import { ChakraProvider } from "@chakra-ui/react";

import { ErrorBoundary } from "@/components";
import { HeaderTemplate } from "@/components/Header/type";
import { AppProvider } from "@/contexts";

import Layout from "./Layout";
import { RootContainerWrapperProps } from "./type";

export default function Wrapper({ children }: RootContainerWrapperProps) {
  return (
    <ChakraProvider>
      <ErrorBoundary>
        <AppProvider defaultHeader={HeaderTemplate.Primary}>
          <Layout>{children}</Layout>
        </AppProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
