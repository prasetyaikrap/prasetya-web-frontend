"use client";
import { ChakraProvider } from "@chakra-ui/react";

import { ErrorBoundary } from "@/components";
import { AppProvider } from "@/contexts";

import RefineProviders from "./RefineProvider";
import { ProvidersProps } from "./type";

export default function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProvider>
      <ErrorBoundary>
        <AppProvider>
          <RefineProviders>{children}</RefineProviders>
        </AppProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
