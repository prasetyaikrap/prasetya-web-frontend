import AdminsHandler, { AdminsHandlerProps } from "./handler";
import routes from "./routes";

const admins = {
  name: "administrator",
  register: async (container: AdminsHandlerProps) => {
    const adminsHandler = new AdminsHandler(container);
    return routes(adminsHandler);
  },
};

export default admins;
