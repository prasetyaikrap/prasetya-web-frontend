import type { CanReturnType } from "@refinedev/core";

import { UserProfileData } from "@/types";

export type EnforcerParams = {
  subject: string;
  action: string;
  object: string;
};

export type ClientAccessControlOptions = {
  excludeResources?: Record<string, CanReturnType>;
  bypass?: boolean;
};

export type ClientAccessControlProviderProps = {
  userProfiles?: UserProfileData;
  opts?: ClientAccessControlOptions;
};
