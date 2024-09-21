import AuthenticationsHandler, { AuthenticationsHandlerProps } from "./handler";
import routes from "./routes";

export default {
  name: "authentication",
  register: async (container: AuthenticationsHandlerProps) => {
    const authenticationHandler = new AuthenticationsHandler(container);
    return routes(authenticationHandler);
  },
};
