import languageList from "data/language.json";
import langID from "data/langID";
import langEN from "data/langEN";
import projectCat from "data/categoryList.json";
import projects from "data/projects.json";

import Navbar from "components/Navbar";
import CatHeader from "pages/projects/CatHeader";
import ContentBody from "pages/projects/ContentBody";
import ProjectShowcase from "pages/projects/ProjectsShowcase";
import st from "styles/projects.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TestButton from "components/TestButton";
import { openProject } from "utils/Handler";

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
      projectCat,
      projects,
    },
  };
}

export default function Project({ language, projectCat, projects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(projects);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const category = router.query.category;
    let filteredData = [];
    switch (true) {
      case category === "all" || category === undefined:
        setProject(projects);
        break;
      case category === "featured":
        filteredData = projects.filter((item) => {
          return item.isFeatured === true;
        });
        setProject(filteredData);
        break;
      case category !== undefined:
        filteredData = projects.filter((item) => {
          return item.categoryId.toString() === category;
        });
        setProject(filteredData);
        break;
      default:
    }
  }, [router.isReady, router.query.category, projects]);
  //language
  const {
    info,
    project: {
      header: { nav, navBtn },
    },
  } = language;

  return (
    <section className={`${st.sectionProject}`}>
      <Navbar language={[info, nav, navBtn]} page="projectpage" />
      <CatHeader projectCat={projectCat} />
      <ContentBody projectData={project} isOpenState={[isOpen, setIsOpen]} />
      <ProjectShowcase isOpenState={[isOpen, setIsOpen]} />
      <TestButton
        handler={(e) => openProject([isOpen, setIsOpen], st.cbContent2ndOpen)}
        position={{ top: "1vw", left: "3vw" }}
        name="Open Project Showcase"
      />
    </section>
  );
}
