import ProjectHome from "components/ProjectHome";
import languageList from "data/language.json";
import langID from "data/langID";
import langEN from "data/langEN";

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
  let language = "";
  switch (params.lang) {
    case "id":
      language = langID;
      break;
    case "en":
      language = langEN;
      break;
    default:
  }

  return {
    props: {
      language,
    },
  };
}

export default function Project({ language }) {
  return <ProjectHome language={language} />;
}
