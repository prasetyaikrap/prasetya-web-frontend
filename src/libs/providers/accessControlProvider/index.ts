"use client";
import { type CanParams, type CanReturnType } from "@refinedev/core";

import type { ClientAccessControlProviderProps } from "./type";
import { casbinEnforcer } from "./utils";

export function accessControlProvider({
  userProfiles,
  opts,
}: ClientAccessControlProviderProps) {
  return {
    can: async ({
      resource,
      params,
      action,
    }: CanParams): Promise<CanReturnType> => {
      if (opts?.bypass) {
        return Promise.resolve({ can: false });
      }

      if (!params || !userProfiles?.email) {
        return {
          can: false,
          reason: "Unaothorized",
        };
      }

      const { email, permissions } = userProfiles;
      const targetResource = params?.resource?.identifier ?? resource ?? "";
      const excludeResources = opts?.excludeResources || {};
      const excludeResourceKeys = Object.keys(excludeResources);

      if (
        excludeResources[targetResource] &&
        excludeResourceKeys.includes(targetResource)
      ) {
        return Promise.resolve(excludeResources[targetResource]);
      }

      const isCan = await casbinEnforcer(permissions, {
        subject: email,
        object: targetResource,
        action,
      });

      return Promise.resolve({ can: isCan });
    },
  };
}
