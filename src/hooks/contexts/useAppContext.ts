import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext/type";
import { useContext } from "react";

export default function useAppContext() {
  const ctxValue = useContext<AppContextProps>(AppContext);

  if (!ctxValue) {
    throw new Error("AppContext is not registered properly");
  }

  return ctxValue;
}
