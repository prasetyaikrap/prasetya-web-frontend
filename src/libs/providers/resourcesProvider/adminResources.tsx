import { ResourceProps } from "@refinedev/core";
import { MdDashboard, MdNote } from "react-icons/md";

export const adminResources: ResourceProps[] = [
  {
    name: "dashboard",
    list: "/admin/dashboard",
    meta: {
      label: "Dashboard",
      icon: <MdDashboard />,
    },
  },
  {
    name: "test",
    list: "/admin/test",
    meta: {
      label: "Test",
      icon: <MdNote />,
    },
  },
];
