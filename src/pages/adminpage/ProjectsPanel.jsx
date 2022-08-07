import { useEffect, useRef, useState } from "react";
import st from "styles/admin.module.css";
import ProjectView from "./ProjectView";
import {
  getProjectList,
  getSearchProjectList,
  openProject,
} from "utils/adminHandler";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ProjectPanel() {
  const initialProject = {
    id: "",
    data: {
      title: "",
      description: "",
      tags: [],
      author: "Prasetya Ikra Priyadi",
      categoryId: "unknown",
      categoryName: "",
      imageUrl: "/assets/imgUnavailable.jpeg",
      btnLink: [
        { name: "", url: "" },
        { name: "", url: "" },
      ],
      isFeatured: "false",
      isPublic: "true",
      createdAt: "",
      updatedAt: "",
      arraySearch: [],
    },
  };
  const router = useRouter();
  const [openState, setOpenState] = useState(null);
  const [data, setData] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(initialProject);
  const [lastVisible, setLastVisible] = useState(null);
  const searchRef = useRef();
  //Get Projects Data
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    //Get list of project based
    getProjectList(
      router.query.qs,
      [data, setData],
      [lastVisible, setLastVisible]
    );
  }, [router.query.qs]);

  //setPreview Data
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    //Get Selected Project Data
    if (openState == "CREATE" || openState == null) {
      setSelectedProject(initialProject);
    }
    if (openState == "EDIT") {
      const targetData = data.filter((item) => {
        return item.id == selectedProjectId;
      });
      setSelectedProject(targetData[0]);
    }
  }, [openState]);

  return (
    <div className={`flex-column ${st.projectPanel}`}>
      <h2>Projects</h2>
      <div className={`flex-row ${st.ppcHeader}`}>
        <div>
          <input
            id="searchBar"
            type="search"
            className={`bodyText`}
            ref={searchRef}
            placeholder="Search project..."
            onKeyDown={(e) => {
              if (e.key == "Enter" && searchRef.current.value !== "") {
                router.replace(
                  {
                    pathname: "/admin/dashboard",
                    query: {
                      m: "projects",
                      qs: searchRef.current.value
                        .toLowerCase()
                        .split(" ")
                        .filter((x) => x != "")
                        .join(" "),
                    },
                  },
                  undefined,
                  { shallow: true }
                );
                document.getElementById("clearSearch").hidden = false;
              }
            }}
          />
          <button
            id="clearSearch"
            type="button"
            className={`bodyText ${st.clearSearch}`}
            hidden={true}
            onClick={(e) => {
              router.replace(
                {
                  pathname: "/admin/dashboard",
                  query: {
                    m: "projects",
                  },
                },
                undefined,
                { shallow: true }
              );
              document.getElementById("clearSearch").hidden = true;
              document.getElementById("searchBar").value = "";
            }}
          >
            Reset
          </button>
        </div>
        <div>
          <button
            className={`bodyText`}
            onClick={(e) => {
              setSelectedProjectId(null);
              openProject("CREATE", setOpenState);
            }}
          >
            Create
          </button>
        </div>
      </div>
      <div className={`flex-column ${st.ppcContent}`}>
        <Cards
          data={data}
          setOpenState={setOpenState}
          setSelectedProjectId={setSelectedProjectId}
        />
      </div>
      <ProjectView
        viewState={[openState, setOpenState]}
        selectedProject={selectedProject}
        setSelectedProjectId={setSelectedProjectId}
      />
    </div>
  );
}

export function Cards({ data, setOpenState, setSelectedProjectId }) {
  let cards = data.map((item) => {
    const {
      id,
      data: {
        title,
        description,
        author,
        categoryId,
        categoryName,
        btnLink,
        isFeatured,
        isPublic,
        tags,
        imageUrl,
        createdAt,
        updatedAt,
      },
    } = item;
    const tagsMap = tags.map((tag) => {
      return (
        <span key={tag} className={`smallText`}>
          {tag}
        </span>
      );
    });
    const btnLinkMap = btnLink
      .filter((btn) => btn.name != "")
      .map((btn) => {
        return (
          <a
            key={btn.name}
            href={btn.url}
            target="_blank"
            rel="noreferrer"
            className={`bodyText`}
          >
            {btn.name}
          </a>
        );
      });
    const createdAtToDate = new Date(
      createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
    );
    const updatedAtToDate = new Date(
      updatedAt.seconds * 1000 + updatedAt.nanoseconds / 1000000
    );
    return (
      <div key={id} id={id} className={`flex-row ${st.ppcProject}`}>
        <span id={st.pPreview}>
          <div>
            <Image
              layout="fill"
              src={imageUrl}
              alt={title}
              objectFit="cover"
              style={{ borderRadius: "0.2vw" }}
            />
          </div>
          <div>
            <p className={`bodyText`}>{title}</p>
            <p className={`smallText`}>{description}</p>
            <div>{tagsMap}</div>
          </div>
        </span>
        <span id={st.pPublicPrivate}>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Category</p>
            <p className={`smallText`}>{categoryName}</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Featured</p>
            <p className={`smallText`}>{isFeatured ? "Yes" : "No"}</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Visibility</p>
            <p className={`smallText`}>{isPublic ? "Yes" : "No"}</p>
          </div>
        </span>
        <span id={st.pProfile}>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Author</p>
            <p className={`smallText`}>{author}</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Published</p>
            <p className={`smallText`}>{createdAtToDate.toLocaleString()}</p>
          </div>
          <div className={`${st.detailItem}`}>
            <p className={`bodyText`}>Last Edit</p>
            <p className={`smallText`}>{updatedAtToDate.toLocaleString()}</p>
          </div>
        </span>
        <span id={st.pEngage}>{btnLinkMap}</span>
        <span id={st.pAction}>
          <button
            id={st.actionEdit}
            type="button"
            className={`bodyText`}
            onClick={(e) => {
              const parent = document.getElementById(e.currentTarget.id)
                .parentNode.parentNode;
              setSelectedProjectId(parent.id);
              openProject("EDIT", setOpenState);
            }}
          >
            Edit
          </button>
          <button id={st.actionDelete} type="button" className={`bodyText`}>
            Delete
          </button>
        </span>
      </div>
    );
  });

  return cards;
}
