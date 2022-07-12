import { HomeV1 } from "components/Home";
import projCategory from "data/categoryList.json";
import socmedList from "data/socmedList.json";
import langID from "data/langID.json";
import langEN from "data/langEN.json";
import languageList from "data/language.json";

export async function getStaticPaths() {
  const paths = languageList.list.map((item) => {
    return { params: { lang: item.nameId } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //Set Language
  let language = "";
  switch (params.lang) {
    case "id":
      language = langID;
      break;
    case "en":
      language = langEN;
      break;
    default:
      language = langID;
  }
  //Set Project Data
  const projectData = [projCategory];
  const contactData = [socmedList];
  return {
    props: {
      language,
      projectData,
      contactData,
    },
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
