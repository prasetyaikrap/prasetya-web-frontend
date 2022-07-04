//import Component
import st from './styles/navbar.module.css'
import Link from 'next/link'
import * as lang from '../public/data/language';

export function Navbar(){
  //Get Language Preference
  const {
    navTitle, 
    navBtn, 
    navLangOption:{
      dropdownText,
      dropdownList
    }
  }= lang.id_ID.home.header;
  
  const navBtnMap = navBtn.map(x => {
    return (
      <Link key = {x.id} href={x.link}>
        <button className={`${st.navBtn} ${st.navBtnText}`}>{x.title}</button>
      </Link>
    )
  })

  //Render Component
  return (
    <>
    <nav className={`${st.navContainer}`}>
      <div className={`${st.navHeader}`}>
        <Link href='/'>
          <h1 className={`${st.headerTitle}`}>{navTitle}</h1>
        </Link>
      </div>
      <div className={`${st.navBtnContainer}`}>
        {navBtnMap}
      </div>
    </nav>
    </>
  )
}