import st from "styles/components.module.css"

export default function ProjectCards({projectData,rowsData}) {
  const cards = projectData.map(item => {
  return (
    <div key={item.id} className={`flex-column ${st.pCardContainer}`}>
      <div className={`flex-column ${st.pCardImage}`}>
        <p className={`bodyText`}>Project Image</p>
        <div className={`${st.pCardDesc}`}>
          <p className={`smallText`}>Project Description</p>
        </div>
      </div>
      <div className={`flex-row ${st.pCardTitle}`}>
        <h4>{item.title}</h4>
      </div>
    </div>
    )
  })
  if(projectData.length % rowsData !== 0) {
    const emptyCard = rowsData - (projectData.length % rowsData);
    for(let i = 1; i <= emptyCard; i++) {
      cards.push(<div key={'empty' + i} className={`flex-column ${st.pCardContainerEmpty}`}></div>)
    }
  }
    return cards 
}