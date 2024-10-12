import { ResourceProps } from "@refinedev/core";
import { FaUsers, FaUsersGear, FaUserShield } from "react-icons/fa6";
import { MdArticle, MdDashboard } from "react-icons/md";

export const adminResources: ResourceProps[] = [
  {
    name: "admin-dashboard",
    list: "/admin",
    meta: {
      label: "Dashboard",
      icon: <MdDashboard />,
    },
  },
  {
    name: "admin-articles",
    list: "/admin/articles",
    show: "/admin/articles/:id",
    edit: "/admin/articles/:id/edit",
    meta: {
      label: "Articles",
      icon: <MdArticle />,
    },
  },
  {
    name: "admin-accounts",
    meta: {
      label: "Accounts",
      icon: <FaUsersGear />,
    },
  },
  {
    name: "admin-accounts-users",
    list: "/admin/accounts/users",
    meta: {
      label: "Users",
      icon: <FaUsers />,
      parent: "admin-accounts",
    },
  },
  {
    name: "admin-accounts-permissions",
    list: "/admin/accounts/permissions",
    meta: {
      label: "Permissions",
      icon: <FaUserShield />,
      parent: "admin-accounts",
    },
  },
];
