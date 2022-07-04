//import Components
import Image from 'next/image'
import st from './styles/header.module.css'
import {Navbar} from './Navbar'


export function Header(props) {
  //Render the Component
  return (
    <>
    <section id='header-profile' className={`${st.section}`}>
      <Navbar />
      <div className ={`${st.container}`}>
        <div className={`${st.box1}`}></div>
        <div className={`${st.box2}`}>
          <div className={`${st.imgProfileBox}`}>
            <Image 
              alt='Prasetya Ikra Priyadi'
              src='/img/Profile.png'
              objectFit='cover'
              layout='fill'
              className={`${st.imgProfile}`}
            />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}