import st from "styles/components.module.css";

export function CrossBtn({ handler, customClass }) {
  return (
    <button type="button" className={`${customClass}`} onClick={handler}>
      <div className={`${st.crossLine}`}></div>
      <div className={`${st.crossLineInvert}`}></div>
    </button>
  );
}
