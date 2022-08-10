import langID from "data/langID";
import langEN from "data/langEN";
import pc from "data/category.json";

import Navbar from "components/Navbar";
import CatHeader from "pages/projects/CatHeader";
import ContentBody from "pages/projects/ContentBody";
import ProjectPreview from "pages/projects/ProjectsPreview";
import WebHead from "components/Head";
import st from "styles/projects.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "utils/firebaseConfig";
import { openProject } from "utils/projectDashboard";

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

  //Get Project
  const projectCat = pc.data;
  const snapshots = await getDocs(
    query(collection(firestore, "projects"), orderBy("createdAt", "desc"))
  );
  const projects = JSON.stringify([
    ...snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ]);
  return {
    props: {
      language,
      projectCat,
      projects,
    },
  };
}

export default function Project({ language, projectCat, projects }) {
  //convert projects to object
  projects = JSON.parse(projects);
  const [project, setProject] = useState(projects);
  const [selectedProject, setSelectedProject] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const category = router.query.cat;
    switch (true) {
      case category === "all" || category === undefined:
        setProject(projects);
        break;
      case category === "featured":
        setProject(
          projects.filter((item) => {
            return item.isFeatured === true;
          })
        );
        break;
      case category !== undefined:
        setProject(
          projects.filter((item) => {
            return item.categoryId.toString() === category;
          })
        );
        break;
      default:
    }
  }, [router.isReady, router.query.cat]);
  //language
  const {
    info,
    project: {
      header: { nav, navBtn },
    },
  } = language;
  useEffect(() => {
    const pid = router.query.pid;
    if (pid) {
      const project = projects.filter((p) => {
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
        <CatHeader projectCat={projectCat} />
        <ContentBody
          projectData={project}
          setSelectedProject={setSelectedProject}
        />
        <ProjectPreview data={selectedProject} setData={setSelectedProject} />
      </section>
    </>
  );
}
