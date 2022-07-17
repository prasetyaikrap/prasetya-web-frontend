import ProjectCards from "components/ProjectCards"
import st from "styles/projects.module.css"

export default function ContentBody({projectData, isOpenState}) {
  return (
    <div className={`flex-column ${st.cbContainer}`}>
      <div className={`flex-row ${st.cbContent1st}`}>
        <ProjectCards projectData={projectData} rowsData={4}/>
      </div>
    </div>
  )
}