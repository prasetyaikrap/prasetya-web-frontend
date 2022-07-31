import st from "styles/projects.module.css";
import CrossBtn from "misc/CrossBtn";
import Tags from "pages/projects/Tags";

export default function ProjectPreview({ data }) {
  return (
    <div id="projectPreview" className={`flex ${st.cbContent2nd}`}>
      <div className={`flex-row ${st.pContainer}`}>
        <div className={`flex ${st.pMedia1}`}>
          <div className={`${st.pmImage}`}></div>
        </div>
        <div className={`flex-column ${st.pMedia2}`}>
          <h2>{data.title}</h2>
          <div className={`flex-row ${st.pmTagsBox}`}>
            <Tags data={data.tags} />
          </div>
          <p className={`bodyText ${st.pmSummary}`}>{data.description}</p>
          <div className={`flex ${st.pmActionBox}`}>Action</div>
        </div>
      </div>
      <CrossBtn
        handler={(e) => {
          document
            .getElementById("projectPreview")
            .classList.remove(st.cbContent2ndOpen);
        }}
        addClass={st.crossBtn}
      />
    </div>
  );
}
