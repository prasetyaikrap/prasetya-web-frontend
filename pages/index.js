import { HomeV1 } from "components/Home";
import { useRouter } from "next/router";
import langID from "data/langID.json";
import langEN from "data/langEN.json";
import pCL from "data/categoryList.json";
import { useEffect } from "react";

// export async function getStaticPaths() {
//   const availableLanguage = ["id", "en"];
//   const paths = availableLanguage.map((item) => {
//     return { params: { lang: item } };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }
export async function getServerSideProps(context) {
  const { query } = context;
  let prefLang = {};
  if (query.lang === "id" || query.lang === undefined) {
    prefLang = langID;
  } else {
    prefLang = langEN;
  }
  const projCategory = pCL.categoryList;
  return {
    props: {
      prefLang,
      projCategory,
    },
  };
}

export default function Home({ prefLang, projCategory }) {
  const router = useRouter();
  const query = router.query;
  useEffect(() => {
    if (query.lang === undefined) {
      router.push("/?lang=id");
    }
  });
  const homeLang = prefLang.home;
  return <HomeV1 language={homeLang} projCategory={projCategory} />;
}
