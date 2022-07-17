//Next and React
import { useRouter } from 'next/router';
import Image from 'next/image';
//Components
import CategoryList from 'pages/homepage/CategoryList'
import ProjectCards from 'components/ProjectCards';
import st from 'styles/home.module.css'


export default function Project({language, projectCat, projectData}) {
  const router = useRouter();
  const currentPath = router.asPath.substring(0,3);
  //Get Language Content
  const {headline,subheadline,icon: {url,alt},seeMore} = language;

  //Render Page
  return (
    <>
    <section id='project' className={`${st.sectionProject} flex`}>
      <div className={`flex-row ${st.pContainer} `}>
        <div className={`flex-column ${st.pBoxOne}`}>
          <div className={`flex-row ${st.pHeadlineBox}`}>
            <div className={`flex ${st.pImgBox}`}>
              <div className={`${st.projIcon}`}>
                <Image 
                layout='fill'
                objectFit='cover'
                src={url}
                alt={alt}/>
              </div>
            </div>
            <div className={`flex-column ${st.pDescBox}`}>
              <h3>{headline}</h3>
              <p className={`bodyText ${st.pSummary}`}>
                {subheadline}
              </p>
            </div>
          </div>
          <div className={`${st.pCategoryBox} flex-column`}>
            <CategoryList 
            projectCat={projectCat} 
            />
          </div>
        </div>
        <div className={`${st.pBoxTwo} flex-column`}>
          <div className={`${st.pItemContainer} flex`}>
            <ProjectCards projectData={projectData} rowsData={6}/>
            <button 
            className={`flex smallText ${st.pSeeMoreBtn}`} 
            onClick={e => router.push(currentPath + '/projects')}>
              {seeMore}
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}