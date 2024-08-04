"use client";
import { createContext } from "react";

import { accessControlProvider, authProvider, dataProviders } from "@/libs";

import { AppContextProps } from "./type";

export const defaultRefineProps: AppContextProps["refineProps"] = {
  dataProvider: dataProviders,
  authProvider,
  accessControlProvider: accessControlProvider({ userProfiles: undefined }),
  resources: [],
};

const AppContext = createContext<AppContextProps>({
  refineProps: defaultRefineProps,
  setResourceType: () => {},
  setUserProfile: () => {},
  userProfile: undefined,
});

export default AppContext;
