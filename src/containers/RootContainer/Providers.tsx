"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { ErrorBoundary } from "@/components";
import { colorScheme } from "@/configs";
import { AppProvider } from "@/contexts";

import RefineProviders from "./RefineProvider";
import { ProvidersProps } from "./type";

export default function Providers({ children }: ProvidersProps) {
  const customTheme = extendTheme({
    colors: {
      brand: colorScheme.navy,
      primary: colorScheme.navy,
      ...colorScheme,
    },
  });
  return (
    <ChakraProvider theme={customTheme}>
      <ErrorBoundary>
        <AppProvider>
          <RefineProviders>{children}</RefineProviders>
        </AppProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
