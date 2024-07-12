"use client";
import { createContext } from "react";

import { dataProviders } from "@/libs";

import { AppContextProps } from "./type";

const AppContext = createContext<AppContextProps>({
  refineProps: {
    dataProvider: dataProviders,
    authProvider: undefined,
    accessControlProvider: undefined,
    resources: [],
  },
  setResourceType: () => {},
});

export default AppContext;
