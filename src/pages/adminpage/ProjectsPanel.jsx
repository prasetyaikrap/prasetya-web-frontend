import { useRef, useState } from "react";
import st from "styles/admin.module.css";
import ProjectView from "./ProjectView";
import { openProject } from "utils/adminHandler";
import { firestore } from "utils/firebaseConfig";

export default function ProjectPanel() {
  const [openState, setOpenState] = useState(null);
  const [data, setData] = useState([]);
  const searchRef = useRef();
  //Get Projects Data

  return (
    <div className={`flex-column ${st.projectPanel}`}>
      <h2>Projects</h2>
      <div className={`flex-row ${st.ppcHeader}`}>
        <div>
          <input
            id="searchBar"
            type="search"
            ref={searchRef}
            onKeyDown={(e) => {
              if (e.key == "Enter" && searchRef.current.value !== "") {
                console.log("do search for " + searchRef.current.value);
              }
            }}
            placeholder="Search project..."
          ></input>
        </div>
        <div>
          <button
            className={`bodyText`}
            onClick={(e) => openProject("CREATE", setOpenState)}
          >
            Create
          </button>
        </div>
      </div>
      <div className={`flex-column ${st.ppcContent}`}>
        <Cards data={data} setOpenState={setOpenState} />
      </div>
      <ProjectView viewState={[openState, setOpenState]} />
    </div>
  );
}

export function Cards({ data, setOpenState }) {
  let cards = [];
  for (let i = 1; i <= 10; i++) {
    const id = "projectId" + i;
    cards.push(
      <div key={i} id={id} className={`flex-row ${st.ppcProject}`}>
        <span id={st.pPreview}>
          <div></div>
          <div>
            <p className={`bodyText`}>Project Title</p>
            <p className={`smallText`}>Description</p>
            <div>
              <span className={`smallText`}>Tag1</span>
              <span className={`smallText`}>Tag2</span>
              <span className={`smallText`}>Tag3</span>
            </div>
          </div>
        </span>
        <span id={st.pPublicPrivate}>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Category</p>
            <p className={`smallText`}>Programming</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Featured</p>
            <p className={`smallText`}>Yes</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Visibility</p>
            <p className={`smallText`}>Public</p>
          </div>
        </span>
        <span id={st.pProfile}>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Author</p>
            <p className={`smallText`}>Prasetya Ikra Priyadi</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Published</p>
            <p className={`smallText`}>20 Juli 2022</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Last Edit</p>
            <p className={`smallText`}>20 Juli 2022</p>
          </div>
        </span>
        <span id={st.pEngage}>
          <button className={`bodyText`}>Demo</button>
          <button className={`bodyText`}>Code</button>
        </span>
        <span id={st.pAction}>
          <button
            id={st.actionEdit}
            type="button"
            className={`bodyText`}
            onClick={(e) => {
              openProject("EDIT", setOpenState);
            }}
          >
            Edit
          </button>
          <button id={st.actionDelete} className={`bodyText`}>
            Delete
          </button>
        </span>
      </div>
    );
  }
  return cards;
}
