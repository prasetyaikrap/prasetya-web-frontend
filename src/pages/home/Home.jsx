import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Project from "pages/home/Project";
import Contact from "pages/home/Contact";
import Profile from "pages/home/Profile";
import WebHead from "components/Head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export default function Home({ propsData }) {
  const { language, pCategory, projects, socmed } = propsData;
  const router = useRouter();
  const [projectData, setProjectData] = useState([]);
  const [useLanguage, setUseLanguage] = useState(language[1]);
  //Render onMount
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!router.query.lang) {
      const userLanguage = window.navigator.language;
      switch (userLanguage.substring(0, 2)) {
        case "id":
          router.replace("/?lang=id", undefined, { shallow: true });
          break;
        case "en":
          router.replace("/?lang=en", undefined, { shallow: true });
          break;
        default:
          router.replace("/?lang=id", undefined, { shallow: true });
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
  } = useLanguage;
  const meta = [
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    {
      name: "description",
      property: "og:description",
      content:
        "Prasetya Ikra Priyadi - Spinnovid - Home for technology enthusiast",
    },
    {
      name: "keywords",
      property: "og:keywords",
      content:
        "Technology, Nextjs, Web Development, Full Stack Developer, Javascript, Open To work, Content Creator",
    },
    { name: "author", property: "og:author", content: "Prasetya Ikra Priyadi" },
  ];
  return (
    <>
      <WebHead
        title="Welcome to Spinnovid - Prasetya Ikra Priyadi Website"
        meta={meta}
      />
      <Navbar metadata={{ info, header }} />
      <Profile />
      <Project
        language={project}
        projectCat={pCategory}
        projectData={projectData}
      />
      <Contact language={contact} contactData={socmed} />
      <Footer />
    </>
  );
}
