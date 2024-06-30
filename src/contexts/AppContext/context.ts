import { createContext } from "react";

import { AppContextProps } from "./type";

const AppContext = createContext<AppContextProps>({
  header: undefined,
  footer: undefined,
  setHeaderTemplate: () => {},
  setFooterTemplate() {},
});

export default AppContext;
