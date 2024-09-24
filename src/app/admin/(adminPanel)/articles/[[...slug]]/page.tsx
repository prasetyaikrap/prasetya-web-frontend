import { match, P } from "ts-pattern";

import {
  ArticleCreate,
  ArticleEdit,
  ArticleList,
  ArticleShow,
} from "@/features/Admin/Articles";
import { PageProps } from "@/types";

export default function Page({ params: { slug } }: PageProps) {
  return match(slug)
    .with(P.nullish, () => <ArticleList />)
    .with(["create"], () => <ArticleCreate />)
    .with(["show", P.string], () => <ArticleShow />)
    .with(["edit", P.string], () => <ArticleEdit />)
    .otherwise(() => <div>Not Found</div>);
}
