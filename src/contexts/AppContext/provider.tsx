"use client";

import { useMemo, useState } from "react";
import { match } from "ts-pattern";

import { accessControlProvider, adminResources } from "@/libs";
import { UserProfileData } from "@/types";

import AppContext, { defaultRefineProps } from "./context";
import { AppContextProps, AppProviderProps, ResourceType } from "./type";

export default function AppProvider({ children }: AppProviderProps) {
  const [resourceType, setResourceType] = useState<ResourceType>(
    ResourceType.None
  );
  const [userProfile, setUserProfile] = useState<UserProfileData | undefined>(
    undefined
  );

  const generateRefineProps = (
    type: ResourceType,
    profiles?: UserProfileData
  ) => {
    const accessControlProviders = accessControlProvider({
      userProfiles: profiles,
      opts: {
        bypass: true,
      },
    });

    return match(type)
      .with(ResourceType.Admin, () => ({
        ...defaultRefineProps,
        accessControlProvider: accessControlProviders,
        resources: adminResources,
      }))
      .otherwise(() => defaultRefineProps);
  };

  const value: AppContextProps = useMemo(() => {
    const refineProps = generateRefineProps(resourceType, userProfile);
    return {
      refineProps,
      setResourceType,
      setUserProfile,
      userProfile,
    };
  }, [resourceType, userProfile]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
