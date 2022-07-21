import CrossBtn from "misc/CrossBtn";
import st from "styles/admin.module.css";
import { projectOnSave } from "utils/adminHandler";

export default function ProjectView() {
  return (
    <form
      id={st.pvContainer}
      className={`flex-column ${st.pvContainer}`}
      onSubmit={(e) => {
        e.preventDefault();
        projectOnSave(e.currentTarget.id);
      }}
    >
      <h2>Add Project</h2>
      <div className={`flex-column ${st.pvSection}`}>
        <label htmlFor="title" className={`bodyText`}>
          Project Title
        </label>
        <input type="text" id="title" name="title" required />
      </div>
      <div className={`flex-column ${st.pvSection}`}>
        <label htmlFor="description" className={`bodyText`}>
          Description
        </label>
        <textarea id="description" name="description" rows="6" required />
      </div>
      <div className={`flex-row ${st.pvSection} ${st.pvCol2}`}>
        <span className={`flex-column`}>
          <label htmlFor="tags" className={`bodyText`}>
            Tags
          </label>
          <input type="text" id="tags" name="tags" required />
        </span>
        <span className={`flex-column ${st.pvUploadFile}`}>
          <input
            id="pvUploadImage"
            type="file"
            name="pvUploadImage"
            accept="image/*"
            hidden
          />
          <button
            className={`bodyText `}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pvUploadImage").click();
            }}
          >
            Upload
          </button>
          <p className={`bodyText`}>Uploaded File Name</p>
        </span>
      </div>
      <div className={`flex-column ${st.pvSection}`}>
        <p style={{ marginBottom: "0.5vw" }} className={`bodyText`}>
          Add Link Button
        </p>
        <div className={`flex-row ${st.pvsLinkBtn}`}>
          <span>
            <label htmlFor="btnName1" className={`bodyText`}>
              Button Name
            </label>
            <input type="text" id="btnName1" name="btnName1" />
          </span>
          <span>
            <label htmlFor="btnLink1" className={`bodyText`}>
              Url
            </label>
            <input type="text" id="btnLink1" name="btnLink1" />
          </span>
        </div>
        <div className={`flex-row ${st.pvsLinkBtn}`}>
          <span>
            <label htmlFor="btnName2" className={`bodyText`}>
              Button Name
            </label>
            <input type="text" id="btnName2" name="btnName2" />
          </span>
          <span>
            <label htmlFor="btnLink2" className={`bodyText`}>
              Url
            </label>
            <input type="text" id="btnLink2" name="btnLink2" />
          </span>
        </div>
        <div className={`flex-row ${st.pvsLinkBtn}`}>
          <span>
            <label htmlFor="btnName3" className={`bodyText`}>
              Button Name
            </label>
            <input type="text" id="btnName3" name="btnName3" />
          </span>
          <span>
            <label htmlFor="btnLink3" className={`bodyText`}>
              Url
            </label>
            <input type="text" id="btnLink3" name="btnLink3" />
          </span>
        </div>
      </div>
      <div className={`flex-column ${st.pvSection} `}>
        <p className={`bodyText`}>Additional Settings</p>
        <div className={`flex-row ${st.addSettings}`}>
          <span>
            <label htmlFor="setFeatured" className={`bodyText`}>
              Featured ?
            </label>
            <select className={`bodyText`} id="setFeatured" name="setFeatured">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </span>
          <span>
            <label htmlFor="setVisibility" className={`bodyText`}>
              Visibility
            </label>
            <select
              className={`bodyText`}
              id="setVisibility"
              name="setVisibility"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </span>
        </div>
      </div>
      <div className={`flex-row ${st.pvSection} ${st.pvAction}`}>
        <button type="submit" className={`bodyText`}>
          Save
        </button>
        <button
          className={`bodyText`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Cancel
        </button>
      </div>
      <CrossBtn
        handler={(e) => {
          e.preventDefault();
          document
            .getElementById(st.pvContainer)
            .classList.remove(st.pvContainerOpen);
        }}
        addClass={st.pvCloseBtn}
      />
    </form>
  );
}
