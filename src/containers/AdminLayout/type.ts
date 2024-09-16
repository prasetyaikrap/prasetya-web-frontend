import { ITreeMenu, TitleProps, useLink } from "@refinedev/core";
import { FC, ReactNode } from "react";

export type AdminLayoutProps = {
  children: ReactNode;
};

export type ThemedLayoutProps = {
  children: ReactNode;
};

export type SiderProps = {
  Title: FC<TitleProps>;
  activeItemDisabled?: boolean;
  collapsed: boolean;
  isSmallScreen: boolean;
  toggleCollapsed: (status?: boolean) => void;
};

export type TreeViewProps = {
  defaultOpenKeys: string[];
  selectedKey: string;
  menuItems: ITreeMenu[];
  activeItemDisabled?: boolean;
  collapsed: boolean;
  Link: ReturnType<typeof useLink>;
};
