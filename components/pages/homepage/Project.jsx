//Next and React
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
//Components
import {ProjItemCard,CategoryList} from 'components/Project'
import st from 'styles/home.module.css'


export default function Project({language, projectData}) {
  const router = useRouter();
  const currentPath = router.asPath.substring(0,3);
  //Get Language Content
  const {headline,subheadline,icon: {url,alt},seeMore} = language;
  //Get Project Section Data
  const [projCategory] = projectData;
  const projectItem = {
      "category1": ["featured-1","featured-2","featured-3","featured-4"],
      "category2": ["googleDocs-1","googleDocs-2","googleDocs-3","googleDocs-4","googleDocs-5","googleDocs-6"],
      "category3": ["programming-1","programming-2"],
      "category6": ["others-1"]
  }
  const [projCard, setProjCard] = useState(projectItem.category1);

  //Render Page
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
            <CategoryList 
            projCategory={projCategory.categoryList} 
            setProjCard={setProjCard} 
            projectItem={projectItem}
            />
          </div>
        </div>
        <div className={`${st.boxTwo} flex-column`}>
          <div className={`${st.projItemContainer} flex`}>
            <ProjItemCard data={projCard}/>
            <button 
            className={`flex smallText ${st.seeMoreBtn}`} 
            onClick={e => router.push(currentPath + '/project')}>
              {seeMore}
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}