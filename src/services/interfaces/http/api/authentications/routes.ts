import { RoutesHandler } from "@/services/commons/types/general";
import AuthenticationsHandler from "./handler";

const routes = (handler: AuthenticationsHandler): RoutesHandler[] => [
  {
    method: "POST",
    path: "/v1/authentications",
    handler: async (props) => await handler.postAdminAuthentications(props),
  },
];

export default routes;
