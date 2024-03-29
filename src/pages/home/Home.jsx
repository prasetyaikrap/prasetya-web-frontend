import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Project from "pages/home/Project";
import Contact from "pages/home/Contact";
import Profile from "pages/home/Profile";
import { MainLayout } from "components/Layout";

export default function Home({ propsData }) {
  const { lang, projectCat, projects, contacts } = propsData;
  const router = useRouter();
  const [projectData, setProjectData] = useState(
    JSON.parse(projects)
      .filter((project) => {
        return project.isFeatured == true;
      })
      .slice(0, 6)
  );
  const [useLanguage, setUseLanguage] = useState(lang.en);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    switch (router.query.cat) {
      case undefined:
        break;
      case "featured":
        setProjectData(
          JSON.parse(projects)
            .filter((project) => {
              return project.isFeatured == true;
            })
            .slice(0, 6)
        );
        break;
      default:
        setProjectData(
          JSON.parse(projects).filter((project) => {
            return project.categoryId == router.query.cat;
          })
        );
    }
  }, [router.query.cat, router.isReady]);

  const {
    info,
    home: { navbar, project, contact },
  } = useLanguage;
  const headProps = {
    title: "Welcome to Spinnovid - Prasetya Ikra Priyadi Website",
    meta: [
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
      {
        name: "description",
        content:
          "Prasetya Ikra Priyadi - Spinnovid - Home for technology enthusiast. Spinnovid is a simple Web app to present my works and projects as an online portfolio. Build with Next.js Framework, Plain CSS 3 as front end development, Firebase as a Backend development, and RestAPI with Google Script.",
      },
      {
        name: "keywords",
        content:
          "Technology, Nextjs, Web Development, Full Stack Developer, Javascript, Open To work, Content Creator",
      },
      {
        name: "author",
        content: "Prasetya Ikra Priyadi",
      },
      {
        property: "og:url",
        content: "https://spinnovid.vercel.app/",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Welcome to Spinnovid - Prasetya Ikra Priyadi Website",
      },
      {
        property: "og:description",
        content:
          "Prasetya Ikra Priyadi - Spinnovid - Home for technology enthusiast. Spinnovid is a simple Web app to present my works and projects as an online portfolio. Build with Next.js Framework, Plain CSS 3 as front end development, Firebase as a Backend development, and RestAPI with Google Script.",
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
        <Profile />
        <Project
          language={project}
          projectCat={projectCat}
          projectData={projectData}
        />
        <Contact language={contact} contactData={contacts} />
      </MainLayout>
    </>
  );
}
