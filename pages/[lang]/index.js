import { HomeV1 } from "components/Home";
import projCategory from "data/categoryList.json";
import socmedList from "data/socmedList.json";
import language from "data/language.json";
import langID from "data/langID.json";
import langEN from "data/langEN.json";

export async function getStaticPaths() {
  const paths = language.list.map((item) => {
    return { params: { lang: item.nameId } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let language = "";
  switch (params.lang) {
    case "id":
      language = langID.home;
      break;
    case "en":
      language = langEN.home;
      break;
    default:
      language = langID.home;
  }
  const projectData = [projCategory];
  const contactData = [socmedList];
  return {
    props: {
      language,
      projectData,
      contactData,
    },
    revalidate: 300,
  };
}

export default function Home({ language, projectData, contactData }) {
  return (
    <HomeV1
      language={language}
      projectData={projectData}
      contactData={contactData}
    />
  );
}
