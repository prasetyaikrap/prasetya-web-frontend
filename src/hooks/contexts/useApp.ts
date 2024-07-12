"use client";
import { useContext } from "react";

import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext/type";

import { UseAppProps } from "./type";

export default function useApp(props?: UseAppProps) {
  const ctxValue = useContext<AppContextProps>(AppContext);

  if (!ctxValue) {
    throw new Error("AppContext is not registered properly");
  }

  if (props?.resourceType) {
    ctxValue.setResourceType(props.resourceType);
  }

  return ctxValue;
}
