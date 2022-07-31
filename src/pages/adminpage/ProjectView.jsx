import CrossBtn from "misc/CrossBtn";
import st from "styles/admin.module.css";
import {
  projectOnCancel,
  projectOnSave,
  uploadThumbnailOnChange,
} from "utils/adminHandler";
import Image from "next/image";
import { useState } from "react";

export default function ProjectView({ viewState }) {
  const [openState, setOpenState] = viewState;
  const [thumbnail, setThumbnail] = useState("/assets/imgUnavailable.jpeg");
  const [uploadError, setUploadError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  return (
    <form
      id="projectView"
      data-projectid="cXnK9HjqF2Xh5Mok5QSO"
      className={`flex-column ${st.pvContainer}`}
      onSubmit={(e) => {
        e.preventDefault();
        projectOnSave(
          e.currentTarget.id,
          viewState,
          setSaveLoading,
          setSaveMsg,
          setThumbnail,
          setUploadError
        );
      }}
    >
      <h2>{openState == "EDIT" ? "Edit Project" : "Create Project"}</h2>
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
        <textarea id="description" name="description" rows="12" required />
      </div>
      <div className={`flex-row ${st.pvSection} ${st.pvCol2}`}>
        <span className={`flex-column`}>
          <label htmlFor="tags" className={`bodyText`}>
            Tags
          </label>
          <input type="text" id="tags" name="tags" required />
        </span>
      </div>
      <div className={`flex-column ${st.pvSection} ${st.pvUploadImage}`}>
        <label htmlFor="pvUploadImage" className={`bodyText`}>
          Thumbnail
        </label>
        <input
          id="pvUploadImage"
          type="file"
          name="pvUploadImage"
          accept="image/*"
          onChange={(e) =>
            uploadThumbnailOnChange(
              e.currentTarget.id,
              setThumbnail,
              setUploadError
            )
          }
          hidden
        />
        <span id="thumbnailPreview" className={`flex ${st.thumbnailClosed}`}>
          <Image
            id="imgThumbnail"
            alt=""
            src={thumbnail}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: ".3vw" }}
          />
        </span>
        <p className={`smallText ${st.uploadErrorText}`}>{uploadError}</p>
        <button
          className={`bodyText `}
          type="button"
          onClick={(e) => {
            document.getElementById("pvUploadImage").click();
          }}
        >
          Upload
        </button>
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
            <label htmlFor="setCategory" className={`bodyText`}>
              Category
            </label>
            <select
              className={`bodyText`}
              id="setCategory"
              name="setCategory"
              required
            >
              <option value="unknown" disabled>
                category...
              </option>
              <option value="1">Google Workspace</option>
              <option value="2">Programming</option>
              <option value="99">Others</option>
            </select>
          </span>
          <span>
            <label htmlFor="setFeatured" className={`bodyText`}>
              Featured ?
            </label>
            <select className={`bodyText`} id="setFeatured" name="setFeatured">
              <option value={false}>No</option>
              <option value={true}>Yes</option>
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
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </select>
          </span>
        </div>
      </div>
      <div className={`flex-row ${st.pvSection} ${st.pvAction}`}>
        <p id="saveMsg" className={`bodyText`}>
          {saveMsg}
        </p>
        <button type="submit" className={`bodyText`} disabled={saveLoading}>
          Save
        </button>
        <button
          className={`bodyText`}
          type="button"
          onClick={(e) => {
            projectOnCancel(setOpenState, setThumbnail, setUploadError);
          }}
          disabled={saveLoading}
        >
          Cancel
        </button>
      </div>
      <CrossBtn
        handler={(e) => {
          projectOnCancel(setOpenState, setThumbnail, setUploadError);
        }}
        addClass={st.pvCloseBtn}
      />
    </form>
  );
}
