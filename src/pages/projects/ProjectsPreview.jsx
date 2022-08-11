import st from "styles/projects.module.css";
import CrossBtn from "components/CrossBtn";
import Tags from "pages/projects/Tags";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProjectPreview({ data, setData }) {
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [descParagraph, setDescParagraph] = useState("");
  const [actionLink, setActionLink] = useState("");
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    if (data.id) {
      setCreatedDate(
        new Date(
          data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000
        ).toLocaleString("en-US", dateOptions)
      );
      setUpdatedDate(
        new Date(
          data.updatedAt.seconds * 1000 + data.updatedAt.nanoseconds / 1000000
        ).toLocaleString("en-US", dateOptions)
      );
      setDescParagraph(
        data.description.split("\n").map((par, index) => {
          return (
            <p key={index} className={`bodyText`}>
              {par}
            </p>
          );
        })
      );
      setActionLink(
        data.btnLink
          .filter((item) => {
            return item.name != "";
          })
          .map((btn) => {
            return (
              <a key={btn.name} href={btn.url} target="_blank" rel="noreferrer">
                {btn.name}
              </a>
            );
          })
      );
    }
  }, [data]);
  return (
    <div id="projectPreview" className={`flex ${st.cbContent2nd}`}>
      <div className={`flex-row ${st.pContainer}`}>
        <div className={`flex ${st.pMedia1}`}>
          <div className={`${st.pmImage}`}>
            {data.imageUrl && (
              <Image
                layout="fill"
                src={data.imageUrl}
                alt={data.title}
                objectFit="cover"
                priority="true"
                className={st.pmImageNext}
              />
            )}
          </div>
        </div>
        <div className={`${st.pMedia2}`}>
          <h2>{data.title}</h2>
          <div className={`flex ${st.pmInfo}`}>
            <span className={`smallText`}>{`Author: ${data.author}`}</span>
            <span className={`smallText`}>{`Published: ${createdDate}`}</span>
            <span className={`smallText`}>{`Last Update: ${updatedDate}`}</span>
          </div>
          <div className={`flex-row ${st.pmTagsBox}`}>
            <Tags data={data.tags || []} />
          </div>
          <div className={`flex-column ${st.pmSummary}`}>{descParagraph}</div>
          <div className={`flex-row ${st.pmActionBox}`}>{actionLink}</div>
        </div>
      </div>
      <CrossBtn
        handler={(e) => {
          document
            .getElementById("projectPreview")
            .classList.remove(st.cbContent2ndOpen);
          setData([]);
        }}
        addClass={st.crossBtn}
      />
    </div>
  );
}
