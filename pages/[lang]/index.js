import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import projectCat from "data/categoryList.json";
import socmedList from "data/socmedList.json";
import langID from "data/langID.json";
import langEN from "data/langEN.json";

import Header from "pages/homepage/Header";
import Project from "pages/homepage/Project";
import Contact from "pages/homepage/Contact";
import WebHead from "components/Head";

import { firestore } from "utils/firebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { stringify } from "@firebase/util";

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
  const snapshot = await getDocs(
    query(collection(firestore, "projects"), orderBy("createdAt", "desc"))
  );
  const projects = JSON.stringify([
    ...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ]);
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
  const [projectData, setProjectData] = useState(JSON.parse(projects));
  console.log(projectData);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const category = router.query.cat;
    let filteredData = [];
    switch (true) {
      case category === "featured" || category === undefined:
        filteredData = JSON.parse(projects)
          .filter((item) => {
            return item.isFeatured === true;
          })
          .slice(0, 6);
        setProjectData(filteredData);
        break;
      case category !== undefined:
        filteredData = JSON.parse(projects)
          .filter((item) => {
            return item.categoryId === category;
          })
          .slice(0, 6);
        setProjectData(filteredData);
        break;
      default:
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
