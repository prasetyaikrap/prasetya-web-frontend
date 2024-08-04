import {
  AccessControlProvider,
  AuthProvider,
  DataProvider,
  DataProviders,
  ResourceProps,
} from "@refinedev/core";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { UserProfileData } from "@/types";

export enum TemplateType {
  Header = "HEADER",
  Footer = "FOOTER",
}

export interface AppContextProps {
  refineProps: AppRefineProps;
  setResourceType: Dispatch<SetStateAction<ResourceType>>;
  setUserProfile: Dispatch<SetStateAction<UserProfileData | undefined>>;
  userProfile?: UserProfileData;
}

export interface AppRefineProps {
  dataProvider?: DataProvider | DataProviders;
  resources?: ResourceProps[];
  authProvider?: AuthProvider;
  accessControlProvider?: AccessControlProvider;
}

export enum ResourceType {
  Admin = "ADMIN",
  None = "NONE",
}
export interface AppProviderProps {
  children: ReactNode;
}
