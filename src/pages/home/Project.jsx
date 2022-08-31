//Next and React
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
//Components
import CategoryList from "pages/home/CategoryList";
import st from "styles/home.module.css";
import ProjectCards from "components/ProjectCard";

function Cards({ projectData }) {
  const cards = projectData.map((item) => {
    return (
      <div key={item.id} id={item.id} className={`flex-column ${st.projCard}`}>
        <div className={`${st.pcImg}`}>
          <Image
            layout="fill"
            src={item.imageUrl}
            alt={item.title}
            objectFit="cover"
          />
        </div>
        <div className={`flex ${st.pcTitle}`}>
          <Link href={`/projects?pid=${item.id}`}>
            <h5 style={{ cursor: "pointer" }}>{item.title}</h5>
          </Link>
        </div>
      </div>
    );
  });
  return cards;
}
export default function Project({ language, projectCat, projectData }) {
  const router = useRouter();
  //Get Language Content
  const {
    headline,
    subheadline,
    icon: { url, alt },
    seeMore,
  } = language;

  //Render Page
  return (
    <section id="project" className={`${st.projectSection}`}>
      <div className={`${st.projBox1}`}>
        <div className={`${st.projHeadline}`}>
          <span className={`${st.projIcon}`}>
            <Image layout="fill" objectFit="cover" src={url} alt={alt} />
          </span>
          <h3>{headline}</h3>
          <p className={`smallText`}>{subheadline}</p>
        </div>
        <div className={`${st.projCategory}`}>
          <CategoryList projectCat={projectCat} />
        </div>
      </div>
      <div className={`${st.projBox2}`}>
        <div className={`${st.projGrid}`}>
          <ProjectCards
            projectData={projectData}
            href={`/projects?pid=[PID]&ext=true`}
          />
        </div>
        <button
          className={`${st.projSeeMore}`}
          onClick={(e) => window.open("/projects", "_blank")}
        >
          {seeMore}
        </button>
      </div>
    </section>
  );
}
