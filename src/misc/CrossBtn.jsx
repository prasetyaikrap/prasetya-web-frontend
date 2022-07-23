import { useEffect } from "react";
import st from "styles/misc.module.css";

export default function CrossBtn({ handler, addClass }) {
  useEffect(() => {
    const crossBtn = document.getElementById("crossBtn");
    crossBtn.classList.add(addClass);
  });
  return (
    <button
      id="crossBtn"
      type="button"
      className={`${st.crossBtn}`}
      onClick={handler}
    >
      <div className={`${st.crossLine}`}></div>
      <div className={`${st.crossLineInvert}`}></div>
    </button>
  );
}
