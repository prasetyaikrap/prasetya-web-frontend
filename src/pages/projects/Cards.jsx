import st from "styles/projects.module.css";
import { openProject } from "utils/projectDashboard";

export default function Cards({ projectData, setSelectedProject }) {
  try {
    const cards = projectData.map((project) => {
      return (
        <button
          key={project.id}
          id={project.id}
          className={`flex-column ${st.cardsProject}`}
          onClick={(e) =>
            openProject(e.currentTarget.id, project, setSelectedProject)
          }
        >
          <h4 id={st.pcTitle}>{project.title}</h4>
          <div id={st.pcTags} className={`flex-row`}>
            {project.tags.map((tag) => {
              return <span key={tag}>{tag}</span>;
            })}
          </div>
          <p id={st.pcSummary} className={`smallText`}>
            {project.description}
          </p>
        </button>
      );
    });
    return cards;
  } catch (err) {
    return <h2>No project on selected category. Find another...</h2>;
  }
}
