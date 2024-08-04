"use client";
import { useContext } from "react";

import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext/type";

export default function useApp() {
  const ctxValue = useContext<AppContextProps>(AppContext);

  if (!ctxValue) {
    throw new Error("AppContext is not registered properly");
  }

  return ctxValue;
}
