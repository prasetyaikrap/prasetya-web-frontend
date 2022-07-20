import ProjectCards from "components/ProjectCards";
import st from "styles/projects.module.css";
import Cards from "./Cards";

export default function ContentBody({ projectData, setSelectedProject }) {
  return (
    <div className={`flex-column ${st.cbContainer}`}>
      <div className={`flex-row ${st.cbContent1st}`}>
        <Cards
          projectData={projectData}
          rows={4}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
}
