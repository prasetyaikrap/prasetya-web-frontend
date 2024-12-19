import ArticlesHandler, { ArticlesHandlerProps } from "./handler";
import routes from "./routes";

const articles = {
  name: "articles",
  register: async (container: ArticlesHandlerProps) => {
    const articlesHandler = new ArticlesHandler(container);
    return routes(articlesHandler);
  },
};

export default articles;
