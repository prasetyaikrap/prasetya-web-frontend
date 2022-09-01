import CatHeader from "pages/projects/CatHeader";
import ContentBody from "pages/projects/ContentBody";
import ProjectPreview from "pages/projects/ProjectsPreview";
import st from "styles/projects.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { openProject } from "utils/projectDashboard";
import { MainLayout } from "components/Layout";

export default function Projects({ propsData }) {
  const { lang, projectCat, projects } = propsData;
  const projectsJSON = JSON.parse(projects);
  const [project, setProject] = useState(projectsJSON);
  const [selectedProject, setSelectedProject] = useState([]);
  const [useLanguage, setUseLanguage] = useState(lang.en);
  //language
  const {
    info,
    project: { navbar },
  } = useLanguage;
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    switch (router.query.cat) {
      case undefined:
        break;
      case "all":
        setProject(projectsJSON);
        break;
      case "featured":
        setProject(
          projectsJSON.filter((item) => {
            return item.isFeatured == true;
          })
        );
        break;
      default:
        setProject(
          projectsJSON.filter((item) => {
            return item.categoryId == router.query.cat;
          })
        );
    }
  }, [router.query.cat]);
  useEffect(() => {
    if (router.query.pid) {
      const project = projectsJSON.filter((p) => {
        return p.id == router.query.pid;
      });
      if (router.query.ext) {
        setTimeout(() => {
          openProject(router.query.pid, project[0], setSelectedProject);
        }, 500);
      } else {
        openProject(router.query.pid, project[0], setSelectedProject);
      }
    } else {
      setSelectedProject([]);
    }
  }, [router.query.pid]);
  const headProps = {
    title: "Project Collection - Prasetya Ikra Priyadi",
    meta: [
      { name: "robots", property: "", content: "all" },
      {
        name: "description",
        content: "Prasetya Ikra Priyadi - Project Catalog",
      },
      {
        name: "keywords",
        content:
          "Technology, Nextjs, Web Development, Full Stack Developer, Data, Google Apps, Javascript, Open To work, Content Creator",
      },
      { name: "author", content: "Prasetya Ikra Priyadi" },
      {
        property: "og:url",
        content: "https://spinnovid.vercel.app/projects",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Project Collection - Prasetya Ikra Priyadi",
      },
      {
        property: "og:description",
        content:
          "Watch on my previous project and work. See if it will helps you out",
      },
      {
        property: "og:image",
        content: "https://spinnovid.vercel.app/assets/spinnovid.png",
      },
    ],
  };
  return (
    <>
      <MainLayout headProps={headProps} navbarProps={{ info, navbar }}>
        <section className={`${st.sectionProject}`}>
          <CatHeader projectCat={projectCat} />
          <ContentBody
            projectData={project}
            setSelectedProject={setSelectedProject}
          />
          <ProjectPreview data={selectedProject} />
        </section>
      </MainLayout>
    </>
  );
}
