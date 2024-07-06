export enum HeaderTemplate {
  Default = "DEFAULT",
  Primary = "PRIMARY",
  Dashboard = "DASHBOARD",
  Profile = "PROFILE",
}

export interface NavigationOption {
  name: string;
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface NavbarBoxProps {
  navOption: NavigationOption[];
}

export interface NavbarDrawerProps {
  navOption: NavigationOption[];
}
