import st from './styles/project.module.css'
import Image from 'next/image'
import langID from '../public/data/lang_idID.json'
import projCategory from '../public/data/categoryList.json'

//Category List Generated
function CategoryList() {
  //Get Category List
  const categoryList = projCategory.categoryList.map(item => {
    return (
      <div key={item.id} className={`${st.catListBox} flex-row`}>
        <span>
          <Image 
          src={item.icon}
          alt={item.name}
          width='100%'
          height='100%'
          />
        </span>
        <h4>{item.name}</h4>
        <span></span>
      </div>
    )
  })
  return categoryList
}

//Generate Project Item Card


export function Project() {
  //Get Language Content
  const {
    headline,
    subheadline,
    icon: {
      url,
      alt
    }
  } = langID.home.project;

  return (
    <>
    <section id='project' className={`${st.section} flex`}>
      <div className={`${st.container} flex-row`}>
        <div className={`${st.boxOne} flex-column`}>
          <div className={`${st.headlineBox} flex-row`}>
            <div className={`${st.imgBox} flex`}>
              <div className={`${st.projIcon}`}>
                <Image 
                layout='fill'
                objectFit='cover'
                src={url}
                alt={alt}/>
              </div>
            </div>
            <div className={`${st.descBox} flex-column`}>
              <h3>{headline}</h3>
              <div className={`${st.descSummary}`}>
                {subheadline}
              </div>
            </div>
          </div>
          <div className={`${st.categoryBox} flex-column`}>
            <CategoryList />
          </div>
        </div>
        <div className={`${st.boxTwo} flex-column`}>
          <div className={`${st.projItemContainer} flex`}>
            <div className={`${st.pItemCard} flex`}>ITEM 1</div>
            <div className={`${st.pItemCard} flex`}>ITEM 2</div>
            <div className={`${st.pItemCard} flex`}>ITEM 3</div>
            <div className={`${st.pItemCard} flex`}>ITEM 4</div>
            <div className={`${st.pItemCard} flex`}>ITEM 5</div>
            <div className={`${st.pItemCard} flex`}>ITEM 6</div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}