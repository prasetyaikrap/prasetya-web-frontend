import AuthenticationsHandler, { AuthenticationsHandlerProps } from "./handler";
import routes from "./routes";

const authenticationClient = {
  name: "authentication",
  register: async (container: AuthenticationsHandlerProps) => {
    const authenticationHandler = new AuthenticationsHandler(container);
    return routes(authenticationHandler);
  },
};

export default authenticationClient;
