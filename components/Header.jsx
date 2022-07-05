//import Components
import Image from 'next/image'
import Link from 'next/link'
import st from './styles/header.module.css'
import {Navbar} from './Navbar'
import {ArrowJumbotron} from './misc/Asset'

export function Header(props) {
  //Render the Component
  return (
    <>
    <section id='header-profile' className={`${st.section}`}>
      <Navbar />
      <div className={`${st.fluidJumbotron}`}>
        <div className ={`${st.container}`}>
          <div className={`${st.box1}`}>
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
          <div className={`${st.box2}`}>
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
        <div className={`${st.container}`}></div>
      </div>
      <ArrowJumbotron />
    </section>
    </>
  )
}