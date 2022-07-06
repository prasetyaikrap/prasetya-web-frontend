//Components Import
import st from './styles/header.module.css'

import Image from 'next/image'
import Link from 'next/link'

export function Profile(props) {
  return (
    <div className ={`${st.container} flex`}>
      <div className={`${st.box1} flex`}>
        <div className={`${st.profileBox}`}>
          <p className={`${st.pHeadline2}`}>Hi, selamat datang...</p>
          <h2 className={`${st.pHeadline1}`}>Prasetya Ikra Priyadi</h2>
          <p className={`${st.pHeadline2}`}>Tuan rumah <Link href="/"><a className={`${st.keyWordSpinnov}`}>SPINNOV.ID</a></Link></p>
          <p className={`${st.pHeadline3} ${st.pSubHeadline1}`}>&quot;...Home for every Technology Enthusiast...&quot;</p>
          <div className={`${st.pBtnBox}`}>
            <button>Karya dan Publikasi</button>
            <button>Full Resume</button>
          </div>
        </div>
      </div>
      <div className={`${st.box2} flex`}>
        <div className={`${st.imgProfileBox}`}>
          <Image 
            alt='Prasetya Ikra Priyadi'
            src='https://drive.google.com/uc?id=1l1kSJOGRW_KwjEw_a5bK_MIEud9foGjX'
            objectFit='cover'
            layout='fill'
            className={`${st.imgProfile}`}
          />
        </div>
      </div>
    </div>
  )
}