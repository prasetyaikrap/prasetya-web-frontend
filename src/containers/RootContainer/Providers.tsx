"use client";
import "@fontsource-variable/inter";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { ErrorBoundary } from "@/components";
import { colorScheme } from "@/configs";
import { AppProvider } from "@/contexts";

import RefineProviders from "./RefineProvider";
import { ProvidersProps } from "./type";

export default function Providers({ children }: ProvidersProps) {
  const customTheme = extendTheme({
    fonts: {
      body: "'Inter Variable', sans-serif",
    },
    colors: {
      brand: colorScheme.navy,
      primary: colorScheme.navy,
      ...colorScheme,
    },
    components: {
      Button: {
        defaultProps: {
          colorScheme: "brand",
        },
      },
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
