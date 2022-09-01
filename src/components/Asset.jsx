import { terminate } from "firebase/firestore";
import st from "styles/components.module.css";

export function CrossBtn({ handler, customClass }) {
  return (
    <button type="button" className={`${customClass}`} onClick={handler}>
      <div className={`${st.crossLine}`}></div>
      <div className={`${st.crossLineInvert}`}></div>
    </button>
  );
}

export function AnchorTag({
  sectionId,
  offset = { top: "0", left: "0" },
  zIndex = "0",
  visibility = "hidden",
}) {
  return (
    <span
      id={sectionId}
      style={{
        position: "absolute",
        zIndex: zIndex,
        ...offset,
        visibility: visibility,
      }}
    >
      {`${sectionId} Anchor`}
    </span>
  );
}
