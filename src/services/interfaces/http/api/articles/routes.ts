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
  {
    name: "Update article by ID",
    method: "PUT",
    path: "/v1/articles/:id",
    handler: async (props) => await handler.putArticleById(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Get list article",
    method: "GET",
    path: "/v1/articles",
    handler: async (props) => await handler.getArticles(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Get article by ID or slug",
    method: "GET",
    path: "/v1/articles/:id",
    handler: async (props) => await handler.getArticleByIdOrSlug(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Update Article Status",
    method: "PUT",
    path: "/v1/articles/:id/status",
    handler: async (props) => await handler.putArticleStatusById(props),
    options: { middleware: ["authMiddleware"] },
  },
  {
    name: "Delete article by ID",
    method: "DELETE",
    path: "/v1/articles/:id",
    handler: async (props) => await handler.deleteArticleById(props),
    options: { middleware: ["authMiddleware"] },
  },

  // Public
  {
    name: "Get list article (public)",
    method: "GET",
    path: "/v1/public/articles",
    handler: async (props) => await handler.getArticles(props),
  },
  {
    name: "Get article by id or slug (public)",
    method: "GET",
    path: "/v1/public/articles/:id",
    handler: async (props) => await handler.getArticleByIdOrSlug(props),
  },
];

export default routes;
