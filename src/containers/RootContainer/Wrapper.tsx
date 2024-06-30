"use client";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { RootContainerLayoutProps, RootContainerWrapperProps } from "./type";
import { ErrorBoundary, Header } from "@/components";
import { AppProvider } from "@/contexts";
import { HeaderTemplate } from "@/components/Header/type";
import Layout from "./Layout";

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
