import st from '../styles/misc.module.css'

export function ArrowJumbotron() {
  return (
    <div className={`${st.arrowContainer}`}>
      <div className={`${st.arrowBox} ${st.rotate180}`}>
        <div className={st.arrow1}></div>
        <div className={st.arrow2}></div>
      </div>
      <div className={`${st.arrowBox}`}>
        <div className={st.arrow1}></div>
        <div className={st.arrow2}></div>
      </div>
    </div>
  )
}