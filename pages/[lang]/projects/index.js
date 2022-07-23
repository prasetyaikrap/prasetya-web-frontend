import langID from "data/langID";
import langEN from "data/langEN";
import projectCat from "data/categoryList.json";
import projects from "data/projects.json";

import Navbar from "components/Navbar";
import CatHeader from "pages/projects/CatHeader";
import ContentBody from "pages/projects/ContentBody";
import ProjectPreview from "pages/projects/ProjectsPreview";
import st from "styles/projects.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = ["id", "en"].map((item) => {
    return { params: { lang: item } };
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
  //selected project data for Project Preview
  const projectDefault = {
    id: 0,
    categoryId: 2,
    author: "Prasetya Ikra Priyadi",
    createdAt: "2022-07-01T00:00:00.000Z",
    lastUpdate: "2022-07-01T00:00:00.000Z",
    title: "Programming 2",
    summary: "Summary",
    description: "Description",
    image: ["img1"],
    publishedAt: "2022-03-01T00:00:00.000Z",
    tags: ["tags1", "tags2", "tags3"],
    isFeatured: false,
  };
  const [selectedProject, setSelectedProject] = useState(projectDefault);
  return (
    <section className={`${st.sectionProject}`}>
      <Navbar language={[info, nav, navBtn]} page="projectpage" />
      <CatHeader projectCat={projectCat} />
      <ContentBody
        projectData={project}
        setSelectedProject={setSelectedProject}
      />
      <ProjectPreview data={selectedProject} />
    </section>
  );
}
