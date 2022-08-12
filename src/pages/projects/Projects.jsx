import Navbar from "components/Navbar";
import CatHeader from "pages/projects/CatHeader";
import ContentBody from "pages/projects/ContentBody";
import ProjectPreview from "pages/projects/ProjectsPreview";
import WebHead from "components/Head";
import st from "styles/projects.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { openProject } from "utils/projectDashboard";

export default function Projects({ propsData }) {
  const { language, pCategory, projects } = propsData;
  const projectsJSON = JSON.parse(projects);
  const [project, setProject] = useState(projectsJSON);
  const [selectedProject, setSelectedProject] = useState([]);
  const [useLanguage, setUseLanguage] = useState(language[1]);
  //language
  const {
    info,
    project: {
      header: { nav, navBtn },
    },
  } = useLanguage;
  const router = useRouter();
  useEffect(() => {
    if (!router.query.lang) {
      const userLanguage = window.navigator.language;
      switch (userLanguage.substring(0, 2)) {
        case "id":
          router.replace("/projects/?lang=id", undefined, { shallow: true });
          break;
        case "en":
          router.replace("/projects/?lang=en", undefined, { shallow: true });
          break;
        default:
          router.replace("/projects/?lang=id", undefined, { shallow: true });
      }
    }
    if (router.query.lang) {
      setUseLanguage(
        language.filter((lang) => {
          return lang.info.code == router.query.lang;
        })[0]
      );
    }
  }, [router.query.lang]);
  useEffect(() => {
    const category = router.query.cat;
    switch (true) {
      case category == "all" || category == undefined:
        setProject(projectsJSON);
        break;
      case category == "featured":
        setProject(
          projectsJSON.filter((item) => {
            return item.isFeatured == true;
          })
        );
        break;
      case category != undefined:
        setProject(
          projectsJSON.filter((item) => {
            return item.categoryId == category;
          })
        );
        break;
      default:
    }
  }, [router.query.cat]);
  useEffect(() => {
    const pid = router.query.pid;
    if (pid) {
      const project = projectsJSON.filter((p) => {
        return p.id == pid;
      });
      setTimeout(() => {
        openProject(pid, project[0], setSelectedProject);
      }, 500);
    }
  }, [router.query.pid]);
  //selected project data for Project Preview
  const meta = [
    { name: "robots", property: "", content: "all" },
    {
      name: "description",
      property: "",
      content:
        "Prasetya Ikra Priyadi - Spinnovid - Home for technology enthusiast",
    },
    {
      name: "keywords",
      property: "",
      content:
        "Technology, Nextjs, Web Development, Full Stack Developer, Data, Google Apps, Javascript, Open To work, Content Creator",
    },
    { name: "author", property: "", content: "Prasetya Ikra Priyadi" },
  ];
  return (
    <>
      <WebHead
        title="Project Collection - Prasetya Ikra Priyadi"
        meta={meta}
        link={[]}
      />
      <section className={`${st.sectionProject}`}>
        <Navbar language={[info, nav, navBtn]} page="projectpage" />
        <CatHeader projectCat={pCategory} />
        <ContentBody
          projectData={project}
          setSelectedProject={setSelectedProject}
        />
        <ProjectPreview data={selectedProject} setData={setSelectedProject} />
      </section>
    </>
  );
}
