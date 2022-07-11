import st from 'styles/project.module.css'
import Image from 'next/image'
import { ProjCategoryClicked} from './utils/Handler'
import { ArrowProjCategory } from './misc/Asset';
import { useState } from 'react'

//Category List Generated
function CategoryList({projCategory}) {
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
      id={"category-" + item.id}
      className={normalClass.btn} 
      onClick={event => ProjCategoryClicked(event,st.catListBox,st.clbOnFocus)}>
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
export function ProjItemCard() {
  const cardId = [1,2,3,4,5,6];
  let cards = cardId.map(card => {
    return (
      <div key={card} className={`flex-column ${st.pItemCard}`}>
        <div className={`flex-column ${st.itemCardImage}`}>
          <p className={`bodyText`}>Project Image</p>
          <div className={`${st.itemCardDesc}`}>
            <p className={`smallText`}>Project Description</p>
          </div>
        </div>
        <div className={`flex-row ${st.itemCardTitle}`}>
          <h4>Project Title</h4>
        </div>
      </div>
    )
  })
  if(6 - cardId.length !== 0) {
    for(let i = 1; i <= (6-cardId.length); i++) {
      cards.push(<div key={'empty-' + i} className={`flex-column ${st.pItemCardEmpty}`}></div>)
    }
  }
  return cards
}

export function Project({language, projectData}) {
  //Get Language Content
  const {
    headline,
    subheadline,
    icon: {
      url,
      alt
    },
    seeMore
  } = language;
  const [projCategory] = projectData;
  return (
    <>
    <section id='project' className={`${st.section} flex`}>
      <div className={`flex-row ${st.container} `}>
        <div className={`flex-column ${st.boxOne}`}>
          <div className={`flex-row ${st.headlineBox}`}>
            <div className={`flex ${st.imgBox}`}>
              <div className={`${st.projIcon}`}>
                <Image 
                layout='fill'
                objectFit='cover'
                src={url}
                alt={alt}/>
              </div>
            </div>
            <div className={`flex-column ${st.descBox}`}>
              <h3>{headline}</h3>
              <p className={`bodyText ${st.descSummary}`}>
                {subheadline}
              </p>
            </div>
          </div>
          <div className={`${st.categoryBox} flex-column`}>
            <CategoryList projCategory={projCategory.categoryList} />
          </div>
        </div>
        <div className={`${st.boxTwo} flex-column`}>
          <div className={`${st.projItemContainer} flex`}>
            <ProjItemCard />
            <button className={`flex smallText ${st.seeMoreBtn}`}>{seeMore}</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}