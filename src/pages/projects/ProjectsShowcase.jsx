import st from "styles/projects.module.css"
import CrossBtn from "misc/CrossBtn"
import { closeProject } from "utils/Handler"
import Tags from "pages/projects/Tags"

export default function ProjectShowcase({isOpenState}) {
  return (
    <div id="projectShowcase" className={`flex ${st.cbContent2nd}`}>
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
  )
}