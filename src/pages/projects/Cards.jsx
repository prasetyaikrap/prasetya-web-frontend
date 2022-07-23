import st from "styles/projects.module.css";
import { openProject } from "utils/projectDashboard";

export default function Cards({ projectData, rows, setSelectedProject }) {
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
          <p id={st.pcSummary} className={`bodyText`}>
            {project.summary}
          </p>
        </button>
      );
    });
    if (projectData.length % rows !== 0) {
      for (let i = 1; i <= rows - (projectData.length % rows); i++) {
        cards.push(
          <button
            key={`empty${i}`}
            id="emptyCard"
            className={`${st.cardsProjectEmpty}`}
          ></button>
        );
      }
    }
    return cards;
  } catch (err) {
    return <h2>No project on selected category. Find another...</h2>;
  }
}
