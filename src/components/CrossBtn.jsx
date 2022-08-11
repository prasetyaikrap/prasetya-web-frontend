import st from "styles/misc.module.css";

export default function CrossBtn({ handler, addClass }) {
  return (
    <button type="button" className={`${addClass}`} onClick={handler}>
      <div className={`${st.crossLine}`}></div>
      <div className={`${st.crossLineInvert}`}></div>
    </button>
  );
}
