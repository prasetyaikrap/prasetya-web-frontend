import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";

import projectCat from "data/categoryList.json";
import socmedList from "data/socmedList.json";
import langID from "data/langID.json";
import langEN from "data/langEN.json";
import languageList from "data/language.json";
import projects from "data/projects.json";

import Header from "compPages/homepage/Header";
import Project from "compPages/homepage/Project";
import Contact from "compPages/homepage/Contact";

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
  const contactData = [socmedList];
  return {
    props: {
      language,
      projectCat,
      projects,
      contactData,
    },
  };
}

export default function Home({ language, projectCat, projects, contactData }) {
  const [projectData, setProjectData] = useState(projects);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const category = router.query.category;
    let filteredData = [];
    switch (true) {
      case category === "featured" || category === undefined:
        filteredData = projects
          .filter((item) => {
            return item.isFeatured === true;
          })
          .slice(0, 6);
        setProjectData(filteredData);
        break;
      case category !== undefined:
        filteredData = projects
          .filter((item) => {
            return item.categoryId.toString() === category;
          })
          .slice(0, 6);
        setProjectData(filteredData);
        break;
      default:
    }
  }, [router.isReady, router.query.category, projects]);

  const {
    info,
    home: { header, project, contact },
  } = language;
  return (
    <>
      <Header language={{ info, header }} />
      <Project
        language={project}
        projectCat={projectCat}
        projectData={projectData}
      />
      <Contact language={contact} contactData={contactData} />
    </>
  );
}
