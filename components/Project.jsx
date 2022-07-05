import st from './styles/project.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export function Project() {
  const [categoryList, setCategoryList] = useState(null);
  console.log(categoryList)
  return (
    <>
    <section id='project' className={`${st.section}`}>
      <div className={`${st.container}`}>
        <div className={`${st.boxOne}`}>
          <div className={`${st.headlineBox}`}>
            <div className={`${st.imgBox}`}>
              <div className={`${st.projIcon1}`}>
                <Image 
                layout='fill'
                objectFit='cover'
                src='https://drive.google.com/uc?id=1vqUSnpbekezExfvDa-2cW4YmkPOpJAOA'
                alt='Project, Karya, dan Publikasi'/>
              </div>
            </div>
              <div className={`${st.descBox}`}>
                <div className={`${st.descTitle}`}>
                  <h3>Publikasi dan Karya</h3>
                </div>
                <div className={`${st.descSummary}`}>
                  Berbagai karya dan publikasi yang saya kerjakan sebagai solusi pekerjaan atau sekedar &quot;Have fun&quot; project
                </div>
              </div>
            </div>
            <div className={`${st.categoryBox}`}>
              <div className=''></div>
            </div>
          </div>
        <div className={`${st.boxTwo}`}></div>
      </div>
    </section>
    </>
  )
}