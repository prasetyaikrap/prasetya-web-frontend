import { useNotificationProvider } from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { useCallback } from "react";

import { useApp } from "@/hooks";

import { RefineProvidersProps } from "./type";

export default function RefineProviders({ children }: RefineProvidersProps) {
  const { refineProps } = useApp();

  const RefineRenders = useCallback(() => {
    const { dataProvider, authProvider, accessControlProvider, resources } =
      refineProps;
    return (
      <Refine
        dataProvider={dataProvider}
        routerProvider={routerProvider}
        authProvider={authProvider}
        accessControlProvider={accessControlProvider}
        notificationProvider={useNotificationProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
        }}
      >
        {children}
      </Refine>
    );
  }, [children, refineProps]);

  return <RefineRenders />;
}
