import { StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

import { FooterTemplate } from "@/features/Footer/type";
import { HeaderTemplate } from "@/features/Header/type";

export interface RootContainerLayoutProps {
  children: ReactNode;
  header?: HeaderTemplate;
  footer?: FooterTemplate;
}

export interface BodyContainerProps {
  children: ReactNode;
  chakra?: StackProps;
}
