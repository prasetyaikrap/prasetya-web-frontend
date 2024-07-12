import { useNotificationProvider } from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";

import { useApp } from "@/hooks";

import { RefineProvidersProps } from "./type";

export default function RefineProviders({ children }: RefineProvidersProps) {
  const {
    refineProps: {
      dataProvider,
      authProvider,
      accessControlProvider,
      resources,
    },
  } = useApp();

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
}
