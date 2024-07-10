"use client";
import { useState } from "react";

import { HeaderTemplate } from "@/features/Header/type";

import AppContext from "./context";
import { AppContextProps, AppProviderProps, TemplateType } from "./type";

export default function AppProvider({
  children,
  defaultHeader,
  defaultFooter,
}: AppProviderProps) {
  const [headerTemplate, setHeaderTemplate] = useState(defaultHeader);
  const [footerTemplate, setFooterTemplate] = useState(defaultFooter);

  const setTemplate = (
    type: TemplateType,
    template: HeaderTemplate | string
  ) => {
    if (type === TemplateType.Header)
      return setHeaderTemplate(template as HeaderTemplate);
    if (type === TemplateType.Footer) return setFooterTemplate(template);
  };

  const value: AppContextProps = {
    header: headerTemplate,
    footer: footerTemplate,
    setHeaderTemplate: (template) => setTemplate(TemplateType.Header, template),
    setFooterTemplate: (template) => setTemplate(TemplateType.Footer, template),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
