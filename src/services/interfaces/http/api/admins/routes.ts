import { RoutesHandler } from "@/services/commons/types/general";

import AdminsHandler from "./handler";

const routes = (handler: AdminsHandler): RoutesHandler[] => [
  {
    name: "Add new admin",
    method: "POST",
    path: "/v1/admins",
    handler: async (props) => await handler.postAdminUser(props),
  },
];

export default routes;
