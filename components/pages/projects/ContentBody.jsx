import CrossBtn from "misc/CrossBtn"
import { closeProject } from "components/utils/Handler"
import Tags from "compPages/projects/Tags"
import ProjectCards from "components/ProjectCards"
import st from "styles/projects.module.css"

export default function ContentBody({projectData, isOpenState}) {
  return (
    <div className={`flex-column ${st.cbContainer}`}>
      <div className={`flex-row ${st.cbContent1st}`}>
        <ProjectCards projectData={projectData} rowsData={4}/>
      </div>
      <div id="projectShowcase" className={`${st.cbContent2nd}`}>
        <div className={`flex-row ${st.pContainer}`}>
          <div className={`flex ${st.pMedia1}`}>
            
          </div>
          <div className={`flex-column ${st.pMedia2}`}>
            <h2>Project Title</h2>
            <div className={`flex-row ${st.pmTagsBox}`}>
              <Tags />
            </div>
            <p className={`bodyText ${st.pmSummary}`}>text</p>
            <div className={`flex ${st.pmActionBox}`}>Action</div>
          </div>
        </div>
        <CrossBtn handler={e => closeProject(isOpenState,st.cbContent2ndOpen)} addClass={st.crossBtn}/>
      </div>
    </div>
  )
}