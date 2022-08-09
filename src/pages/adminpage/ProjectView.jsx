import CrossBtn from "misc/CrossBtn";
import st from "styles/admin.module.css";
import {
  projectOnCancel,
  projectOnSave,
  uploadThumbnailOnChange,
} from "utils/adminHandler";
import Image from "next/image";
import { useState } from "react";
import cat from "data/categoryList.json";

export default function ProjectView({
  viewState,
  selectedProject,
  setSelectedProjectId,
  setRefreshList,
}) {
  const {
    id,
    title,
    description,
    tags,
    categoryId,
    categoryName,
    imageUrl,
    btnLink,
    isFeatured,
    isPublic,
  } = selectedProject;
  const options = cat.category.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });
  const [openState, setOpenState] = viewState;
  const [uploadError, setUploadError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  // const [thumbnail, setThumbnail] = useState(imageUrl);
  const [saveMsg, setSaveMsg] = useState("");
  return (
    <form
      id="projectView"
      data-projectid={id}
      className={`flex-column ${st.pvContainer}`}
      onSubmit={async (e) => {
        e.preventDefault();
        await projectOnSave(
          e.currentTarget.id,
          viewState,
          setSaveLoading,
          setSaveMsg,
          setUploadError,
          setSelectedProjectId,
          setRefreshList,
          imageUrl
        );
      }}
    >
      <h2>{openState == "EDIT" ? "Edit Project" : "Create Project"}</h2>
      <div className={`flex-column ${st.pvSection}`}>
        <label htmlFor="title" className={`bodyText`}>
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          required
        />
      </div>
      <div className={`flex-column ${st.pvSection}`}>
        <label htmlFor="description" className={`bodyText`}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`${st.description}`}
          defaultValue={description}
          required
        />
      </div>
      <div className={`flex-row ${st.pvSection} ${st.pvCol2}`}>
        <span className={`flex-column`}>
          <label htmlFor="tags" className={`bodyText`}>
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={tags.join(",")}
            required
          />
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
            uploadThumbnailOnChange(e.currentTarget, setUploadError)
          }
          hidden
        />
        <span id="thumbnailPreview" className={`flex ${st.thumbnailClosed}`}>
          <Image
            id="imgThumbnail"
            alt=""
            src={imageUrl}
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
            <input
              type="text"
              id="btnName1"
              name="btnName1"
              defaultValue={btnLink[0].name}
            />
          </span>
          <span>
            <label htmlFor="btnLink1" className={`bodyText`}>
              Url
            </label>
            <input
              type="text"
              id="btnLink1"
              name="btnLink1"
              defaultValue={btnLink[0].url}
            />
          </span>
        </div>
        <div className={`flex-row ${st.pvsLinkBtn}`}>
          <span>
            <label htmlFor="btnName2" className={`bodyText`}>
              Button Name
            </label>
            <input
              type="text"
              id="btnName2"
              name="btnName2"
              defaultValue={btnLink[1].name}
            />
          </span>
          <span>
            <label htmlFor="btnLink2" className={`bodyText`}>
              Url
            </label>
            <input
              type="text"
              id="btnLink2"
              name="btnLink2"
              defaultValue={btnLink[1].url}
            />
          </span>
        </div>
      </div>
      <div className={`flex-column ${st.pvSection} `}>
        <p className={`bodyText`}>Additional Settings</p>
        <div className={`flex-row ${st.addSettings}`}>
          <span>
            <label htmlFor="setCategory" className={`bodyText`}>
              {`Category (${categoryName})`}
            </label>
            <select
              className={`bodyText`}
              id="setCategory"
              name="setCategory"
              defaultValue={categoryId}
              required
            >
              {options}
            </select>
          </span>
          <span>
            <label htmlFor="setFeatured" className={`bodyText`}>
              {`Featured? (${isFeatured ? "Yes" : "No"})`}
            </label>
            <select
              className={`bodyText`}
              id="setFeatured"
              name="setFeatured"
              defaultValue={isFeatured}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </span>
          <span>
            <label htmlFor="setVisibility" className={`bodyText`}>
              {`Visibility (${isPublic ? "Yes" : "No"})`}
            </label>
            <select
              className={`bodyText`}
              id="setVisibility"
              name="setVisibility"
              defaultValue={isPublic}
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
            setSelectedProjectId(null);
            projectOnCancel(setOpenState, setUploadError);
          }}
          disabled={saveLoading}
        >
          Cancel
        </button>
      </div>
      <CrossBtn
        handler={(e) => {
          setSelectedProjectId(null);
          projectOnCancel(setOpenState, setUploadError);
        }}
        addClass={st.pvCloseBtn}
      />
    </form>
  );
}
