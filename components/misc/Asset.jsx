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

export function ArrowProjCategory({itemId}) {
  const display = (itemId === '1') ? '' : 'none'
  return (
    <div data-arrow='categoryArrow' style={{display:display,backgroundColor: 'transparent',width: '2vw', height: '2vw'}} className={`${st.arrowBox}`}>
      <div style={{width: '1vw', transform: 'translateY(-.3vw) rotate(.15turn)'}} className={st.arrow1}></div>
      <div style={{width: '1vw', transform: 'translateY(.3vw) rotate(-.15turn)'}} className={st.arrow2}></div>
    </div>
  )
}