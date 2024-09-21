import { RoutesHandler } from "@/services/commons/types/general";
import AuthenticationsHandler from "./handler";

const routes = (handler: AuthenticationsHandler): RoutesHandler[] => [
  {
    name: "Login Admin",
    method: "POST",
    path: "/v1/authentications",
    handler: async (props) => await handler.postAdminAuthentications(props),
  },
  {
    name: "Verify Admin",
    method: "GET",
    path: "/v1/authentications",
    handler: async (props) => await handler.getAdminAuthentication(props),
  },
  {
    name: "Renew accessToken for Admin",
    method: "PUT",
    path: "/v1/authentications",
    handler: async (props) => await handler.putAdminAuthentication(props),
  },
  {
    name: "Logout Admin",
    method: "DELETE",
    path: "/v1/authentications",
    handler: async (props) => await handler.deleteAdminAuthentication(props),
  },
];

export default routes;
