"use client";

import { useEffect, useMemo, useState } from "react";

import { adminResources, dataProviders } from "@/libs";

import AppContext from "./context";
import { AppContextProps, AppProviderProps, ResourceType } from "./type";

export default function AppProvider({ children }: AppProviderProps) {
  const [resourceType, setResourceType] = useState<ResourceType>(
    ResourceType.None
  );

  const [refineProps, setRefineProps] = useState<
    AppContextProps["refineProps"]
  >({
    dataProvider: dataProviders,
    authProvider: undefined,
    accessControlProvider: undefined,
    resources: [],
  });

  const handleRefineProps = (type: ResourceType) => {
    switch (type) {
      case ResourceType.Admin:
        return setRefineProps((prev) => ({
          ...prev,
          resources: adminResources,
          authProvider: undefined,
          accessControlProvider: undefined,
        }));
      default:
        return setRefineProps((prev) => ({
          ...prev,
          resources: [],
          authProvider: undefined,
          accessControlProvider: undefined,
        }));
    }
  };

  const value: AppContextProps = useMemo(
    () => ({
      refineProps,
      setResourceType,
    }),
    [refineProps]
  );

  useEffect(() => {
    handleRefineProps(resourceType);
  }, [resourceType]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
