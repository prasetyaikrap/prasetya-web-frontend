import { Metadata } from "next";
import { match, P } from "ts-pattern";

import {
  ArticleCreate,
  ArticleEdit,
  ArticleList,
  ArticleShow,
} from "@/features/Admin/Articles";
import { GenerateMetadataProps, PageProps } from "@/types";

export async function generateMetadata({
  params: { slug },
}: GenerateMetadataProps): Promise<Metadata> {
  const pageMeta: Metadata | undefined = match(slug)
    .with(P.nullish, () => ({ title: "Articles - Prasetya Priyadi" }))
    .with(["create"], () => ({
      title: "Create New Article - Prasetya Priyadi",
    }))
    .with(["edit", P.string], () => ({
      title: "Edit Article - Prasetya Priyadi",
    }))
    .with(["show", P.string], () => ({
      title: "Article - Prasetya Priyadi",
    }))
    .otherwise(() => undefined);

  return {
    robots: {
      index: false,
      follow: false,
    },
    ...pageMeta,
  };
}

export default function Page({ params: { slug } }: PageProps) {
  return match(slug)
    .with(P.nullish, () => <ArticleList />)
    .with(["create"], () => <ArticleCreate />)
    .with(["show", P.string], () => <ArticleShow />)
    .with(["edit", P.string], () => <ArticleEdit />)
    .otherwise(() => <div>Not Found</div>);
}
