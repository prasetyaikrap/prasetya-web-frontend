import st from 'styles/project.module.css'
import Image from 'next/image'

//Category List Generated
function CategoryList({projCategory}) {
  //Get Category List
  const categoryList = projCategory.map(item => {
    return (
      <button key={item.id} className={` flex-row ${st.catListBox}`}>
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
      </button>
    )
  })
  return categoryList
}

//Generate Project Item Card


export function Project({language, projectData}) {
  //Get Language Content
  const {
    headline,
    subheadline,
    icon: {
      url,
      alt
    }
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