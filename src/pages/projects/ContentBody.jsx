import st from "styles/projects.module.css";
import Cards from "./Cards";

export default function ContentBody({ projectData, setSelectedProject }) {
  return (
    <div className={`${st.cbContainer}`}>
      <div className={`${st.cbcInner}`}>
        <Cards
          projectData={projectData}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
}
