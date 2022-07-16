import st from 'styles/project.module.css'
import Image from 'next/image'
import { ProjCategoryClicked} from './utils/Handler'
import { ArrowProjCategory } from './misc/Asset';
import { openProject, closeProject} from './utils/Handler';

//Category List Generated
export function CategoryList({projCategory,setProjCard,projectItem}) {
  //Get Category List
  const categoryList = projCategory
  .filter(item => (item.isActive === true))
  .map(item => {
    const normalClass = {
      btn: `flex-row ${st.catListBox}`,
      blackIcon: 'flex',
      whiteIcon: 'none',
    } 
    if(item.id === 1) {
      normalClass.btn = `flex-row ${st.catListBox} ${st.clbOnFocus}`;
      normalClass.blackIcon = 'none';
      normalClass.whiteIcon = 'flex';
    }
    return (
      <button 
      key={item.id}
      id={"category" + item.id}
      className={normalClass.btn} 
      onClick={event => ProjCategoryClicked(event,st.catListBox,st.clbOnFocus,setProjCard,projectItem)}>
        <span id="black-icon" style={{display: normalClass.blackIcon}}>
          <Image 
          layout="fill"
          objectFit='cover'
          src={item.icon1}
          alt={item.name}
          />
        </span>
        <span id="white-icon" style={{display: normalClass.whiteIcon}}>
          <Image 
          layout="fill"
          objectFit='cover'
          src={item.icon2}
          alt={item.name}
          />
        </span>
        <h4>{item.name}</h4>
        <ArrowProjCategory itemId={item.id}/>
      </button>
    )
  })
  return categoryList
}
//Generate Project Item Card
export function ProjItemCard({data}) {
  const cards = data.map(card => {
    return (
      <div key={card} className={`flex-column ${st.pItemCard}`}>
        <div className={`flex-column ${st.itemCardImage}`}>
          <p className={`bodyText`}>Project Image</p>
          <div className={`${st.itemCardDesc}`}>
            <p className={`smallText`}>Project Description</p>
          </div>
        </div>
        <div className={`flex-row ${st.itemCardTitle}`}>
          <h4>{card}</h4>
        </div>
      </div>
    )
  })
  if(6 - data.length !== 0) {
    for(let i = 1; i <= (6 - data.length); i++) {
      cards.push(<div key={'empty' + i} className={`flex-column ${st.pItemCardEmpty}`}></div>)
    }
  }
  return cards
}
export function PHHeader({isOpen, projectData}) {
  const {categoryList} = projectData;
  const catList = categoryList.filter(item => item.isActive === true).map(item => {
    return (
      <button 
      key={item.id} 
      id={"category"+item.id} 
      className={`bodyText flex ${st.phCategoryBox}`}>{item.name}</button>
    )
  })
  return (
    <div className={`flex-row ${st.phHeaderContainer}`}>
      <div>
        <button className={`bodyText flex ${st.phCategoryBox}`} onClick={e => {openProject(isOpen, st.projectPageOpen)}}>All</button>
        {catList}
      </div>
      <div>
        <span className={`${st.searchIcon}`}>
          <Image 
          src="/assets/search.png"
          alt='Search Project'
          layout='fill'
          objectFit='cover'
          />
        </span>
        <input className={st.pSearchBox}type="search" id="projectSearch" name="projectSearch"></input>
      </div>
    </div>
  )
}
export function CloseProjectBtn({isOpen,style}) {
  return (
    <button id="closeXBtn" className={`${st.boxX}`} style={style} onClick={e=> {closeProject(isOpen,st.projectPageOpen)}}>
      <div className={st.lineProps}></div>
      <div style={{transform: "rotate(-.125turn)"}} className={st.lineProps}></div>
    </button>
  )
}