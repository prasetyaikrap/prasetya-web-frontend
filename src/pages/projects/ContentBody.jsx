import ProjectCards from "components/ProjectCard";
import st from "styles/projects.module.css";

export default function ContentBody({ projectData }) {
  return (
    <div className={`${st.cbContainer}`}>
      <div className={`${st.cbcInner}`}>
        <ProjectCards
          projectData={projectData}
          href={`/projects?pid=[PID]`}
          shallow={true}
          replace={true}
        />
      </div>
    </div>
  );
}
