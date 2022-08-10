import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import pc from "data/category.json";
import sm from "data/socmedList.json";
import langID from "data/langID.json";
import langEN from "data/langEN.json";

import Header from "pages/homepage/Header";
import Project from "pages/homepage/Project";
import Contact from "pages/homepage/Contact";
import WebHead from "components/Head";

import { firestore } from "utils/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { push } from "firebase/database";

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
  //Get Projects
  const projectCat = pc.data;
  let projects = [];
  projectCat
    .filter((cat) => {
      cat.isActive == true;
    })
    .forEach(async (cat) => {
      const snapshot = await getDocs(
        query(
          collection(firestore, "projects"),
          where("categoryId", "==", cat.id),
          orderBy("createdAt", "desc"),
          limit(6)
        )
      );
      projects.push(
        ...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  //Get Featured List
  const snapshot = await getDocs(
    query(
      collection(firestore, "projects"),
      where("isFeatured", "==", true),
      orderBy("createdAt", "desc"),
      limit(6)
    )
  );
  projects.push(...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //Conver to JSON
  projects = JSON.stringify([...new Set(projects)]);
  //Set Contact Data
  const contactData = sm.data;
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
  const [projectData, setProjectData] = useState([]);
  const router = useRouter();
  console.log(projectData);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (router.query.cat == undefined || router.query.cat == "featured") {
      setProjectData(
        JSON.parse(projects)
          .filter((project) => {
            return project.isFeatured == true;
          })
          .slice(0, 6)
      );
    } else {
      setProjectData(
        JSON.parse(projects).filter((project) => {
          return project.categoryId == router.query.cat;
        })
      );
    }
  }, [router.query.cat]);

  const {
    info,
    home: { header, project, contact },
  } = language;
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
        "Technology, Nextjs, Web Development, Full Stack Developer, Javascript, Open To work, Content Creator",
    },
    { name: "author", property: "", content: "Prasetya Ikra Priyadi" },
  ];
  return (
    <>
      <WebHead title="Welcome to Spinnovid" meta={meta} link={[]} />
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
