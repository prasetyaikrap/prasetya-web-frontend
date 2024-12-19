import { RoutesHandler } from "@/services/commons/types/general";

import ArticlesHandler from "./handler";

const routes = (handler: ArticlesHandler): RoutesHandler[] => [
  {
    name: "Create new article",
    method: "POST",
    path: "/v1/articles",
    handler: async (props) => await handler.postArticle(props),
    options: { middleware: ["authMiddleware"] },
  },
];

export default routes;
