import { ReactNode } from "react";

import { HeaderTemplate } from "@/components/Header/type";

export enum TemplateType {
  Header = "HEADER",
  Footer = "FOOTER",
}

export interface AppContextProps {
  header?: HeaderTemplate;
  setHeaderTemplate: (template: HeaderTemplate) => void;
  footer?: string;
  setFooterTemplate: (template: string) => void;
}

export interface AppProviderProps {
  children: ReactNode;
  defaultHeader?: HeaderTemplate;
  defaultFooter?: string;
}
