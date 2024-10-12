import { RoutesHandler } from "@/services/commons/types/general";

import AdminsHandler from "./handler";

const routes = (handler: AdminsHandler): RoutesHandler[] => [
  {
    name: "Add new admin",
    method: "POST",
    path: "/v1/admins",
    handler: async (props) => await handler.postAdminUser(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Get List Admin",
    method: "GET",
    path: "/v1/admins",
    handler: async (props) => await handler.getAdminsUser(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Get Admin by ID",
    method: "GET",
    path: "/v1/admins/:id",
    handler: async (props) => await handler.getAdminUser(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Update Admin by ID",
    method: "PUT",
    path: "/v1/admins/:id",
    handler: async (props) => await handler.updateAdminUser(props),
    options: { middleware: ["authMiddleware"] },
  },
];

export default routes;
